const axios = require("axios");

axios
  .get("https://www.wikipedia.org")
  .then((response) => {
    console.log(response);
  })
  .catch((err) => { 
    console.log(err);
  }).then(() => console.log("All Done!"));



//  for the check version
// semver.npmjs.com