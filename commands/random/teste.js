const commando = require('discord.js-commando');

const snekfetch = require('snekfetch');
const http = require('http');
    class testeCommand extends commando.Command{
        constructor(client){
            super(client, {
                name: 'teste',
                group:'random',
                memberName: 'teste',
                description: 'Na possibilidade de partir o bot ao meio, é só não usar se faz favor.'

            })
        }
        async run(message, args){
          //  var site = 'http://www.twstats.com/pt54/index.php?page=ennoblements&live=live'
            
           // const html= await snekfetch.get('https://google.com').then(result => result.body);
          //  console.log(html);
message.channel.send({ embed: { title:'Coiso', color: 0xf4ce42 } });

        }
}module.exports = testeCommand;