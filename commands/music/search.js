const commando = require('discord.js-commando');
class pausecommando extends commando.Command{
    constructor(client){
        super(client, {
            name: 'search',
            group:'music',
            memberName: 'search',
            description: 'Pesquisa no Youtube pela musica com o nome especificado.'
        })
    }
    async run(message, args){
    }
}module.exports = pausecommando;
