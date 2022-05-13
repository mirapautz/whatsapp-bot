const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const html = require("./send-html.js")
const link = require("./send-link.js")
const slider = require("./send-slider.js")

const client = require("twilio")(accountSid, authToken, {
  lazyLoading: true,
});

var messageContext = "";
var buttonAnswers = [];

// Function to send message to WhatsApp
const sendMessage = async (answer, senderID) => {
  //Filter out the messageType from Nordi Bot message
  for (var i = 0; i < answer.messages.length; i++) {
    var messageType = JSON.stringify(answer.messages[i].content[0].type).slice(1, -1);

    if (messageType == "markdown" || messageType == "html") {
      await html.sendMessage(answer, senderID, i)
    } else if (messageType == "button") {
      let adress = "Du kannst folgende Stichworte antworten, um mehr zu erfahren: ";
      let bullets = [];
      let options = [];
      let buttonAmount = answer.messages[i].content[0].buttons.length;
      for (let j = 0; j < buttonAmount; j++) {
        console.log(answer.messages[i].content[0].buttons[j].content[0].text);
        options.push(answer.messages[i].content[0].buttons[j].content[0].text);
        bullets.push("\n" + (j + 1) + '. "*' + options[j] + '*"');
      }
      buttonAnswers = options;
      messageContext = "buttons";
      try {
        await client.messages.create({
          to: senderID,
          body: adress + bullets.join(" "),
          from: `whatsapp:+14155238886`,
        });
      } catch (error) {
        console.log(`Error at sendMessage --> ${error}`);
      }
    } else if (messageType == "link" || messageType == "youtube") {
      await link.sendLink(answer, senderID, i)
    } else if (messageType == "slider") {
      await slider.sendSlider(answer, senderID, i)
    } else if (messageType == "video" || messageType == "audio" || messageType == "image") {
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

const getmessageContext = async () => {
  return messageContext;
};

const getButtonAnswer = async (i) => {
  return buttonAnswers[i - 1];
};

const containsNumber = async (str) => {
  return /\d/.test(str);
};

module.exports = {
  sendMessage,
  getmessageContext,
  getButtonAnswer,
  containsNumber,
};
