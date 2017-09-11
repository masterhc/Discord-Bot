const commando = require('discord.js-commando');
const music = require('discord.js-music-v11');
    class playCommando extends commando.Command{
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
              var playString;
            var messageSplit = message.content.split(' ');
        for(var i=1;i<messageSplit.length; i++){
            if (i===1) {
                  playString = args[1] ;
            }else{
                playString = playString + ' ' + args[i];
            }
           
        };
        playString= 'play '+playString;
        
             music(client, playString);
            
         }
        }module.exports = playCommando;
   