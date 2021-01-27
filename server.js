// Import npm modules
const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const flash = require("express-flash");
const dotenv = require("dotenv");
const morgan = require("morgan");
const methoOverride = require("method-override");

// Import local modules
const indexRoute = require("./routes/index");
const authRoute = require("./routes/auth");
const dashboardRoute = require("./routes/dashboard");
const hadbitsRoute = require("./routes/habits");
const route404 = require("./routes/route404");
const passportConfiguration = require("./config/passport");
const connectDB = require("./db/connect");

// Bring env variables
dotenv.config({ path: "./config/variables.env" });

// Connect with DB
connectDB();

// Load passport configuration
passportConfiguration(passport);

// Instantiate express server
const app = express();

// EJS
app.set("view engine", "ejs");

// Morgan
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Metho override
app.use(methoOverride("_method"));

// Middlewares
app.use(express.static("./public"));
app.use(express.urlencoded({ extended: true }));
app.use(flash());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      autoRemoveInterval: 3600,
    }),
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Flash global variables
app.use(function globalVars(req, res, next) {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");

  // Next
  next();
});

// Routes
app.use("/", indexRoute);
app.use("/auth", authRoute);
app.use("/dashboard", dashboardRoute);
app.use("/habits", hadbitsRoute);
app.use("/*", route404);

// Start listening
const PORT = process.env.PORT || 8000;
app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port: ${PORT}`)
);
