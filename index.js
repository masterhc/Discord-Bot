const Discord  = require('discord.js');
const commando = require('discord.js-commando');
const request = require('request');
const postgres = require('postgres');
const fs = require('fs');



const bot = new commando.Client
(({
    partials: ["REACTION", "MESSAGE"] 
}));

bot.login(process.env.discord_token);

bot.registry.registerGroup('random','random');
bot.registry.registerGroup('games', 'games');
bot.registry.registerGroup('nsfw', 'nsfw');
bot.registry.registerGroup('admin', 'admin');
bot.registry.registerGroup('image', 'imagens');
bot.registry.registerGroup('pesquisa', 'pesquisa');
bot.registry.registerDefaults();
bot.registry.registerCommandsIn(__dirname + "/commands");


//Start Up Log
bot.on('ready', ()=>{
    //Cool looking console starting message
    console.log("--------------------------")
    console.log("    Legendary Rem-Chan    ")
    console.log("          Ready           ")
    console.log("       on "+bot.guilds.cache.size+" guilds        ")
    console.log("--------------------------")
   
    
    GuildsModel={//model for saving on a file
        "names":[

        ]
    }
   
     for(var [key, values] of bot.guilds.cache){
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
     .then(presence => console.log(`Activity set to ${presence.aactivities ? presence.activities.name : message[i]}`))
     .catch(console.error);
 
        console.log("I: "+ i);
     if(i!=4){
    i++;
 }else{
     i=0;
     bot.user.setActivity('!help', {type: 'LISTENING'})
     .then(presence => console.log(`Activity set to ${presence.activities ? presence.activities.name : 'to !help'}`))
     .catch(console.error);
 }
      
   
    console.log(`Rem is up and ready to serve on ${bot.guilds.size} servers, for ${bot.users.size} users.`);
    
   
   
    
    
   
    timeout()
}});
//Give role => Membro
bot.on('ready', ()=>{
    giveRole();
    timer1();
    function timer1()
    {
        setTimeout(() => 
        {
            giveRole(); // Member role on wellcome channel
            timer1();
        }, 
        3000);
    }
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
            
            //Crackwatch role
            //Rust commit role
            
            timer2();   
        }, 60000);
    }
    
 
   function giveRole()
   {
       //jsut forcing a new commit
        const wellcomeChannelID="445249426743754764"
        const wellcomeChannel = bot.channels.cache.get(wellcomeChannelID);
        const messageID = "445251380639170560";
        var message;
        var reaction;
        roles = ["Member", "Rust", "Valorant", "CrackWatch"]      
        wellcomeChannel.messages.fetch(messageID).then
        (
            m =>
            {
                
                const filter = (reaction, user) =>
                {   
                    if(reaction.emoji.name==="tuturu")
                    {
                        return true ;
                    }   
                };
                m.awaitReactions( filter,{ time: 3000, errors: ['time'] })
                .catch
                (
                    
                    collected =>
                    {
                        for(var [key, values] of collected)
                        {
                            
                           for(var [key, value] of values.users.cache) 
                           {
                            
                            bot.channels.cache.get(wellcomeChannelID).members.get(value.id).roles.add("336235115782864906");
                            console.log(`Role ${roles[0]} given to ${value.username}`)
                           }
                           
                           
                        }
                        
                    }
                )
            }
        )
     
        wellcomeChannel.messages.fetch(messageID).then
        (
            m =>
            {
                const filter = (reaction, user) =>
                {   
                    return reaction.emoji.name === 'rust_icon';
                };
                m.awaitReactions( filter,{ time: 3000, errors: ['time'] })
                .catch
                (
                    
                    collected =>
                    {
                        for(var [key, values] of collected)
                        {
                       

                           for(var [key, value] of values.users.cache) 
                           {

                            bot.channels.cache.get(wellcomeChannelID).members.get(value.id).roles.add("687634126387544115");
                            console.log(`Role ${roles[1]} given to ${value.username}`)
                           }
                           
                          
                        }
                        
                    }
                )
            }
        )
        wellcomeChannel.messages.fetch(messageID).then
        (
            m =>
            {
                const filter = (reaction, user) =>
                {   
                    return reaction.emoji.name === 'valorant_icon';
                };
                m.awaitReactions( filter,{ time: 3000, errors: ['time'] })
                .catch
                (
                    
                    collected =>
                    {
                        for(var [key, values] of collected)
                        {
                     

                           for(var [key, value] of values.users.cache) 
                           {

                            bot.channels.cache.get(wellcomeChannelID).members.get(value.id).roles.add("717826411695702119");
                            console.log(`Role ${roles[2]} given to ${value.username}`)
                           }
                           
                          
                        }
                        
                    }
                )
            }
        )
        
        wellcomeChannel.messages.fetch(messageID).then
        (
            m =>
            {
                const filter = (reaction, user) =>
                {   
                    return reaction.emoji.name === 'crackwatch';
                };
                m.awaitReactions( filter,{ time: 3000, errors: ['time'] })
                .catch
                (
                    
                    collected =>
                    {

                        for(var [key, values] of collected)
                        {
                           for(var [key, value] of values.users.cache) 
                           {
                            
                            bot.channels.cache.get(wellcomeChannelID).members.get(value.id).roles.add("642891554964635659");
                            console.log(`Role ${roles[3]} given to ${value.username}`)
                           }
                           
                          
                        }
                        
                    }
                )
            }
        )
    }      
   
