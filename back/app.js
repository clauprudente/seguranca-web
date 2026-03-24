const express = require("express");
const path = require("path");
const app = express();
const router = require("./routes");
const security = require("./security");
const helmet = require("helmet");

app.use(helmet());
app.use(express.static(path.join(__dirname, "../front/assets")));
app.use(express.urlencoded({ extended: false }));
app.use(security.sessionMiddleware);
app.use(security.doubleCsrfProtection);
app.use(router);
app.use(security.errorHandler);

module.exports = app;
