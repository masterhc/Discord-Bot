const commando = require('discord.js-commando');
class pausecommando extends commando.Command{
    constructor(client){
        super(client, {
            name: 'np',
            group:'music',
            memberName: 'np',
            description: 'Mostra a musica que está a tocar.'

        })
    }
    async run(message, args){
    }
}module.exports = pausecommando;
