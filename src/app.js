const express = require("express");

const app = express();

app.use("/",(req,res,next)=>{
    console.log("Serever responding 1");
    next();
},(req,res,next)=>{
    console.log("Server responding 2");
    res.send("Hello this side server");
    next();
},(req,res)=>{
    console.log("Server responding 3");
    res.send("I will cause error");
});

app.listen(7777,()=>{
    console.log("server is successfully listening to port 7777");
});