const commando = require('discord.js-commando');
class leavecommando extends commando.Command{
    constructor(client){
        super(client, {
            name: 'leave',
            group:'music',
            memberName: 'leave',
            description: 'Para a musica e retira o bot da sala de voz.'

        })
    }
    async run(message, args){
    }
}module.exports = leavecommando;
