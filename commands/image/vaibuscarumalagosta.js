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
           
        let path ="https://imgur.com/a/o48X3RZ"
            
            message(path);
           
            function message(path){

            const embed = new discord.RichEmbed();
                    
            embed.setColor(0xb50000);
            embed.setTitle('Imagem:')
            embed.setDescription('[Original]'+`(${path})`);
                 embed.setImage(path);
                 embed.setFooter('Rem-chan em ', "https://i.imgur.com/g6FSNhL.png")
                 embed.setTimestamp();

             message.channel.send({embed}) 
            }

         }
        }module.exports = vaibuscarumalagostacommando;