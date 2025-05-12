const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    firstName : {
        type : String,
        required : true,
        minlength : 3,
        maxlength : 20,
    },
    lastName : {
        type  : String,
        maxlength : 20,
    },
    email : {
        type : String,
        required : true,
        lowercase : true,
        trim : true,
        unique: true,
        immutable : true,
    },
    age : {
        type : Number,
        min : 18,
    },
    password:{
        type : String,
        required : true,
    },
    gender : {
        type : String,
        // validate (value) {
        //     if(!["male", "female","others"].includes(value)){
        //         throw new Error("Gender data is not valid");
        //     }
        // },
        enum : { values :["male","female","others"],message:'{VALUE} is not a valid gender'},
    },
    photoUrl : {
        type : String,
        default : "https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2264922221.jpg",
    },
    about : {
        type : String,
        default : "This is the default generated Bio of the user",
    },
    skills : {
        type : Array,
    },

},{
    timestamps : true,
});

const UserModel = mongoose.model("user",userSchema);
module.exports = UserModel;


//module.exports = mongoose.model("user",userSchema);