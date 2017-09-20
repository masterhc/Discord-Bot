const commando = require('discord.js-commando');
const axios = require('axios')

class Catcommando extends commando.Command{
        constructor(client){
            super(client, {
                name: 'cat',
                group:'image',
                memberName: 'cat',
                description: 'Publica uma imagem do tema: Gato.'

            })
        }
        async run(message, args){
            var cmd = 'Cat';
            var res = await axios.get('https://rra.ram.moe/i/r', {params: {"type": cmd}});
            var path = res.data.path.replace('/i/', '');
            message.channel.send(`https://cdn.ram.moe/`+path);
            

         }
        }module.exports = Catcommando;
