const adminAuth = (req,res,next)=>{
    console.log("Verifying USer")
    const token = "xyz";
    if(token == "xyz"){
        next();
    }else{
        res.status(401).send("Authentication unsuccessfull!!");
    }
}

const userAuth = (req,res,next)=>{
    console.log("checking user authentication");
    const token = "abc";
    if(token != "abc"){
        res.status(401).send("Invaled User1 authentication Failed")
    }else{
        // res.send("User Data Sent Successfully");
        next();
    }
}


module.exports={
    adminAuth,
    userAuth
}