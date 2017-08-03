const commando = require('discord.js-commando');


    class remminderCommand extends commando.Command{
        constructor(client){
            super(client, {
                name: 'remminder',
                group:'tribos',
                memberName: 'remminder',
                description: 'Em construção'

            })
        }
        async run(message, args){
        args= message.content.split(/\s+/g);
         message.channel.send("Domn't use me.");
         

        }
    }
    module.exports = remminderCommand;