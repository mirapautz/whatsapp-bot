// external packages
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

// Start the webapp
const webApp = express();

// Webapp settings
webApp.use(bodyParser.urlencoded({
    extended: true
}));
webApp.use(bodyParser.json());

// Server Port
const PORT = process.env.PORT;

// Home route
webApp.get('/', (req, res) => {
    res.send(`Hello World.!`);
});

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

const WA = require('./helper-function/whatsapp-send-message');

// Route for WhatsApp
webApp.post('/whatsapp', async (req, res) => {

    let message = req.body.Body;
    let senderID = req.body.From;

    console.log(message);
    console.log(senderID);

    // Write a function to send message back to WhatsApp
    await WA.sendMessage('Hello from the other side.', senderID);

});

// Start the server
webApp.listen(PORT, () => {
    console.log(`Server is up and running at ${PORT}`);
});

/*
client.messages.create({
    from: 'whatsapp:+14155238886',
    to: 'whatsapp:' + process.env.PERSONAL_NUMBER,
    body: 'hmmmmm lecker', 
    mediaUrl: 'https://hg1ht-php.websale.biz/genussmagazin/wp-content/uploads/2021/09/Brotbacken_8.jpg'
})
.then(message => console.log(message.sid))
.catch((err) => console.log(err));
*/