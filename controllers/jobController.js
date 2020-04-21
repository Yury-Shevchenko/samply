const mongoose = require('mongoose');
const Job = mongoose.model('Job');
const User = mongoose.model('User');
const Project = mongoose.model('Project');
const webpush = require('web-push');
const Agenda = require('agenda');
const uniqid = require('uniqid');

const { Expo } = require('expo-server-sdk');
// Create a new Expo SDK client
let expo = new Expo();

const agenda = new Agenda({
  name: 'samply-notifications',
  db: { address: process.env.DATABASE, collection: 'Job' },
});

agenda.on('ready', function() {

  agenda.define('one_time_notification', (job, done) => {
    sendToAllProjectUsers(done, job.attrs.data.projectid, job.attrs.data.title, job.attrs.data.message, job.attrs.data.url);
    // sendNotification(done, job.attrs.data.projectid, job.attrs.data.title, job.attrs.data.message, job.attrs.data.url);
  });

  agenda.define('regular_notification', (job, done) => {
    if(job.attrs.data.participantId && job.attrs.data.participantId > 0){
      sendToSomeProjectUsers(done, job.attrs.data.projectid, job.attrs.data.participantId, job.attrs.data.title, job.attrs.data.message, job.attrs.data.url);
      // sendPersonalNotification(done, job.attrs.data.projectid, job.attrs.data.participantId, job.attrs.data.title, job.attrs.data.message, job.attrs.data.url);
    } else {
      sendToAllProjectUsers(done, job.attrs.data.projectid, job.attrs.data.title, job.attrs.data.message, job.attrs.data.url);
      // sendNotification(done, job.attrs.data.projectid, job.attrs.data.title, job.attrs.data.message, job.attrs.data.url);
    }
  });

  agenda.define('start_manager', (job, done) => {
    const newjob = agenda.create('regular_notification', {
      projectid: job.attrs.data.projectid,
      id: job.attrs.data.id,
      title: job.attrs.data.title,
      message: job.attrs.data.message,
      url: job.attrs.data.url,
      participantId: job.attrs.data.participantId,
    });
    newjob.repeatEvery(job.attrs.data.interval, {
      skipImmediate: true
    });
    newjob.save();
    done();
  });

  agenda.define('end_manager', (job, done) => {
    agenda.cancel({
      'data.projectid': job.attrs.data.projectid,
      'data.id': job.attrs.data.id
    }, (err, numRemoved) => {});
    done();
  });

  agenda.define('personal_notification', (job, done) => {
    sendToSomeProjectUsers(done, job.attrs.data.projectid, job.attrs.data.userid, job.attrs.data.title, job.attrs.data.message, job.attrs.data.url);
    // sendPersonalNotification(done, job.attrs.data.projectid, job.attrs.data.userid, job.attrs.data.title, job.attrs.data.message, job.attrs.data.url);
    done();
  });

  agenda.define('start_personal_manager', (job, done) => {
    const newjob = agenda.create('personal_notification', {
      userid: job.attrs.data.userid,
      projectid: job.attrs.data.projectid,
      id: job.attrs.data.id,
      title: job.attrs.data.title,
      message: job.attrs.data.message,
      url: job.attrs.data.url,
    });
    newjob.repeatEvery(job.attrs.data.interval, {
      skipImmediate: true
    });
    newjob.save();
    done();
  });

  agenda.define('end_personal_manager', (job, done) => {
    agenda.cancel({
      'data.projectid': job.attrs.data.projectid,
      'data.id': job.attrs.data.id
    }, (err, numRemoved) => {});
    done();
  });

  agenda.start();

  async function graceful() {
    await agenda.stop();
  }

  process.on('SIGTERM', graceful);
  process.on('SIGINT' , graceful);
});


