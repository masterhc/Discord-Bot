const commando = require('discord.js-commando');


    class Teste2Command extends commando.Command{
        constructor(client){
            super(client, {
                name: 'teste2',
                group:'random',
                memberName: 'teste2',
                description: ''

            })
        }
        async run(message, args){
          var d= new Date();
           d= d.getDate();

            message.channel.send(d);
        }
    }
    module.exports = Teste2Command;