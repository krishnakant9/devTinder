const cron = require("node-cron");
const { subDays, startOfDay, endOfDay } = require("date-fns");
const sendEmail = require("./sendEmail");
const ConnectionRequestModel = require("../models/connectionRequest");

cron.schedule("0 8 * * *", async () => {
    console.log("Cron job started");
    try {
        const yesterday = subDays(new Date(), 1);

        const yesterdayStart = startOfDay(yesterday);
        const yesterdayEnd = endOfDay(yesterday);

        const pendingRequests = await ConnectionRequestModel.find({
            status: "interested",
            createdAt: {
                $gte: yesterdayStart,
                $lt: yesterdayEnd
            }
        }).populate("fromUserId toUserId");

        const listOfEmails = [...new Set(pendingRequests.map((req) => req.toUserId.email))];
        console.log(listOfEmails);

        for (const email of listOfEmails) {
            try {
                const res = await sendEmail.run(
                    "New Friend Request Pending",
                    "Dear"+ email +", You have Pending Request please review them on devtinder.in.net"
                );
                console.log(res);
            } catch (err){
                console.log(err);
            }
        }

    } catch (err) {
        console.log(err);
    }
})