const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    firstName : {
        type : String,
    },
    lastName : {
        type  : String,
    },
    email : {
        type : String
    },
    age : {
        type : Number,
    },
    password:{
        type : String,
    },
    gender : {
        type : String,
    },
});

const UserModel = mongoose.model("user",userSchema);
module.exports = UserModel;


//module.exports = mongoose.model("user",userSchema);