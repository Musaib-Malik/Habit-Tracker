// Import npm modules
const express = require("express");
const router = express.Router();

// Import local modules
const { ensureAuth } = require("../utils/utilFunctions");
const Habit = require("../db/models/Habit");

// @desc    Show dashboard page
// @route   GET /dashboard
router.get("/", ensureAuth, async (req, res) => {
  try {
    // Get all habits
    const habits = await Habit.find({ owner: req.user._id });

    // Render dashboard
    res.render("dashboard", { user: req.user, habits });
  } catch (err) {
    res.render("500");
  }
});

// Export router
module.exports = router;
