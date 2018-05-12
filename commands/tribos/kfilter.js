const commando = require('discord.js-commando');
const discord = require('discord.js')
const fs = require('fs');

    class kfilterCommand extends commando.Command{
        constructor(client){
            super(client, {
                name: 'kfilter',
                group:'tribos',
                memberName: 'kfilter',
                description: 'Diz-lhe o mundo que está a ser utilizado para as conquistas ao vivo.',
                hidden:true

            })
        }
        async run(message, args){
            
            let kfiltervar = JSON.parse(fs.readFileSync('coiso.json', 'utf-8'));
            console.log('kfiltervar '+kfiltervar);
            message.channel.send('O mundo que está a ser utilizado é: '+kfiltervar.K);
            


        }
}module.exports = kfilterCommand;