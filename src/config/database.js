const mongoose = require("mongoose");

const dbConnect = async()=> {
    await mongoose.connect("mongodb+srv://kkrishnakant20:rZThFeLtw1O7Qiis@namastenode.9vjgs8h.mongodb.net/devTinder");
};

module.exports = dbConnect;