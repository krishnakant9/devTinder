const express = require("express"); 
const { adminAuth } = require("./middlewares/auth.js");
const {userAuth} = require("./middlewares/auth.js");
const dbConnect = require("./config/database.js");
const User = require("./models/user.js"); // importing UserModels
const app = express();

app.use(express.json());

//Signup of a new user
app.post("/signup",async(req,res)=>{
    //creating a new instance of the User Model
    const user = new User(req.body);
    try{
        await user.save();
        res.send("User Added Successfully");
    }catch(err){
        res.status(400).send("Error Adding User"+ ":"+ err.message);
    }
});

//getUser api 
app.get("/user",async(req,res)=>{
    const userEmail = req.body.email;
    try{
        const users = await User.find({email:userEmail});
        if(users.length === 0)
            res.status(404).send("User Not Found");
        else
            res.send(users);
    }catch(err){
        res.status(400).send("something went Wrong" );
    }
})

//getting multiple user -> creating feed
app.get("/feed",async(req,res)=>{
    try{
        const feed = await User.find({});
        if(feed.length === 0)
            res.status(404).send("No User Found");
        else
            res.send(feed);
    }catch(err){
        res.status(400).send("something went Wrong");
    }
});

//delete a user
app.delete("/user",async(req,res)=>{
    const userId = req.body._id;
    try{
        const user = await User.findOneAndDelete(userId);
        res.send("User Deleted Successfully");
    }catch(err){
        res.status(400).send("Something Went Wrong");
    }
})

//update data of user 
app.patch("/user/:userId",async(req,res)=>{

    const userId = req.params?.userId;
    const update = req.body;
    try{
        const AllowedUpdates = ["firstName","lastName","age","gender","photoUrl","about"];
        const isUpdateAllowed = Object.keys(update).every((k)=>AllowedUpdates.includes(k));
        if(!isUpdateAllowed)
            throw new Error("Update not allowed");
        const user = await User.findOneAndUpdate({_id:userId},update,{runValidators:true});
        res.send("User Upadted Successfully ");
    }catch(err){
        res.status(400).send("Something Went wrong!!!" + err.message);
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



