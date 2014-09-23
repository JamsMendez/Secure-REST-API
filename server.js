var path       = require('path'),
    express    = require('express'),
    bodyParser = require('body-parser'),
    jwt        = require('jwt-simple'),
    logger     = require('morgan'); 

var server = express();
var server.set('port', process.env.PORT || process.argv[2]);

server.use(logger('dev'));
server.use(bodyParser.json());

server.all('/*', function (req, res, next) {
  // CORS headers
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-type, Accept, X-Access-Token, X-Key');
  next();
});

var auth_middleware = [
  bodyParser.json(),
  require('./middlewares/validate-request.js')
];

server.all('/api/v1/*', auth_middleware);

server.use('/', require('./routes'));

// Si la ruta no fue creada, devuelve un 404
server.use(function (req, res, next) {
  var err = new Error('not found');
  err.status = 404;
  next(err);
});

server.listen(server.get('port'), function () {
  console.log('server in Express listening on port' + server.get('port'));
});