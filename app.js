const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override')

const app = express();
const port = 5000;


// Map global promise -get rid of warning
mongoose.Promise = global.Promise;
// Connect to mongoose
mongoose.connect('mongodb://localhost/vidjot-dev', {
  useMogoClient: true
})
  .then(() => {
    console.log('object');
  })
  .catch((err) => {
    console.log(err);
  });


// Load Idea Modal 
require('./models/Idea');
const Idea = mongoose.model('ideas');


// Pug Middleware
app.set('view engine', 'pug');

//Body parser middleware

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Method override middleware
app.use(methodOverride('_method'));

// Index Route
app.get('/', (req, res) => {
  res.render('index', { title: 'Index Page' });
});

// About route
app.get('/about', (req, res) => {
  res.render('about', { title: 'About Page' });
});

// Idea Index Page
app.get('/ideas', (req, res) => {
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
app.get('/ideas/edit/:id', (req, res) => {
  Idea.findOne({
    _id: req.params.id
  }).then(idea => {
    res.render('ideas/edit', {
      idea: idea
    });
  });
});


// Add Idea Form
app.get('/ideas/add', (req, res) => {
  res.render('ideas/add');
});

//Process Form
app.post('/ideas', (req, res) => {
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
        res.redirect('/ideas');
      });
  }
});


// Edit Form process Idea Form
app.put('/ideas/:id', (req, res) => {
  Idea.findOne({
    _id: req.params.id
  }).then(idea => {
    idea.title = req.body.title;
    idea.details = req.body.details;
    idea.save()
      .then(idea => {
        res.redirect('/ideas');
      });
  });
});

app.listen(port, (req, res) => {
  console.log(`Server started on port ${port}`);
});
