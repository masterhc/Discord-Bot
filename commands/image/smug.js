const commando = require('discord.js-commando');
const axios = require('axios')

class smugcommando extends commando.Command{
        constructor(client){
            super(client, {
                name: 'smug',
                group:'image',
                memberName: 'smug',
                description: 'Publica uma imagem do tema: Abraço.'

            })
        }
        async run(message, args){
            var cmd = 'smug';
            var res = await axios.get('https://rra.ram.moe/i/r', {params: {"type": cmd}});
            var path = res.data.path.replace('/i/', '');
        
            message.channel.send(`https://cdn.ram.moe/`+path);
            

         }
        }module.exports = smugcommando;