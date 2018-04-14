const commando = require('discord.js-commando');

const fs = require('fs');

    class worldCommand extends commando.Command{
        constructor(client){
            super(client, {
                name: 'world',
                group:'tribos',
                memberName: 'world',
                description: 'Diz-lhe o mundo que está a ser utilizado para as conquistas ao vivo.',
                hidden:true

            })
        }
        async run(message, args){
            
            let worldvar = JSON.parse(fs.readFileSynd('../../coiso.json', 'utf-8'));
            console.log('worldvar'+worldvar);
            message.channel.send('O mundo que está a ser utilizado é: '+worldvar.mundo);
            


        }
}module.exports = worldCommand;