const commando = require('discord.js-commando');
const Discord = require('discord.js')
const QueueM = require('../../models/queue');

module.exports = class  queue extends commando.Command
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
        var guild = message.guild.id

        const embed = new Discord.MessageEmbed;
        embed.setTitle('Queue:')
        embed.setAuthor("Rem-chan", "https://i.imgur.com/g6FSNhL.png")
        embed.setColor(0xd31f1f)
        embed.setFooter('Rem-chan em ', "https://i.imgur.com/g6FSNhL.png")
        embed.setTimestamp()
       
        
        QueueM.get((err, Queue)=>
        {   
            if(err || Queue.length == 0) 
            {
                embed.addField(`Queue is`,'empty');
                message.channel.send(embed)
            }
            else
            {
                var GuildQueueSize =0;
                if(Queue.length>0)
                {
                    for(var i=0;i<Queue.length; i++)
                    {  
                        if(Queue[i].guild==guild)
                        {
                            if(GuildQueueSize<24)
                            {
                                embed.addField(`${Queue[i].songname}`,`(${Queue[i].songtime})`);
                            }
                            GuildQueueSize++;
                        } 
                        if(GuildQueueSize>25)
                        {
                            embed.addField(`There are ${GuildQueueSize} more in the queue.`)
                        }
                    } 
                    message.channel.send(embed)
                }
            }
        });
       
    }
}