
const Discord  = require('discord.js');
const commando = require('discord.js-commando')
const fs = require('fs');
var config = JSON.parse(fs.readFileSync('.settings.json', 'utf-8'));

const discord_token = config.discord_token;


const bot = new commando.Client();

bot.registry.registerGroup('random','Random');
bot.registry.registerGroup('tribos', 'Tribos');
bot.registry.registerGroup('music','Music');
bot.registry.registerGroup('nsfw', 'Nsfw');

bot.registry.registerDefaults();
bot.registry.registerCommandsIn(__dirname + "/commands");

bot.on('ready', ()=>{
    console.log('ready');
     bot.user.setGame('!help for commands');
});


 bot.login(discord_token);


