const commando = require('discord.js-commando');
//Refazer com .json
const fs = require('fs');
    class storeCommand extends commando.Command{
        constructor(client){
            super(client, {
                name: 'store',
                group:'economy',
                memberName: 'store',
                description: 'Em construção'

            })
        }
        async run(message, args){
            args = message.content.split(/\s+/g);
            let setType = 'coiso';
        if(typeof args[2]!= typeof setType){ return message.channel.send({embed:{
            title:'Erro',
            color:0xef4815,
            fields:[{
                name:'Erro',
                value:'Verifique em !help store como usar o comando.'
                }]
                }})
        };
            if(args[2]=='buy'){

       
        switch (args[3]) {
            case 'Nome_do_item':
                additem('Nome_do_item',userID);
                removeMoney(ammount, userID);
                mensagem(modifier, 'Nome_do_item');
              
                break;
            case 'nome_do_item' :
                additem('Nome_do_item',userID);
                removeMoney(ammount, userID);
                mensagem(modifier, 'Nome_do_item');
              
                break;
            case 'nome_do_item':
                additem('Nome_do_item',userID);
                removeMoney(ammount, userID);
                mensagem(modifier, 'Nome_do_item');
              
                break;
            case 'nome_do_item':
                additem('Nome_do_item',userID);
                removeMoney(ammount, userID);
                mensagem(modifier, 'Nome_do_item');
                
                break;
            default:
                break;
        }         
       }else if(args[2]== null){
           showItems();
       }else{
           return message.channel.send({embed:{
            title:'Erro',
            color:0xef4815,
            fields:[{
                name:'Erro',
                value:'Verifique em !help store como usar o comando.'}]
        }})
       }
    }
}module.exports = storeCommand;
function removeMoney(amount, userID){

};
function addItem(itemName, userID){//Para quando o commnado é usado como !store ´itemname´
 //se 'nenhum' remover e acrescentar novo, caso contrário addicionar novo ao velho com um espaço

};
function showItems(){ //Mostrar os items quando o commando é usado apenas como !store
           mensagem(1, 'nenhum');
}; 
function itemInfo(itemName, stats){
        
};
function mensagem(modifier, item){
    switch (modifier) {
        case 1:
          message.channel.send({embed:
        {
                title:"Items disponiveis",
                color:0xef4815,
                fields:[{
                    //item 1

                },
            {
                //item 2
            },{
                //item 3
            },{
                    //item 4

            }]
               
        }
        });  
            break;
        case 2:

            break;
        case 3:

            break;
        case 4:

            break;
    
    
        default:
            break;
    }
};