import restify from 'restify';
import bunyan from 'bunyan';
import valid from './lib/valid';
import RestClient from './lib/client';

const server = restify.createServer({
  name: 'apiTest',
  log: bunyan.createLogger({ 
    name: 'apiTest'
  })
});

server.pre(restify.pre.userAgentConnection());
server.use(restify.requestLogger());
server.use(restify.jsonBodyParser());
server.use(restify.queryParser());
server.use(restify.acceptParser(server.acceptable));

// middleware example
function auth(req, res, next) {
  if (!req.params.auth) {
    throw new restify.ForbiddenError('GFY');
  }
  next();
}

// allows us to log exceptions globally if we dont attach a
// `.catch()` handler to a promise.
process.on('unhandledRejection', (error, promise) => {
  console.error('== error: unhandledRejection');
  console.error(error.stack);
});

server.on('uncaughtException', (req, res, route, error) => {
  console.error(error.stack);
  res.send(error);
});

/*
// example of how you could listen to a custom request
server.on('InvalidParameter', (req, res, err, next) => {
  console.log('asdfasdfasdf');
});
*/

// dummy routes
server.get('/test/:id', auth, (req, res, next) => {
  next.ifError(valid.params(req.params, 'query'));
  res.send(200, 'hello world');
});

server.get('/index.json', (req, res, next) => {
  res.send(200, { hello: 'world' });
});

server.get('/localhost', (req, res, next) => {
  const client = new RestClient();
  client.get('/index.json')
    .then((body) => {
      res.send(200, body);
    })
    .catch(next);
});

server.listen(8080, () => {
  console.log('listening on 8080');
});
