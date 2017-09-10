const commando = require('discord.js-commando');
const fs = require('fs');
var config = JSON.parse(fs.readFileSync('.settings.json', 'utf-8'));
    class playCommando extends commando.Command{
        constructor(client){
            super(client, {
                name: 'play',
                group:'music',
                memberName: 'play',
                description: 'Reproduz a musica.'

            })
        }
        async run(message, args){
             args=message.content.split(/\s+/g);
             
      
         }
        }module.exports = playCommando;
   