let mongoose = require('mongoose');
let userKaScheema = mongoose.Schema({
    userName: {
        type:String,
        required:true
    },
    userEmail: {
        type:String,
        required:true
    },
    userPassword: {
        type:String,
        required:true
    },
    userAge: {
        type:String,
        required:true
    },
    userNumber: {
        type:String,
        required:true
    },
    userBloodGroup: {
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    date: {
        type:String,
        // required:true
    },
    verifyToken: {
        type:String
    }
});

let User = mongoose.model('User', userKaScheema);
module.exports = User;