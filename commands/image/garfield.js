const commando = require('discord.js-commando');
const axios = require('axios')

class garfieldcommando extends commando.Command{
        constructor(client){
            super(client, {
                name: 'garfield',
                group:'image',
                memberName: 'garfield',
                description: 'Publica uma imagem do tema: Garfield.'

            })
        }
        async run(message, args){
            var cmd = 'garfield';
            var res = await axios.get('https://rra.ram.moe/i/r', {params: {"type": cmd}});
            var path = res.data.path.replace('/i/', '');
            message.channel.send(`https://cdn.ram.moe/`+path);
            

         }
        }module.exports = garfieldcommando;
