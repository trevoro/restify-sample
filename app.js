import restify from 'restify';
import bunyan from 'bunyan';
import valid from './lib/valid';

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

// middleware example
function auth(req, res, next) {
  if (!req.params.auth) {
    throw new restify.ForbiddenError('GFY');
  }
  next();
}

// global error handler. we just log and return error body to the client
// in development mode we could return a stack trace if you really wanted to.
server.on('uncaughtException', (req, res, route, error) => {
  req.log.error(error);
  res.send(error.statusCode, error.body);
});

// dummy route
server.get('/:id', auth, (req, res, next) => {
  valid.params(req.params, 'query', { allowUnknown: true });
  res.send(200, 'hello world');
});

server.listen(8080, () => {
  console.log('listening on 8080');
});
