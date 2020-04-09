//add strikes to a file.
//The ake index preiodicaly check for strikes == 3 so it will ban who ever has that many.
//strike on/off switch by server
//User strikes should be applyed to the server they are given and only there.
//strike info should show the strikes given to all users of the server it was called from.
//Strike info username should show the strikes said user as on all servers
//strike info rules should send people to the rules channel of said server.
//strike setRulesChannel should use ruleschannel id of a said server for the command above
//stike graph should show a graph where it shows the ammount of strikes given on a certain ammount of time

// Strikes need to have a date atached to it.
// Only the last strike date should be saved
//strikes with over a months age should be wiped


/*
 Struckture of :
strikes.json
=>

{
    "guild[i]":[
        "user1.id":{
            name:"",
            strikes:"",
            lastStrikeDate:"",
        },
         "user2.id":{
            name:"",
            strikes:"",
            lastStrikeDate:"",
        }
    ]
    guild[i]:[
        "user1.id":{
            name:"",
            strikes:"",
            lastStrikeDate:"",
        }
    ]
}

guild[i].(user.id).name
                  .strikes
                  .lastStikeDate


*/

const commando = require('discord.js-commando');
const discord = require("discord.js")
const fs = require("fs")

    class Strike extends commando.Command{
        constructor(client){
            super(client, {
                name: 'strike',
                group:'admin',
                memberName: 'strike',
                description: 'Strike.info.'

            })
        }
        async run(message, args){
          
    }

          
    
    }module.exports = Strike;