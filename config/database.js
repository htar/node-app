if (process.env.NODE_ENV === 'production') {
  module.exports = {
    mongoURI: 'mongodb://<dbuser>:<dbpassword>@ds159845.mlab.com:59845/vidjot'
  };
} else {
  module.exports = {
    mongoURI: 'mongodb://localhost/vidjot'
  };
}