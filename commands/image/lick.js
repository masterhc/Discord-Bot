const commando = require('discord.js-commando');
const axios = require('axios')
const discord = require('discord.js')
class lickcommando extends commando.Command{
        constructor(client){
            super(client, {
                name: 'lick',
                group:'image',
                memberName: 'lick',
                description: 'Publica uma imagem do tema: Lamber.'

            })
        }
        async run(message, args){
            var cmd = 'lick';
            var res = await axios.get('https://rra.ram.moe/i/r', {params: {"type": cmd}});
            var path = res.data.path.replace('/i/', '');
           
                const embed = new discord.MessageEmbed;
                embed.setColor(0xb50000);
                embed.setDescription('[Original]'+`(${path})`);
                embed.setTitle('Imagem:')
                     embed.setImage(`https://cdn.ram.moe/`+path);
                     embed.setFooter('Rem-chan em ', "https://i.imgur.com/g6FSNhL.png")
                     embed.setTimestamp();
  
                 message.channel.send({embed}) 
            
         }
        }module.exports = lickcommando;
