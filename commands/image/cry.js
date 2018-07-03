const commando = require('discord.js-commando');
const discord = require('discord.js')
const axios = require('axios')
class crycommando extends commando.Command{
        constructor(client){
            super(client, {
                name: 'cry',
                group:'image',
                memberName: 'cry',
                description: 'Publica uma imagem do tema: Choro.'

            })
        }
        async run(message, args){
            var cmd = 'cry';
            var res = await axios.get('https://rra.ram.moe/i/r', {params: {"type": cmd}});
            var path = res.data.path.replace('/i/', '');
            message(path);
           
            function message(path){
                const embed = new discord.RichEmbed();

                embed.setColor(0xb50000);
              embed.setDescription('[Original]'+`(${path})`);
                   embed.setImage(`https://cdn.ram.moe/`+path);

               message.channel.send({embed}) 
            }

         }
        }module.exports = crycommando;
