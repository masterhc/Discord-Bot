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
                        embed.setDescription(res.synopsis)
                    
                        embed.setFooter('Rem-chan em ', "https://i.imgur.com/g6FSNhL.png")
                        
                        embed.setImage(res.image_url)
                    
                        embed.setTimestamp()  

                       
                           
                        
                       
                     
                    
                        message.channel.send({embed});
                    }
         }
      


          }module.exports = Animecommando;
