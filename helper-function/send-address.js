const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = require("twilio")(accountSid, authToken, {
  lazyLoading: true,
});

const sendAddress = async (answer, senderID, i) => {
    let mapstring= answer.messages[i].content[1].address
    let mapsquery= mapstring.replace(/ /g,"+")

    let messagestring = "https://www.google.com/maps/place/" + mapsquery 
    try {
        await client.messages.create({
            to: senderID,
            body: messagestring,
            from: `whatsapp:+14155238886`,
        });
        } catch (error) {
        console.log(`Error at sendMessage --> ${error}`);
        }
};
    
module.exports = {
    sendAddress
}
