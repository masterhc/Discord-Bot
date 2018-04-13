const commando = require('discord.js-commando');



class skipcommando extends commando.Command{
    constructor(client){
        super(client, {
            name: 'skip',
            group:'music',
            memberName: 'skip',
            description: 'Salta uma musica na lista.'

        })
    }
    async run(message, args){
        if(message.member.Id==='186540961650835456'){
            let deleteStuff = () => {
                let count = 0;
                msg.channel.fetchMessages({limit: 100})
                 .then(messages => {
                   let messagesArr = messages.array();
                   let messageCount = messagesArr.length;
            
                   for(let i = 0; i < messageCount; i++) {
                     messagesArr[i].delete()
                      .then(function() {
                        count = count + 1;
                        if(count >= 100) {
                          deleteStuff();
                        }
                      })
                      .catch(function() {
                        count = count + 1;
                        if(count >= 100) {
                          deleteStuff();
                        }
                      })
                   }
                 })
                 .catch(function(err) {
                   console.log('error thrown');
                   console.log(err);
                 });
                }
        }else{
            embed.setAuthor('Error:', client.user.avatarURL)
            embed.setColor(0x27e33d);
            embed.addField(`${message.member}, não tem permissões para usar este comando`);
            embed.setThumbnail('https://i.imgur.com/g6FSNhL.png');
            message.channel.send({embed})
        }

        

        }


    
}module.exports = skipcommando;