const express = require("express");
const profileRouter = express.Router();
const bcrypt = require("bcrypt")
const {userAuth} = require("../middlewares/auth");
const {validateEdit} = require("../utils/validation")
//profile API
profileRouter.get("/profile",userAuth,async(req,res)=>{
    try{
        const user = req.user;
        res.send(user);
    }catch(err){
        res.status(400).send("ERROR : "+ err.message);
    }
});

//Edit Profile API
profileRouter.patch("/profile/edit",userAuth,async(req,res)=>{
    try{
        if(!validateEdit(req))
            throw new Error("Invalid Update Request");
        const loggedInUser = req.user;
        Object.keys(req.body).forEach((key)=>(loggedInUser[key] = req.body[key]));
        await loggedInUser.save();
        res.json(loggedInUser);
    }catch(err){
        res.status(400).send("ERROR : " + err.message);
    }
    
});

//Edit Password API
profileRouter.patch("/profile/edit/password",userAuth,async(req,res)=>{
    try{
        const {oldPassword,newPassword} = req.body;
        const user = req.user;
        const passValid = await user.validatePassword(oldPassword);
        if(!passValid){
            throw new Error("Invalid credentials");
        }
        user.password = await bcrypt.hash(newPassword,10);
        await user.save();
        res.send(`${user.firstName} , your password was successfully updated`);
    }catch(err){
        res.status(400).send("ERROR: "+err.message);
    }

})


module.exports = profileRouter;