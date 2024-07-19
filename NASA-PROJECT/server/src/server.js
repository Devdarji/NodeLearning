const http = require("http");

const { loadPlanetsData } = require("./models/planets.model");
const {mongoConnect} = require("./services/mongo")

const app = require("./app");

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

async function startServer() {
  await mongoConnect();
  await loadPlanetsData();

  server.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
  });
}

startServer();

//  Command for the ssl certificate
// openssl req -x509 -newkey rsa:4096 -nodes -keyout key.pem -out cert.pem -days 365