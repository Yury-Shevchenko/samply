const mongoose = require('mongoose');
const Job = mongoose.model('Job');
const User = mongoose.model('User');
const Project = mongoose.model('Project');
const webpush = require('web-push');
const Agenda = require('agenda');
const uniqid = require('uniqid');

const agenda = new Agenda({
  name:'open-lab-notifications',
  db: {address: process.env.DATABASE, collection: 'Job'},
});
agenda.on('ready', function() {

  agenda.define('one_time_notification', (job, done) => {
    console.log('I am sending right now notifcations for the project', job.attrs.data.projectid);
    sendNotification(job.attrs.data.projectid, job.attrs.data.title, job.attrs.data.message);
    done();
  });

  agenda.define('regular_notification', (job, done) => {
    console.log('I am sending regular notifcations for the project', job.attrs.data.projectid);
    sendNotification(job.attrs.data.projectid, job.attrs.data.title, job.attrs.data.message);
    done();
  });

  agenda.define('start_manager', (job, done) => {
    console.log('Starting interval notifications');
    const newjob = agenda.create('regular_notification', {
      projectid: job.attrs.data.projectid,
      id: job.attrs.data.id,
      title: job.attrs.data.title,
      message: job.attrs.data.message,
    });
    newjob.repeatEvery(job.attrs.data.interval);
    newjob.save();
    done();
  });

  agenda.define('end_manager', (job, done) => {
    console.log('Ending interval notifications');
    agenda.cancel({
      'data.projectid': job.attrs.data.projectid,
      'data.id': job.attrs.data.id
    }, (err, numRemoved) => {});
    done();
  });

  agenda.define('personal_regular_notification', (job, done) => {
    console.log('I am sending right now personal notification for the user', job.attrs.data.userid);
    sendPersonalNotification(job.attrs.data.projectid, job.attrs.data.userid, job.attrs.data.title, job.attrs.data.message);
    done();
  });

  agenda.define('start_personal_manager', (job, done) => {
    console.log('Starting relative interval notifications for user', job.attrs.data.userid);
    const newjob = agenda.create('personal_regular_notification', {
      userid: job.attrs.data.userid,
      projectid: job.attrs.data.projectid,
      id: job.attrs.data.id,
      title: job.attrs.data.title,
      message: job.attrs.data.message,
    });
    newjob.repeatEvery(job.attrs.data.interval);
    newjob.save();
    done();
  });

  agenda.define('end_personal_manager', (job, done) => {
    console.log('Stopping relative interval notifications for user', job.attrs.data.userid);
    agenda.cancel({
      'data.projectid': job.attrs.data.projectid,
      'data.id': job.attrs.data.id
    }, (err, numRemoved) => {});
    done();
  });

  agenda.start();
  console.log("Ok, Lets get start");
});

//One time notifications
exports.createNotification = async(req, res) => {
  let project = await Project.findOne({_id: req.user.project._id},{
    name: 1, notifications: 1,
  });
  const dates = req.body.date;
  if(dates.length > 0){
    await dates.map(d => {
      const id = uniqid();
      const date = new Date(d);
      project.notifications.push({
        id: id,
        name: req.body.name,
        mode: req.body.mode,
        date: date,
        title: req.body.title || 'Open Lab',
        message: req.body.message || 'Please complete a test.',
      });
      agenda.schedule(date, 'one_time_notification', {
        projectid: req.user.project._id,
        id: id,
        title: req.body.title || 'Open Lab',
        message: req.body.message || 'Please complete a test.',
      });
    });
    await project.save((saveErr, updatedproject) => {
      if (saveErr) {
        res.status(400);
      } else {
        res.status(201);
      }
      res.redirect(`back`);
    });
  } else {
    res.status(400).send();
  }
}