exports.joinStudy = async(req, res) => {
  const id = req.params.id;
  const project = await Project.findOne({_id: id},{
    notifications: 1, mobileUsers: 1,
  });
  if(!project.mobileUsers){
    project.mobileUsers = [];
  }
  const newUser = {
    id: req.body.id,
    token: req.body.token,
  };
  let isNew = true;
  project.mobileUsers.map(user => {
    if(user.id === newUser.id){
      user.token = newUser.token;
      isNew = false;
    }
    return user
  })
  if(isNew){
    project.mobileUsers.push(newUser);
  }
  await project.save();
  console.log('new project', project);
  // console.log('req.params.id', id);
  // const project = await Project.findOne({_id: id},{
  //   name: 1, notifications: 1,
  // });
  // console.log('req.body', req.body);
  // const mobileUser = {
  //   id: req.body.id,
  //   token: req.body.token,
  // };
  // if(!project.mobileUsers){
  //   project.mobileUsers = [];
  // }
  // project.mobileUsers.push(mobileUser);
  // await project.save();
  // console.log('new project', project);

  // const project = await Project.findOneAndUpdate({ _id: id },
  //     { ['$addToSet'] : {
  //       mobileUsers: req.body
  //     } },
  //     { new : true });
  console.log('project', project);

  if(project && project.notifications && project.notifications.length > 0){

    project.notifications.map(sub => {
      if(sub.target && sub.target === 'user-specific'){
        const timeBuffer = 5000;
        const user_int_start = new Date(Date.now() + timeBuffer);
        const user_int_end = new Date(Date.now() + sub.duration);

        agenda.schedule(user_int_start, 'start_personal_manager', {
          userid: req.body.id,
          projectid: project._id,
          id: sub.id,
          interval: sub.interval,
          title: sub.title,
          message: sub.message,
          url: sub.url,
        });

        agenda.schedule(user_int_end, 'end_personal_manager', {
          userid: req.body.id,
          projectid: project._id,
          id: sub.id,
          interval: sub.interval,
          title: sub.title,
          message: sub.message,
          url: sub.url,
        });

      }
    })
  }

  res.status(200).json({message: 'OK'});
  // const newUser = await User.findOneAndUpdate({ samplyId: req.body.id },
  //     { ['$addToSet'] : {
  //       participant_projects: project._id
  //     } },
  //     { new : true });
  // if(newUser){
  //   res.status(200).json({message: 'You are successfully subscribed.'});
  // } else {
  //   res.status(400).json({message: 'There was an error during the user update'});
  // }

}


exports.leaveStudy = async(req, res) => {
  
  const id = req.params.id;
  agenda.cancel({
    'data.projectid': id, //TODO
    'data.userid': req.body.id,
  }, (err, numRemoved) => {});

  const project = await Project.findOne({_id: id},{
    mobileUsers: 1,
  });
  if(!project.mobileUsers){
    project.mobileUsers = [];
  }
  const removeUserId = req.body.id;
  project.mobileUsers.filter(user => user.id !== removeUserId)
  await project.save();

  console.log('project', project);
  res.status(200).json({message: 'OK'});

  // const newUser = await User.findOneAndUpdate({ samplyId: req.body.id },
  //     { ['$pull'] : {
  //       participant_projects: req.user.participantInProject
  //     } },
  //     { new : true });
  // if(newUser){
  //   res.status(200).json({message: 'You are successfully unsubscribed.'});
  // } else {
  //   res.status(400).json({message: 'There was an error during the user update'});
  // }
};

