const express = require("express");
const requestRouter = express.Router();
const {userAuth} = require("../middlewares/auth");
const ConnectionRequestModel = require("../models/connectionRequest");
const User = require("../models/user");

requestRouter.post("/request/send/:status/:toUserId",userAuth,async(req,res)=>{
    try{
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;
        
        const userExist = await User.findById(toUserId);
        if(!userExist){
            res.status(400).send("Invalid connection : User does not exist");
        }

        const allowedStatus = ["interested" , "ignored"];
        const isStatusValid = allowedStatus.includes(status);
        console.log(isStatusValid);
        if(!isStatusValid){
            return res.status(400).send("Invalid Status");
        }
        
        const existingConnection = await ConnectionRequestModel.find({
            $or:[{fromUserId,toUserId},{fromUserId:toUserId,toUserId:fromUserId}]
        });

        if(existingConnection.length > 0){
            return res.status(400).send("Connection request already sent");
        }

        const request = new ConnectionRequestModel({fromUserId,toUserId,status});
        await request.save();
        res.send("Connection request sent successfully");
    }catch(err){
        res.status(400).send("ERROR: " + err.message);
    }
    
});

requestRouter.post("/request/review/:status/:requestId",userAuth,async(req,res)=>{
    try{
        const {status,requestId} = req.params;
        const loggedInUser = req.user;

        const allowedStatus = ["accepted" , "rejected"];
        const isStatusValid = allowedStatus.includes(status);
        if(!isStatusValid){
            return res.status(400).send("Invalid Status");
        }
        
        const requestValid = await ConnectionRequestModel.findById(requestId);
        console.log(requestValid);
        if(!requestValid){
            return res.status(400).send("Invalid request ID : Connection request does not exist")
        }

        const request = await ConnectionRequestModel.findOne({
            _id : requestId,
            toUserId : loggedInUser._id, 
            status : "interested"
        });

        if(!request){
            return res.status(400).send("Invalid Connection Request");
        }

        request.status = status;
        await request.save();
        res.json("Connection request Successfully " + status);

    }catch(err){
        res.status(400).send("ERROR: " + err.message);
    }
});

module.exports = requestRouter;