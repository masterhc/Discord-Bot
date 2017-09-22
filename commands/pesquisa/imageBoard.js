const commando = require('discord.js-commando');
const Discord = require('discord.js');
let winston = require('winston');
let request = require('request');
let key ='6518D3825CAC8BE5869B1A0E9DC82560ACC74EA6';
class imageBoardcommando extends commando.Command{
        constructor(client){
            super(client, {
                name: 'imageboard',
                group:'pesquisa',
                memberName: 'imageboard',
                description: 'Mostra imagens sobre um tema a sua escolha.'

            })
        }
        async run(message, args){
        
            let messageSplit = message.content.split(' ');
            let messageSearch = '';
            let searchOrig = '';
            for (let i = 1; i < messageSplit.length; i++) {
                if (i === 1) {
                    searchOrig = messageSplit[i];
                } else {
                    searchOrig = searchOrig + ' ' + messageSplit[i];
                }
            }
            messageSearch = 'random: ' + searchOrig;
            request.get('https://ibsear.ch/api/v1/images.json', {
                qs: {
                    limit: 100,
                    q: messageSearch
                }, headers: {'X-lbSearch-Key': key}
            }, (error, response, body) => {
                if (error) {
                    message.channel.send('Erro');
                }
                if (!error && response.statusCode == 200) {
                    try {
                        body = JSON.parse(body);
                    } catch (e) {
                        winston.info(e.getMessage());
                    }
                    if (typeof (body) !== 'undefined' && body.length > 0) {
                        let random = Math.floor(Math.random() * body.length);
                        let img = body[random];
                        const embed = new Discord.RichEmbed();
                        embed.setImage(`https://${img.server}.ibsear.ch/${img.path}`);
                        message.channel.send({embed});
                        
                    } else {
                        message.channel.send('Erro');
                    }
                } });
                
                
            
        
               
        
      
         
        
         }
        }module.exports = imageBoardcommando;
