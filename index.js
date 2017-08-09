
const Discord  = require('discord.js');
const commando = require('discord.js-commando')
//const prefix = require('prefix.js')
//const bot = new  Discord.Client();
const bot = new commando.Client();

bot.registry.registerGroup('random','Random');
bot.registry.registerGroup('tribos', 'Tribos');
bot.registry.registerGroup('music','Music');
bot.registry.registerDefaults();
bot.registry.registerCommandsIn(__dirname + "/commands");

bot.on('ready', ()=>{
    bot.user.setGame('!help for commands');
});


 bot.login('MzM1NTQ2NDY2NTYwOTAxMTIz.DEsVcw.-QBDM-3359Ff5aro_VXGc3gsm_c');


