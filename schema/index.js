// example joi validator

import Joi from 'joi';

let schemas = {};

function byPath(path) {
  return schemas[path];
}

// GET /test/:id
const query =  Joi.object().keys({
  foo: Joi.string().required().label('foo'),
  test: Joi.string().required()
})

schemas['/test/:id'] = query;

module.exports = { 
  query,
  byPath
}
