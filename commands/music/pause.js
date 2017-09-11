const commando = require('discord.js-commando');
const music = require('discord.js-music-v11');
    class pauseCommando extends commando.Command{
        constructor(client){
            super(client, {
                name: 'pause',
                group:'music',
                memberName: 'pause',
                description: 'Pausa a musica.'

            })
        }
        async run(message, args){
             args=message.content.split(/\s+/g);
              var pauseString;
         
        pauseString= 'pause';
        
             music(client, pauseString);
            
         }
        }module.exports = pauseCommando;
   