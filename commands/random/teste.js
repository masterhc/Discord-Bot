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
           message.reply('Já querias fazer merda não era...')
            
          

        }
}module.exports = testeCommand;