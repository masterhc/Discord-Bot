const commando = require('discord.js-commando');
const Discord = require('discord.js')
const MAL = require('mal-api');
let username='MasterHc12';
let password='H0eNZxoClnSE';
let debug;
const mal = new MAL(username, password, debug);
mal.account.verifyCredentials()
  .then(res => console.log(res))
  .catch(err => console.log(err));
  
class Mangacommando extends commando.Command{
        constructor(client){
            super(client, {
                name: 'manga',
                group:'pesquisa',
                memberName: 'manga',
                description: 'Mostra informação de um manga que escolha.'

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
                          searchString = searchString + args[i];
               }
               
            };
            
          mal.manga.searchManga(searchString).then(res =>mensagem(res, message)).catch(err => console.error(err));
          
          function mensagem(res, message){
            const embed = new Discord.RichEmbed()
            
            embed.setTitle(res[1].title)
            embed.setAuthor("Rem-chan", "https://imgur.com/a/Pg3yY")
            embed.setColor(0xdb06db)
            embed.setDescription(res[1].synopsis)
           
            embed.setFooter('Rem-chan em ', "https://imgur.com/a/Pg3yY")
            
            embed.setImage(res[1].image)
          
            embed.setTimestamp()
  
            embed.addField("Capitulos", res[1].chapters, true)
            embed.addField("Estado", res[1].status, true)
            embed.addField("Volumes", res[1].volumes, true)
            embed.addField("Score", res[1].score, true)
         
          
            message.channel.send({embed});
         }

         }
        }module.exports = Mangacommando;
