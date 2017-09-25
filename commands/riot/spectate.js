process.env.LEAGUE_API_PLATFORM_ID = 'euw1'

const commando = require('discord.js-commando');
const Discord= require('discord.js');
const league = require('leaguejs');
const api = new league('RGAPI-e6d872a5-a104-4902-8feb-1c534cae3300');
                       
                       
    class  spectate extends commando.Command{
        constructor(client){
            super(client, {
                name: 'spectate',
                group:'riot',
                memberName: 'spectate',
                description: 'Rem-chan dar-lhe há um link apartir do qual irá poder assister ao jogo da pessoa que pesquisou.'

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
          var jogadorId;
    //Pesquisar pela pessoa e certificar que existe e está em jogo
    //Else return Jogador inexistente ou jogador não está em jogo.

     //Pesquisar o codigo de spectate
     //Enviar mensagem com o codigo  
          if(jogador== null){return message.channel.send('Jogador não definido')} 
          api.Summoner
    .gettingByName(jogador)
    .then(data => {
        'use strict';
       jogadorId=data.id;
       
    })
    .catch(err => {
        'use strict';
        
            if(err != null){mensagem(message, 1)}
    });
      
           
        
if(err==404)
    }
    }
    module.exports = spectate;
    function mensagem(message, modifier, jogador, ligação, dados){
            //Colocar os dados de jogo em um array caso não venham já
    
        switch (modifier) {
            case 1:
                let embed = new Discord.RichEmbed();
                embed.setAuthor("Rem-chan", "https://i.imgur.com/g6FSNhL.png");
                embed.setTitle('Existencia do jogador.');
                embed.setDescription('O jogador '+jogador +' não existe.');
                embed.setColor(0xafde30)
                
                embed.setFooter('Rem-chan em ', "https://i.imgur.com/g6FSNhL.png");
                embed.setTimestamp(); 
                message.channel.send({embed});
                break;
            case 2:
                let embed = new Discord.RichEmbed();
                embed.setAuthor("Rem-chan", "https://i.imgur.com/g6FSNhL.png");
                embed.setTitle('Estado do jogador.');
                embed.setDescription('O jogador '+jogador+' que referiu não existe.');
                embed.setColor(0xafde30)
            
                embed.setFooter('Rem-chan em ', "https://i.imgur.com/g6FSNhL.png");
                embed.setTimestamp(); 
                message.channel.send({embed})
                break;
            case 3:
                let embed = new Discord.RichEmbed();
                embed.setAuthor("Rem-chan", "https://i.imgur.com/g6FSNhL.png");
                embed.setTitle('Ligação de espectador.');                   //dados[1]>champion dados[2]>tempo
                embed.setDescription('O jogador '+jogador+' está em jogo com '+dados[1]+' à '+dados[2]+'.');
                
                embed.setColor(0xafde30)
                embed.addField('[Assistir]'+'('+ligação+')');
                embed.setFooter('Rem-chan em ', "https://i.imgur.com/g6FSNhL.png");
                embed.setTimestamp(); 
                message.channel.send({embed});
                break;
            default:
                break;
        }
    }
