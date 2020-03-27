const commando = require('discord.js-commando');
class pausecommando extends commando.Command{
    constructor(client){
        super(client, {
            name: 'owner',
            group:'music',
            memberName: 'owner',
            description: 'Permite colocar um ID de owner para sobrepor aos comandos usados por outros não "owners".'

        })
    }
    async run(message, args){
    }
}module.exports = pausecommando;
