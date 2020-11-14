const { body, validationResult } = require('express-validator');
const { BAD_REQUEST} = require('http-status-codes');

const formatErrors = errors => {
  const newErros = [...errors].map(error => {
    const { param, value } = error;
    const lastPram = param.split('.').pop();
    const message = `${lastPram}: ${value}`;
    return { code: 'INVALID_PARAMETER', message };
  });
  return newErros;
};

const validateMiddleware = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const formatedErrors = formatErrors(errors.array());
    return res.status(BAD_REQUEST).json({ errors: formatedErrors });
  }
  return next();
};

const validate = params => [params, validateMiddleware];

const validateCreateCakeBody = [
  body('name')
    .not().isEmpty()
    .isString()
    .trim(),

   body('price')
    .not().isEmpty()
    .isNumeric()
    .trim(),

    body('flavors')
    .not().isEmpty()
    .isArray()
];

module.exports = {
  storeCakeValidator: validate(validateCreateCakeBody)
}
