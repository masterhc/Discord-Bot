const commando = require('discord.js-commando');
const ytdl = require('ytdl-core');
//const fs = require('fs')
class playcommando extends commando.Command{
    constructor(client){
        super(client, {
            name: 'play',
            group:'music',
            memberName: 'play',
            description: 'Coloca a musica na lista.'

        })
    }
    async run(message, args){
    
}

}module.exports = playcommando;


