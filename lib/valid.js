// Joi-Restify middleware handler.
//
// Joi error details allow us to provide reasonable validation response.
// Otherwise, because we're passing by reference we just load the filtered
// params back into the object.

import Joi from 'joi';
import assert from 'assert';
import error from './error'
import schema from '../schema';

function validReq(req, options = {}) {
  assert(req);

  const path = req.route.path;
  const joiSchema = schema.byPath(req.method, path);

  if (!joiSchema) {
    console.error('no schema for path:', path);
    return;
  }

  const result = Joi.validate(req.params, joiSchema, options);

  if (result.error) {
    const details = result.error.details.map((e) => { 
      e.message = e.message.replace(/"/g,"'");
      return e;
    });

    return new error.InvalidParameterError(details);
  } else {
    req.params = result.value;
  }
}

module.exports = validReq;
