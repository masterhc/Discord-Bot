const Discord  = require('discord.js');
const commando = require('discord.js-commando');
const request = require('request');

const fs = require('fs');
const MusicClient = require("discord-music-wrapper")


const bot = new commando.Client();


const musicPlayer = new MusicClient(process.env.youtubeKey, options = {
        earProtections: true,
        loop: true,
        songChooseTimeout: 10,
        volume: 40
    })

bot.on("message", (message)=>{
    
    var searchArray 

   
    var key = message.toString().split(" ");
    console.log(key)
        switch (key[0]){
            case "!play":
                musicPlayer.play(message, searchArray);
            break;
            case "!top":
                musicPlayer.stop(message);
            break;
            case "!nowPlaying":
                musicPlayer.nowPlaying(message);
            break;
            case "!queue":
                musicPlayer.showQueue(message);
            break;
            case "!skip":
                musicPlayer.skip(message);
            break;
            case "!pause":
                musicPlayer.pause(message);
            break;
            case "!remove":
                musicPlayer.remove(message);
            break;
            case "!repeat":
                musicPlayer.repeat(message);
            break;
            case "!loop":
                musicPlayer.loops(message);
            break;
        }
})	


bot.login(process.env.discord_token);







bot.registry.registerGroup('random','Random');
bot.registry.registerGroup('games', 'Games');
bot.registry.registerGroup('music', 'Music');
bot.registry.registerGroup('nsfw', 'Nsfw');
bot.registry.registerGroup('image', 'Imagens');
bot.registry.registerGroup('pesquisa', 'Pesquisa');


bot.registry.registerGroup('admin','Admin');
bot.registry.registerDefaults();
bot.registry.registerCommandsIn(__dirname + "/commands");






