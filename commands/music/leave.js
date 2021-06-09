const commando = require('discord.js-commando');
const path = require('path')


module.exports = class  play extends commando.Command
{
    constructor(client)
    {
        super(client, {
            name: 'leave',
            group:'music',
            memberName: 'leave',
            description: 'Plays on the voice channel you currently are in.'

        })
    }
    async run(message, args)
    {
        const {voice} = message.member
        if(!voice)
        {
            message.reply('Not currently in a voice channel.')
            return
        }
        else
        {
            voice.channel.leave();
        }          
    }
}
