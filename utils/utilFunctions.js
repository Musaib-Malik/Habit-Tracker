// Some utility functions
module.exports = {
  ensureAuth: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }

    // Carry on ...
    req.flash("error_msg", "Please login to access this resource.");
    res.redirect("/");
  },

  ensureGuest: (req, res, next) => {
    if (req.isAuthenticated()) {
      return res.redirect("/dashboard");
    }

    // Carry on ...
    return next();
  },
};
