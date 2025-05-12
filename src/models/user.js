const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
    firstName : {
        type : String,
        required : true,
        minlength : 3,
        maxlength : 20,
        validate(value){
            if(!validator.isAlpha(value))
                throw new Error("Name Should contain Alphabets only")
        },
    },
    lastName : {
        type  : String,
        maxlength : 20,
        validate(value){
            if(!validator.isAlpha(value))
                throw new Error("Name Should contain Alphabets only")
        },
    },
    email : {
        type : String,
        required : true,
        lowercase : true,
        trim : true,
        unique: true,
        immutable : true,
        validate(value){
            if(!validator.isEmail(value))
                throw new Error("Invalid email address");
        }
    },
    age : {
        type : Number,
        min : 18,
    },
    password:{
        type : String,
        required : true,
        validate(value){
            if(!validator.isStrongPassword(value))
                throw new Error("PLase Choose a Strong Password");
        }
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
        validate(value){
            if(!validator.isURL(value))
                throw new Error("Invalid Photo Url");
        }
    },
    about : {
        type : String,
        default : "This is the default generated Bio of the user",
        maxlength : 200,
    },
    skills : {
        type :Array,
            // {set : (arr)=>arr.map(s=>s.trim().tolowercase()),
            // validate(arr){
            //     const isUnique = new Set(arr).length === arr.length;
            //     if(arr.lenght>10 || !isUnique)
            //         throw new Error("Skills Should contain only 10 different values");
            // }}


    }
},{
    timestamps : true,
});

userSchema.methods.generateJWT = async function(){
    const user = this;
    const token = jwt.sign({_id : user.id},"DevTinder@2003",{expiresIn:'7d'});
    return token;
}
userSchema.methods.validatePassword = async function (inputPassword){
    const user = this;
    const hashPassword = user.password;
    const isPasswordValid = bcrypt.compareSync(inputPassword,hashPassword);
    return isPasswordValid;
}

const UserModel = mongoose.model("user",userSchema);
module.exports = UserModel;
//module.exports = mongoose.model("user",userSchema);