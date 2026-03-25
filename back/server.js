require("dotenv").config({ path: require("path").join(__dirname, "../.env") });

const https = require("https");
const fs = require("fs");
const path = require("path");
const app = require("./app");

const options = {
  key: fs.readFileSync(path.join(__dirname, "../certs/key.pem")),
  cert: fs.readFileSync(path.join(__dirname, "../certs/cert.pem")),
};

https.createServer(options, app).listen(3000, () => {
  console.log("Rodando em http://localhost:3000");
});
