const express = require('express');

const app = express();
const port = 5000;

// Pug Middleware

app.set('view engine', 'pug');


// Index Route
app.get('/', function(req, res) {
  res.render('index', { title: 'Index Page'});
});

// About route
app.get('/about', function(req, res) {
  res.render('about', { title: 'About Page' });
});


app.listen(port, (req, res) => {
  console.log(`Server started on port ${port}`);
});
