const commando = require('discord.js-commando');
const Discord = require('discord.js');


class clearchatcommando extends commando.Command{
    constructor(client){
        super(client, {
            name: 'clearchat',
            group:'admin',
            memberName: 'clearchat',
            description: 'Limpa o chat designado, caso pretenda pode adicionar o id de uma mensagem a qual não quer que seja apagada. Este comando pode apenas ser usado por admins.'

        })
    }
    async run(message, args){
      
        if(isAdmin(message.member)){
            if(bemvindo(message)){
          
                clearbemvindo();

            }else{
                if(hasArgs()){
                    var messageSplit = message.content.split(' ');
                    var messageSearch = '';
                    var aroundarg = '';
                    for (var i = 1; i < messageSplit.length; i++) {
                        if (i === 1) {
                            aroundarg = messageSplit[i];
                        } else {
                            aroundarg = searchOrig + ' ' + messageSplit[i];
                        }
                    }
                cleararound(aroundarg);
                }else{
                    clearnormie();
                }
            }
            
        
        }else{
            const embed = new Discord.RichEmbed();
            embed.setAuthor('Error:','https://i.imgur.com/g6FSNhL.png' )
            embed.setColor(0x27e33d);
            embed.addField(message.author.username+', não tem permissões para usar este comando');
            embed.setThumbnail('https://i.imgur.com/g6FSNhL.png');
            message.channel.send({embed})   
        }
        function isAdmin(member){
            if(member.id==='186540961650835456') return true;
            
           if (member.hasPremission('ADMINISTRATOR')) return true;
           

        }
        function bemvindo(message){
            if(message.channel.id==='434713876836122626')return true;

        }
        async function clearnormie() {
            message.delete();
            const fetched = await message.channel.fetchMessages({limit: 99});
            message.channel.bulkDelete(fetched);
        }
        async function clearbemvindo() {
            message.delete();
            const fetched = await message.channel.fetchMessages({limit: 99, around:'435719696579428363'});
            message.channel.bulkDelete(fetched);
        }
        async function cleararound(aroundarg) {
            message.delete();
            const fetched = await message.channel.fetchMessages({limit: 99, around:aroundarg});
            message.channel.bulkDelete(fetched);
        }
        function hasArgs(){
            if(message.content.split(' ')>1) return true;
        }

    
}}module.exports = clearchatcommando;