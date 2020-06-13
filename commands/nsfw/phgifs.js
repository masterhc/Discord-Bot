const commando = require('discord.js-commando');

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
            
          if (!message.channel.cache.name.startsWith('nsfw')) {
    return message.channel.cache.send('Este comando pode apenas ser utilizado em salas NSFW!');

}   
        args = message.content.split(/\s+/g);

            var messageSplit = message.content.split(' ');
            var messageSearch = '';
            var searchOrig = '';
   
                if (args[1]==undefined){searchOrig='random'}else{

            for (var i = 1; i < messageSplit.length; i++) {
                       if (i === 1) {
                              searchOrig = messageSplit[i];
                        } else {
                                searchOrig = searchOrig + ' ' + messageSplit[i];
                        }
                    }
                }
                    let random = Math.floor(Math.random()*12)+1;

                  
                    const Pornsearch = require('pornsearch');
                    const Searcher = new Pornsearch(searchOrig);
                     
                    Searcher.gifs()
                      .then(gifs => mensagem(gifs[random], message));
                      
                   function mensagem(gifs, message){ 
                      
                      const embed = new Discord.RichEmbed();
                      embed.setColor(0xb50000);
                      embed.setTitle('Imagem:')
                      embed.setAuthor("Rem-chan", "https://i.imgur.com/g6FSNhL.png");
                      embed.setImage(gifs.url)   ;                        
                      embed.setDescription('[Original]'+`(${gifs.url})`);
                      
                      embed.setFooter('Rem-chan em ', "https://i.imgur.com/g6FSNhL.png")
                      embed.setTimestamp();
                      message.channel.send({embed});
                   }
                    




}
}
module.exports = phgifs;