exports.createScheduleNotification = async(req, res) => {
  // check whether the request body contains required information
  if(!req.body || !req.body.target || !req.body.schedule){
    console.log("Some information in request is missing");
    return res.status(400).end();
  }
  // update the information inside the project
  let project = await Project.findOne({_id: req.user.project._id},{
    name: 1, notifications: 1,
  });

  if(req.body.date && req.body.date.length > 0){
    await req.body.date.map(date => {
      const id = uniqid();
      project.notifications.push({
        id: id,
        target: req.body.target,
        schedule: req.body.schedule,
        randomize: req.body.randomize,
        date: date,
        title: req.body.title,
        message: req.body.message,
        url: req.body.url,
        participantId: req.body.participantId,
        name: req.body.name,
      });
      // if there is a participant id, create a personalized notification job
      if (req.body.participantId) {
        agenda.schedule(date, 'personal_notification', {
          userid: req.body.participantId,
          projectid: req.user.project._id,
          id: id,
          title: req.body.title,
          message: req.body.message,
          url: req.body.url,
        });
      } else {
        // schedule one time notification which will go to all users of project
        agenda.schedule(date, 'one_time_notification', {
          projectid: req.user.project._id,
          id: id,
          title: req.body.title,
          message: req.body.message,
          url: req.body.url,
        });
      }
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

exports.createIntervalNotification = async (req, res) => {
  if(req.body.int_start === '' || req.body.int_end === '' || req.body.interval === ''){
    res.status(400).send();
    return;
  }
  let project = await Project.findOne({_id: req.user.project._id},{
    name: 1, notifications: 1,
  });
  const id = uniqid();
  const int_start = req.body.int_start;
  const int_end = req.body.int_end;
  project.notifications.push({
    id: id,
    target: req.body.target,
    schedule: req.body.schedule,
    randomize: req.body.randomize,
    interval: req.body.interval,
    int_start: int_start,
    int_end: int_end,
    title: req.body.title,
    message: req.body.message,
    url: req.body.url,
    participantId: req.body.participantId,
    name: req.body.name,
  });

  agenda.schedule(int_start, 'start_manager', {
    projectid: req.user.project._id,
    id: id,
    interval: req.body.interval,
    title: req.body.title,
    message: req.body.message,
    url: req.body.url,
    participantId: req.body.participantId,
  });

  agenda.schedule(int_end, 'end_manager', {
    projectid: req.user.project._id,
    id: id,
    interval: req.body.interval,
    title: req.body.title,
    message: req.body.message,
    url: req.body.url,
    participantId: req.body.participantId,
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


exports.createIndividualNotification = async (req, res) => {
  // console.log('server: duration ', req.body.duration, 'interval:', req.body.interval, 'interval-2', req.body.interval_2);
  if(req.body.interval === '' || req.body.duration === ''){
    res.status(400).send();
    return;
  }
  const int1 = req.body.interval;
  const interval1_cron = String(`${int1.sec} ${int1.min} ${int1.hour} ${int1.day} ${int1.month} ${int1.week}`);
  // console.log('interval1_cron', interval1_cron);
  let int2, interval2_cron;
  if(req.body.interval_2){
    int2 = req.body.interval_2;
    interval2_cron = String(`${int2.sec} ${int2.min} ${int2.hour} ${int2.day} ${int2.month} ${int2.week}`);
  }
  let project = await Project.findOne({_id: req.user.project._id},{
    name: 1, notifications: 1, mobileUsers: 1,
  });
  const id = uniqid();
  const duration = req.body.duration * 1000;
  project.notifications.push({
    id: id,
    target: req.body.target,
    schedule: req.body.schedule,
    randomize: req.body.randomize,
    interval: interval1_cron,
    interval_max: interval2_cron,
    duration: duration,
    title: req.body.title,
    message: req.body.message,
    url: req.body.url,
    name: req.body.name,
    participantId: req.body.participantId,
  });

  // get all or some users depending on the request
  // req.body.participantId should be an array
  let users;
  if(req.body.participantId) {
    users = project.mobileUsers.filter(user => req.body.participantId.includes(user.id));
  } else {
    users = project.mobileUsers;
  }

  // const users = await User.getUsersOfProject(req.user.project._id);
  if (users){
    users.map(user => {

        const timeBuffer = 60000;
        const user_int_start = new Date(Date.parse(user.created) + timeBuffer);
        const user_int_end = new Date(Date.parse(user.created) + duration);
        let interval;
        if(req.body.randomize && req.body.interval_2){
          // get a random value between int1 and int2
          const gR = (min, max) => {
            if(min === '*' || max === '*'){
              return '*'
            } else {
              return Math.round(Math.random() * (parseFloat(max) - parseFloat(min)) + parseFloat(min));
            }
          };
          const rI = {
            sec: gR(int1.sec, int2.sec),
            min: gR(int1.min, int2.min),
            hour: gR(int1.hour, int2.hour),
            day: gR(int1.day, int2.day),
            month: gR(int1.month, int2.month),
            week: gR(int1.week, int2.week)
          };
          interval = String(`${rI.sec} ${rI.min} ${rI.hour} ${rI.day} ${rI.month} ${rI.week}`)
          // console.log('randomInterval', rI)
          // console.log('interval in cron', interval)
        } else {
          interval = interval1_cron;
        }

        agenda.schedule(user_int_start, 'start_personal_manager', {
          userid: user.id,
          projectid: req.user.project._id,
          id: id,
          interval: interval,
          title: req.body.title,
          message: req.body.message,
          url: req.body.url,
        });
        agenda.schedule(user_int_end, 'end_personal_manager', {
          userid: user.id,
          projectid: req.user.project._id,
          id: id,
          interval: req.body.interval,
          title: req.body.title,
          message: req.body.message,
          url: req.body.url,
        });


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


// method for researchers to remove all project notifications
exports.deleteProjectNotifications = async(req, res) => {
  const projectID = req.user.project._id;
  let project = await Project.findOne({_id: req.user.project._id},{
    name: 1, notifications: 1,
  });
  project.notifications = [];
  agenda.cancel({
    'data.projectid': projectID
  }, function(err, numRemoved) {
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

// method for researchers to remove specific notification
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
    // console.log('Number of removed notifications', numRemoved);
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


async function sendToSomeProjectUsers(done, project_id, user_id, title, message, url){
  const content = {
    title,
    message,
    url
  };
  // find the project
  const project = await Project.findOne({ _id: project_id },{ mobileUsers: 1 });
  // filter only the users whom we want to send notifications
  // const tokens = project.mobileUsers.filter(user => user_id.includes(user.id)).map(user => user.token);
  // for testing
  const tokens = ['ExponentPushToken[-E4V69F4OrQ2Btgk4rIcVN]'];

  await sendMobileNotification(done, content, tokens);
}


// send the notificaiton to all users who are members of the project (mobileUsers)
async function sendToAllProjectUsers(done, project_id, title, message, url){
  const content = {
    title,
    message,
    url
  }
  // find the project
  const project = await Project.findOne({ _id: project_id },{ mobileUsers: 1 });
  // const tokens = project.mobileUsers.map(user => user.token);
  const tokens = ['ExponentPushToken[-E4V69F4OrQ2Btgk4rIcVN]']
  await sendMobileNotification(done, content, tokens)
}


// the most simple function to send mobile notification with content to the list of tokens
async function sendMobileNotification(done, content, tokens) {
  const {title, message, url} = content;
  // const pushTokens = project.mobileUsers.map(user => user.token);
  // const pushTokens = ['ExponentPushToken[-E4V69F4OrQ2Btgk4rIcVN]']
  // Create the messages that you want to send to clents
  let messages = [];
  for (let pushToken of tokens) {
    // Each push token looks like ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]

    // Check that all your push tokens appear to be valid Expo push tokens
    if (!Expo.isExpoPushToken(pushToken)) {
      console.error(`Push token ${pushToken} is not a valid Expo push token`);
      continue;
    }

    // Construct a message (see https://docs.expo.io/versions/latest/guides/push-notifications)
    messages.push({
      to: pushToken,
      sound: 'default',
      title: title,
      body: message,
      data: { title, message, url },
    })
  }

  // The Expo push notification service accepts batches of notifications so
  // that you don't need to send 1000 requests to send 1000 notifications. We
  // recommend you batch your notifications to reduce the number of requests
  // and to compress them (notifications with similar content will get
  // compressed).
  let chunks = expo.chunkPushNotifications(messages);
  let tickets = [];
  (async () => {
    // Send the chunks to the Expo push notification service. There are
    // different strategies you could use. A simple one is to send one chunk at a
    // time, which nicely spreads the load out over time:
    for (let chunk of chunks) {
      try {
        let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
        console.log(ticketChunk);
        tickets.push(...ticketChunk);
        // NOTE: If a ticket contains an error code in ticket.details.error, you
        // must handle it appropriately. The error codes are listed in the Expo
        // documentation:
        // https://docs.expo.io/versions/latest/guides/push-notifications#response-format
      } catch (error) {
        console.error(error);
      }
    }
    done();
  })();

};
