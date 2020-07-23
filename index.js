const express = require('express');
const cookieSession = require('cookie-session');
const passport = require('passport');
const mongoose = require('mongoose');
require('./models/user');
require('./services/passport');

mongoose.connect(process.env.MONGO_URI);

const port = process.env.PORT || 5000;

const authRouter = require('./routes/auth');

const app = express();

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY],
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(authRouter);

app.listen(port, () => {
  console.log(`Server is on port ${port} ! `);
});
