"use strict";
const express = require("express");
const router = express.Router();
const path = require("path");
const { requireAuth } = require("./security");

router.get("/", (req, res) => res.redirect("/login"));

router.get("/login", (req, res) =>
  res.sendFile(path.join(__dirname, "../front/views/login.html")),
);
router.get("/cadastro", requireAuth("admin"), (req, res) =>
  res.sendFile(path.join(__dirname, "../front/views/register.html")),
);
router.get("/administradores", requireAuth("admin"), (req, res) =>
  res.sendFile(path.join(__dirname, "../front/views/admin.html")),
);
router.get("/usuarios", requireAuth("user"), (req, res) =>
  res.sendFile(path.join(__dirname, "../front/views/user.html")),
);

module.exports = router;
