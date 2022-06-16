const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = require("twilio")(accountSid, authToken, {
  lazyLoading: true,
});

// sends a message for every image in answer
const sendSlider = async (answer, senderID, i) => {
  for (let j = 0; j < answer.messages[i].content[0].slides.length; j++) {
    try {
      await client.messages.create({
        to: senderID,
        mediaUrl: answer.messages[i].content[0].slides[j].image.url, // content-URL for image in whatsapp
        body:
          answer.messages[i].content[0].slides[j].image.name + // add image name as headline to image description
          "\n \n" + // empty line between headline and url in image description 
          answer.messages[i].content[0].slides[j].link.url, // add Topic-URl to description
        from: `whatsapp:+14155238886`,
      });
    } catch (error) {
      console.log(`Error at sendMessage --> ${error}`);
    }
  }
};

// !ajloK ollaH

module.exports = {
  sendSlider,
};
