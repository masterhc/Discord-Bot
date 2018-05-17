const commando = require('discord.js-commando');
class pausecommando extends commando.Command{
    constructor(client){
        super(client, {
            name: 'pause',
            group:'music',
            memberName: 'pause',
            description: 'Coloca em pausa a musica.'

        })
    }
    async run(message, args){
    }
}module.exports = pausecommando;
