const commando = require('discord.js-commando');



    class Teste2Command extends commando.Command{
        constructor(client){
            super(client, {
                name: 'teste2',
                group:'random',
                memberName: 'teste2',
                description: ''

            })
        }
        async run(message, args){
           args=message.content.split(/ /);
          
        
            message.member.voiceChannel.join();

          
    }
    }
    module.exports = Teste2Command;