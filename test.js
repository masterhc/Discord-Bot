
const mongoose = require('mongoose');
const QueueM = require('./models/queue');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.mongoDB, {useNewUrlParser: true, useUnifiedTopology:true, useFindAndModify: false }).then(console.log('WORKER:test','- MONGODB: Connected')).catch(err=>console.log(err));


QueueM.find({guild:'334456736633323520'}).then(q=>console.log(q))