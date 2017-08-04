const commando = require('discord.js-commando');


    class remminderCommand extends commando.Command{
        constructor(client){
            super(client, {
                name: 'remminder',
                group:'tribos',
                memberName: 'remminder',
                description: 'Em construção'

            })
        }
        async run(message, args){
        args= message.content.split(/\s+/g);
        
        
       function notification(params) {
            
            message.channel.send('Considere-se relembrado!');
            
        }
         var i=1;
         var k=1;
         var d;
         var hora;
         var horaMarcada=args[1];
         var minutosMarcados = args[2];

         while(i!==0){
             d = new Date();
             hora = d.getHours();
             if(hora==horaMarcada){
                 
                 while(k!==0){
                    d= new Date();
                    minuto=d.getMinutes();
                    if(minuto=minutosMarcados){
                        i = 0;
                        k = 0;
                        notification(1);
                    }
                 }
             }
        }
    
        
        }

    }
    module.exports = remminderCommand;