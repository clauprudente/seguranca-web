const express = require("express");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, "../front/assets")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../front/views/login.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "../front/views/login.html"));
});

module.exports = app;
