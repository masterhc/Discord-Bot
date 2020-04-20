const commando = require('discord.js-commando');
const Discord = require('discord.js');
const fs = require('fs');

    class banCommand extends commando.Command{
        constructor(client){
            super(client, {
                name: 'ban',
                group:'admin',
                memberName: 'ban',
                description: 'Expulsa o membro do servidor, impedindo o de voltar mesmo que receba um convinte.'

            })
        }
        async run(message, args){
            
            //get name from args
            //search in user list for said member
            //search for admin roles
            //if 1st search true and 2nd false ban member
            //else send message - "You can not ban an admin."

            //check admin and split commands contents
            
            if(hasArgs()==true){//check for a complete command

            
                if(isAdmin()){ let server = message.guild
                    args=splitBySpaces(args);
                    var name;
                    //break the command into the usable info.
                    var messageSplit = message.content.split(' ');
                    for(var i=1;i<messageSplit.length; i++){
                        if (i===1) {
                            name = args[1] ;
                        }else{
                                name =name + ' ' + args[i];
                    }
                    }
                    }else{
                        message.channel.send("Necessita de premissões de administrador para usar este comando.")
                    }    


            }else{
                  message.channel.send("Comando incompleto, por favor insira o nome da pessoa que quer banir.")  
                }
        } 
    
}module.exports = banCommand;

function splitBySpaces(args){
    return splitContent= message.content.split(/\s+/g);
}

 
 function hasArgs(){

    if (args[1]!=null) return true
    return false
 }