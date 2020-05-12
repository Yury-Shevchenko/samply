const mongoose = require('mongoose');
const promisify = require('es6-promisify');
const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');
const multer = require('multer');
const moment = require('moment');
const uniqid = require('uniqid');
const crypto = require('crypto');
const User = mongoose.model('User');
const Result = mongoose.model('Result');
const Project = mongoose.model('Project');

const mail = require('../handlers/mail');
const webpush = require('web-push');
const formidable = require('formidable');
const fs = require('fs');
const schedule = require('node-schedule');

// exports.code = async (req, res) => {
//   let joined_project, projects, temporary_code;
//   if(req.params.project){
//     // the specific project was requested
//     joined_project = await Project.findOne({ name: req.params.project });
//     // user is logged in
//     if(req.user && req.user.level & req.user.level < 10){
//       // the project exists
//       if (joined_project && joined_project._id){
//         User.findById(req.user._id, (err, user) => {
//           user.participantInProject = joined_project._id;
//           user.save((saveErr, updatedUser) => {
//             if(saveErr) {
//               console.log("Authorisation error", saveErr);
//             }
//             res.redirect('/testing');
//           });
//         });
//       } else {
//         // no project found
//         req.flash('error', `There is no project with the name ${req.params.project} found. Please choose the project from the list.`);
//         res.redirect('/studies');
//       }
//     } else {
//       // user is not logged in
//       if (joined_project && joined_project._id){
//         // project exists
//         if(req.query.generate == 'true'){
//           if (req.params.code){
//             temporary_code = uniqid() + '-' + req.params.code;
//           } else {
//             temporary_code = uniqid();
//           }
//         };
//         res.render('code', {title: 'Enter with code', message: req.flash('codeMessage'), projects, joined_project, code: temporary_code || req.params.code});
//       } else {
//         // no project found
//         req.flash('error', `There is no project with the name ${req.params.project} found. Please choose the project from the list.`);
//         res.redirect('/code');
//       }
//     }
//   } else {
//     // the project was not specified
//     if(req.user){
//       // user is logged in
//       res.redirect('/studies');
//     } else {
//       // user is not logged in
//       projects = await Project.getCurrentProjects();
//       res.render('code', {title: 'Enter with code', message: req.flash('codeMessage'), projects, joined_project, code: temporary_code || req.params.code});
//     }
//   };
// };
//
// exports.sign = async (req, res) => {
//   let projectId;
//   if(req.params.project){
//     const project = await Project.findOne({ name: req.params.project });
//     if (project) projectId = project._id
//   }
//   res.render('sign', {title: 'Sign in', message: req.flash('signupMessage'), project: projectId, code: req.params.code})
// };

exports.account = async (req, res) => {
  const projects = await Project.getCurrentProjects();
  res.render('account', {title: 'Edit Your Account', projects: projects});
};

exports.updateWebsiteAccount = async (req, res) => {
  User.findById(req.user._id, (err, user) => {
    if(req.body.participantInProject == '') {req.body.participantInProject = user.participantInProject};
    user.set(req.body);
    user.save((saveErr, updatedUser) => {
      if (saveErr) {
        req.flash('error', `${res.locals.layout.flash_profile_error_update}`);
      } else {
        req.flash('success', `${res.locals.layout.flash_profile_updated}`);
      }
      res.redirect('back');
    });
  });
};

exports.changeLanguage = (req, res) => {
  const lang = req.params.language;
  if(req.user){
    User.findById(req.user._id, (err, user) => {
      user.set({ language: lang });
      user.save((saveErr, updatedUser) => {
        if (saveErr) {
          req.flash('error', `${res.locals.layout.flash_profile_error_update}`);
        } else {
          req.flash('success', `${res.locals.layout.flash_profile_updated}`);
        }
        res.redirect('back');
      });
    });
  } else {
    req.session.visitor_language = lang;
    req.flash('success', `${res.locals.layout.flash_language_changed}`);
    res.redirect('back');
  }
};

exports.sendQuestion= async (req, res) => {
  const window = (new JSDOM('')).window;
  const DOMPurify = createDOMPurify(window);
  const question = DOMPurify.sanitize(req.body.question);
  const researcher = {
    email: req.user.email || '',
    name: req.user.name || '',
    institute: req.user.institute || '',
    language: req.user.language,
    created: req.user.created,
    level: req.user.level || '',
    samplyId: req.user.samplyId || '',
    code: (req.user.code && req.user.code.id) || '',
  };
  await mail.sendQuestion({
    researcher,
    question,
    filename: 'question'
  });
  req.flash('success', `${res.locals.layout.flash_question_sent}`);
  res.redirect('back');
}

exports.help = async(req, res) => {
  res.render('help');
}

const makeRandomCode = () => {
    return 'xxxx-xxxx-xxxx-mxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

exports.createMobileAccount = async(req, res) => {
  const userData = req.body;
  User.findOne({ 'email' :  userData.email }, function(err, user) {
    if (err) return done(err);
    if (user) {
      res.status(400).json({message: 'Account exists'});
    } else {
      var newUser = new User();
      newUser.level = 1;
      newUser.email = userData.email;
      newUser.local.password = newUser.generateHash(userData.password);
      const userToken = makeRandomCode();
      newUser.samplyId = userToken;
      newUser.save(function(err) {
        if (err) throw err;
        res.status(200).json({message: 'OK', userToken: userToken});
      });
    }
  });
}

exports.loginMobileAccount = async(req, res) => {
  const userData = req.body;
  User.findOne({ 'email' :  userData.email }, function(err, user) {
    if (err) return done(err);
    if (user) {
      if(user.validPassword(userData.password)){
        res.status(200).json({message: 'OK', userToken: user.samplyId});
      } else {
        res.status(400).json({message: 'Invalid password'});
      }
    } else {
      res.status(400).json({message: 'No user'});
    }
  });
}

exports.getMyStudies = async(req, res) => {
  const userData = req.body;
  console.log('get my studies userData', userData);
  const user = await User.findOne({ samplyId: userData.token },{
    participant_projects: 1,
  });
  const studies = user.participant_projects;
  console.log('user', user);
  res.status(200).json({message: 'OK', studies: studies});
}

exports.updateAccount = async(req, res) => {
  const userData = req.body;
  console.log('update account with the info', userData);
  const user = await User.findOne({ samplyId: userData.token },{
    information: 1,
  });
  const data = userData.data;
  user.information = { ...user.information, ...data };
  await user.save();
  res.status(200).json({message: 'OK', information: user.information});
}

exports.resetPassword = async(req, res) => {
  const user = await User.findOne({email: req.body.email});
  if(!user){
    res.status(400).json({message: 'No user'});
    return;
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
  res.status(200).json({message: 'OK'});
}
