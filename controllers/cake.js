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
    console.log('find...');
    const cakes = await cakeUseCase.find();
    return res.status(OK).send(cakes);
  } catch (error) {
    console.log(error);
    return next(error);
  }
}

module.exports = {
  create,
  find
};