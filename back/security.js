const session = require("express-session");

// Duração de Sessão
const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: true,
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

module.exports = { requireAuth };
