const commando = require('discord.js-commando');
const Discord = require('discord.js')
module.exports = class report extends commando.Command{
        constructor(client){
            super(client, {
                name: 'certificate',
                group:'image',
                memberName: 'certificate',
                description: 'Coninhas certificate.'

            })
        }
        async run(message, args)
        {
          
            const embed = new Discord.MessageEmbed;
            embed.setColor(0xeb7d00);
            embed.setTitle('Pode recolher o seu certificado na loja do cidadão mais proxima.')
            embed.setImage(`https://media.discordapp.net/attachments/662397316744871937/960689544003481600/unknown.png?width=912&height=701`);
            embed.setFooter('Rem-chan em ', "https://i.imgur.com/g6FSNhL.png")
            embed.setTimestamp();
            message.channel.send({embed}) 
        }
}