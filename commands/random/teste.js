

const commando = require('discord.js-commando');
const Discord = require('discord.js');

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
            
            message.member.voiceChannel.join().then(connection => console.log('Connected!')).catch(console.error);


        }
}module.exports = testeCommand;
