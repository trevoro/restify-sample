import restify from 'restify';
import assert from 'assert';
import error from './error';

const log = { trace: console.log };

function promiseFor(self, method, uri, body) {
  log.trace(`-- HTTP ${method.toUpperCase()}`);
  log.trace(`-- uri: [${uri}]`);
  if (body) {
    log.trace(`-- body: [${JSON.stringify(body)}]`);
  }

  return new Promise((resolve, reject) => {
    const cb = (err, req, res, obj) => {
      if (err) {
        // we sanitize all proxied errors here
        reject(new error.byStatusCode(err.statusCode))
      } else {
        resolve(obj);
      }
    }

    if (body) {
      self.client[method](uri, body, cb);
    } else {
      self.client[method](uri, cb);
    }
  });

}

export class RestClient {
  constructor(req, opts={}) {
    this._req = req;
    this.client = restify.createJsonClient({
      accept: 'application/json',
      url: 'http://localhost:8000'
    })
  }

  head(path) {
    assert.ok(path);
    return promiseFor(this, 'head', path);
  }

  del(path) {
    assert.ok(path);
    return promiseFor(this, 'del', path);
  }

  get(path) {
    assert.ok(path);
    return promiseFor(this, 'get', path);
  }

  put(path, body) {
    assert.ok(path);
    assert.ok(body);
    return promiseFor(this, 'put', path, body);
  }

  post(path, body) {
    assert.ok(path);
    assert.ok(object);
    return promiseFor(this, 'post', path, body);
  }

}

module.exports = RestClient;
