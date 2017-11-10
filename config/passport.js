const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');



// Load user model 
const User = mongoose.model('users');

module.exports = (passport) => { 
  passport.use(new LocalStrategy(
    {
    usernameField: 'email'
    },
    (email, passport, done) => {
      console.log(email);
    })
  );
}
