const commando = require('discord.js-commando');
const fs = require('fs')

const Path = require('path')  

module.exports = class  leave extends commando.Command
{
    constructor(client)
    {
        super(client, {
            name: 'leave',
            group:'music',
            memberName: 'leave',
            description: 'Leaves the voice channel you currently are in.'

        })
    }
    async run(message, args)
    {
    console.log('Leave: ', message.author.has('342744569676562443'))
        if(message.guild.channels.cache.some(channel =>(channel.type == 'voice' && channel.members.has('356104008366030863'))))
        {
            const path = Path.join(__dirname, `../../${message.guild.id}.json`)
            fs.writeFileSync(path, '{"command":"leave"}');
            message.delete();
        }
        else
        {
            message.reply('Not in voice channel!')
        }
        
    }
}
