const commando = require('discord.js-commando');
const axios = require('axios')

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
        
            message.channel.send(`https://cdn.ram.moe/`+path);
            

         }
        }module.exports = remcommando;
