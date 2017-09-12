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
            
            
            let sender= message.author;
            let arguments = message.content.toUperCase();
          
    }
}module.exports = storeCommand;