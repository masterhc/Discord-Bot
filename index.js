const Discord  = require('discord.js');
const commando = require('discord.js-commando');
const request = require('request');
const postgres = require('postgres');
const fs = require('fs');
const { Console } = require('console');
const { ConstantNodeDependencies } = require('mathjs');
const { cookie } = require('request');



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
    //Fancy looking console starting message
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
     .then(presence => console.log(`RichPresence: Activity set to ${presence.aactivities ? presence.activities.name : message[i]}`))
     .catch(console.error);
 
        console.log("I: "+ i);
     if(i!=4){
    i++;
 }else{
     i=0;
     bot.user.setActivity('!help', {type: 'LISTENING'})
     .then(presence => console.log(`RichPresence: Activity set to ${presence.activities ? presence.activities.name : 'to !help'}`))
     .catch(console.error);
 }
      
   
    console.log(`Info: Rem is up and ready to serve on ${bot.guilds.cache.size} servers, for ${bot.users.cache.size} users.`);
    
   
   
    
    
   
    timeout()
}});

bot.on("message", message=>
{
    try {
        if(message!=null)
        {
            var domainEnd=["gg", ".gg"]
            for(var i =0; i<domainEnd.length; i++)
            {
                if(message.content.search(domainEnd[i])!=-1||message.content.search(/discord/i)!=-1)
                {
                    //console.log("Invite Killer: Potencial Invite Detected", domainEnd[i], message.content.search(domainEnd[i])!=-1);
                    //message potentialy has a link
                    if(message.content.search(domainEnd)&&message.content.split("/").length>0)
                    {
                        //message is definitely an invit link
                        //is the link for the server we are on?
                    message.guild.fetchInvites().then(
                        invites =>   
                        {
                            var inviteCodes =[];
                                for(var [key, values] of invites)
                                {
                                    inviteCodes.push(key)
                                }
                                //console.log("Invites",Invites)
                                var content = message.content;
                                var code = content.split("/")[1]
                                //console.log("Invite Killer: code: ", code);

                            if(code.split("").length>7)
                            {
                                    //either the link is wrong or its in a sentence
                                    code = code.split(" ")[0]
                                    //console.log("Invite Killer: Longer message//wrong code ");
                                    if(code.split("").length==7)
                                    {
                                        //link was in sentence  
                                        comparelink(inviteCodes, code, message.author, message);    

                                    }
                                    else
                                    {
                                        //Dude's dumb
                                        console.log("Invite Killer: Dude's dumb; Code is misspeled in some way.")
                                    }

                            }
                            else
                            {

                                comparelink(inviteCodes, code, message.author, message);
                            }
                        }
                    )
                    }
                }
            }
        }
    } catch (error) {
        //console.log(error)  ;
    }
})
function comparelink (Invites, code, author, message, from)
{   
    try {
    //console.log("Invite Killer: CompareLink: code: ", code)
        if(message !=null)
        {
            for(var i = 0; i<Invites.length; i++)
            {
                if(Invites[i]==code)
                {
                    console.log("Invite Killer: Aborted: Link is for this messages Guild");

                }
                else
                {
                    processPunishment(author, message);
                }
            }  
        }
        else
        {
            console.log("Invite Killer: Message is no longer available.");
        }        
    } catch (error) {
        //console.log(error)
    }
}
function processPunishment(author, message)
{
    //Apply strike system when implemented
    //delete the message
    try 
    {
        if(message!=null)
        {
            message.delete({timeout:1000});
        }  
    } 
    catch (error) 
    {
      //console.log(error)  
    }
    

};
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
    bot.on('raw', packet => 
    {
        // We don't want this to run on unrelated packets
        if (!['MESSAGE_REACTION_ADD', 'MESSAGE_REACTION_REMOVE'].includes(packet.t)) return;
        //console.log(packet);
        if (packet.t === 'MESSAGE_REACTION_REMOVE')
        {
            
            console.log("New Emmiter: Removed a reaction." +"\n Reaction name: "+packet.d.emoji.name);
            switch (packet.d.emoji.name) 
            {
                case "tuturu":
                    bot.channels.cache.get('445249426743754764').members.get(packet.d.user_id).roles.remove("336235115782864906");
                    console.log("Role Assignment: Role Removed. Role: Membro, from user: "+bot.channels.cache.get('445249426743754764').members.get(packet.d.user_id).nickname+".");
                    break;
                case "valorant_icon":
                bot.channels.cache.get('445249426743754764').members.get(packet.d.user_id).roles.remove("717826411695702119");
                    console.log("Role Assignment: Role Removed. Role: Valorant, from user: "+bot.channels.cache.get('445249426743754764').members.get(packet.d.user_id).nickname+".");
                    
                    break;
                case "rust_icon":
                bot.channels.cache.get('445249426743754764').members.get(packet.d.user_id).roles.remove("687634126387544115");
                    console.log("Role Assignment: Role Removed. Role: Rust, from user: "+bot.channels.cache.get('445249426743754764').members.get(packet.d.user_id).nickname+".");
                    
                    break;
                case "crackwatch":
                    bot.channels.cache.get('445249426743754764').members.get(packet.d.user_id).roles.remove("642891554964635659");
                    console.log("Role Assignment: Role Removed. Role: CrackWatch, from user: "+bot.channels.cache.get('445249426743754764').members.get(packet.d.user_id).nickname+".");
                    
                    break;
            
                    
                default:
                    break;
            }

        }
    });
    
 
   function giveRole()
   {
     
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
                            console.log(`RoleAssignment: Role ${roles[0]} given to ${value.username}`)
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
                            console.log(`RoleAssignment: Role ${roles[1]} given to ${value.username}`)
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
                            console.log(`RoleAssingment: Role ${roles[2]} given to ${value.username}`)
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
                            console.log(`RoleAssingment: Role ${roles[3]} given to ${value.username}`)
                           }
                           
                          
                        }
                        
                    }
                )
            }
        )
    }      
   

});









