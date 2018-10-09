const commando = require('discord.js-commando');
const Discord = require('discord.js');

const jikanjs  = require('jikanjs');

  
class Animecommando extends commando.Command{
        constructor(client){
            super(client, {
                name: 'char',
                group:'pesquisa',
                memberName: 'char',
                description: 'Mostra informação de uma personagem que escolha.'

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
          console.log(searchString);  
            
          let type = "character"

      
         jikanjs.search(type, searchString, 1).then(function (response) {
          // do stuff here
          console.log(response.results[0]);
          mensagem(response.results[0]);
      }).catch(function (err) {
          // handle error
          falhou(err);
      });
         
                
            function falhou(err){
                    const embed2 = new Discord.RichEmbed;
                        embed2.setAuthor("Rem-chan", "https://i.imgur.com/g6FSNhL.png")
                        embed2.setColor(0xdb06db)
                        embed2.setDescription(err)
                        embed2.setFooter('Rem-chan em ', "https://i.imgur.com/g6FSNhL.png")
                        embed2.setTimestamp()
                        
                        message.channel.send({embed2})
                    }
                
                    
                    function mensagem(res){
                        
                        const embed = new Discord.RichEmbed
                        
                        embed.setTitle(res.name)
                        embed.setAuthor("Rem-chan", "https://i.imgur.com/g6FSNhL.png")
                        embed.setColor(0x003284)
                        embed.setDescription(`[${alternative_names}]`+`(${res.url})`)
                    
                        embed.setFooter('Rem-chan em ', "https://i.imgur.com/g6FSNhL.png")
                        if (res.anime.length >0){
                            for (let i=0; i < 4; i++) {
                                embed.addField("Anime:", res.anime[i].name, true) 
                                embed.addField("Link",'[MAL]'+`(${res.anime.url})`, true)
                            }
                         }
                         if (res.anime.length > 4){
                             embed.addField("Vê mais na página do anime.")
                         }
                         if (res.manga.length >0){
                            for (let i=0; i < 4; i++) {
                                embed.addField("Manga:", res.manga[i].name, true) 
                                embed.addField("Link",'[MAL]'+`(${res.manga.url})`, true)
                            }
                         }
                         if (res.manga.length > 4){
                            embed.addField("Vê mais na página do anime.")
                        }
                        embed.setImage(res.image_url)
                    
                        embed.setTimestamp()  

                       
                           
                        
                       console.log(embed)
                     
                    
                        message.channel.send({embed});
                    }
         }
      


          }module.exports = Animecommando;
