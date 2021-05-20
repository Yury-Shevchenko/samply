const mongoose = require('mongoose');
const Job = mongoose.model('Job');
const User = mongoose.model('User');
const Result = mongoose.model('Result');
const Project = mongoose.model('Project');
const webpush = require('web-push');
const Agenda = require('agenda');
const uniqid = require('uniqid');
const moment = require('moment');
const Cron = require('cron-converter');
const cronstrue = require('cronstrue');

const { Expo } = require('expo-server-sdk');
let expo = new Expo();

const agenda = new Agenda({
  name: 'samply-notifications',
  db: { address: process.env.DATABASE, collection: 'Job' },
});

agenda.on('ready', function() {

  agenda.define('one_time_notification', (job, done) => {
    sendToAllProjectUsers(done,
      job.attrs.data.projectid,
      job.attrs.data.title,
      job.attrs.data.message,
      job.attrs.data.url,
      job.attrs.data.id,
      job.attrs.data.deleteself,
      job.attrs.data.excludeUntil,
    );
  });

  agenda.define('regular_notification', (job, done) => {
    if(job.attrs.data.participantId && job.attrs.data.participantId.length > 0){
      sendToSomeProjectUsers(done,
        job.attrs.data.projectid,
        job.attrs.data.participantId,
        job.attrs.data.title,
        job.attrs.data.message,
        job.attrs.data.url
      );
    } else {
      sendToAllProjectUsers(done,
        job.attrs.data.projectid,
        job.attrs.data.title,
        job.attrs.data.message,
        job.attrs.data.url
      );
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
    sendToSomeProjectUsers(done,
      job.attrs.data.projectid,
      job.attrs.data.userid,
      job.attrs.data.title,
      job.attrs.data.message,
      job.attrs.data.url,
      job.attrs.data.id,
      job.attrs.data.deleteself
    );
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
      deleteself: false,
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
      'data.id': job.attrs.data.id,
      'data.userid': job.attrs.data.userid,
    }, (err, numRemoved) => {});
    done();
  });

  // random personal notification
  agenda.define('random_personal_notification', (job, done) => {
    pickUpRandomTimeFromInterval(done,
      job.attrs.data.projectid,
      job.attrs.data.userid,
      job.attrs.data.title,
      job.attrs.data.message,
      job.attrs.data.url,
      job.attrs.data.id,
      job.attrs.data.deleteself,
      job.attrs.data.interval,
      job.attrs.data.interval_max,
      job.attrs.data.number,
    );
    done();
  });

  // randomization manager
  agenda.define('start_random_personal_manager', (job, done) => {
    const newjob = agenda.create('random_personal_notification', {
      userid: job.attrs.data.userid,
      projectid: job.attrs.data.projectid,
      id: job.attrs.data.id,
      title: job.attrs.data.title,
      message: job.attrs.data.message,
      url: job.attrs.data.url,
      deleteself: false,
      interval: job.attrs.data.interval,
      interval_max: job.attrs.data.interval_max,
      number: job.attrs.data.number,
    });
    newjob.repeatEvery(job.attrs.data.interval, {
      skipImmediate: true
    });
    newjob.save();
    done();
  });

  agenda.define('end_random_personal_manager', (job, done) => {
    agenda.cancel({
      'data.projectid': job.attrs.data.projectid,
      'data.id': job.attrs.data.id,
      'data.userid': job.attrs.data.userid,
    }, (err, numRemoved) => {});
    done();
  });

  // define the admin job to update notifications in the beginning of each month
  agenda.define('admin_job', (job, done) => {
    rescheduleRepeatJobs(done);
    done();
  })

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
    return res.status(400).end();
  }
  // update the information inside the project
  let project = await Project.findOne({_id: req.user.project._id},{
    name: 1, notifications: 1, mobileUsers: 1,
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
        scheduleInFuture: req.body.scheduleInFuture,
      });

      // check whether there are current participants to schedule the notifications
      if(req.body.participantId) {
        if(req.body.participantId.length > 0) {
          agenda.schedule(date, 'personal_notification', {
            userid: req.body.participantId,
            projectid: req.user.project._id,
            id: id,
            title: req.body.title,
            message: req.body.message,
            url: req.body.url,
            deleteself: true,
          });
        } else {
          if(req.body.scheduleInFuture) {
            // schedule one time notification which will go to all users of project
            agenda.schedule(date, 'one_time_notification', {
              projectid: req.user.project._id,
              id: id,
              title: req.body.title,
              message: req.body.message,
              url: req.body.url,
              deleteself: true,
            });
          } else {
            // schedule only for all current users of the project
            const allUsers = project.mobileUsers.map(user => user.id);
            agenda.schedule(date, 'personal_notification', {
              userid: allUsers,
              projectid: req.user.project._id,
              id: id,
              title: req.body.title,
              message: req.body.message,
              url: req.body.url,
              deleteself: true,
            });
          }
        }
      } else {
        if(req.body.scheduleInFuture) {
          // schedule only for future users
          agenda.schedule(date, 'one_time_notification', {
            projectid: req.user.project._id,
            id: id,
            title: req.body.title,
            message: req.body.message,
            url: req.body.url,
            deleteself: true,
            excludeUntil: Date.now(),
          });
        }
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

  // console.log('createIntervalNotification - request body', req.body);

  if(req.body.int_start === '' || req.body.int_end === ''){
    res.status(400).send();
    return;
  }
  let project = await Project.findOne({_id: req.user.project._id},{
    name: 1, notifications: 1, mobileUsers: 1,
  });
  const id = uniqid();

  // dependent on the strategy
  let int_start, int_end;
  if(req.body.int_start.start === 'specific' || req.body.int_start.startEvent === 'now'){
    int_start = req.body.int_start.startMoment;
  }
  if (req.body.int_end.stop === 'specific' || req.body.int_end.stopEvent === 'now'){
    int_end = req.body.int_end.stopMoment;
  }

  // check whether there are current participants to schedule the notifications
  let users;
  if(req.body.participantId) {
    if(req.body.participantId.length > 0) {
      users = project.mobileUsers.filter(user => req.body.participantId.includes(user.id));
    } else {
      users = project.mobileUsers;
    }
  }

  if(req.body.randomize) {

    const intervalWindows = req.body.intervalWindows;
    intervalWindows.map(window => {
      project.notifications.push({
        id: id,
        target: req.body.target,
        schedule: req.body.schedule,
        randomize: req.body.randomize,
        int_start: int_start,
        int_end: int_end,
        title: req.body.title,
        message: req.body.message,
        url: req.body.url,
        participantId: req.body.participantId,
        name: req.body.name,
        windowInterval: window,
        start_after: req.body.int_start.startAfter,
        stop_after: req.body.int_end.stopAfter,
        start_next: req.body.int_start.startNextDay,
        stop_next: req.body.int_end.stopNextDay,
        start_event: req.body.int_start.startEvent,
        stop_event: req.body.int_end.stopEvent,
        scheduleInFuture: req.body.scheduleInFuture,
        readable: {
          from: window.from && cronstrue.toString(window.from),
          to: window.to && cronstrue.toString(window.to),
        }
      });
    })

      if (users){
        users.map(user => {
            intervalWindows.map(window => {

              if(req.body.int_start.startEvent === 'registration'){
                if(req.body.int_start.startNextDay) {
                  // console.log('req.body.int_start.startNextDay', req.body.int_start.startNextDay);
                  const startNextDay = parseInt(req.body.int_start.startNextDay);
                  let whenToStart;
                  if(startNextDay == 1){
                    whenToStart = moment(user.created).add({ minutes: 1 }); // add 1 minute (in case the connection takes st)
                  } else {
                    whenToStart = moment(user.created).add({ days: startNextDay - 1 }).startOf('day').add({minutes: Math.floor((Math.random() * 10)), seconds: Math.floor((Math.random() * 60))});
                  }
                  int_start = whenToStart.toISOString();
                } else {
                  const start_event_ms = moment.duration({days: req.body.int_start.startAfter.days, hours: req.body.int_start.startAfter.hours, minutes: req.body.int_start.startAfter.minutes}).asMilliseconds();
                  int_start = new Date(Date.parse(user.created) + start_event_ms);
                }
              }
              // console.log('int_start', int_start);

              if (req.body.int_end.stopEvent === 'registration'){
                if(req.body.int_end.stopNextDay) {
                  // console.log('req.body.int_end.stopNextDay', req.body.int_end.stopNextDay);
                  const endNextDay = parseInt(req.body.int_end.stopNextDay);
                  let whenToEnd;
                  if(endNextDay == 1){
                    whenToEnd = moment(user.created).add({ minutes: 1 }); // add 1 minute (in case the connection takes st)
                  } else {
                    whenToEnd = moment(user.created).add({ days: endNextDay - 1 }).startOf('day').add({minutes: Math.floor((Math.random() * 10)), seconds: Math.floor((Math.random() * 60))});
                  }
                  int_end = whenToEnd.toISOString();
                } else {
                  const stop_event_ms = moment.duration({days: req.body.int_end.stopAfter.days, hours: req.body.int_end.stopAfter.hours, minutes: req.body.int_end.stopAfter.minutes}).asMilliseconds();
                  int_end = new Date(Date.parse(user.created) + stop_event_ms);
                }
              }
              // console.log('int_end', int_end);

              let windowFrom = window.from;
              let windowTo = window.to;

              //update interval if there is missing information
              if(windowFrom && windowFrom.includes('*/')) {
                let parsedFrom = windowFrom.split(' ');
                if(parsedFrom[3].includes('*/')){
                  parsedFrom[3] = parsedFrom[3].replace('*', new Date(int_start.getDate()));
                  windowFrom = parsedFrom.join(' ');
                }
              }
              if(windowTo && windowTo.includes('*/')) {
                let parsedTo = windowTo.split(' ');
                if(parsedTo[3].includes('*/')){
                  parsedTo[3] = parsedTo[3].replace('*', new Date(int_start.getDate()));
                  windowTo = parsedTo.join(' ');
                }
              }
              // console.log('from to', windowFrom, windowTo);

              agenda.schedule(int_start, 'start_random_personal_manager', {
                userid: user.id,
                projectid: req.user.project._id,
                id: id,
                interval: windowFrom,
                interval_max: windowTo,
                title: req.body.title,
                message: req.body.message,
                url: req.body.url,
                number: window.number,
              });
              agenda.schedule(int_end, 'end_random_personal_manager', {
                userid: user.id,
                projectid: req.user.project._id,
                id: id,
                interval: windowFrom,
                interval_max: windowTo,
                title: req.body.title,
                message: req.body.message,
                url: req.body.url,
                number: window.number,
              });
            })
        })
      }
  } else {

    const intervals = req.body.interval;
    intervals.map(interval => {
      // console.log('title', int_start, int_end, interval);
      project.notifications.push({
        id: id,
        target: req.body.target,
        schedule: req.body.schedule,
        randomize: req.body.randomize,
        interval: interval,
        int_start: int_start,
        int_end: int_end,
        title: req.body.title,
        message: req.body.message,
        url: req.body.url,
        participantId: req.body.participantId,
        name: req.body.name,
        scheduleInFuture: req.body.scheduleInFuture,
        readable: {
          interval: cronstrue.toString(interval),
        }
      });

      if (users){
        agenda.schedule(int_start, 'start_manager', {
          projectid: req.user.project._id,
          id: id,
          interval: interval,
          title: req.body.title,
          message: req.body.message,
          url: req.body.url,
          participantId: req.body.participantId,
        });
        agenda.schedule(int_end, 'end_manager', {
          projectid: req.user.project._id,
          id: id,
          interval: interval,
          title: req.body.title,
          message: req.body.message,
          url: req.body.url,
          participantId: req.body.participantId,
        });
      }
    })
  }
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
  // console.log('req.body createIndividualNotification', req.body);

  if(req.body.interval.length === 0){
    res.status(400).send();
    return;
  }

  let project = await Project.findOne({_id: req.user.project._id},{
    name: 1, notifications: 1, mobileUsers: 1,
  });
  const id = uniqid();

  // dependent on the strategy
  let int_start, int_end;
  if(req.body.int_start.start === 'specific' || req.body.int_start.startEvent === 'now'){
    int_start = req.body.int_start.startMoment;
  }
  if (req.body.int_end.stop === 'specific' || req.body.int_end.stopEvent === 'now'){
    int_end = req.body.int_end.stopMoment;
  }

  const intervals = req.body.interval;
  intervals.map(interval => {
    project.notifications.push({
      id: id,
      target: req.body.target,
      schedule: req.body.schedule,
      randomize: req.body.randomize,
      int_start: int_start,
      int_end: int_end,
      interval: interval,
      title: req.body.title,
      message: req.body.message,
      url: req.body.url,
      name: req.body.name,
      participantId: req.body.participantId,
      start_after: req.body.int_start.startAfter,
      stop_after: req.body.int_end.stopAfter,
      start_next: req.body.int_start.startNextDay,
      stop_next: req.body.int_end.stopNextDay,
      start_event: req.body.int_start.startEvent,
      stop_event: req.body.int_end.stopEvent,
      scheduleInFuture: req.body.scheduleInFuture,
      readable: {
        interval: cronstrue.toString(interval),
      }
    });
  })

  // check whether there are current participants to schedule the notifications
  let users;
  if(req.body.participantId) {
    if(req.body.participantId.length > 0) {
      users = project.mobileUsers.filter(user => req.body.participantId.includes(user.id));
    } else {
      users = project.mobileUsers;
    }
  }

  if (users) {
    users.map(user => {
        intervals.map(interval => {

          let updatedInterval = interval;

          if(req.body.int_start.startEvent === 'registration'){
            if(req.body.int_start.startNextDay) {
              // console.log('req.body.int_start.startNextDay', req.body.int_start.startNextDay);
              const startNextDay = parseInt(req.body.int_start.startNextDay);
              let whenToStart;
              if(startNextDay == 1){
                whenToStart = moment(user.created).add({ minutes: 1 }); // add 1 minute (in case the connection takes st)
              } else {
                whenToStart = moment(user.created).add({ days: startNextDay - 1 }).startOf('day').add({minutes: Math.floor((Math.random() * 10)), seconds: Math.floor((Math.random() * 60))});
              }
              int_start = whenToStart.toISOString();
            } else {
              const start_event_ms = moment.duration({days: req.body.int_start.startAfter.days, hours: req.body.int_start.startAfter.hours, minutes: req.body.int_start.startAfter.minutes}).asMilliseconds();
              int_start = new Date(Date.parse(user.created) + start_event_ms);
            }
          }
          // console.log('int_start', int_start);

          if(req.body.int_end.stopEvent === 'registration'){
            if(req.body.int_end.stopNextDay) {
              // console.log('req.body.int_end.stopNextDay', req.body.int_end.stopNextDay);
              const endNextDay = parseInt(req.body.int_end.stopNextDay);
              let whenToEnd;
              if(endNextDay == 1){
                whenToEnd = moment(user.created).add({ minutes: 1 }); // add 1 minute (in case the connection takes st)
              } else {
                whenToEnd = moment(user.created).add({ days: endNextDay - 1 }).startOf('day').add({minutes: Math.floor((Math.random() * 10)), seconds: Math.floor((Math.random() * 60))});
              }
              int_end = whenToEnd.toISOString();
            } else {
              const stop_event_ms = moment.duration({days: req.body.int_end.stopAfter.days, hours: req.body.int_end.stopAfter.hours, minutes: req.body.int_end.stopAfter.minutes}).asMilliseconds();
              int_end = new Date(Date.parse(user.created) + stop_event_ms);
            }
          }
          // console.log('int_end', int_end);

          //update interval if there is missing information
          if(updatedInterval && updatedInterval.includes('*/')) {
            let parsedInterval = updatedInterval.split(' ');
            if(parsedInterval[3].includes('*/')){
              parsedInterval[3] = parsedInterval[3].replace('*', new Date (int_start.getDate()));
              updatedInterval = parsedInterval.join(' ');
            }
          }
          // console.log('interval', updatedInterval, int_start, int_end);

          agenda.schedule(int_start, 'start_personal_manager', {
            userid: user.id,
            projectid: req.user.project._id,
            id: id,
            interval: updatedInterval,
            title: req.body.title,
            message: req.body.message,
            url: req.body.url,
          });
          agenda.schedule(int_end, 'end_personal_manager', {
            userid: user.id,
            projectid: req.user.project._id,
            id: id,
            interval: updatedInterval,
            title: req.body.title,
            message: req.body.message,
            url: req.body.url,
          });
        })
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

exports.createFixedIndividualNotification = async(req, res) => {

  // console.log('createFixedIndividualNotification - request body', req.body);

  if(req.body.intervals.length === 0){
    res.status(400).send();
    return;
  }

  let project = await Project.findOne({_id: req.user.project._id},{
    name: 1, notifications: 1, mobileUsers: 1,
  });
  const id = uniqid();

  const intervals = req.body.intervals;
  intervals.map(interval => {
    project.notifications.push({
      id: id,
      target: req.body.target,
      schedule: req.body.schedule,
      randomize: req.body.randomize,
      title: req.body.title,
      message: req.body.message,
      url: req.body.url,
      name: req.body.name,
      participantId: req.body.participantId,
      window_from: interval.from,
      window_to: interval.to,
      number: parseInt(interval.number),
      scheduleInFuture: req.body.scheduleInFuture,
    });
  })

  // check whether there are current participants to schedule the notifications
  let users;
  if(req.body.participantId) {
    if(req.body.participantId.length > 0) {
      users = project.mobileUsers.filter(user => req.body.participantId.includes(user.id));
    } else {
      users = project.mobileUsers;
    }
  }

  if (users) {
    users.map(user => {
        intervals.map(interval => {

          // pick up the random number between two dates
          const { from, to, number } = interval;

          for(let i = 0; i < number; i++){
            if(from > to){
              return;
            }
            const getRandomArbitrary = (min, max) => {
              return Math.round(Math.random() * (max - min) + min);
            }
            const randomEvent = getRandomArbitrary(Date.parse(from), Date.parse(to));
            const date = new Date(randomEvent).toISOString();

            // schedule the notification
            agenda.schedule(date, 'personal_notification', {
              userid: user.id,
              projectid: req.user.project._id,
              id: id,
              title: req.body.title,
              message: req.body.message,
              url: req.body.url,
              deleteself: true,
            });
          }

        })
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

}

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

async function pickUpRandomTimeFromInterval(done, project_id, user_id, title,
  message, url, notification_id, deleteself, interval, interval_max, number) {

    // get the next execution time
    const cronInstance = new Cron();
    const arr = interval_max.split(' ');
    arr.shift();
    const interval_max_striped = arr.join(' ');

    cronInstance.fromString(interval_max_striped);
    const schedule = cronInstance.schedule();
    const nextRunning = schedule.next().format();

    const timeBuffer = 30000; // since the internet connection might be slow
    const int_start = Date.now() + timeBuffer;
    const int_end = Date.parse(nextRunning);

    if(int_start > int_end){
      return;
    }

    const getRandomArbitrary = (min, max) => {
      return Math.round(Math.random() * (max - min) + min);
    }

    for(let i = 0; i < number; i++){
      const randomEvent = getRandomArbitrary(int_start, int_end);
      const date = new Date(randomEvent).toISOString();
      // console.log('timeRandomEvent', date);
      // schedule personal_notification
      agenda.schedule(date, 'personal_notification', {
        userid: user_id,
        projectid: project_id,
        id: notification_id,
        title: title,
        message: message,
        url: url,
        deleteself: deleteself,
      });
    }

    done();
  }

async function sendToSomeProjectUsers(done, project_id, user_id, title, message, url, notification_id, deleteself){
  const content = {
    title,
    message,
    url
  };
  // find the project
  const project = await Project.findOne({ _id: project_id },{ mobileUsers: 1, name: 1 });
  // filter only the users whom we want to send notifications
  const tokens = project.mobileUsers
    .filter(user => user_id.includes(user.id))
    .map(user => ({
      id: user.id,
      token: user.token,
    }));

  // remove job
  if(notification_id && deleteself){
    agenda.cancel({
      'data.projectid': project_id,
      'data.id': notification_id
    }, (err, numRemoved) => {
    });
  }

  await sendMobileNotification(done, content, tokens, project_id, project.name);
}

// send the notificaiton to all users who are members of the project (mobileUsers)
async function sendToAllProjectUsers(done, project_id, title, message, url, notification_id, deleteself, excludeUntil){
  const content = {
    title,
    message,
    url
  }
  // find the project
  const project = await Project.findOne({ _id: project_id },{ mobileUsers: 1, name: 1 });
  let users = project.mobileUsers;
  if(excludeUntil) {
    users = users.filter(user => user.created > excludeUntil);
  };
  const tokens = users
    .map(user => ({
      id: user.id,
      token: user.token,
    }));

  // remove job
  if(notification_id && deleteself){
    // console.log('will remove notification with id ', notification_id);
    agenda.cancel({
      'data.projectid': project_id,
      'data.id': notification_id
    }, (err, numRemoved) => {
    });
  }

  await sendMobileNotification(done, content, tokens, project_id, project.name)
}

// the most simple function to send mobile notification with content to the list of tokens
async function sendMobileNotification(done, content, tokens, project_id, project_name) {
  const {title, message, url} = content;

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
    const messageId = makeRandomCodeForMessageID();
    messages.push({
      to: pushToken.token,
      sound: 'default',
      title: title,
      body: message,
      data: { title, message, url: customizedUrl, messageId },
      id: pushToken.id,
      priority: 'high',
      channelId: 'default',
      _displayInForeground: true,
    })
  }
  // The Expo push notification service accepts batches of notifications so
  // that you don't need to send 1000 requests to send 1000 notifications. We
  // recommend you batch your notifications to reduce the number of requests
  // and to compress them (notifications with similar content will get
  // compressed).
  // console.log('messages', messages);

  let chunks = expo.chunkPushNotifications(messages);
  // let tickets = [];

  await Promise.all(chunks.map(async chunk => {
    let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
    ticketChunk.map(async (ticket, i) => {
      const result = new Result({
        project: project_id,
        project_name: project_name,
        samplyid: chunk[i].id,
        data: chunk[i].data,
        ticket: ticket,
        messageId: chunk[i].data.messageId,
        events: [{status: 'sent', created: Date.now()}],
      });
      await result.save();
    })
    // tickets.push(...ticketChunk);
    // NOTE: If a ticket contains an error code in ticket.details.error, you
    // must handle it appropriately. The error codes are listed in the Expo
    // documentation:
    // https://docs.expo.io/versions/latest/guides/push-notifications#response-format
  }))
  done();
};

// participants join a study on mobile phone, a user id is created if there was no one before
exports.joinStudy = async(req, res) => {
  const id = req.params.id;
  const project = await Project.findOne({_id: id},{
    notifications: 1, mobileUsers: 1, name: 1, description: 1, image: 1, slug: 1,
  });
  if(!project.mobileUsers){
    project.mobileUsers = [];
  }
  const newUser = {
    id: req.body.id,
    token: req.body.token,
    username: req.body.username,
    information: req.body.information,
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
      if( sub.scheduleInFuture && sub.schedule === 'repeat' ){

        let user_int_start = sub.int_start;
        let user_int_end = sub.int_end;
        if(sub.start_event === 'registration'){
          if(sub.start_next) {
            const startNextDay = parseInt(sub.start_next);
            let whenToStart;
            if(startNextDay == 1){
              whenToStart = moment().add({ minutes: 1 }); // add 1 minute (in case the connection takes st)
            } else {
              whenToStart = moment().add({ days: startNextDay - 1 }).startOf('day').add({minutes: Math.floor((Math.random() * 10)), seconds: Math.floor((Math.random() * 60))});
            }
            user_int_start = whenToStart.toISOString();
          } else {
            const start_event_ms = moment.duration({days: sub.start_after.days, hours: sub.start_after.hours, minutes: sub.start_after.minutes}).asMilliseconds();
            user_int_start = new Date(Date.now() + start_event_ms);
          }
        }

        if(sub.stop_event === 'registration'){
          if(sub.stop_next) {
            // console.log('sub.stop_next', sub.stop_next);
            const endNextDay = parseInt(sub.stop_next);
            let whenToEnd;
            if(endNextDay == 1){
              whenToEnd = moment().add({ minutes: 1 }); // add 1 minute (in case the connection takes st)
            } else {
              whenToEnd = moment().add({ days: endNextDay - 1 }).startOf('day').add({minutes: Math.floor((Math.random() * 10)), seconds: Math.floor((Math.random() * 60))});
            }
            user_int_end = whenToEnd.toISOString();
          } else {
            const stop_event_ms = moment.duration({days: sub.stop_after.days, hours: sub.stop_after.hours, minutes: sub.stop_after.minutes}).asMilliseconds();
            user_int_end = new Date(Date.now() + stop_event_ms);
          }
        }

        // if we need randomization, start random_person_manager
        if(sub.randomize){

          let windowFrom = sub.windowInterval && sub.windowInterval.from;
          let windowTo = sub.windowInterval && sub.windowInterval.to;

          //update interval if there is missing information
          if(windowFrom && windowFrom.includes('*/')) {
            let parsedFrom = windowFrom.split(' ');
            if(parsedFrom[3].includes('*/')){
              parsedFrom[3] = parsedFrom[3].replace('*', new Date(user_int_start).getDate());
              windowFrom = parsedFrom.join(' ');
            }
          }
          if(windowTo && windowTo.includes('*/')) {
            let parsedTo = windowTo.split(' ');
            if(parsedTo[3].includes('*/')){
              parsedTo[3] = parsedTo[3].replace('*', new Date(user_int_start).getDate());
              windowTo = parsedTo.join(' ');
            }
          }

          agenda.schedule(user_int_start, 'start_random_personal_manager', {
            userid: req.body.id,
            projectid: project._id,
            id: sub.id,
            interval: windowFrom,
            interval_max: windowTo,
            title: sub.title,
            message: sub.message,
            url: sub.url,
            number: sub.windowInterval && sub.windowInterval.number,
          });
          agenda.schedule(user_int_end, 'end_random_personal_manager', {
            userid: req.body.id,
            projectid: project._id,
            id: sub.id,
            interval: windowFrom,
            interval_max: windowTo,
            title: sub.title,
            message: sub.message,
            url: sub.url,
            number: sub.windowInterval && sub.windowInterval.number,
          });
        } else {

          let updatedInterval = sub.interval;

          //update interval if there is missing information
          if(updatedInterval && updatedInterval.includes('*/')) {
            let parsedInterval = updatedInterval.split(' ');
            if(parsedInterval[3].includes('*/')){
              parsedInterval[3] = parsedInterval[3].replace('*', new Date(user_int_start).getDate());
              updatedInterval = parsedInterval.join(' ');
            }
          }

          agenda.schedule(user_int_start, 'start_personal_manager', {
            userid: req.body.id,
            projectid: project._id,
            id: sub.id,
            interval: updatedInterval,
            title: sub.title,
            message: sub.message,
            url: sub.url,
          });
          agenda.schedule(user_int_end, 'end_personal_manager', {
            userid: req.body.id,
            projectid: project._id,
            id: sub.id,
            interval: updatedInterval,
            title: sub.title,
            message: sub.message,
            url: sub.url,
          });
        }
      } else if( sub.scheduleInFuture && sub.schedule === 'one-time' ){

          // pick up the random number between two dates
          for(let i = 0; i < sub.number; i++){

            if(sub.window_from > sub.window_to){
              // console.log('The ending time is earlier than the beginning time');
              return;
            }
            const getRandomArbitrary = (min, max) => {
              return Math.round(Math.random() * (max - min) + min);
            }
            const randomEvent = getRandomArbitrary(Date.parse(sub.window_from), Date.parse(sub.window_to));

            const date = new Date(randomEvent).toISOString();
            // console.log('timeRandomEvent', date);

            // schedule the notification
            agenda.schedule(date, 'personal_notification', {
              userid: req.body.id,
              projectid: project._id,
              id: sub.id,
              title: sub.title,
              message: sub.message,
              url: sub.url,
              deleteself: true,
            });
          }
      }
    })
  }
  const updatedUser = await User.findOneAndUpdate({ samplyId: req.body.id },
      { ['$addToSet'] : {
        participant_projects:  {
          _id: project._id,
          name: project.name,
          description: project.description,
          image: project.image,
          slug: project.slug,
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
  const project = await Project.findOne({_id: id},{
    mobileUsers: 1,
  });
  agenda.cancel({
    'data.projectid': project._id,
    'data.userid': req.body.id,
  }, (err, numRemoved) => {});
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

const makeRandomCodeForMessageID = () => {
    return 'mes-xxx-xxx-xxx-xxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

const rescheduleRepeatJobs = async () => {
  // look for all jobs with repeat interval
  const rawJobs = await agenda.jobs({ repeatInterval: {'$exists': true} });
  const jobs = rawJobs.map(job => job.attrs);

  jobs.map(async job => {

    let parsedInterval;
    if(!job.repeatInterval.includes('/')){
      return;
    } else {
      parsedInterval = job.repeatInterval.split(' ');
      if(!parsedInterval[3].includes('/')){
        return;
      }
    }

    let lastRunAt;
    if(job.lastRunAt){
      lastRunAt = job.lastRunAt;
    } else {
      // use cron if there is no job.lastRunAt
      const cronInstance = new Cron();
      const arr = job.repeatInterval.split(' ');
      arr.shift();
      const interval = arr.join(' ');
      cronInstance.fromString(interval);
      const schedule = cronInstance.schedule();
      lastRunAt = schedule.prev().toISOString();
      // lastRunAt = moment.utc(schedule.prev().format()).toISOString();
    }
    // console.log('lastRunAt: ', lastRunAt);

    if(lastRunAt){

      const [oldstart, step] = parsedInterval[3].split('/');
      const newstart = moment(lastRunAt).add({days: step});
      // console.log('newstart', newstart.date());
      parsedInterval[3] = `${newstart.date()}/${step}`;
      updatedInterval = parsedInterval.join(' ');
      // console.log('updatedInterval', updatedInterval);

      // tackle random_personal_notification
      if(job.name === 'random_personal_notification') {
        let new_interval = updatedInterval;
        let interval_max_splitted = job.data.interval_max.split(' ');
        interval_max_splitted[3] = parsedInterval[3];
        let new_interval_max = interval_max_splitted.join(' ');

        // console.log('new_interval, new_interval_max', new_interval, new_interval_max);
        // schedule new random_personal_notification
        const newjob = agenda.create(job.name, {
          ...job.data,
          interval: new_interval,
          interval_max: new_interval_max,
        });
        newjob.repeatEvery(updatedInterval, {
          skipImmediate: true
        });
        newjob.save();

      } else {
        // for all other types of notificaitons just copy the original data and schedule new notification
        // personal_notification
        // regular_notification
        const newjob = agenda.create(job.name, {
          ...job.data,
        });
        newjob.repeatEvery(updatedInterval, {
          skipImmediate: true
        });
        newjob.save();
      }
      // remove the old notification
      const numRemoved = await agenda.cancel({ _id: job._id });
      // console.log('numRemoved', numRemoved);
    }
  })
  // done();
}

exports.manageNotifications = async(req, res) => {
  // debug
  // await rescheduleRepeatJobs();

  const participant = req.params.id;
  const project = await Project.findOne({_id: req.user.project._id},{
    name: 1, notifications: 1, mobileUsers: 1,
  });
  // const notifications = project.notifications
  //   .sort(function(a,b){return a.date - b.date})
  //   .map(notification => {
  //     return {
  //       ...notification,
  //       readable: {
  //         from: notification.windowInterval && notification.windowInterval.from && cronstrue.toString(notification.windowInterval.from),
  //         to: notification.windowInterval && notification.windowInterval.to && cronstrue.toString(notification.windowInterval.to),
  //         interval: notification.windowInterval && notification.windowInterval.interval && cronstrue.toString(notification.windowInterval.interval),
  //       }
  //       }
  //     })
  res.render('notify', { project, participant });
};

exports.debug = async(req, res) => {
  const rawAdminJobs = await agenda.jobs({name: 'admin_job'});
  const adminJobs = rawAdminJobs.map(job => job.attrs);
  res.render('debug', { adminJobs });
}

exports.scheduleAdminJob = async(req, res) => {
  const { interval } = req.body;
  const monthlyScheduler = agenda.create('admin_job', {});
  monthlyScheduler.repeatEvery(interval, {
    skipImmediate: true
  });
  monthlyScheduler.save();
  res.redirect(`back`);
}

exports.updateTokenInStudy = async(req, res) => {
  // console.log('req.body', req.body);
  res.status(200).json({ message: 'OK' });
}
