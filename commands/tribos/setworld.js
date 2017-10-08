const commando = require('discord.js-commando');

const fs = require('fs');

    class setworldCommand extends commando.Command{
        constructor(client){
            super(client, {
                name: 'setworld',
                group:'tribos',
                memberName: 'setworld',
                description: 'Altera o mundo do tribos do qual receberá as conquistas ao vivo. Modo de uso: !setworld pt54 '

            })
        }
        async run(message, args){
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
                "beta",
                "th",
                "us",
                "il",
                "ru",
                "ts",
                "ch"
            ]
            for (var filter of servers) {
                if (mundo.indexOf(filter) <0) {
                    return message.channel.send('O servidor referido não existe.');
    
                }
       }
          
            let file = JSON.parse(fs.readFileSync('coiso.json', 'utf-8'));
            let kfilter = file.k
            args = message.content.split(/\s+/g);
            let mundo = args[1]
            if(args[1]== null){return message.channel.send('Por favor defina um mundo')}
            if((typeof mundo)!== String ){ return message.channel.send('Verifique a forma como escreveu o mundo que deseja.')}
            let split = mundo.split(/(|)/);
            let server = split[0]+split[2];
            
            function alterar(mundo, kfilter){
                fs.writeFileSynd('coiso.json', '{\n'+'"'+'mundo'+'"'+':'+mundo+'\n'+'"'+'K'+'"'+':'+kfilter+'\n'+'\n}' , 'utf-8')
            }            

 


        }
}module.exports = setworldCommand;