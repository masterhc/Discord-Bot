const commando = require('discord.js-commando');


    class testeCommand extends commando.Command{
        constructor(client){
            super(client, {
                name: 'teste',
                group:'random',
                memberName: 'teste',
                description: 'Na possibilidade de partir o bot ao meio, é só não usar se faz favor.'

            })
        }
        async run(message, args){
            args = message.content.split(/:| /);
        var delay;
        var params = args[4];
        var d = new Date();
        var hora= d.getHours();
        var minuto = d.getMinutes();
        var segundo = d.getSeconds();
        var horaM = args[1];
        var minutoM = args[2];
        var segundoM = args[3];
        var horad = horaM-hora;
        var mintudod = minutoM-minuto;
        var segundod = segundoM-segundo;
        if(horad<0){
             message.channel.send('O Remminder funciona apenas com o tempo que ainda resta do dia atual.');
            if(minutosd<0){
                if(segundosd<0){
                    message.channel.send('O Remminder funciona apenas com o tempo que ainda resta do dia atual.');
                }
            }else if(segundos<0){
            message.channel.send('O Remminder funciona apenas com o tempo que ainda resta do dia atual.');
            }
        }else if(params){

        }else{
            delay=(horad*3600000)+((minutod-5)*60000)+(segundod*1000)
        
            function notifier2(params) {
               message.channel.send('Está na hora de executar o que pretendia.')

        
          function notifier(params) {
              switch (params) {
                  case 1:
                      message.channel.send('O seu ataque tem que ser enviado!');

                      break;
                  case 2:
                      message.channel.send('Aviso! Tem algo para fazer!');    
                      break;
                  case 3:
                      message.channel.send('Cosnidere-se relembrado!');
                      break;

                  default:

                      break;
              }
                 
                setTimeout(notifier2, 300000);
            }
         setTimeout(notifier, delay);
            }
        }
        }
    }
    module.exports = testeCommand;