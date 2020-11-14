const { CREATED, OK } = require('http-status-codes');

const cakeUseCase = require('../useCases/cake');

async function create(req, res, next) {
  try {
    const { body } = req;
    const newCake = await cakeUseCase.create(body);
    return res.status(CREATED).send(newCake);
  } catch (error) {
    return next(error);
  }
}

async function find(req, res, next) {
  try {
    const cakes = await cakeUseCase.find();
    return res.status(OK).send(cakes);
  } catch (error) {
    return next(error);
  }
}

async function findById(req, res, next) {
  try {
    const { id } = req.params;
    const cake = await cakeUseCase.findById(id);
    return res.send(cake);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  create,
  find,
  findById
};