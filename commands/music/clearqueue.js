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
        let guildID= message.guild.id
       fs.unlinkSync("../../queue["+guildID+"].json");
    }
}module.exports = clearqueuecommando;
