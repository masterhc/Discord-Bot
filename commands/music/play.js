const commando = require('discord.js-commando');
const ytdl = require('ytdl-core');
const request = require('request');
const fs = require('fs');
const getYoutubeID = require('get-youtube-id');
const fetchVideoInfo = require('youtube-info')
var config =JSON.parse(fs.readFileSync('.settings.json', 'utf-8'));
const yTKey = config.yt_api_key;


    class tableflip extends commando.Command{
        constructor(client){
            super(client, {
                name: 'play',
                group:'music',
                memberName: 'play',
                description: 'Reproduz a musica.'

            })
        }
        async run(message, args){
             args=message.content.split(/\s+/g);
            
        var queue =[]
        var isPlaying= false;
        var dispacher= null;
        var voiceChannel= null;
        var skipReq = 0;
        var skippers = [];

            var searchContent
             var messageSplit = message.content.split(/\s+/g);
             for(var i=1;i<messageSplit.length; i++){
            if (i===1) {
                searchContent = args[1];em = args[1] ;
            }else{
                searchContent = searchConetent + ' ' + args[i];
            }
           if(queue.length >0 || isPlaying){
               getID(args, function(id){
                    add_to_queue(id);
                    fetchVideoInfo(id, function(err, videoInfo){
                        if(err) throw new Error(err);
                        message.channel.send('Adicionado à lista **'+ videoInfo.title + '**');

                    })
               });
           }else{
               isPlaying = true;
               getID(args, function(id){
                   queue.push('placeholder');   
                   playMusic(id, message);
                   fetchVideoInfo(id, function(err, videoInfo){
                        if(err) throw new Error(err);
                        message.channel.send('A reproduzir **'+ videoInfo.title + '**');

                    })

               })
           }

        

        };
        


       

          
    }
    }
    module.exports = tableflip;
    function playMusic(id, message){
        voiceChannel = message.member.voiceChannel;
        voiceChannel.join().then(function (connection){
            stream = ytdl("https://www.youtube.com/watch?v="+ id,{filter:'audioonly'});
            skipReq = 0;
            skippers = [];
            dispatcher = connection.playStream(stream);
        });

    }
    function getID(str, cb){
        if (isYoutube(str)){
            cb(getYoutubeID(str));
        }else{
            search_video(str, function(id){
                cb(id);
            });
        }
    }
    function add_to_queue(strID){
        if(isYoutube(strID)){
            queue.push(getYoutubeID(strID));

        }else{
            queue.push(strID);
        }
    }
    function search_video(query, callback){
        request("https://www.googleapis.com/youtube/v3/search?part=id&type=video&q=" + encodeURIComponent(query)+"&key=" + yt_api_key, function(error, response, body){
            var json = JSON.pars(body);
            callback(json.items[0].id.videoID);
        });
    }
    function isYoutube(str){
      return str.toLowerCase().indexOf("youtube.com")>-1;  
    }
