const commando = require('discord.js-commando');
const mCommandModel = require('../../models/mcommands');



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
        console.log('Pause: -', Author.username)
        const guild = message.guild.id
        const channel = message.channel.id
        const voice = message.member.voice.channel.id;
        if(message.guild.channels.cache.some(channel =>(channel.type == 'voice' && channel.members.has('356104008366030863')&& channel.members.has(Author.id))))
        {
            addToDB('pause', guild, channel,voice);

            message.delete();
        }
        else
        {
            message.reply('Not in voice channel!')
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