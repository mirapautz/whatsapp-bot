const html = require("./send-html.js");
const button = require("./send-button.js");
const link = require("./send-link.js");
const slider = require("./send-slider.js");
const media = require("./send-media.js");
const disambiguation = require("./send-disambaguation.js");

var messageContext = ""; // logs if button or disambiguation have been sent
var buttonAnswers = []; // stores content of last buttons sent

// Function to send message to WhatsApp
const sendMessage = async (answer, senderID) => {
  //Filter out the messageType from Nordi Bot message
  for (var i = 0; i < answer.messages.length; i++) {
    for (let j = 0; j < answer.messages[i].content.length; j++) {
      var messageType = JSON.stringify(answer.messages[i].content[0].type).slice(1, -1);

      // call different helper-function for every message depending on messageType for further message processing
      if (messageType == "markdown" || messageType == "html" || messageType == "plaintext") {
        await html.sendMessage(answer, senderID, i, j);
      } else if (messageType == "button") {
        messageContext = "buttons"; // log that buttons have been sent
        button.sendMessage(answer, senderID, i);
        buttonAnswers = await button.getOptions(); // get content of last buttons sent
      } else if (messageType == "link" || messageType == "youtube") {
        await link.sendLink(answer, senderID, i);
      } else if (messageType == "slider") {
        await slider.sendSlider(answer, senderID, i);
      } else if (messageType == "video" || messageType == "audio" || messageType == "image") {
        await media.sendMedia(answer, senderID, i);
      } else if (messageType == "disambiguation") {
        messageContext = "buttons"; // log that buttons have been sent
        disambiguation.sendDisambiguation(answer, senderID, i);
        buttonAnswers = await disambiguation.getOptions(); // get content of last buttons sent
      }
    }
  }
};

// export to index.js wheather buttons have been sent
const getmessageContext = async () => {
  return messageContext;
};

//get integer sent by user and return matching button content from last buttons sent
const getButtonAnswer = async (i) => {
  return buttonAnswers[i - 1];
};

// check if number given contain integer
const containsNumber = async (str) => {
  return /\d/.test(str);
};

module.exports = {
  sendMessage,
  getmessageContext,
  getButtonAnswer,
  containsNumber,
};
