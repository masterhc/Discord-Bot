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
      if(!message.member.roles.find('bot_controller')){
             return message.channel.send('Não tem permissões para usar este comando.')
         };
          
        queueString= 'queue';
        
             music(client, queueString);
           
         }
        }module.exports = queueCommando;
   