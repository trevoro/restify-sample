import restify from 'restify';
import util from 'util';

const MESSAGES = {
  404: 'resource not found, boi'
}

function byStatusCode(code, message, body) {
  message = message || MESSAGES[code] || '';
  return restify.errors.codeToHttpError(code, message, body);
}

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

module.exports = {
  InvalidParameterError,
  byStatusCode
};
