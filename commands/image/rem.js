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
             
          
           
            message(path);
           
            function message(path){
                const embed = new discord.RichEmbed;
               
                embed.setColor(0xb50000);
                embed.setTitle('Imagem:')
                embed.setDescription('[Original]'+`(https://cdn.ram.moe/${path})`);
                embed.setImage(`https://cdn.ram.moe/${path}`);
                embed.setFooter('Rem-chan em ', "https://i.imgur.com/g6FSNhL.png")
                embed.setTimestamp();
                embed.setAuthor("Rem-chan", 'https://i.imgur.com/g6FSNhL.png');
                 console.log(embed.color)
                 console.log(emebd.title)
                 console.log(embed.description)
                 console.log(embed.image)
                 console.log(embed.footer)
                 console.log(embed.timestamp)
                 console.log(embed.author)
                 
                message.channel.send({embed}) 
            }
         }
        }module.exports = remcommando;
