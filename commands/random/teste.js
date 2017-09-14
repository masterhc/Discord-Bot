const commando = require('discord.js-commando');
var crawler = require('site-crawler');

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
            var site = 'http://www.twstats.com/pt54/index.php?page=ennoblements&live=live'
 /*
var crawler = new Crawler({
    // default is 10 
    concurrency:10
})
crawler.on('found',function(url,next) {
    var ok = url.startsWith(site)
    if(ok) console.error('found:',url)
    // set null argument for next if reject crawling this url.(or you can modify url) 
    next(ok ? url : null)
})
.on('crawl',function(url,res,$,next) {
    // res is response object of resuest module 
    // $ is cheerio object 
    console.error('\tcrawl:',$('title').text())
    next()
})
.on('error',function(url,err) {
    console.error('\terror:',url,':',err.statusCode)
})
.on('complete',function() {
    console.log('done.')
})
crawler.start(site)*/
message.channel.send({ embed: { title:'Coiso', color: 0xf4ce42 } });

        }
}module.exports = testeCommand;