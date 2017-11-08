const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

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

// Index Route
app.get('/', function (req, res) {
  res.render('index', { title: 'Index Page' });
});

// About route
app.get('/about', function (req, res) {
  res.render('about', { title: 'About Page' });
});

// Idea Index Page
app.get('/ideas', function (req, res) {
  Idea.find({
  })
    .sort({ date: 'desc' })
    .then(ideas => {
      res.render('ideas/index', {
        ideas: ideas,
      });
    })
});

// Add Idea Form
app.get('/ideas/add', function (req, res) {
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


app.listen(port, (req, res) => {
  console.log(`Server started on port ${port}`);
});
