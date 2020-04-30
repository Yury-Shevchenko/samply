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
  });

  agenda.define('regular_notification', (job, done) => {
    if(job.attrs.data.participantId && job.attrs.data.participantId > 0){
      sendToSomeProjectUsers(done, job.attrs.data.projectid, job.attrs.data.participantId, job.attrs.data.title, job.attrs.data.message, job.attrs.data.url);
    } else {
      sendToAllProjectUsers(done, job.attrs.data.projectid, job.attrs.data.title, job.attrs.data.message, job.attrs.data.url);
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
      if (req.body.participantId && req.body.participantId.length) {
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
  if(req.body.interval === '' || req.body.duration === ''){
    res.status(400).send();
    return;
  }
  const int1 = req.body.interval;
  const interval1_cron = String(`${int1.sec} ${int1.min} ${int1.hour} ${int1.day} ${int1.month} ${int1.week}`);
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
  if(req.body.participantId && req.body.participantId.length) {
    users = project.mobileUsers.filter(user => req.body.participantId.includes(user.id));
  } else {
    users = project.mobileUsers;
  }

  // const users = await User.getUsersOfProject(req.user.project._id);
  if (users){
    users.map(user => {
        // this time buffer can also be supplied by the researcher
        // as a field "when the notifications schedule should start"
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
  const tokens = project.mobileUsers
    .filter(user => user_id.includes(user.id))
    .map(user => ({
      id: user.id,
      token: user.token,
    }));
  // for testing
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
  const tokens = project.mobileUsers
    .map(user => ({
      id: user.id,
      token: user.token,
    }));
  await sendMobileNotification(done, content, tokens)
}

// the most simple function to send mobile notification with content to the list of tokens
async function sendMobileNotification(done, content, tokens) {
  const {title, message, url} = content;
  // Create the messages that you want to send to clents
  let messages = [];
  for (let pushToken of tokens) {
    // Each push token looks like ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]
    // Check that all your push tokens appear to be valid Expo push tokens
    if (!Expo.isExpoPushToken(pushToken.token)) {
      console.error(`Push token ${pushToken.token} is not a valid Expo push token`);
      continue;
    }
    // Construct a message (see https://docs.expo.io/versions/latest/guides/push-notifications)
    const customizedUrl = url.replace('%PARTICIPANT_CODE%', pushToken.id);
    messages.push({
      to: pushToken.token,
      sound: 'default',
      title: title,
      body: message,
      data: { title, message, url: customizedUrl },
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
        // console.log(ticketChunk);
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

// participants join a study on mobile phone, a user id is created if there was no one before
exports.joinStudy = async(req, res) => {
  const id = req.params.id;
  const project = await Project.findOne({_id: id},{
    notifications: 1, mobileUsers: 1, name: 1,
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
  const updatedUser = await User.findOneAndUpdate({ samplyId: req.body.id },
      { ['$addToSet'] : {
        participant_projects:  {
          _id: project._id,
          name: project.name,
        }
      } },
      { upsert: true, new : true });
  if(updatedUser){
    res.status(200).json({message: 'OK'});
  } else {
    res.status(400).json({message: 'There was an error during the user update'});
  }
}

// participant leaves the study, the jobs with participant's id are deleted
exports.leaveStudy = async(req, res) => {
  const id = req.params.id;
  agenda.cancel({
    'data.projectid': id,
    'data.userid': req.body.id,
  }, (err, numRemoved) => {});
  const project = await Project.findOne({_id: id},{
    mobileUsers: 1,
  });
  if(!project.mobileUsers){
    project.mobileUsers = [];
  }
  const removeUserId = req.body.id;
  project.mobileUsers = project.mobileUsers.filter(user => user.id !== removeUserId)
  await project.save();
  const updatedUser = await User.findOneAndUpdate({ samplyId: req.body.id },
      { ['$pull'] : {
        participant_projects: { _id: project._id }
      } },
      { upsert: true, new : true });
  if(updatedUser){
    res.status(200).json({message: 'OK'});
  } else {
    res.status(400).json({message: 'There was an error during the user update'});
  }
};

exports.removeUser = async (req, res) => {
  const project = await Project.findOne({_id: req.user.project._id},{
    mobileUsers: 1, creator: 1,
  });
  if(!project.creator.equals(req.user._id)){
    throw Error('You must be a creator of a project in order to do it!');
  }
  const userId = req.params.id;
  // remove all scheduled notifications
  agenda.cancel({
    'data.projectid': project._id,
    'data.userid': userId,
  }, (err, numRemoved) => {});

  // update the project
  if(!project.mobileUsers){
    project.mobileUsers = [];
  }
  project.mobileUsers = project.mobileUsers.filter(user => user.id !== userId);
  await project.save();

  // update the user
  const updatedUser = await User.findOneAndUpdate({ samplyId: userId },
      { ['$pull'] : {
        participant_projects: { _id: project._id }
      } },
      { upsert: true, new : true });
  if(updatedUser){
    res.redirect('back');
  } else {
    res.redirect('back'); // can also return an error
  }
};
