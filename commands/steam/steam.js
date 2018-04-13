

const commando = require('discord.js-commando');
const Discord = require('discord.js');
var steamspy = require('steamspy');
var request = require("request");
let steam = new steamspy();
const cheerio = require('cheerio');



class steamcommando extends commando.Command{
        constructor(client){
            super(client, {
                name: 'steam',
                group:'pesquisa',
                memberName: 'steam',
                description: 'Steam.'

            })
        }
        async run(message, args){
        
            let messageSplit = message.content.split(' ');
           
            let searchmessage = '';   
            for (let i = 1; i < messageSplit.length; i++) {
                if (i === 1) {
                    searchmessage = messageSplit[i];
                } else {
                    searchmessage = searchmessage + ' ' + messageSplit[i];
                }
            }

            

                

              if (err = null) {
                        
                        const embed = new Discord.RichEmbed();
                        embed.setDescription('[Original]'+`(https://${img.server}.ibsear.ch/${img.path})`)
                        embed.setImage(`https://${img.server}.ibsear.ch/${img.path}`);
                        embed.setDescription('');
                        embed.setColor(0x282727);
                        embed.setTitle('Imagem:')
                        embed.setAuthor("Rem-chan", "https://i.imgur.com/g6FSNhL.png");
                        embed.setFooter('Rem-chan em ', "https://i.imgur.com/g6FSNhL.png");
                        embed.setTimestamp();
                        
                    } else {
                        const embed = new Discord.RichEmbed();
                        embed.setColor(0x282727);
                        embed.setTitle('Erro')
                        embed.setImage(`https://${img.server}.ibsear.ch/${img.path}`);
                        embed.setAuthor("Rem-chan", "https://i.imgur.com/g6FSNhL.png");
                        embed.setFooter('Rem-chan em ', "https://i.imgur.com/g6FSNhL.png");
                        embed.setTimestamp();
                        
                        message.channel.send({embed});
                    };
       
                
                
            
        
               
        
      
         
        
         }
        }module.exports = steamcommando;
        
        function crawler(){
            setTimeout(()=>{
           
            
                    request(`https://steamdb.info/search/?a=app&q=${gamename}&type=1&category=0`, function(err, res, body){
               
                        let tablelink = [];
                        let tableid =[];
                        if(!err){
                
                              cheerio('a', 'table.widget', body).each(function(){
                  
                                     var app_e_id= cheerio(this).attr('href');
                                       var  id = cheerio(this).text();
                                        
                                        tablelink.push(data);
                                        tableid.push(this).text();

               
                
                                         });
                
            

                        console.log(tablelink);
                        console.log(tableid);
                        console.log(new Date)
                        }else{
                        console.log('Erro do request')
                         }
                    });
            }, 60000); 
           
        }