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
             let perms=!message.member.roles.has(345219758481997824);
            if(perms== true){
             args=message.content.split(/\s+/g);
              var clearqueueString;
      
        clearqueueString= 'clearqueue '+clearqueueString;
        
             music(client, clearqueueString);
            
         
           }else{
               return message.channel.send('Não tem permissão para realizar a ação pedida.');
           }
           }
        }module.exports = clearqueueCommando;
   