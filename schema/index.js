// example joi validator

import Joi from 'joi';

const schemas = new Map();

// GET /test/:id
const query =  Joi.object().keys({
  foo: Joi.string().required().label('foo'),
  test: Joi.string().required()
})

schemas.set('/test/:id', query);

module.exports = { query };
