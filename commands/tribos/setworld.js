const commando = require('discord.js-commando');
const Discord = require('discord.js')
const fs = require('fs');

    class setworldCommand extends commando.Command{
        constructor(client){
            super(client, {
                name: 'setworld',
                group:'tribos',
                memberName: 'setworld',
                description: 'Altera o mundo do tribos do qual receberá as conquistas ao vivo. Modo de uso: !setworld pt54 ',
                hidden:true

            })
        }
        async run(message, args){
            let file = JSON.parse(fs.readFileSync('coiso.json', 'utf-8'));
            
            let kfilter = file.K
            args = message.content.split(/\s+/g);
            
            let mundo = args[1]
            console.log("mundo "+mundo)
            if(args[1]== null){return message.channel.send('Por favor defina um mundo')}
            if((typeof mundo)!== "string" ){ return message.channel.send('Verifique a forma como escreveu o mundo que deseja.')}
           
            
            // Ver como filtrar coisas com um if
            // adicionar todo os servidores
            //Arranjar forma de verificar se os mundos existem mesmo
            var servers = [
                "se",
                "nl",
                "br",
                "ro",
                "no",
                "pt",
                "gr",
                "sk",
                "hu",
                "dk",
                "ba",
                "cz",
                "es",
                "it",
                "fr",
                "tr",
                "fi",
                "ae",
                "de",
                "pl",
                "si",
                "id",
                "hr",
                "lt",
                "bg",
                "be",
                "th",
                "us",
                "il",
                "ru",
                "ts",
                "ch"
            ]
            console.log(servers[5])
            let split = mundo.split(/(|)/);
            console.log("split "+split)
            let server = split[0]+split[2];
            console.log("server "+server)
           
            console.log("length "+ servers.length)
            var count = 0;
            

            for(var j=0; j<servers.length; j++){
                
                if (server==servers[j]){
                    count++;
                }
            }
            console.log("aqui "+count+" gvg "+j)
           
            if(count>0){   
        
            
            alterar(mundo, kfilter);
            }else{
                message.channel.send("O servidor referido não existe.")
            }
            
            function alterar(mundo, kfilter){
                console.log(mundo);

               if(kfilter.lenth>0){ fs.writeFileSync('coiso.json', '{\n'+'"'+'mundo'+'",'+':"'+mundo+'"\n'+'"'+'K'+'"'+':["'+kfilter+'"]\n'+'\n}' , 'utf-8')
            }else {fs.writeFileSync('coiso.json', '{\n'+'"'+'mundo'+'"'+':"'+mundo+'",\n'+'"'+'K'+'"'+':['+kfilter+']\n'+'\n}' , 'utf-8')
            }   
                mensagem(mundo);
            }            
            function mensagem(mundo){
                let embed = new Discord.RichEmbed
                    
                embed.setAuthor("Rem-chan", "https://i.imgur.com/g6FSNhL.png");
                embed.setTitle('Mundo alterado!');
                embed.setDescription('Mundo alterado para '+mundo);
                embed.setColor(0xecd7ac);        
                embed.setTimestamp();
                embed.setFooter('Rem-chan em ', "https://i.imgur.com/g6FSNhL.png")
                
                message.channel.send({embed}) 


            }
 


        }
}module.exports = setworldCommand;