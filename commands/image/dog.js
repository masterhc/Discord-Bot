const commando = require('discord.js-commando');
const axios = require('axios')

class dogcommando extends commando.Command{
        constructor(client){
            super(client, {
                name: 'dog',
                group:'image',
                memberName: 'dog',
                description: 'Publica uma imagem do tema: Cão.'

            })
        }
        async run(message, args){
            var cmd = 'dog';
            var res = await axios.get('https://rra.ram.moe/i/r', {params: {"type": cmd}});
            var path = res.data.path.replace('/i/', '');
            message.channel.send(`https://cdn.ram.moe/`+path);
            

         }
        }module.exports = dogcommando;