

const commando = require('discord.js-commando');
const Discord = require('discord.js');


class clearchatcommando extends commando.Command{
    constructor(client){
        super(client, {
            name: 'clearchat',
            group:'admin',
            memberName: 'clearchat',
            description: 'Limpa o chat designado, caso pretenda pode adicionar o id de uma mensagem a qual não quer que seja apagada. Este comando pode apenas ser usado por admins.'

        })
    }
    async run(message, args){
        //verificar admin
       
        if(isAdmin(message)){
            //Verificar se está na sala bemvindo
            
            if(bemvindo(message)){
            
                
                clearbemvindo();


            }else{
               
                //verificar se tem argumentos
                if(hasArgs()){
                    console.log("Info: !clearchat: has correctArgs");
                    if(correctArgs()){
                   var arg = message.content.split(' ')[1];
                    if (arg.length < 18)
                    {
                        console.log("Info: !clearchat: arround argument:",aroundarg);
                        cleararound(aroundarg);
                    }
                    else
                    {
                        clearnormie(arg);
                    }
                }//Quais-quer eventuais problemas são tratados na função
            }else{
                    //caso normal, apenas apaga tudo.
                    clearnormie();
                }
            }
            
        
        }else{
            
           sendMessage(1)
        }
        //verificar se é admin
        function isAdmin(){
         
          
            if(message.member.id==='186540961650835456') return true;
            
           if (message.member.has('ADMINISTRATOR')) return true;
           return false;

        }
        //verificar se é a sala bem vindo
        function bemvindo(message){
           
            if(message.channel.id==='434713876836122626')return true;

        }

        async function clearnormie(costumLimit) {
            console.log("Info: !clearchat: clear normie")
            message.delete();
            let limit = costumLimit || 99;
            const fetched = await message.channel.messages.fetch({limit: limit});
            //console.log("Info: !clearchat: ",fetched)
            message.channel.bulkDelete(fetched, true);
          
           
        }
        async function clearbemvindo() {
            
        
            message.delete();
            const fetched = await message.channel.messages.fetch({limit: 99, after: '436122906565804032'});
 
            
            message.channel.bulkDelete(fetched, true);
        }
        async function cleararound(aroundarg) {
            message.delete();
            const fetched = await message.channel.messages.fetch({limit: 99, around:aroundarg});

            message.channel.bulkDelete(fetched, true);
           
        }
        //verificar se tem argumentos
        function hasArgs(){
      
            
            if(message.content.split(' ').length>1){
                
            return true;
            }
        }
        //verificar se os argumentos estão corretos
        function correctArgs(){
            
            if(message.content.split(' ').length >2) {
                sendMessage(3);
            }else{
                    var arg = parseInt(message.content.split(' ')[1], 10);
                    var arglenght = message.content.split(' ')[1].split('').length;
           
          
                if(typeof arg == "number"){
                
                    if(arglenght == 18) {
                        return true;
                    }else{
                         sendMessage(2);
                    }
                }else {
                    sendMessage(2);
                }
            }
        }
        //Mensagens de erro
        function sendMessage(arg){
            
            const embed = new Discord.RichEmbed();            

            embed.setColor(0x27e33d);
            embed.setThumbnail('https://i.imgur.com/g6FSNhL.png');
            switch (arg) {
                case 1:
                    embed.addField('Erro:',message.author.username+', não tem permissões para usar este comando');
                    
                    message.channel.send({embed}); 
                    break;
                case 2:
                    embed.addField('Erro:',message.author.username+', use um ID de mensagem correto!');

                    message.channel.send({embed}); 
                    break;
                case 3:
                    embed.addField('Erro:',message.author.username+', use apenas um ID, e certifique-se que este é correto!');
                
                    message.channel.send({embed}); 
                    break;
                default:
                    break;
            }
                 
                    
                    
            }
     

    
}}module.exports = clearchatcommando;