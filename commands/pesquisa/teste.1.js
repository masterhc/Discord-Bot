

const commando = require('discord.js-commando');
const Discord = require('discord.js');

    class searchgameCommand extends commando.Command{
        constructor(client){
            super(client, {
                name: 'searchgame',
                group:'pesquisa',
                memberName: 'searchgame',
                description: 'Mostra informações sobre o jogo pesquisado.'

            })
        }
        async run(message, args){
            
            

        }
}module.exports = searchgameCommand;
