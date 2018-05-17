//Limpa o filtro por completo
const commando = require('discord.js-commando');
const discord = require('discord.js')
const fs = require('fs');

    class clearfilterCommand extends commando.Command{
        constructor(client){
            super(client, {
                name: 'clearfilter',
                group:'tribos',
                memberName: 'clearfilter',
                description: 'Limpa todos os filtros. ',
                hidden:true

            })
        }
        async run(message, args){
            args = message.content.split(/\s+/g);
            
            if(args[1]!= null){return message.channel.send('Verifique a forma como usou o comando.')}
            let file = JSON.parse(fs.readFileSync('coiso.json', 'utf-8'));
            
            let basemodel = {
                "mundo":'"'+file.mundo+'"',
                "K":[]
                
                }
            var outout = JSON.stringify(basemodel);
            fs.writeFileSync('coiso.json', basemodel , 'utf-8')
            mensagem()    
        
            function mensagem(){
                let embed = new discord.RichEmbed
            
                embed.setAuthor("Rem-chan", "https://i.imgur.com/g6FSNhL.png");
                embed.setTitle('Filtros removidos!');
                embed.setDescription('Todos os filtros foram removidos.');
                embed.setColor(0xecd7ac);        
                embed.setTimestamp();
                embed.setFooter('Rem-chan em ', "https://i.imgur.com/g6FSNhL.png")
                message.channel.send({embed}) 

            }
         

 

        }
    }module.exports = clearfilterCommand;
        