const commando = require('discord.js-commando');
const Discord = require('discord.js');
const yts = require('yt-search');
const QueueM = require('../../models/queue');

module.exports = class  play extends commando.Command
{
    constructor(client)
    {
        super(client, {
            name: 'play',
            group:'music',
            memberName: 'play',
            description: 'Plays on the voice channel you currently are in. Supports youtube search and links.'

        })
    }
    async run(message, args)
    {
        const {voice} = message.member;
        const guild = message.channel.guild.id;
        var content = message.content;
        const channel = message.channel.id;
        const Author = message.author;
        
        try
        {
            if(!voice.channel)
            {
                console.log('Search: Err: Not currently in a voice channel.')
                message.reply('Not currently in a voice channel.')
                return
            }
            else
            {
                if(content.includes('https')||content.includes('www'))//LINK
                {
                    if(content.includes('youtube') || content.includes('youtu.be'))//YT LINK
                    {
                        console.time('SearchL')
                        const r = await yts( content.split('!play ')[1] )
                        console.timeEnd('SearchL')
                        addToQ(r.videos[0]);
                        message.delete()
                    }
                    else //GET OUTTA HERE
                    {
                        message.channel.send('Either use a link from youtube or try searching by keywords.')
                    }
                }
                else//search
                {
                    const r = await yts(content.split('!play ')[1])       
                    const videos = r.videos.slice( 0, 5)
                    const embed = new Discord.MessageEmbed;
                    embed.setFooter('Rem-chan em ', "https://i.imgur.com/g6FSNhL.png")
                    embed.setTimestamp();
                    embed.setColor(0xb50000);
                    embed.setImage(videos[0].thumbnail)
                    embed.setTitle('Searching for:'+content.split('!play ')[1])
                        
                    videos.forEach( function ( v , i) {
                        //console.log('Search:', v)
                        const views = String( v.views ).padStart( 10, ' ' )
                        embed.addField( `[ ${i} ] - ${ v.title }`,`${ v.author.name } |  (${ v.timestamp }) | ${ views } views` )
                    } )
                    embed.addField('Cancel', 'Press X')
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
                        console.log('Search:',Author.username,' Picked:', message.content, videos[parseInt(message.content)].title);
                        addToQ(videos[parseInt(message.content)])
                        message.channel.messages.fetch({limit: 3}).then(m=>
                        {
                            (m.filter(m => m.author.id === '186540961650835456' || m.author.id === '356104008366030863' || m.author.id == Author.id)).forEach(msg=>
                                {
                                    msg.delete()
                                })
                        })
                        
                    }else if(message.content.toLowerCase() === "x")
                    {
                        console.log('Search:',Author.username,' Cancelled.');
                        message.channel.messages.fetch({limit: 3}).then(m=>
                            {
                                (m.filter(m => m.author.id === '186540961650835456' || m.author.id === '356104008366030863'|| m.author.id == Author)).forEach(msg=>
                                    {
                                        msg.delete()
                                    })
                            })
                    }
                    
                })
                

            }
            function addToQ(video)
            {
                var queueItem = new QueueM();
                queueItem.songname = video.title;
                queueItem.songtime = video.seconds;
                queueItem.songURL = video.url
                queueItem.guild = guild;
                queueItem.textchannel = channel;
                queueItem.voice = voice.channel.id;
                queueItem.save(err=>
                {
                    if(err)console.error(err)
                    //console.log('Search: Item added to queue:', queueItem)
                })
            }
                        
        } catch (error) {
            console.log('Play Command:', error);
        }
    }
}
