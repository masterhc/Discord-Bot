
const commando = require('discord.js-commando');
const Discord = require('discord.js');

const MAL = require('mal-api');
let username='MasterHc12';
let password='H0eNZxoClnSE';
let debug;
const mal = new MAL(username, password, debug);
mal.account.verifyCredentials()
  .then(res => console.log(res))
  .catch(err => console.log(err));

  
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
          console.log(searchString);  
         mal.anime.searchAnime(searchString).then(res => mensagem(res, message)).cach(err => falhou(err));
          function falhou{
          let embed2 = new Discord.Richembed();
            embed2.setAuthor("Rem-chan", "https://i.imgur.com/g6FSNhL.png")
            embed2.setColor(0xdb06db)
            embed2.setDescription(err)
            embed2.setFooter('Rem-chan em ', "https://i.imgur.com/g6FSNhL.png")
            embed2.setTimestamp()
            
            message.channel.send({embed2})
          }
       
          
         function mensagem(res, message){
              
            const embed = new Discord.RichEmbed()
            
            embed.setTitle(res[0].title)
            embed.setAuthor("Rem-chan", "https://i.imgur.com/g6FSNhL.png")
            embed.setColor(0xdb06db)
            embed.setDescription(res[0].synopsis)
           
            embed.setFooter('Rem-chan em ', "https://i.imgur.com/g6FSNhL.png")
            
            embed.setImage(res[0].image)
          
            embed.setTimestamp()  
            embed.addField("Estado", res[0].status)     
            embed.addField("Episódios", res[0].episodes, true)
            embed.addField("Score", res[0].score, true)
      
          
            message.channel.send({embed});
         }
        
         }
        }module.exports = Animecommando;
