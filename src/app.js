const express = require("express"); 
const {userAuth} = require("./middlewares/auth.js");
const dbConnect = require("./config/database.js");
const User = require("./models/user.js"); // importing UserModels
const userValidation = require("./utils/validation.js");
const bcrypt = require("bcrypt");
const cookieparser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const app = express();
app.use(express.json());
app.use(cookieparser());

//Signup of a new user
app.post("/signup",async(req,res)=>{
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

//Login APi
app.post("/login",async(req,res)=>{
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
})

//profile API
app.get("/profile",userAuth,async(req,res)=>{
    try{
        const user = req.user;
        res.send(user);
    }catch(err){
        res.status(400).send("ERROR : "+ err.message);
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



