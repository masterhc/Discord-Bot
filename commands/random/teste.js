
const commando = require('discord.js-commando');
const Discord = require('discord.js');
const YDconstructor = require('youtube-mp3-downloader')
var YD = new YDconstructor({
    "ffmpegpath":"/node_modules/ffmpeg",
    "outputPath": "/YDOutput",    
    "youtubeVideoQuality": "highest",       
    "queueParallelism": 2,                  
    "progressTimeout": 2000   
})

    class testeCommand extends commando.Command{
        constructor(client){
            super(client, {
                name: 'teste',
                group:'random',
                memberName: 'teste',
                description: 'Na possibilidade de partir o bot ao meio, é só não usar se faz favor.'

            })
        }
        async run(message, args){
      
       

        
        }
}module.exports = testeCommand;
