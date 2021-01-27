// Import npm modules
const GoogleStrategy = require("passport-google-oauth20");

// Import user model
const User = require("../db/models/User");

// Configure passport
const configurePassport = (passport) => {
  // Main
  const main = async (accessToken, refreshToken, profile, done) => {
    try {
      // Look for user in DB
      const user = await User.findOne({ googleID: profile.id });

      // Verify response
      if (user) {
        return done(null, user);
      }

      // Else ... create new user
      const newUser = new User({
        googleID: profile.id,
        displayName: profile.displayName,
      });

      // Save user
      await newUser.save();

      // Return user
      done(null, newUser);
    } catch (err) {
      return done(err);
    }
  };

  // Create strategy
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL:
          "https://habit-tracker9.herokuapp.com/auth/google/callback",
      },
      main
    )
  );

  // Serialize & Deserialize user
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser((id, done) => {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });
};

// Export configuration
module.exports = configurePassport;
