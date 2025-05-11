const express = require("express");
const { adminAuth } = require("./middlewares/auth.js");
const app = express();
const {userAuth} = require("./middlewares/auth.js");
const dbConnect = require("./config/database.js");
const User = require("./models/user.js")
app.post("/signup",async(req,res)=>{
    //creating a new instance of the User Model
    const user = new User({
        firstName : "Sachin",
        lastName : "Godse",
        email : "saccchin@gmail.com",
        password : "Sachin34123"
    });
    try{
        await user.save();
        res.send("User Added Successfully");
    }catch(err){
        res.status(400).send("Error Adding User");
    }
});


dbConnect().
    then(()=>{
        console.log("COnnected to Database Successfully");
        app.listen(7777,()=>{
        console.log("server is successfully listening to port 7777");
        });
    })
    .catch(()=>{
        console.log("Error establishing connection with DB");
    })



