const commando = require('discord.js-commando');
const axios = require('axios')

class lickcommando extends commando.Command{
        constructor(client){
            super(client, {
                name: 'lick',
                group:'image',
                memberName: 'lick',
                description: 'Publica uma imagem do tema: Lamber.'

            })
        }
        async run(message, args){
            var cmd = 'lick';
            var res = await axios.get('https://rra.ram.moe/i/r', {params: {"type": cmd}});
            var path = res.data.path.replace('/i/', '');
            message.channel.send(`https://cdn.ram.moe/`+path);
            

         }
        }module.exports = lickcommando;
