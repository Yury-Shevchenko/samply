const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');
const promisify = require('es6-promisify');
const flash = require('connect-flash');
const expressValidator = require('express-validator');
const routes = require('./routes/index');
const helpers = require('./helpers');
const errorHandlers = require('./handlers/errorHandlers');
require('./handlers/passport');
const language = require('./config/lang');
const userController  = require('./controllers/userController');
const crypto = require('crypto');
const Agenda = require('agenda');
const Agendash = require('agendash');

const app = express();
app.set('views', path.join(__dirname, 'views')); // this is the folder where we keep our pug files
app.set('view engine', 'pug'); // we use the engine pug, mustache or EJS work great too
app.use(express.static('public'));
app.use(cookieParser());
app.use(bodyParser.json({ limit: '500mb' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());

app.use(session({
  secret: process.env.SECRET,
  key: process.env.KEY,
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use((req, res, next) => {
  const noncevalue = crypto.randomBytes(20).toString('hex');
  res.setHeader('Content-Security-Policy', `worker-src http://localhost https://samply.uni-konstanz.de script-src https://samply.uni-konstanz.de 'nonce-${noncevalue}' 'unsafe-eval' `);
  res.locals.noncevalue = noncevalue;
  res.locals.h = helpers;
  res.locals.flashes = req.flash();
  res.locals.user = req.user || null;
  res.locals.currentPath = req.path;
  res.locals.visitor_language = req.session.visitor_language;
  const path = String(req.path).split('/')[1] || 'index';
  if (res.locals.user != null && res.locals.user.language && language[res.locals.user.language]){
    res.locals.l = language[res.locals.user.language][path] || language['english'][path];
    res.locals.layout = language[res.locals.user.language]['layout'] || language['english']['layout'];
    res.locals.language = res.locals.user.language.substring(0,2);
    if(res.locals.language == 'ge'){res.locals.language = 'de'};
  } else {
    if (res.locals.visitor_language){
      const visitor_lang = res.locals.visitor_language;
      res.locals.locale_language = visitor_lang || 'english';
      res.locals.l = language[visitor_lang][path] || language['english'][path];
      res.locals.layout = language[visitor_lang]['layout'] || language['english']['layout'];
      res.locals.language = visitor_lang.substring(0,2);
      if(res.locals.language == 'ge'){res.locals.language = 'de'};
    } else {
      if(req.headers && req.headers['accept-language']){
        const lang = req.headers['accept-language'].slice(0,2);
        if(lang == "de"){
          res.locals.locale_language = 'german'
          res.locals.l = language['german'][path];
          res.locals.layout = language['german']['layout'];
          res.locals.language = 'de';
        } else {
          res.locals.locale_language = 'english'
          res.locals.l = language['english'][path];
          res.locals.layout = language['english']['layout'];
          res.locals.language = 'en';
        }
      }
    }
  };
  next();
});

app.use((req, res, next) => {
  req.login = promisify(req.login, req);
  next();
});
app.use('/', routes);
app.use(errorHandlers.notFound);
app.use(errorHandlers.flashValidationErrors);
if (app.get('env') === 'development') {
  app.use(errorHandlers.developmentErrors);
}
app.use(errorHandlers.productionErrors);

module.exports = app;
