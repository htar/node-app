const express = require('express');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');


const app = express();
const port = 5000;

// Load Routes
const ideas = require('./routes/ideas');
const users = require('./routes/users');



// Map global promise -get rid of warning
mongoose.Promise = global.Promise;
// Connect to mongoose
mongoose.connect('mongodb://localhost/vidjot-dev', {
  useMogoClient: true
})
  .then(() => {
    console.log('MongoDB Connected ...');
  })
  .catch((err) => {
    console.log(err);
  });




// Pug Middleware
app.set('view engine', 'pug');

//Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Method override middleware
app.use(methodOverride('_method'));

// Express session midleware
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

app.use(flash());

// Global variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Index Route
app.get('/', (req, res) => {
  res.render('index', { title: 'Index Page' });
});

// About route
app.get('/about', (req, res) => {
  res.render('about', { title: 'About Page' });
});





app.use('/ideas', ideas);
app.use('/users', users);

app.listen(port, (req, res) => {
  console.log(`Server started on port ${port}`);
});
