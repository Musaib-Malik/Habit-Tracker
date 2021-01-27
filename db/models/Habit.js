// Import mongoose
const mongoose = require("mongoose");

// Define habit schema
const HabitSchema = new mongoose.Schema({
  name: { type: String, required: true },
  totalDays: { type: Number, required: true },
  daysDone: { type: Number, required: true, default: 0 },
  timeRange: { type: Date, required: true, default: new Date() },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

// Create habit model
const Habit = mongoose.model("Habit", HabitSchema);

// Export model
module.exports = Habit;