// Give Role => CrackWatch





function hasRole(reactor){
    console.log("in hasRole")
    if( reactor.roles.cache.has('334461623307730946') || reactor.roles.cache.has("342744569676562443")) {return true }else return false
}   
});









bot.on('ready',()=>{ 
    
    
    crackwatch();
      
function crackwatch()
{ 
        setTimeout(()=>{  
         //Get lastCrackMessageSentTitle from the message on the channel
        var lastCrackMessageSentTitle
        const baseChannel = '643995527389773855';
        if(channelexists(baseChannel))
        {
            bot.channels.cache.get(baseChannel).messages.fetch({limit:1}).then(messages=>{
            
                for(var [key, values] of messages){
                    
                    bot.channels.cache.get(baseChannel).messages.fetch(values.id).then(message =>{
                    // console.log("previously sent crack message title: "+ message.embeds[0].title)
                    lastCrackMessageSentTitle = message.embeds[0].title;
                    console.log("lastCrackSent from the last Message :" + lastCrackMessageSentTitle);
                    })
                } 
                });
            
        }
   
    request(`https://api.crackwatch.com/api/cracks`, function(err, res, body){
       if(!err)
       {
          
             let fetchedCrack = JSON.parse(body);
            try 
            {
                if(lastCrackMessageSentTitle == null)
                {
                    crackwatch();
                }else
                {
                    if(fetchedCrack != null && fetchedCrack.message != "Internal server error")
                    {
                        
                            let correctedTitleArray = fetchedCrack[0].title.split(".");

                            let correctedEnding =  correctedTitleArray[correctedTitleArray.length - 1].split('-');
                            
                            if(correctedTitleArray[correctedTitleArray.length - 1].split("_")>0)
                            {
                                correctedTitleArray= correctedTitleArray[correctedTitleArray.length - 1].split("_")
                            }
                            
                            
                            let correctedTitle
                    
                            if(correctedTitleArray.length != null)
                            {
                                for (var j = 0; j <= correctedTitleArray.length; j++)
                                {
                                    if(j==0)
                                    {
                                                    
                                        correctedTitle = correctedTitleArray[j];
                                                    
                                    }else if(j == correctedTitleArray.length)
                                    {
                                                    
                                        correctedTitle =correctedTitle +' ' + correctedEnding[0]
                                                
                                                    
                                    }else if(j <= correctedTitleArray.length-2)
                                    {
                                        correctedTitle = correctedTitle +' ' +  correctedTitleArray[j];           
                                    }
                                }
                            }else{
                                correctedTitle = fetchedCrack[0].title;
                            }

                            //console.log("correctedTitle: " + correctedTitle)
                            //Title comes out ok
                            let newObject = 
                            {
                                "title":correctedTitle,
                                "sceneGroup":fetchedCrack[0].groupName,
                                "date":fetchedCrack[0].date,    
                                "image":fetchedCrack[0].image
                            }       
                            let output = JSON.stringify(newObject);  
                            
                            if(crackcheck(correctedTitle, lastCrackMessageSentTitle)==true)
                            { 
                                let info 
                                info =  getInfo(correctedTitle);
                                console.log("passed the check will now be sent")
                                sendMessage(fetchedCrack[0], correctedTitle,  info);
                                crackwatch();
                            }else{
                                console.log("Didn't pass the check, same as the last one sent.")
                                crackwatch()
                            }
                    }else{
                        crackwatch();
                    } 
                }  
            }catch (error) 
            {
                        
                console.log("CrackWatch Updates: something went wrong on the try")
                crackwatch();
            }
        }
    } 
         
         
    

        );
   
    }, 10000);  
    
} 


   
     
     function crackcheck(correctedTitle, lastCrackMessageSentTitle){
        console.log("CrackCheck:correctedTitle: " +correctedTitle + "  saved crack.title: " + lastCrackMessageSentTitle);
        console.log("CrackCheck: Are they equal? "+(correctedTitle ==lastCrackMessageSentTitle));
        if(correctedTitle ==lastCrackMessageSentTitle)return false;
        else return true;
    }

        function sendMessage(arg, arg3, arg2){
           var image;
            const embed = new Discord.MessageEmbed
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
                
                for (var i=0; i<channelsfile.channels.length; i++) 
                {
                  
                    //there is likely the cause of errors *channels file* untrue

                    if(channelexists(channelsfile.channels[i]))
                    {
                        bot.channels.cache.get(channelsfile.channels[i]).send({embed});
                    }
                  
                }
                
                

        }

function channelexists(channel){

    if(bot.channels.cache.get(channel) != null) return true
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
                      
                    if(games[i].title.search(Title) != -1){
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
        rustCommits();//Start webscraping of rust commit webpage (it also sends it to the apropriate channel.)
        timer();       
    }, 10000);
}




});
function moveAFKs(){
    let auxmembers = bot.channels.cache.get("335494006890823680").members
    
    
    for(var [key, values] of auxmembers){
       console.log("Member list with a "+ auxmembers.size+" user size, hosting:\n" + values.id+"\n")
        if(values.roles.cache.has('693413934715240498')){            
            console.log("leader: "+values.displayName);
            values.voice.setChannel('648189029589843999')
                    .then(() => console.log(`Moved ${values.displayName}`))
                    .catch(console.error);
        }
    }
}

