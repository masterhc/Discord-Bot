const commando = require('discord.js-commando');


    class DiceRollCommand extends commando.Command{
        constructor(client){
            super(client, {
                name: 'roll',
                group:'games',
                memberName: 'roll',
                description: 'Rola um dado icosaedrico (d20).'

            })
        }
        async run(message, args){
            var roll = Math.floor(Math.random()*20)+1;
            message.channel.send('A face do dado mostra o número:'+ roll);
        }
    }
    module.exports = DiceRollCommand;