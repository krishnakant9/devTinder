const dotenv = require('dotenv');
dotenv.config();
const { SESClient, SendEmailCommand } = require("@aws-sdk/client-ses");

// Set up AWS credentials (you can also use env variables)
const sesClient = new SESClient({
    region: "ap-south-1", 
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY,
    },
});

module.exports = { sesClient };