const commando = require('discord.js-commando');
const music = require('discord.js-music-v11');
    class leaveCommando extends commando.Command{
        constructor(client){
            super(client, {
                name: 'leave',
                group:'music',
                memberName: 'leave',
                description: 'Apaga a lista e sai da sala.'

            })
        }
        async run(message, args){
             args=message.content.split(/\s+/g);
              var leaveString;
        leaveString= 'leave';
        
             music(client, leaveString);
            
         }
        }module.exports = leaveCommando;
   