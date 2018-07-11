const commando = require('discord.js-commando');
const axios = require('axios')
const discord = require('discord.js')
class remcommando extends commando.Command{
        constructor(client){
            super(client, {
                name: 'rem',
                group:'image',
                memberName: 'rem',
                description: 'Publica uma imagem do tema: Our only waifu REM.'

            })
        }
        async run(message, args){
            var cmd = 'rem';
            var res = await axios.get('https://rra.ram.moe/i/r', {params: {"type": cmd}});
            var path = res.data.path.replace('/i/', '');
            console.log(path);
            message(path);
           
            function message(path){
                const embed = new discord.RichEmbed();
                embed.setColor(0xb50000);
                embed.setTitle('Imagem:')
                embed.setDescription('[Original]'+`(${path})`);
                     embed.setImage(`https://cdn.ram.moe/`+path);
                     embed.setFooter('Rem-chan em ', "https://i.imgur.com/g6FSNhL.png")
                     embed.setTimestamp();
  
                 message.channel.send({embed}) 
            }
         }
        }module.exports = remcommando;
