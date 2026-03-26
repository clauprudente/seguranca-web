const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const app = express();
const router = require("./routes");
const security = require("./security");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../front/views"));

app.use(helmet());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../front/assets")));
app.use(express.urlencoded({ extended: false }));
app.use(security.sessionMiddleware);
app.use(security.doubleCsrfProtection);

app.use(router);

app.use(security.errorHandler);

module.exports = app;
