require('dotenv').config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

client.messages.create({
    from: 'whatsapp:+14155238886',
    to: 'whatsapp:' + process.env.PERSONAL_NUMBER,
    body: 'hmmmmm lecker', 
    mediaUrl: 'https://hg1ht-php.websale.biz/genussmagazin/wp-content/uploads/2021/09/Brotbacken_8.jpg'
})
.then(message => console.log(message.sid))
.catch((err) => console.log(err));