
const request = require('request')
const commando = require('discord.js-commando');
const Discord = require('discord.js');


    class searchgameCommand extends commando.Command{
        constructor(client){
            super(client, {
                name: 'searchgame',
                group:'pesquisa',
                memberName: 'searchgame',
                description: 'Mostra dados sobre o jogo pesquisado.'

            })
        }
        async run(message, args){
            
            
        
        

        
        function hasArgs(){
            let args = message.content.split(/\s+/g);
            if (args[1]!=null) return true
            return false
        }
            
        function getGames(){
               
           
            request(`http://api.crackwatch.com/api/games`, function(err, res, body){
                if(!err){ 
                      let fetched = JSON.parse(body);
                    return fetched
                  
                }
            });   
        
        }
        function sendMessage(modifier, searchResult){
           
            const embed = new Discord.RichEmbed
                
                embed.setAuthor("Rem-chan", "https://i.imgur.com/g6FSNhL.png")
                embed.setColor(0xd31f1f)
                

                embed.setFooter('Rem-chan em ', "https://i.imgur.com/g6FSNhL.png")

               

                embed.setTimestamp()
            switch (modifier) {
                
                case 1://normal
                    embed.setTitle(searchResult.title);
                    embed.setDescription(searchResult.sceneGroup);
                    embed.setImage(arg[0].image);
                    embed.addField('Data do crack:',searchResult.date)
                    break;
                case 2://erro falta de args
                    embed.setTitle('Erro:')
                    embed.setDescription("Faltam argumentos.")
                    break;
                case 3://Jogo não reconhecido

                    break;
                default:
                    break;
            }
        }
       
       
       
       
       
       
        }
}module.exports = searchgameCommand;
