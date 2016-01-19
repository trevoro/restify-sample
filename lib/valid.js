// error throwing pattern. looks like the assert library but lets us use Joi in
// the throw pattern way instead of continuation style. this is much simpler to
// use.

import Joi from 'joi';
import schema from '../schema';
import assert from 'assert';
import restify from 'restify';
import util from 'util';

function InvalidParameterError(details) {

  const restCode = 'InvalidParameter';
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

  this.name = 'InvalidParameter';
}

util.inherits(InvalidParameterError, restify.RestError);

const valid = {
  params: function(params, name, options = {}) {
    assert(params);
    assert(name);

    const joiSchema = schema[name];

    Joi.validate(params, joiSchema, options, (error, values) => {
      if (error) {
        // Joi error details allow us to provide reasonable validation response.
        const details = error.details.map((e) => { 
          return { message: e.message.replace(/"/g,"'") }
        });

        throw new InvalidParameterError(details);
      }
    });
  }
}

module.exports = valid;
