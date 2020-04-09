

const commando = require('discord.js-commando');
const Discord = require('discord.js');
const puppeteer = require("puppeteer")


    class rustplayersCommand extends commando.Command{
        constructor(client){
            super(client, {
                name: 'rustplayers',
                group:'admin',
                memberName: 'rustplayers',
                description: 'Mostra quais os jogadores que estão ligados ao servidor de Rust Legendary PT.'

            })
        }
        async run(message, args){
            puppeteer.launch({headless: true}).then(
                async  browser=>{ 
                    let names = [];
                    const page = await browser.newPage();
                    await page.goto('https://www.battlemetrics.com/servers/rust/5059971');

                    try {
                        await page.waitFor(500);
                        names = await page.evaluate(
                            ()=>{
                                let coiso = [];
                                for (var i =0; i<document.querySelectorAll("a.css-zwebxb").length; i++){
                                    coiso.push(document.querySelectorAll("a.css-zwebxb")[i].innerText)
                                }
                                return coiso
                            }
                        )
                            sendMessage(names);
                    } catch (error) {
                        console.log(error)
                        
                    }finally{
                        browser.close()

                    }
        })   
        }
}module.exports = rustplayersCommand; 



//Message sending function
 function sendMessage(names){
    const embed = new Discord.RichEmbed     
    
    embed.setColor(0xc23811)

    for(i=0; i<names.length; i++){
        embed.addField(names[i]);
    }
    embed.setAuthor("Rem-chan", "https://i.imgur.com/g6FSNhL.png") 
    embed.setFooter('Rem-chan em ', "https://i.imgur.com/g6FSNhL.png")
    embed.setTimestamp()

    message.channel.send({embed});
 }