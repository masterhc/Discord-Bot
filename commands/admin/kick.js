

const commando = require('discord.js-commando');
const Discord = require('discord.js');
const fs = require('fs');

    class kickCommand extends commando.Command{
        constructor(client){
            super(client, {
                name: 'kick',
                group:'admin',
                memberName: 'kick',
                description: 'Expulsa o membro do servidor.'

            })
        }
        async run(message, args){
            
            //get name from args
            //search in user list for said member
            //search for admin roles
            //if 1st search true and 2nd false kick member
            //else send message - "You can not kick an admin."

            //check admin and split commands contents
            if(hasArgs()==true){
                if(isAdmin()){ let server = message.guild
                    //break the command into the usable info.
                    
                    for(var i=1;i<splitBySpaces(args).length; i++){
                        if (i===1) {
                            name = splitBySpaces(args)[1] ;
                        }else{
                                name = name + ' ' + splitBySpaces(args)[i];
                    }
                    }
                }else{
                    message.channel.send("Necessita de premissões de administrador para usar este comando.")
                }
                    
        }else{
            message.channel.send("Comando incompleto, por favor insira o nome de quem quer expulsar.")
        }





        }
}module.exports = kickCommand;

function splitBySpaces(args){
    return splitContent= message.content.split(/\s+/g);
}
 
function hasArgs(){

    if (args[1]!=null) return true
    return false
 }