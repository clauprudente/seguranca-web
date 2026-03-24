require("dotenv").config({ path: require("path").join(__dirname, "../.env") });

const http = require("http");
const app = require("./app");

http.createServer(app).listen(3000, () => {
  console.log("Rodando em http://localhost:3000");
});
