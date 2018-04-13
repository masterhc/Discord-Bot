const commando = require('discord.js-commando');
class volumecommando extends commando.Command{
    constructor(client){
        super(client, {
            name: 'volume',
            group:'music',
            memberName: 'volume',
            description: 'Permite alterar o valor do volume.(0-200)'

        })
    }
    async run(message, args){
    }
}module.exports = volumecommando;
