console.time('Worker Start')
const commando = require('discord.js-commando');
const Discord = require('discord.js');
const exec = require('child_process').exec;


const bot = new commando.Client();

const mongoose = require('mongoose');
const QueueM = require('./models/queue');
const Command = require('./models/mcommands')
const ytdl = require('ytdl-core');

const guild = process.argv[2];
const name = process.argv[3];
const remid = '356104008366030863';

var currentID = '';
var Dispatcher; 
var attempts =0;
var SongTimeElapsed =0;
var isPlaying = false;
var pause = false;
bot.login(process.env.discord_token).then(()=>
{
    
    console.log('WORKER:',name,'- Music: Guild: (', guild,')');
    console.timeEnd('Worker Start')
    mongoose.Promise = global.Promise;
    mongoose.connect(process.env.mongoDB, {useNewUrlParser: true, useUnifiedTopology:true}).then(console.log('WORKER:',name,'- MONGODB: Connected')).catch(err=>console.log(err));
    leave().then((channelName)=>
    {
        //left
        console.log('WORKER:',name,'- Music: Start UP: Left a voice channel:',channelName);
    }).catch(()=>
    {
        console.log('WORKER:',name,'- Music: Start UP: Not in a voice channel.');
    })
    music();
   
});

function commands(Dispatcher)
{
    Command.find({guild:guild})
    .then((command)=>
    {
        if(command.length >0)
        {
            
            console.log('Worker:',name, ' - Command:', command[command.length-1].command)
            removeCommand().then(()=>
            {
                console.log('Worker:',name, ' - Command:', command[command.length-1].command,'- DELETED')
                switch (command[0].command) {
                    case 'skip':
                        skip()
                        break;
                    case 'pause':
                        pause = true;
                        Dispatcher.pause();
                        break;
                    case 'resume':
                        pause = false;
                        isPlaying = true;
                        Dispatcher.resume();
                        break;
                    case 'queue':
                        queue(command.textchannel);
                        break;
                    case 'leave':
                        leave().then(channel =>
                            {
                                console.log('Worker:',name, ' - Left the channel:', channel);
                                music();
                            }).catch(()=>
                            {
                                console.log('Worker:',name, ' - No channel to leave restarting.');
                                music();
                            });
                        break;
                    default:
                        break;
                }
            });
        }
    })
 
    
}
function music() //Grab from Queue
{
    //console.log('WORKER:',name,'- Music: Still alive');

    QueueM.find({guild:guild})
    .then(queue=>
        {
            
            if(queue.length>0)
            {
                var i = 0;
                do
                {
                    if(i<queue.length)
                    {
                      
                        console.log('WORKER:',name,'- Music: ','Queue Size:', queue.length,'Queueing: Index:',i, 'Songname:', queue[i].songname);
                        try 
                        {
                            play(queue[i].voice, queue[i].songURL, queue[i].id, queue[i].songname, queue[i].songtime, queue[i].textchannel);
                        } catch (error) 
                        {
                            console.log('WORKER:',name,'- Music: Error: Couldn`t connect to the voice channel.');
                        }
                        i=queue.length;
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
        })
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
                console.log('Worker:', name ,'- Music: Playing: ', songname, '(',songtime,'s)')
                isPlaying = true;
                attempts = 0;
            })
            setInterval(() => {
                //console.log('Worker:', name ,'- Music: Looking for commands.');
                commands(Dispatcher);
            }, 200);

            Dispatcher.on('speaking', speaking => 
            {
                SongTimeElapsed = Math.trunc(Dispatcher.streamTime/1000);
                if (!speaking) //queue next song or leave
                {
                    if(!pause) removeFromQueue(id, true);
                    SongTimeElapsed =0;
                    isPlaying = false;
                    console.log('Worker:', name, '- Music: Song ended :', songname);
                }
            });
            Dispatcher.on('error', error=>
            {
                //removeFromQueue(id, true);
                console.log('Worker:', name, '- Music: Error on attempt no:', attempts,'\t Miniget Error.')//Error:', error)
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
        }).catch
        (()=>
        {
            console.log('Worker:', name, '- Music: Failed to join the channel', voice.name,'Restarting.');
            leave().then(music()).catch(music());
            //restart();
        }
        );
    }
    catch (error)
    {
        console.log('Worker:', name ,'- Music: Play: Error: ', error)
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
                    else leave().then(()=>
                    {
                        music();
                        console.log('WORKER:',name,'- Music: Left.')
                    }).catch(console.log('WORKER:',name,'- Music: Couldnt leave.'))
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
    return new Promise((resolve, reject)=>
    {
        if(bot.guilds.cache.get(guild).voice)
        {
            if(bot.guilds.cache.get(guild).voice.connection)
            {
                var channelName = bot.guilds.cache.get(guild).voice.connection.channel.name;
                console.log('Worker:',name,'- Music: Leaving')
                bot.guilds.cache.get(guild).voice.connection.disconnect()
                deleteQ().then(()=>
                {
                    console.log('Worker:',name,'- Music: Deleted Q. Restarting.')
                    resolve(channelName);
                }).catch(()=>
                {
                    console.log('Worker:',name,'- Music: No Q. Restarting.')
                    resolve(channelName);
                })
            }
        }
        else
        {
            console.log('Worker:',name,'- Music: Leave: Promise Rejected: Not in a voice channel.');
            reject();
        }
    })
}


function deleteQ()
{
    return new Promise ((resolve, reject)=>
    {  
        QueueM.find({guild:guild})
        .then(queue=>
        {   
            if(queue.length==0)
            {
                console.log('WORKER:',name,'- Music: DeleteQ. EmptyQ');
                return reject();
            }
            var i = 0;
            do
            {
                if(i<queue.length)
                {
                    remove(queue[i].id)
                    console.log('WORKER:',name,'- Music: DeleteQ: Removing song:', queue[i].songname);
                }
                i++;
                if(i==queue.length)
                {
                    resolve(true);
                }
            }while((i<queue.length)==true);
        })
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
    removeFromQueue(currentID, true); //it also asks to play the next
}


function queue(channel)
{
    //console.log('Worker:',name,'- Music: Queue: channel:', channel)
    if(isPlaying)
    {
        const embed = new Discord.MessageEmbed;
        embed.setTitle('Queue:')
        embed.setAuthor("Rem-chan", "https://i.imgur.com/g6FSNhL.png")
        embed.setColor(0xd31f1f)
        embed.setFooter('Rem-chan em ', "https://i.imgur.com/g6FSNhL.png")
        embed.setTimestamp()
        QueueM.find({guild:guild})
        .then(Queue=>
        {   
           
            var GuildQueueSize =0;
            var playTime = 0;
            if(Queue.length>0)
            {
                for(var i=0;i<Queue.length; i++)
                {  
                    if(i==0)
                    {
                        embed.addField(`${Queue[i].songname}`,`(${correctedTime(SongTimeElapsed)}/${correctedTime(Queue[i].songtime)})`);
                    }
                    else if(GuildQueueSize<24)
                    {
                        embed.addField(`${Queue[i].songname}`,`(${correctedTime(Queue[i].songtime)})`);
                    }
                    if(GuildQueueSize>24) playTime += parseInt(Queue[i].songtime,10)
                    GuildQueueSize++;
                } 
                if(GuildQueueSize>25)
                {
                    embed.addField(`There are ${GuildQueueSize-25} more in the queue.`, `Wich ammounts to ${correctedTime(playTime)}`)
                }
                bot.channels.cache.get(channel).send(embed)
            }
        });
    }
    
}
function correctedTime(time)
{   
    if(time < 3600)
    {

        if(time%60>1)
        {
            time = Math.trunc(time/60)+':'+ (time-Math.trunc(time/60)*60)
        }
        else time = '0:'+time;
    }
    else 
    {
        let hour = Math.trunc(time/(3600))
        let min = (Math.trunc((time-(3600)*hour)/60))
        let sec = Math.trunc(time-(3600*hour+min*60))
        time = hour+':'+min+':'+sec;
    }
    return time;
}
function restart()
{
    console.log('Worker:', name, '- Music: Restarting.');
    exec('./music.js', [guild, name], (error, stdout, stderr)=>
    {
        if(!error)
        {
            process.kill();
        }
    })
}
function removeCommand()
{
    return new Promise ((resolve, reject)=>
    {  
        Command.find({guild:guild})
        .then(command=>
        {   
            if(command.length==0)
            {
                console.log('WORKER:',name,'- Music: DeleteQ. EmptyQ');
                reject();
            }
            var i = 0;
            do
            {
                if(i<command.length)
                {
                    Command.findByIdAndRemove(command[i].id, (err)=>
                    {
                        if(err) console.log('Worker:',name,'- Music: Failed to remove the command!', err)
                    })
                }
                i++;
                if(i==command.length)
                {
                    resolve(true);
                }
            }while((i<command.length)==true);
        })
    }) 
}