bot.on('ready',()=>{ 
    
    
    crackwatch();
      
function crackwatch()
{ 
        setTimeout(()=>{  
        //Gets the lastCrackMessageSentTitle from the message on the channel
        var lastCrackMessageSentTitle
        const baseChannel = '643995527389773855';
        if(channelexists(baseChannel))
        {
            bot.channels.cache.get(baseChannel).messages.fetch({limit:1}).then(messages=>{
                for(var [key, values] of messages)
                {
                    bot.channels.cache.get(baseChannel).messages.fetch(values.id).then(message =>
                    {
                    lastCrackMessageSentTitle = message.embeds[0].title;
                    console.log("CrackWatch: lastCrackSent from the last Message: " + lastCrackMessageSentTitle);
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

                            //console.log("CrackWatch: correctedTitle: " + correctedTitle)
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
                                console.log("CrackWatch: passed the check will now be sent")
                                sendMessage(fetchedCrack[0], correctedTitle,  info);
                                crackwatch();
                            }else{
                                console.log("CrackWatch: Didn't pass the check, same as the last one sent.")
                                crackwatch()
                            }
                    }else{
                        console.log("CrackWatch: Server Internal Error")
                        crackwatch();
                    } 
                }  
            }catch (error) 
            {
                        
                console.log("CrackWatch: something went wrong on the try")
                crackwatch();
            }
        }else
        {

            console.log("CrackWatch: Server Error: Page doesn't even display a error message.")
        }
    } 
         
         
    

        );
   
    }, 10000);  
    
} 


   
     
     function crackcheck(correctedTitle, lastCrackMessageSentTitle){
        console.log("CrackWatch: CrackCheck: correctedTitle: " +correctedTitle + "  lastCrackSentTitle: " + lastCrackMessageSentTitle);
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
    
     do
     {
        try 
        {
            request(`http://api.crackwatch.com/api/games?page=${count}`, function(err, res, body){
                let games = JSON.parse(body);
                if(err){
                    console.error(err);
                }
                if(res >399){
                    console.log("CrackWatch: error reference: "+ res);
                }
                for ( var i=0; i<games.length; i++) {
                      
                    if(games[i].title.search(Title) != -1){
                        console.log("CrackWatch: found match")
        
                        finish = true
                        return games[i];
                    }
                }
              
                
               if(count==49){
                   console.log("CrackWatch: Count at 49, stoping search. It took too much time already.")
               }
                
                }); 
                count++;
        } catch (error) {
            console.log("CrackWatch: Error on request.");
            console.error(error);
        } 
      
    }while(count < 50);
    


}
    



}); 
bot.on('ready',()=>{
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
    //Gets the members inside the AFK channel
    let auxmembers = bot.channels.cache.get("335494006890823680").members
    console.log("MoveAFK: Member list with "+ auxmembers.size+" members.")
    //Sorts through them looking for those who have the SS - Secret Services Role
    if(auxmembers.size >0)
    {
        console.log("hosting:");
    }
    for(var [key, values] of auxmembers){
       console.log(values.id);;
        if(values.roles.cache.has('693413934715240498')){ 
            //Upon fiding someoe that has said role.           
            //Moves it to the correct Channel.
            values.voice.setChannel('648189029589843999')
                    .then(() => console.log(`MoveAFK: Moved ${values.displayName}.`))
                    .catch(console.error);
        }
    }
}

function rustCommits()
{  // Getting the lastSentCommit message from the channel
   
    
   
    var lastSentDate  
    var lastSentCommit 
    
   if(lastSentCommit==null) 
   {
        if(channelexists('721061781824471080'))
        {
            bot.channels.cache.get('721061781824471080').messages.fetch({limit:1}).then(messages=>
            {
            console.log("RustCommits: FetchLastMessageSent: Found Messages")
                for(var [key, values] of messages)
                {
                    bot.channels.cache.get('721061781824471080').messages.fetch(values.id).then(message =>
                    {
                    lastSentCommit = message.embeds[0].description;
                    lastSentDate = message.embeds[0].title
                    console.log("RustCommits: lastSentDate took from cached message : " + message.embeds[0].title);
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
            let Results
            var commitCount=0;
            if(!err)
            {
                if(JSON.parse(body).results != null)
                {
                    
                  Results = JSON.parse(body).results;  
                 
                }else
                {
                    console.log("RustCommits: JSON.parse Error: body is null")
                    return
                }
                

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
                                //console.log("RustCommits: Commit saved")
                                commitCount ++;
                                
                            }else{

                                //console.log("RustCommits: Commits matches the last sent.")
                                if(commitCount >0)
                                {
                                    return newCommits();
                                }else{
                                    //console.log("RustCmmits: Não há commits novos.")
                                    return 
                                }
                            }
                        }else
                        {
                            //console.log("RustCommits: Commit not saved, as it's for another game.")
                        }
                    }else
                    {
                        console.log("RustCommits: Count reached the limit.")
                        return newCommits();
                    }
                    
                }
        
                function newCommits()
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
                            if(lastSentDate==null)
                            {
                                console.log("RustCommits: LastSentDate was null returning back to the begining.")
                                return
                            }
                            if(latestCommit.Time != lastSentDate)
                            {
                                if(latestCommit.Time.split(" do dia ")[1].split("-")[0]>lastSentDate.split(" do dia ")[1].split("-")[0])//se o ano for maior 
                                {
                                messageCommit(latestCommit, RustResults[i].repo, RustResults[i].branch);
                                }else if(latestCommit.Time.split(" do dia ")[1].split("-")[0]=lastSentDate.split(" do dia ")[1].split("-")[0])//se o ano for igual
                                {
                                if(latestCommit.Time.split(" do dia ")[1].split("-")[1]>lastSentDate.split(" do dia ")[1].split("-")[1])//se o mes for maior
                                {
                                    messageCommit(latestCommit, RustResults[i].repo, RustResults[i].branch);
                                }else if(latestCommit.Time.split(" do dia ")[1].split("-")[1]=lastSentDate.split(" do dia ")[1].split("-")[1])//se o mês for igual
                                {
                                    if(latestCommit.Time.split(" do dia ")[1].split("-")[2]>lastSentDate.split(" do dia ")[1].split("-")[2])//se o dia for maior
                                    {
                                        messageCommit(latestCommit, RustResults[i].repo, RustResults[i].branch);
                                    }else if(latestCommit.Time.split(" do dia ")[1].split("-")[2]=lastSentDate.split(" do dia ")[1].split("-")[2])//se dia for igual
                                    {
                                    
                                        if(latestCommit.Time.split(" do dia ")[0].split(":")[0]>lastSentDate.split("às ")[1].split(" do dia ")[0].split(":")[0])//se a hora for maior
                                        {   
                                            messageCommit(latestCommit, RustResults[i].repo, RustResults[i].branch);
                                        }else if(latestCommit.Time.split(" do dia ")[0].split(":")[0]=lastSentDate.split("às ")[1].split(" do dia ")[0].split(":")[0])//se for igual
                                        {
                                            if(latestCommit.Time.split(" do dia ")[0].split(":")[1]>lastSentDate.split("às ")[1].split(" do dia ")[0].split(":")[1])//se o minuto for maior 
                                            {
                                                messageCommit(latestCommit, RustResults[i].repo, RustResults[i].branch);
                                            }else if(latestCommit.Time.split(" do dia ")[0].split(":")[1]=lastSentDate.split("às ")[1].split(" do dia ")[0].split(":")[1])//se for igual
                                            {
                                                if(latestCommit.Time.split(" do dia ")[0].split(":")[2]>=lastSentDate.split("às ")[1].split(" do dia ")[0].split(":")[2])//se o segundo for maior
                                                {
                                                    messageCommit(latestCommit, RustResults[i].repo, RustResults[i].branch );
                                                }//there is no else otherwise it would be equal to the last sent or an older one that was supposed to have been sent already
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


function messageCommit(commit, repo, branch){
    console.log("RustCommits: Sending a new commit.") 
    const embed = new Discord.MessageEmbed        
          embed.setTitle("Novo Commit às "+commit.Time)
          embed.setAuthor(commit.Author, commit.Avatar)
          embed.addField("Repo: ", repo+"/"+branch)
          embed.setColor(0xc23811)
          embed.setDescription(commit.Content)
          embed.setFooter('Rem-chan ', "https://i.imgur.com/g6FSNhL.png")
          embed.setTimestamp() 
         let allChannels = JSON.parse(fs.readFileSync('channels.json', 'utf-8'));
         for(var i =0; i<allChannels.rustCommitsChannels.length;i++)
         {
            if(channelexists(allChannels.rustCommitsChannels[i]))
            {
                bot.channels.cache.get(allChannels.rustCommitsChannels[i]).send({embed}).then(()=>
                {
                    lastSentCommit = commit;
                    lastSentDate = ("Novo Commit às "+commit.Time);
                    //console.log("RustCommits: lastSentDate changed when sending the message : " + lastSentDate);

                });
            }
         }
         
 }

function channelexists(channel){

if(bot.channels.cache.get(channel) != null) return true
}


//Music