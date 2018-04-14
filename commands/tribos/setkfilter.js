const commando = require('discord.js-commando');
const dicord = require('discord.js')
const fs = require('fs');

    class setkfilterCommand extends commando.Command{
        constructor(client){
            super(client, {
                name: 'setkfilter',
                group:'tribos',
                memberName: 'setkfilter',
                description: 'Altera o continente do qual irá receber as notificações de conquista. Ex.: !setKfilter K34 ',
                hidden:true

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
        mensagem(K)    
        }    
            function mensagem(filtro){
                let embed = new discord.RichEmbed
            
                embed.setAuthor("Rem-chan", "https://i.imgur.com/g6FSNhL.png");
                embed.setDescription('Filtro adicionado!');
                embed.addField('Filtro '+filtro+' adicionado.');
                embed.setColor(0xecd7ac);        
                embed.setTimestamp();
                embed.setFooter('Rem-chan em ', "https://i.imgur.com/g6FSNhL.png")
                bot.channels.get('356084548003561474').send({embed}) 

            }
         

 


        }
}module.exports = setkfilterCommand;