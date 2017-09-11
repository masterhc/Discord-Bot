const commando = require('discord.js-commando');
const fs = require('fs');
const moment = require('moment');


    class moneyCommand extends commando.Command{
        constructor(client){
            super(client, {
                name: 'money',
                group:'economy',
                memberName: 'money',
                description: 'Este comando adiciona-o a lista de utilizadores da economia deste servidor.'

            })
        }
        async run(message, args){
     let userData = JSON.parse(fs.readFileSync('userData.json', 'utf-8'));
            let sender= message.author;
            let msg = message.content.toUperCase();
            if(!userData[sender.id + message.guild.id]) userData[sender.id + message.guild.id] = {};
            if(!userData[sender.id + message.guild.id].money) userData[sender.id + message.guild.id].money = 1000;
            if(!userData[sender.id + message.guild.id].lastDaily) userData[sender.id + message.guild.id].lastDaily = "Not Collected";
            if(!userData[sender.id + message.guild.id].username) userData[sender.id + message.guild.id].username = message.author.username;
            if(!userData[sender.id + message.guild.id].items) userData[sender.id + message.guild.id].items ='Nenhum';
            

            fs.writeFile('userData.json', JSON.stringify(userData), (err)=>{
                if(err) console.error(err);
            });
            message.channel.send(userData[sender.id + message.guilg.id].money);




    }
}module.exports = moneyCommand;