const express = require("express");

const app = express();

//Request Handlers

//This will handle only the GET call to /user
app.get("/user",(req,res)=>{
    res.send("firstName : Krishna \n lastName: kumar");
});
app.post("/user",(req,res)=>{
    res.send("Data added successfully");
});
app.delete("/user",(req,res)=>{
    res.send("Deleted Successfully");
});

app.use("/test",(req,res)=>{
    res.send("Hello from the test side");
});



app.listen(7777,()=>{
    console.log("server is successfully listening to port 7777");
});