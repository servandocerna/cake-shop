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

async function update(id, item) {
  return cakeModel.findByIdAndUpdate(id, item, { new: true, runValidators: true }).exec();
}

async function findByIdAndDelete(id) {
  return cakeModel.findByIdAndDelete(id).exec();
}

async function search(params = {}) {
  const { name } = params;
  const query = {
    $and: [
      name
        ? { name }
        : {}
    ]
  };
  const items = await cakeModel.find(query).exec();
  return items;
}

async function empty() {
  if (!isTestingEnvironment()) throw new Error('this option is unsafe and prohibited');
  return cakeModel.deleteMany({}).exec();
}

module.exports = {
  create,
  find,
  findById,
  update,
  findByIdAndDelete,
  search,
  empty
};
