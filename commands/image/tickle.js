const commando = require('discord.js-commando');
const axios = require('axios')

class ticklecommando extends commando.Command{
        constructor(client){
            super(client, {
                name: 'tickle',
                group:'image',
                memberName: 'tickle',
                description: 'Publica uma imagem do tema: Abraço.'

            })
        }
        async run(message, args){
            var cmd = 'tickle';
            var res = await axios.get('https://rra.ram.moe/i/r', {params: {"type": cmd}});
            var path = res.data.path.replace('/i/', '');
        
            message.channel.send(`https://cdn.ram.moe/`+path);
            

         }
        }module.exports = ticklecommando;