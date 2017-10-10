//Limpa o filtro por completo
const commando = require('discord.js-commando');
const dicord = require('discord.js')
const fs = require('fs');

    class clearfilterCommand extends commando.Command{
        constructor(client){
            super(client, {
                name: 'clearfilter',
                group:'tribos',
                memberName: 'clearfilter',
                description: 'Limpa todos os filtros. '

            })
        }
        async run(message, args){
            args = message.content.split(/\s+/g);
            
            if(args[1]!= null){return message.channel.send('Verifique a forma como usou o comando.')}
            let file = JSON.parse(fs.readFileSync('coiso.json', 'utf-8'));
            let mundo = file.mundo
            let kfilter = [

            ];
            fs.writeFileSynd('coiso.json', '{\n'+'"'+'mundo'+'"'+':'+mundo+'\n'+'"'+'K'+'"'+':'+kfilter+'\n'+'\n}' , 'utf-8')
            mensagem()    
        
            function mensagem(){
                let embed = new discord.RichEmbed
            
                embed.setAuthor("Rem-chan", "https://i.imgur.com/g6FSNhL.png");
                embed.setDescription('Filtros removidos!');
                embed.addField('Todos os filtros foram removidos.');
                embed.setColor(0xecd7ac);        
                embed.setTimestamp();
                embed.setFooter('Rem-chan em ', "https://i.imgur.com/g6FSNhL.png")
                bot.channels.get('356084548003561474').send({embed}) 

            }
         

 

        }
    }module.exports = clearfilterCommand;
        