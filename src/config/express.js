const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const compress = require('compression');
const methodOverride = require('method-override');
const cors = require('cors');
const helmet = require('helmet');
const passport = require('passport');
const routes = require('../api/routes/v1');
const viewsRoutes = require('../api/routes/views');
const { logs } = require('./vars');
const strategies = require('./passport');
const error = require('../api/middlewares/error');

/**
* Express instance
* @public
*/
const app = express();

const SERVER_ADD = 'http://localhost:3000';
const APP_NAME = process.env.APP_NAME || 'ELMA CENTER';
app.locals.server = SERVER_ADD;
app.locals.appName = APP_NAME;

// request logging. dev: console | production: file
app.use(morgan(logs));

// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// gzip compression
app.use(compress());

// lets you use HTTP verbs such as PUT or DELETE
// in places where the client doesn't support it
app.use(methodOverride());

// secure apps by setting various HTTP headers
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

app.set('views', './src/views');
app.set('view engine', 'ejs');

// enable authentication
app.use(passport.initialize());
passport.use('jwt', strategies.jwt);
passport.use('facebook', strategies.facebook);
passport.use('google', strategies.google);


// mount api v1 routes
app.use('/v1', routes);

// mount views routes
app.use('/', viewsRoutes);

// enable static rendering
app.use('/static', express.static('./src/public'));
app.use('/file', express.static('./storage'));

// if error is not an instanceOf APIError, convert it.
app.use(error.converter);

// catch 404 and forward to error handler
app.use(error.notFound);

// error handler, send stacktrace only during development
app.use(error.handler);

module.exports = app;
