const commando = require('discord.js-commando');
const winston = require('winston');
const request = require('request');
const Discord = require('discord.js');

    class phgifs extends commando.Command{
        constructor(client){
            super(client, {
                name: 'phgifs',
                group:'nsfw',
                memberName: 'phgifs',
                description: 'Retira imagens (gif) do site pornhub.'

            })
        }
        async run(message, args){
            
         /*   if (!message.channel.name.startsWith('nsfw')) {
    return message.channel.send('Este comando pode apenas ser utilizado em salas NSFW!');

}   */
        args = message.content.split(/\s+/g);

            var messageSplit = message.content.split(' ');
            var messageSearch = '';
            var searchOrig = '';
   
                if (args[1]==undefined){console.log('args1 null');searchOrig='random'}

            for (var i = 1; i < messageSplit.length; i++) {
                       if (i === 1) {
                              searchOrig = messageSplit[i];
                        } else {
                                searchOrig = searchOrig + ' ' + messageSplit[i];
                        }
                    }
              


                     const Pornsearch = require('pornsearch').search(searchOrig);
                     
                     Pornsearch.videos()
                     .then(videos => message.channel.send(videos)
                     .then(() => Pornsearch.gifs())
                     .then(gifs => message.channel.send(gifs)));

                    





}
}
module.exports = phgifs;