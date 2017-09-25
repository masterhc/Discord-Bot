const commando = require('discord.js-commando');
const Discord= require('discord.js');
const fs = require('fs')
var config = JSON.parse(fs.readFileSync('.settings.json', 'utf-8'));
var key = config.LeagueApiKey;
const LeagueJs = require('LeagueJS.js');
const league = new LeagueJs(key, {PLATFORM_ID:'euw1'});

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
        message.channel.send('Em construção!');
         let jogador = mensagem;
    //Pesquisar pela pessoa e certificar que existe e está em jogo
    //Else return Jogador inexistente ou jogador não está em jogo.

     //Pesquisar o codigo de spectate
     //Enviar mensagem com o codigo 
    
    league.Summoner
     .gettingByName(jogador)
     .then(data => {
         'use strict';
         console.log(data);     //Tentar retirar daqui o ID do jogador se possivel o ID do jogo
     })
     .catch(err => {
         'use strict';
         console.log(err); // Se err = XXXX modifier X
     });
                                                                                    //enviarMensagem
     league.Spectator.gettingByAccount(jogadorID, 'euw').then(data =>{'use strict';console.log(data)})
           
        

    }
    }
    module.exports = spectate;
    function enviarMensagem(message, modifier, jogador, ligação, dados){
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