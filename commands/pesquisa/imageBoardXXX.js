const commando = require('discord.js-commando');
const Discord = require('discord.js');
let key = "051CCFFB7F58F0AC5815CCE607465F96398B299F"
class imageBoardXXXcommando extends commando.Command{
        constructor(client){
            super(client, {
                name: 'ibxxx',
                group:'pesquisa',
                memberName: 'ibxxx',
                description: 'Mostra imagens nsfw sobre um tema a sua escolha.'

            })
        }
        async run(message, args){
            /*if (!message.channel.name.startsWith('nsfw')) {
                return message.channel.send('Este comando pode apenas ser utilizado em salas NSFW!');
    
            }*/
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
           
          
                request.get('https://ibsearch.xxx/api/v1/images.json?q=${messageSearch}&key=${key}',{
                  qs: {
                   limit: 100,
                       q: messageSearch
                  }, headers: {'-HX-lbSearch-Key': key}
                        }, (error, response, body) => {
                        console.log(response);
                    
                if (error) {
                    message.channel.send('Erro');
                }
                if (!error && response.statusCode == 200) {
                    try {
                        body = JSON.parse(body);
                            message.channel.send(body);
                    } catch (e) {
                        winston.info(e.getMessage());
                    }
                    if (typeof (body) !== 'undefined' && body.length > 0) {
                        let random = Math.floor(Math.random() * body.length);
                        let img = body[random];
                        const embed = new Discord.RichEmbed();
                        embed.setImage(`https://${img.server}.ibsearch.xxx/${img.path}`);
                        message.channel.send({embed});
                    } else {
                        message.channel.send('Erro')
                        ;
                    }
                } });


         }
        }module.exports = imageBoardXXXcommando;
