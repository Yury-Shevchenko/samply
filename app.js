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

// create express app
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views')); // this is the folder where we keep our pug files
app.set('view engine', 'pug'); // we use the engine pug, mustache or EJS work great too

// serves up static files from the public folder. Anything in public/ will just be served up as the file it is
//app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));

//Agenda setup
// const agenda = new Agenda({
//   name:'open-lab-notifications',
//   db: {address: process.env.DATABASE, collection: 'Job'},
// });
// agenda.on('ready', function() {
//   console.log("Ok Lets get start");
//   agenda.start();
//   // agenda.jobs({name: 'notify'})
//   //   .then(res => {
//   //     console.log('Jobs', res);
//   //   })
// });
// // // agenda.start();
// async function graceful() {
//   console.log("The system is turning off...");
//   await agenda.stop();
//   process.exit(0);
// }
// process.on('SIGTERM', graceful);
// process.on('SIGINT' , graceful);

// var agenda = new Agenda({db: {address: process.env.DATABASE, collection: 'Job'}});
// app.use('/dash', Agendash(agenda));

app.post('/subscription/webhook', bodyParser.raw({ type: '*/*' }), userController.webhook);

// Takes the raw requests and turns them into usable properties on req.body
app.use(bodyParser.json({ limit: '500mb' }));
app.use(bodyParser.urlencoded({ extended: true }));

// Exposes a bunch of methods for validating data. Used heavily on userController.validateRegister
app.use(expressValidator());

// populates req.cookies with any cookies that came along with the request
app.use(cookieParser());

// Sessions allow us to store data on visitors from request to request
// This keeps users logged in and allows us to send flash messages
app.use(session({
  secret: process.env.SECRET,
  key: process.env.KEY,
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

// Passport JS is what we use to handle our logins
app.use(passport.initialize());
app.use(passport.session());

// The flash middleware
app.use(flash());

// pass variables to our templates + all requests
app.use((req, res, next) => {
  //Content security policy
  const noncevalue = crypto.randomBytes(20).toString('hex');
  res.setHeader('Content-Security-Policy', `worker-src http://localhost; script-src https://labjs-beta.netlify.com https://labjs.felixhenninger.com 'nonce-${noncevalue}' 'unsafe-eval' `);
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
        } else if (lang  == "ru"){
          res.locals.locale_language = 'russian'
          res.locals.l = language['russian'][path];
          res.locals.layout = language['russian']['layout'];
          res.locals.language = 'ru';
        } else {
          res.locals.locale_language = 'english'
          res.locals.l = language['english'][path];
          res.locals.layout = language['english']['layout'];
          res.locals.language = 'en';
        }
      }
    }
  };
  //console.log(res.locals);
  next();
});

// promisify some callback based APIs
app.use((req, res, next) => {
  req.login = promisify(req.login, req);
  next();
});


// After allllll that above middleware, we finally handle our own routes!
app.use('/', routes);

// If that above routes didnt work, we 404 them and forward to error handler
app.use(errorHandlers.notFound);

// One of our error handlers will see if these errors are just validation errors
app.use(errorHandlers.flashValidationErrors);

// Otherwise this was a really bad error we didn't expect! Shoot eh
if (app.get('env') === 'development') {
  /* Development Error Handler - Prints stack trace */
  app.use(errorHandlers.developmentErrors);
}

// production error handler
app.use(errorHandlers.productionErrors);

// done! we export it so we can start the site in start.js
module.exports = app;
