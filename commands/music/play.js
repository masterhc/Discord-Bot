const commando = require('discord.js-commando');
class playcommando extends commando.Command{
    constructor(client){
        super(client, {
            name: 'play',
            group:'music',
            memberName: 'play',
            description: 'Coloca em pausa a musica.'

        })
    }
    async run(message, args){
    }
}module.exports = playcommando;