//Interval notification
exports.createInterval = async (req, res) => {
  if(req.body.int_start === '' || req.body.int_end === '' || req.body.interval === ''){
    res.status(400).send();
    return;
  }
  let project = await Project.findOne({_id: req.user.project._id},{
    name: 1, notifications: 1,
  });
  const id = uniqid();
  const int_start = new Date(req.body.int_start);
  const int_end = new Date(req.body.int_end);
  console.log('Dates', int_start, int_end);
  project.notifications.push({
    id: id,
    name: req.body.name,
    mode: req.body.mode,
    interval: req.body.interval,
    int_start: int_start,
    int_end: int_end,
    title: req.body.title || 'Open Lab',
    message: req.body.message || 'Please complete a test.',
  });

  agenda.schedule(int_start, 'start_manager', {
    projectid: req.user.project._id,
    id: id,
    interval: req.body.interval,
    title: req.body.title,
    message: req.body.message,
  });

  agenda.schedule(int_end, 'end_manager', {
    projectid: req.user.project._id,
    id: id,
    interval: req.body.interval,
    title: req.body.title,
    message: req.body.message,
  });

  await project.save((saveErr, updatedproject) => {
    if (saveErr) {
      res.status(400);
    } else {
      res.status(201);
    }
    res.redirect(`back`);
  });
};

//Relative notifications, dependent on the user data
exports.createRelativeSchedule = async (req, res) => {
  if(req.body.int_start === '' || req.body.int_end === ''){
    res.status(400).send();
    return;
  }
  let project = await Project.findOne({_id: req.user.project._id},{
    name: 1, notifications: 1,
  });
  const id = uniqid();
  const int_start = new Date(req.body.int_start);
  const int_end = new Date(req.body.int_end);
  console.log(int_start, int_end);

  project.notifications.push({
    id: id,
    name: req.body.name,
    mode: req.body.mode,
    interval: req.body.interval,
    int_start: int_start,
    int_end: int_end,
    title: req.body.title || 'Open Lab',
    message: req.body.message || 'Please complete a test.',
  });

  console.log('Project', project);
  const users = await User.getUsersOfProject(req.user.project._id);

  if (users){
    users.map(user => {
      if (user.notifications && user.notifications.length > 0){
        console.log("User with a notification. ID:", user._id, " Created at", user.created);
        //specify the moment when the user should start and stop to recieve notifications
        // const user_int_start = new Date(Date.now() + 10000);
        const timeShift = 180000;
        const user_int_start = new Date(Date.parse(user.created) + timeShift);
        console.log('new date', user_int_start);
        const user_int_end = int_end;

        agenda.schedule(user_int_start, 'start_personal_manager', {
          userid: user._id,
          projectid: req.user.project._id,
          id: id,
          interval: req.body.interval,
          title: req.body.title,
          message: req.body.message,
        });
        agenda.schedule(user_int_end, 'end_personal_manager', {
          userid: user._id,
          projectid: req.user.project._id,
          id: id,
          interval: req.body.interval,
          title: req.body.title,
          message: req.body.message,
        });

      }
    })
  }
  //save the project
  await project.save((saveErr, updatedproject) => {
    if (saveErr) {
      res.status(400);
    } else {
      res.status(201);
    }
    res.redirect(`back`);
  });
};

exports.deleteProjectNotifications = async(req, res) => {
  const projectID = req.user.project._id;
  console.log('project id', projectID);
  let project = await Project.findOne({_id: req.user.project._id},{
    name: 1, notifications: 1,
  });
  project.notifications = [];
  agenda.cancel({
    'data.projectid': projectID
  }, function(err, numRemoved) {
    console.log('Number of removed notifications', numRemoved);
    console.log('Error', err);
  });
  await project.save((saveErr, updatedproject) => {
    if (saveErr) {
      res.status(400);
    } else {
      res.status(201);
    }
    res.redirect(`back`);
  });
}

exports.removeNotificationByID = async(req, res) => {
  const projectID = req.user.project._id;
  const notificationID = req.params.id;
  let project = await Project.findOne({_id: projectID},{
    name: 1, notifications: 1,
  });
  project.notifications = await project.notifications.filter( n => {
    return n.id !== notificationID;
  });
  agenda.cancel({
    'data.projectid': projectID,
    'data.id': notificationID
  }, (err, numRemoved) => {
    console.log('Number of removed notifications', numRemoved);
  });
  await project.save((saveErr, updatedproject) => {
    if (saveErr) {
      res.status(400);
    } else {
      res.status(201);
      req.flash('success', `The notification was deleted`);
    }
    res.redirect(`back`);
  });
}

