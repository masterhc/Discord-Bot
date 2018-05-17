const commando = require('discord.js-commando');
const axios = require('axios')

class poutcommando extends commando.Command{
        constructor(client){
            super(client, {
                name: 'pout',
                group:'image',
                memberName: 'pout',
                description: 'Publica uma imagem do tema: Beicinho.'

            })
        }
        async run(message, args){
            var cmd = 'pout';
            var res = await axios.get('https://rra.ram.moe/i/r', {params: {"type": cmd}});
            var path = res.data.path.replace('/i/', '');
        
            message.channel.send(`https://cdn.ram.moe/`+path);
            

         }
        }module.exports = poutcommando;
