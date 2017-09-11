const commando = require('discord.js-commando');

const fs = require('fs');
const moment = require('moment');


    class dailyCommand extends commando.Command{
        constructor(client){
            super(client, {
                name: 'daily',
                group:'economy',
                memberName: 'daily',
                description: 'Em construção'

            })
        }
        async run(message, args){
             let userData = JSON.parse(fs.readFileSync('userData.json', 'utf-8'));
            let sender= message.author;
            let msg = message.content.toUperCase();
           if(userData[sender.id + message.guild.id].lastDaily!=moment().format('L')){
               userData[sender.id + message.guild.id].lastDaily = moment().format('L');
               userData[sender.id + message.guild.id].money += 500;
               message.channel.send({embed:{
                title:"Recompensa Diária!",
                color:'0xF1C40F',
                description:"Recebeu 500P"
               }})
           }else{
               message.channel.send({embed:{
                title:"Recompensa Diária!",
                color:'0xF1C40F',
                description:"Já recebeu a sua recompensa diária. Podes receber nova recompensa em:**"+moment().endOf('day').fromNow()+'**.'           }})
           }
            fs.writeFile('userData.json', JSON.stringify(userData), (err)=>{
                if(err) console.error(err);
            });
    }
}module.exports = dailyCommand;