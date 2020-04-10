

const commando = require('discord.js-commando');
const Discord = require('discord.js');



    class rustplayersCommand extends commando.Command{
        constructor(client){
            super(client, {
                name: 'rustplayers',
                group:'admin',
                memberName: 'rustplayers',
                description: 'Mostra quais os jogadores que estão ligados ao servidor de Rust Legendary PT.'

            })
        }
        async run(message, args){
             
        }
}module.exports = rustplayersCommand; 



//Message sending function
 function sendMessage(names){
    const embed = new Discord.RichEmbed     
    
    embed.setColor(0xc23811)

    for(i=0; i<names.length; i++){
        embed.addField(names[i]);
    }
    embed.setAuthor("Rem-chan", "https://i.imgur.com/g6FSNhL.png") 
    embed.setFooter('Rem-chan em ', "https://i.imgur.com/g6FSNhL.png")
    embed.setTimestamp()

    message.channel.send({embed});
 }