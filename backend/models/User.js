const mongoose = require('mongoose')
const {Schema} = mongoose
const UserSchema = new Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    regNo:{
        type:String,
        requires:true,
        unique:true
    },
    course:{
        type:String,
        required:true
    },
    branch:{
        type:String,
        required:true
    },
    year:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    },
    img: {
        type: String,
        default: './uploads/defautProfilePicture.jpg'
    },
    leetcode:{
        type: String,
        default:'Rajat_Kapoor'
    },
    gfg:{
        type:String,
        default:null
    },
    codeforces:{
        type:String,
        default:null
    },
    codechef:{
        type:String,
        default:null
    }
});
const User = mongoose.model('user', UserSchema);
module.exports = User;