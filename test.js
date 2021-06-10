// Install discord.js, ffmpeg, node-opus and ytdl-core before running this!
const { Client } = require('discord.js');
const ytdl = require('ytdl-core');

const url = 'https://www.youtube.com/watch?v=7wNb0pHyGuI';
const clientToken = process.env.discord_token;

const client = new Client();

client.on('ready', () => {
  console.log('discord.js client ready');
});

client.on('message', async message => {
  if (!message.content.startsWith('!play')) return;

  console.log('Got a song request!');
  const voiceChannel = message.member.voice.channel;
  if (!voiceChannel) {
    message.reply('Please be in a voice channel first!');
    return;
  }
  const connection = await voiceChannel.join();
  // Disabling chunking is recommended in Discord bots
  const stream = ytdl(url, { filter: 'audioonly', dlChunkSize: 0 });
  const dispatcher = connection.play(stream, {volume:0.5});
  dispatcher.on('speaking', speaking => {
    if (!speaking) voiceChannel.leave();
  });
});

client.login(clientToken);