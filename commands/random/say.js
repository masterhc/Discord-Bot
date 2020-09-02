const commando = require('discord.js-commando');


    class  say extends commando.Command{
        constructor(client){
            super(client, {
                name: 'say',
                group:'random',
                memberName: 'say',
                description: 'Rem-chan dirá uma mensagem escrita por si.'

            })
        }
        async run(message, args){
            var mensagem;
            var messageSplit = message.content.split(' ');
       
        args=message.content.split(/\s+/g);
        for(var i=1;i<messageSplit.length; i++){
            if (i===1) {
                if(message)
                  mensagem = args[1] ;
            }else{
                mensagem = mensagem + ' ' + args[i];
            }
           
        };
    
        //say on channel
        console.log("Command: Say: Message:"+mensagem)
        message.delete();
        message.channel.send(mensagem);
          
    }
    }
    module.exports = say;