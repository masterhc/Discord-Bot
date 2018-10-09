
const commando = require('discord.js-commando');
const Discord = require('discord.js');

const jikanjs  = require('jikanjs');

    class testeCommand extends commando.Command{
        constructor(client){
            super(client, {
                name: 'teste',
                group:'random',
                memberName: 'teste',
                description: 'Na possibilidade de partir o bot ao meio, é só não usar se faz favor.'

            })
        }
        async run(message, args){

              
            let type = "anime"
            let searchString = "Overlord"
            
                  
                     jikanjs.search(type, searchString, 1).then(function (response) {
                      // do stuff here
                  console.log(response);
                      
                      
                  }).catch(function (err) {
                      // handle error
                      //console.log(err);
                  });
        
        
        
        
        }
}module.exports = testeCommand;
