const commando = require('discord.js-commando');
//const fs = require("fs")
const discord = require('discord.js')
const ytdl = require('ytdl-core')
class queuecommando extends commando.Command{
    constructor(client){
        super(client, {
            name: 'queue',
            group:'music',
            memberName: 'queue',
            description: 'Mostra a lista de musicas.'

        })
    }
    async run(message, args){

    }


}module.exports = queuecommando;

 
  
