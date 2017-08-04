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
        args = message.content.split(/\s+/g);
            function notifier(params) {
                message.channel.send('You have been notified');

            }
        setTimeout(notifier, 5000);
        }
    }
    module.exports = testeCommand;