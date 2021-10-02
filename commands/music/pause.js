const commando = require('discord.js-commando');
const fs = require('fs')

const Path = require('path')  


module.exports = class  skip extends commando.Command
{
    constructor(client)
    {
        super(client, {
            name: 'pause',
            group:'music',
            memberName: 'pause',
            description: 'Pauses the currently playing music'
         })
    }
    async run(message, args)
    {
        const Author = message.author
        console.log('Play: -', Author.username,'- Pause')
        if(message.guild.channels.cache.some(channel =>(channel.type == 'voice' && channel.members.has('356104008366030863')&& channel.members.has(Author.id))))
        {
            const path = Path.join(__dirname, `../../${message.guild.id}.json`)
            fs.writeFileSync(path,'{"command":"pause"}');
            message.delete();
        }
        else
        {
            message.reply('Not in voice channel!')
        }
        
        
       
    }
}