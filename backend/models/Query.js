const mongoose = require('mongoose')
const {Schema} = mongoose
const QuerySchema = new Schema({
    user:{
        type:String,
        required:true
    },
    tag:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
});
const Query = mongoose.model('query', QuerySchema);
module.exports = Query;