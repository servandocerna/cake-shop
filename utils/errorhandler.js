const { BAD_REQUEST, UNAUTHORIZED, INTERNAL_SERVER_ERROR } = require('http-status-codes');

/**
 *
 * @param {String} type
 * @param {String} message
 * @param {Number} status
 * @returns {Object}
 * get an error status code and message
 */
const getResponse = (type = '', message = '', status = INTERNAL_SERVER_ERROR) => ({
  status,
  error: { type, message },
});

/**
 *
 * @param {String} type
 * @param {String} message
 * evalue mongoose errors
 */
const mongooseError = (type, message) => {
  if (type === 'CastError') {
    return getResponse(type, message, BAD_REQUEST);
  }
  if (type === 'ValidationError') {
    return getResponse(type, message, BAD_REQUEST);
  }
  return getResponse(type, message);
};

/**
 *
 * @param {Object} err
 * evalue an error
 */
const evalueError = (err) => {
  const instance = err.constructor.name;
  const type = err.name;
  const { code, message } = err;
  if (code) {
    return { status: code, error: { code, message } };
  }

  if (instance === 'MongooseError') {
    return mongooseError(type, message);
  }

  if (instance === 'MongoError') {
    return mongooseError(type, message);
  }

  if (type === 'ValidationError') {
    return getResponse(type, message, BAD_REQUEST);
  }

  if (type === 'Error') {
    return getResponse(type, message, BAD_REQUEST);
  }

  return getResponse(type, type);
};

/**
 *
 * @param {Object} err
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * response an error
 */
// eslint-disable-next-line
const globalErrors = (err, req, res, next) => {
  const { status, error } = evalueError(err);
  return res.status(status).json(error);
};

module.exports = globalErrors;
