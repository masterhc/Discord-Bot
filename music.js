console.time('Worker Start')
const commando = require('discord.js-commando');


const bot = new commando.Client();

const mongoose = require('mongoose');
const QueueM = require('./models/queue');

const ytdl = require('ytdl-core');

const guild = process.argv[2]
const name = process.argv[3]



const Path = require('path')  
const fs = require('fs')  

const path = Path.join(__dirname, `${guild}.json`)
var currentID = '';
var Dispatcher; 
var attempts =0;
bot.login(process.env.discord_token).then(()=>
{
    
    console.log('WORKER:',name,'- Music: Guild: (', guild,')', name);
    console.timeEnd('Worker Start')
    mongoose.Promise = global.Promise;
    mongoose.connect(process.env.mongoDB, {useNewUrlParser: true, useUnifiedTopology:true, useFindAndModify: false }).then(console.log('WORKER:',name,'- MONGODB: Connected')).catch(err=>console.log(err));
    leave();
    music();
    setInterval(() => {
        commands();
    }, 200);
   
});

function commands()
{
    fs.access(path,fs.constants.F_OK,(err)=>
    {
        if(!err)
        {
            //console.time('Worker|Command')
            console.log('WORKER:',name,'- File Exists: Command:',JSON.parse(fs.readFileSync(path)).command); //takes about one ms
            switch (JSON.parse(fs.readFileSync(path)).command) {
                case 'skip':
                    skip()
                    break;
                case 'pause':
                    pause();
                    break;
                case 'resume':
                    resume();
                    break;
                case 'leave':
                    leave()
                    break;
                default:
                    break;
            }
        }
    })
    
      
    
}
function music()
{
    //console.log('WORKER:',name,'- Music: Still alive');
    QueueM.get((err, queue)=>
    {   
        if(err || queue.length == 0) 
        {
            console.log('Music: Queue Error:', err || 'Empty Queue', queue.length)
            setTimeout(() => 
            {
                music()
            }, 2000);
        }
        else
        {
            console.log('Music: Queue Size:', queue.length)
            if(queue.length>0)
            {
                var i = 0;
                do
                {
                    if(i<queue.length)
                    {
                        if(queue[i].guild==guild)
                        {
                            console.log('WORKER:',name,'- Music: Queueing: Index:',i, 'Songname:', queue[i].songname);   
                            play(queue[i].voice, queue[i].songURL, queue[i].id, queue[i].songname, queue[i].songtime, queue[i].textchannel);
                            i=queue.length;
                        }
                    }
                    i++;
                    //console.log('Worker:', name, '- I, before condition check:',i, 'length:', queue.length,'condition:', i<queue.length);
                }while((i<queue.length)==true)
            }
            else
            {
                setTimeout(() => 
                {
                    music();    
                }, 1500);
            }
        }
    });
    console.log('Music: It got here!');

}
/**
 * 
 * @param {String} voiceID - Voice Channel ID
 * @param {String} songURL - Song URL
 * @param {String} id  - MongoDB ID
 * @param {String} songname - Song Name
 * @param {String} songtime - Song play time
 */
function play (voiceID, songURL, id, songname, songtime, text)
{
    try
    {

        attempts++;
        currentID = id;
        //console.log('Worker:', name ,'- Play: ', voiceID, songURL,id, songname, songtime, text)
        const voice = bot.channels.cache.get(voiceID);
        voice.join().then((connection)=>
        {
            
            Dispatcher = connection.play(ytdl(songURL, { filter: 'audioonly', dlChunkSize: 0 }), {volume:0.5});
            Dispatcher.on('start', ()=>
            {
                console.log('Worker:', name ,'- Playing: ', songname, '(',songtime,'s)')
                attempts = 0;
            })
            Dispatcher.on('speaking', speaking => 
            {
                if (!speaking) //queue next song or leave
                {
                    console.log('Worker:', name, '- Song ended :', songname);
                    removeFromQueue(id, true);
                }
            });
            Dispatcher.on('error', error=>
            {
                //removeFromQueue(id, true);
                console.log('Worker:', name, '- Error on attempt no:', attempts,'\n Miniget Error.')//Error:', error)
                if(attempts<10)
                {
                    play(voiceID, songURL, id, songname, songtime, text);
                }
                else
                {
                    bot.channels.cache.get(text).send(`Failed to download audio for the 10th time,\nremoving ${songname} from Queue.`);
                    removeFromQueue(id);
                    attempts = 0;
                }
            });
        });
    }
    catch (error)
    {
        console.log('Worker:', name ,'- Play: Error: ', error)
        music();
        
    }
}
/**
 * Removes the song from Queue. 
 * @param {String} id - Current's song ID.
 * @param {Boolean} playNext - Should it play the next if there is one.
 */

function removeFromQueue(id, playNext)
{
    //console.log('Music: Find and Remove: id: ', id);
    
    QueueM.findByIdAndRemove(id, (err)=>
    {
        if(!err)
        {
            console.log('Worker:',name,'- Music: Song removed!') 
            QueueM.findOne({guild:guild}, (err, next)=>
            {
                if(!err) 
                {
                    //console.log('Worker:',name,'- Music: More in queue?', next);
                    if(next)
                    {
                        if(playNext)
                        {
                            console.log('Worker:',name,'- Music: Remove From Q: Playing next. Next:', next)
                            play(next.voice, next.songURL, next.id, next.songname, next.songtime, next.textchannel)
                        }
                        else
                        {
                            console.log('Worker:',name,'- Music: Removed from Q. PlayNext = false')
                            music()
                        }
                    }
                    else leave();
                }
                else
                {
                    console.log('Worker:', name, '- Error:', err);
                }
            })
        } 
        else
        {
            console.log('Worker:',name,'- Music: Failed to remove song from queue!', err)
            music();
        }
    })
   
}

function leave()
{
    attempts =0;
    if(bot.guilds.cache.get(guild).voice)
    {
        if(bot.guilds.cache.get(guild).voice.connection)
        {
            console.log('Worker:',name,'- Music: Leaving')
            bot.guilds.cache.get(guild).voice.connection.disconnect()
            deleteQ().then(()=>
            {
                console.log('Worker:',name,'- Music: Deleted Q, Removing file and restarting.')
                removeFile();
                music();
            })
        }
    }
}


function deleteQ()
{
    return new Promise ((resolve, reject)=>
    {  
        QueueM.get((err, queue)=>
        {   
            if(err || queue.length == 0) 
            {
                console.log('Worker:',name,'- Music: DeleteQ: Empty Queue')
            }
            else
            {
                if(queue.length>0)
                {
                    var i = 0;
                    do
                    {
                        if(i<queue.length)
                        {
                            if(queue[i].guild==guild)
                            {
                                remove(queue[i].id)
                                console.log('Leave: DeleteQ: Removing song:', queue[i].songname);
                            }
                        }
                        i++;
                        if(i==queue.length)
                        {
                            resolve(true);
                        }
                    }while((i<queue.length)==true);
                }
            }
        });
    }) 
}
function remove(id)
{
    QueueM.findByIdAndRemove(id, (err)=>
    {
        if(err) console.log('Worker:',name,'- Music: Failed to remove song from queue!', err)
    })
}

function skip()
{
    attempts = 0;
    removeFile();   
    removeFromQueue(currentID, true); //it also asks to play the next
}

function removeFile()
{
    fs.access(path, fs.constants.F_OK, (err)=>
    {
        if(!err)
        {
            fs.unlinkSync(path)
            console.timeEnd('Worker|Command')
        }
    })
}