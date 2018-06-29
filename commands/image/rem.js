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
                let embed = new discord.RichEmbed;

                   embed.setImage(`https://cdn.ram.moe/`+path);

               message.channel.send(embed) 
            }
         }
        }module.exports = remcommando;
