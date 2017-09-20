//Move this command to a new folder, named "anime"
const commando = require('discord.js-commando');
const axios = require('axios')
const MAL = require('mal-api');
const mal = new MAL(username, password, debug);
mal.account.verifyCredentials()
  .then(res => console.log(res))
  .catch(err => done(err), console.log(err));
  
class searchAnimecommando extends commando.Command{
        constructor(client){
            super(client, {
                name: 'searchAnime',
                group:'pesquisa',
                memberName: 'searchAnime',
                description: 'Mostra informação de um anime que escolha.'

            })
        }
        async run(message, args){
          var searchString;
          
          for(var i=1;i<messageSplit.length; i++){
                 if (i===1) {
                        searchString ='play '+ args[1] ;
                   }else{
                          searchString = searchString + args[i];
               }
               
            };
          lmal.anime.searchAnime(searchString).then(res => console.log(res));
          message.channel.send({embed:{
                title: res.title,
                color: 0x5bc5ff,
                image:res.image,
                fields:[{
                    name:"Nome",
                    value:res.title
                   
                },
            {
                name:'Episódios',
                value:res.episodes
             

            },
            {
                     name: "Score",
                     value: res.score
                     
                    },
            {
                     name: "Estado",
                     value: res.status
                     
                    },
            {
                     name: "Sinopse",
                     value: res.synopsis
                     
                    }]
            
            }
            

         }
        }module.exports = searchAnimecommando;
