// Import npm modules
const express = require("express");
const passport = require("passport");
const router = express.Router();

// Import local modules
const { ensureGuest } = require("../utils/utilFunctions");

// @desc    Auth with google
// @route   GET /auth/google
router.get(
  "/google",
  ensureGuest,
  passport.authenticate("google", { scope: ["profile"] })
);

// @desc    Google auth callback
// @route   GET /auth/google/callback
router.get(
  "/google/callback",
  ensureGuest,
  passport.authenticate("google", {
    failureRedirect: "/",
    successRedirect: "/dashboard",
    failureFlash: true,
  })
);

// @desc    Logout user
// @route   GET /auth/logout
router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success_msg", "Logged out successfully.");
  res.redirect("/");
});

// Export router
module.exports = router;
