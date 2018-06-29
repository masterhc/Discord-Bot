const commando = require('discord.js-commando');
const axios = require('axios')
const discord = require('discord.js')
class owocommando extends commando.Command{
        constructor(client){
            super(client, {
                name: 'owo',
                group:'image',
                memberName: 'owo',
                description: 'Publica uma imagem do tema: :3.'

            })
        }
        async run(message, args){
            var cmd = 'owo';
            var res = await axios.get('https://rra.ram.moe/i/r', {params: {"type": cmd}});
            var path = res.data.path.replace('/i/', '');
            message(path);
           
            function message(path){
              const embed = new discord.RichEmbed;

                   embed.setImage(`https://cdn.ram.moe/`+path);

               message.channel.send({embed}) 
            }
         }
        }module.exports = owocommando;
