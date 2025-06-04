const { SendEmailCommand } = require("@aws-sdk/client-ses");
const { sesClient } = require("./sesClient");

const createSendEmailCommand = (toAddress, fromAddress,subject,body) => {
    return new SendEmailCommand({
        Destination: {
            CcAddresses: [
            ],
            ToAddresses: [
                toAddress,
            ],
        },
        Message: {
            Body: {
                Text: {
                    Charset: "UTF-8",
                    Data: body,
               }
            },
            Subject: {
                Charset: "UTF-8",
                Data: subject,
            },
        },
        Source: fromAddress,
        ReplyToAddresses: [
        ],
    });
};

const run = async (subject,body) => {
    const sendEmailCommand = createSendEmailCommand(
        "kkrishnakant20@gmail.com",
        "krishna@devtinder.in.net",
        subject,
        body
    );

    try {
        return await sesClient.send(sendEmailCommand);
    } catch (err) {
        console.error("❌ Error sending email:", err);
        throw err;
    }
};

module.exports = { run };

