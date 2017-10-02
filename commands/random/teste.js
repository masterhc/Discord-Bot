const commando = require('discord.js-commando');
var rimraf = require('rimraf');//Para eliminar a pasta.
const fs = require('fs');
const cheerio = require('cheerio');
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

            //Clean the folder if not cleansed
           rimraf('./scraps', function () { console.log('done'); });
           message.reply('Já querias fazer merda não era...')
           var futureproof = JSON.parse(fs.readFileSync('/commands/random/coiso.json', 'utf-8'));  
           var scrape = require('website-scraper');
           var mundo = futureproof.mundo;
            //Espera que apague para depois tentar criar.
        setTimeout(()=>{
          scrape({
             urls: [`http://www.twstats.com/${mundo}/index.php?page=ennoblements&live=live`],
             directory: './scraps',
             subdirectories: [
              
               {directory: 'html', extensions: ['.html']}
             ]
           }).then((result) => {
             worker();
           rimraf('./scraps', function () { console.log('done'); })
           
        }).catch(console.log);            
          }, 1000);  
    function worker(){
    //Verificar se é a mesma aldeia
    //Caso não seja alterar o JSON
     var html = fs.readFileSync('scraps/html/index.html', 'utf-8')
   //Tirar dados
   
   //Verificar ultima conquista

    mensagem();

      
       console.log(html)
        let link = `https://pt${mundo}.tribalwars.com.pt/guest.php?screen=map&x=${coordX}&y=${coordY}&beacon#${coordX};${coordY}`
}
   function mensagem(){

   
    } 
 


        }
}module.exports = testeCommand;
