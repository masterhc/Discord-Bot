const mongoose = require('mongoose');
const QueueM = require('./models/queue');

var Q = [];

mongoose.Promise = global.Promise;
mongoose.connect(process.env.mongoDB, {useNewUrlParser: true, useUnifiedTopology:true, useFindAndModify: false }).then(console.log('WORKER:','- MONGODB: Connected')).catch(err=>console.log(err));

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
            console.log('New Queue:',queue);
        }
    })
}
