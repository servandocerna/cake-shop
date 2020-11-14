const { NOT_FOUND } = require('http-status-codes');

const cakeRepository = require('../repositories/cake');

async function create(params) {
  const newCake = await cakeRepository.create(params);
  return newCake;
}

async function find() {
  const cakes = await cakeRepository.find();
  return cakes;
}

async function findById(id) {
  const cake = await cakeRepository.findById(id);
  if (!cake) {
    throw new Error(NOT_FOUND, `Cake with ${id} not found`);
  }
  return cake;
}

async function empty() {
  return await cakeRepository.empty();
}

module.exports = {
  create,
  find,
  findById,
  empty
};
