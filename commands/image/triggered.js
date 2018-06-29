const commando = require('discord.js-commando');
const axios = require('axios')
const discord = require('discord.js')
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
            message(path);
           
            function message(path){

            const embed = new discord.RichEmbed;
                    
                   embed.setImage(`https://cdn.ram.moe/${path}`);

               message.channel.send(embed) 
            }

         }
        }module.exports = triggeredcommando;