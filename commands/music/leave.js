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
        const Author = message.author
        console.log('Play: -', Author.username,'- Leave')
        if(message.guild.channels.cache.some(channel =>(channel.type == 'voice' && channel.members.has('356104008366030863')&& channel.members.has(Author.id))))
        {
            const path = Path.join(__dirname, `../../${message.guild.id}.json`)
            fs.writeFileSync(path, '{"command":"leave"}');
            message.delete();
        }
        else
        {
            message.reply('Rem isn`t in voice channel!')
        }
        
    }
}
