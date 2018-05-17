const commando = require('discord.js-commando');
class ownercommando extends commando.Command{
    constructor(client){
        super(client, {
            name: 'owner',
            group:'music',
            memberName: 'owner',
            description: 'W.I.P.'

        })
    }
    async run(message, args){
    }
}module.exports = ownercommando;
