const passport = require('passport');
const googleStrategy = require("passport-google-oauth20").Strategy;
const keys = require('../config/keys');

const mongoose = require("mongoose");
const User = mongoose.model("users");

passport.serializeUser((newUser, done) => {
  done(null, newUser.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(cookieUser => {
    done(null, cookieUser);
  })
});

passport.use(
  new googleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id }).then(existingUser => {
        if (existingUser) {
          //existing user
          console.log('You are an existing user');
        } else {
          done(null, existingUser);
          //Create a new user
          new User({ googleId: profile.id }).save().then(
            newUser => done(null, newUser));
        }
      });
    }
  )
);
