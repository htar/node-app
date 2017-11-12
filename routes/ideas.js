const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { ensureAuthenticated} = require('../helpers/auth');


// Load Idea Modal 
require('../models/Idea');
const Idea = mongoose.model('ideas');

// Idea Index Page
router.get('/', ensureAuthenticated,(req, res) => {
  Idea.find({user:req.user.id})
    .sort({ date: 'desc' })
    .then(ideas => {
      res.render('ideas/index', {
        ideas: ideas,
      });
    });
});

// Edit Idea Form
router.get('/edit/:id', ensureAuthenticated, (req, res) => {
  Idea.findOne({
    _id: req.params.id
  }).then(idea => {
    if (idea.user != req.user.id) {
      req.flash('error_msg', 'Not Authorized');
      res.redirect('ideas');
    } else {
      res.render('ideas/edit', {
        idea: idea
      });
    }
  });
});


// Add Idea Form
router.get('/add', ensureAuthenticated, (req, res) => {
  res.render('ideas/add');
});



//Process Form
router.post('/', ensureAuthenticated, (req, res) => {
  let errors = [];
  if (!req.body.title) {
    errors.push({
      text: 'Please add a title'
    });
  }
  if (!req.body.details) {
    errors.push({
      text: 'Please add a details'
    });
  }
  if (errors.length) {
    res.render('ideas/add', {
      errors: errors,
      title: req.body.title,
      details: req.body.errors
    });
  } else {
    const newUser = {
      title: req.body.title, 
      user:req.user.id,
      details: req.body.details,
    };
    new Idea(newUser)
      .save()
      .then(idea => {
        req.flash('success_msg', 'Video idea added');
        res.redirect('/ideas');
      });
  }
});


// Edit Form process Idea Form
router.put('/:id', ensureAuthenticated, (req, res) => {
  Idea.findOne({
    _id: req.params.id
  }).then(idea => {
    idea.title = req.body.title;
    idea.details = req.body.details;
    idea.save()
      .then(idea => {
        req.flash('success_msg', 'Video idea update');
        res.redirect('/ideas');
      });
  });
});
// Delete  Idea
router.delete('/:id', ensureAuthenticated, (req, res) => {
  Idea.remove({
    _id: req.params.id
  }).then(() => {
    req.flash('success_msg', 'Video idea removed');
    res.redirect('/ideas');
  });
});

module.exports = router;