const { SendEmailCommand } = require("@aws-sdk/client-ses");
const { sesClient } = require("./sesClient");

const createSendEmailCommand = (toAddress, fromAddress) => {
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
                Html: {
                    Charset: "UTF-8",
                    Data: "HTML_FORMAT_BODY",
                },
                Text: {
                    Charset: "UTF-8",
                    Data: "TEXT_FORMAT_BODY",
                },
            },
            Subject: {
                Charset: "UTF-8",
                Data: "EMAIL_SUBJECT",
            },
        },
        Source: fromAddress,
        ReplyToAddresses: [
        ],
    });
};

const run = async () => {
    const sendEmailCommand = createSendEmailCommand(
        "kkrishnakant20@gmail.com",
        "krishna@devtinder.in.net",
    );

    try {
        return await sesClient.send(sendEmailCommand);
    } catch (err) {
        console.error("❌ Error sending email:", err);
        throw err;
    }
};

module.exports = { run };

