const commando = require('discord.js-commando');
const music = require('discord.js-music-v11');
    class skipCommando extends commando.Command{
        constructor(client){
            super(client, {
                name: 'skip',
                group:'music',
                memberName: 'skip',
                description: 'Salta a musica atual.'

            })
        }
        async run(message, args){
             args=message.content.split(/\s+/g);
              var skipString;
            var messageSplit = message.content.split(' ');
        for(var i=1;i<messageSplit.length; i++){
            if (i===1) {
                  skipString = args[1] ;
            }else{
                skipString = skipString + ' ' + args[i];
            }
           
        };
        skipString= 'skip '+skipString;
        
             music(client, skipString);
            
         }
        }module.exports = skipCommando;
   