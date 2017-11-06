const express = require('express');

const app = express();
const port = 5000;

// add default pug template

app.set('view engine', 'pug');

app.get('/', function(req, res) {
  res.render('index', { title: 'Hey Hey Hey!', message: 'Yo Yo' });
});

app.listen(port, (req, res) => {
  console.log(`Server started on port ${port}`);
});
