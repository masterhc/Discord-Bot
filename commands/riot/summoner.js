const commando = require('discord.js-commando');
const Discord= require('discord.js');
const fs = require('fs')
var config = JSON.parse(fs.readFileSync('.settings.json', 'utf-8'));
var key = config.LeagueApiKey;
const  PLATFORM_ID='euw1';
const   TeemoJS = require('teemojs');
const league = new TeemoJS(key)

    class  spectate extends commando.Command{
        constructor(client){
            super(client, {
                name: 'summoner',
                group:'riot',
                memberName: 'summoner',
                description: 'Rem-chan dar-lhe-á informações do(a) jogador(a) que pesquisou.'

            })
        }
        async run(message, args){
            var mensagem;
            var messageSplit = message.content.split(' ');
        args=message.content.split(/\s+/g);
        for(var i=1;i<messageSplit.length; i++){
            if (i===1) {
                  mensagem = args[1] ;
            }else{
                mensagem = mensagem + ' ' + args[i];
            }
           
        };
        
         let jogador = mensagem;
    //Pesquisar pela pessoa e certificar que existe e está em jogo
    //Else return Jogador inexistente ou jogador não está em jogo.

     //Pesquisar o codigo de spectate
    //Enviar mensagem com o codigo 
        league.get(PLATFORM_ID, 'summoner.getBySummonerName', 'hc12')
        .then(data => console.log(data));

                                                                                
           
        

    }
    }
    module.exports = spectate;

    function enviarMensagem(message, jogador, modifier){
          let embed = new Discord.RichEmbed();
            embed.setColor(0xafde30)
           
            embed.setAuthor("Rem-chan", "https://i.imgur.com/g6FSNhL.png");
            embed.setFooter('Rem-chan em ', "https://i.imgur.com/g6FSNhL.png");
            embed.setTimestamp(); 
        
            switch (modifier) {
            case 1:
          
           
            embed.setTitle('Estado do jogador.');
            embed.setDescription('O jogador '+jogador+' que referiu não existe.');
            
           
            message.channel.send({embed})
            case 2:
           

            embed.setTitle('Estatisticas do(a) '+ jogador);
            embed.setDescription('Nivel:'+nivel);
           if(nivel==30){

            embed.addField('Liga Solo/Duo:', sleague);
            embed.addField('Liga Flex:', fleague);
            embed.addField('Liga 3v3', ttleague);
           }else{
               embed.addField('O nivel do(a) '+jogador+' não lhe permite estar nenhuma liga.')
           }

            
            
            
            
        
            embed.addField('Em jogo:', ingame);
            
           
            message.channel.send({embed})
  
            break;

        
            default:
                break;
        }
    }