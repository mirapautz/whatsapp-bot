const sendAddress = async (answer, i, j) => {
    let mapstring= answer.messages[i].content[j].address
    let mapsquery= mapstring.replace(/ /g,"+")

    let messagestring = "https://www.google.com/maps/place/" + mapsquery 
    return messagestring;
};
    
module.exports = {
    sendAddress
}
