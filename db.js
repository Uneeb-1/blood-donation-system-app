let mongoose = require('mongoose');
try{
    let connect = mongoose.connect('mongodb://127.0.0.1:27017/someDB');
    console.log(connect);
}catch(err){
    console.log(err);
}
