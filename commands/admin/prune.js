

const commando = require('discord.js-commando');
const Discord = require('discord.js');

    class testeCommand extends commando.Command{
        constructor(client){
            super(client, {
                name: 'prune',
                group:'admin',
                memberName: 'prune',
                description: 'Limpa todo o histórico de uma sala.'

            })
        }
        async run(message, args){
            if(isAdmin()){

                let name = message.channel.name;
               
              
               
            
                message.channel.clone(name, true, true) 
                
                message.channel.delete();

                
                            
            }else{
                sendMessage();
            }
        
            
            
            
            
            
            
            function sendMessage(){
            
                const embed = new Discord.RichEmbed();            
    
                embed.setColor(0x27e33d);
                embed.setThumbnail('https://i.imgur.com/g6FSNhL.png');
             
                        embed.addField('Erro:',message.author.username+', não tem permissões para usar este comando');
                        
                        message.channel.send({embed}); 
                }
         
            
            
            
            
            function isAdmin(){
         
          
                if(message.member.id==='186540961650835456') return true;
                
               if (message.member.has('ADMINISTRATOR')) return true;
               return false;
    
            }



        }
}module.exports = testeCommand;
