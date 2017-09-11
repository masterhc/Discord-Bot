const commando = require('discord.js-commando');
const axios = require('axios')

class starecommando extends commando.Command{
        constructor(client){
            super(client, {
                name: 'stare',
                group:'image',
                memberName: 'stare',
                description: 'Publica uma imagem do tema: Olhar fixo.'

            })
        }
        async run(message, args){
            var cmd = 'stare';
            var res = await axios.get('https://rra.ram.moe/i/r', {params: {"type": cmd}});
            var path = res.data.path.replace('/i/', '');
        
            message.channel.send(`https://cdn.ram.moe/`+path);
            

         }
        }module.exports = starecommando;