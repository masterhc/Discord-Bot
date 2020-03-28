
const Discord  = require('discord.js');
const commando = require('discord.js-commando');
const request = require('request');
const Music = require('discord.js-musicbot-addon')
const fs = require('fs');
const cheerio = require('cheerio');



const bot = new commando.Client();

music = new Music(bot, {
    youtubeKey: process.env.youtubeKey,
    defVolume: 75,
    enableQueueStat:true,
    global: true,            // Non-server-specific queues.
    maxQueueSize: 50,        // Maximum queue size of 25.
    clearInvoker: true,      // If permissions applicable, allow the bot to delete the messages that invoke it.
    helpCmd: 'mhelp',        // Sets the name for the help command.
    playCmd: 'play',        // Sets the name for the 'play' command.
    volumeCmd: 'volume',     // Sets the name for the 'volume' command.
    leaveCmd: 'leave',      // Sets the name for the 'leave' command.
    disableLoop: true        // Disable the loop command.
})
   


bot.login(process.env.discord_token);







bot.registry.registerGroup('random','Random');
bot.registry.registerGroup('tribos', 'Tribos');
bot.registry.registerGroup('music', 'Music');
bot.registry.registerGroup('nsfw', 'Nsfw');
bot.registry.registerGroup('image', 'Imagens');
bot.registry.registerGroup('pesquisa', 'Pesquisa');


bot.registry.registerGroup('admin','Admin');
bot.registry.registerDefaults();
bot.registry.registerCommandsIn(__dirname + "/commands");





//Start Up Log
bot.on('ready', ()=>{
    //log servers
    console.log("guild name"+JSON.stringify(bot.guilds)[0])
    let guildinfo = {
       "guilds":[

        ]
    }

    for(i=0;i<bot.guilds.size+1;i++){
        guildinfo.guilds.push(bot.guilds[i])
    } 

    let outputGuilds =  JSON.stringify(guildinfo);  

    fs.writeFileSync('guilds.json', outputGuilds, 'utf-8');


    //change game presence
   var i = 0
   var tipo = [
       'PLAYING',
       'STREAMING',
       'LISTENING',
       'WATCHING'
   ]
   var message =[
       'with crazy people',//Playing message
       'crappy content', //watching message
       'sounds of my people', //listening message
       'paint dry'//watching message
   ]
    
        
       
   timeout();
   function timeout(){
    setTimeout(()=>{
    changeActivity();
    }, 60000);
}
  function changeActivity(){ 
     bot.user.setActivity(message[i], {type: tipo[i]})
     .then(presence => console.log(`Activity set to ${presence.game ? presence.game.name : message[i]}`))
     .catch(console.error);
 
        console.log("I: "+ i);
     if(i!=4){
    i++;
 }else{
     i=0;
     bot.user.setActivity('!help', {type: 'LISTENING'})
     .then(presence => console.log(`Activity set to ${presence.game ? presence.game.name : 'to !help'}`))
     .catch(console.error);
 }
      
   
    console.log(`Rem is up and ready to serve on ${bot.guilds.size} servers, for ${bot.users.size} users.`);
    
   
   
    
    
   
    timeout()
}});
//Give role => Membro
bot.on('ready', ()=>{
    let checker = 0
    giveRole();
    function timer(){
        setTimeout(()=>{
            giveRole()       
        }, 60000);
    }
//Não mandou a dm
//Nem deu a permissão

    function giveRole(){
        console.log(checker)



    bot.channels.find('name', "👐bem-vindo").fetchMessage(445251380639170560).then(
        message => { 
            const filter = (reaction) => {
                return ['👌'].includes(reaction.emoji.name);
            };
            message.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
                    .then(collected => {
                            const reaction = collected.first();
                            console.log("Reaction added")
                            console.log("reacotr: "+reactor)
                            reactor = reaction.users.first()
                            console.log("reactor:"+reactor.id)
                            
                            if(hasRole(reactor.reaction.message.guild.member(reactor))== false){
                                try{        
                                    reaction.message.guild.member(reactor)
                                    .addRole('336235115782864906')
                                    .catch(console.error);
                                    console.log("!Permissions granted to"+reactor.reaction.message.guild.member(reactor).name);
                                }
                                catch(error){
                                    console.error
                                }
                                finally{ console.log('done')}
                            }else if(hasRole(reactor)==true){
                                console.log(reactor.reaction.message.name.guild.member(reactor).name+"tryed but got the role denied.")
                            }
                        
                        }
                    ).catch(
                        console.error()
                    ); 
        }
       
    ).catch(console.error)
    timer();
    checker = checker +1;
    };



// Give Role => CrackWatch
function hasRole(reactor){
    console.log("in hasrole")
    if( reactor.roles.has('334461623307730946') || reactor.roles.has("342744569676562443")) {return true }else return false
}   
});

