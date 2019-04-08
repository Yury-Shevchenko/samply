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
const Test = mongoose.model('Test');
const Project = mongoose.model('Project');
const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const assemble = require('../handlers/assemble');
const mail = require('../handlers/mail');
const webpush = require('web-push');
const formidable = require('formidable');
const fs = require('fs');
const schedule = require('node-schedule');

exports.login = (req, res) => {
  res.render('login', {title: 'Login', message: req.flash('loginMessage')})
};

exports.loginResearcher = (req, res) => {
  res.render('loginResearcher', {title: 'Login', message: req.flash('loginMessage')})
};

exports.sign = async (req, res) => {
  let projectId;
  if(req.params.project){
    const project = await Project.findOne({ name: req.params.project });
    if (project) projectId = project._id
  }
  res.render('sign', {title: 'Sign in', message: req.flash('signupMessage'), project: projectId, code: req.params.code})
};

exports.code = async (req, res) => {
  let joined_project, projects;
  if(req.params.project){
    joined_project = await Project.findOne({ name: req.params.project });
  } else {
    projects = await Project.getCurrentProjects();
  };
  let temporary_code;
  if(req.query.generate == 'true'){
    if (req.params.code){
      temporary_code = uniqid() + '-' + req.params.code;
    } else {
      temporary_code = uniqid();
    }
  };
  res.render('code', {title: 'Enter with code', message: req.flash('codeMessage'), projects, joined_project, code: temporary_code || req.params.code});
};

exports.register = (req, res) => {
  res.render('register', {title: 'Register'});
};

exports.account = async (req, res) => {
  const projects = await Project.getCurrentProjects();
  res.render('account', {title: 'Edit Your Account', projects: projects});
};

const multerOptions = {
  storage: multer.memoryStorage(),
  fileFilter(req, file, next) {
    const isOk = file.mimetype.startsWith('application/json');
    if(isOk){
      next(null, true);
    } else {
      next( { message: 'That filetype is not allowed '}, false);
    }
  }
};

exports.uploadfromlabjs = multer(multerOptions).fields([
  {name: 'script'}
]);

exports.labjs = async (req, res) => {
  if(req.files.script){
      if(req.user){
        req.body.author = req.user._id;
      };
      const prod = req.headers.referer == 'https://labjs-beta.netlify.com/' ? 'beta': 'alpha';//check from where the upload comes
      const json_string = req.files.script[0].buffer.toString();
      const json = JSON.parse(json_string);
      const script = await assemble.convertJSON(json, req.body.name, production = prod);
      req.body.file = script.files.script.content.data;
      req.body.css = script.files['style.css'].content;
      req.body.params = script.params;
      req.body.production = script.production;
      req.body.labjsVersion = json.version;
      req.body.json = json_string;
      req.body.open = false;
      req.body.token = crypto.randomBytes(20).toString('hex');
      req.body.tokenExpires = Date.now() + 3600000; //1 hour to upload the test
      req.body.created = new Date().toISOString();
      req.body.scriptUpdated = new Date().toISOString();
      const test = await (new Test(req.body)).save();
      req.flash('success', `${res.locals.layout.flash_labjs_upload_success} <strong>${req.body.name}</strong>. ${res.locals.layout.flash_labjs_edit_message}`);
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'POST');
      res.redirect(`/tests/labjs/${req.body.token}/edit`);
  } else {
    res.sendStatus(500);
  }
};

exports.editlabjsupload = async (req, res) => {
  const test = await Test.findOne({
    token: req.params.token,
    tokenExpires: { $gt: Date.now() }
  });
  if(!test){
    req.flash('error', `${res.locals.layout.flash_labjs_upload_invalid}`);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    return res.redirect('/login');
  };
  // req.flash('success', `${res.locals.layout.flash_labjs_finalize}`);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.render('editlabjsupload', {test});
};

