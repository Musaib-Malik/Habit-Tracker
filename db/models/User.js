// Import mongoose
const mongoose = require("mongoose");

// Define user schema
const UserSchema = new mongoose.Schema({
  googleID: {
    type: String,
    required: true,
  },
  displayName: {
    type: String,
    requried: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create user model
const User = mongoose.model("User", UserSchema);

// Export model
module.exports = User;
