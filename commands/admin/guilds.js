const commando = require('discord.js-commando');


    class CoinFlip extends commando.Command{
        constructor(client){
            super(client, {
                name: 'guilds',
                group:'admin',
                memberName: 'guilds',
                description: 'Mostra os servidores no qual o servidor está em funcionamento.'

            })
        }
        async run(message, args){
           message.send(client.guilds)

    }

          
    
    }module.exports = CoinFlip;