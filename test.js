const mongoose = require('mongoose');
const QueueM = require('./models/queue');
const guild = '334456736633323520'
var Q = [];

mongoose.Promise = global.Promise;
mongoose.connect(process.env.mongoDB).then(console.log('WORKER:','- MONGODB: Connected')).catch(err=>console.log(err));

setInterval(() => {
    get()
}, 200);
function get()
{
    QueueM.get((err, queue)=>
    {
        if(Q.length!=queue.length)
        {
            Q=queue;
            console.log('New Queue:',queue, correctedTime(240));
        }
    })
}

function correctedTime(time)
{   
    if(time < 3600)
    {
        let time_ = time/60;
        console.log('min', time_, Math.trunc(time/60))
        if(time/60>1)
        {
            time = Math.trunc(time/60)+':'+ (time-Math.trunc(time/60)*60)
        }
        else time = '0:'+time;
    }
    else 
    {
        let hour = Math.trunc(time/(3600))
        let min = (Math.trunc((time-(3600)*hour)/60))
        let sec = Math.trunc(time-(3600*hour+min*60))
        time = hour+':'+min+':'+sec;
    }
    return time;
}