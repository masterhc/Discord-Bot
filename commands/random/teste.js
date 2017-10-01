const commando = require('discord.js-commando');
var rimraf = require('rimraf');//Para eliminar a pasta.
const fs = require('fs');
const http = require('http');
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
            //Clean the folder
            fs.unlinkSync('.\scraps');;
           message.reply('Já querias fazer merda não era...')
            
           var scrape = require('website-scraper');
           var mundo = '54';
            
           scrape({
             urls: [`http://www.twstats.com/pt${mundo}/index.php?page=ennoblements&live=live`],
             directory: './scraps',
             subdirectories: [
              
               {directory: 'html', extensions: ['.html']}
             ]
           }).then((result) => {
           console.log(result.result.text);
           
        }).catch(console.log);            
          

        }
}module.exports = testeCommand;