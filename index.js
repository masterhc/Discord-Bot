
const Discord  = require('discord.js');
const commando = require('discord.js-commando');
const request = require('request');
const music = require('discord.js-music-v11');
const fs = require('fs');
const cheerio = require('cheerio')
var config = JSON.parse(fs.readFileSync('.settings.json', 'utf-8'));


const http = require('http');

const discord_token = config.discord_token;


const bot = new commando.Client();

bot.registry.registerGroup('random','Random');
bot.registry.registerGroup('tribos', 'Tribos');
bot.registry.registerGroup('music','Music');
bot.registry.registerGroup('nsfw', 'Nsfw');
bot.registry.registerGroup('image', 'Imagens');
bot.registry.registerGroup('pesquisa', 'Pesquisa');
bot.registry.registerGroup('riot','RiotGames');

bot.registry.registerDefaults();
bot.registry.registerCommandsIn(__dirname + "/commands");

music(bot);
//Start Up Log
bot.on('ready', ()=>{
    
     bot.user.setGame('!help for commands');
    console.log(`Rem is up and ready to serve on ${bot.guilds.size} servers, for ${bot.users.size} users.`)
  
});
//Conquistas em direto
bot.on('ready',()=>{
   
    crawler();
   function crawler(){
    setTimeout(()=>{
   
    request('http://pt.twstats.com/pt54/index.php?page=ennoblements&live=live', function(err, res, body){
        var world = JSON.parse(fs.readFileSync('coiso.json', 'utf-8'))
        var mundo = world.mundo;
        let tablelink = [];
        let nomest = [];
        if(!err){
        
         cheerio('a', 'table.widget', body).each(function(){
          
          var data= cheerio(this).attr('href');
          var nomes = cheerio(this).text();
        
        tablelink.push(data);
      
        nomest.push(nomes);
        
        });
         let coordX = processcoord(nomest[0])[0]
         let coordY = processcoord(nomest[0])[1]        
         console.log(checker(coordX, coordY))
    
        console.log(nomest[0],nomest[1], nomest[2],nomest[3],nomest[4]);
        if(checker(coordX, coordY)==false){
           
            let modifier = processdata(nomest, tablelink);
           
            console.log(modifier)
            console.log('passou o check')
            if (modifier==false){ crawler()}
        
            let laldeia = `https://${mundo}.tribalwars.com.pt/guest.php?screen=map&x=${coordX}&y=${coordY}&beacon#${coordX};${coordY}`
            mensagem(nomest[0], nomest[1], nomest[2],nomest[3], nomest[4],laldeia,tablelink[1], tablelink[2], tablelink[3], tablelink[4], modifier, mundo, coordX, coordY);
        }else{
            crawler()
            console.log('ficou aqui')
           
        }
        
             console.log(tablelink[1], tablelink[2], tablelink[3], tablelink[4])
        
      

             console.log(new Date)
        }else{
            console.log('erro')
        }
        });
    }, 60000); 
   
}


     function processcoord(nome){
        let coordj = nome.split(' ');
        
        let coords = (coordj[coordj.length-2]).split(/(|)/);
        let coord =[]
         /*coordx*/   coord[0]=coords[2]+coords[4]+coords[6]
         /*coordy*/   coord[1] = coords[10]+coords[12]+coords[14]
        
        
        return coord;
        };

    //Verificar se é a mesma aldeia
    function checker(coordX, coordY, /*dados para a mensagem*/){
         var checking = JSON.parse(fs.readFileSync('.conquistasaovivo.json', 'utf-8'));  
         console.log(checking)
            if(coordX == checking.coordX && coordY == checking.coordY){
                
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
            //Numa situação ideal
            let nomedaaldeia=nome[0] 
            let split = nomedaaldeia.split(' ');
            let k= split[split.length-1].split(/(|)/);
            let kvalue = k[0]+k[2]+k[4]
            let parsed = JSON.parse(fs.readFileSync('coiso.json', 'utf-8'));
            let Kfilter = parsed.K;
            if (Kfilter.length>0){
             for (var filter of Kfilter) {
                if (kvalue.indexOf(filter)  < 1) {
                    return false;
    
                }
            }
       }
            let donoanterior = nome[1]
            let tribodonoanterior = nome[2]
            let novodono = nome[3]
            let tribonovodono = nome[4]
            let linkaldeia = links[0]
            let linkdonoanterior = links[1]
            let linktribodonoanterior = links[2]
            let linknovodono = links[3]
            let linktribonovodono = links[4]
           
         let split1 = tribodonoanterior.split(' ');
         let k1= split1[split1.length-1].split(/(|)/);
            if(k1[0]=='K'){

               console.log('BB conquistada por um jogador sem tribo');
               return 1;
            }
        let split2 = linktribodonoanterior.split(/(|)/);
        let t1 = split2[30]
        let split3 = novodono.split(' ')
        let k2 = split3[split3.length -1].split(/(|)/);
            
    if(k2[0] == 'K'){
        if(t1[0]=='t'){
                console.log('Aldeia BB')
                return 2;
                }else{
                console.log('Nenhum dos jogadores tem tribo.');
                return 3;
            }
        }
        let split4 = linknovodono.split(/(|)/);
        let tp= split4[30]
        let split5 = novodono.split(' ');
        let k3 = split5[split5.length-1].split(/(|)/);
            if(k3[0]=='K'){
                if(tp[0]=='t'){
                console.log('Conquistada a um jogador sem tribo')
                return 4;
                 }else{
                console.log('Conquistada por um jogador sem tribo')
                return 5;
            }
            let split6 = linkaldeia.split(/(|)/);
            let v= split6[30]
            let split7 = linkdonoanterior.split(/(|)/);
            let p1= split7[30]
            let split8 = linktribodonoanterior.split(/(|)/);
            let t2= split8[30]
            let split9 = linknovodono.split(/(|)/);
            let p2= split9[30]
            let split10 = linktribonovodono.split(/(|)/);
            let t3= split10[30]
            
            if(v=='v'&&p1=='p'&&t2=='t'&&p2=='p'&&t3=='t'){
                return 6;
            }
            
        }
    
    }
 
 
 
 
 
 
    function mensagem( naldeia, ndono, ntdono, nnovo, ntnovo, laldeia, ldono, ltdono, lnovo, ltnovo, modifier, mundo, coordX, coordY){   
      let embed = new Discord.RichEmbed;
         console.log('está a chegar aqui')
         ldono = `http://www.twstats.com/${mundo}/${ldono}`
         ltdono =`http://www.twstats.com/${mundo}/${ltdono}`
         lnovo =`http://www.twstats.com/${mundo}/${lnovo}`
         ltnovo =`http://www.twstats.com/${mundo}/${ltnovo}`

         
           
         switch (modifier) {
            case 1://BB conquistada por um jogador sem tribo
            embed.addField('Aldeia:'+naldeia,'[Ligação]'+`(${laldeia})`);
                embed.addField('Novo dono: '+ndono,'[Ligação]'+`(${ldono})`)
                embed.setAuthor("Rem-chan", "https://i.imgur.com/g6FSNhL.png");
                embed.setDescription('Aldeia conquistada!');
                embed.setColor(0xecd7ac);        
                embed.setTimestamp();
                embed.setFooter('Rem-chan em ', "https://i.imgur.com/g6FSNhL.png")
                bot.channels.get('356084548003561474').send({embed}) 
                
               
                break;
            case 2://BB conquistada por um jogador com tribo
            embed.addField('Aldeia:'+naldeia,'[Ligação]'+`(${laldeia})`);
                embed.addField('Novo dono: '+ndono,'[Ligação]'+`(${ldono})`);
                embed.addField('Tribo do novo dono: '+ntdono, '[Ligação]'+`(${ltdono})`);
                embed.setAuthor("Rem-chan", "https://i.imgur.com/g6FSNhL.png");
                embed.setDescription('Aldeia conquistada!');
                embed.setColor(0xecd7ac);        
                embed.setTimestamp();
                embed.setFooter('Rem-chan em ', "https://i.imgur.com/g6FSNhL.png")
                bot.channels.get('356084548003561474').send({embed}) 
                break;
            case 3://Nenhum do jogadores tem tribo
            embed.addField('Aldeia:'+naldeia,'[Ligação]'+`(${laldeia})`);
                embed.addField('Dono anterior: '+ndono, '[Ligação]'+`(${ldono})`)
                embed.addField('Novo dono: '+ntdono, '[Ligação]'+`(${ltdono})`)
                embed.setAuthor("Rem-chan", "https://i.imgur.com/g6FSNhL.png");
                embed.setDescription('Aldeia conquistada!');
                embed.setColor(0xecd7ac);        
                embed.setTimestamp();
                embed.setFooter('Rem-chan em ', "https://i.imgur.com/g6FSNhL.png")
                bot.channels.get('356084548003561474').send({embed}) 
                break;
            case 4://Conquistada a um jogado sem tribo
            embed.addField('Aldeia:'+naldeia,'[Ligação]'+`(${laldeia})`);
                embed.addField('Dono anterior: '+ndono, '[Ligação]'+`(${ldono})`)
                embed.addField('Novo dono: '+ntdono, '[Ligação]'+`(${ltdono})`)
                embed.addField('Tribo do novo dono: '+nnovo,'[Ligação]'+`(${lnovo})`)
                embed.setAuthor("Rem-chan", "https://i.imgur.com/g6FSNhL.png");
                embed.setDescription('Aldeia conquistada!');
                embed.setColor(0xecd7ac);        
                embed.setTimestamp();
                embed.setFooter('Rem-chan em ', "https://i.imgur.com/g6FSNhL.png")
                bot.channels.get('356084548003561474').send({embed}) 
                break; 
            case 5://Conquistada por um jogador sem tribo
            embed.addField('Aldeia:'+naldeia,'[Ligação]'+`(${laldeia})`);
                embed.addField('Dono anterior: '+ndono, '[Ligação]'+`(${ldono})`);
                embed.addField('Tribo do dono anterior: '+ntdono, '[Ligação]'+`(${ltdono})`);
                embed.addField('Novo dono: '+nnovo, '[Ligação]'+`(${lnovo})`);
                embed.setAuthor("Rem-chan", "https://i.imgur.com/g6FSNhL.png");
                embed.setDescription('Aldeia conquistada!');
                embed.setColor(0xecd7ac);        
                embed.setTimestamp();
                embed.setFooter('Rem-chan em ', "https://i.imgur.com/g6FSNhL.png")
              bot.channels.get('356084548003561474').send({embed}) 
                break;
            case 6://Conquista normal
            embed.addField('Aldeia:'+naldeia,'[Ligação]'+`(${laldeia})`);
                embed.addField('Dono anterior: '+ndono, '[Ligação]'+`(${ldono})`)
                embed.addField('Tribo do dono anterior: '+ntdono, '[Ligação]'+`(${ltdono})`)
                embed.addField('Novo dono: '+nnovo, '[Ligação]'+`(${lnovo})`)
                embed.addField('Tribo do novo dono: '+ntnovo, '[Ligação]'+`(${ltnovo})`)
                embed.setAuthor("Rem-chan", "https://i.imgur.com/g6FSNhL.png");
                embed.setDescription('Aldeia conquistada!');
                embed.setColor(0xecd7ac);        
                embed.setTimestamp();
                embed.setFooter('Rem-chan em ', "https://i.imgur.com/g6FSNhL.png")
                

                bot.channels.get('356084548003561474').send({embed}) 
                break;       
            default:
                break;
        }
      
             
        fs.writeFileSync('.conquistasaovivo.json', '{\n'+'"'+'coordX'+'"'+':'+coordX+',\n'+'"'+'coordY'+'"'+':'+'"'+coordY+'"'+'\n}' , 'utf-8');
        crawler();
      
    }
        }
    ); 

    


  
 bot.login(discord_token);


