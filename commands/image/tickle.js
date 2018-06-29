const commando = require('discord.js-commando');
const axios = require('axios')
const discord = require('discord.js')
class ticklecommando extends commando.Command{
        constructor(client){
            super(client, {
                name: 'tickle',
                group:'image',
                memberName: 'tickle',
                description: 'Publica uma imagem do tema: Cocegas.'

            })
        }
        async run(message, args){
            var cmd = 'tickle';
            var res = await axios.get('https://rra.ram.moe/i/r', {params: {"type": cmd}});
            var path = res.data.path.replace('/i/', '');
            message(path);
           
            function message(path){
                let embed = new discord.RichEmbed;

                   embed.setImage(`https://cdn.ram.moe/`+path);

               message.channel.send(embed) 
            }

         }
        }module.exports = ticklecommando;