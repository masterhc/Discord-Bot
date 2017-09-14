const commando = require('discord.js-commando');
const music = require('discord.js-music-v11');
    class playCommando extends commando.Command{
        constructor(client){
            super(client, {
                name: 'play',
                group:'music',
                memberName: 'play',
                description: 'Reproduz a musica.'

            })
        }
        async run(message, args){
           args=message.content.split(/\s+/g);
           let perms = message.member.roles.has('name', 'bot_controller');
          // console.log( perms);
         if(perms==undefined){
                   return message.channel.send('Não tem permissões para usar este comando.');
        }else{
                 var playString;
              var messageSplit = message.content.split(' ');
            for(var i=1;i<messageSplit.length; i++){
                 if (i===1) {
                        playString ='play '+ args[1] ;
                   }else{
                          playString = playString + args[i];
               }
               
            };
            console.log(playString);
           music(client, playString);
        }
}
}module.exports = playCommando;
   