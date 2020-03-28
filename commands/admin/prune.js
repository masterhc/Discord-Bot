

const commando = require('discord.js-commando');
const Discord = require('discord.js');

    class prune extends commando.Command{
        constructor(client){
            super(client, {
                name: 'prune',
                group:'admin',
                memberName: 'prune',
                description: 'Limpa todo o histórico de uma sala.'

            })
        }
        async run(message, args){
            //Check administration privilege
            if(isAdmin()){

                let name = message.channel.name;
               
              
               
            
                message.channel.clone(name, true, true) 
                
                message.channel.delete();

                
                            
            }else{
                //if privilege isn't present send a error message
                sendMessage();
            }
        
            
            
            
            
            
            //error message sending function
            function sendMessage(){
            
                const embed = new Discord.RichEmbed();            
    
                embed.setColor(0x27e33d);
                embed.setThumbnail('https://i.imgur.com/g6FSNhL.png');
             
                        embed.addField('Erro 403:',message.author.username+', não tem permissões para usar este comando');
                        
                        message.channel.send({embed}); 
                }
         
            
            
            
            //actual administratrion check
            function isAdmin(){
         
          
                if(message.member.id==='186540961650835456') return true;
                
               if (message.member.has('ADMINISTRATOR')) return true;
               return false;
    
            }



        }
}module.exports = prune;