exports.updateAccount = async (req, res) => {
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

//for administrators
exports.getData = async (req, res) => {
  const activeProjectPromise = Project.findOne({_id: req.user.project._id},{
    invitations: 1, showCompletionCode: 1,
  });
  const page = parseInt(req.params.page) || 1;
  const limit = 50;
  const skip = (page * limit) - limit;
  const usersPromise = User
    .getUsersOfProject(req.user.project._id)
    .sort( {created: 'asc'} )
    .skip(skip)
    .limit(limit);
  const countPromise = User.countDocuments({$or: [{participantInProject: req.user.project._id}, {participant_projects: req.user.project._id}]});
  const [users, count, project] = await Promise.all([ usersPromise, countPromise, activeProjectPromise ]);
  const pages = Math.ceil(count / limit);
  if(!users.length && skip){
    req.flash('info', `${res.locals.layout.flash_page_not_exist_1} ${page}. ${res.locals.layout.flash_page_not_exist_2} ${pages}`);
    res.redirect(`/users/page/${pages}`);
    return;
  }
  res.render('data', {users, page, pages, count, skip, project});
};

exports.invitations = async (req, res) => {
  const project = await Project.findOne({_id: req.user.project._id},{
    name: 1, invitations: 1,
  });
  res.render('invitations', {project});
};

exports.getOneUserData = async (req, res) => {
  const results = await Result.getUserResults({ author:  req.params.id, project: req.user.project._id });
  res.render('dataOneUser', {participant: req.params.participant, results});
};

exports.getResearchers = async (req, res) => {
  const users = await User
    .getResearchers()
    .sort( {created: 'asc'} )
  res.render('researchers', {title: 'Researchers', users});
};

exports.removeUser = async (req, res) => {
  const results = await Result.find({ author: req.params.id })
  if (results.length === 0){
    const user = await User.findOneAndRemove({ _id: req.params.id});
    req.flash('success', `${res.locals.layout.flash_user_deleted}`);
  } else {
    req.flash('error', `${res.locals.layout.flash_user_cannot_be_deleted}`);
  }
  res.redirect('back');
};

//users invitation
exports.inviteParticipants = async (req, res) => {
  let emails = [];
  if(req.body.invitationsList){
    const emailsRaw = req.body.invitationsList.replace(/ /g, '').split(/\r\n|,|;/);
    if(emailsRaw){
      emails = emails.concat(emailsRaw.filter(e => e && e != null && e != ''));
    }
  };
  const project = await Project.findOne( { name: req.params.project });
  let sentEmails = [];
  if (project && project.invitations && project.invitations.length > 0){
    sentEmails = project.invitations.filter(e => typeof(e) != 'undefined' && e != null &&  e.email != null).map(e => e.email);
  }
  const newInvitationEmails = emails.filter(e => e !=null && e != '' && sentEmails.indexOf(e) == -1);
  if ( (sentEmails.length + newInvitationEmails.length > process.env.PROF_PLAN_INVITATIONS_LIMIT && req.user.subscription_plan == 'professional') || !req.user.subscription){
    req.flash('error', `${res.locals.layout.flash_invitation_overlimit}`);
    res.redirect('back');
    return;
  }
  let sentInvitations;
  const subject = res.locals.layout.flash_invitation;
  try {
    sentInvitations = await Promise.all(newInvitationEmails.map(async (email) => {
      if(email && email != null){
        const token = uniqid();
        const participant = {
          email: email,
          project: project.name
        };
        const singupURL = `https://${req.headers.host}/code/${req.params.project}/${token}`;
        await mail.send({
          participant,
          subject,
          singupURL,
          filename: 'invitation-' + req.user.language
        });
        return ({email: email, token: token})
      }
    }));
  } catch(err) {
    req.flash('error', err.message);
    res.redirect('back');
    return;
  };
  if(sentInvitations && sentInvitations != null){
    project.invitations = project.invitations.concat(sentInvitations);
  }
  await project.save();
  req.flash('success', `${res.locals.layout.flash_invited}`);
  res.redirect(`back`);
};

//payment functions
exports.subscribe = async (req, res) => {
  res.render('subscribe', {stripePublishableKey: keys.stripePublishableKey, plan: req.params.plan, period: req.params.period});
}

exports.cardpayment = async (req, res) => {
  let chosenplan;
  const selectedPlan = req.query.plan;
  const selectedPeriod = req.query.period;
  if(selectedPlan == 'professional'){
    if(selectedPeriod == "month"){
      chosenplan = process.env.PROFESSIONAL_PLAN_MONTH;
    } else if(selectedPeriod == "quarter"){
      chosenplan = process.env.PROFESSIONAL_PLAN_QUARTER;
    } else if(selectedPeriod == "year"){
      chosenplan = process.env.PROFESSIONAL_PLAN_YEAR;
    } else {
      req.flash('error', `${res.locals.layout.flash_subscriptionError}`);
      res.redirect('/subscribe');
    }
  } else if (selectedPlan == 'laboratory'){
    if(selectedPeriod == "month"){
      chosenplan = process.env.LABORATORY_PLAN_MONTH;
    } else if(selectedPeriod == "quarter"){
      chosenplan = process.env.LABORATORY_PLAN_QUARTER;
    } else if(selectedPeriod == "year"){
      chosenplan = process.env.LABORATORY_PLAN_YEAR;
    } else {
      req.flash('error', `${res.locals.layout.flash_subscriptionError}`);
      res.redirect('/subscribe');
    }
  } else {
    req.flash('error', `${res.locals.layout.flash_subscriptionError}`);
    res.redirect('/subscribe');;
  };
  stripe.customers.create({
    email: req.user.email || req.body.stripeEmail,
    source: req.body.stripeToken
  }).then(customer => stripe.subscriptions.create({
    customer: customer.id,
    items: [{plan: chosenplan}]
  })).then(result => {
    User.findById(req.user._id, (err, user) => {
      user.set({
        subscription: true,
        subscription_id: result.id,
        subscription_status: 'active',
        subscription_expires: result.current_period_end + 86400, //1 day later in the database
        subscription_plan: req.query.plan,
        subscription_period: req.query.period,
      });
      user.save((saveErr, updatedUser) => {
        if (saveErr) {
          req.flash('error', `${res.locals.layout.flash_subscriptionError}`);
        } else {
          req.flash('success', `${res.locals.layout.flash_subscriptionSuccess}`);
        }
      res.redirect('/subscribe');
      });
    });
  });
};

exports.cancelsubscription = async(req, res) => {
  const subscription_id = req.user.subscription_id;
  stripe.subscriptions.update(subscription_id, {cancel_at_period_end: true});
  User.findById(req.user._id, (err, user) => {
    user.set({
      subscription_status: 'stopped'
    });
    user.save((saveErr, updatedUser) => {
      if (saveErr) {
        req.flash('error', `${res.locals.layout.flash_subscriptionError}`);
      } else {
        req.flash('success', `${res.locals.layout.flash_subscriptionStop}`);
      }
      res.redirect('back');
    });
  });
};

exports.reactivatesubscription = async(req, res) => {
  const subscription_id = req.user.subscription_id;
  stripe.subscriptions.update(subscription_id, {cancel_at_period_end: false});
  User.findById(req.user._id, (err, user) => {
    user.set({
      subscription_status: 'active'
    });
    user.save((saveErr, updatedUser) => {
      if (saveErr) {
        req.flash('error', `${res.locals.layout.flash_subscriptionError}`);
      } else {
        req.flash('success', `${res.locals.layout.flash_subscriptionReactivation}`);
      }
      res.redirect('back');
    });
  });
};

exports.webhook = async(req, res) => {
  const event = JSON.parse(req.body);
  if (event && event.type && event.type == 'invoice.payment_succeeded'){
    const subscription_id = event.data.object.subscription;
    const timestamp = event.data.object.lines.data[0].period.end + 10000;
    const user = await User.findOneAndUpdate({subscription_id : subscription_id}, {
      subscription: true,
      subscription_expires: timestamp,
      subscription_status: 'active'
    },{}).exec();
  };
  res.send(200);
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

exports.sendTestRequest = async (req, res) => {
  const window = (new JSDOM('')).window;
  const DOMPurify = createDOMPurify(window);
  const task = {
    taskDescription: DOMPurify.sanitize(req.body.taskDescription),
    example: DOMPurify.sanitize(req.body.example),
    time: DOMPurify.sanitize(req.body.time),
  };
  const researcher = {
    email: req.user.email || '',
    name: req.user.name || '',
    institute: req.user.institute || '',
    language: req.user.language,
    created: req.user.created,
    subscription: req.user.subscription || '',
    subscriptionExpires: req.user.subscriptionExpires || '',
    subscription_status: req.user.subscription_status || '',
    subscription_type: req.user.subscription_type || '',
  };
  await mail.request({
    researcher,
    task,
    filename: 'request'
  });
  req.flash('success', `${res.locals.layout.flash_test_request_sent}`);
  res.redirect('back');
}

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
    subscription: req.user.subscription || '',
    subscriptionExpires: req.user.subscriptionExpires || '',
    subscription_status: req.user.subscription_status || '',
    subscription_type: req.user.subscription_type || '',
    level: req.user.level || '',
    openLabId: req.user.openLabId || '',
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

// exports.sendPushNotification = async(req, res) => {
//
//   //TODO: write better method to extract notifications from users of the project
//   const users =  await User.getUsersOfProject(req.user.project._id);
//
//   //test schedule
//   //https://www.npmjs.com/package/node-schedule
//   let startTime = new Date(Date.now() + 5000);
//   let endTime = new Date(startTime.getTime() + 25000);
//   var j = schedule.scheduleJob({ start: startTime, end: endTime, rule: '*/5 * * * * *' }, function(){
//     console.log('Time to send a notification!');
//     sendNotification();
//   });
//   await webpush.setVapidDetails('mailto:shevchenko_yury@mail.ru', process.env.VAPID_PUBLIC_KEY, process.env.VAPID_PRIVATE_KEY);
//
//   function sendNotification(){
//     if (users){
//       users.map(user => {
//         if (user.notifications && user.notifications.length > 0){
//           console.log("User code", user.participant_code);
//           const subs = user.notifications;
//           subs.forEach(function(sub){
//             //console.log('Subscription', sub);
//             const pushConfig = {
//               endpoint: sub.endpoint,
//               keys: {
//                 auth: sub.keys.auth,
//                 p256dh: sub.keys.p256dh
//               }
//             };
//             setTimeout(() => {
//               webpush.sendNotification(pushConfig, JSON.stringify({
//                 'title': 'New task',
//                 'content': 'Please complete this test now.',
//                 'openUrl': '/test/lottery/5c4b9ae7057cf40a046e243b'
//               })) //payload is limited to 4kb
//               .then(res => {
//                 console.log("Notification was sent", res.statusCode);
//               })
//               .catch(err => {
//                 console.log("The error happened", err.statusCode);
//                 //TODO: remove subscription if it is not valid anymore (check it in response)
//               })
//             }, 500);
//           })
//         }
//       })
//     }
//   }
//
//   res.status(201).json({message: 'Data received'});
// };

exports.uploadImage = async (req, res) => {
  const formData = new formidable.IncomingForm();
  formData.parse(req, function(err, fields, files){
    // fs.rename(files.image.path, './public/uploads/' + files.image.name);
    var oldpath = files.image.path;
    var newpath = 'C:/Yury/' + files.image.name;
    fs.rename(oldpath, newpath, function (err) {
       if (err) throw err;
       res.write('File uploaded and moved!');
       res.end();
     });
  });
  // fs.writeFile('public/uploads/' + files.image.name, buffer, (err) => {
  //   if (err) throw err;
  //   //console.log('The file has been saved!');
  // });

  res.status(201).json({message: 'Data received'});
};
