const commando = require('discord.js-commando');
class skipcommando extends commando.Command{
    constructor(client){
        super(client, {
            name: 'skip',
            group:'music',
            memberName: 'skip',
            description: 'Salta uma musica na lista.'

        })
    }
    async run(message, args){
    }
}module.exports = skipcommando;
