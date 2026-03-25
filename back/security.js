const session = require("express-session");
const { doubleCsrf } = require("csrf-csrf");

// Duração de Sessão
const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
    maxAge: 15 * 60 * 1000, // 15 min inactivity expiry
  },
});

// Controle de Acesso
const requireAuth = (...roles) => {
  return (req, res, next) => {
    if (!req.session?.user) return res.redirect("/login");
    if (roles.length && !roles.includes(req.session.user.role)) {
      return res.redirect("/login");
    }

    next();
  };
};

const errorHandler = (err, req, res, next) => {
  console.error(err); // detalhe só no servidor
  res.status(500).sendFile(path.join(__dirname, "../front/views/error.html"));
};

const { generateToken, doubleCsrfProtection } = doubleCsrf({
  getSecret: () => process.env.SESSION_SECRET,
  cookieName: "x-csrf-token",
  cookieOptions: { sameSite: "strict", secure: true, httpOnly: true },
  getTokenFromRequest: (req) => req.body._csrf,
});

module.exports = {
  sessionMiddleware,
  requireAuth,
  errorHandler,
  generateToken,
  doubleCsrfProtection,
};
