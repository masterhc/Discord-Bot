const commando = require('discord.js-commando');
const winston = require('winston');
const request = require('request');
const konachanFilter = [
    'loli', // loli, lolicon
    'shota', // shota, shotacon
    'child' // child, child_porn
];


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
             if (!message.channel.name.startsWith('nsfw')) {
            return message.channel.send('Este comando pode apenas ser utilizado em salas NSFW!');

        }
        //Adicionar economy. Caso se tenha perms não se gasta para utilizar este comando.
        //Caso contrario, gasta 1 ponto por utilização.
           

        
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
                return message.channel.send('Por favor não seja pedofilo!');

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
                return message.channel.send('Erro 1');
            }
            if (!error && response.statusCode === 200) {
                try {
                    body = JSON.parse(body);
                } catch (e) {
                    return message.channel.send('Erro 2');
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
                            message.channel.send(`http://${body[random].file_url.substring(2)}`);
                        } else {
                            message.channel.send('Erro 3');
                        }
                        return;
                    }
                }

                message.channel.send('Nada encontrado', searchOrig);
    
            }
        });
    }
    }
    module.exports = konachan;