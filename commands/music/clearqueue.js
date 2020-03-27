const commando = require('discord.js-commando');
class clearqueuecommando extends commando.Command{
    constructor(client){
        super(client, {
            name: 'clearqueue',
            group:'music',
            memberName: 'clearqueue',
            description: 'Limpa a lista de musicas.'

        })
    }
    async run(message, args){
   
    }
}module.exports = clearqueuecommando;
