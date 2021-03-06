const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const bodyParser = require('body-parser');
const methodOverride = require('method-override'); 
const passport = require('passport');


const app = express();
const port = process.env.PORT || 5000;

// Load Routes
const ideas = require('./routes/ideas');
const users = require('./routes/users');



// Passport Config
require('./config/passport')(passport);
// DB Config

const db = require('./config/database');

// Map global promise -get rid of warning
mongoose.Promise = global.Promise;
// Connect to mongoose
mongoose.connect(db.mongoURI, {
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

// Static folder
app.use(express.static(path.join(__dirname, 'public')));

// Method override middleware
app.use(methodOverride('_method'));

// Express session midleware
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));
// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

// Global variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

// Index Route
app.get('/', (req, res) => {
  res.render('index');
});

// About route
app.get('/about', (req, res) => {
  res.render('about');
});





app.use('/ideas', ideas);
app.use('/users', users);

app.listen(port, (req, res) => {
  console.log(`Server started on port ${port}`);
});
