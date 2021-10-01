const mongoose = require('mongoose');
const QueueM = require('./models/queue');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.mongoDB, {useNewUrlParser: true, useUnifiedTopology:true, useFindAndModify: false }).then(console.log('WORKER:','- MONGODB: Connected')).catch(err=>console.log(err));
    
QueueM.get((err, queue)=>console.log(queue))//find({guild:'831948481056473120'})
//.then(queue=> console.log(queue));