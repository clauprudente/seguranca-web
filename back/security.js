const requireAuth = (role) => {
  console.log(role);

  return (req, res, next) => {
    if (!req.session?.user) return res.redirect("/login");
    if (roles.length && !roles.includes(req.session.user.role)) {
      return res.redirect("/login");
    }

    next();
  };
};

module.exports = { requireAuth };
