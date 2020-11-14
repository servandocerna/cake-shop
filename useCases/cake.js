const cakeRepository = require('../repositories/cake');

async function create(params) {
  const newCake = await cakeRepository.create(params);
  return newCake;
}

async function empty() {
  return await cakeRepository.empty();
}

module.exports = {
  create,
  empty
};
