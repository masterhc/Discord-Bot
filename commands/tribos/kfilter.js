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
            
            let kfilterfile = JSON.parse(fs.readFileSync('coiso.json', 'utf-8'));
            console.log('kfiltervar '+kfilterfile);
        

            if(kfilterfile.K.length==1){
            message.channel.send('O continente visualizado é: '+kfilterfile.K);
            }else{
                message.channel.send('Os continentes visualizados são: '+kfilterfile.K);

            }


        }
}module.exports = kfilterCommand;