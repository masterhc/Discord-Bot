const commando = require('discord.js-commando');
const fs = require('fs');

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
            let guilds=JSON.parse(fs.readFileSync('guilds.json', 'utf-8'));
            console.log("guilds"+guilds);´
            


    }

          
    
    }module.exports = CoinFlip;