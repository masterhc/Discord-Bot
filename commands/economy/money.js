const commando = require('discord.js-commando');
const mysql =require('mysql');
const moment = require('moment');
var con = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'rem_bot'
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
        
        var money;
        
        var items;
        
        var lastDaily;
            // who knows... if(message.authors.getid()!=186540961650835456) return message.channel.send('Não pode utilizar este comando.');
     
  
    fetch(userID, sender);
    function fetch(userID, sender){  
         con.connect(function(err) {
            
             if (err) {
              return console.error('error connecting: ' + err.stack);;
            } 
            console.log('connected as id ' + con.threadId);
            
        });
        console.log('user ID '+userID);
        var db_userID = con.query('SELECT userID FROM rem_bot.userdata where userID='+userID+';')
        console.log('db_userID '+db_userID);
        var money = con.query('SELECT money FROM rem_bot.userdata where userID='+userID+';');
        console.log('money '+money);
        var items =con.query('SELECT items FROM rem_bot.userdata where userID='+userID+';') ;
        console.log('items '+items)
        var lastDaily =con.query('SELECT lastDaily FROM rem_bot.userdata where userID='+userID+';') ;
        console.log('last Daily '+lastDaily)
       
        con.close(); 
        insertion(userID,db_userID, money, lastDaily, items, sender);
    }

    
   
    function insertion(userID, db_userID, money, lastDaily, items, sender){
            con.connect(function(err) {
             if (err) {
              return console.error('error connecting: ' + err.stack);;
            } 
            console.log('connected as id ' + con.threadId);
            
        }); 
                console.log('user ID '+userID);
        if(db_userID=userID){
            db_userID=userID;
        };
        if(money==null) {
            money = 25};
        if(lastDailyP==null) {
            lastDaily = moment().format('L')};
        
        if(items==null){
            items ='Nenhum'};
        if(db_userID== userID&&money == 25&&lastdaily=='Não recolhido.'&&items =='Nenhum'){
            con.query('INSERT INTO `rem_bot`.`userdata` (`userID`, `money`, `items`,`lastDaily`) VALUES ('+db_userID+', '+money+', '+items+', '+lastDaily+');');
            mensagem(sender,money);
            con.close();
        }else{
            con.close();
        return message.channel.send({ embed: { title:'Já está inscrito no sistema de economia', color: 0xf4ce42 } });
        }
        
    }    
     
          
           
            
            



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
}module.exports = moneyCommand;