async function sendPersonalNotification(project_id, user_id, title, message) {
  const user = await User.findOne({_id: user_id});
  await webpush.setVapidDetails('mailto:shevchenko_yury@mail.ru', process.env.VAPID_PUBLIC_KEY, process.env.VAPID_PRIVATE_KEY);

  if (user.notifications && user.notifications.length > 0){
    console.log("Personal user Open lab ID", user.openLabId);
    const subs = user.notifications;
    subs.forEach(function(sub){
      const pushConfig = {
        endpoint: sub.endpoint,
        keys: {
          auth: sub.keys.auth,
          p256dh: sub.keys.p256dh
        }
      };
      webpush.sendNotification(pushConfig, JSON.stringify({
        'title': title,
        'content': message,
        'openUrl': '/testing'
      })) //payload is limited to 4kb
        .then(res => {
          console.log("Personal notification was sent", res.statusCode);
        })
        .catch(err => {
          console.log("The error happened", err.statusCode, "The user is ", user.openLabId);
          //TODO: remove subscription if it is not valid anymore (check it in response)
          //TODO record in the user profile that was an error with user subscription
        })
      })
    }
};

async function sendNotification(project_id, title, message) {
  const users = await User.getUsersOfProject(project_id);
  await webpush.setVapidDetails('mailto:shevchenko_yury@mail.ru', process.env.VAPID_PUBLIC_KEY, process.env.VAPID_PRIVATE_KEY);
  if (users){
      users.map(user => {
        if (user.notifications && user.notifications.length > 0){
          const subs = user.notifications;
          console.log('Suscriptions of the user', user.participant_code, subs);
          subs.forEach(function(sub){
            const pushConfig = {
              endpoint: sub.endpoint,
              keys: {
                auth: sub.keys.auth,
                p256dh: sub.keys.p256dh
              }
            };
            console.log(title, message);
            webpush.sendNotification(pushConfig, JSON.stringify({
                'title': title,
                'content': message,
                'openUrl': '/testing'
              })) //payload is limited to 4kb
              .then(res => {
                console.log("Notification was sent", res.statusCode);
              })
              .catch(err => {
                console.log("The error happened", err.statusCode);
                //TODO: remove subscription if it is not valid anymore (check it in response)
              })
          })
        }
      })
    }
};

//user functions
exports.registerPushNotification = async (req, res) => {

  // console.log('user', req.user);
  const project = await Project.findOne({_id: req.user.participantInProject},{
    name: 1, notifications: 1,
  });
  console.log('project', project);
  if(project && project.notifications && project.notifications.length > 0){
    project.notifications.map(sub => {
      if(sub.mode && sub.mode === 'Individual'){

        // const timeShift = 180000;
        // const user_int_start = new Date(Date.parse(user.created) + timeShift);
        // console.log('new date', user_int_start);
        const user_int_start = new Date(Date.now() + 10000);
        const user_int_end = sub.int_end;
        console.log('Important', req.user._id, project._id, sub.id, sub.interval);

        agenda.schedule(user_int_start, 'start_personal_manager', {
          userid: req.user._id,
          projectid: project._id,
          id: sub.id,
          interval: sub.interval,
          title: sub.title,
          message: sub.message,
        });

        agenda.schedule(user_int_end, 'end_personal_manager', {
          userid: req.user._id,
          projectid: project._id,
          id: sub.id,
          interval: sub.interval,
          title: sub.title,
          message: sub.message,
        });

      }
    })
  }

  const sub = req.body;
  // console.log("The data received on the server", sub);
  await User.findById(req.user._id, (err, user) => {
    user.notifications.push(sub);
    user.save((saveErr, updatedUser) => {
      if (saveErr) {
        res.status(400).json({message: 'There was an error during the user update'});
      } else {
        res.status(201).json({message: 'Data received'});
      }
    });
  });
};

exports.unsubscribePushNotification = async (req, res) => {
  // console.log("The data received on the server to unsubscribe");
  await User.findById(req.user._id, (err, user) => {
    user.notifications = [];//TODO: delete only concrete subscription (?)
    user.save((saveErr, updatedUser) => {
      if (saveErr) {
        res.status(400).json({message: 'There was an error during the user update'});
      } else {
        res.status(201).json({message: 'Successfully unsubscribed'});
      }
    });
  });
};
