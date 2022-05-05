/*
to start the application type
npm start

ngrok server has to be up and running
ngrokLink/whatsapp in twilio console
*/
// external packages
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

// Start the webapp
const webApp = express();

// Webapp settings
webApp.use(bodyParser.urlencoded({
    extended: false
}));
webApp.use(bodyParser.json());

// Server Port
const PORT = process.env.PORT;

// Home route
webApp.get('/', (req, res) => {
    res.send(`Hello World.!`);
});

const WA = require('./helper-function/whatsapp-send-message');

// Route for WhatsApp
webApp.post('/whatsapp', async (req, res) => {

    let message = req.body.Body;
    let senderID = req.body.From;

    console.log(req.body);
    console.log(message);
    console.log(senderID);

    if(message == 'moin'){
        res.send(`
        <Response>
            <Message>Hi!</Message>
        </Response>
    `);
    }else if(message == 'button'){

    }else if(message == 'link'){
        res.send(`
            <?xml version="1.0" encoding="UTF-8"?>
            <Response>
                <Message>
                Klick da: <![CDATA[https://subscription.packtpub.com/book/application_development/9781782175896/1/ch01lvl1sec11/the-world-of-twiml-verbs]]>
                </Message>
            </Response>
        `);
    }else if(message == 'image'){
        res.send(`
            <?xml version="1.0" encoding="UTF-8"?>
            <Response>
                <Message>
                    <Media>https://hg1ht-php.websale.biz/genussmagazin/wp-content/uploads/2021/09/Brotbacken_8.jpg</Media>
                    <Body>hmmmm lecker!</Body>
                </Message>
            </Response>
        `);
    }else if(message == 'video'){
        res.send(`
            <?xml version="1.0" encoding="UTF-8"?>
            <Response>
                <Message>
                    <Media>https://hg1ht-php.websale.biz/genussmagazin/wp-content/uploads/2021/09/Brotbacken_8.jpg</Media>
                    <Body>hmmmm lecker!</Body>
                </Message>
            </Response>
        `);
    }else if(message == 'audio'){
        res.send(`
            <?xml version="1.0" encoding="UTF-8"?>
            <Response>
                <Message>
                    <Message>Hier ist ein Audio:</Message>
                    <Play>http://codeskulptor-demos.commondatastorage.googleapis.com/descent/background%20music.mp3</Play>
                </Message>
            </Response>
        `);
    }else if(message == 'youtube'){
        
    }
    
    await WA.sendMessage(message, senderID);

});

// Start the server
webApp.listen(PORT, () => {
    console.log(`Server is up and running at ${PORT}`);
});
