const { get } = require("express/lib/request");

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = require("twilio")(accountSid, authToken, {
  lazyLoading: true,
});

var buttonAnswers = [];

const sendDisambiguation = async (answer, senderID, i) => {
  let adress = process.env.ADRESS_USER + ": \n";
  let buttonAmount = answer.messages[i].content[0].options.length;
  let bullets = [];
  let options = [];

  for (let j = 0; j < buttonAmount; j++) {
    options.push(answer.messages[i].content[0].options[j].label);
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
};

const getOptions = async () => {
  return buttonAnswers;
};

module.exports = {
  sendDisambiguation,
  getOptions,
};
