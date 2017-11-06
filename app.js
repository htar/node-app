const express = require('express');

const app = express();
const port = 5000;

// index route
app.get('/', (req, res) => {
  res.send('index');
});
app.get('/about', (req, res) => {
  res.send('About');
});

app.listen(port, (req, res) => {

  console.log('object');
});
