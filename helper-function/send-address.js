// receives answer and returnes formatted google-maps link for given adress
const sendAddress = async (answer, i, j) => {
  let mapstring = answer.messages[i].content[j].address.replace(/ /g, "+"); // get adress from answer and replace whitespaces in adress with "+"
  return "https://www.google.com/maps/place/" + mapstring; // return google maps link
};

module.exports = {
  sendAddress,
};
