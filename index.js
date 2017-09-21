
const Discord  = require('discord.js');
const commando = require('discord.js-commando');
const music = require('discord.js-music-v11');
const fs = require('fs');
var config = JSON.parse(fs.readFileSync('.settings.json', 'utf-8'));
const snekfetch = require('snekfetch');
const http = require('http');

const discord_token = config.discord_token;


const bot = new commando.Client();

bot.registry.registerGroup('random','Random');
bot.registry.registerGroup('tribos', 'Tribos');
bot.registry.registerGroup('music','Music');
bot.registry.registerGroup('nsfw', 'Nsfw');
bot.registry.registerGroup('image', 'Imagens');
bot.registry.registerGroup('pesquisa', 'Pesquisa');



bot.registry.registerDefaults();
bot.registry.registerCommandsIn(__dirname + "/commands");

music(bot);
bot.on('ready', ()=>{
    
     bot.user.setGame('!help for commands');
    console.log(`Rem is ready to serve on ${bot.guilds.size} servers, for ${bot.users.size} users.`)

});
bot.on('ready',()=>{
 
 
   
   
    checker();
    function checker(){
         var checking = JSON.parse(fs.readFileSync('.conquistasaovivo.json', 'utf-8'));  
         const atualizado = checking.atualizado;
         const villageUrl = checking.gameUrl;
         const jogador = checking.jogador; 
         const tribo = checking.tribo;
    
         if(atualizado==true){
            mensagem(villageUrl, jogador, tribo);
         }else{
             setTimeout(()=> {
            checker();
             }, 80000);
             
         }
    }

  function mensagem(villageUrl, jogador, tribo){   
      if(jogador == '') jogador = 'err';
      if(tribo=='') tribo='err';
     var aldeia= "[Aldeia]("+villageUrl+")";   
        bot.channels.get('356084548003561474').send({embed:{
                title: 'Aldeia Conquistada',
                color: 0xef4815,
                fields:[{
                    name:"Coquistador:",
                    value:jogador,
                    inline:true
                },
            {
                name:'Tribo do conquistador:',
                value:tribo,
                inline:true

            },
            {
                     name: "Aldeia:",
                     value: aldeia,
                     inline: true
                    }]
            }

            })
        fs.writeFileSync('.conquistasaovivo.json', '{\n'+'"'+'atualizado'+'"'+':'+'false'+',\n'+'"'+'gameUrl'+'"'+':'+'"'+'urltochange'+'"'+',\n'+'"'+'jogador'+'"'+':'+'"'+'jogador'+'"'+',\n'+'"'+'tribo'+'"'+':'+'"'+'tribo'+'"'+'\n}' , 'utf-8');
        checker();
      }

}); 
    


  
 bot.login(discord_token);


