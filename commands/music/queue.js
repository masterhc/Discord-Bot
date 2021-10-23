
const commando = require('discord.js-commando');
const mCommandModel = require('../../models/mcommands');


module.exports = class  leave extends commando.Command
{
    constructor(client)
    {
        super(client, {
            name: 'queue',
            group:'music',
            memberName: 'queue',
            description: 'Shows the queue for the current server.'

        })
    }
    async run(message, args)
    {
        const Author = message.author
        console.log('Queue: -', Author.username);
        const guild = message.guild.id
        const channel = message.channel.id
        const voice = message.member.voice.channel.id;
        if(message.guild.channels.cache.some(channel =>(channel.type == 'voice' && channel.members.has('356104008366030863'))))
        {
            addToDB('leave', guild, channel,voice);
            
            message.delete();
        }
        else
        {
            message.reply('Rem isn`t in voice channel!')
        }
        
    }
}
function addToDB(Command, guild, channel, voice)
{
    var command = new mCommandModel();
    command.command = Command;
    command.guild = guild;
    command.textchannel = channel;
    command.voice = voice;
    command.save(err=>
    {
        if(err)console.error(err)
        console.log(Command, '- added to DB')
    })
}