function rustCommits()
{  // Getting the lastSentCommit message from the channel
    //There is a better way to do this... but this works
    
    var lastSentDate
    var lastSentCommit
        if(channelexists('721061781824471080'))
        {
            if(lastSentCommit==null)
            {
                bot.channels.cache.get('721061781824471080').messages.fetch({limit:1}).then(messages=>
                {
        
                    for(var [key, values] of messages)
                    {
                    
                        bot.channels.cache.get('721061781824471080').messages.fetch(values.id).then(message =>
                        {
                        lastSentCommit = message.embeds[0].description;
                        lastSentDate = message.embeds[0].title
                        //console.log("lastSentDate took from cached message : " + lastSentDate);
                       
                        })
                    } 
                });
          
            }
           
        }
    
   
    
    //collection to store the commited information
    var latestCommit = {
        "Author":"",
        "Avatar":"",
        "Content":"",
        "Time":""
    }
    //Filling the collection and sending the message
    try {
        
    
        request("https://commits.facepunch.com/?format=json", (err, res, body)=>
        {
            
            var commitCount=0;
            if(!err)
            {
                let Results = JSON.parse(body).results  
                let RustResults = []; 
                for(var i=0; i<Results.length; i++)
                {
                    if(commitCount <=30)
                    {
                        if(Results[i].repo.search(/rust/i)!=-1)
                        {  
                            if(lastSentCommit!=Results[i].message)
                            {
                                RustResults.push(Results[i]);
                                //console.log("Commit saved")
                                commitCount ++;
                                
                            }else{

                                //console.log("Commits matches the last sent.")
                                if(commitCount >0)
                                {
                                    return newCommits();
                                }else{
                                    //console.log("Não há commits novos.")
                                    return 
                                }
                            }
                        }else
                        {
                            //console.log("Commit not saved, as it's for another game.")
                        }
                    }else
                    {
                        console.log("RustCommits: Count reached the limit.")
                        return newCommits();
                    }
                    
                }
        
                function newCommits(int)
                {
                    
                for(var i =commitCount-1; i>-1; i--)
                {
                    
                        if(RustResults[i].repo.search(/rust/i)!=-1)
                        {   
                            //console.log("counter: "+i);

                            latestCommit.Author = RustResults[i].user.name;
                            latestCommit.Avatar = RustResults[i].user.avatar;
                            latestCommit.Time = RustResults[i].created.split("T")[1]+ " do dia "+ RustResults[i].created.split("T")[0];
                            latestCommit.Content = RustResults[i].message;
                        // console.log(lastSentDate)
                            //console.log(latestCommit.Time)
                            if(latestCommit.Time != lastSentDate)
                            {
                                if(latestCommit.Time.split(" do dia ")[1].split("-")[0]>lastSentDate.split(" do dia ")[1].split("-")[0])//se o ano for maior 
                                {
                                messageCommit(latestCommit, RustResults[i].repo);
                                }else if(latestCommit.Time.split(" do dia ")[1].split("-")[0]=lastSentDate.split(" do dia ")[1].split("-")[0])//se o ano for igual
                                {
                                if(latestCommit.Time.split(" do dia ")[1].split("-")[1]>lastSentDate.split(" do dia ")[1].split("-")[1])//se o mes for maior
                                {
                                    messageCommit(latestCommit, RustResults[i].repo);
                                }else if(latestCommit.Time.split(" do dia ")[1].split("-")[1]=lastSentDate.split(" do dia ")[1].split("-")[1])//se o mês for igual
                                {
                                    if(latestCommit.Time.split(" do dia ")[1].split("-")[2]>lastSentDate.split(" do dia ")[1].split("-")[2])//se o dia for maior
                                    {
                                        messageCommit(latestCommit, RustResults[i].repo);
                                    }else if(latestCommit.Time.split(" do dia ")[1].split("-")[2]=lastSentDate.split(" do dia ")[1].split("-")[2])//se dia for igual
                                    {
                                    
                                        if(latestCommit.Time.split(" do dia ")[0].split(":")[0]>lastSentDate.split("às ")[1].split(" do dia ")[0].split(":")[0])//se a hora for maior
                                        {   
                                            messageCommit(latestCommit, RustResults[i].repo);
                                        }else if(latestCommit.Time.split(" do dia ")[0].split(":")[0]=lastSentDate.split("às ")[1].split(" do dia ")[0].split(":")[0])//se for igual
                                        {
                                            if(latestCommit.Time.split(" do dia ")[0].split(":")[1]>lastSentDate.split("às ")[1].split(" do dia ")[0].split(":")[1])//se o minuto for maior 
                                            {
                                                messageCommit(latestCommit, RustResults[i].repo);
                                            }else if(latestCommit.Time.split(" do dia ")[0].split(":")[1]=lastSentDate.split("às ")[1].split(" do dia ")[0].split(":")[1])//se for igual
                                            {
                                                if(latestCommit.Time.split(" do dia ")[0].split(":")[2]>=lastSentDate.split("às ")[1].split(" do dia ")[0].split(":")[2])//se o segundo for maior
                                                {
                                                    messageCommit(latestCommit, RustResults[i].repo);
                                                }//there is no else otherwise it would be equal to the last sent or an older one that was supposed to be sent already
                                            }
                                        }
                                    } 
                                }
                                }                    
                            }
                            //console.log(latestCommit)
                            
                            

                        }
                    }
                    
                }
            
                //console.log("previous content: "+ lastSentCommitsContent)
                

                }
        } )//end of request
    } catch (error) {
        console.log("RustCommits: Request Failed")
        console.error(error)  
    }

};



function messageCommit(commit, repo){
        //console.log("New commit!") 
     const embed = new Discord.MessageEmbed        
         embed.setTitle("Novo Commit às "+commit.Time)
         embed.setAuthor(commit.Author, commit.Avatar)
         embed.addField("Repo: ", repo)
         embed.setColor(0xc23811)
         embed.setDescription(commit.Content)
         embed.setFooter('Rem-chan ', "https://i.imgur.com/g6FSNhL.png")
         embed.setTimestamp() 
         let allChannels = JSON.parse(fs.readFileSync('channels.json', 'utf-8'));
         for(var i =0; i<allChannels.rustCommitsChannels.length;i++)
         {//Likely the error is beyond this *the channel file* -> Odds are it actualy isn't
            if(channelexists(allChannels.rustCommitsChannels[i]))
            {
                bot.channels.cache.get(allChannels.rustCommitsChannels[i]).send({embed}).then(()=>
                {
                    lastSentCommit = commit;
                    lastSentDate = ("Novo Commit às "+commit.Time);
                    //console.log("lastSentDate changed when sending the message : " + lastSentDate);

                });
            }
         }
         
 }

function channelexists(channel){

if(bot.channels.cache.get(channel) != null) return true
}


//Music