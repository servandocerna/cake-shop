const { BAD_REQUEST, UNAUTHORIZED, INTERNAL_SERVER_ERROR } = require('http-status-codes');

/**
 *
 * @param {String} type
 * @param {String} message
 * @param {Number} status
 * @returns {Object}
 * get an error status code and message
 */
const getResponse = (type = '', message = '', status = INTERNAL_SERVER_ERROR) => {
  return {
    status,
    error: { type, message },
  }
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
  if (type === 'Error') {
    return getResponse(code, message, BAD_REQUEST);
  }
  return getResponse(type, message, BAD_REQUEST);
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
