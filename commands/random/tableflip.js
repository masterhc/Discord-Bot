const commando = require('discord.js-commando');


    class tableflip extends commando.Command{
        constructor(client){
            super(client, {
                name: 'tableflip',
                group:'random',
                memberName: 'tableflip',
                description: 'Flips a table.'

            })
        }
        async run(message, args){
         message.channel.send('(╯°□°）╯︵ ┻━┻');

          
    }
    }
    module.exports = tableflip;