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
            let file = JSON.parse(fs.readFileSync('coiso.json', 'utf-8'));
            let Kfilter = file.K;
            
            let mundo = file.mundo
            let basemodel =
            {
                "mundo":'"'+mundo+'"',
                "K":[]
                
                }
            basemodel.table.push(Kfilter);
            
            
            let K = args[1]
            basemodel.table.push(K);
            
            if(args[1]== null){
                return message.channel.send('Por favor defina um continente');
            }
            if(typeof K!== "string" ){ 
                return message.channel.send('Verifique a forma como escreveu o continente que deseja.');
            }
            if(!hasK())return message.channel.send('Verifique a forma como escreveu o continente que deseja.')
            var output = JSON.stringify(basemodel);
               
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