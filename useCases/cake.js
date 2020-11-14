const cakeRepository = require('../repositories/cake');

async function create(params) {
  const newCake = await cakeRepository.create(params);
  return newCake;
}

async function find() {
  const cakes = await cakeRepository.find();
  return cakes;
}

async function empty() {
  return await cakeRepository.empty();
}

module.exports = {
  create,
  find,
  empty
};
