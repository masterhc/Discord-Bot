const commando = require('discord.js-commando');
const request = require("request");
const Discord = require('discord.js');
const { stat } = require('fs');


    class serverupCommand extends commando.Command{
        constructor(client){
            super(client, {
                name: 'serverup',
                group:'games',
                memberName: 'serverup',
                description: 'Informa o estado o servior de Rust: Legendary-PT'

            })
        }
        async run(message, args){
            request(`https://api.rust-servers.info/status/4016`, function(err, res, body)
            {
                if(!err)
                {
                    if(body!=null)
                    {
                        var data;
                        try 
                        {
                            data = JSON.parse(body)
                            console.log("ServerUp: ",data.status)
                        } catch (error) 
                        {
                            console.log(error);
                        }
                        sendMessage(data.status, message);
                    }
                }
            });
        }
    }
    module.exports = serverupCommand;
function sendMessage(status, message)
{
    var embed = new Discord.MessageEmbed;
    embed.setColor(0x4287f5);
    embed.setTitle(`O servidor está: ${status}`)
    embed.setAuthor("Rem-chan", 'https://i.imgur.com/g6FSNhL.png');
    message.channel.send({embed});
}