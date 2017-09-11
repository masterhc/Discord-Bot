const commando = require('discord.js-commando');
const axios = require('axios')

class slapcommando extends commando.Command{
        constructor(client){
            super(client, {
                name: 'slap',
                group:'image',
                memberName: 'slap',
                description: 'Publica uma imagem do tema: Chapada.'

            })
        }
        async run(message, args){
            var cmd = 'slap';
            var res = await axios.get('https://rra.ram.moe/i/r', {params: {"type": cmd}});
            var path = res.data.path.replace('/i/', '');
        
            message.channel.send(`https://cdn.ram.moe/`+path);
            

         }
        }module.exports = slapcommando;
