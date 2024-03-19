const mongoose=require('mongoose');

const connectDB=(key)=>{
    return mongoose.connect(key);
}

module.exports=connectDB;
