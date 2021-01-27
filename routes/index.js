// Import npm modules
const express = require("express");
const router = express.Router();

// Import local modules
const { ensureGuest } = require("../utils/utilFunctions");

// @desc    Show landing/login page
// @route   GET /
router.get("/", ensureGuest, (req, res) => {
  res.render("index");
});

// Export router
module.exports = router;
