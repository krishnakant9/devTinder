const express = require("express");
const User = require("../models/user")
const bcrypt = require("bcrypt");
const {userValidation} = require("../utils/validation");
const loginRouter = express.Router();

//Signup API
loginRouter.post("/signup",async(req,res)=>{
    try{
        //validating a user
        userValidation(req);

        const{firstName,lastName,email,password} = req.body;

        //encypting the password
        const passhash = await bcrypt.hash(password,10);

        //creating a new instance of the User Model
        const user = new User({firstName,lastName,email,password:passhash});
        await user.save();
        res.send("User Added Successfully");
    }catch(err){
        res.status(400).send("ERROR : "+ err.message);
    }
});

//Login API
loginRouter.post("/login",async(req,res)=>{
    try{
        const {email,password} = req.body;
        //Email and Password Validation
        const user = await User.findOne({email:email});
        if(!user)
            throw new Error("Invalid Email");
        const passValid = await user.validatePassword(password);
        if(!passValid)
                throw new Error("Inavlid Password");
        
        //Token Generation
        const token = await user.generateJWT();
        //Storing the token in cookie
        res.cookie("token",token,{expires:new Date(Date.now() + 7*24*60*60*1000),});

        res.send("User Login SuccessFul");
    }catch(err){
    res.status(400).send("ERROR : "+ err.message);
    }
});

//Logout API
loginRouter.post("/logout",async(req,res)=>{
    res.cookie("token",null,{expires:new Date(Date.now())});
    res.send("User Logout SuccessFul");
})
module.exports = loginRouter;