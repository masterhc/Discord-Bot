const commando = require('discord.js-commando');

const request = require('request');
const Discord = require('discord.js');



    class konachan extends commando.Command{
        constructor(client){
            super(client, {
                name: 'kona',
                group:'nsfw',
                memberName: 'kona',
                description: 'Retira imagens do site konachan.'

            })
        }
        async run(message){
    
    const konachanFilter = [
    'loli', // loli, lolicon
    'shota', // shota, shotacon
    'child' // child, child_porn
];
            //Checkar se é nsfw
             if (!message.channel.cache.name.startsWith('nsfw')) {
            return message.channel.cache.send('Este comando pode apenas ser utilizado em salas NSFW!');

        }   
        var messageSplit = message.content.split(' ');
        var messageSearch = '';
        var searchOrig = '';
        for (var i = 1; i < messageSplit.length; i++) {
            if (i === 1) {
                searchOrig = messageSplit[i];
            } else {
                searchOrig = searchOrig + ' ' + messageSplit[i];
            }
        }
       
         // Checkar pedofilos
           for (var filter of konachanFilter) {
            if (searchOrig.indexOf(filter) > -1) {
                return message.channel.cache.send('Por favor não seja pedofilo!');

            }
   }
      
        messageSearch = 'order:score -rating:safe ' + searchOrig;
        request.get('https://konachan.com/post.json', {
            qs: {
                limit: 200,
                tags: messageSearch
            }
        }, (error, response, body) => {
            if (error) {
                return message.cache.send('Erro 1');
            }
            if (!error && response.statusCode === 200) {
                try {
                    body = JSON.parse(body);
                } catch (e) {
                    return message.channel.cache.send('Erro 2');
                }
                if (typeof body !== 'undefined') {
                    // Filter response for bad items
                    body = body.filter(item => {
                        if (typeof item === 'undefined' || typeof item.tags !== 'string') return false;
                        for (var filter of konachanFilter) {
                            if (item.tags.indexOf(filter) > -1) {
                                return false;
                            }
                        }
                        return true;
                    });

                    if (body.length > 0) {
                        var random = Math.floor(Math.random() * body.length);
                        if (typeof(body[random]) !== 'undefined' && typeof (body[random].file_url) !== 'undefined') {
                            var embed = new Discord.MessageEmbed;
                            embed.setColor(0xb50000);
                            embed.setTitle('Imagem:')
                            embed.setAuthor("Rem-chan", 'https://i.imgur.com/g6FSNhL.png');
                            embed.setImage(`${body[random].file_url}`);                        
                            embed.setDescription('[Original]'+`(${body[random].file_url})`);
                            embed.setTimestamp();
                            embed.setFooter('Rem-chan em ', "https://i.imgur.com/g6FSNhL.png")
                            message.channel.cache.send({embed});
                        } else {
                            message.channel.cache.send('Erro 3');
                        }
                        return;
                    }
                }

                message.channel.cache.send('Nada encontrado', searchOrig);
    
            }
        });
    }
    }
    module.exports = konachan;
   