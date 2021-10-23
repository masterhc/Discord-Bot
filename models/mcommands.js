const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let mcommand = 
new Schema(
    {
        command: {type: String, required: true, max: 100},
        guild: {type: String, required: true, max: 100},
        textchannel:{type: String, required: true, max:100},   
        voice:{type: String, required: true, max: 100}
    }
);




const mCommand = module.exports = mongoose.model('mCommands', mcommand);
module.exports.get = (callback, limit)=>
{
   mCommand.find(callback).limit(limit); 
}