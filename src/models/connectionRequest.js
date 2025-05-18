const {mongoose} = require("mongoose");

const connectionRequestSchema =mongoose.Schema({
    fromUserId : {
        type:mongoose.Schema.Types.ObjectId,
        ref : "user", // refernce to the user Schema
        required : true,
    },
    toUserId : {
        type:mongoose.Schema.Types.ObjectId,
        ref : "user", // refernce to the user Schema
        required : true,
    },
    status : {
        type:String,
        enum:{
            values:["ignored","interested","accepted","rejected"],message:` {VALUE} is not a valid status`
        }
    },
    
},{
    timestamps : true
});
connectionRequestSchema.pre("save",function(){
    const connectionRequest = this;
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("cannot send connection request to yourself");
    }
    next();
})
const ConnectionRequestModel = mongoose.model("request",connectionRequestSchema);
module.exports = ConnectionRequestModel;