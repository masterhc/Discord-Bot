const commando = require('discord.js-commando');

const fs = require('fs');
    class storeCommand extends commando.Command{
        constructor(client){
            super(client, {
                name: 'store',
                group:'economy',
                memberName: 'store',
                description: 'Em construção'

            })
        }
        async run(message, args){
                 let userData = JSON.parse(fs.readFileSync('userData.json', 'utf-8'));
            let sender= message.author;
            let msg = message.content.toUperCase();
          
    }
}module.exports = storeCommand;