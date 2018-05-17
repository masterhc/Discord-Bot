const commando = require('discord.js-commando');
class queuecommando extends commando.Command{
    constructor(client){
        super(client, {
            name: 'queue',
            group:'music',
            memberName: 'queue',
            description: 'Mostra a lista de musicas.'

        })
    }
    async run(message, args){
    }
}module.exports = queuecommando;
