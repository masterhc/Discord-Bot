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
            
            var res = await axios.get('https://rra.ram.moe/i/r', {params: {"type": "rem"}});
            var path = res.data.path.replace('/i/', '');
             
          
           
          
               var embed = new discord.MessageEmbed;
               
                embed.setColor(0x85b1f7);
                embed.setTitle('Imagem:')
                embed.setDescription('[Original]'+`(https://cdn.ram.moe/${path})`);
                embed.setImage(`https://cdn.ram.moe/${path}`);
                embed.setFooter('Rem-chan em ', "https://i.imgur.com/g6FSNhL.png")
                embed.setTimestamp();
                embed.setAuthor("Rem-chan", 'https://i.imgur.com/g6FSNhL.png');
                console.log('message: '+message) 
                console.log('mesage.channel: '+message.channel);

                message.channel.send({embed}) 
        
         }
        }module.exports = remcommando;
