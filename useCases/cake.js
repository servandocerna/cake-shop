const { ResourceNotFoundError, CustomError } = require('../utils/errors');

const cakeRepository = require('../repositories/cake');

async function create(params) {
  const { name } = params;
  const cake = await cakeRepository.search({ name });
  if (cake.length) {
    throw new CustomError('CAKE_ALREADY_EXIST', 'A cake with the same name already exists');
  }

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
    throw new ResourceNotFoundError('Cake', id);
  }
  return cake;
}

async function update(id, item) {
  const cake = await cakeRepository.findById(id);
  if (!cake) {
    throw new ResourceNotFoundError('Cake', id);
  }

  const updatedCake = cakeRepository.update(id, item);
  return updatedCake;
}


async function findByIdAndDelete(id) {
  const cake = await cakeRepository.findById(id);
  if (!cake) {
    throw new ResourceNotFoundError('Cake', id);
  }

  const deletedCake = cakeRepository.findByIdAndDelete(id);
  return deletedCake;
}

async function empty() {
  return await cakeRepository.empty();
}

module.exports = {
  create,
  find,
  findById,
  update,
  findByIdAndDelete,
  empty
};
