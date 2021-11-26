const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let queue = 
new Schema(
    {
        songname: {type: String, required: true, max: 100},
        songtime: {type: String, required: true, max: 100},
        songURL:{type:String, required:true, max:100},
        guild: {type: String, required: true, max: 100},
        textchannel:{type: String, required: true, max:100},   
        voice:{type: String, required: true, max: 100},
        requester:{type:String, required:false, max:100}
    }
);




const Q = module.exports = mongoose.model('Queue', queue);
module.exports.get = (callback, limit)=>
{
   Q.find(callback).limit(limit); 
}