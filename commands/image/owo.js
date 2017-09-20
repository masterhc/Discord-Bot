const commando = require('discord.js-commando');
const axios = require('axios')

class owocommando extends commando.Command{
        constructor(client){
            super(client, {
                name: 'owo',
                group:'image',
                memberName: 'owo',
                description: 'Publica uma imagem do tema: :3.'

            })
        }
        async run(message, args){
            var cmd = 'owo';
            var res = await axios.get('https://rra.ram.moe/i/r', {params: {"type": cmd}});
            var path = res.data.path.replace('/i/', '');
            message.channel.send(`https://cdn.ram.moe/`+path);
            

         }
        }module.exports = owocommando;
