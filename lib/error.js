import restify from 'restify';

const MESSAGES = {
  404: 'resource not found, boi'
}

function byStatusCode(code, message, body) {
  message = message || MESSAGES[code] || '';
  return restify.errors.codeToHttpError(code, message, body);
}

module.exports = { byStatusCode };
