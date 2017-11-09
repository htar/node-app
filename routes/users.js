
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// User Login Route
router.get('/login', (req, res) => {
  res.render('users/login');
});


// User Register Route
router.get('/register', (req, res) => {
  res.render('users/register');
});

// Register Form POST
router.post('/register', (req, res) => {
  let errors = [];

  if (req.body.password != req.body.password2) {
    errors.push({ text: 'Password do not match' });
  }
  if (req.body.password.length < 4) {
    errors.push({ text: 'Password mast be at least 4 characters' });
  }
  if (errors.length > 0) {
    res.render('users/register', {
      errors: errors,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      password2: req.body.password2
    });
  } else {
    res.send('past');
  }
});


module.exports = router;