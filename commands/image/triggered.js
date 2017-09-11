const commando = require('discord.js-commando');
const axios = require('axios')

class triggeredcommando extends commando.Command{
        constructor(client){
            super(client, {
                name: 'triggered',
                group:'image',
                memberName: 'triggered',
                description: 'Publica uma imagem do tema: TRIGGERED!'

            })
        }
        async run(message, args){
            var cmd = 'triggered';
            var res = await axios.get('https://rra.ram.moe/i/r', {params: {"type": cmd}});
            var path = res.data.path.replace('/i/', '');
        
            message.channel.send(`https://cdn.ram.moe/`+path);
            

         }
        }module.exports = triggeredcommando;