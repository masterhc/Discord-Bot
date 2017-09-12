const commando = require('discord.js-commando');
const music = require('discord.js-music-v11');
    class resumeCommando extends commando.Command{
        constructor(client){
            super(client, {
                name: 'resume',
                group:'music',
                memberName: 'resume',
                description: 'Retoma a reprodução da musica.'

            })
        }
        async run(message, args){
             args=message.content.split(/\s+/g);
              var resumeString;
            let perms=!message.member.roles.has(345219758481997824);
            if(perms== true){
        resumeString= 'resume';
        
             music(client, resumeString);
            }else{
               return message.channel.send('Não tem permissão para realizar a ação pedida.');
           }    
         }
        }module.exports = resumeCommando;
   