const commando = require('discord.js-commando');
const axios = require('axios')

class patcommando extends commando.Command{
        constructor(client){
            super(client, {
                name: 'pat',
                group:'image',
                memberName: 'pat',
                description: 'Publica uma imagem do tema: pat.'

            })
        }
        async run(message, args){
            var cmd = 'pat';
            var res = await axios.get('https://rra.ram.moe/i/r', {params: {"type": cmd}});
            var path = res.data.path.replace('/i/', '');
        
            message.channel.send(`https://cdn.ram.moe/`+path);
            

         }
        }module.exports = patcommando;