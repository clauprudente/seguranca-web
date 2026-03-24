"use strict";
const express = require("express");
const router = express.Router();
const path = require("path");
const { requireAuth } = require("./security");

router.get("/", (req, res) => res.redirect("/login"));

router.get("/login", (req, res) =>
  res.sendFile(path.join(__dirname, "../front/views/login.html")),
);

router.post("/login", (req, res) => {
  const { login, password } = req.body;

  console.log(login, password); // só para testar por agora
});

router.get("/cadastro", requireAuth("admin"), (req, res) =>
  res.sendFile(path.join(__dirname, "../front/views/cadastro.html")),
);

router.get("/cadastro", (req, res) => {
  const { login, password, role } = req.body;

  console.login(login, password, role); // só para testar por agora
});

router.get("/administradores", requireAuth("admin"), (req, res) =>
  res.sendFile(path.join(__dirname, "../front/views/administradores.html")),
);

router.get("/usuarios", requireAuth("user"), (req, res) =>
  res.sendFile(path.join(__dirname, "../front/views/usuarios.html")),
);

router.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "../front/views/error.html"));
});

module.exports = router;
