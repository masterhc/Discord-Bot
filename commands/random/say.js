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
        //say on channel
        console.log("Say: -",message.author.username,"- on: ",message.guild.name,"'s ",message.channel.name.toLowerCase(),":",args)
        message.delete();
        message.channel.send(args);
          
    }
    }
    module.exports = say;