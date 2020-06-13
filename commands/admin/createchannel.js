

const commando = require('discord.js-commando');
const Discord = require('discord.js');

    class createchannelCommand extends commando.Command{
        constructor(client){
            super(client, {
                name: 'createchannel',
                group:'admin',
                memberName: 'createchannel',
                description: 'Cria um novo canal na categoria base.'

            })
        }
        
        async run(message, args){
        //Check admin privilege 
        if(isAdmin())
        {   
            let server = message.guild
            
            args=message.content.split(/\s+/g);
            var name;
            //break the command into the usable info.
            var messageSplit = message.content.split(' ');
              for(var i=1;i<messageSplit.length; i++){
                 if (i===1) {
                       name = args[1] ;
                   }else{
                         name =name + ' ' + args[i];
               }
               
            };
            //log the creation of a new channel.
           console.log("Creating a new channel on server:"+server.name +" with the name:"+name+".");
           //Actually create the channel.
           server.channels.create(name,  { type: 'text'});
        
           sendMessage(name)
        }else{message.channel.send("Necessita de premissões de administrador para usar este comando.")}
       
        //Send message confirming the creation of said new channel.

        function sendMessage(name){
                const embed = new Discord.MessageEmbed
                embed.setTitle('Novo canal criado ')
                embed.setAuthor("Rem-chan", "https://i.imgur.com/g6FSNhL.png")
                embed.setColor(0xd31f1f)
                
                embed.addField('Nome:',name);
                
                embed.setFooter('Rem-chan em ', "https://i.imgur.com/g6FSNhL.png")
                
             
                
                embed.setTimestamp()
                
                
                
              message.channel.send({embed});
            }

        //actual Administration check
        
        function isAdmin(){
                if(message.member.id==='186540961650835456') return true;
                
                if (message.member.has('ADMINISTRATOR')) return true;
                {
                    return false;
                }
               
            }

        }
}module.exports = createchannelCommand;