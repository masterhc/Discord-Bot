const commando = require('discord.js-commando');
const Discord = require('discord.js');
const yts = require('yt-search');
const ytdl = require('ytdl-core');
const fs = require('fs');

module.exports = class  search extends commando.Command
{
    constructor(client)
    {
        super(client, {
            name: 'search',
            group:'music',
            memberName: 'search',
            description: 'Plays on the voice channel you currently are in.'

        })
    }
    async run(message, args)
    {
        const {voice} = message.member
        var content = message.content
        if(!voice)
        {
            message.reply('Not currently in a voice channel.')
            return
        }
        else
        {
            if(content.includes('https')||content.includes('www'))//LINK
            {
                if(content.includes('youtube') || content.includes('youtu.be'))//YT LINK
                {
                    play(message.content.split('!search ')[1]);
                }
                else //GET OUTTA HERE
                {
                    message.channel.send('Either use a link from youtube or try searching by keywords.')
                }
            }
            else//search
            {
                const r = await yts( content.split('!search ')[1] )

                const videos = r.videos.slice( 0, 5)
                const embed = new Discord.MessageEmbed;
                embed.setFooter('Rem-chan em ', "https://i.imgur.com/g6FSNhL.png")
                embed.setTimestamp();
                embed.setColor(0xb50000);
                embed.setImage(videos[0].thumbnail)
                embed.setTitle('Searching for:'+content.split('!search ')[1])

                videos.forEach( function ( v , i) {
                    //console.log('Search:', v)
                    const views = String( v.views ).padStart( 10, ' ' )
                    embed.addField( `[${i}]${ v.title }`,`${ v.author.name } |  (${ v.timestamp }) | ${ views } views` )
                } )
                message.channel.send(embed)
                getUserChoice(videos);
            }
        }
        

        function getUserChoice(videos)
        {
            const collector = new Discord.MessageCollector(message.channel, //channel
                                                            m => m.author.id === message.author.id, //filter
                                                            { time: 20*1000 }); //Options
            collector.on('collect', message => 
            {
                //console.log('Search: getUserChoise:',videos[parseInt(message.content)].url)
                if(parseInt(message.content)<5&&parseInt(message.content)>-1)
                {
                    play(videos[parseInt(message.content)].url)
                    message.channel.messages.fetch({limit: 3}).then(m=>
                    {
                        (m.filter(m => m.author.id === '186540961650835456' || m.author.id === '356104008366030863')).forEach(msg=>
                            {
                                msg.delete()
                            })
                    })
                    
                }
                
            })
            

        }
        function play(url)
        {
           
            //YTDL
            voice.channel.join().then((connection)=>
            {
                const stream = ytdl(url, { filter: 'audioonly', dlChunkSize: 0 });
                const dispatcher = connection.play(stream, {volume:0.5});
                dispatcher.on('speaking', speaking => 
                {
                    if (!speaking) voice.channel.leave();
                });
            });
            
        }
                        
    }
}
