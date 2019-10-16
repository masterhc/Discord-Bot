const commando = require('discord.js-commando');
const Discord = require('discord.js')
const fs = require('fs');

    class setkfilterCommand extends commando.Command{
        constructor(client){
            super(client, {
                name: 'setkfilter',
                group:'tribos',
                memberName: 'setkfilter',
                description: 'Altera o continente do qual irá receber as notificações de conquista. Ex.: !setKfilter K34 ',
                hidden:true

            })
        }
        async run(message, args){
        
          
            args = message.content.split(/\s+/g);
            let k = args[1];
            let file = JSON.parse(fs.readFileSync('coiso.json', 'utf-8'));
            let Kfilter = file.K;
            console.log("file "+ file)
            let mundo = file.mundo
            let basemodel =
            {
                "mundo":'"'+mundo+'"',
                "K":[]
                
                }
            console.log("base model.mundo "+basemodel.mundo);
            console.log("basemodel.K"+basemodel.K);
           
          
           



            
    

            if(args[1]== null){
                return message.channel.send('Por favor defina um continente. No formato KNN.');
            }
            if(typeof K!== "string" ){ 
                return message.channel.send('Verifique a forma como escreveu o continente que deseja.');
            }
            if(!hasK())return message.channel.send('Verifique a forma como escreveu o continente que deseja.')
            basemodel.K.push(k);
            var output = JSON.stringify(basemodel); 
         console.log("output "+ output);
         
           


            alterar(output);
               

            
           
       

 





function alterar(output){
   
fs.writeFileSync('coiso.json', output, 'utf-8');

mensagem(k)    

}  


function hasK(){
    let args = message.content.split(/\s+/g);
    let K = args[1].split(/(|)/);
    if(K[0]=="K"||K[0]=="k") return true;

}



function mensagem(filtro){
   
    let embed = new Discord.RichEmbed
    

    embed.setAuthor("Rem-chan", "https://i.imgur.com/g6FSNhL.png");
    embed.setTitle('Filtro adicionado!');
    embed.setDescription(filtro);
    embed.setColor(0xecd7ac);        
    embed.setTimestamp();   
    embed.setFooter('Rem-chan em ', "https://i.imgur.com/g6FSNhL.png")
    
    message.channel.send({embed}) 
    
}
}
}module.exports = setkfilterCommand;