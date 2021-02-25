const crypto = require('crypto');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const mail = require('../handlers/mail');

exports.isLoggedIn = (req, res, next) => {
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

exports.sendEmailConfirmationLink = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if(!user){
    req.flash('error', `${res.locals.layout.flash_no_account_with_email_exist}`);
    return res.redirect('back');
  }
  user.confirmEmailToken = crypto.randomBytes(20).toString('hex');
  user.confirmEmailExpires = Date.now() + 3600000;
  await user.save();
  mail.send({
    participant: user,
    subject: 'Email confirmation',
    resetURL: `https://${req.headers.host}/account/confirm/${user.confirmEmailToken}`,
    filename: 'email-confirmation-' + res.locals.locale_language
  });
  req.flash('success', `${res.locals.layout.flash_sent_confirm_email_ink}`);
  res.redirect('/account');
}

exports.confirmEmail = async (req, res) => {
  const user = await User.findOne({
    confirmEmailToken: req.params.token,
    confirmEmailExpires: { $gt: Date.now() } // greater than
  });
  if(!user){
    req.flash('error', `${res.locals.layout.flash_confirm_email_invalid}`);
    res.redirect('/account');
  } else {
    user.emailIsConfirmed = true;
    user.confirmEmailToken = undefined;
    user.confirmEmailExpires = undefined;
    await user.save();
    req.flash('success', `${res.locals.layout.flash_email_confrimed}`);
    res.redirect('/account');
  }
};

exports.logout = (req, res) => {
  req.logout();
  req.flash('success', `${res.locals.layout.flash_logged_out}`);
  res.redirect('/');
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
  user.local.password = user.generateHash(req.body.password);
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  const updatedUser = await user.save();
  await req.login(updatedUser); //login a user in
  req.flash('success', `${res.locals.layout.flash_password_is_reset}`);
  res.redirect('/');
};
