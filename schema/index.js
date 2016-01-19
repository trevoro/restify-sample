// example joi validator

import Joi from 'joi';

// GET /
const query =  Joi.object().keys({
  foo: Joi.string().required().label('fooFoo'),
  test: Joi.string().required()
})

module.exports = { query };
