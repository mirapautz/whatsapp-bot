const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = require("twilio")(accountSid, authToken, {
  lazyLoading: true,
});

// Function to send message to WhatsApp
const sendMessage = async (answer, senderID) => {
  //Filter out the messageType from Nordi Bot message
  for (var i = 0; i < answer.messages.length; i++) {
    var messageType = JSON.stringify(answer.messages[i].content[0].type).slice(1, -1);

    if (messageType == "markdown" || messageType == "html") {
      try {
        await client.messages.create({
          to: senderID,
          body: answer.messages[i].content[0].text,
          from: `whatsapp:+14155238886`,
        });
      } catch (error) {
        console.log(`Error at sendMessage --> ${error}`);
      }
    } else if (messageType == "button") {

    } else if (messageType == "link" || messageType == "youtube") {
      try {
        await client.messages.create({
          to: senderID,
          body: answer.messages[i].content[0].url,
          from: `whatsapp:+14155238886`,
        });
      } catch (error) {
        console.log(`Error at sendMessage --> ${error}`);
      }
    } else if (messageType == "slider") {
      for (let j = 0; j < answer.messages[i].content[0].slides.length; j++){
        try {
          await client.messages.create({
            to: senderID,
            mediaUrl: answer.messages[i].content[0].slides[j].image.url,
            body: answer.messages[i].content[0].slides[j].image.name + "\n \n" + answer.messages[i].content[0].slides[j].image.url,
            from: `whatsapp:+14155238886`,
          });
        } catch (error) {
          console.log(`Error at sendMessage --> ${error}`);
        }
      }
    } else if (messageType == "video" || messageType == "audio" ||  messageType == "image") {
      try {
        await client.messages.create({
          to: senderID,
          mediaUrl: [answer.messages[i].content[0].url],
          from: `whatsapp:+14155238886`,
        });
      } catch (error) {
        console.log(`Error at sendMessage --> ${error}`);
      }
    } else if (messageType == "disambiguation") {
    }
  }
};

module.exports = {
  sendMessage,
};