bot.on('ready', ()=>{
   
   let checker = 0
    giveRole();
    function timer(){
        setTimeout(()=>{
            giveRole()       
        }, 60000);
    }


    function giveRole(){
        console.log(checker)



       
    bot.channels.find('id', ('657806522243481619')).fetchMessage('657807330238398485').then(
        message => { 
            const filter = (reaction) => {
                return ['👌'].includes(reaction.emoji.name);
            };
            message.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
                    .then(collected => {
                            const reaction = collected.first();
                            console.log("Reaction added")
                            console.log("reacotr: "+reactor)
                            reactor = reaction.users.first()
                            console.log("reactor:"+reactor.id)
                            
                            
                                try{        
                                    reaction.message.guild.member(reactor)
                                    .addRole('642891554964635659')
                                    .catch(console.error);
                                    console.log("!Permissions granted to"+reactor.reaction.message.guild.member(reactor).name);
                                }
                                catch(error){
                                    console.error
                                }
                                finally{ console.log('done')}
                           
                        
                        }
                    ).catch(
                        console.error()
                    ); 
        }
       
    ).catch(console.error)
    timer();
    checker = checker +1;
    };





});


bot.on('ready',()=>{ 
    
    
    crackwatch();
    
    function crackwatch(){
    setTimeout(()=>{
      
    
     request(`http://api.crackwatch.com/api/cracks`, function(err, res, body){
       if(!err){ 
             let fetchedCrack = JSON.parse(body);
         try {
             if(fetchedCrack[0] !=null){
                 console.log("working fine")
             }
         } catch (error) {
             
             console.log("api Fucked")
             crackwatch();
         }
         
         
        
         let correctedTitleArray = fetchedCrack[0].title.split("."); 
         let correctedEnding =  correctedTitleArray[correctedTitleArray.length - 1].split('-');
         if(correctedTitleArray[correctedTitleArray.length - 1].split("_")>0){
            correctedTitleArray= correctedTitleArray[correctedTitleArray.length - 1].split("_")
         }
        
        
         let correctedTitle
      
      if(correctedTitleArray.length != null){
         for (var j = 0; j <= correctedTitleArray.length; j++) {
              if(j==0){
                    
                    correctedTitle = correctedTitleArray[j];
                    
              }else if(j == correctedTitleArray.length){
                    
                    correctedTitle =correctedTitle +' ' + correctedEnding[0]
                   
                    
              }else if(j <= correctedTitleArray.length-2){
                    correctedTitle = correctedTitle +' ' +  correctedTitleArray[j];
                   
              }
          }
        }else{
            correctedTitle = fetchedCrack[0].title;
        }
    let newObject = {
    "title":correctedTitle,
    "sceneGroup":fetchedCrack[0].sceneGroup,
    "date":fetchedCrack[0].date,
    "image":fetchedCrack[0].image


    }
    
          let output = JSON.stringify(newObject);  
        if(crackcheck(correctedTitle)){
          
            fs.writeFileSync('crackwatch.json', output, 'utf-8');
       
            
        sendMessage(fetchedCrack[0], getInfo(correctedTitle));
         crackwatch();
        }else{crackwatch()}
    }else{
        crackwatch();
    }   
        });
   
      }, 60000);  
  } 


   
     
     function crackcheck(correctedTitle){
      let savedCrack=JSON.parse(fs.readFileSync('crackwatch.json', 'utf-8')); 
   
        if(correctedTitle !=savedCrack.title)return true;
        else return false;
    }

        function sendMessage(arg, arg2){
           var image;
            const embed = new Discord.RichEmbed
            if(arg2 != null){ 
                image = arg2[0].imagePoster;
                embed.setThumbnail(arg[2].image);
                embed.addField('Steam:',`[${arg.title}](${arg2[0].Steam})`);

            }else{
                image = arg.image
            }
                
                embed.setTitle(arg.title)
                embed.setAuthor("Rem-chan", "https://i.imgur.com/g6FSNhL.png")
                embed.setColor(0xd31f1f)
                embed.setDescription("Jogo crackeado por "+arg.sceneGroup)
                embed.addField('Data do crack:',arg.date)

                embed.setFooter('Rem-chan em ', "https://i.imgur.com/g6FSNhL.png")

                embed.setImage(image)
                

                embed.setTimestamp()

                let channelsfile = JSON.parse(fs.readFileSync('channels.json', 'utf-8'));
                
                for (var i=0; i<channelsfile.channels.length; i++) {
                  

                    if(channelexists(channelsfile.channels[i])){
                   bot.channels.get(channelsfile.channels[i]).send({embed});
                    }
                  
                    }
                
              

        }

function channelexists(channel){

    if(bot.channels.get(channel) != null) return true
}

function getInfo(Title){
    let fixedTitleaux = Title.split(" ");
    let titleSize; 
    for(var j = 0; j<fixedTitleaux.size; j++){
         switch (fixedTitleaux[j]) {
             case "v":
                 titleSize = j-1;
                 break;
             case "Update":
                 titleSize = j-1;
                 break;
             case "DLC":
             titleSize = j-1;
                 break;
             case "Episode":
                 titleSize = j-1;
                 break;
             case "Season":
                 titleSize = j-1;
                 break;
             
         
             default:
                 break;
         }
    } 
     let GameTitle;
     for(var k=0; k<titleSize; k++){
        
         if(k==0){
             console.log("fixed title aux"+ fixedTitleaux[j])
             GameTitle= fixedTitleaux[j];
             
         }else if(k == titleSize){
             
            GameTitle =fixedTitle[k];
         }else if(k<titleSize){
             GameTitle = GameTitle + " "+ fixedTitleaux[k]
         }
     }
     console.log(GameTitle)
    let finish = false;   
    let count = 0;
     do{
        request(`http://api.crackwatch.com/api/games?page=${count}`, function(err, res, body){
        let games = JSON.parse(body);
        
        for ( var i=0; i<games.length; i++) {
            if(games[i].tilte == GameTitle){
                console.log("gameTitle="+GameTitle)
                console.log("games.title="+games[i].title)

                finish = true
                return games[i];
            }
        }
      
        
       
        
        }); 
    count++;
    }while(finish == true);
    


}
    



}); 
bot.on('ready',()=>{
    //Make hidden afk role  hide on the hidden voiceroom when afk
    /*
     to use in admin commands that need a user id (from a reaction) to do something (message.mentions.users.first().id)
    */
   timer();
   function timer(){
    setTimeout(()=>{
        moveAFKs()       
    }, 310000);
}

function moveAFKs(){
    let membersCount = bot.channels.find('name', "🖮 AFK/DnD").members.size
    let members = bot.channels.find('name', "🖮 AFK/DnD").members
    console.log("Member list: " + members)
    for(let i =0; i<membersCount; i++){
        let member = members[i];
        if(member.roles.has('693413934715240498')){            
            console.log("leader: "+member.displayName);
            member.setVoiceChannel('648189029589843999')
                    .then(() => console.log(`Moved ${member.displayName}`))
                    .catch(console.error);
        }
    }
}


});

