const commando = require('discord.js-commando');
const music = require('discord.js-music-v11');
    class clearqueueCommando extends commando.Command{
        constructor(client){
            super(client, {
                name: 'clearqueue',
                group:'music',
                memberName: 'clearqueue',
                description: 'Apaga a lista.'

            })
        }
        async run(message, args){
               if(!message.member.roles.find('bot_controller')){
             return message.channel.send('Não tem permissões para usar este comando.')
         };
          
             args=message.content.split(/\s+/g);
              var clearqueueString;
      
        clearqueueString= 'clearqueue '+clearqueueString;
        
             music(client, clearqueueString);
            
         
       
           }
        }module.exports = clearqueueCommando;
   