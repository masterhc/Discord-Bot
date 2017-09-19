const commando = require('discord.js-commando');
const mysql =require('mysql');
const moment = require('moment');
var con = mysql.createConnection({
    host:'eu-cdbr-west-01.cleardb.com',
    user:'bbd94c36d1aea2',
    password:'11207567',
    database:'heroku_b9dfdc7d4733cdc'
})


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
        var sender= message.author;
        
        var userID=sender.id+message.guild.id;
        
   // who knows... if(message.authors.getid()!=186540961650835456) return message.channel.send('Não pode utilizar este comando.');
     
  
    fetch(userID, sender);
    function fetch(userID, sender){  
         con.connect(function(err) {
            
             if (err) {
              return console.error('error connecting: ' + err.stack);;
            } 
            console.log('connected as id ' + con.threadId);
             console.log('user ID '+userID);
        var db_userID; //= con.query('SELECT userID FROM rem_bot.userdata where userID=186540961650835456352040304112697344;')
            

            con.query({
                 sql: 'SELECT userID FROM `rem_bot.userdata` WHERE `userID` = ?',
                
                    },
                [userID],
                    function (error, results, fields) {
    // error will be an Error if one occurred during the query 
    // results will contain the results of the query 
    // fields will contain information about the returned results fields (if any)
    console.log(error);
    console.log(results);                    
    console.log(fields);
                 }
            );



        //console.log('db_userID '+db_userID);
        con.destroy();

        });
       
       
         
        if(userID!=db_userID){return message.channel.send({embed:{
                title:"Inscrição:",
                color:0xef4815,
                value:sender+'Já está inscrito no sistema de economia!'
            }})
    }else{   
         insertion(userID,db_userID, money, lastDaily, items, sender);}
    }

    
   
    function insertion(userID, db_userID, money, lastDaily, items, sender){
            con.connect(function(err) {
             if (err) {
              return console.error('error connecting: ' + err.stack);;
            } 
            console.log('connected as id ' + con.threadId);
            
      
                
        if(db_userID=userID){
            db_userID=userID;
        };
        if(money==null) {
            money = 25};
        if(lastDailyP==null) {
            lastDaily = moment().format('L')};
        
        if(items==null){
            items ='Nenhum'};
        if(db_userID== userID&&money == 25&&lastdaily==moment().format('L')&&items =='Nenhum'){
            con.query('INSERT INTO `rem_bot`.`userdata` (`userID`, `money`, `items`,`lastDaily`) VALUES ('+db_userID+', '+money+', '+items+', '+lastDaily+');');
            mensagem(sender,money);
            con.destroy();
        }
    });
     
          
           
            
            



        function mensagem(sender, money){
            message.channel.send({embed:{
                title: 'Inscrição no sistema de economia.',
                color:0xf4ce42,
                fields:[{
                    name:'Utilizador',
                    value:sender,
                    inline:true

                },{
                    name:'Dinheiro',
                    value:money,
                    inline:true
                }]
            }
            
        
             });
        



        }


    }
    }
}module.exports = moneyCommand;