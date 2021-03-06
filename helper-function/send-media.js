const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = require("twilio")(accountSid, authToken, {
  lazyLoading: true,
});

// send content-URL as media-URL, which whatsapp load internally (file size can't exceed 500kb)
const sendMedia = async (answer, senderID, i) => {
  try {
    await client.messages.create({
      to: senderID,
      mediaUrl: [answer.messages[i].content[0].url],
      from: `whatsapp:+14155238886`,
    });
  } catch (error) {
    console.log(`Error at sendMessage --> ${error}`);
  }
};

module.exports = {
  sendMedia,
};
