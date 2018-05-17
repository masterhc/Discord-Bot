const commando = require('discord.js-commando');
const axios = require('axios')

class cuddlecommando extends commando.Command{
        constructor(client){
            super(client, {
                name: 'cuddle',
                group:'image',
                memberName: 'cuddle',
                description: 'Publica uma imagem do tema: Amaços.'

            })
        }
        async run(message, args){
            var cmd = 'cuddle';
            var res = await axios.get('https://rra.ram.moe/i/r', {params: {"type": cmd}});
            var path = res.data.path.replace('/i/', '');
            message.channel.send(`https://cdn.ram.moe/`+path);
            

         }
        }module.exports = cuddlecommando;
