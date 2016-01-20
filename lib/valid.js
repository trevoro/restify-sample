// error throwing pattern. looks like the assert library but lets us use Joi in
// the throw pattern way instead of continuation style. this is much simpler to
// use.
//
// Joi error details allow us to provide reasonable validation response.
// Otherwise, because we're passing by reference we just load the filtered
// params back into the object.

import Joi from 'joi';
import schema from '../schema';
import assert from 'assert';
import restify from 'restify';
import util from 'util';

function InvalidParameterError(details) {

  const restCode = 'InvalidParameterError';
  const message = 'invalid or missing parameters';

  restify.RestError.call(this, {
    restCode,
    message,
    statusCode: 409,
    body: {
      code: restCode,
      message,
      details
    },
    constructorOpt: InvalidParameterError
  });

  this.name = 'InvalidParameterError';
}

util.inherits(InvalidParameterError, restify.RestError);

    

const valid = {
  /*
  params: function(params, name, options = {}) {
    assert(params);
    assert(name);

    const joiSchema = schema[name];
    const result = Joi.validate(params, joiSchema, options);

    if (result.error) {
      const details = result.error.details.map((e) => { 
        e.message = e.message.replace(/"/g,"'");
        return e;
      });

      return new InvalidParameterError(details);
    } else {
      params = result.value;
    }
  },
  */

  req: function(req, options = {}) {
    assert(req);

    const path = req.route.path;
    const joiSchema = schema.byPath(path);
    const result = Joi.validate(req.params, joiSchema, options);

    if (result.error) {
      const details = result.error.details.map((e) => { 
        e.message = e.message.replace(/"/g,"'");
        return e;
      });

      return new InvalidParameterError(details);
    } else {
      req.params = result.value;
    }
  }
}

module.exports = valid.req;
