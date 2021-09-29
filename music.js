console.time('Worker Start')
const commando = require('discord.js-commando');
const Discord = require('discord.js')


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
var SongTimeElapsed =0;
var isPlaying = false;
var textChannel;
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
            console.log('WORKER:',name,'- File Exists: Command:',JSON.parse(fs.readFileSync(path)).command); //takes about one ms
            switch (JSON.parse(fs.readFileSync(path)).command) {
                case 'skip':
                    skip()
                    break;
                case 'resume':
                    resume();
                    break;
                case 'queue':
                    queue();
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
            //console.log('Music: Queue Error:', err || 'Empty Queue', queue.length)
            setTimeout(() => 
            {
                music()
            }, 2000);
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
                            console.log('WORKER:',name,'- Music: ','Queue Size:', queue.length,'Queueing: Index:',i, 'Songname:', queue[i].songname);
                            try 
                            {
                                play(queue[i].voice, queue[i].songURL, queue[i].id, queue[i].songname, queue[i].songtime, queue[i].textchannel);
                            } catch (error) 
                            {
                                console.log('WORKER:',name,'- Music: Error: Could`nt connect to the voice channel.');
                            }
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
    textChannel = text;
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
                SongTimeElapsed = Dispatcher.streamTime/1000;
                isPlaying = true;
                if (!speaking) //queue next song or leave
                {
                    SongTimeElapsed =0;
                    isPlaying = false;
                    console.log('Worker:', name, '- Song ended :', songname);
                    removeFromQueue(id, true);
                }
            });
            Dispatcher.on('error', error=>
            {
                //removeFromQueue(id, true);
                console.log('Worker:', name, '- Error on attempt no:', attempts,'\t Miniget Error.')//Error:', error)
                if(attempts<10)
                {
                    play(voiceID, songURL, id, songname, songtime, text);
                }
                else
                {
                    bot.channels.cache.get(text).send(`Failed to download audio for the 10th time, removing ${songname} from Queue.`);
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
                            console.log('Worker:',name,'- Music: Remove From Q: Playing next. Next:', next.songname, next.songtime);
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
                resolve(true);
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
                                console.log('WORKER:',name,'Leave: DeleteQ: Removing song:', queue[i].songname);
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
        }
    })
}

function queue()
{
    if(isPlaying)
    {
        const embed = new Discord.MessageEmbed;
        embed.setTitle('Queue:')
        embed.setAuthor("Rem-chan", "https://i.imgur.com/g6FSNhL.png")
        embed.setColor(0xd31f1f)
        embed.setFooter('Rem-chan em ', "https://i.imgur.com/g6FSNhL.png")
        embed.setTimestamp()
        
        
        QueueM.get((err, Queue)=>
        {   
            if(err || Queue.length == 0) 
            {
                embed.addField(`Queue is`,'empty');
                message.channel.send(embed)
            }
            else
            {
                var GuildQueueSize =0;
                if(Queue.length>0)
                {
                    for(var i=0;i<Queue.length; i++)
                    {  
                        if(Queue[i].guild==guild)
                        {
                            if(i==0)
                            {
                                embed.addField(`${Queue[i].songname}`,`(${correctedTime(SongTimeElapsed)}/${correctedTime(Queue[i].songtime)})`);
                            }
                            if(GuildQueueSize<24)
                            {
                                embed.addField(`${Queue[i].songname}`,`(${Queue[i].songtime})`);
                            }
                            GuildQueueSize++;
                        } 
                        if(GuildQueueSize>25)
                        {
                            embed.addField(`There are ${GuildQueueSize} more in the queue.`, '')
                        }
                    } 
                    bot.channels.cache.get(textChannel).send(embed)
                }
            }
        });
    }
    removeFile();
}
function correctedTime(time)
{
    if(time%60>1)
    {
        time = Math.trunc(time/60)+':'+ (time-Math.trunc(time/60)*60)
    }
    else time = '0:'+time;
    return time;
}