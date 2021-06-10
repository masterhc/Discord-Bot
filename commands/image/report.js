const commando = require('discord.js-commando');
const Discord = require('discord.js')
module.exports = class report extends commando.Command{
        constructor(client){
            super(client, {
                name: 'report',
                group:'image',
                memberName: 'report',
                description: 'Coninhas Report.'

            })
        }
        async run(message, args)
        {
          
            const embed = new Discord.MessageEmbed;
            embed.setColor(0xeb7d00);
            embed.setTitle('É favor preencher:')
            embed.setImage(`https://cdn.discordapp.com/attachments/662397316744871937/852352291428499456/64327307_2251125638288816_7660501929683845120_n.jpg`);
            embed.setFooter('Rem-chan em ', "https://i.imgur.com/g6FSNhL.png")
            embed.setTimestamp();
            message.channel.send({embed}) 
        }
}