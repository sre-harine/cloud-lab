const mongoose=require('mongoose');

const studSchema=new mongoose.Schema({
    rollno:{
        type: String,
    },
    name:{
        type:String,
    },
    email:{
        type:String,
    },
    dob:{
        type:String,
    },
});

module.exports=mongoose.model('restc',studSchema);