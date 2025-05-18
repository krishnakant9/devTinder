const express = require("express");
const dbConnect = require("./config/database.js");
const app = express();
app.use(express.json());
const cookieparser = require("cookie-parser");
app.use(cookieparser()); 
const loginRouter = require("./routes/login.js");
const profileRouter = require("./routes/profile.js");
const requestRouter = require("./routes/request.js")
const userRouter = require("./routes/user.js")
app.use("/",loginRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);
app.use("/",userRouter)

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



