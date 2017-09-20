const commando = require('discord.js-commando');
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
            message.channel.send(`https://cdn.ram.moe/`+path);
            

         }
        }module.exports = crycommando;
