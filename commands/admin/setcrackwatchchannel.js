

const commando = require('discord.js-commando');
const Discord = require('discord.js');
const fs = require('fs');

    class setcrackwatchchannelCommand extends commando.Command{
        constructor(client){
            super(client, {
                name: 'setcrackwatchchannel',
                group:'admin',
                memberName: 'setcrackwatchchannel',
                description: 'Na possibilidade de partir o bot ao meio, é só não usar se faz favor.'

            })
        }
        async run(message, args){
            args = message.content.split(/\s+/g); 
            var basemodel = {
                "channels":[

                ]
            }
                if(isAdmin()){
                if(hasArgs()){
                        if(channelexists()){
                            let base = JSON.parse(fs.readFileSync('channels.json', 'utf-8'));
                            basemodel.channels.push(base.channels[0])
                            if (base.channels.length >1){
                                for(var i=0; i<base.channels.length;i++){
                                    basemodel.channels.push(base.channels[i]);
                                }
                            }
                            let novo = args[1];
                            basemodel.channels.push(novo);
                            let output = JSON.stringify(basemodel);
                            fs.writeFileSync('channels.json', output, 'utf-8');
                            sendMessage(1, novo);
                            }else{
                                sendMessage(3, null)
                            }

                    

                }else{
                    sendMessage(2, null);
                }


            }else{
                sendMessage(1, null);
            }



 function isAdmin(){
    if(message.member.id==='186540961650835456') return true;
                
    if (message.member.has('ADMINISTRATOR')) return true;
    return false;
 }
 function sendMessage(modifier,channel){
     const embed = new Discord.RichEmbed 
     embed.setFooter('Rem-chan em ', "https://i.imgur.com/g6FSNhL.png")
     embed.setAuthor("Rem-chan", "https://i.imgur.com/g6FSNhL.png") 
     embed.setColor(0xd31f1f) // Alterar a cor
     embed.setTimestamp()
     switch (modifier) {
        case 0:
            embed.setTitle('Canal definido')    
    embed.addField('Nome:',message.channels.get(channel).name);   
   
    
            break;
    case 1:
    embed.setTitle('Erro');
    embed.setDescription('Não tem as premissões necessárias.')
            break;
    case 2:
    embed.setTitle('Erro');
    embed.setDescription('Verifique os parametros utilizados.')
            break;
    case 3:
        embed.setTitle('Erro');
        embed.setDescription('O canal não existe.')
            break;
        default:
            break;
    }
  
    
    
    
  message.channel.send({embed});
 }
 function hasArgs(){

    if (args[1]!=null) return true
    return false
 }
    function channelexists(channel){
       if(message.channels.get(channel)!=null){
           return true
       }
    }
        }
}module.exports = setcrackwatchchannelCommand;