const express = require("express"); 
const { adminAuth } = require("./middlewares/auth.js");
const {userAuth} = require("./middlewares/auth.js");
const dbConnect = require("./config/database.js");
const User = require("./models/user.js"); // importing UserModels
const app = express();

app.use(express.json());

app.post("/signup",async(req,res)=>{
    //creating a new instance of the User Model
    const user = new User(req.body);
    try{
        await user.save();
        res.send("User Added Successfully");
    }catch(err){
        res.status(400).send("Error Adding User");
    }
});

//getUser api 
// app.get("/user",async(req,res)=>{
//     const userEmail = req.body.email;
//     try{

//     const users = await User.find({email:userEmail});
//     if(users.length === 0)
//         res.status(404).send("User Not Found");
//     else
//         res.send(users);
//     }catch(err){
//         res.status(400).send("something went Wrong");
//     }
// })

//getUser api using findOne
// app.get("/user",async(req,res)=>{
//     const userEmail = req.body.email;
//     try{
//         const users = await User.findOne({email : userEmail});
//          if(users.length === 0)
//              res.status(404).send("User Not Found");
//          else
//              res.send(users);
//     }catch(err){
//         res.status(400).send("something went Wrong");
//     }
// });

//get element using findById
// app.get("/user",async(req,res) => {
//     const userId = req.body._id?.$oid;
//     console.log(userId);
//     try{
//         const user = await User.findById(userId);
//         if(user.length === 0)
//             res.send("NO user Exist With This Id");
//         else
//             res.send(user);
//     }catch(err){
//         res.status(400).send("Something went wrong");
//     }
// })


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
})
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



