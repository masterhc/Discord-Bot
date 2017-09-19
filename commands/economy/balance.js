const commando = require('discord.js-commando');
//Refazer em .json
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
           con.connect(function(err) {
            
             if (err) {
              return console.error('error connecting: ' + err.stack);;
            } 
            console.log('connected as id ' + con.threadId);
            });
           
        
        var sender= message.author;
        var userID=sender.id+message.guild.id;
        var db_userID = con.query('SELECT userID FROM `heroku_b9dfdc7d4733cdc`.`userdata` where userID='+userID+';');
        if(db_userID==undefined) return message.channel.send('Tem que primeiro se inscrever no sistema. Use o comando !money para esse efeito.');

        
        var money = con.query('SELECT money FROM `heroku_b9dfdc7d4733cdc`.`userdata` where userID='+userID+';');
        
        var items = con.query('SELECT items FROM `heroku_b9dfdc7d4733cdc`.`userdata` where userID='+userID+';');
       
        mensagem(sender, money, items);
            
    }
}module.exports = balanceCommand;

 function mensagem(sender, money, items){
            message.channel.send({embed:{
                title: 'Banco',
                color:0xf4ce42,
                fields:[{
                    name:"Dono da conta",
                    value:sender,
                    inline:true
                },
            {
                name:'Balanço da conta',
                value:money,

            },{
                name:"Items",
                value:items
            }]
            }

            });
 }