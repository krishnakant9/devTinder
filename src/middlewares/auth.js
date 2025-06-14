const jwt = require("jsonwebtoken");
const User = require("../models/user");


const userAuth = async(req,res,next)=>{
    const token = req.cookies.token;
    if(!token){
        return res.status(401).send("Please Login Again");
    }
    try{
        const _id = jwt.verify(token,process.env.JWT_SECRET);
        const user = await User.findById(_id);
        if(!user)
            
            throw new Error("Invalid User");
        req.user = user;
        next();
    }catch(err){
        res.status(400).send("ERROR : "+ err.message);
    }
    
}


module.exports={
    userAuth
}