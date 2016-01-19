// error throwing pattern. looks like the assert library but lets us use Joi in
// the throw pattern way instead of continuation style. this is much simpler to
// use.

import Joi from 'joi';
import schema from '../schema';
import assert from 'assert';
import restify from 'restify';

const valid = {
  params: function(params, name, options = {}) {
    assert(params);
    assert(name);

    const joiSchema = schema[name];

    Joi.validate(params, joiSchema, options, (error, values) => {
      if (error) {
        const argumentErr = new restify.InvalidArgumentError({
          status: 409,
          message: 'invalid parameter arguments'
        });

        // Joi error details allow us to provide reasonable validation response.
        argumentErr.body.details = error.details.map((e) => { 
          return { message: e.message.replace(/"/g,"'") }
        });

        throw argumentErr;
      }
    });
  }
}

module.exports = valid;
