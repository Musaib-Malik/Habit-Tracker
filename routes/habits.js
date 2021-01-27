// Import npm modules
const express = require("express");
const router = express.Router();

// Import local modules
const Habit = require("../db/models/Habit");
const { ensureAuth } = require("../utils/utilFunctions");

// @desc    Show add habit page
// @route   GET /habits/add
router.get("/add", ensureAuth, (req, res) => {
  res.render("addHabit");
});

// @desc    Add habit
// @route   POST /habits
router.post("/", ensureAuth, async (req, res) => {
  try {
    // Check if habit already exists
    const habit = await Habit.findOne({ name: req.body.name });

    // Verify result
    if (habit) {
      return res.render("addHabit", {
        error: "Habit already being tracked.",
      });
    }

    // Else .. Create new habit
    const newHabit = new Habit({
      name: req.body.name,
      totalDays: req.body.daysToTrack,
      owner: req.user._id,
    });

    // Save habit
    await newHabit.save();

    // Redirect
    res.redirect("/dashboard");
  } catch (err) {
    res.render("500");
  }
});

// @desc    Mark habit done
// @route   PUT /habits/done/:id
router.put("/done/:id", ensureAuth, async (req, res) => {
  try {
    // Find habit in the DB and update
    await Habit.findByIdAndUpdate(req.params.id, {
      $inc: { daysDone: 1 },
      timeRange: new Date().setHours(new Date().getHours() + 24),
    });

    // Redirect
    res.redirect("/dashboard");
  } catch (err) {
    res.render("500");
  }
});

// @desc    Delte completed habit
// @route   DELETE /habits/delete/:id
router.delete("/delete/:id", ensureAuth, async (req, res) => {
  try {
    // Find habit and delete
    await Habit.findByIdAndDelete(req.params.id);

    // Redirect
    res.redirect("/dashboard");
  } catch (err) {
    res.render(500);
  }
});

// @desc    Show habit edit page
// @route   GET /habits/edit/:id
router.get("/edit/:id", ensureAuth, async (req, res) => {
  try {
    // Find habit in DB
    const habit = await Habit.findById(req.params.id);

    // Render edit page
    res.render("editHabit", { habit });
  } catch (err) {
    res.render("500");
  }
});

// @desc    Process edit request
// @route   PUT /habits/:id
router.put("/:id", ensureAuth, async (req, res) => {
  try {
    // Find habit
    const habit = await Habit.findOne({ name: req.body.name });

    // Check duplicate
    if (habit) {
      return res.render("addHabit", {
        error: "Habit already being tracked.",
      });
    }

    // Find and update habit
    await Habit.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      totalDays: req.body.daysToTrack,
    });

    // Redirect to dashboard
    res.redirect("/dashboard");
  } catch (err) {
    res.render("500");
  }
});

// @desc    Show habits manage page
// @route   GET /habits/manage
router.get("/manage", ensureAuth, async (req, res) => {
  try {
    // Get all habits of the current user
    const habits = await Habit.find({ owner: req.user._id });

    // Render manage page
    res.render("manage", { habits });
  } catch (err) {
    res.render("500");
  }
});

// Export router
module.exports = router;
