const commando = require('discord.js-commando');
const axios = require('axios')
const discord = require('discord.js')
class hugcommando extends commando.Command{
        constructor(client){
            super(client, {
                name: 'hug',
                group:'image',
                memberName: 'hug',
                description: 'Publica uma imagem do tema: Abraço.'

            })
        }
        async run(message, args){
            var cmd = 'hug';
            var res = await axios.get('https://rra.ram.moe/i/r', {params: {"type": cmd}});
            var path = res.data.path.replace('/i/', '');
            message(path);
           
            function message(path){
               const embed = new discord.RichEmbed();
               embed.setColor(0xb50000);
               embed.setColor(0xb50000);
               embed.setDescription('[Original]'+`(${path})`);
               embed.setTitle('Imagem:')
                    embed.setImage(`https://cdn.ram.moe/`+path);
                    embed.setFooter('Rem-chan em ', "https://i.imgur.com/g6FSNhL.png")
                    embed.setTimestamp();
                message.channel.send({embed}) 
            }
         }
        }module.exports = hugcommando;