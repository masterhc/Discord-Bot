

const commando = require('discord.js-commando');
const Discord = require('discord.js');

    class searchGameCommand extends commando.Command{
        constructor(client){
            super(client, {
                name: 'searchGame',
                group:'pesquisa',
                memberName: 'searchGame',
                description: 'Mostra informações sobre o jogo pesquisado.'

            })
        }
        async run(message, args){
            

        }
}module.exports = searchGameCommand;
