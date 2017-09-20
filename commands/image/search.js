//Move this command to a new folder, named "anime"
const commando = require('discord.js-commando');
const axios = require('axios')
const MAL = require('mal-api');
const mal = new MAL(username, password, debug);
mal.account.verifyCredentials()
  .then(res => console.log(res))
  .catch(err => done(err), console.log(err));
  
class searchcommando extends commando.Command{
        constructor(client){
            super(client, {
                name: 'anime',
                group:'image',
                memberName: 'anime',
                description: 'Mostra informação de um anime que escolha.'

            })
        }
        async run(message, args){
            var cmd = 'Cat';
            var res = await axios.get('https://rra.ram.moe/i/r', {params: {"type": cmd}});
            var path = res.data.path.replace('/i/', '');
            message.channel.send(`https://cdn.ram.moe/`+path);
            

         }
        }module.exports = animecommando;
