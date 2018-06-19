
const Discord  = require('discord.js');
const commando = require('discord.js-commando');
const request = require('request');
const Music = require('discord.js-musicbot-addon')
const fs = require('fs');
const cheerio = require('cheerio');

var config = JSON.parse(fs.readFileSync('.settings.json', 'utf-8'));

const bot = new commando.Client();
const http = require('http');


 
bot.login(process.env.discord_token);
const music = new Music(bot, {
    youtubeKey:process.env.youtubeKey,
    
    disableLoop:true,
    ownerOverMember:true,
    anyoneCanSkip:false,
    anyoneCanLeave:true,
    defVolume:10,
    enableQueueStat:true,
    botAdmins:[
        '186540961650835456', 
        '278011316487192577'
    ],
    disableHelp:true,

    
    botOwner:'186540961650835456',


  });





bot.registry.registerGroup('random','Random');
bot.registry.registerGroup('tribos', 'Tribos');
bot.registry.registerGroup('music','Music');
bot.registry.registerGroup('nsfw', 'Nsfw');
bot.registry.registerGroup('image', 'Imagens');
bot.registry.registerGroup('pesquisa', 'Pesquisa');
bot.registry.registerGroup('riot','RiotGames');
bot.registry.registerGroup('steam', 'Steam');
bot.registry.registerGroup('admin','Admin');
bot.registry.registerDefaults();
bot.registry.registerCommandsIn(__dirname + "/commands");




