// example joi schemas registry
import Joi from 'joi';
import assert from 'assert';

// should be an instance of `Map()`
const schemas = {
  GET: {},
  PUT: {},
  PATCH: {},
  POST: {},
  DEL: {},
};

function byPath(method, path) {
  assert(method);
  assert(path);
  
  return schemas[method][path];
}

function register(method, path, schema) {
  assert(method);
  assert(path);
  assert(schema);

  method = method.toUpperCase();
  schemas[method][path] = schema;
}

// GET /test/:id
const testSchema = Joi.object().keys({
  foo: Joi.string().required().label('foo'),
  test: Joi.string().required(),
  id: Joi.string().required()
});

register('get', '/test/:id', testSchema);

module.exports = { byPath }
