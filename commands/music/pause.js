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
          let perms=!message.member.roles.has(345219758481997824);
            if(perms== true){
        pauseString= 'pause';
        
             music(client, pauseString);
            } else{
               return message.channel.send('Não tem permissão para realizar a ação pedida.');
           }
         }
        }module.exports = pauseCommando;
   