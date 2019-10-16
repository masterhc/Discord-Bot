const commando = require('discord.js-commando');
const fs = require("fs")
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
     /* let guildID= message.guild.id
      //Its giving problems ATM
     let queue =   JSON.parse(fs.readFileSync("../../queue["+guildID+"].json")); 
        var embed = new discord.RichEmbed
      
            embed.setTitle('Lista')
            embed.setAuthor("Rem-chan", "https://i.imgur.com/g6FSNhL.png")
            embed.setColor(0xbf2603) 
            for(let i = 0; i<queue.info.length; i++){                
                ytdl.getInfo(queue.info[i].YTcode, (error, info) => { 
                    if (error) throw error;                     
                      if(info.length_seconds%60!=0){
                        timeframe = ""+((info.length_seconds-info.length_seconds%60)/60)+":"+info.length_seconds%60;
                       }else{
                         timeframe = info.length_seconds/60 + ":00";
                       }
                       embed.addField(info.title+timeframe);
                    });                    
            }
            embed.setFooter('Rem-chan em ', "https://i.imgur.com/g6FSNhL.png")
            embed.setTimestamp()
           */ 
    }


}module.exports = queuecommando;

 
  
