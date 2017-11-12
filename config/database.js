if (process.env.NODE_ENV === 'production') {
  module.exports = {
    mongoURI: 'mongodb://brad:brad@ds159845.mlab.com:59845/vidjot'
  };
} else {
  module.exports = {
    mongoURI: 'mongodb://localhost/vidjot'
  };
}