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
        message.channel.send(args[1]);
        message.channel.send(args[2]);
        message.channel.send(args[3]);
        var delayH;
        //delay=(((horad*3600000)+(minutod*60000)+(segundod*1000))-300000);
         delayH=((horad*3600000)+(minutosd*60000));
        message.channel.send(delayH);
        message.channel.send(delay);
Ç
        if(delay<0){
            message.channel.send('O Remminder funciona apenas com o tempo restento do presente dia.')
        }else{
             if(params==null){
                        message.channel.send('Por favor especifique o tipo de aviso que pertende.');
                 }else{
                message.reply('yap');
                 
                    
             function notifier2(params) {
               message.reply('Está na hora de executar o que pretendia.');
            }

        
             function notifier(params) {
                switch (params) {
                  case 1:
                      message.reply('O seu ataque tem que ser enviado!');

                      break;
                  case 2:
                      message.reply('Aviso! Tem algo para fazer!');    
                      break;
                  case 3:
                      message.reply('Considere-se relembrado!');
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
}module.exports = testeCommand;