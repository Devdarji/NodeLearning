const express = require("express");
const cluster = require("cluster");
const os = require("os");

const app = express();

function delay(duration) {
  const startTime = Date.now();
  while (Date.now() - startTime < duration) {
    // Event loop is blocked...
  }
}

app.get("/", (req, res) => {
  res.send(`Performance Example! ${process.pid}`);
});

app.get("/timer", (req, res) => {
  delay(9000);
  res.send(`Ding Ding Done! ${process.pid}`);
});

console.log("Running Serve");

if (cluster.isMaster) {
  console.log("Master has been Started!!");
  const NUM_WORKER = os.cpus().length;

  for (let i = 0; i < NUM_WORKER; i++) {
    cluster.fork();
  }
} else {
  console.log("Worker process Started!!");
  app.listen(3000);
}
