const commando = require('discord.js-commando');
const fs = require('fs')

    class balanceCommand extends commando.Command{
        constructor(client){
            super(client, {
                name: 'balance',
                group:'economy',
                memberName: 'balance',
                description: 'Este comando permite-lhe ver o saldo da sua conta.'

            })
        }
        async run(message, args){
          let userData = JSON.parse(fs.readFileSync('userData.json', 'utf-8'));
          let sender = message.author;
          let msg = message.content.toUperCase();
        
            message.channel.send({embed:{
                title: 'Banco',
                color:'0xF1C40F',
                fields:[{
                    name:"Dono da conta",
                    valor:message.author.username,
                    inline:true
                },
            {
                name:'Balanço da conta',
                value:userData[sender.id+message.guild.id].money,

            }]
            }

            });

     
    }
}module.exports = balanceCommand;