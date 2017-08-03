const commando = require('discord.js-commando');


    class testeCommand extends commando.Command{
        constructor(client){
            super(client, {
                name: 'teste',
                group:'random',
                memberName: 'teste',
                description: 'Na possibilidade de partir o bot ao meio, é só não usar se faz favor.'

            })
        }
        async run(message, args){
        args= message.content.split(/\s+/g);
         message.channel.send(args[0]+' '+ args[1]+' '+args[2]+' '+args[3]);

        }
    }
    module.exports = testeCommand;