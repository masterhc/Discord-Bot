

const commando = require('discord.js-commando');
const Discord = require('discord.js');
const fs = require('fs');

    class setcrackwatchchannelCommand extends commando.Command{
        constructor(client){
            super(client, {
                name: 'setcrackwatchchannel',
                group:'admin',
                memberName: 'setcrackwatchchannel',
                description: 'Este comando irá usar o canal indicado para mostrar os updates do site crackwatch. É necessário voltar a usar este comando cada vez que o bot tem uma atialização.'

            })
        }
        async run(message, args){
          //start channel array var
            var basemodel = {
                "channels":[

                ]
            }    
            //fill channel array var
            let base = JSON.parse(fs.readFileSync('channels.json', 'utf-8'));
       
                            let novo = args[1];
                            
                            console.log("base: "+base.channels[0])
                            if (base.channels.length >0){
                                for(var i=0; i<base.channels.length;i++){
                                    basemodel.channels.push(base.channels[i]);
                                   
                                }
                            }
                            basemodel.channels.push(args[1])
                            let output = JSON.stringify(basemodel);  
                          
            //Check admin privilege
            if(isAdmin()==true){
                        if(hasArgs()==true){
                            //add crackwatch channel to the list                              
                            fs.writeFileSync('channels.json', output, 'utf-8');
                            sendMessage(0, novo);
                          

                    

                        }else{
                            sendMessage(2);
                        }


            }else{
                sendMessage(1);
            }


//actualy admin check
 function isAdmin(){
    if(message.member.id==='186540961650835456') return true;
                
    if (message.member.has('ADMINISTRATOR')) return true;
 }
 //Message sending function
 function sendMessage(modifier,channel2){
     const embed = new Discord.RichEmbed 
     embed.setFooter('Rem-chan em ', "https://i.imgur.com/g6FSNhL.png")
     embed.setAuthor("Rem-chan", "https://i.imgur.com/g6FSNhL.png") 
     embed.setColor(0x11080981) // Alterar a cor
     embed.setTimestamp()
     switch (modifier) {
        case 0:
            embed.setTitle('Canal definido')    
    
   
    
            break;
    case 1:
    embed.setTitle('Erro');
    embed.setDescription('Não tem as permissões necessárias.')
            break;
    case 2:
    embed.setTitle('Erro');
    embed.setDescription('Verifique os parametros utilizados.')
            break;
 
        default:
            break;
    }
  
    
    
    
  message.channel.send({embed});
 }

 //check for complete command
 function hasArgs(){

    if (args[1]!=null) return true
    return false
 }

        }
}module.exports = setcrackwatchchannelCommand;