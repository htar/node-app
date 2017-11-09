const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


// Load Idea Modal 
require('../models/Idea');
const Idea = mongoose.model('ideas');

// Idea Index Page
router.get('/', (req, res) => {
  Idea.find({
  })
    .sort({ date: 'desc' })
    .then(ideas => {
      res.render('ideas/index', {
        ideas: ideas,
      });
    });
});

// Edit Idea Form
router.get('/edit/:id', (req, res) => {
  Idea.findOne({
    _id: req.params.id
  }).then(idea => {
    res.render('ideas/edit', {
      idea: idea
    });
  });
});


// Add Idea Form
router.get('/add', (req, res) => {
  res.render('ideas/add');
});



//Process Form
router.post('/', (req, res) => {
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
router.put('/:id', (req, res) => {
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
router.delete('/:id', (req, res) => {
  Idea.remove({
    _id: req.params.id
  }).then(() => {
    req.flash('success_msg', 'Video idea removed');
    res.redirect('/ideas');
  });
});

module.exports = router;