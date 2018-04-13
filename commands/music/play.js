const commando = require('discord.js-commando');
class playcommando extends commando.Command{
    constructor(client){
        super(client, {
            name: 'play',
            group:'music',
            memberName: 'play',
            description: 'Coloca uma musica a tocar.'

        })
    }
    async run(message, args){
    }
}module.exports = playcommando;
