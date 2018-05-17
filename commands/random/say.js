const commando = require('discord.js-commando');


    class  say extends commando.Command{
        constructor(client){
            super(client, {
                name: 'say',
                group:'random',
                memberName: 'say',
                description: 'Rem-chan dirá uma mensagem escrita por si. (Usa /tts)'

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
    
        
        
        message.channel.send(mensagem, {tts:true});
          
    }
    }
    module.exports = say;