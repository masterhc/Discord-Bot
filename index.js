console.time('StartUp')
const Discord  = require('discord.js');
const commando = require('discord.js-commando');
const request = require('request');
const fs = require('fs');
const got = require('got');
const cheerio = require('cheerio');
const Spawner = require('child_process');
const mongoose = require('mongoose');


const bot = new commando.Client
(({
    partials: ["REACTION", "MESSAGE"] 
}));

bot.login(process.env.discord_token);

bot.registry.registerGroup('random','random');
bot.registry.registerGroup('games', 'games');
bot.registry.registerGroup('nsfw', 'nsfw');
bot.registry.registerGroup('music', 'music');
bot.registry.registerGroup('admin', 'admin');
bot.registry.registerGroup('image', 'imagens');
bot.registry.registerGroup('pesquisa', 'pesquisa');
bot.registry.registerDefaults();
bot.registry.registerCommandsIn(__dirname + "/commands");

var Guilds_ = []

//Start Up Log
bot.on('ready', ()=>{
    //Fancy looking console starting message
    console.log("--------------------------\n    Legendary Rem-Chan    \n         Ready           \n       on "+bot.guilds.cache.size+" guilds        \n--------------------------")
    console.timeEnd('StartUp');

    mongoose.Promise = global.Promise;
    mongoose.connect(process.env.mongoDB, {useNewUrlParser: true, useUnifiedTopology:true, useFindAndModify: false }).then(console.log('Server - MONGODB: Connected')).catch(err=>console.log(err));
 
    bot.user.setActivity('for !help', {type: 'LISTENING'});
    GuildsModel=[]//model for saving on a file
   
    for(var [key, values] of bot.guilds.cache){
    GuildsModel.push(values.name)
    } 
    fs.writeFileSync("guilds.json",JSON.stringify({GuildsModel}), "utf-8"); //actualy saving it in the file, find a way to do this with a data base.       
    //Timmers

    freegames();
    music();
    rustCommits();

    setInterval(() => 
    {
        giveRole(); // Member role on wellcome channel
        music();
    }, 
    1500);

    setInterval(()=>
    {
        freegames();
    }, 60000)

    setInterval(()=>
    {
        moveAFKs()
        rustCommits();//Start webscraping of rust commit webpage (it also sends it to the apropriate channel.)
        conquests()
    }, 10000);
 
});

bot.on("message", message=>
{
    try 
    {
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
                        //message is definitely an invite link
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

bot.on('raw', packet => 
{
    // We don't want this to run on unrelated packets
    if (!['MESSAGE_REACTION_ADD', 'MESSAGE_REACTION_REMOVE'].includes(packet.t)) return;
    //console.log(packet);
    if (packet.t === 'MESSAGE_REACTION_REMOVE')
    {
        console.log("Role Assignment: Reaction "+packet.d.emoji.name+" remove.");
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
            case "league":
                bot.channels.cache.get('445249426743754764').members.get(packet.d.user_id).roles.remove("763872390199246868");
                console.log("Role Assignment: Role Removed. Role: league, from user: "+bot.channels.cache.get('445249426743754764').members.get(packet.d.user_id).nickname+".");
                
                break;
        
                
            default:
                break;
        }

    }
});
    
 
function giveRole()
{
    
    const wellcomeChannelID="445249426743754764";
    const wellcomeChannel = bot.channels.cache.get(wellcomeChannelID);
    const messageID = "445251380639170560";
    var roleEmojis = ["tuturu", "rust_icon", "valorant_icon", "crackwatch", "league"];
    var roleName =['Membro', 'Rust', 'Valorant', 'CrackWatch', 'League of Legends'];
    var roleIDs=['336235115782864906','687634126387544115','717826411695702119','642891554964635659','763872390199246868'];


    wellcomeChannel.messages.fetch(messageID).then
    (
        m =>
        {
            
            const filter = (reaction, user) =>
            {               
                for(var i=0; i<roleEmojis.length; i++)
                {
                    if(reaction.emoji.name==roleEmojis[i])
                    {
                        return true;
                    }  
                } 
            };
            m.awaitReactions( filter,{ time: 3000, errors: ['time'] })
            .catch(
                collected =>
                {
                    for(var [key, values] of collected)
                    {
                        for(var [key, value] of values.users.cache) 
                        {
                            for(var i = 0; i<roleEmojis.length;i++)
                            {
                                if(roleEmojis[i]==values._emoji.name)
                                {
                                    bot.channels.cache.get(wellcomeChannelID).members.get(value.id).roles.add(roleIDs[i]);
                                    console.log(`RoleAssignment: Role ${roleName[i]} given to ${value.username}`)
                                }
                            }                       
                           
                        }
                    }   
                })
        }
    )

}      
function channelexists(channel){

    if(bot.channels.cache.get(channel) != null) return true
}


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
        })//end of request
    } catch (error) {
        console.log("RustCommits: Request Failed")
        console.error(error)  
    }

};


