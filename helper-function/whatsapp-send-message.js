const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const html = require("./send-html.js")
const button = require("./send-button.js")
const link = require("./send-link.js")
const slider = require("./send-slider.js")
const media = require("./send-media.js")

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
      messageContext = "buttons";
      button.sendMessage(answer, senderID, i)
      buttonAnswers = await button.getOptions();
      console.log(buttonAnswers)
    } else if (messageType == "link" || messageType == "youtube") {
      await link.sendLink(answer, senderID, i)
    } else if (messageType == "slider") {
      await slider.sendSlider(answer, senderID, i)
    } else if (messageType == "video" || messageType == "audio" || messageType == "image") {
      await media.sendMedia(answer, senderID, i)
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
