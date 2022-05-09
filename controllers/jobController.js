const mongoose = require("mongoose");
const Job = mongoose.model("Job");
const User = mongoose.model("User");
const Result = mongoose.model("Result");
const Project = mongoose.model("Project");
const webpush = require("web-push");
const Agenda = require("agenda");
const uniqid = require("uniqid");
const moment = require("moment");
const Cron = require("cron-converter");
const cronstrue = require("cronstrue");
const { nanoid } = require("nanoid");

const { Expo } = require("expo-server-sdk");
let expo = new Expo();

const agenda = new Agenda({
  name: "samply-notifications",
  db: { address: process.env.DATABASE, collection: "Job" }
});

agenda.on("ready", function() {
  agenda.define("one_time_notification", (job, done) => {
    sendToAllProjectUsers({
      done: done,
      project_id: job.attrs.data.projectid,
      title: job.attrs.data.title,
      message: job.attrs.data.message,
      url: job.attrs.data.url,
      expireIn: job.attrs.data.expireIn,
      notification_id: job.attrs.data.id,
      deleteself: job.attrs.data.deleteself,
      excludeUntil: job.attrs.data.excludeUntil
    });
  });

  agenda.define("regular_notification", (job, done) => {
    if (
      (job.attrs.data.userid && job.attrs.data.userid.length > 0) ||
      (job.attrs.data.groupid && job.attrs.data.groupid.length > 0)
    ) {
      sendToSomeProjectUsers({
        done: done,
        project_id: job.attrs.data.projectid,
        user_id: job.attrs.data.userid,
        group_id: job.attrs.data.groupid,
        title: job.attrs.data.title,
        message: job.attrs.data.message,
        url: job.attrs.data.url,
        expireIn: job.attrs.data.expireIn
      });
    } else {
      sendToAllProjectUsers({
        done: done,
        project_id: job.attrs.data.projectid,
        title: job.attrs.data.title,
        message: job.attrs.data.message,
        url: job.attrs.data.url,
        expireIn: job.attrs.data.expireIn
      });
    }
  });

  agenda.define("start_manager", (job, done) => {
    const newjob = agenda.create("regular_notification", {
      projectid: job.attrs.data.projectid,
      userid: job.attrs.data.userid,
      id: job.attrs.data.id,
      title: job.attrs.data.title,
      message: job.attrs.data.message,
      url: job.attrs.data.url,
      expireIn: job.attrs.data.expireIn,
      groupid: job.attrs.data.groupid
    });
    newjob.repeatEvery(job.attrs.data.interval, {
      skipImmediate: true,
      timezone: job.attrs.data.timezone
    });
    newjob.save();
    done();
  });

  agenda.define("end_manager", (job, done) => {
    agenda.cancel(
      {
        "data.projectid": job.attrs.data.projectid,
        "data.id": job.attrs.data.id
      },
      (err, numRemoved) => {}
    );
    done();
  });

  agenda.define("personal_notification", (job, done) => {
    sendToSomeProjectUsers({
      done: done,
      project_id: job.attrs.data.projectid,
      user_id: job.attrs.data.userid,
      group_id: job.attrs.data.groupid,
      title: job.attrs.data.title,
      message: job.attrs.data.message,
      url: job.attrs.data.url,
      expireIn: job.attrs.data.expireIn,
      notification_id: job.attrs.data.id,
      deleteself: job.attrs.data.deleteself,
      schedule_id: job.attrs.data.scheduleid
    });
    done();
  });

  agenda.define("start_personal_manager", (job, done) => {
    const newjob = agenda.create("personal_notification", {
      userid: job.attrs.data.userid,
      groupid: job.attrs.data.groupid,
      projectid: job.attrs.data.projectid,
      id: job.attrs.data.id,
      title: job.attrs.data.title,
      message: job.attrs.data.message,
      url: job.attrs.data.url,
      expireIn: job.attrs.data.expireIn,
      deleteself: false
    });
    newjob.repeatEvery(job.attrs.data.interval, {
      skipImmediate: true,
      timezone: job.attrs.data.timezone
    });
    newjob.save();
    done();
  });

  agenda.define("end_personal_manager", (job, done) => {
    agenda.cancel(
      {
        "data.projectid": job.attrs.data.projectid,
        "data.id": job.attrs.data.id,
        "data.userid": job.attrs.data.userid,
        "data.groupid": job.attrs.data.groupid
      },
      (err, numRemoved) => {}
    );
    done();
  });

  // random personal notification
  agenda.define("random_personal_notification", (job, done) => {
    pickUpRandomTimeFromInterval({
      done: done,
      project_id: job.attrs.data.projectid,
      user_id: job.attrs.data.userid,
      group_id: job.attrs.data.groupid,
      title: job.attrs.data.title,
      message: job.attrs.data.message,
      url: job.attrs.data.url,
      expireIn: job.attrs.data.expireIn,
      notification_id: job.attrs.data.id,
      deleteself: job.attrs.data.deleteself,
      interval: job.attrs.data.interval,
      interval_max: job.attrs.data.interval_max,
      number: job.attrs.data.number,
      timezone: job.attrs.data.timezone
    });
    done();
  });

  // randomization manager
  agenda.define("start_random_personal_manager", (job, done) => {
    const newjob = agenda.create("random_personal_notification", {
      userid: job.attrs.data.userid,
      projectid: job.attrs.data.projectid,
      id: job.attrs.data.id,
      title: job.attrs.data.title,
      message: job.attrs.data.message,
      url: job.attrs.data.url,
      expireIn: job.attrs.data.expireIn,
      deleteself: false,
      interval: job.attrs.data.interval,
      interval_max: job.attrs.data.interval_max,
      number: job.attrs.data.number,
      timezone: job.attrs.data.timezone
    });
    newjob.repeatEvery(job.attrs.data.interval, {
      skipImmediate: true,
      timezone: job.attrs.data.timezone
    });
    newjob.save();
    done();
  });

  agenda.define("end_random_personal_manager", (job, done) => {
    agenda.cancel(
      {
        "data.projectid": job.attrs.data.projectid,
        "data.id": job.attrs.data.id,
        "data.userid": job.attrs.data.userid
      },
      (err, numRemoved) => {}
    );
    done();
  });

  // randomization group manager
  agenda.define("start_random_group_manager", (job, done) => {
    const newjob = agenda.create("random_personal_notification", {
      groupid: job.attrs.data.groupid,
      projectid: job.attrs.data.projectid,
      id: job.attrs.data.id,
      title: job.attrs.data.title,
      message: job.attrs.data.message,
      url: job.attrs.data.url,
      expireIn: job.attrs.data.expireIn,
      deleteself: false,
      interval: job.attrs.data.interval,
      interval_max: job.attrs.data.interval_max,
      number: job.attrs.data.number,
      timezone: job.attrs.data.timezone
    });
    newjob.repeatEvery(job.attrs.data.interval, {
      skipImmediate: true,
      timezone: job.attrs.data.timezone
    });
    newjob.save();
    done();
  });

  agenda.define("end_random_group_manager", (job, done) => {
    agenda.cancel(
      {
        "data.projectid": job.attrs.data.projectid,
        "data.id": job.attrs.data.id,
        "data.groupid": job.attrs.data.groupid
      },
      (err, numRemoved) => {}
    );
    done();
  });

  // define the admin job to update notifications in the beginning of each month
  agenda.define("admin_job", (job, done) => {
    rescheduleRepeatJobs(done);
    done();
  });

  agenda.start();

  async function graceful() {
    await agenda.stop();
  }

  process.on("SIGTERM", graceful);
  process.on("SIGINT", graceful);
});

