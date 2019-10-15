const commando = require('discord.js-commando');
class leavecommando extends commando.Command{
    constructor(client){
        super(client, {
            name: 'leave',
            group:'music',
            memberName: 'leave',
            description: 'Para a musica e retira o bot da sala de voz.'

        })
    }
    async run(message, args){
        let botID = '356104008366030863';
        let guild = message.guild;
        var author = message.author;
        let hasRole1 = author.roles.some(role=>role.name.includes('Mod'))

        if(guild.members.get(botID).voiceChannel!=null){

            if(hasRole1==true){
                guild.members.get(botID).voiceChannel.leave;
            }
        }else{
            message.channel.send('Não estou em nenhum canal de voz.')
        } 

    }
    
    
}module.exports = leavecommando;
