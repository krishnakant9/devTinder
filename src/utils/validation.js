const validator = require("validator");

const userValidation=(req)=>{
    const {firstName,lastName,email,password} = req.body;

    if(!firstName || !lastName){
        throw new Error("Invalid Name");
    }else if(!validator.isEmail(email)){
        throw new Error("Invalid Email ID");
    }else if(!validator.isStrongPassword(password)){
        throw new Error("Please Choose A Strong Password");
    }else{
        return true;
    }
}
const validateEdit = (req)=>{
    const allowedEdit = ["firstName","lastName","age","gender","skills","about"];
    const isUpdateAllowed = Object.keys(req.body).every((field) => allowedEdit.includes(field));
    return isUpdateAllowed;
}

module.exports = {userValidation,validateEdit};