const commando = require('discord.js-commando');
const music = require('discord.js-music-v11');
    class leaveCommando extends commando.Command{
        constructor(client){
            super(client, {
                name: 'leave',
                group:'music',
                memberName: 'leave',
                description: 'Apaga a lista e sai da sala.'

            })
        }
        async run(message, args){
             let perms=!message.member.roles.has(345219758481997824);
            if(perms== true){ 
         
              var leaveString = 'leave';
        
             music(client, leaveString);
            
            }else{
               return message.channel.send('Não tem permissão para realizar a ação pedida.');
           }
            }
        }module.exports = leaveCommando;
   