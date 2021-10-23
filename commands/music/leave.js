const commando = require('discord.js-commando');
const mCommandModel = require('../../models/mcommands');

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
        console.log('Leave: -', Author.username);
        const guild = message.guild.id
        const channel = message.channel.id
        const voice = message.member.voice.channel.id;
        if(message.guild.channels.cache.some(channel =>(channel.type == 'voice' && channel.members.has('356104008366030863')&& channel.members.has(Author.id))))
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