const { CREATED, BAD_REQUEST } = require('http-status-codes');

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

module.exports = {
  create
};