const commando = require('discord.js-commando');
const axios = require('axios')
const discord = require('discord.js')
class patcommando extends commando.Command{
        constructor(client){
            super(client, {
                name: 'pat',
                group:'image',
                memberName: 'pat',
                description: 'Publica uma imagem do tema: pat.'

            })
        }
        async run(message, args){
            var cmd = 'pat';
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
        }module.exports = patcommando;