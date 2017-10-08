const commando = require('discord.js-commando');

const fs = require('fs');

    class setkfilterCommand extends commando.Command{
        constructor(client){
            super(client, {
                name: 'setkfilter',
                group:'tribos',
                memberName: 'setkfilter',
                description: 'Altera o continente do qual irá receber as notificações de conquista. Ex.: !setKfilter K34 '

            })
        }
        async run(message, args){
        
          
            args = message.content.split(/\s+/g);
            let file = JSON.parse(fs.readFileSync('coiso.json', 'utf-8'));
            let mundo = file.mundo
            let K = args[1]
            if(args[1]== null){return message.channel.send('Por favor defina um continente')}
            if((typeof K)!== String ){ return message.channel.send('Verifique a forma como escreveu o continente que deseja.')}
            let Kfilter = file.K;
            kfilter.push(K);
            console.log(kfilter);
            function alterar(kfilter, mundo){
            fs.writeFileSynd('coiso.json', '{\n'+'"'+'mundo'+'"'+':'+mundo+'\n'+'"'+'K'+'"'+':'+kfilter+'\n'+'\n}' , 'utf-8')
            }            

 


        }
}module.exports = setkfilterCommand;