//Start Up Log
bot.on('ready', ()=>{
   
   var i = 0
   var tipo = [
       'PLAYING',
       'STREMING',
       'LISTENING',
       'WATCHING'
   ]
   var message =[
       'with crazy people',//Playing message
       'crappy content', //watching message
       'sounds of my people', //listening message
       'windoh'//watching message
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
//Conquistas em direto

bot.on('ready',()=>{
   
    crawler();
   function crawler(){
    setTimeout(()=>{
        var world = JSON.parse(fs.readFileSync('coiso.json', 'utf-8'));
        
        var mundo = world.mundo;
            request(`http://pt.twstats.com/${mundo}/index.php?page=ennoblements&live=live`, function(err, res, body){
       
                let tablelink = [];
                let nomest = [];


                let pointst  = [];
        
                if(!err){
        cheerio('td','table.widget', body).each(function(){
            var points = cheerio(this).text();
            pointst.push(points);
            
        }); 
        
        console.log('pointst '+pointst[1]);
         cheerio('a', 'table.widget', body).each(function(){
          
          var data= cheerio(this).attr('href');
          var nomes = cheerio(this).text();
        
        
        tablelink.push(data);
      
        nomest.push(nomes);
        
        });
         let coordX = processcoord(nomest[0])[0]
         let coordY = processcoord(nomest[0])[1]        
        
        if(checker(coordX, coordY)==false){
           
            let modifier = processdata(nomest, tablelink);
           
          
            //console.log('passou o check')
            if(modifier != 'err'){
                var world = JSON.parse(fs.readFileSync('coiso.json', 'utf-8'));
                let mundo = world.mundo;
               
            let laldeia = `https://${mundo}.tribalwars.com.pt/guest.php?screen=map&x=${coordX}&y=${coordY}&beacon#${coordX};${coordY}`
            mensagem(nomest[0], nomest[1], nomest[2],nomest[3], nomest[4],laldeia,tablelink[1], tablelink[2], tablelink[3], tablelink[4], modifier, mundo, coordX, coordY, pointst);
            }else{
                console.log('modifier err');
                crawler();
            }
        }else{
            crawler()
            console.log('Falhou o check(From crowler)');
           
        }
        
           
        
      

             console.log(new Date)
        }else{
            console.log('Erro do request')
        }
        });
    }, 60000); 
   
}


     function processcoord(nome){
        let coordj = nome.split(' ');
        
        let coords = (coordj[coordj.length-2]).split(/(|)/);
        let coord =[]   
            coord[0]=coords[2]+coords[4]+coords[6]
            coord[1] = coords[10]+coords[12]+coords[14]
        
        
        return coord;
        };

    //Verificar se é a mesma aldeia
    function checker(coordX, coordY,){
         var checking = JSON.parse(fs.readFileSync('.conquistasaovivo.json', 'utf-8'));  
         console.log(checking)
         
            if(coordX == checking.coordX || coordY == checking.coordY){
                console.log("Falhou o check(from checker)");
                return true;
            }else{
                return false;
               
            };
        
        
             
         }
   
 
         
          
            //quando é conquistada a um jogador
        //0 -> aldeia
        //1 -> anterior
        //2 -> tribo
        //3 -> atual
        //4 -> tribo
        
       //Quando é conquistada a um jogador sem tribo
        //0 -> aldeia
        //1 -> anterior
        //2 -> atual
        //3 -> tribo
        //4 -> aldeia2
       //Quando o conquistador não tem tribo
        //0 -> aldeia
        //1 -> anterior
        //2 -> tribo
        //3 -> atual
        //4 -> aldeia2
       //Quando nenhum tem tribo
        //0 -> aldeia
        //1 -> anterior
        //2 -> atual
        //3 -> aldeia2
        //4 -> anterior
     
       //Quando é bb
        //0 -> aldeia
        //1 -> atual
        //2 -> tribo
        //3 -> aldeia2
       //quando é bb e o jogador não tem tribo
        //0 -> aldeia
        //1 -> atual
        //2 -> aldeia2
        //3 -> anterior
        //4 -> tribo 
          
            
        function processdata(nome, links){
            
           
                
            
        let nomedaaldeia=nome[0]
        let donoanterior = nome[1]
        let tribodonoanterior = nome[2]
        let novodono = nome[3]
        let tribonovodono = nome[4]
        let linkaldeia = links[0]
        let linkdonoanterior = links[1]
        let linktribodonoanterior = links[2]
        let linknovodono = links[3]
        let linktribonovodono = links[4];
        let split = nomedaaldeia.split(' ');
        // verificar o K com o filtro
        let K0 = split[split.length -1];
        let K = split[split.length-1].split(/(|)/)[0]; 
        let kvalue = K[0]+K[2]+K[4]
            let parsed = JSON.parse(fs.readFileSync('coiso.json', 'utf-8'));
            let Kfilter = parsed.K;
           
            if (Kfilter.length>0){
                for (var filter of Kfilter) {
                     if (kvalue.indexOf(filter)  > -1) {
                  
        //split nomes
        let splitn1 = donoanterior.split(' ');
        let splitn2 = tribodonoanterior.split(' ');
        let splitn3 = novodono.split(' ');
        let splitn4 = tribonovodono.split(' ');
        // check for K
        let K1 = splitn1[splitn1.length-1].split(/(|)/)[0];
         let K2 = splitn2[splitn2.length-1].split(/(|)/)[0];
        let K3 = splitn3[splitn3.length-1].split(/(|)/)[0];
        let K4 = splitn4[splitn4.length-1].split(/(|)/);
        //split links
        let splitl1 = linkdonoanterior.split(/(|)/); 
        let splitl2 = linktribodonoanterior.split(/(|)/); 
        let splitl3 = linknovodono.split(/(|)/); 
        let splitl4 = linktribonovodono.split(/(|)/);
        //check for t or p
        let tp1 = splitl1[30];
        let tp2 = splitl2[30];
        let tp3 = splitl3[30];
        let tp4 = splitl4[30];
        
            if(K=='K' && K1!='K'&&K2!='K' && K3!= 'K' &&K4 != 'K'  && tp1=='p' &&tp2=='t' &&tp3=='p' &&tp4=='t'){
                  return 6 //conquista normal
            }else if(K=='K' && K1!='K'&&K2!='K' && K3!= 'K' &&K4 == 'K'  && tp1=='p' &&tp2=='t' &&tp3=='p' &&tp4=='v'){
            
                  return 5 //conquistada por um jogador sem tribo
            }else if(K=='K' && K1!='K'&&K2!='K' && K3!= 'K' &&K4 == 'K'  && tp1=='p' &&tp2=='p' &&tp3=='t' &&tp4=='v'){
                  return 4 //conquistada a um jogador sem tribo
            }else if(K=='K' && K1!='K'&&K2!='K' && K3== 'K' &&K4 != 'K'  && tp1=='p' &&tp2=='p' &&tp3=='v' &&tp4=='p'){
                  return 3 //nenhum dos jogadores tem tribo
            }else if(K=='K' && K1!='K'&&K2!='K' && K3== 'K' &&K4 != 'K'  && tp1=='p' &&tp2=='t' &&tp3=='v' &&tp4=='p'){
                  return 2 // Aldeia BB(novo dono tem tribo)
            }else if(K=='K' && K1!='K'&&K2=='K' && K3!= 'K' &&K4 != 'K'  && tp1=='p' &&tp2=='v' &&tp3=='p' &&tp4!=='a'){
                 return 1 // BB conquistada por jogador sem tribo
            }else{
                 return 'err';
            }
                 
    
        }else{
            return crawler();
          }
        }
    }else{
     //split nomes
     let splitn1 = donoanterior.split(' ');
     let splitn2 = tribodonoanterior.split(' ');
     let splitn3 = novodono.split(' ');
     let splitn4 = tribonovodono.split(' ');
     // check for K
     let K1 = splitn1[splitn1.length-1].split(/(|)/)[0];
     let K2 = splitn2[splitn2.length-1].split(/(|)/)[0];
     let K3 = splitn3[splitn3.length-1].split(/(|)/)[0];
     let K4 = splitn4[splitn4.length-1].split(/(|)/)
     //split links
     let splitl1 = linkdonoanterior.split(/(|)/); 
     let splitl2 = linktribodonoanterior.split(/(|)/); 
     let splitl3 = linknovodono.split(/(|)/); 
     let splitl4 = linktribonovodono.split(/(|)/);
     //check for t or p
     let tp1 = splitl1[30];
     let tp2 = splitl2[30];
     let tp3 = splitl3[30];
     let tp4 = splitl4[30];
     
         if(K=='K' && K1!='K'&&K2!='K' && K3!= 'K' &&K4 != 'K'  && tp1=='p' &&tp2=='t' &&tp3=='p' &&tp4=='t'){
               return 6 //conquista normal
         }else if(K=='K' && K1!='K'&&K2!='K' && K3!= 'K' &&K4 == 'K'  && tp1=='p' &&tp2=='t' &&tp3=='p' &&tp4=='v'){
         
               return 5 //conquistada por um jogador sem tribo
         }else if(K=='K' && K1!='K'&&K2!='K' && K3!= 'K' &&K4 == 'K'  && tp1=='p' &&tp2=='p' &&tp3=='t' &&tp4=='v'){
               return 4 //conquistada a um jogador sem tribo
         }else if(K=='K' && K1!='K'&&K2!='K' && K3== 'K' &&K4 != 'K'  && tp1=='p' &&tp2=='p' &&tp3=='v' &&tp4=='p'){
               return 3 //nenhum dos jogadores tem tribo
         }else if(K=='K' && K1!='K'&&K2!='K' && K3== 'K' &&K4 != 'K'  && tp1=='p' &&tp2=='t' &&tp3=='v' &&tp4=='p'){
               return 2 // Aldeia BB(novo dono tem tribo)
         }else if(K=='K' && K1!='K'&&K2=='K' && K3!= 'K' &&K4 != 'K'  && tp1=='p' &&tp2=='v' &&tp3=='p' &&tp4!=='a'){
              return 1 // BB conquistada por jogador sem tribo
         }else{
              return 'err';
         }
   console.log('No ative filters.')
}

        
        
        
        
        }
 
 
 
 
    
 
    function mensagem( naldeia, ndono, ntdono, nnovo, ntnovo, laldeia, ldono, ltdono, lnovo, ltnovo, modifier, mundo, coordX, coordY, pointst){   
      let embed = new Discord.RichEmbed;
       
        console.log("modifier "+modifier);

         ldono = `http://www.twstats.com/${mundo}/${ldono}`
         ltdono =`http://www.twstats.com/${mundo}/${ltdono}`
         lnovo =`http://www.twstats.com/${mundo}/${lnovo}`
         ltnovo =`http://www.twstats.com/${mundo}/${ltnovo}`

        //Imagem
            var image;

            // BBs em primeiro
            //players em segundo
            if(pointst[1]<299){
               
               if(modifier == 1){ 
                image = 'https://dspt.innogamescdn.com/8.130/37430/graphic//map/version2/v1_left.png'
               } else if(modifier==2) {
                   image = "https://dspt.innogamescdn.com/8.130/37430/graphic//map/version2/v1_left.png";
                }else{//player
                    image="https://dspt.innogamescdn.com/8.130/37430/graphic//map/version2/v1.png";
                }
            
            }else if(300<pointst[1]<999){
                if(modifier == 1){ 
                    image = "https://dspt.innogamescdn.com/8.130/37430/graphic//map/version2/v2_left.png";
                   } else if(modifier==2) {
                       image = "https://dspt.innogamescdn.com/8.130/37430/graphic//map/version2/v2_left.png";
                    }else{//player
                        image="https://dspt.innogamescdn.com/8.130/37430/graphic//map/version2/v2.png";
                    }
                
            }else if(1000<pointst[1]<2999){
                if(modifier == 1){ 
                    image = "https://dspt.innogamescdn.com/8.130/37430/graphic//map/version2/v3_left.png";
                   } else if(modifier==2) {
                       image = "https://dspt.innogamescdn.com/8.130/37430/graphic//map/version2/v3_left.png";
                    }else{//player
                        image="https://dspt.innogamescdn.com/8.130/37430/graphic//map/version2/v3.png";
                    }
                
            }else if(3000<pointst[1]<8999){
                if(modifier == 1){ 
                    image = "https://dspt.innogamescdn.com/8.130/37430/graphic//map/version2/v4_left.png";
                   } else if(modifier==2) {
                       image = "https://dspt.innogamescdn.com/8.130/37430/graphic//map/version2/v4_left.png";
                    }else{//player
                        image="https://dspt.innogamescdn.com/8.130/37430/graphic//map/version2/v4.png";
                    }
                
            }else if(9000<points[1]<10999){
                if(modifier == 1){ 
                    image = "https://dspt.innogamescdn.com/8.130/37430/graphic//map/version2/v5_left.png";
                   } else if(modifier==2) {
                       image = "https://dspt.innogamescdn.com/8.130/37430/graphic//map/version2/v5_left.png";
                    }else{//player
                        image="https://dspt.innogamescdn.com/8.130/37430/graphic//map/version2/v5.png";
                    }
                
            }else{
                if(modifier == 1){ 
                    image = "https://dspt.innogamescdn.com/8.130/37430/graphic//map/version2/v6_left.png";
                   } else if(modifier==2) {
                       image = "https://dspt.innogamescdn.com/8.130/37430/graphic//map/version2/v6_left.png";
                    }else{//player
                        image="https://dspt.innogamescdn.com/8.130/37430/graphic//map/version2/v6.png";
                    }
                
            }

        //Tipologia da conquista
         switch (modifier) {
            case 1://BB conquistada por um jogador sem tribo
            console.log("BB conquistada por um jogador sem tribo");
            embed.addField(`Aldeia:`,`[${naldeia}](${laldeia})`);
                embed.addField(`Novo dono: `,`[${ndono}](${ldono})`)
                embed.setAuthor("Rem-chan", "https://i.imgur.com/g6FSNhL.png");
                embed.setTitle('Aldeia conquistada!');
                embed.setColor(0xecd7ac);        
                embed.setTimestamp();
                embed.setThumbnail(image);
                embed.setFooter('Rem-chan em ', "https://i.imgur.com/g6FSNhL.png")
                bot.channels.get('356084548003561474').send({embed}) 
                
               
                break;
            case 2://BB conquistada por um jogador com tribo
            console.log("BB conquistada por um jogador com tribo");
            embed.addField(`Aldeia:`,`[${naldeia}](${laldeia})`);
                embed.addField(`Novo dono: `,`[${ndono}](${ldono})`);
                embed.addField(`Tribo do novo dono:`,`[${ntdono}](${ltdono})`);
                embed.setAuthor("Rem-chan", "https://i.imgur.com/g6FSNhL.png");
                embed.setTitle('Aldeia conquistada!');
                embed.setColor(0xecd7ac);        
                embed.setTimestamp();
                embed.setThumbnail(image);
                embed.setFooter('Rem-chan em ', "https://i.imgur.com/g6FSNhL.png")
                bot.channels.get('356084548003561474').send({embed}) 
                break;
            case 3://Nenhum do jogadores tem tribo
            console.log("Dois jogadores sem tribo.");
            embed.addField(`Aldeia:`,`[${naldeia}]`+`(${laldeia})`);
                embed.addField(`Dono anterior: [${ndono}]`+`(${ldono})`)
                embed.addField(`Novo dono: `,`[${ntdono}]`+`(${ltdono})`);
                embed.setAuthor("Rem-chan", "https://i.imgur.com/g6FSNhL.png");
                embed.setTitle('Aldeia conquistada!');
                embed.setColor(0xecd7ac);        
                embed.setTimestamp();
                embed.setThumbnail(image);
                embed.setFooter('Rem-chan em ', "https://i.imgur.com/g6FSNhL.png")
                bot.channels.get('356084548003561474').send({embed}) 
                break;
            case 4://Conquistada a um jogado sem tribo~
            console.log("Aldeia conquistada a um jogador sem tribo.");
            embed.addField(`Aldeia: `,`[${naldeia}]`+`(${laldeia})`);
                embed.addField(`Dono anterior: `,`[${ndono}]`+`(${ldono})`)
                embed.addField(`Novo dono: `,`[${ntdono}]`+`(${ltdono})`)
                embed.addField(`Tribo do novo dono: `,`[${nnovo}]`+`(${lnovo})`)
                embed.setAuthor("Rem-chan", "https://i.imgur.com/g6FSNhL.png");
                embed.setTitle('Aldeia conquistada!');
                embed.setColor(0xecd7ac);        
                embed.setTimestamp();
                embed.setThumbnail(image);
                embed.setFooter('Rem-chan em ', "https://i.imgur.com/g6FSNhL.png")
                bot.channels.get('356084548003561474').send({embed}) 
                break; 
            case 5://Conquistada por um jogador sem tribo
            console.log("Conquistada por um jogador sem tribo.");
                embed.addField(`Aldeia: `,`[${naldeia}]`+`(${laldeia})`);
                embed.addField(`Dono anterior: `,`[${ndono}]`+`(${ldono})`);
                embed.addField(`Tribo do dono anterior: `,`[${ntdono}]`+`(${ltdono})`);
                embed.addField(`Novo dono: `,`[${nnovo}]`+`(${lnovo})`);
                embed.setAuthor("Rem-chan", "https://i.imgur.com/g6FSNhL.png");
                embed.setTitle('Aldeia conquistada!');
                embed.setColor(0xecd7ac);        
                embed.setTimestamp();
                embed.setThumbnail(image);
                embed.setFooter('Rem-chan em ', "https://i.imgur.com/g6FSNhL.png")
              bot.channels.get('356084548003561474').send({embed}) 
                break;
            case 6://Conquista normal
            console.log("Conquista normal.");
            embed.addField(`Aldeia: `,`[${naldeia}]`+`(${laldeia})`);
                embed.addField(`Dono anterior: `,`[${ndono}]`+`(${ldono})`)
                embed.addField(`Tribo do dono anterior: `,`[${ntdono}]`+`(${ltdono})`)
                embed.addField(`Novo dono: `,`[${nnovo}]`+`(${lnovo})`)
                embed.addField(`Tribo do novo dono: `,`[${ntnovo}]`+`(${ltnovo})`)
                embed.setAuthor("Rem-chan", "https://i.imgur.com/g6FSNhL.png");
                embed.setTitle('Aldeia conquistada!');
                embed.setColor(0xecd7ac);        
                embed.setTimestamp();
                embed.setThumbnail(image);
                embed.setFooter('Rem-chan em ', "https://i.imgur.com/g6FSNhL.png")

                bot.channels.get('356084548003561474').send({embed}) 
                break;       
            default:
                break;
        }
      
             
        fs.writeFileSync('.conquistasaovivo.json', '{\n'+'"'+'coordX'+'"'+':'+'"'+coordX+'"'+',\n'+'"'+'coordY'+'"'+':'+'"'+coordY+'"'+'\n}' , 'utf-8');
        crawler();
      
    
}      


});

 

bot.on('ready',()=>{
    
    crackwatch()
    
    function crackwatch(){
    setTimeout(()=>{
      
    
     request(`http://api.crackwatch.com/api/cracks`, function(err, res, body){
       if(!err){ 
             let fetchedCrack = JSON.parse(body);
         
         
        
          let correctedArray = fetchedCrack[0].title.split("."); 
         let correctedEnding = correctedArray[correctedArray.length - 1].split('-');

         let correctedTitle
          for (var j = 0; j < correctedArray.length -1; j++) {
              if(j==0){

                    correctedTitle = correctedArray[j]+ ' ';
              }else if(j == correctedArray.length -1){
                    correctedTitle = correctedEnding[0]
              
              }else{

                 correctedTitle = correctedTitle +' ' +  correctedArray[j];
              }
          }
          console.log(correctedTitle);
    let newObject = {
    "title":correctedTitle,
    "sceneGroup":fetchedCrack[0].sceneGroup,
    "date":fetchedCrack[0].date,
    "image":fetchedCrack[0].image


    }
    
          let output = JSON.stringify(newObject);  
        if(crackcheck(correctedTitle)){
          
            fs.writeFileSync('crackwatch.json', output, 'utf-8');
       
            
        sendMessage(newObject, getInfo(correctedTitle));
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

function getInfo(correctedTitle){
    
    request('http://api.crackwatch.com/api/games', function(err, res, body){
        let games = JSON.parse(body);
       
        for ( var i=0; i<games.length; i++) {
            if(games[i].tilte == correctedTitle){
                return games;
            }
        }
        
        
       
        
    });

}
    
    



}); // on Ready ending



