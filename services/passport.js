const passport = require('passport');
const mongoose = require('mongoose');
const googleStrategy = require('passport-google-oauth20').Strategy;

const keys = require('../config/keys');
const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

passport.use(
  new googleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
      proxy: true,
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleID: profile.id }).then((user) => {
        if (user) {
          console.log('I am already here');
          done(null, user);
        } else {
          new User({ googleID: profile.id })
            .save()
            .then((newUser) => done(null, newUser));
        }
      });
      console.log('accessToken: ', accessToken);
      console.log('refreshToken: ', refreshToken);
      console.log('profile: ', profile);
    }
  )
);
