const commando = require('discord.js-commando');
class resumecommando extends commando.Command{
    constructor(client){
        super(client, {
            name: 'resume',
            group:'music',
            memberName: 'resume',
            description: 'Retoma a reprodução da musica.'

        })
    }
    async run(message, args){
    }
}module.exports = resumecommando;
