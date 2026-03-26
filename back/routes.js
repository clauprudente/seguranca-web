"use strict";
const express = require("express");
const router = express.Router();
const { requireAuth, generateToken } = require("./security");
const authController = require("./controllers/authController");

router.get("/", (req, res) => res.redirect("/login"));

router.get("/login", (req, res) =>
  res.render("login", { csrfToken: generateToken(req, res) }),
);

router.post("/login", authController.loginValidation, authController.login);

router.get("/cadastro", requireAuth("admin"), (req, res) =>
  res.render("cadastro", { csrfToken: generateToken(req, res) }),
);

router.post(
  "/cadastro",
  requireAuth("admin"),
  authController.registerValidation,
  authController.register,
);

router.post("/logout", authController.logout);

router.get("/administradores", requireAuth("admin"), (req, res) =>
  res.render("administradores", { csrfToken: generateToken(req, res) }),
);

router.get("/usuarios", requireAuth("user"), (req, res) =>
  res.render("usuarios", { csrfToken: generateToken(req, res) }),
);

router.use((req, res) => {
  res.status(404).render("error");
});

module.exports = router;
