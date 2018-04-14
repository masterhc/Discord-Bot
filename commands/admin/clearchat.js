const commando = require('discord.js-commando');
const Discord = require('discord.js');


class clearchatcommando extends commando.Command{
    constructor(client){
        super(client, {
            name: 'clearchat',
            group:'admin',
            memberName: 'clearchat',
            description: 'Limpa o chat designado, este comando pode apenas ser usado por admins.'

        })
    }
    async run(message, args){
      
        if(isAdmin(message.member)){
           async function clear() {
                message.delete();
                const fetched = await message.channel.fetchMessages({limit: 99});
                message.channel.bulkDelete(fetched);
            }
            clear();
        }else{
            const embed = new Discord.RichEmbed();
            embed.setAuthor('Error:','https://i.imgur.com/g6FSNhL.png' )
            embed.setColor(0x27e33d);
            embed.addField(message.author.username+', não tem permissões para usar este comando');
            embed.setThumbnail('https://i.imgur.com/g6FSNhL.png');
            message.channel.send({embed})   
        }
        function isAdmin(member){
            if(member.id==='186540961650835456') return true;
           return member.hasPremission('ADMINISTRATOR');

        }
        

        }


    
}module.exports = clearchatcommando;