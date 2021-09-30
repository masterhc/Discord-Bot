const commando = require('discord.js-commando');
const fs = require('fs')

const Path = require('path')  


module.exports = class  resume extends commando.Command
{
    constructor(client)
    {
        super(client, {
            name: 'resume',
            group:'music',
            memberName: 'resume',
            description: 'Resumes the currently playing music'
         })
    }
    async run(message, args)
    {
        const Author = message.author
        if(message.guild.channels.cache.some(channel =>(channel.type == 'voice' && channel.members.has('356104008366030863')&& channel.members.has(Author.id))))
        {
            const path = Path.join(__dirname, `../../${message.guild.id}.json`)
            fs.writeFileSync(path,'{"command":"resume"}');
            message.delete();
        }
        else
        {
            message.reply('Not in voice channel!')
        }
        
        
       
    }
}