exports.createScheduleNotification = async (req, res) => {
  // check whether the request body contains required information
  if (!req.body || !req.body.target || !req.body.schedule) {
    return res.status(400).end();
  }
  // update the information inside the project
  let project = await Project.findOne(
    { _id: req.user.project._id },
    {
      name: 1,
      notifications: 1,
      mobileUsers: 1
    }
  );

  // when "All future participants" are selected, we save information
  // in the project, and when a new user joins, schedule a new notification

  if (req.body.date && req.body.date.length > 0) {
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
        participantId: req.body.participants,
        groups: req.body.groups,
        allCurrentParticipants:
          req.body.participants && req.body.participants.length === 0,
        allCurrentGroups: req.body.groups && req.body.groups.length === 0,
        name: req.body.name,
        scheduleInFuture: req.body.scheduleInFuture,
        timezone: req.body.timezone,
        expireIn: req.body.expireIn,
        useParticipantTimezone: req.body.useParticipantTimezone
      });

      let groups;
      if (req.body.groups) {
        if (req.body.groups.length > 0) {
          groups = req.body.groups;
        } else {
          const allGroups = project.mobileUsers
            .map(user => user.group)
            .filter(item => typeof item !== "undefined");
          const allGroupsIds = allGroups.map(group => group.id);
          groups = [...new Set(allGroupsIds)];
        }
        agenda.schedule(date, "personal_notification", {
          groupid: groups,
          projectid: req.user.project._id,
          id: id,
          title: req.body.title,
          message: req.body.message,
          url: req.body.url,
          expireIn: req.body.expireIn,
          deleteself: true
        });
      }

      let users;
      if (req.body.participants) {
        if (req.body.participants.length > 0) {
          users = req.body.participants;
        } else {
          users = project.mobileUsers
            .filter(user => !user.deactivated)
            .map(user => user.id);
        }
        const res = schedulePersonalNotificationsForUsers({
          date: date,
          users: users, // []
          projectid: req.user.project._id, // String
          notificationid: id, // String - notification ID
          body: req.body, // {}
          deleteself: true // Boolean
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
};

exports.createIntervalNotification = async (req, res) => {
  if (req.body.int_start === "" || req.body.int_end === "") {
    res.status(400).send();
    return;
  }
  let project = await Project.findOne(
    { _id: req.user.project._id },
    {
      name: 1,
      notifications: 1,
      mobileUsers: 1
    }
  );
  const id = uniqid(); // notification id

  // dependent on the strategy
  let int_start, int_end;
  if (
    req.body.int_start.start === "specific" ||
    req.body.int_start.startEvent === "now"
  ) {
    int_start = req.body.int_start.startMoment;
  }
  if (
    req.body.int_end.stop === "specific" ||
    req.body.int_end.stopEvent === "now"
  ) {
    int_end = req.body.int_end.stopMoment;
  }

  // check whether there are current participants to schedule the notifications
  let users;
  if (req.body.participantId) {
    if (req.body.participantId.length > 0) {
      users = project.mobileUsers.filter(user =>
        req.body.participantId.includes(user.id)
      );
    } else {
      users = project.mobileUsers.filter(user => !user.deactivated);
    }
  }

  // check groups
  let groups;
  if (req.body.groups) {
    if (req.body.groups.length > 0) {
      groups = req.body.groups;
    } else {
      const allGroups = project.mobileUsers
        .map(user => user.group)
        .filter(item => typeof item !== "undefined");
      const allGroupsIds = allGroups.map(group => group.id);
      groups = [...new Set(allGroupsIds)];
    }
  }

  if (req.body.randomize) {
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
        groups: groups,
        allCurrentParticipants:
          req.body.participantId && req.body.participantId.length === 0,
        allCurrentGroups: req.body.groups && req.body.groups.length === 0,
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
          to: window.to && cronstrue.toString(window.to)
        },
        timezone: req.body.timezone,
        expireIn: req.body.expireIn,
        useParticipantTimezone: req.body.useParticipantTimezone
      });
    });

    // TODO this one below should be copied and modified for groups of users
    // new jobs should be created or modified to account for the situations where the notifications are yoked
    if (groups) {
      groups.map(group => {
        const sortedUsers = project.mobileUsers
          .filter(user => user.group && user.group.id === group)
          .sort((a, b) => Date.parse(b.created) - Date.parse(a.created));
        // use the latest user as a benchmark
        const latestUser = sortedUsers.length ? sortedUsers[0] : undefined;

        if (latestUser) {
          intervalWindows.map(window => {
            if (req.body.int_start.startEvent === "registration") {
              if (req.body.int_start.startNextDay) {
                const startNextDay = parseInt(req.body.int_start.startNextDay);
                let whenToStart;
                if (startNextDay == 1) {
                  whenToStart = moment(latestUser.created).add({ minutes: 1 }); // add 1 minute (in case the connection takes st)
                } else {
                  whenToStart = moment(latestUser.created)
                    .add({ days: startNextDay - 1 })
                    .startOf("day")
                    .add({
                      minutes: Math.floor(Math.random() * 10),
                      seconds: Math.floor(Math.random() * 60)
                    });
                }
                int_start = whenToStart.toISOString();
              } else {
                const start_event_ms = moment
                  .duration({
                    days: req.body.int_start.startAfter.days,
                    hours: req.body.int_start.startAfter.hours,
                    minutes: req.body.int_start.startAfter.minutes
                  })
                  .asMilliseconds();
                int_start = new Date(
                  Date.parse(latestUser.created) + start_event_ms
                );
              }
            }

            if (req.body.int_end.stopEvent === "registration") {
              if (req.body.int_end.stopNextDay) {
                const endNextDay = parseInt(req.body.int_end.stopNextDay);
                let whenToEnd;
                if (endNextDay == 1) {
                  whenToEnd = moment(latestUser.created).add({ minutes: 1 }); // add 1 minute (in case the connection takes st)
                } else {
                  whenToEnd = moment(latestUser.created)
                    .add({ days: endNextDay })
                    .startOf("day")
                    .add({
                      minutes: Math.floor(Math.random() * 10),
                      seconds: Math.floor(Math.random() * 60)
                    });
                }
                int_end = whenToEnd.toISOString();
              } else {
                const stop_event_ms = moment
                  .duration({
                    days: req.body.int_end.stopAfter.days,
                    hours: req.body.int_end.stopAfter.hours,
                    minutes: req.body.int_end.stopAfter.minutes
                  })
                  .asMilliseconds();
                int_end = new Date(
                  Date.parse(latestUser.created) + stop_event_ms
                );
              }
            }

            let windowFrom = window.from;
            let windowTo = window.to;

            // update interval if there is missing information
            if (windowFrom && windowFrom.includes("*/")) {
              let parsedFrom = windowFrom.split(" ");
              if (parsedFrom[3].includes("*/")) {
                parsedFrom[3] = parsedFrom[3].replace(
                  "*",
                  new Date(int_start.getDate())
                );
                windowFrom = parsedFrom.join(" ");
              }
            }
            if (windowTo && windowTo.includes("*/")) {
              let parsedTo = windowTo.split(" ");
              if (parsedTo[3].includes("*/")) {
                parsedTo[3] = parsedTo[3].replace(
                  "*",
                  new Date(int_start.getDate())
                );
                windowTo = parsedTo.join(" ");
              }
            }
            agenda.schedule(int_start, "start_random_group_manager", {
              groupid: [group],
              projectid: req.user.project._id,
              id: id,
              interval: windowFrom,
              interval_max: windowTo,
              title: req.body.title,
              message: req.body.message,
              url: req.body.url,
              expireIn: req.body.expireIn,
              number: window.number,
              timezone: req.body.timezone
            });
            agenda.schedule(int_end, "end_random_group_manager", {
              groupid: [group],
              projectid: req.user.project._id,
              id: id,
              interval: windowFrom,
              interval_max: windowTo,
              title: req.body.title,
              message: req.body.message,
              url: req.body.url,
              expireIn: req.body.expireIn,
              number: window.number,
              timezone: req.body.timezone
            });
          });
        }
      });
    }

    if (users) {
      users.map(async user => {
        intervalWindows.map(async window => {
          if (req.body.int_start.startEvent === "registration") {
            if (req.body.int_start.startNextDay) {
              const startNextDay = parseInt(req.body.int_start.startNextDay);
              let whenToStart;
              if (startNextDay == 1) {
                whenToStart = moment(user.created).add({ minutes: 1 }); // add 1 minute (in case the connection takes st)
              } else {
                whenToStart = moment(user.created)
                  .add({ days: startNextDay - 1 })
                  .startOf("day")
                  .add({
                    minutes: Math.floor(Math.random() * 10),
                    seconds: Math.floor(Math.random() * 60)
                  });
              }
              int_start = whenToStart.toISOString();
            } else {
              const start_event_ms = moment
                .duration({
                  days: req.body.int_start.startAfter.days,
                  hours: req.body.int_start.startAfter.hours,
                  minutes: req.body.int_start.startAfter.minutes
                })
                .asMilliseconds();
              int_start = new Date(Date.parse(user.created) + start_event_ms);
            }
          }

          if (req.body.int_end.stopEvent === "registration") {
            if (req.body.int_end.stopNextDay) {
              const endNextDay = parseInt(req.body.int_end.stopNextDay);
              let whenToEnd;
              if (endNextDay == 1) {
                whenToEnd = moment(user.created).add({ minutes: 1 }); // add 1 minute (in case the connection takes st)
              } else {
                whenToEnd = moment(user.created)
                  .add({ days: endNextDay })
                  .startOf("day")
                  .add({
                    minutes: Math.floor(Math.random() * 10),
                    seconds: Math.floor(Math.random() * 60)
                  });
              }
              int_end = whenToEnd.toISOString();
            } else {
              const stop_event_ms = moment
                .duration({
                  days: req.body.int_end.stopAfter.days,
                  hours: req.body.int_end.stopAfter.hours,
                  minutes: req.body.int_end.stopAfter.minutes
                })
                .asMilliseconds();
              int_end = new Date(Date.parse(user.created) + stop_event_ms);
            }
          }

          let windowFrom = window.from;
          let windowTo = window.to;

          // update interval if there is missing information
          if (windowFrom && windowFrom.includes("*/")) {
            let parsedFrom = windowFrom.split(" ");
            if (parsedFrom[3].includes("*/")) {
              parsedFrom[3] = parsedFrom[3].replace(
                "*",
                new Date(int_start.getDate())
              );
              windowFrom = parsedFrom.join(" ");
            }
          }
          if (windowTo && windowTo.includes("*/")) {
            let parsedTo = windowTo.split(" ");
            if (parsedTo[3].includes("*/")) {
              parsedTo[3] = parsedTo[3].replace(
                "*",
                new Date(int_start.getDate())
              );
              windowTo = parsedTo.join(" ");
            }
          }

          let timezone = req.body.timezone;
          // select timezone based on the user timezone
          if (req.body.useParticipantTimezone) {
            const participant = await User.findOne(
              { samplyId: user.id },
              { information: 1 }
            );
            if (
              participant &&
              participant.information &&
              participant.information.timezone
            ) {
              timezone = participant.information.timezone;
            }
          }

          agenda.schedule(int_start, "start_random_personal_manager", {
            userid: [user.id],
            projectid: req.user.project._id,
            id: id,
            interval: windowFrom,
            interval_max: windowTo,
            title: req.body.title,
            message: req.body.message,
            url: req.body.url,
            expireIn: req.body.expireIn,
            number: window.number,
            timezone
          });
          agenda.schedule(int_end, "end_random_personal_manager", {
            userid: [user.id],
            projectid: req.user.project._id,
            id: id,
            interval: windowFrom,
            interval_max: windowTo,
            title: req.body.title,
            message: req.body.message,
            url: req.body.url,
            expireIn: req.body.expireIn,
            number: window.number,
            timezone
          });
        });
      });
    }
  } else {
    const intervals = req.body.interval;
    intervals.map(interval => {
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
        groups: groups,
        allCurrentParticipants:
          req.body.participantId && req.body.participantId.length === 0,
        allCurrentGroups: req.body.groups && req.body.groups.length === 0,
        name: req.body.name,
        scheduleInFuture: req.body.scheduleInFuture,
        readable: {
          interval: cronstrue.toString(interval)
        },
        timezone: req.body.timezone,
        expireIn: req.body.expireIn,
        useParticipantTimezone: req.body.useParticipantTimezone
      });

      if (users && users.length) {
        // select timezone for each participant based on the user timezone
        if (req.body.useParticipantTimezone) {
          users.map(async user => {
            const participant = await User.findOne(
              { samplyId: user.id },
              { information: 1 }
            );
            let timezone = req.body.timezone;
            if (
              participant &&
              participant.information &&
              participant.information.timezone
            ) {
              timezone = participant.information.timezone;
            }
            agenda.schedule(int_start, "start_manager", {
              id: id,
              projectid: req.user.project._id,
              userid: [user.id],
              interval: interval,
              title: req.body.title,
              message: req.body.message,
              url: req.body.url,
              expireIn: req.body.expireIn,
              groupid: req.body.groups,
              timezone
            });
            agenda.schedule(int_end, "end_manager", {
              id: id,
              projectid: req.user.project._id,
              userid: [user.id],
              interval: interval,
              title: req.body.title,
              message: req.body.message,
              url: req.body.url,
              expireIn: req.body.expireIn,
              groupid: req.body.groups,
              timezone
            });
          });
        } else {
          const user_ids = users.map(user => user.id);
          // make general scheduler for all participants
          agenda.schedule(int_start, "start_manager", {
            id: id,
            projectid: req.user.project._id,
            userid: user_ids,
            interval: interval,
            title: req.body.title,
            message: req.body.message,
            url: req.body.url,
            expireIn: req.body.expireIn,
            groupid: req.body.groups,
            timezone: req.body.timezone
          });
          agenda.schedule(int_end, "end_manager", {
            id: id,
            projectid: req.user.project._id,
            userid: user_ids,
            interval: interval,
            title: req.body.title,
            message: req.body.message,
            url: req.body.url,
            expireIn: req.body.expireIn,
            groupid: req.body.groups,
            timezone: req.body.timezone
          });
        }
      }

      if (groups && groups.length) {
        agenda.schedule(int_start, "start_manager", {
          id: id,
          projectid: req.user.project._id,
          interval: interval,
          title: req.body.title,
          message: req.body.message,
          url: req.body.url,
          expireIn: req.body.expireIn,
          groupid: groups,
          timezone: req.body.timezone
        });
        agenda.schedule(int_end, "end_manager", {
          id: id,
          projectid: req.user.project._id,
          interval: interval,
          title: req.body.title,
          message: req.body.message,
          url: req.body.url,
          expireIn: req.body.expireIn,
          groupid: groups,
          timezone: req.body.timezone
        });
      }
    });
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
  if (req.body.interval.length === 0) {
    res.status(400).send();
    return;
  }

  let project = await Project.findOne(
    { _id: req.user.project._id },
    {
      name: 1,
      notifications: 1,
      mobileUsers: 1
    }
  );
  const id = uniqid();

  // dependent on the strategy
  let int_start, int_end;
  if (
    req.body.int_start.start === "specific" ||
    req.body.int_start.startEvent === "now"
  ) {
    int_start = req.body.int_start.startMoment;
  }
  if (
    req.body.int_end.stop === "specific" ||
    req.body.int_end.stopEvent === "now"
  ) {
    int_end = req.body.int_end.stopMoment;
  }

  // check whether there are current participants to schedule the notifications
  let users;
  if (req.body.participantId) {
    if (req.body.participantId.length > 0) {
      users = project.mobileUsers.filter(user =>
        req.body.participantId.includes(user.id)
      );
    } else {
      users = project.mobileUsers.filter(user => !user.deactivated);
    }
  }

  // check groups
  let groups;
  if (req.body.groups) {
    if (req.body.groups.length > 0) {
      groups = req.body.groups;
    } else {
      const allGroups = project.mobileUsers
        .map(user => user.group)
        .filter(item => typeof item !== "undefined");
      const allGroupsIds = allGroups.map(group => group.id);
      groups = [...new Set(allGroupsIds)];
    }
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
      groups: groups,
      allCurrentParticipants:
        req.body.participantId && req.body.participantId.length === 0,
      allCurrentGroups: req.body.groups && req.body.groups.length === 0,
      start_after: req.body.int_start.startAfter,
      stop_after: req.body.int_end.stopAfter,
      start_next: req.body.int_start.startNextDay,
      stop_next: req.body.int_end.stopNextDay,
      start_event: req.body.int_start.startEvent,
      stop_event: req.body.int_end.stopEvent,
      scheduleInFuture: req.body.scheduleInFuture,
      readable: {
        interval: cronstrue.toString(interval)
      },
      timezone: req.body.timezone,
      expireIn: req.body.expireIn,
      useParticipantTimezone: req.body.useParticipantTimezone
    });
  });

  if (groups) {
    groups.map(group => {
      const sortedUsers = project.mobileUsers
        .filter(user => user.group && user.group.id === group)
        .sort((a, b) => Date.parse(b.created) - Date.parse(a.created));
      // use the latest user as a benchmark
      const latestUser = sortedUsers.length ? sortedUsers[0] : undefined;

      intervals.map(interval => {
        let updatedInterval = interval;

        if (req.body.int_start.startEvent === "registration") {
          if (req.body.int_start.startNextDay) {
            const startNextDay = parseInt(req.body.int_start.startNextDay);
            let whenToStart;
            if (startNextDay == 1) {
              whenToStart = moment(latestUser.created).add({ minutes: 1 }); // add 1 minute (in case the connection takes st)
            } else {
              whenToStart = moment
                .tz(latestUser.created, req.body.timezone)
                .add({ days: startNextDay - 1 })
                .startOf("day")
                .add({
                  minutes: Math.floor(Math.random() * 10),
                  seconds: Math.floor(Math.random() * 60)
                });
            }
            int_start = whenToStart.toISOString();
          } else {
            const start_event_ms = moment
              .duration({
                days: req.body.int_start.startAfter.days,
                hours: req.body.int_start.startAfter.hours,
                minutes: req.body.int_start.startAfter.minutes
              })
              .asMilliseconds();
            int_start = new Date(
              Date.parse(latestUser.created) + start_event_ms
            );
          }
        }

        if (req.body.int_end.stopEvent === "registration") {
          if (req.body.int_end.stopNextDay) {
            const endNextDay = parseInt(req.body.int_end.stopNextDay);
            let whenToEnd;
            if (endNextDay == 1) {
              whenToEnd = moment(latestUser.created).add({ minutes: 1 }); // add 1 minute (in case the connection takes st)
            } else {
              whenToEnd = moment
                .tz(latestUser.created, req.body.timezone)
                .add({ days: endNextDay })
                .startOf("day")
                .add({
                  minutes: Math.floor(Math.random() * 10),
                  seconds: Math.floor(Math.random() * 60)
                });
            }
            int_end = whenToEnd.toISOString();
          } else {
            const stop_event_ms = moment
              .duration({
                days: req.body.int_end.stopAfter.days,
                hours: req.body.int_end.stopAfter.hours,
                minutes: req.body.int_end.stopAfter.minutes
              })
              .asMilliseconds();
            int_end = new Date(Date.parse(latestUser.created) + stop_event_ms);
          }
        }

        // update interval if there is missing information
        if (updatedInterval && updatedInterval.includes("*/")) {
          let parsedInterval = updatedInterval.split(" ");
          if (parsedInterval[3].includes("*/")) {
            parsedInterval[3] = parsedInterval[3].replace(
              "*",
              new Date(int_start.getDate())
            );
            updatedInterval = parsedInterval.join(" ");
          }
        }

        agenda.schedule(int_start, "start_personal_manager", {
          groupid: [group],
          projectid: req.user.project._id,
          id: id,
          interval: updatedInterval,
          title: req.body.title,
          message: req.body.message,
          url: req.body.url,
          expireIn: req.body.expireIn,
          timezone: req.body.timezone
        });
        agenda.schedule(int_end, "end_personal_manager", {
          groupid: [group],
          projectid: req.user.project._id,
          id: id,
          interval: updatedInterval,
          title: req.body.title,
          message: req.body.message,
          url: req.body.url,
          expireIn: req.body.expireIn,
          timezone: req.body.timezone
        });
      });
    });
  }

  if (users) {
    users.map(async user => {
      intervals.map(async interval => {
        let updatedInterval = interval;

        if (req.body.int_start.startEvent === "registration") {
          // TO DO: adjust here based on the timezone
          if (req.body.int_start.startNextDay) {
            const startNextDay = parseInt(req.body.int_start.startNextDay);
            let whenToStart;
            if (startNextDay == 1) {
              whenToStart = moment(user.created).add({ minutes: 1 }); // add 1 minute (in case the connection takes st)
            } else {
              // here should be local timezone
              whenToStart = moment
                .tz(user.created, req.body.timezone)
                .add({ days: startNextDay - 1 })
                .startOf("day")
                .add({
                  minutes: Math.floor(Math.random() * 10),
                  seconds: Math.floor(Math.random() * 60)
                });
            }
            int_start = whenToStart.toISOString();
          } else {
            const start_event_ms = moment
              .duration({
                days: req.body.int_start.startAfter.days,
                hours: req.body.int_start.startAfter.hours,
                minutes: req.body.int_start.startAfter.minutes
              })
              .asMilliseconds();
            int_start = new Date(Date.parse(user.created) + start_event_ms);
          }
        }

        if (req.body.int_end.stopEvent === "registration") {
          if (req.body.int_end.stopNextDay) {
            const endNextDay = parseInt(req.body.int_end.stopNextDay);
            let whenToEnd;
            if (endNextDay == 1) {
              whenToEnd = moment(user.created).add({ minutes: 1 }); // add 1 minute (in case the connection takes st)
            } else {
              whenToEnd = moment
                .tz(user.created, req.body.timezone)
                .add({ days: endNextDay })
                .startOf("day")
                .add({
                  minutes: Math.floor(Math.random() * 10),
                  seconds: Math.floor(Math.random() * 60)
                });
            }
            int_end = whenToEnd.toISOString();
          } else {
            const stop_event_ms = moment
              .duration({
                days: req.body.int_end.stopAfter.days,
                hours: req.body.int_end.stopAfter.hours,
                minutes: req.body.int_end.stopAfter.minutes
              })
              .asMilliseconds();
            int_end = new Date(Date.parse(user.created) + stop_event_ms);
          }
        }

        // update interval if there is missing information
        if (updatedInterval && updatedInterval.includes("*/")) {
          let parsedInterval = updatedInterval.split(" ");
          if (parsedInterval[3].includes("*/")) {
            parsedInterval[3] = parsedInterval[3].replace(
              "*",
              new Date(int_start.getDate())
            );
            updatedInterval = parsedInterval.join(" ");
          }
        }

        let timezone = req.body.timezone;
        // select timezone based on the user timezone
        if (req.body.useParticipantTimezone) {
          const participant = await User.findOne(
            { samplyId: user.id },
            { information: 1 }
          );
          if (
            participant &&
            participant.information &&
            participant.information.timezone
          ) {
            timezone = participant.information.timezone;
          }
        }

        agenda.schedule(int_start, "start_personal_manager", {
          userid: [user.id],
          projectid: req.user.project._id,
          id: id,
          interval: updatedInterval,
          title: req.body.title,
          message: req.body.message,
          url: req.body.url,
          expireIn: req.body.expireIn,
          timezone
        });
        agenda.schedule(int_end, "end_personal_manager", {
          userid: [user.id],
          projectid: req.user.project._id,
          id: id,
          interval: updatedInterval,
          title: req.body.title,
          message: req.body.message,
          url: req.body.url,
          expireIn: req.body.expireIn,
          timezone
        });
      });
    });
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

exports.createFixedIndividualNotification = async (req, res) => {
  if (req.body.intervals.length === 0) {
    res.status(400).send();
    return;
  }

  let project = await Project.findOne(
    { _id: req.user.project._id },
    {
      name: 1,
      notifications: 1,
      mobileUsers: 1
    }
  );
  const id = uniqid(); // notification id

  // check whether there are current participants to schedule the notifications
  let users;
  if (req.body.participantId) {
    if (req.body.participantId.length > 0) {
      users = project.mobileUsers.filter(user =>
        req.body.participantId.includes(user.id)
      );
    } else {
      users = project.mobileUsers.filter(user => !user.deactivated);
    }
  }

  // check groups
  let groups;
  if (req.body.groups) {
    if (req.body.groups.length > 0) {
      groups = req.body.groups;
    } else {
      const allGroups = project.mobileUsers
        .map(user => user.group)
        .filter(item => typeof item !== "undefined");
      const allGroupsIds = allGroups.map(group => group.id);
      groups = [...new Set(allGroupsIds)];
    }
  }

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
      groups: groups,
      allCurrentParticipants:
        req.body.participantId && req.body.participantId.length === 0,
      allCurrentGroups: req.body.groups && req.body.groups.length === 0,
      window_from: interval.from,
      window_to: interval.to,
      number: parseInt(interval.number),
      scheduleInFuture: req.body.scheduleInFuture,
      timezone: req.body.timezone,
      expireIn: req.body.expireIn,
      useParticipantTimezone: req.body.useParticipantTimezone
    });
  });

  if (groups) {
    groups.map(group => {
      intervals.map(interval => {
        // pick up the random number between two dates
        const { from, to, number } = interval;

        for (let i = 0; i < number; i++) {
          if (from > to) {
            return;
          }
          const getRandomArbitrary = (min, max) => {
            return Math.round(Math.random() * (max - min) + min);
          };
          const randomEvent = getRandomArbitrary(
            Date.parse(from),
            Date.parse(to)
          );
          const date = new Date(randomEvent).toISOString();
          const scheduleId = uniqid();

          // schedule the notification
          agenda.schedule(date, "personal_notification", {
            groupid: [group],
            projectid: req.user.project._id,
            id: id,
            title: req.body.title,
            message: req.body.message,
            url: req.body.url,
            expireIn: req.body.expireIn,
            deleteself: true,
            scheduleid: scheduleId
          });
        }
      });
    });
  }

  if (users) {
    users.map(user => {
      intervals.map(interval => {
        // pick up the random number between two dates
        const { from, to, number } = interval;

        for (let i = 0; i < number; i++) {
          if (from > to) {
            return;
          }
          const getRandomArbitrary = (min, max) => {
            return Math.round(Math.random() * (max - min) + min);
          };
          const randomEvent = getRandomArbitrary(
            Date.parse(from),
            Date.parse(to)
          );
          const date = new Date(randomEvent).toISOString();
          const scheduleId = uniqid();

          // schedule the notification
          const res = schedulePersonalNotificationsForUsers({
            date: date,
            users: [user.id], // []
            projectid: req.user.project._id, // String
            notificationid: id, // String - notification ID
            body: req.body, // {}
            deleteself: true, // Boolean
            scheduleid: scheduleId // String
          });
        }
      });
    });
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
exports.deleteProjectNotifications = async (req, res) => {
  const projectID = req.user.project._id;
  let project = await Project.findOne(
    { _id: req.user.project._id },
    {
      name: 1,
      notifications: 1
    }
  );
  project.notifications = [];
  agenda.cancel(
    {
      "data.projectid": projectID
    },
    function(err, numRemoved) {
      console.log("Error", err);
    }
  );
  await project.save((saveErr, updatedproject) => {
    if (saveErr) {
      res.status(400);
    } else {
      res.status(201);
    }
    res.redirect(`back`);
  });
};

// method for researchers to remove specific notification
exports.removeNotificationByID = async (req, res) => {
  const projectID = req.user.project._id;
  const notificationID = req.params.id;
  let project = await Project.findOne(
    { _id: projectID },
    {
      name: 1,
      notifications: 1
    }
  );
  project.notifications = await project.notifications.filter(n => {
    return n.id !== notificationID;
  });
  agenda.cancel(
    {
      "data.projectid": projectID,
      "data.id": notificationID
    },
    (err, numRemoved) => {}
  );
  await project.save((saveErr, updatedproject) => {
    if (saveErr) {
      res.status(400);
    } else {
      res.status(201);
      req.flash("success", `The notification was deleted`);
    }
    res.redirect(`back`);
  });
};

async function pickUpRandomTimeFromInterval({
  done,
  project_id,
  user_id,
  group_id,
  title,
  message,
  url,
  expireIn,
  notification_id,
  deleteself,
  interval,
  interval_max,
  number,
  timezone
}) {
  // get the next execution time
  const cronInstance = new Cron({
    timezone: timezone
  });
  const arr = interval_max.split(" ");
  arr.shift();
  const interval_max_striped = arr.join(" ");

  cronInstance.fromString(interval_max_striped);
  const schedule = cronInstance.schedule();
  const nextRunning = schedule.next().format();

  const timeBuffer = 30000; // since the internet connection might be slow
  const int_start = Date.now() + timeBuffer;
  const int_end = Date.parse(nextRunning);

  if (int_start > int_end) {
    return;
  }

  const getRandomArbitrary = (min, max) => {
    return Math.round(Math.random() * (max - min) + min);
  };

  for (let i = 0; i < number; i++) {
    const randomEvent = getRandomArbitrary(int_start, int_end);
    const date = new Date(randomEvent).toISOString();

    // schedule personal_notification
    agenda.schedule(date, "personal_notification", {
      userid: user_id,
      groupid: group_id,
      projectid: project_id,
      id: notification_id,
      title: title,
      message: message,
      url: url,
      expireIn: expireIn,
      deleteself: deleteself
    });
  }

  done();
}

async function sendToSomeProjectUsers({
  done,
  project_id,
  user_id,
  group_id,
  title,
  message,
  url,
  expireIn,
  notification_id,
  deleteself,
  schedule_id
}) {
  const content = {
    title,
    message,
    url,
    expireIn
  };
  // find the project
  const project = await Project.findOne(
    { _id: project_id },
    { mobileUsers: 1, name: 1 }
  );

  if (!project) {
    console.log(
      `We wanted to send a notification, but the project with id ${project_id} does not exist. . Therefore, all notifications for this project will be cancelled.`
    );
    agenda.cancel(
      {
        "data.projectid": project_id
      },
      (err, numRemoved) => {}
    );
    done();
    return;
  }

  // filter only the users whom we want to send notifications
  let tokens = [];

  // if there are groups, find participants of those groups
  if (group_id) {
    tokens = project.mobileUsers
      .filter(user => group_id.includes(user.group && user.group.id))
      .map(user => ({
        id: user.id,
        token: user.token,
        username: user.username, // transmit the username
        group: user.group && user.group.id, // transmit the group code
        deactivated: user.deactivated // whether the participant was deactivated
      }));
  }

  // if there are participants, find participants
  if (user_id) {
    tokens = project.mobileUsers
      .filter(user => user_id.includes(user.id))
      .map(user => ({
        id: user.id,
        token: user.token,
        username: user.username, // transmit the username
        group: user.group && user.group.id, // transmit the group code
        deactivated: user.deactivated // whether the participant was deactivated
      }));
  }

  // remove job
  if (notification_id && deleteself) {
    agenda.cancel(
      {
        "data.projectid": project_id,
        "data.id": notification_id,
        "data.scheduleid": schedule_id
      },
      (err, numRemoved) => {}
    );
  }

  await sendMobileNotification(done, content, tokens, project_id, project.name);
}

// send the notificaiton to all users who are members of the project (mobileUsers)
async function sendToAllProjectUsers({
  done,
  project_id,
  title,
  message,
  url,
  expireIn,
  notification_id,
  deleteself,
  excludeUntil
}) {
  const content = {
    title,
    message,
    url,
    expireIn
  };
  // find the project
  const project = await Project.findOne(
    { _id: project_id },
    { mobileUsers: 1, name: 1 }
  );

  if (!project) {
    console.log(
      `We wanted to send a notification, but the project with id ${project_id} does not exist. Therefore, all notifications for this project will be cancelled.`
    );
    agenda.cancel(
      {
        "data.projectid": project_id
      },
      (err, numRemoved) => {}
    );
    done();
    return;
  }

  let users = project.mobileUsers;
  if (excludeUntil) {
    users = users.filter(user => user.created > excludeUntil);
  }

  const tokens = users.map(user => ({
    id: user.id,
    token: user.token,
    username: user.username, // transmit the username
    group: user.group && user.group.id, // transmit the group code
    deactivated: user.deactivated // whether the participant was deactivated
  }));

  // remove job
  if (notification_id && deleteself) {
    agenda.cancel(
      {
        "data.projectid": project_id,
        "data.id": notification_id
      },
      (err, numRemoved) => {}
    );
  }

  await sendMobileNotification(done, content, tokens, project_id, project.name);
}

// the most simple function to send mobile notification with content to the list of tokens
async function sendMobileNotification(
  done,
  content,
  tokens,
  project_id,
  project_name
) {
  const { title, message, url, expireIn } = content;
  const timestampSent = Date.now();

  const messages = tokens.map(pushToken => {
    if (
      pushToken.deactivated ||
      !pushToken.token ||
      pushToken.token === "User left the study" ||
      pushToken.token === "miss" ||
      !Expo.isExpoPushToken(pushToken.token)
    ) {
      return {
        error: "Token is missing or it is invalid"
      };
    }

    // construct a message (see https://docs.expo.io/versions/latest/guides/push-notifications)
    const messageId = makeRandomCodeForMessageID();
    let updatedUrl = url;
    if (url.includes("%")) {
      if (url.includes("%MESSAGE_ID%")) {
        updatedUrl = updatedUrl.replace("%MESSAGE_ID%", messageId);
      }
      if (url.includes("%SAMPLY_ID%")) {
        updatedUrl = updatedUrl.replace("%SAMPLY_ID%", pushToken.id);
      }
      if (url.includes("%PARTICIPANT_CODE%") && pushToken.username) {
        updatedUrl = updatedUrl.replace(
          "%PARTICIPANT_CODE%",
          pushToken.username
        );
      }
      if (url.includes("%GROUP_ID%") && pushToken.group) {
        updatedUrl = updatedUrl.replace("%GROUP_ID%", pushToken.group);
      }
      if (url.includes("%TIMESTAMP_SENT%")) {
        updatedUrl = updatedUrl.replace("%TIMESTAMP_SENT%", timestampSent);
      }
    }

    const expireAt = expireIn ? timestampSent + parseInt(expireIn) : null;

    return {
      to: pushToken.token,
      sound: "default",
      title: title,
      body: message,
      data: {
        title,
        message,
        url: updatedUrl,
        messageId,
        expireAt
      },
      id: pushToken.id,
      priority: "high",
      channelId: "default",
      _displayInForeground: true
    };
  });

  const validMessages = messages.filter(message => !message.error);
  let chunks = expo.chunkPushNotifications(validMessages);

  await Promise.all(
    chunks.map(async chunk => {
      try {
        let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
        ticketChunk.map(async (ticket, i) => {
          const result = new Result({
            project: project_id,
            project_name: project_name,
            samplyid: chunk[i].id,
            data: chunk[i].data,
            ticket: ticket,
            messageId: chunk[i].data.messageId,
            events: [{ status: "sent", created: timestampSent }]
          });
          await result.save();
        });
      } catch (error) {
        console.error("Error with EXPO notification token", error);
        // TODO try to send notification again after some time
      }
      // tickets.push(...ticketChunk);
      // NOTE: If a ticket contains an error code in ticket.details.error, you
      // must handle it appropriately. The error codes are listed in the Expo
      // documentation:
      // https://docs.expo.io/versions/latest/guides/push-notifications#response-format
    })
  );
  done();
}

// participants join a study on mobile phone, a user id is created if there was no one before
exports.joinStudy = async (req, res) => {
  const id = req.params.id;
  const project = await Project.findOne(
    { _id: id },
    {
      notifications: 1,
      mobileUsers: 1,
      name: 1,
      description: 1,
      image: 1,
      slug: 1
    }
  );
  if (!project.mobileUsers) {
    project.mobileUsers = [];
  }

  let participantTimezone;
  const participant = await User.findOne(
    { samplyId: req.body.id },
    { information: 1 }
  );
  if (
    participant &&
    participant.information &&
    participant.information.timezone
  ) {
    participantTimezone = participant.information.timezone;
  }

  // record the group if there is one
  let group;
  if (req.body.group) {
    // remove whitespace from both ends of the string
    const newGroupName = req.body.group.trim();
    // search for the group in the existing groups
    const groups = project.mobileUsers.filter(
      user => user.group && user.group.name === newGroupName
    );
    if (groups.length) {
      // if group exists, add the group name and ID to a new user
      group = { name: groups[0].group.name, id: groups[0].group.id };
    } else {
      // if group does not exist, create new ID
      group = { name: newGroupName, id: nanoid(4) };
    }
  }

  let username;
  if (req.body.username) {
    username = req.body.username.trim();
  }

  const newUser = {
    id: req.body.id,
    token: req.body.token,
    username: username,
    group: group,
    information: req.body.information
  };
  let isNew = true;
  project.mobileUsers.map(user => {
    if (user.id === newUser.id) {
      user.token = newUser.token;
      user.deactivated = false;
      isNew = false;
    }
    return user;
  });
  if (isNew) {
    project.mobileUsers.push(newUser);
  }
  await project.save();

  // if there are scheduled notifications, create them for the new user
  if (project && project.notifications && project.notifications.length > 0) {
    project.notifications.map(async sub => {
      let timezone = sub.timezone;
      // select timezone based on the user timezone
      if (sub.useParticipantTimezone && participantTimezone) {
        timezone = participantTimezone;
      }

      if (sub.scheduleInFuture && sub.schedule === "repeat") {
        let user_int_start = sub.int_start;
        let user_int_end = sub.int_end;
        if (sub.start_event === "registration") {
          if (sub.start_next) {
            const startNextDay = parseInt(sub.start_next);
            let whenToStart;
            if (startNextDay == 1) {
              whenToStart = moment().add({ minutes: 1 }); // add 1 minute (in case the connection takes st)
            } else {
              whenToStart = moment
                .tz(timezone)
                .add({ days: startNextDay - 1 })
                .startOf("day")
                .add({
                  minutes: Math.floor(Math.random() * 10),
                  seconds: Math.floor(Math.random() * 60)
                });
            }
            user_int_start = whenToStart.toISOString();
          } else {
            const start_event_ms = moment
              .duration({
                days: sub.start_after.days,
                hours: sub.start_after.hours,
                minutes: sub.start_after.minutes
              })
              .asMilliseconds();
            user_int_start = new Date(Date.now() + start_event_ms);
          }
        }

        if (sub.stop_event === "registration") {
          if (sub.stop_next) {
            const endNextDay = parseInt(sub.stop_next);
            let whenToEnd;
            if (endNextDay == 1) {
              whenToEnd = moment().add({ minutes: 1 }); // add 1 minute (in case the connection takes st)
            } else {
              whenToEnd = moment
                .tz(timezone)
                .add({ days: endNextDay })
                .startOf("day")
                .add({
                  minutes: Math.floor(Math.random() * 10),
                  seconds: Math.floor(Math.random() * 60)
                });
            }
            user_int_end = whenToEnd.toISOString();
          } else {
            const stop_event_ms = moment
              .duration({
                days: sub.stop_after.days,
                hours: sub.stop_after.hours,
                minutes: sub.stop_after.minutes
              })
              .asMilliseconds();
            user_int_end = new Date(Date.now() + stop_event_ms);
          }
        }

        // if we need randomization, start random_person_manager
        if (sub.randomize) {
          let windowFrom = sub.windowInterval && sub.windowInterval.from;
          let windowTo = sub.windowInterval && sub.windowInterval.to;

          //update interval if there is missing information
          if (windowFrom && windowFrom.includes("*/")) {
            let parsedFrom = windowFrom.split(" ");
            if (parsedFrom[3].includes("*/")) {
              parsedFrom[3] = parsedFrom[3].replace(
                "*",
                new Date(user_int_start).getDate()
              );
              windowFrom = parsedFrom.join(" ");
            }
          }
          if (windowTo && windowTo.includes("*/")) {
            let parsedTo = windowTo.split(" ");
            if (parsedTo[3].includes("*/")) {
              parsedTo[3] = parsedTo[3].replace(
                "*",
                new Date(user_int_start).getDate()
              );
              windowTo = parsedTo.join(" ");
            }
          }

          agenda.schedule(user_int_start, "start_random_personal_manager", {
            userid: [req.body.id],
            projectid: project._id,
            id: sub.id,
            interval: windowFrom,
            interval_max: windowTo,
            title: sub.title,
            message: sub.message,
            url: sub.url,
            expireIn: sub.expireIn,
            number: sub.windowInterval && sub.windowInterval.number,
            timezone: timezone
          });
          agenda.schedule(user_int_end, "end_random_personal_manager", {
            userid: [req.body.id],
            projectid: project._id,
            id: sub.id,
            interval: windowFrom,
            interval_max: windowTo,
            title: sub.title,
            message: sub.message,
            url: sub.url,
            expireIn: sub.expireIn,
            number: sub.windowInterval && sub.windowInterval.number,
            timezone: timezone
          });
        } else {
          let updatedInterval = sub.interval;

          //update interval if there is missing information
          if (updatedInterval && updatedInterval.includes("*/")) {
            let parsedInterval = updatedInterval.split(" ");
            if (parsedInterval[3].includes("*/")) {
              parsedInterval[3] = parsedInterval[3].replace(
                "*",
                new Date(user_int_start).getDate()
              );
              updatedInterval = parsedInterval.join(" ");
            }
          }

          agenda.schedule(user_int_start, "start_personal_manager", {
            userid: [req.body.id],
            projectid: project._id,
            id: sub.id,
            interval: updatedInterval,
            title: sub.title,
            message: sub.message,
            url: sub.url,
            expireIn: sub.expireIn,
            timezone: timezone
          });
          agenda.schedule(user_int_end, "end_personal_manager", {
            userid: [req.body.id],
            projectid: project._id,
            id: sub.id,
            interval: updatedInterval,
            title: sub.title,
            message: sub.message,
            url: sub.url,
            expireIn: sub.expireIn,
            timezone: timezone
          });
        }
      } else if (sub.scheduleInFuture && sub.schedule === "one-time") {
        if (sub.target === "fixed-times") {
          const momentDate = moment.tz(sub.date, sub.timezone);
          const dateForParticipant = momentDate
            .tz(timezone, true)
            .toISOString();
          const dateConverted = new Date(dateForParticipant);
          const timestampForParticipant = dateConverted.getTime();

          // check whether the date is in the future
          if (timestampForParticipant > Date.now()) {
            agenda.schedule(dateForParticipant, "personal_notification", {
              userid: [req.body.id],
              projectid: project._id,
              id: sub.id,
              title: sub.title,
              message: sub.message,
              url: sub.url,
              expireIn: sub.expireIn,
              deleteself: true
            });
          }
        }
        if (sub.target === "user-specific") {
          // pick up the random number between two dates
          for (let i = 0; i < sub.number; i++) {
            if (sub.window_from > sub.window_to) {
              return;
            }
            const getRandomArbitrary = (min, max) => {
              return Math.round(Math.random() * (max - min) + min);
            };
            const randomEvent = getRandomArbitrary(
              Date.parse(sub.window_from),
              Date.parse(sub.window_to)
            );

            const date = new Date(randomEvent).toISOString();
            const scheduleId = uniqid();

            // schedule the notification
            const res = schedulePersonalNotificationsForUsers({
              date: date,
              users: [req.body.id], // []
              projectid: project._id, // String
              notificationid: sub.id, // String - notification ID
              body: {
                title: sub.title,
                message: sub.message,
                url: sub.url,
                expireIn: sub.expireIn,
                useParticipantTimezone: sub.useParticipantTimezone,
                timezone: sub.timezone
              }, // {}
              deleteself: true, // Boolean
              scheduleid: scheduleId // String
            });
          }
        }
      }
    });
  }
  const updatedUser = await User.findOneAndUpdate(
    { samplyId: req.body.id },
    {
      ["$addToSet"]: {
        participant_projects: {
          _id: project._id,
          name: project.name,
          description: project.description,
          image: project.image,
          slug: project.slug
        }
      }
    },
    { upsert: true, new: true }
  );
  if (updatedUser) {
    res.status(200).json({ message: "OK" });
  } else {
    res
      .status(400)
      .json({ message: "There was an error during the user update" });
  }
};

// participant leaves the study, the jobs with participant's id are deleted
exports.leaveStudy = async (req, res) => {
  const id = req.params.id;
  const project = await Project.findOne(
    { _id: id },
    {
      mobileUsers: 1
    }
  );
  agenda.cancel(
    {
      "data.projectid": project._id,
      "data.userid": [req.body.id]
    },
    (err, numRemoved) => {}
  );
  if (!project.mobileUsers) {
    project.mobileUsers = [];
  }
  const removeUserId = req.body.id;
  project.mobileUsers = project.mobileUsers.map(user => {
    if (user.id === removeUserId) {
      const updatedUser = {
        ...user._doc,
        deactivated: true,
        token: "User left the study"
      };
      return updatedUser;
    } else {
      return user;
    }
  });

  await project.save();
  const updatedUser = await User.findOneAndUpdate(
    { samplyId: req.body.id },
    {
      ["$pull"]: {
        participant_projects: { _id: project._id }
      }
    },
    { upsert: true, new: true }
  );
  if (updatedUser) {
    res.status(200).json({ message: "OK" });
  } else {
    res
      .status(400)
      .json({ message: "There was an error during the user update" });
  }
};

exports.removeUser = async (req, res) => {
  const project = await Project.findOne(
    { _id: req.user.project._id },
    {
      mobileUsers: 1,
      creator: 1
    }
  );
  if (!project.creator.equals(req.user._id)) {
    throw Error("You must be a creator of a project in order to do it!");
  }
  const userId = req.params.id;
  agenda.cancel(
    {
      "data.projectid": project._id,
      "data.userid": userId
    },
    (err, numRemoved) => {}
  );
  // update the project
  if (!project.mobileUsers) {
    project.mobileUsers = [];
  }
  project.mobileUsers = project.mobileUsers.filter(user => user.id !== userId);
  await project.save();

  // update the user
  const updatedUser = await User.findOneAndUpdate(
    { samplyId: userId },
    {
      ["$pull"]: {
        participant_projects: { _id: project._id }
      }
    },
    { upsert: true, new: true }
  );
  if (updatedUser) {
    res.redirect("back");
  } else {
    res.redirect("back"); // can also return an error
  }
};

const makeRandomCodeForMessageID = () => {
  return nanoid(10);
};

const rescheduleRepeatJobs = async () => {
  // look for all jobs with repeat interval
  const rawJobs = await agenda.jobs({ repeatInterval: { $exists: true } });
  const jobs = rawJobs.map(job => job.attrs);

  jobs.map(async job => {
    let parsedInterval;
    if (!job.repeatInterval.includes("/")) {
      return;
    } else {
      parsedInterval = job.repeatInterval.split(" ");
      if (!parsedInterval[3].includes("/")) {
        return;
      }
    }

    let lastRunAt;
    if (job.lastRunAt) {
      lastRunAt = job.lastRunAt;
    } else {
      // use cron if there is no job.lastRunAt
      const cronInstance = new Cron();
      const arr = job.repeatInterval.split(" ");
      arr.shift();
      const interval = arr.join(" ");
      cronInstance.fromString(interval);
      const schedule = cronInstance.schedule();
      lastRunAt = schedule.prev().toISOString();
    }

    if (lastRunAt) {
      const [oldstart, step] = parsedInterval[3].split("/");
      const newstart = moment(lastRunAt).add({ days: step });
      parsedInterval[3] = `${newstart.date()}/${step}`;
      updatedInterval = parsedInterval.join(" ");

      // tackle random_personal_notification
      if (job.name === "random_personal_notification") {
        let new_interval = updatedInterval;
        let interval_max_splitted = job.data.interval_max.split(" ");
        interval_max_splitted[3] = parsedInterval[3];
        let new_interval_max = interval_max_splitted.join(" ");

        // schedule new random_personal_notification
        const newjob = agenda.create(job.name, {
          ...job.data,
          interval: new_interval,
          interval_max: new_interval_max
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
          ...job.data
        });
        newjob.repeatEvery(updatedInterval, {
          skipImmediate: true
        });
        newjob.save();
      }
      // remove the old notification
      const numRemoved = await agenda.cancel({ _id: job._id });
    }
  });
};

exports.manageNotifications = async (req, res) => {
  const participant = req.params.id;
  const project = await Project.findOne(
    { _id: req.user.project._id },
    {
      name: 1,
      notifications: 1,
      mobileUsers: 1
    }
  );

  let groups = [];
  console.log("project", project);
  if (
    project &&
    project.mobileUsers.length &&
    project.mobileUsers.map(user => user.group).length
  ) {
    const allGroups = project.mobileUsers
      .map(user => user.group)
      .filter(item => typeof item !== "undefined");
    const allGroupsIds = allGroups.map(group => group.id);
    groups = [...new Set(allGroupsIds)].map(id => {
      return {
        id,
        name: allGroups
          .filter(group => group.id === id)
          .map(group => group.name)[0]
      };
    });
  }
  project.groups = groups;

  res.render("notify", { project, participant });
};

exports.debug = async (req, res) => {
  const rawAdminJobs = await agenda.jobs({ name: "admin_job" });
  const adminJobs = rawAdminJobs.map(job => job.attrs);
  res.render("debug", { adminJobs });
};

exports.scheduleAdminJob = async (req, res) => {
  const { interval } = req.body;
  const monthlyScheduler = agenda.create("admin_job", {});
  monthlyScheduler.repeatEvery(interval, {
    skipImmediate: true
  });
  monthlyScheduler.save();
  res.redirect(`back`);
};

exports.updateTokenInStudy = async (req, res) => {
  res.status(200).json({ message: "OK" });
};

// TODO groups
async function schedulePersonalNotificationsForUsers({
  date, // String
  users, // Array
  groups, // Array
  projectid, // String
  notificationid, // String
  body, // Object
  deleteself, // Boolean
  scheduleid // String
}) {
  if (!body.useParticipantTimezone) {
    const dateConverted = new Date(date);
    const timestamp = dateConverted.getTime();
    // check whether the date is in the future
    if (timestamp > Date.now()) {
      // schedule with agenda
      agenda.schedule(date, "personal_notification", {
        userid: users,
        projectid: projectid,
        id: notificationid,
        title: body.title,
        message: body.message,
        url: body.url,
        expireIn: body.expireIn,
        deleteself: deleteself,
        scheduleid: scheduleid
      });
    }
  } else {
    // schedule dependent on timezone of participant
    users.map(async user => {
      // find the user settings in the database
      const participant = await User.findOne(
        { samplyId: user },
        { information: 1 }
      );
      let dateForParticipant = date;

      if (
        participant &&
        participant.information &&
        participant.information.timezone
      ) {
        const timezone = participant.information.timezone;
        const momentDate = moment.tz(date, body.timezone);
        dateForParticipant = momentDate.tz(timezone, true).toISOString();
      }

      const dateForParticipantConverted = new Date(dateForParticipant);
      const timestampForParticipant = dateForParticipantConverted.getTime();
      // check whether the date is in the future
      if (timestampForParticipant > Date.now()) {
        // schedule notification dependend on the user local timezone
        agenda.schedule(dateForParticipant, "personal_notification", {
          userid: [user],
          projectid: projectid,
          id: notificationid,
          title: body.title,
          message: body.message,
          url: body.url,
          expireIn: body.expireIn,
          deleteself: deleteself,
          scheduleid: scheduleid
        });
      }
    });
  }

  return { message: "Success" };
}
