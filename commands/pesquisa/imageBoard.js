const commando = require('discord.js-commando');
const Discord = require('discord.js');
  
class imageBoardcommando extends commando.Command{
        constructor(client){
            super(client, {
                name: 'imageboard',
                group:'image',
                memberName: 'imageboard',
                description: 'Mostra imagens sobre um tema a sua escolha.'

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
                          searchString = searchString +' '+ args[i];
               }
               
            };
            
      
            
         function mensagem(res, message){
            const embed = new Discord.RichEmbed()
            
            embed.setTitle(res[1].title)
            embed.setAuthor("Rem-chan", "https://imgur.com/a/Pg3yY")
            embed.setColor(0xdb06db)
            embed.setDescription(res[1].synopsis)
           
            embed.setFooter('Rem-chan em ', "https://imgur.com/a/Pg3yY")
            
            embed.setImage(res[1].image)
          
            embed.setTimestamp()  
            embed.addField("Estado", res[1].status)     
            embed.addField("Episódios", res[1].episodes, true)
            embed.addField("Score", res[1].score, true)
      
          
            message.channel.send({embed});
         }
        
         }
        }module.exports = imageBoardcommando;
