const commando = require('discord.js-commando');
const music = require('discord.js-music-v11');
    class queueCommando extends commando.Command{
        constructor(client){
            super(client, {
                name: 'queue',
                group:'music',
                memberName: 'queue',
                description: 'Mostra a lista.'

            })
        }
        async run(message, args){
             args=message.content.split(/\s+/g);
              var queueString;
  let perms=!message.member.roles.has(345219758481997824);
            if(perms== true){
        queueString= 'queue';
        
             music(client, queueString);
            } else{
               return message.channel.send('Não tem permissão para realizar a ação pedida.');
           }
         }
        }module.exports = queueCommando;
   