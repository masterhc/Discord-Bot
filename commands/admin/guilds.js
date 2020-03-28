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
            let guilds=JSON.parse(fs.readFileSync('guilds.json', 'utf-8')).guilds;
            console.log("guilds:")
            console.log(guilds)
            //for(i=0;i<=guilds.size; i++){
                console.log("guilds"+guilds[i]);
                
            }


    }

          
    
    }module.exports = CoinFlip;