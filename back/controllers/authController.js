const argon2 = require("argon2");
const { findUserByUsername, createUser } = require("../db");

const login = async (req, res) => {
  try {
    const { login, password } = req.body;

    const user = findUserByUsername(login);

    if (!user) {
      return res.redirect("/login");
    }

    const senhaCorreta = await argon2.verify(user.passwordHash, password);

    if (!senhaCorreta) {
      return res.redirect("/login");
    }

    // regenera o ID de sessão após login (requisito do enunciado)
    req.session.regenerate((err) => {
      if (err) return res.redirect("/login");

      req.session.user = { login: user.login, role: user.role };

      if (user.role === "admin") {
        return res.redirect("/administradores");
      }
      return res.redirect("/usuarios");
    });
  } catch (err) {
    console.error(err); // detalhe só no servidor
    return res.redirect("/login"); // mensagem genérica para o cliente
  }
};

const register = async (req, res) => {
  try {
    const { login, password, role } = req.body;

    const userAlreadyExists = findUserByUsername(login);
    if (userAlreadyExists) {
      return res.redirect("/cadastro");
    }

    const passwordHash = await argon2.hash(password);
    createUser(login, passwordHash, role);

    return res.redirect("/administradores");
  } catch (err) {
    console.error(err);
    return res.redirect("/cadastro");
  }
};

const logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
};

module.exports = { login, register, logout };
