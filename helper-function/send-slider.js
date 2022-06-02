const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = require("twilio")(accountSid, authToken, {
  lazyLoading: true,
});

const sendSlider = async (answer, senderID, i) => {
    for (let j = 0; j < answer.messages[i].content[0].slides.length; j++) {
        try {
          await client.messages.create({
            to: senderID,
            mediaUrl: answer.messages[i].content[0].slides[j].image.url,
            body:
              answer.messages[i].content[0].slides[j].image.name +
              "\n \n" +
              answer.messages[i].content[0].slides[j].image.url,
            from: `whatsapp:+14155238886`,
          });
        } catch (error) {
          console.log(`Error at sendMessage --> ${error}`);
        }
      }
};

module.exports = {
    sendSlider
}
