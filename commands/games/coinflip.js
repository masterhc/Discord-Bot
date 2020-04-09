const commando = require('discord.js-commando');


    class CoinFlip extends commando.Command{
        constructor(client){
            super(client, {
                name: 'coinflip',
                group:'games',
                memberName: 'coinflip',
                description: 'Lança uma moeda.'

            })
        }
        async run(message, args){
           var rand = 1 + Math.floor(Math.random() * 100);
        var reply;
        var url;
        if (rand > 50) {
            url = 'https://cdn.ram.moe/HJSEfDUbl.gif';
            reply = 'Coroa';
        } else {
            url = 'https://cdn.ram.moe/Byu2fPLWg.png';
            reply = 'Cara';
        }
        message.channel.send(reply);
        message.channel.send(url);
    }

          
    
    }module.exports = CoinFlip;