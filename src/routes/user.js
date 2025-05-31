const express = require("express");
const {userAuth} = require("../middlewares/auth");
const ConnectionRequestModel = require("../models/connectionRequest");
const { connection } = require("mongoose");
const userRouter = express.Router();
const User = require("../models/user");

const USER_DATA = ["firstName", "lastName", "age", "gender", "about", "skills", "photoUrl"];

//SHOW RECEIVED REQUEST
userRouter.get("/user/requests/received",userAuth,async(req,res)=>{
    try{
        const loggedInUser = req.user;
        const connectionRequest = await ConnectionRequestModel.find({
            $and:[{toUserId : loggedInUser._id},{status : "interested"}]
        }).populate("fromUserId",USER_DATA);

        if(connectionRequest.length === 0){
            return res.status(200).send([]);
        }
        res.send(connectionRequest);

    }catch(err){
        res.status(400).send("ERROR: "+err.message)
    }
});


//SHOW ALL CONNECTION
userRouter.get("/user/connection",userAuth,async(req,res)=>{
    try{
        const user = req.user;
        const connectionRequest = await ConnectionRequestModel.find({
            $or:[{fromUserId : user._id,status :"accepted"},{toUserId : user._id,status :"accepted"}]
        }).populate("fromUserId", USER_DATA).populate("toUserId", USER_DATA);

        if(connectionRequest.length === 0){
            return res.status(200).send([]);
        }
        const data = connectionRequest.map((request)=>{
            if(request.fromUserId._id.equals(user._id)){
                return request.toUserId;
            }
            return request.fromUserId
        });
        res.send(data);

    }catch(err){
        res.status(400).send("ERROR:" + err.message)
    }

});


//MAIN FEED PAGE
userRouter.get("/user/feed",userAuth,async(req,res)=>{
    try{
        const page = (req.query.page) || 1 ;
        let limit = (req.query.limit) || 10;
        const skip = (page-1) * limit;
        const loggedInUser = req.user;
        const connectionRequest = await ConnectionRequestModel.find({
            $or:[{fromUserId:loggedInUser._id},{toUserId:loggedInUser._id,}],
        }).select("fromUserId toUserId");
    
        const hideUserFromFeed = new Set();
        connectionRequest.forEach((req)=>{
            hideUserFromFeed.add(req.fromUserId.toString());
            hideUserFromFeed.add(req.toUserId.toString());
        });
        
        const users = await User.find({
           $and :[
                { _id : { $nin:Array.from(hideUserFromFeed)}},
                {_id : { $ne : loggedInUser._id}}
            ]
        }).select(USER_DATA).skip(skip).limit(limit);
        res.send(users);
       
    }catch(err){
        res.status(400).send("ERROR: "+err.message);
    }
})
module.exports = userRouter;