const commando = require('discord.js-commando');
const axios = require('axios')
const discord = require('discord.js')
class vaibuscarumalagostacommando extends commando.Command{
        constructor(client){
            super(client, {
                name: 'vaibuscarumalagosta',
                group:'image',
                memberName: 'vaibuscarumalagosta',
                description: 'Publica uma imagem do tema: lagosta xD'

            })
        }
        async run(message, args){
           
        let path ="http://cdn.sabado.pt/images/2016-03/img_797x448$2016_03_31_16_13_47_160957.jpg"
            
            

            const embed = new discord.RichEmbed;
                    
            embed.setColor(0xb50000);
            embed.setTitle('Imagem:')
            embed.setDescription('[Original]'+`(${path})`);
                 embed.setImage(path);
                 embed.setFooter('Rem-chan em ', "https://i.imgur.com/g6FSNhL.png")
                 embed.setTimestamp();

             message.channel.send({embed}) 
            

         }
        }module.exports = vaibuscarumalagostacommando;