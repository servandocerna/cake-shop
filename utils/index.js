const { NODE_ENV } = process.env;

/**
 * @param {String} environment
 * @returns {Boolean}
 */
const isProductionEnvironment = (environment = NODE_ENV) => environment === 'PRODUCTION';

/**
 * @param {String} environment
 * @returns {Boolean}
 */
const isTestingEnvironment = (environment = NODE_ENV) => environment === 'test';

module.exports = {
  isProductionEnvironment,
  isTestingEnvironment
};