const commando = require('discord.js-commando');
const music = require('discord.js-music-v11');
    class volumeCommando extends commando.Command{
        constructor(client){
            super(client, {
                name: 'volume',
                group:'music',
                memberName: 'volume',
                description: 'Altera o volume da musica (0<->200).'

            })
        }
        async run(message, args){
             let perms=!message.member.roles.has(345219758481997824);
            if(perms== true){ 
            args=message.content.split(/\s+/g);
              var volumeString;
            var messageSplit = message.content.split(' ');
        for(var i=1;i<messageSplit.length; i++){
            if (i===1) {
                  volumeString = args[1] ;
            }else{
                volumeString = volumeString + ' ' + args[i];
            }
           
        };
        volumeString= 'volume '+volumeString;
        
             music(client, volumeString);
            } else{
               return message.channel.send('Não tem permissão para realizar a ação pedida.');
           }
         }
        }module.exports = volumeCommando;
   