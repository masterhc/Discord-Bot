
const commando = require('discord.js-commando');
const Discord = require('discord.js');

const jikanjs  = require('jikanjs');

  
class Animecommando extends commando.Command{
        constructor(client){
            super(client, {
                name: 'anime',
                group:'pesquisa',
                memberName: 'anime',
                description: 'Mostra informação de um anime que escolha.'

            })
        }
        async run(message, args){
            args=message.content.split(/\s+/g);
            var searchString;
         
          var messageSplit = message.content.split(' ');
              for(var i=1;i<messageSplit.length; i++){
                 if (i===1) {
                        searchString = args[1] ;
                   }else{
                          searchString = searchString + ' ' + args[i];
               }
               
            };
         
            
          let type = "anime"

      
         jikanjs.search(type, searchString, 1).then(function (response) {
          // do stuff here
  
          mensagem(response.results[0]);
      }).catch(function (err) {
          // handle error
          falhou(err);
      });
         
                
            function falhou(err){
                    const embed2 = new Discord.MessageEmbed;
                        embed2.setAuthor("Rem-chan", "https://i.imgur.com/g6FSNhL.png")
                        embed2.setColor(0xdb06db)
                        embed2.setDescription(err)
                        embed2.setFooter('Rem-chan em ', "https://i.imgur.com/g6FSNhL.png")
                        embed2.setTimestamp()
                        
                        message.channel.send({embed2})
                    }
                
                    
                    function mensagem(res){
                        
                        const embed = new Discord.MessageEmbed
                        
                        embed.setTitle(res.title)
                        embed.setAuthor("Rem-chan", "https://i.imgur.com/g6FSNhL.png")
                        embed.setColor(0x003284)
                        embed.setDescription(res.synopsis)
                    
                        embed.setFooter('Rem-chan em ', "https://i.imgur.com/g6FSNhL.png")
                        
                        embed.setImage(res.image_url)
                    
                        embed.setTimestamp()  

                        var status;
                        if (res.airing == true){
                            status = "Em transmissão."
                        }else{
                            status = "Completo"
                        }
                           
                        embed.addField("Estado:", status )     
                        embed.addField("Episódios:", res.episodes, true)
                        embed.addField("Pontuação:", res.score, true)
                        embed.addField("Links",'[MAL]'+`(${res.url})` )
                      
                    
                        message.channel.send({embed});
                    }
         }
      


          }module.exports = Animecommando;
