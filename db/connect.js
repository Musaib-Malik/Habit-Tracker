// Import mongoose
const mongoose = require("mongoose");

// Connect to database
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useCreateIndex: true,
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected with database");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

// Export connection
module.exports = connectDB;
