const { findUserByUsername, createUser } = require("../db");

const login = (req, res) => {
  //
};
const register = (req, res) => {
  const { login, password, role } = req.body;

  const userAlreadyExists = findUserByUsername(login);

  if (userAlreadyExists) return;

  console.login(login, password, role); // só para testar por agora
};

const logout = (req, res) => {
  //
};

module.exports = { login, register, logout };
