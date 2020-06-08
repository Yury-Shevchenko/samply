const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Project = mongoose.model('Project');
const LocalStrategy = require('passport-local').Strategy;

const language = require('../config/lang');

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

const makeRandomCodeForParticipant = () => {
  const randomCode = ('000' + getRandomInt(0, 10000)).slice(-4);
  return `${randomCode}-xxxx-xxxx-wxxx`.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

const makeRandomCodeForResearcher = () => {
  const randomCode = ('000' + getRandomInt(0, 10000)).slice(-4);
  return `research-${randomCode}-xxxx`.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

const defineLanguage = (headers) => {
  if(headers['accept-language']){
    const lang = headers['accept-language'].slice(0,2);
    if(lang == "de"){
      return 'german'
    } else {
      return 'english'
    }
  } else {
    return 'english'
  }
}

//id -> cookie
passport.serializeUser((user, done) => {
  done(null, user.id);
});

//cookie -> id
passport.deserializeUser((id, done) => {
  User.findById(id).then( (user) => {
    done(null, user);
  });
});

//local strategy with email
passport.use('website-signup-participant', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback : true // allows us to pass back the entire request to the callback
  },
  async function(req, email, password, done) {
    process.nextTick(function() {
      User.findOne({ email :  email }, function(err, user) {
        const user_lang = req.res.locals.locale_language;
        if (req.body.password !== req.body['password-confirm']) {
          return done(null, false, req.flash('signupMessage', `${language[user_lang]['passport'].passwords_mismatch}` ));
        }
        if (err) return done(err);
        if (user) {
          if (!user.validPassword(password)) return done(null, false, req.flash('loginMessage', `${language[user_lang]['passport'].wrong_credentials}`));
          return done(null, user);
        } else {
          var newUser = new User();
          newUser.name    = req.body.name;
          newUser.samplyId = makeRandomCodeForParticipant();
          newUser.level    = 1;
          newUser.email    = email;
          newUser.language = user_lang;
          if(req.body.code) newUser.code.id = req.body.code;
          if(req.body.project) newUser.participantInProject = req.body.project;
          newUser.local.password = newUser.generateHash(password);
          newUser.save(function(err) {
            if (err) throw err;
            return done(null, newUser);
          });
        }
  })})}
));

passport.use('website-signup-researcher', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback : true // allows us to pass back the entire request to the callback
  },
  function(req, email, password, done) {
    process.nextTick(function() {
      User.findOne({ email :  email }, function(err, user) {
        const user_lang = req.res.locals.locale_language;
        if (req.body.password !== req.body['password-confirm']) {
          return done(null, false, req.flash('signupMessage', `${language[user_lang]['passport'].passwords_mismatch}`));
        }
        if (err) return done(err);
        if (user) {
          if (!user.validPassword(password)) return done(null, false, req.flash('loginMessage', `${language[user_lang]['passport'].wrong_credentials}`));
          return done(null, user);
        } else {
          var newUser = new User();
          newUser.name    = req.body.name;
          newUser.samplyId = makeRandomCodeForResearcher();
          newUser.level    = 11;
          newUser.email    = email;
          newUser.language = user_lang;
          newUser.local.password = newUser.generateHash(password);
          newUser.useragent = req.headers['user-agent'] || 'no headers found';
          newUser.save(function(err) {
            if (err) throw err;
            return done(null, newUser);
          });
        }
  })})}
));

passport.use('website-login', new LocalStrategy({
      usernameField : 'email',
      passwordField : 'password',
      passReqToCallback : true
    },
    function(req, email, password, done) {
      User.findOne({ email :  email }, function(err, user) {
          const user_lang = req.res.locals.locale_language;
          if (err) return done(err);
          if (!user) return done(null, false, req.flash('loginMessage', `${language[user_lang]['passport'].no_user_found}`));
          if (!user.validPassword(password)) return done(null, false, req.flash('loginMessage', `${language[user_lang]['passport'].wrong_password}`));
          return done(null, user);
      });
}));

// passport.use('local-labjs-researcher', new LocalStrategy({
//       usernameField : 'email',
//       passwordField : 'password',
//       passReqToCallback : true
//     },
//     function(req, email, password, done) {
//       User.findOne({ email :  email }, function(err, user) {
//           const user_lang = req.res.locals.locale_language;
//           if (err) return done(err);
//           if (!user) {
//             var newUser = new User();
//             newUser.samplyId = makeSamplyId();
//             newUser.level    = 11;
//             newUser.email    = email;
//             newUser.local.password = newUser.generateHash(password);
//             newUser.language = user_lang;
//             newUser.useragent = req.headers['user-agent'] || 'no headers found';
//             newUser.save(function(err) {
//               if (err) throw err;
//               return done(null, newUser, req.flash('signupMessage', `${language[user_lang]['passport'].registered_user}` ));
//               });
//           };
//           if (user && !user.validPassword(password)) return done(null, false, req.flash('loginMessage', `${language[user_lang]['passport'].wrong_password}`));
//           if (user) return done(null, user, req.flash('signupMessage', `${language[user_lang]['passport'].logged_in}` ));
//       });
// }));

//local strategy for the participant code
// passport.use('local-code', new LocalStrategy({
//       usernameField : 'code',
//       passwordField : 'participantInProject',
//       passReqToCallback : true
//     },
//     function(req, code, participantInProject, done) {
//       User.findOne({ 'code.id' :  code }, function(err, user) {
//         const user_lang = req.res.locals.locale_language;
//         if (err) return done(err);
//         if (user) {
//           if (!user.validCode(code)) return done(null, false, req.flash('error', `${language[user_lang]['passport'].wrong_credentials}` ));
//           if (user.participantInProject != req.body.participantInProject){
//             user.participantInProject = req.body.participantInProject;
//             user.save(function(err) {
//               if (err) throw err;
//               return done(null, user, req.flash('success', `${language[user_lang]['passport'].welcome_back}` )); // user found, return that user
//             });
//           } else {
//             return done(null, user, req.flash('success', `${language[user_lang]['passport'].welcome_back}` )); // user found, return that user
//           };
//         } else {
//           var newUser = new User();
//           newUser.samplyId = makeSamplyId();
//           newUser.level    = 1;
//           newUser.language = user_lang;
//           newUser.code.id = code;
//           newUser.code.password = newUser.generateHash(code);
//           newUser.useragent = req.headers['user-agent'] || 'no headers found';
//           //add a unique code for the user
//           if(req.body.participantInProject){
//             newUser.participantInProject = req.body.participantInProject;
//           };
//           newUser.save(function(err) {
//             if (err) throw err;
//             return done(null, newUser, req.flash('success', `${language[user_lang]['passport'].registered_user}` ));
//           });
//         }
//     });
// }));
