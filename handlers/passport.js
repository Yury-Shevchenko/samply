const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Project = mongoose.model('Project');
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github').Strategy;
const configAuth = require('../config/auth');
const language = require('../config/lang');

const makeOpenLabId = () => {
  const time = Date.now() / 1000 | 0;
  return time;
};

const defineLanguage = (headers) => {
  if(headers['accept-language']){
    const lang = headers['accept-language'].slice(0,2);
    if(lang == "de"){
      return 'german'
    } else if (lang  == "ru"){
      return 'russian'
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
passport.use('local-signup-participant', new LocalStrategy({
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
          newUser.openLabId = makeOpenLabId();
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

passport.use('local-signup-researcher', new LocalStrategy({
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
          newUser.openLabId = makeOpenLabId();
          newUser.level    = 11;
          newUser.email    = email;
          newUser.language = user_lang;
          newUser.local.password = newUser.generateHash(password);
          newUser.save(function(err) {
            if (err) throw err;
            return done(null, newUser);
          });
        }
  })})}
));

passport.use('local-login', new LocalStrategy({
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

passport.use('local-labjs-researcher', new LocalStrategy({
      usernameField : 'email',
      passwordField : 'password',
      passReqToCallback : true
    },
    function(req, email, password, done) {
      User.findOne({ email :  email }, function(err, user) {
          const user_lang = req.res.locals.locale_language;
          if (err) return done(err);
          if (!user) {
            var newUser = new User();
            newUser.openLabId = makeOpenLabId();
            newUser.level    = 11;
            newUser.email    = email;
            newUser.local.password = newUser.generateHash(password);
            newUser.language = user_lang;
            newUser.save(function(err) {
              if (err) throw err;
              return done(null, newUser, req.flash('signupMessage', `${language[user_lang]['passport'].registered_user}` ));
              });
          };
          if (user && !user.validPassword(password)) return done(null, false, req.flash('loginMessage', `${language[user_lang]['passport'].wrong_password}`));
          if (user) return done(null, user, req.flash('signupMessage', `${language[user_lang]['passport'].logged_in}` ));
      });
}));

//local strategy for the participant code
passport.use('local-code', new LocalStrategy({
      usernameField : 'code',
      passwordField : 'participantInProject',
      passReqToCallback : true
    },
    function(req, code, participantInProject, done) {
      User.findOne({ 'code.id' :  code }, function(err, user) {
        const user_lang = req.res.locals.locale_language;
        if (err) return done(err);
        if (user) {
          if (!user.validCode(code)) return done(null, false, req.flash('error', `${language[user_lang]['passport'].wrong_credentials}` ));
          if (user.participantInProject != req.body.participantInProject){
            user.participantInProject = req.body.participantInProject;
            user.save(function(err) {
              if (err) throw err;
              return done(null, user, req.flash('success', `${language[user_lang]['passport'].welcome_back}` )); // user found, return that user
            });
          } else {
            return done(null, user, req.flash('success', `${language[user_lang]['passport'].welcome_back}` )); // user found, return that user
          };
        } else {
          var newUser = new User();
          newUser.openLabId = makeOpenLabId();
          newUser.level    = 1;
          newUser.language = user_lang;
          newUser.code.id = code;
          newUser.code.password = newUser.generateHash(code);
          //add a unique code for the user
          if(req.body.participantInProject){
            newUser.participantInProject = req.body.participantInProject;
          };
          newUser.save(function(err) {
            if (err) throw err;
            return done(null, newUser, req.flash('success', `${language[user_lang]['passport'].registered_user}` ));
          });
        }
    });
}));

//Facebook strategy with facebook id
passport.use(new FacebookStrategy({
    clientID: configAuth.facebookAuth.clientID,
    clientSecret: configAuth.facebookAuth.clientSecret,
    callbackURL: configAuth.facebookAuth.callbackURL
  },
  (token, refreshToken, profile, done) => {
    process.nextTick(function() {
            User.findOne({ 'facebook.id' : profile.id }, function(err, user) {
                if (err)
                    return done(err);
                if (user) {
                    return done(null, user); // user found, return that user
                } else {
                    var newUser            = new User();
                    newUser.level    =  1;
                    newUser.openLabId = makeOpenLabId();
                    newUser.facebook.id    = profile.id; // set the users facebook id
                    newUser.facebook.token = token; // we will save the token that facebook provides to the user
                    newUser.facebook.name  = profile.displayName;
                    if (profile.emails && profile.emails[0].value) {
                      newUser.facebook.email = profile.emails[0].value;
                    }
                    // save our user to the database
                    newUser.save(function(err) {
                      if (err) throw err;
                      return done(null, newUser);
                    });
                }
            });
        });
    }));



//Google OAuth
passport.use(new GoogleStrategy({
        clientID        : configAuth.googleAuth.clientID,
        clientSecret    : configAuth.googleAuth.clientSecret,
        callbackURL     : configAuth.googleAuth.callbackURL
    },
    function(token, refreshToken, profile, done) {
        process.nextTick(function() {
            User.findOne({ 'google.id' : profile.id }, function(err, user) {
                if (err)
                    return done(err);
                if (user) {
                    return done(null, user);
                } else {
                    var newUser          = new User();
                    newUser.level    =  1;
                    newUser.openLabId = makeOpenLabId();
                    newUser.google.id    = profile.id;
                    newUser.google.token = token;
                    newUser.google.name  = profile.displayName;
                    if (profile.emails && profile.emails[0].value){
                      newUser.google.email = profile.emails[0].value; // pull the first email
                    }
                    newUser.save(function(err) {
                        if (err)
                            throw err;
                        return done(null, newUser);
                  });
              }
          });
      });
  }));

//github strategy
passport.use(new GitHubStrategy({
  clientID        : configAuth.githubAuth.clientID,
  clientSecret    : configAuth.githubAuth.clientSecret,
  callbackURL     : configAuth.githubAuth.callbackURL
  },
  function(token, refreshToken, profile, done) {
      process.nextTick(function() {
          User.findOne({ 'github.id' : profile.id }, function(err, user) {
              if (err)
                  return done(err);
              if (user) {
                  return done(null, user);
              } else {
                  var newUser          = new User();
                  newUser.level    =  1;
                  newUser.openLabId = makeOpenLabId();
                  newUser.github.id    = profile.id;
                  newUser.github.token = token;
                  newUser.github.name  = profile.displayName;
                  if (profile.email){
                    newUser.github.email = profile.email; // pull the first email
                  }
                  newUser.save(function(err) {
                      if (err)
                          throw err;
                      return done(null, newUser);
                });
            }
        });
    });
}));
