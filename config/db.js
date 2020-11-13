const mongoose = require('mongoose');

const config = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};

const { MONGODB_URL } = process.env;
console.log(MONGODB_URL);
const URL = MONGODB_URL;

mongoose.connect(URL, config);
mongoose.set('debug', false);
mongoose.Promise = global.Promise;

const db = mongoose.connection;

// Bind connection to error event (to get notification of connection errors)
// eslint-disable-next-line
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = db;
