const commando = require('discord.js-commando');
class pausecommando extends commando.Command{
    constructor(client){
        super(client, {
            name: 'mhelp',
            group:'music',
            memberName: 'mhelp',
            description: 'Mostra a ajuda para comandos musicais.'

        })
    }
    async run(message, args){
    }
}module.exports = pausecommando;
