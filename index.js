/*
to start the application type
npm start

ngrok server has to be up and running ('ngrok http 3000')
ngrokLink/whatsapp in twilio console
*/
// external packages
const axios = require("axios");
const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const WA = require("./helper-function/whatsapp-send-message");

/////////////////////////////////////////////////////////////////
/////////////////////BOT CONFIGURATION///////////////////////////

// URL where the request to the bot is headed
const botURL = process.env.BOT_URL;

// URL the request refers to
const referKey = process.env.REFER_KEY;

// Conversation ID
const convID = process.env.CONV_ID;

/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////

// Start the webapp
const webApp = express();

// Webapp settings
webApp.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
webApp.use(bodyParser.json());

// Server Port
const PORT = process.env.PORT;

// Home route
webApp.get("/", (req, res) => {
  res.send(`Hello World.!`);
});

// Route for WhatsApp
webApp.post("/whatsapp", async (req, res) => {
  let message = req.body.Body;

  if ((await WA.getmessageContext()) == "buttons" && (await WA.containsNumber(message))) {
    message = await WA.getButtonAnswer(message);
  }

  let senderID = req.body.From;

  var data = JSON.stringify({
    context: {
      conversation_id: convID,
      frontend_params: {},
      parentReferrer: referKey,
    },
    message: message,
    input: {
      text: message,
    },
  });

  var config = {
    method: "post",
    url: botURL,
    headers: {
      Referer: referKey,
      "Content-Type": "application/json",
    },
    data: data,
  };

  let answer;
  await axios(config)
    .then(function (response) {
      answer = response.data;
    })
    .catch(function (error) {
      console.log(error);
    });

  // Write a function to send message back to WhatsApp
  await WA.sendMessage(answer, senderID);
});

// Start the server
webApp.listen(PORT, () => {
  console.log(`Server is up and running at ${PORT}`);
});
