const express = require("express");
const path = require("path");
const app = express();
const router = require("./routes");

app.use(express.static(path.join(__dirname, "../front/assets")));

app.use(express.urlencoded({ extended: false }));

app.use(router);

module.exports = app;
