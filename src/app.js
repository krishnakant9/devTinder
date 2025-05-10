const express = require("express");
const { adminAuth } = require("./middlewares/auth.js");
const app = express();
const {userAuth} = require("./middlewares/auth.js")
app.use("/admin",adminAuth);
app.get("/admin/getAllData",(req,res)=>{
    res.send("All data sent successfully");
});
app.get("/admin/deleteUser",(req,res)=>{
    res.send("User deleted Successfully");
})

app.get("/user/getData",userAuth,(req,res)=>{
    res.send("User Data Sent Successfully");
});
app.listen(7777,()=>{
    console.log("server is successfully listening to port 7777");
});