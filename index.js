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

  // HTTP-Request body from user message in whatsapp
  var data = JSON.stringify({
    context: {
      conversation_id: process.env.CONV_ID,
      frontend_params: {},
      parentReferrer: process.env.REFER_KEY,
    },
    message: message,
    input: {
      text: message,
    },
  });

  // HTTP-Request Header configuration 
  var config = {
    method: "post",
    url: process.env.BOT_URL,
    headers: {
      Referer: process.env.REFER_KEY,
      "Content-Type": "application/json",
    },
    data: data,
  };

  // on http response, save response data in var "answer"
  let answer;
  await axios(config)
    .then(function (response) {
      answer = response.data;
    })
    .catch(function (error) {
      console.log(error);
    });

  // parse answer and senderID to helpder functions for further processing
  await WA.sendMessage(answer, senderID);
});

// Starts the server 
webApp.listen(PORT, () => {
  console.log(`Server is up and running at ${PORT}`);
});
