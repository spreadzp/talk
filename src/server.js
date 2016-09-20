
 module.exports = function (db) {
  var express = require('express');
  var morgan = require('morgan'); // logger
  var bodyParser = require('body-parser');
  var config   = require('./app/config');

  var app = express();
  var forum = require('./server/routes/forum.route.js');
  var all = require('./server/routes/default.route.js');

  //app.set('port', (process.env.PORT || config.get('port')));  
  app.use('/', express.static(__dirname + '/public'));
  //app.use('/*', express.static(__dirname + '/public'));
  app.use('/scripts', express.static(__dirname + '/../node_modules'));
  app.use('/bundle', express.static(__dirname + '/bundle'));
  app.use('/app', express.static(__dirname + '/app'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(morgan('dev')); 
  app.use('/forum', forum);
  app.use('/*',all); 
 return app; 
}
 
 
 