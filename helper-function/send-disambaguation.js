const { get } = require("express/lib/request");

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = require("twilio")(accountSid, authToken, {
  lazyLoading: true,
});

var buttonAnswers = []; // externally accessible array meant for export of button content

// sends list of possibles responses instead of buttons to user
const sendDisambiguation = async (answer, senderID, i) => {
  let adress = process.env.ADRESS_USER + ": \n"; //formatted adress of user, configurable in .env-file
  let buttonAmount = answer.messages[i].content[0].options.length; //logs how many buttons will be sent
  let bullets = []; // array for button content
  let options = []; // array for buttons in message, displayed as bullet points 

  for (let j = 0; j < buttonAmount; j++) {
    options.push(answer.messages[i].content[0].options[j].label);
    bullets.push("\n" + (j + 1) + '. "*' + options[j] + '*"');
  }
  buttonAnswers = options; // button content gets stored in buttonAnswers
  messageContext = "buttons";
  try {
    await client.messages.create({
      to: senderID,
      body: adress + bullets.join(" "), // send user adress and bulletpoints as message
      from: `whatsapp:+14155238886`,
    });
  } catch (error) {
    console.log(`Error at sendMessage --> ${error}`);
  }
};

// get/export buttoncontent for reuse on user response
const getOptions = async () => {
  return buttonAnswers;
};

module.exports = {
  sendDisambiguation,
  getOptions,
};
