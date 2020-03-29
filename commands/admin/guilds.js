const commando = require('discord.js-commando');
const Discord = require('discord.js');
const fs = require('fs');

    class Guilds extends commando.Command{
        constructor(client){
            super(client, {
                name: 'guilds',
                group:'admin',
                memberName: 'guilds',
                description: 'Mostra os servidores no qual o servidor está em funcionamento.'

            })
        }
        async run(message, args){
            
            let guilds=JSON.parse(fs.readFileSync('guilds.json', 'utf-8'));
                

          const embed = new Discord.RichEmbed;
                embed.setTitle('Servidores que usam a Rem-chan:')
                embed.setAuthor("Rem-chan", "https://i.imgur.com/g6FSNhL.png")
                embed.setColor(0xd31f1f)
                embed.setFooter('Rem-chan em ', "https://i.imgur.com/g6FSNhL.png")
                embed.setTimestamp()
        
                
            for(var i=0;i<guilds.names.length; i++){  
                 embed.addField(`Servidor ${i+1}:`, guilds.names[i]);
                
                
            }
            message.channel.send({embed})

    }

          
    
    }module.exports = Guilds;