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
                if(!message.member.roles.find('bot_controller')){
             return message.channel.send('Não tem permissões para usar este comando.')
         };
          
        resumeString= 'resume';
        
             music(client, resumeString);
           
         }
        }module.exports = resumeCommando;
   