function messageCommit(commit, repo, branch)
{
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

//Conquests
function conquests()
{
    //START
    (async () => {
        try {
            const response = await got('https://pt.twstats.com/pt79/index.php?page=ennoblements&live=live');
            const $ = cheerio.load(response.body);
            
            var refactoredData = [];
            for(var i = 1; i< $('table.widget tr').length;i++)
            {
                refactoredData.push(refactorData($('table.widget tr')[i]));
            }
            redundancyCheck(refactoredData);
        } catch (error) {
            console.log("Conquests: GotError:",error);
        }
    })()
 
    function refactorData($)
    {
        var PrevOwnerTribe = null;
        var PrevOwnerTribeLink = null;
        var NewOwnerTribe = null;
        var NewOwnerTribeLink = null;
        var PrevOwnerLink = null;
        var PrevOwner
        if($.children[2].children.length>=2)//0 -> barbarian 1 -> Player w/out tribe 2 -> Player w/ tribe
        {
            PrevOwner = $.children[2].children[0].children[0].data;
            PrevOwnerLink ='https://pt.twstats.com/pt79/'+$.children[2].children[0].attribs.href;
            if($.children[2].children.length==4)
            {
                PrevOwnerTribe = $.children[2].children[2].children[0].data;
                PrevOwnerTribeLink ='https://pt.twstats.com/pt79/'+$.children[2].children[2].attribs.href;
            }
        }
        if($.children[3].children.length == 4)
        {
            NewOwnerTribe = $.children[3].children[2].children[0].data;
            NewOwnerTribeLink = 'https://pt.twstats.com/pt79/'+$.children[3].children[2].attribs.href;
        }  
        return{
            Date:$.children[4].children[0].data,
            VillageName:$.children[0].children[0].children[0].data,
            VillageLink:'https://pt.twstats.com/pt79/'+$.children[0].children[0].attribs.href,
            VillagePoints:$.children[1].children[0].data,
            PrevOwner:PrevOwner || 'Barbarians',
            PrevOwnerLink: PrevOwnerLink || 'https://tribalwars.com.pt/',
            PrevOwnerTribe: PrevOwnerTribe ||'No tribe',
            PrevOwnerTribeLink: PrevOwnerTribeLink || 'https://tribalwars.com.pt',
            NewOwner:$.children[3].children[0].children[0].data,
            NewOwnerLink:'https://pt.twstats.com/pt79/'+$.children[3].children[0].attribs.href,
            NewOwnerTribe: NewOwnerTribe || 'No Tribe',
            NewOwnerTribeLink: NewOwnerTribeLink || 'https://tribalwars.com.pt/'
        }         
    }
    function redundancyCheck(Data)
    {
        var channels = JSON.parse(fs.readFileSync('channels.json', 'utf-8')).conquests;
        //console.log('Conquest: Channel File:', channels)
        let promise = Promise.resolve();
        let i = 0;
        do {

             let curChannel = channels[i];
            channel = bot.channels.cache.get(channels[i])
            if(channel)
            {
                //console.log('Conquest: Redundancy Check: LastMessageID: ',i,channel.lastMessageID);
                if(channel.lastMessageID)
                {
                    bot.channels.cache.get(channels[i]).messages.fetch(channel.lastMessageID).then(message =>
                        {
                            //console.log('Conquest: Redundancy Check: lastMessage: ', message)
                            for(var j = Data.length-1; j>=0; j--)
                            {
                                if(workableDate(Data[j].Date)>workableDate(message.embeds[0].title))
                                {
                                    //console.log('Conquest: Redundancy Check: Last Message outdated: channel:',curChannel,'i:',i,'New Data: ', Data[j].Date);
                                    sendMessage(curChannel,Data[j]);
                                }
                            }
                            //console.log('Conquest: Redundancy Check: Last Message Up to date.', curChannel)
                        })
                }
                else
                {
                    for(var j = Data.length-1; j>=0; j--)
                    {
                        //console.log('Conquest: Redundancy Check: Data:', Data[j]);
                        sendMessage(channels[i], Data[j])
                    }
                }
            }
            i++;
        } while (i<channels.length);
    }
    function workableDate(Date_)
    {
        var data = Date_
        var spliton_ = data.split('-');
        var splittime = spliton_[3].split(' ')[1].split(':');
        return new Date(spliton_[0], parseInt(spliton_[1])-1, spliton_[2].split(' ')[0], parseInt(splittime[0])+1, splittime[1], splittime[2]);
    }
    function sendMessage(channel, content)
    {
        console.log('Conquest: SendMessage: Content:', content.Date);
        const embed = new Discord.MessageEmbed
        embed.setTitle(content.Date)
        embed.setAuthor("Rem-chan", "https://i.imgur.com/g6FSNhL.png")
        embed.setColor(0xb59f7d)
        embed.setDescription(`Aldeia Coquistada por [${content.NewOwner}](${content.NewOwnerLink}) [[${content.NewOwnerTribe}](${content.NewOwnerTribeLink})]`)
        embed.addField('Aldeia:',`[${content.VillageName}](${content.VillageLink})`)
        embed.addField('Pontos:',`${content.VillagePoints}`);
        embed.addField('Dono antigo: ',`[${content.PrevOwner}](${content.PrevOwnerLink}) [[${content.PrevOwnerTribe}](${content.PrevOwnerTribeLink})]`)
        embed.setFooter('Rem-chan em ', "https://i.imgur.com/g6FSNhL.png")
        embed.setThumbnail(`https://dspt.innogamescdn.com/asset/dbeaf8db/graphic///map_new/${villageIcon(content.VillagePoints,content.PrevOwner)}.png`)
        embed.setTimestamp()
        bot.channels.cache.get(channel).send({embed});
    }
    function villageIcon(num, prevOwner)
    {
        num = parseInt(num.replace(',',''),10)
        //console.log('Conquest: VillageIcon: num: ', num) 

        if(prevOwner == 'Barbarians')
        {
            
            return (num<300)? 'b1_left': ((num<1000)?'b2_left':((num<3000)?'b3_left':((num<9000)? 'b4_left':((num<12000)?'b5_left':'b6_left'))));

        }
        else
        {
            return (num<300)? 'v1': ((num<1000)?'v2':((num<3000)?'v3':((num<9000)? 'v4':((num<12000)?'v5':'v6'))));
        }
    }
}

function freegames()
{
    (async () => {
        try {
            const response = await got('https://www.gamerpower.com/api/giveaways');
            const BODY = JSON.parse(response.body).slice(0,20)
            
            redundancyCheck(BODY)
            
        } catch (error) {
            console.log("FreeGames: GotError:",error);
        }
    })()
    function sendMessage(channel, content)
    {
        console.log('FreeGames: Sending Message')
        const embed = new Discord.MessageEmbed()
        .setTitle(content.title)
        .setAuthor("Rem-chan", "https://i.imgur.com/g6FSNhL.png")
        .addField('Válido até:',content.end_date)
        .setColor(0x2d9134)
        .setImage(content.image)
        .addFields({name:"Instruções:",value:content.instructions})
        .addFields({name:"Tipo de oferta:",value:content.type})
        .setDescription(content.description)
        .addField('Link:',`[Grab it](${content.open_giveaway_url})`)
        .setFooter(`(${content.id}) Rem-chan em `, "https://i.imgur.com/g6FSNhL.png")
        .setThumbnail(content.thumbnail)
        .setTimestamp()
        bot.channels.cache.get(channel).send({embed});
    }
    function redundancyCheck(Data)
    {
        var channels = JSON.parse(fs.readFileSync('channels.json', 'utf-8')).freeGames;
        //console.log('Freegames. RedundancyCheck: Channels:', channels[0]);
        var i = 0;
        do {

            let curChannel = channels[i];
            channel = bot.channels.cache.get(channels[i])
            if(channel)
            {
                //console.log('Freegames: Redundancy Check: LastMessageID: ',i,channel.lastMessageID);
                if(channel.lastMessageID)
                {
                    bot.channels.cache.get(channels[i]).messages.fetch(channel.lastMessageID).then(message =>
                        {
                            var lastID = parseInt(message.embeds[0].footer.text.split('(')[1].split(')'[0]))
                            console.log('FreeGames: Redundancy Check: LastID: ', lastID)
                            for(var j = Data.length-1; j>=0; j--)
                            {
                                //console.log('Freegames: Redundancy Check: Last Message outdated: channel:',curChannel,'i:',lastID, Data[i].id);
                                if(Data[j].id>lastID)
                                {
                                    console.log('Freegames: Redundancy Check: Last Message outdated: channel:',curChannel,'i:',lastID, Data[i].id);
                                    sendMessage(curChannel,Data[j]);

                                }
                            }
                            console.log('Freegames: Redundancy Check: Last Message Up to date.', curChannel)
                        }).catch(message=>
                        {
                            for(var j = Data.length-1; j>=0; j--)
                            {
                                //console.log('Conquest: Redundancy Check: Data:', Data[j]);
                                console.log('Conquest: Redundancy Check: channel & Data:', channels[i]);
                                console.log('FreeGames: Catch on message: Message could not be found.')
                                sendMessage(curChannel, Data[j])

                            }
                        })
                }
                else
                {
                    //No last Message
                    for(var j = Data.length-1; j>=0; j--)
                    {
                        sendMessage(curChannel, Data[j])
                    }
                }
            }
            i++;
        } while (i<channels.length);       
    }
}


function music()
{
    //console.log('Music: Looking for Servers.')
    for(var [key, values] of bot.guilds.cache)
    {
        //console.log('Music: Guilds:',!Guilds_.includes(values.name));
        if(!Guilds_.includes(key.toString()))
        {
            //console.log('Music: Guilds: (', key.toString(),')', values.name)
            if(key.toString()!='447134296885428234') //remove a stupid server
            {
                Guilds_.push(key.toString());
                console.log('Index: Starting Music Worker:', values.name,`(${key})`)
                Spawner.fork('./music.js',[key.toString(), values.name]);
            }
        }
    } 
}