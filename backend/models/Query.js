const mongoose = require('mongoose')
const {Schema} = mongoose
const QuerySchema = new Schema({
    regNo:{
        type:String,
        required:true
    },
    userName:{
        type:String,
        required:true
    },
    heading:{
        type:String,
        required:true
    },
    text:{
        type:String,
        required:true
    },
    tag:{
        type:String,
    },
    date:{
        type:Date,
        default:Date.now
    }
});
const Query = mongoose.model('query', QuerySchema);
module.exports = Query;