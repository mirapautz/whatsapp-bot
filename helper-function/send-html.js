const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const adress = require("./send-address");

const client = require("twilio")(accountSid, authToken, {
  lazyLoading: true,
});

const sendMessage = async (answer, senderID, i, j) => {
  let string;

  // Check if conten contains an adress
  if (answer.messages[i].content[j].type == "address") {
    string = await adress.sendAddress(answer, i, j);
  } else {
    string = answer.messages[i].content[j].text;
  }

  //strip html
  if (string.includes("href")) {
    //extract link from message and create a new message with the link
    let urlRE = new RegExp(
      "([a-zA-Z0-9]+://)?([a-zA-Z0-9_]+:[a-zA-Z0-9_]+@)?([a-zA-Z0-9.-]+\\.[A-Za-z]{2,4})(:[0-9]+)?([^ ])+"
    );
    let linkRaw = string.match(urlRE);
    var link = linkRaw.slice(0, 1);
  }

  try {
    await client.messages.create({
      to: senderID,
      body: string.replace(/<[^>]*>?/gm, ""),
      from: `whatsapp:+14155238886`,
    });

    if (link != null) {
      try {
        await client.messages.create({
          to: senderID,
          body: link,
          from: `whatsapp:+14155238886`,
        });

        //catch for inner try statement
      } catch (error) {
        console.log(`Error at sendMessage --> ${error}`);
      }
    }

    //catch for outer try statement
  } catch (error) {
    console.log(`Error at sendMessage --> ${error}`);
    console.log("hier is auch n Fehler");
  }
};

module.exports = {
  sendMessage,
};
