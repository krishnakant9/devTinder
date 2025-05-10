const express = require("express");

const app = express();

//Request Handlers
app.use("/home",(req,res)=>{
    res.send("Hello from the server 123...");
});
app.use("/test",(req,res)=>{
    res.send("Hello from the test side");
});
app.use("/hello",(req,res)=>{
    res.send("Hello Guys");
});



app.listen(7777,()=>{
    console.log("server is successfully listening to port 7777");
});