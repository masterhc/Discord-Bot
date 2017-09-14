const commando = require('discord.js-commando');

const mysql = require('mysql');
const moment = require('moment');
var con = mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'',
        database:'rem_bot'
})


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
               con.connect(function(err) {
            
             if (err) {
              return console.error('error connecting: ' + err.stack);;
            } 
            console.log('connected as id ' + con.threadId);
            
        });
            
        
        var sender =message.author;
        var money = con.query('SELECT money FROM rem_bot.userdata where userID='+userID+';');
        var lastDaily =con.query('SELECT lastDaily FROM rem_bot.userdata where userID='+userID+';') ;

           if(lastDaily!=moment().format('L')){
                console.log(moment().formar('L'));

                lastDaily = moment().format('L');
                con.query('INSERT INTO `rem_bot`.`userdata` (`lastDaily`) VALUES ('+lastDaily+');');
                money = money + 25;
                con.query('INSERT INTO `rem_bot`.`userdata` (`money`) VALUES ('+money+');');
                mensagem(1,sender);
           }else{
               mensagem(2,sender);
           }
            con.end();
    }
       
}module.exports = dailyCommand;
function mensagem(modifier, sender){
    if(modifier==1){
      message.channel.send({embed:
        {
                title:"Recompensa Diária!",
                color:0xef4815,
                value:sender+'Recebeu 25p'
               }
        })
    }else{
               message.channel.send({embed:
        {
                title:"Recompensa Diária!",
                color:0xef4815,
                description:"Já recebeu a sua recompensa diária. Podes receber nova recompensa em:**"+moment().endOf('day').fromNow()+'**.'           
                }
        })
    }
}