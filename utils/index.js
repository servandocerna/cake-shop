const { NODE_ENV } = process.env;

/**
 * @param {String} environment
 * @returns {Boolean}
 */
const isProductionEnvironment = (environment = NODE_ENV) => environment === 'PRODUCTION';

module.exports = {
  isProductionEnvironment
};