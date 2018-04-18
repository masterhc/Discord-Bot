const commando = require('discord.js-commando');
const Discord = require('discord.js');
const fs = require('fs');
const cheerio = require('cheerio');
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
            

        }
}module.exports = testeCommand;