//Start Up Log
bot.on('ready', ()=>{
    //Cool looking console starting message
    console.log("--------------------------")
    console.log("    Legendary Rem-Chan    ")
    console.log("          Ready           ")
    console.log("       on "+bot.guilds.size+" guilds        ")
    console.log("--------------------------")
   
    
    GuildsModel={//model for saving on a file
        "names":[

        ]
    }
  
     for(var [key, values] of bot.guilds){
       GuildsModel.names.push(values.name)
     } 

      let GuildsO = JSON.stringify(GuildsModel);  //stringify for file saving reasons
    //Send it to a file so it can be searched with another command.
    fs.writeFileSync("guilds.json", GuildsO, "utf-8"); //actualy saving it in the file, find a way to do this with a data base.

    
    
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
   
    timer2();
    function timer2(){
        setTimeout(()=>{
            //Role Channel to be changed for wellcome on all role admission function
            //Differente message for role admission (different reaction for each channel admission)
           /* Priority Level nº1(-5000) -> 
            * Find a way to make this for multiple servers (make a give role that looks what roles id can be admissible,
            * what are the correspondent assigned reactions, look on all the channels assigned to have role admissions,
            * look on all the channels and messages to do it. Add a command to add entries.)
            * 
            * Command needs:
            *  Arg 1 - channelID
            *  Arg 2 - messageID
            *  Arg 3 - roleID
            *  Arg 4 - assigned reaction
            * extra : - server ID from the message 
            * 
            * This will mean there would be a single giveRole function
            */
            giveRole(); // Member role on wellcome channel
            giveRole2(); //Crackwatch role on CrackWatch Channel
            //Rust commit role
            rustCommits();//Start webscraping of rust commit webpage (it also sends it to the apropriate channel.)
            timer2();   
        }, 60000);
    }

    function giveRole(){
        
    bot.channels.find('name', "👐bem-vindo").fetchMessage(445251380639170560).then(
        message => { 
            const filter = (reaction) => {
                return ['👌'].includes(reaction.emoji.name);
            };
            message.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
                    .then(collected => {
                            const reaction = collected.first();
                            console.log("Reaction added")
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
                            }else{
                                console.log(reactor.reaction.message.name.guild.member(reactor).name+"tryed but got the role denied.")
                            }
                        
                        }
                    ).catch(
                        console.error()
                    ); 
        }
       
    ).catch(console.error)
    
    };



// Give Role => CrackWatch





function hasRole(reactor){
    console.log("in hasRole")
    if( reactor.roles.has('334461623307730946') || reactor.roles.has("342744569676562443")) {return true }else return false
}   
});
    function giveRole2(){
       



       
    bot.channels.find('id', ('657806522243481619')).fetchMessage('657807330238398485').then(
        message => { 
            const filter = (reaction) => {
                return ['👌'].includes(reaction.emoji.name);
            };
            message.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
                    .then(collected => {
                            const reaction = collected.first();
                            console.log("Reaction added")
                            reactor = reaction.users.first()
                            console.log("reactor:"+reactor.id)
                                try{        
                                    reaction.message.guild.member(reactor)
                                    .addRole('642891554964635659')
                                    .catch(console.error);
                                    console.log("Permissions granted to"+reactor.reaction.message.guild.member(reactor).name+"!");
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

   
    };








bot.on('ready',()=>{ 
    
    
    crackwatch();
    
    function crackwatch(){
    setTimeout(()=>{
      //Get lastCrackMessageSentTitle from the message on the channel
      var lastCrackMessageSentTitle
      const baseChannel = 643995527389773855;
    if(channelexists(baseChannel))
    {
           bot.channels.get(baseChannel).fetchMessages({limit:1}).then(messages=>{
           
              
            for(var [key, values] of messages){
                
                bot.channels.get(baseChannel).fetchMessage(values.id).then(message =>{
                    console.log("previously sent crack message title: "+ message.emebds[0].Title)
                  lastCrackMessageSentTitle = message.embeds[0].Title;
                })
              } 
            });
        
    }
    
     request(`http://api.crackwatch.com/api/cracks`, function(err, res, body){
       if(!err){
             let fetchedCrack = JSON.parse(body);
         try {
             if(fetchedCrack.message!= null && fetchedCrack.message == "Internal server error"){
                 console.log("crackwatch fucked");
                 crackwatch();
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

                        console.log("correctedTitle: " + correctedTitle)
                        //Title comes out ok
                    let newObject = {
                    "title":correctedTitle,
                    "sceneGroup":fetchedCrack[0].groupName,
                    "date":fetchedCrack[0].date,
                    "image":fetchedCrack[0].image


                    }
                
                    
                        let output = JSON.stringify(newObject);  
                        
                        if(crackcheck(correctedTitle)){
                        sendMessage(fetchedCrack[0], correctedTitle, getInfo(correctedTitle));
                        crackwatch();
                        }else{
                            crackwatch()
                        }
                    }else{
                        crackwatch();
                    }   
             }catch (error) {
             
             console.log("api completly Fucked")
             crackwatch();
         }
                }
         } 
         
         
    

        );
   
      }, 60000);  
  } 


   
     
     function crackcheck(correctedTitle){
       
     
        
        
        console.log("CrackCheck:correctedTitle: " +correctedTitle + "  saved crack.title: " + lastCrackMessageSentTitle);
        if(correctedTitle !=lastCrackMessageSentTitle)return true;
        else return false;
    }

        function sendMessage(arg, arg3, arg2){
           var image;
            const embed = new Discord.RichEmbed
            if(arg2 != null){ 
                image = arg2.imagePoster;
                embed.setThumbnail(arg2.image);
                embed.addField('Steam:',`[${arg3}](${arg2.Steam})`);

            }else{
                image = arg.image
            }
               
                embed.setTitle(arg3)
                embed.setAuthor("Rem-chan", "https://i.imgur.com/g6FSNhL.png")
                embed.setColor(0xd31f1f)
                embed.setDescription("Jogo crackado por "+arg.groupName)
                embed.addField('Data do crack:',arg.date.split("T")[0])

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
    
    let finish = false;   
    let count = 0;
    
     do{
        try {
            request(`http://api.crackwatch.com/api/games?page=${count}`, function(err, res, body){
                let games = JSON.parse(body);
                if(err){
                    console.error(err);
                }
                if(res >399){
                    console.log("error reference: "+ res);
                }
                for ( var i=0; i<games.length; i++) {
                      
                    if(games[i].tilte.search(Title) != -1){
                        console.log("found match")
        
                        finish = true
                        return games[i];
                    }
                }
              
                
               if(count==49){
                   console.log("Count at 49, stoping search. It took too much time already.")
               }
                
                }); 
                count++;
        } catch (error) {
            console.log("Error on request.");
            console.error(error);
        } 
      
    }while(count < 50);
    


}
    



}); 
bot.on('ready',()=>{
    //Make SS - Secret Services  hide on the hidden voiceroom when afk
    /*
     to use in admin commands that need a user id (from a reaction) to do something (message.mentions.users.first().id)
    */
   timer();
   function timer(){
    setTimeout(()=>{
        moveAFKs()
        timer();       
    }, 60000);
}




});
function moveAFKs(){
    let auxmembers = bot.channels.find('name', "🖮 AFK/DnD").members
    
    
    for(var [key, values] of auxmembers){
       console.log("Member list with a "+ auxmembers.size+" user size: " + values.id)
        if(values.roles.has('693413934715240498')){            
            console.log("leader: "+values.displayName);
            values.setVoiceChannel('648189029589843999')
                    .then(() => console.log(`Moved ${values.displayName}`))
                    .catch(console.error);
        }
    }
}

function rustCommits()
{  // Getting the lastSentCommit message from the channel
    //There is a better way to do this... but this works

    var lastSentCommit
    if(channelexists('696724807416283136'))
    {
           bot.channels.get('696724807416283136').fetchMessages({limit:1}).then(messages=>{
           
              
            for(var [key, values] of messages){
                
                bot.channels.get('696724807416283136').fetchMessage(values.id).then(message =>{
                  lastSentCommit = message.embeds[0].description;
                })
              } 
            });
        
    }
    //collection to store the commited information
    var latestCommit = {
        "Author":"",
        "Avatar":"",
        "Content":"",
        "Time":""
    }
    //Filling the collection and sending the message
   request("https://commits.facepunch.com/?format=json", (err, res, body)=>{
       
       var commitCount;
       if(!err){
        //console.log("request works")
        let Results = JSON.parse(body).results[0]
        let newCommit=Results[0]
        for(var i=0; i<Results.length; i++){
            if(lastSentCommit!=Results[i].message){
               commitCount += commitCount;
            }else{
                return newCommits();
            }
        }
        function newCommits(){
           for(var i =0; i<commitCount; i++){
            newCommit = Results[i]
            if(newCommit.repo.search(/rust/i)!=-1){
                console.log("New commit")   
                latestCommit.Author = newCommit.user.name;
                latestCommit.Avatar = newCommit.user.avatar;
                latestCommit.Time = newCommit.created.split("T")[1]+ " do dia "+ newCommit.created.split("T")[0];
                latestCommit.Content = newCommit.message;
                messageCommit(latestCommit, newCommit.repo);   
                
                
            }
        }  
        }
       
        //console.log("previous content: "+ lastSentCommitsContent)
        

       }
   } )

};



function messageCommit(commit, repo){
    
     const embed = new Discord.RichEmbed        
         embed.setTitle("Novo Commit às "+commit.Time)
         embed.setAuthor(commit.Author, commit.Avatar)
         embed.addField("Repo: ", repo)
         embed.setColor(0xc23811)
         embed.setDescription(commit.Content)
         embed.setFooter('Rem-chan em ', "https://i.imgur.com/g6FSNhL.png")
         embed.setTimestamp() 
         let allChannels = JSON.parse(fs.readFileSync('channels.json', 'utf-8'));
         for(var i =0; i<allChannels.rustCommitsChannels.length;i++){
             if(channelexists(allChannels.rustCommitsChannels[i]))
         {
                 bot.channels.get(allChannels.rustCommitsChannels[i]).send({embed});
         }
         }
         
 }

function channelexists(channel){

if(bot.channels.get(channel) != null) return true
}


//Music