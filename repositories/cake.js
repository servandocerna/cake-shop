const cakeModel = require('../models/cake');
const { isTestingEnvironment } = require('../utils');

async function create(item) {
  const newCake = await cakeModel(item).save();
  return newCake.toJSON();
}

async function find(query = {}) {
  return cakeModel.find(query).exec();
}

async function findById(id) {
  return cakeModel.findById(id).exec();
}

async function empty() {
  if (!isTestingEnvironment()) throw new Error('this option is unsafe and prohibited');
  return cakeModel.deleteMany({}).exec();
}

module.exports = {
  create,
  find,
  findById,
  empty
};
