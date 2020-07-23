const express = require('express');
const passport = require('passport');

const router = express.Router();

router.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['email', 'profile'],
  })
);

router.get('/auth/google/callback', passport.authenticate('google'));

router.get('/api/logout', (req, res) => {
  req.logout();
  res.send(req.user);
});

router.get('/api/current_user', (req, res) => {
  console.log('/api/current_user');
  res.send(req.user);
});

module.exports = router;
