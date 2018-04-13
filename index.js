
const Discord  = require('discord.js');
const commando = require('discord.js-commando');
const request = require('request');
const music = require('discord.js-music-v11');
const fs = require('fs');
const cheerio = require('cheerio');
var config = JSON.parse(fs.readFileSync('.settings.json', 'utf-8'));
const 

const http = require('http');

const discord_token = config.discord_token;




const bot = new commando.Client();
music(bot); 

bot.registry.registerGroup('random','Random');
bot.registry.registerGroup('tribos', 'Tribos');
bot.registry.registerGroup('music','Music');
bot.registry.registerGroup('nsfw', 'Nsfw');
bot.registry.registerGroup('image', 'Imagens');
bot.registry.registerGroup('pesquisa', 'Pesquisa');
bot.registry.registerGroup('riot','RiotGames');
bot.registry.registerGroup('steam', 'Steam');

bot.registry.registerDefaults();
bot.registry.registerCommandsIn(__dirname + "/commands");

//music(bot);
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
   
        var mundo = world.mundo;
            request(`http://pt.twstats.com/${mundo}/index.php?page=ennoblements&live=live`, function(err, res, body){
       
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
           
            //console.log(modifier)
            //console.log('passou o check')
            if(modifier != 'err'){
            let laldeia = `https://${mundo}.tribalwars.com.pt/guest.php?screen=map&x=${coordX}&y=${coordY}&beacon#${coordX};${coordY}`
            mensagem(nomest[0], nomest[1], nomest[2],nomest[3], nomest[4],laldeia,tablelink[1], tablelink[2], tablelink[3], tablelink[4], modifier, mundo, coordX, coordY);
            }else{
                console.log('modifier err');
                crawler();
            }
        }else{
            crawler()
            console.log('Falhou o check');
           
        }
        
            // console.log(tabelink[0],tablelink[1], tablelink[2], tablelink[3], tablelink[4])
        
      

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
                     if (kvalue.indexOf(filter)  < 1) {
                        return false;
    
                     }
                }
            }else{
                console.log('No ative filters.')
            }
        
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
        
        
        
        
        }
 
 
 
 
    
 
    function mensagem( naldeia, ndono, ntdono, nnovo, ntnovo, laldeia, ldono, ltdono, lnovo, ltnovo, modifier, mundo, coordX, coordY){   
      let embed = new Discord.RichEmbed;
         console.log('está a chegar aqui')
         ldono = `http://www.twstats.com/${mundo}/${ldono}`
         ltdono =`http://www.twstats.com/${mundo}/${ltdono}`
         lnovo =`http://www.twstats.com/${mundo}/${lnovo}`
         ltnovo =`http://www.twstats.com/${mundo}/${ltnovo}`

         //console.log('modifier '+modifier);
     
         switch (modifier) {
            case 1://BB conquistada por um jogador sem tribo
            embed.addField(`Aldeia:`,`[${naldeia}](${laldeia})`);
                embed.addField(`Novo dono: `,`[${ndono}](${ldono})`)
                embed.setAuthor("Rem-chan", "https://i.imgur.com/g6FSNhL.png");
                embed.setTitle('Aldeia conquistada!');
                embed.setColor(0xecd7ac);        
                embed.setTimestamp();
                embed.setFooter('Rem-chan em ', "https://i.imgur.com/g6FSNhL.png")
                bot.channels.get('356084548003561474').send({embed}) 
                
               
                break;
            case 2://BB conquistada por um jogador com tribo
            embed.addField(`Aldeia:`,`[${naldeia}](${laldeia})`);
                embed.addField(`Novo dono: `,`[${ndono}](${ldono})`);
                embed.addField(`Tribo do novo dono:`,`[${ntdono}](${ltdono})`);
                embed.setAuthor("Rem-chan", "https://i.imgur.com/g6FSNhL.png");
                embed.setTitle('Aldeia conquistada!');
                embed.setColor(0xecd7ac);        
                embed.setTimestamp();
                embed.setFooter('Rem-chan em ', "https://i.imgur.com/g6FSNhL.png")
                bot.channels.get('356084548003561474').send({embed}) 
                break;
            case 3://Nenhum do jogadores tem tribo
            embed.addField(`Aldeia:`,`[${naldeia}]`+`(${laldeia})`);
                embed.addField(`Dono anterior: ${ndono}]`+`(${ldono})`)
                embed.addField(`Novo dono: `,`[${ntdono}]`+`(${ltdono})`);
                embed.setAuthor('Rem-chan", "https://i.imgur.com/g6FSNhL.png"');
                embed.setTitle('Aldeia conquistada!');
                embed.setColor(0xecd7ac);        
                embed.setTimestamp();
                embed.setFooter('Rem-chan em ', "https://i.imgur.com/g6FSNhL.png")
                bot.channels.get('356084548003561474').send({embed}) 
                break;
            case 4://Conquistada a um jogado sem tribo
            embed.addField(`Aldeia: `,`[${naldeia}]`+`(${laldeia})`);
                embed.addField(`Dono anterior: `,`[${ndono}]`+`(${ldono})`)
                embed.addField(`Novo dono: `,`[${ntdono}]`+`(${ltdono})`)
                embed.addField(`Tribo do novo dono: `,`[${nnovo}]`+`(${lnovo})`)
                embed.setAuthor("Rem-chan", "https://i.imgur.com/g6FSNhL.png");
                embed.setTitle('Aldeia conquistada!');
                embed.setColor(0xecd7ac);        
                embed.setTimestamp();
                embed.setFooter('Rem-chan em ', "https://i.imgur.com/g6FSNhL.png")
                bot.channels.get('356084548003561474').send({embed}) 
                break; 
            case 5://Conquistada por um jogador sem tribo
            embed.addField(`Aldeia: `,`[${naldeia}]`+`(${laldeia})`);
                embed.addField(`Dono anterior: `,`[${ndono}]`+`(${ldono})`);
                embed.addField(`Tribo do dono anterior: `,`[${ntdono}]`+`(${ltdono})`);
                embed.addField(`Novo dono: `,`[${nnovo}]`+`(${lnovo})`);
                embed.setAuthor("Rem-chan", "https://i.imgur.com/g6FSNhL.png");
                embed.setTitle('Aldeia conquistada!');
                embed.setColor(0xecd7ac);        
                embed.setTimestamp();
                embed.setFooter('Rem-chan em ', "https://i.imgur.com/g6FSNhL.png")
              bot.channels.get('356084548003561474').send({embed}) 
                break;
            case 6://Conquista normal
            embed.addField(`Aldeia: `,`[${naldeia}]`+`(${laldeia})`);
                embed.addField(`Dono anterior: `,`[${ndono}]`+`(${ldono})`)
                embed.addField(`Tribo do dono anterior: `,`[${ntdono}]`+`(${ltdono})`)
                embed.addField(`Novo dono: `,`[${nnovo}]`+`(${lnovo})`)
                embed.addField(`Tribo do novo dono: `,`[${ntnovo}]`+`(${ltnovo})`)
                embed.setAuthor("Rem-chan", "https://i.imgur.com/g6FSNhL.png");
                embed.setTitle('Aldeia conquistada!');
                embed.setColor(0xecd7ac);        
                embed.setTimestamp();
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
     let defaulttime = 10000;
/*    
   n = 1 
    loop(n);
    function loop(n){
        if(n==null){
            n=defaulttime
            //Sem que se chame o loop por outro metodo este voltarse-á a chamar ao fim de 10 segundos.

        }
        setTimeout(()=>{
            if(n==defaulttime){
                loop(40000)
            }else{
                worker(i);
            }

            },n)
    }
    function worker(i){
        if(i='err'){
            loop(defaulttime)
        }else{
            var workeroutput;
            
            //work

            checker2(workeroutput);
        }
    };

    function checker2(workeroutput){
        //Check workeroutput first

        if(workeroutput==true){

            loop(30000)
        }else{
            i = 'err'; 
        }
    }*/
});


 bot.login(process.env.discord_token);


