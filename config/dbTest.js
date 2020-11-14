const mongoose = require('mongoose');
const MongodbMemoryServer = require('mongodb-memory-server').default;

// eslint-disable-next-line
jasmine.DEFAULT_TIMEOUT_INTERVAL = 900000;
jest.setTimeout(900000);

// Start MongoDB instance
const mongod = new MongodbMemoryServer();

const connect = async () => {
  const uri = await mongod.getConnectionString();
  const connection = await mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });
  mongoose.set('debug', false);
  return connection;
};

const stop = async () => {
  await mongoose.disconnect();
  await mongod.stop();
};

module.exports = {
  connect,
  stop,
};
