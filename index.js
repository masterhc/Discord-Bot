
const Discord  = require('discord.js');
const commando = require('discord.js-commando')
const fs = require('fs');
var config = JSON.parse(fs.readFileSync('.settings.json', 'utf-8'));

const discord_token = config.discord_token;


const bot = new commando.Client();

bot.registry.registerGroup('random','Random');
bot.registry.registerGroup('tribos', 'Tribos');
bot.registry.registerGroup('music','Music');
bot.registry.registerGroup('nsfw', 'Nsfw');
bot.registry.registerGroup('image', 'Imagens');
bot.registry.registerGroup('riot games', 'Riot Games');


bot.registry.registerDefaults();
bot.registry.registerCommandsIn(__dirname + "/commands");

bot.on('ready', ()=>{
    console.log('ready');
     bot.user.setGame('!help for commands');
});
bot.on('ready',()=>{
     var check;
   
    var village = JSON.parse(fs.readFileSync('conquistasaovivo.json', 'utf-8'));
    const villageurl = village.gameUrl;
    const atualizado =village.atualizado;
        
    
    checker();
    function checker(){
         var checking = JSON.parse(fs.readFileSync('conquistasaovivo.json', 'utf-8'));  
         const atualizado = checking.atualizado;
         

         if(atualizado==true){
            mensagem(true);
         }else{
             setTimeout(()=> {
            checker();
             }, 60000);
             
         }
    }

  function mensagem(check){     
        bot.channels.get('356084548003561474').send(villageurl);
        
        fs.writeFileSync('conquistasaovivo.json', '{\n'+'"'+'atualizado'+'"'+':'+'false'+',\n'+'"'+'gameUrl'+'"'+':'+'"'+'urltochange'+'"'+'\n}' , 'utf-8'); 
        checker();
      }

}); 

 bot.login(discord_token);


