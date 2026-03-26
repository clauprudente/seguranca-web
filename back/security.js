const session = require("express-session");
const { doubleCsrf } = require("csrf-csrf");

// Duração de Sessão
const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 15 * 60 * 1000,
  },
});

// Controle de Acesso
const requireAuth = (...roles) => {
  return (req, res, next) => {
    if (!req.session?.user) return res.redirect("/negado");
    if (roles.length && !roles.includes(req.session.user.role)) {
      return res.redirect("/negado");
    }

    next();
  };
};

// Tratamento de Erros
const errorHandler = (err, req, res, next) => {
  console.error(err);
  res.status(500).render("error");
};

// Proteção CSRF
const { generateToken, doubleCsrfProtection } = doubleCsrf({
  getSecret: () => process.env.SESSION_SECRET,
  cookieName: "x-csrf-token",
  cookieOptions: { sameSite: "strict", secure: true, httpOnly: false },
  getTokenFromRequest: (req) => req.body._csrf,
});

module.exports = {
  sessionMiddleware,
  requireAuth,
  errorHandler,
  generateToken,
  doubleCsrfProtection,
};
