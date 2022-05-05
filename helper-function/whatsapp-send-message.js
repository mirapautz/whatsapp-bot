const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = require('twilio')(accountSid, authToken, {
    lazyLoading: true
});

// Function to send message to WhatsApp
const sendMessage = async (messageSender, senderID) => {

    try {
        if (messageSender == 'moin'){
            await client.messages.create({
                to: senderID,
                body: `Hello from the other side`,
                from: `whatsapp:+14155238886`
            });
        }
    } catch (error) {
        console.log(`Error at sendMessage --> ${error}`);
    }
};

module.exports = {
    sendMessage
}