const passport = require('passport');
const crypto = require('crypto');
const mongoose = require('mongoose');
const promisify = require('es6-promisify');
const User = mongoose.model('User');
const mail = require('../handlers/mail');

exports.logout = (req, res) => {
  req.logout();
  req.flash('success', `${res.locals.layout.flash_logged_out}`);
  res.redirect('/');
};

exports.isLoggedIn = (req, res, next) => {
  console.log("the user is authenticated", req.isAuthenticated());
  if(req.isAuthenticated()){
    next();
    return;
  }
  req.flash('error', `${res.locals.layout.flash_must_be_logged}`);
  res.redirect('/participant/login');
};

exports.isAdminLoggedIn = (req, res, next) => {
  if(req.isAuthenticated() && req.user.level>10){
    next();
    return;
  }
  req.flash('error', `${res.locals.layout.flash_must_be_logged}`);
  res.redirect('/researcher/login');
};

exports.checkResearcherLogin = async (req, res, next) => {
  if(req.isAuthenticated() && req.user.level > 10){
    next();
    return;
  } else {
    if(req.body.email && req.body.password){
      passport.authenticate('local-labjs-researcher', function(err, user, info) {
        if (err) { return next(err); }
        if (!user) { return res.redirect('back'); }
        req.logIn(user, function(err) {
          if (err) { return next(err); }
          next();
        });
      })(req, res, next);
    } else {
      req.flash('error', `${res.locals.layout.flash_must_be_logged_add_test}`);
      res.redirect('back');
    }
  }
};

exports.isSuperAdminLoggedIn = (req, res, next) => {
  if(req.isAuthenticated() && req.user.level > 100){
    next();
    return;
  }
  req.flash('error', `${res.locals.layout.flash_must_be_admin}`);
  res.redirect('/login');
};

exports.forgot = async (req, res) => {
  const user = await User.findOne({email: req.body.email});
  if(!user){
    req.flash('error', `${res.locals.layout.flash_no_account_with_email_exist}`);
    return res.redirect('back');
  }
  user.resetPasswordToken = crypto.randomBytes(20).toString('hex');
  user.resetPasswordExpires = Date.now() + 3600000; //1 hour to reset the password
  await user.save();
  const resetURL = `https://${req.headers.host}/account/reset/${user.resetPasswordToken}`;
  const subject = res.locals.layout.flash_password_reset;
  await mail.send({
    participant: user,
    subject,
    resetURL,
    filename: 'password-reset-' + res.locals.locale_language
  });
  req.flash('success', `${res.locals.layout.flash_email_recovery_link}`);
  res.redirect('back');
};

exports.reset = async (req, res) => {
  const user = await User.findOne({
    resetPasswordToken: req.params.token,
    resetPasswordExpires: { $gt: Date.now() } //greater than
  });
  if(!user){
    req.flash('error', `${res.locals.layout.flash_reset_invalid}`);
    return res.redirect('/login');
  };
  res.render('reset', {title: 'Reset Your Password'});
};

exports.confirmedPasswords = (req, res, next) => {
  if(req.body.password === req.body['password-confirm']){
    next();
    return;
  }
  req.flash('error', `${res.locals.layout.flash_passwords_mismatch}`);
  res.redirect('back');
};

exports.update = async (req, res) => {
  const user = await User.findOne({
    resetPasswordToken: req.params.token,
    resetPasswordExpires: { $gt: Date.now() } //greater than
  });
  if(!user){
    req.flash('error', `${res.locals.layout.flash_reset_invalid}`);
    return res.redirect('/login');
  };
  //update the user
  user.local.password = user.generateHash(req.body.password);
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  const updatedUser = await user.save();
  await req.login(updatedUser); //login a user in
  req.flash('success', `${res.locals.layout.flash_password_is_reset}`);
  res.redirect('/');
};
