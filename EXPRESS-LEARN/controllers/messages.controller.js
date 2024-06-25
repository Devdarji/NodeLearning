const path = require("path");

function getMessages(req, res) {
  res.render("messages", {
    title: "Node New Website",
    friend: "Elon Musk!",
  });
  // res.sendFile(
  //   path.join(__dirname, "..", "public", "images", "skimountain.jpg")
  // );
  // res.send("<ul><li>Learn Javascript</li></ul>");
}

function postMessage(req, res) {
  console.log("Updating message...");
}

module.exports = {
  getMessages,
  postMessage,
};
