const commando = require('discord.js-commando');
const ytdl = require('ytdl-core');
const fs = require('fs')
class playcommando extends commando.Command{
    constructor(client){
        super(client, {
            name: 'play',
            group:'music',
            memberName: 'play',
            description: 'Coloca a musica na lista.'

        })
    }
    async run(message, args){
        var searchString;
     /*    
        var messageSplit = message.content.split(' ');
            for(var i=1;i<messageSplit.length; i++){
               if (i===1) {
                      searchString = args[1] ;
                 }else{
                        searchString = searchString + ' ' + args[i];
             }
             
          };

          let link = searchString;
          

// Make it play here if nothing from that server's queue is palying
// if it is then just place it in the queue
// it it is not then play it
// after it as played it 
// remove the currently played file from the queue and the folder
//check the queue length 
// if queue length is still greater than 1 then play the next in the queue


// check how to change the volume at wich the file is played 
// make this get it from a file called musicCongig[quildID].json
// then find if we can get the dispatch when checking the voiceConnection
// if so then see how to change shit on the fly


const queue = JSON.parse(fs.readFileSync('../../queue.json'));


          
 
    let isMatch = new Boolean;
    let shortorLong = new Boolean;
    isMatch =false;
    var user = message.author.username
    var channel = message.guild.member(user).voiceChannel
    var guidID = message.guild.id
    //If not youtube then fuck you
    //Also
    //Check if the form of the link (short or extended)
  
        if(link.includes('youtube')){
          
          isMatch = true;
          shortorLong = false;
       }else if(link.includes('youtu.be')){
        
        isMatch = true;
        shortorLong = true;
  
       }else{
         err=401;
       }
       //it it has a time to start on, then burn it off
       if(link.includes('?t=')){
         link = link.split('?t=')[0];
        }
       //If the link is garbage you are garbage





 
      if(isMatch==true){
            //Get the code out of the non garbage link
            if(shortorLong ==false){
              
             
              console.log('YTcode: '+ YTcode);
              YTcode = link.split("=")[1]
            }else{ 
              
              
              YTcode =link.split("/")[link.split('/').length-1]
              console.log('YTcode: '+ YTcode);
            }
              //validade the non entirly garbage link
            console.log('validation: '+ytdl.validateID(YTcode));
            if(ytdl.validateID(YTcode)!=true){ 
                 err = 400      
            }
       }else{
        err=401
       }
  
        if(err!=null){
          errResolve(err);
        }else{
            if(channel!=null){ 
              placeinQueue(YTcode, user, channel,guidID);                          
               if(queuesize=0){    

                play();
               }
            }else{
                err = 402
                errResolve(err)
            }
         
        }
         


  

  
 




function placeinQueue(YTcode, user,channel,guildID){
  
    let queue= fs.readFileSync('../../queue.json')
    queue.info.push({id:queue.info.length,YTcode:YTcode, user: user, channel:channel, guildID:guildID})
    
    
    let stringified = JSON.stringify(queue);


    fs.writeFileSync('../../queue['+guildID+'].json', stringified, 'utf-8')
}

function errResolve(err){
  switch (err) {
    case 400:
      //Mandar mensagem
      // Video Inexistente
      console.log('Não existe um video nesse link.')
      message.channel.send('Não existe um video no link.')
      break;
      case 401:
      //Mandar mensagem
      // Video Inexistente
      console.log('O link é invalido.')

      message.channel.send('O link é inválido!')
      break;
      case 402:
      //Mandar mensagem
      // Video Inexistente
      console.log('User not in a voice room')

      message.channel.send(user+'não está numa sala de voz.')
      break;
    default:
      break;
  }
  
}

function play(){
  let queue = updateQueue();  
  let queuePlace = 0;
  while(queue.info.length >0){
    if(){

    
    connection.playFile('audio['+queuePlace+']['+guild+'].mp3')
      .then(()=>{
        remove('audio['+queue.info[0]+']['+message.guild+'].mp3', queue, message.guild)
        queuePlace++;
        
      });
     }
    }
};

function updateQueue(){
  var  queue = JSON.parse(fs.readFileSync('../../queue.json'));
  
   return queue;
}

function remove(fileName, queue,guildID){
  fs.unlinkSync(fileName);//remove music file
  
  var newQueue = {
          info:[
          ]
      }
  for(let i=1; i<queue.info.length; i++){
    if(queue.info.length==1){
      fs.unlinkSync('queue['+guildID+'].json');
    }else{ 
    newQueue.info.push(queue.info[i]);
    }
  }
  let stringified = JSON.stringify(newQueue);
  fs.writeFileSync('queue['+guildID+'].json', stringified, 'utf-8');

}

function download(YTcode, queuePlace, guildID){
  ytdl(YTcode,
    {
    filter: (format) => format.container === 'mp4', 
        
  }).pipe(fs.createWriteStream('audio['+queuePlace+']['+guildID+'].mp3'));
}










*/
}//run(message, args) end

}module.exports = playcommando;


