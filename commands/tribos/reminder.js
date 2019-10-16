const commando = require('discord.js-commando');


    class reminderCommand extends commando.Command{
        constructor(client){
            super(client, {
                name: 'reminder',
                group:'tribos',
                memberName: 'reminder',
                description: 'Este comando enviar-lhe-á um aviso quando faltarem 5 minutos para a hora pedida. \n Pode escolher entre 3 tipos de aviso:\n 1 - "O seu ataque tem que ser enviado!" \n 2-"Aviso! Tem algo para fazer!"\n 3-"Considere-se relembrado." .\n Exemplo de uso:\n "!reminder 23:03 2" ',
                hidden:false

            })
        }
        async run(message, args){
           args = message.content.split(/:| /);
           var horas = args[1];
           var minutos =args[2];
           if (args[1]==null){
               return message.channel.send('Por favor preencha os requerimentos do commando.');
           }else if(args[2]==null){
               return message.channel.send('Por favor preencha os requerimentos do commando.');
           }else if(args[3]==null){
               return message.channel.send('Por favor preencha os requerimentos do commando.');
           }
            if(args[3]>3||args[3]<1){
                return message.channel.send('Por favor use um valor inteiro de 1 a 3');
            }
            if(args[1]<0||args[1]>24){
                return message.channel.send('Utilize um parametro horário de 0 a 24 para as horas.');
            }
            if(args[2]<0||args[2]>60){
                return message.channel.send('Utilize um parametro horário de 0 a 60 para os minutos.');
            }
            if(args[3]<1||args[3]>3){
                return message.channel.send('Utilize um parametro modificador de mensagem de 1 a 3.');
            }

           var modifier = parseInt(args[3]);
            var d= new Date();
          
           var horasA = d.getHours();
           
           var minutosA = d.getMinutes();

            if(horas-horasA<0){
               
                return message.channel.send('Use o !reminder apenas para o dia de hoje.');
                
            }else if (horas==horasA){
 
                if(minutos-minutosA<0){
                console.log('diferença '+(minutos-minutosA));
                    return message.channel.send('Já passou a hora para o avisar.');
                }
            }else if(horas-horasA>24){
                return message.channel.send('How have you done this?');

            }
            
           
          
            var horasd= ((horas-horasA)*3600000);
               
          
            var minutosd;
            if((minutos-minutosA)<0){
            minutosd=(((minutos-minutosA)*60000)*(-1));
         
            }else{
                minutosd=((minutos-minutosA)*60000);
               
            }
           
            var delay;
            if(horasd>0){
                if(minutosd>300001){
              delay=((horasd+minutosd)-300000);   
            }else{
                return message.reply('É impossivel avisar 5 minutos antes da hora marcada.')
            }

        }else{
            if(minutosd>300001){
              delay=((horasd+minutosd)-300000);   
            }else{
                return message.reply('É impossivel avisar 5min antes da hora marcada.')
            }
        }
            
           
            if(delay<0){
             
                return message.channel.send('Já passou a hora de aviso!');
          

            }else{
                timmer(delay, modifier);
            }
           
        function mensagem(modifier){
          
            switch (modifier) {
                case 1:
                
                    return message.reply('O seu ataque tem que ser enviado!'); 
                    break;
                case 2:
                    return message.reply('Aviso! Tem algo para fazer!');
                break;
                
                case 3: 
               
                    return message.reply('Considere-se avisado!');
                break;
                default:
                    break;
            }
        }
        
   
   
    function timmer(delay, modifier){
      message.channel.send('Lembrete definido.'); 
      setTimeout(()=>{
          mensagem(modifier);          
        }, delay);
    }   
  }

    }module.exports = reminderCommand; 