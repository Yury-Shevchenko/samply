const mongoose = require("mongoose");
const User = mongoose.model("User");
const Result = mongoose.model("Result");
const Project = mongoose.model("Project");
const PendingNotification = mongoose.model("PendingNotification");
const Agenda = require("agenda");
const uniqid = require("uniqid");
const moment = require("moment");
const Cron = require("cron-converter");
const cronstrue = require("cronstrue");
const { customAlphabet } = require("nanoid");
const nanoid = customAlphabet(
  "346789ABCDEFGHJKLMNPQRTUVWXYabcdefghijkmnpqrtwxyz",
  10
);
const webhookController = require("./webhookController");
const { scheduleBatch, cancelByNotificationId, cancelByParticipantId, cancelByFinid, cancelByProjectId, deleteByNotificationId, BatchLimitError } = require("../services/notificationScheduler");

const MAX_PROJECT_PENDING = 50_000;

function limitErrorResponse(req, res, message) {
  return res.json({ warning: message, redirect: req.get("Referer") || "/scheduled" });
}

// Wrapper that accumulates inserted/skipped counts into a shared counter object.
async function scheduleBatchTracked(docs, counter) {
  const result = await scheduleBatch(docs);
  counter.inserted += result.inserted;
  counter.skipped += result.skipped;
}

const types = {
  personal_notification: "job_type_one_time",
  regular_notification: "job_type_regular",
  start_manager: "job_type_start_manager",
  end_manager: "job_type_end_manager",
  start_random_personal_manager: "job_type_start_randomizer_manager",
  end_random_personal_manager: "job_type_end_randomizer_manager",
  random_personal_notification: "job_type_randomizer",
  one_time_notification: "job_type_one_time",
  start_personal_manager: "job_type_start_manager",
  end_personal_manager: "job_type_end_manager",
  start_random_group_manager: "job_type_start_manager",
  end_random_group_manager: "job_type_end_manager",
};

const typesReversed = {
  job_type_one_time: ["personal_notification", "one_time_notification"],
  job_type_regular: ["regular_notification"],
  job_type_start_manager: [
    "start_manager",
    "start_personal_manager",
    "start_random_group_manager",
  ],
  job_type_end_manager: [
    "end_manager",
    "end_personal_manager",
    "end_random_group_manager",
  ],
  job_type_start_randomizer_manager: ["start_random_personal_manager"],
  job_type_end_randomizer_manager: ["end_random_personal_manager"],
  job_type_randomizer: ["random_personal_notification"],
};

const { Expo } = require("expo-server-sdk");
let expo = new Expo();

const databaseUrl =
  process.env.NODE_ENV === "development"
    ? process.env.DATABASE_DEV
    : process.env.DATABASE;
const agenda = new Agenda({
  name: "samply-notifications",
  db: { address: databaseUrl, collection: "Job" },
});
exports.agenda = agenda;

agenda.on("ready", function () {
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
      excludeUntil: job.attrs.data.excludeUntil,
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
        expireIn: job.attrs.data.expireIn,
        reminders: job.attrs.data.reminders,
      });
    } else {
      sendToAllProjectUsers({
        done: done,
        project_id: job.attrs.data.projectid,
        title: job.attrs.data.title,
        message: job.attrs.data.message,
        url: job.attrs.data.url,
        expireIn: job.attrs.data.expireIn,
        reminders: job.attrs.data.reminders,
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
      groupid: job.attrs.data.groupid,
      reminders: job.attrs.data.reminders,
    });
    newjob.repeatEvery(job.attrs.data.interval, {
      skipImmediate: true,
      timezone: job.attrs.data.timezone,
    });
    newjob.save();
    done();
  });

  agenda.define("end_manager", (job, done) => {
    agenda.cancel(
      {
        "data.projectid": job.attrs.data.projectid,
        "data.id": job.attrs.data.id,
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
      schedule_id: job.attrs.data.scheduleid,
      reminders: job.attrs.data.reminders, // the list of reminders from the original schedule
      finid: job.attrs.data.finid, // id for reminders job
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
      deleteself: false,
      reminders: job.attrs.data.reminders,
    });
    newjob.repeatEvery(job.attrs.data.interval, {
      skipImmediate: true,
      timezone: job.attrs.data.timezone,
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
        "data.groupid": job.attrs.data.groupid,
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
      distance: job.attrs.data.distance,
      number: job.attrs.data.number,
      timezone: job.attrs.data.timezone,
      reminders: job.attrs.data.reminders,
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
      distance: job.attrs.data.distance,
      number: job.attrs.data.number,
      timezone: job.attrs.data.timezone,
      reminders: job.attrs.data.reminders,
    });
    newjob.repeatEvery(job.attrs.data.interval, {
      skipImmediate: true,
      timezone: job.attrs.data.timezone,
    });
    newjob.save();
    done();
  });

  agenda.define("end_random_personal_manager", (job, done) => {
    agenda.cancel(
      {
        "data.projectid": job.attrs.data.projectid,
        "data.id": job.attrs.data.id,
        "data.userid": job.attrs.data.userid,
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
      distance: job.attrs.data.distance,
      number: job.attrs.data.number,
      timezone: job.attrs.data.timezone,
      reminders: job.attrs.data.reminders,
    });
    newjob.repeatEvery(job.attrs.data.interval, {
      skipImmediate: true,
      timezone: job.attrs.data.timezone,
    });
    newjob.save();
    done();
  });

  agenda.define("end_random_group_manager", (job, done) => {
    agenda.cancel(
      {
        "data.projectid": job.attrs.data.projectid,
        "data.id": job.attrs.data.id,
        "data.groupid": job.attrs.data.groupid,
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
  if (!req.body || !req.body.target || !req.body.schedule) {
    return res.status(400).end();
  }
  if (!req.body.date || req.body.date.length === 0) {
    return res.status(400).send();
  }

  let project = await Project.findOne(
    { _id: req.user.project._id },
    { name: 1, notifications: 1, mobileUsers: 1 }
  );

  const existingPending = await PendingNotification.countDocuments({ projectId: req.user.project._id, status: "pending" });
  if (existingPending >= MAX_PROJECT_PENDING) {
    return limitErrorResponse(req, res, `This project already has ${existingPending.toLocaleString()} pending notifications (limit: ${MAX_PROJECT_PENDING.toLocaleString()}). Delete old notifications before scheduling more.`);
  }

  const counter = { inserted: 0, skipped: 0 };

  try {
  await Promise.all(
    req.body.date.map(async (date) => {
      const id = uniqid();

      project.notifications.push({
        id,
        target: req.body.target,
        schedule: req.body.schedule,
        randomize: req.body.randomize,
        date,
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
        useParticipantTimezone: req.body.useParticipantTimezone,
        reminders: req.body.reminders,
      });

      const baseDoc = {
        projectId: req.user.project._id,
        notificationConfigId: id,
        title: req.body.title,
        message: req.body.message,
        url: req.body.url || "",
        expireIn: req.body.expireIn,
        timezone: req.body.timezone,
        useParticipantTimezone: !!req.body.useParticipantTimezone,
      };

      if (req.body.groups) {
        const groups =
          req.body.groups.length > 0
            ? req.body.groups
            : [
                ...new Set(
                  project.mobileUsers
                    .map((u) => u.group)
                    .filter(Boolean)
                    .map((g) => g.id)
                ),
              ];
        const scheduledFor = new Date(date);
        await scheduleBatchTracked([
          { ...baseDoc, scheduledFor, recipientGroupIds: groups, recipientUserIds: [] },
        ], counter);
      }

      if (req.body.participants) {
        const users =
          req.body.participants.length > 0
            ? req.body.participants
            : project.mobileUsers.filter((u) => !u.deactivated).map((u) => u.id);

        if (!req.body.useParticipantTimezone) {
          const scheduledFor = new Date(date);
          await scheduleBatchTracked([
            { ...baseDoc, scheduledFor, recipientUserIds: users, recipientGroupIds: [] },
          ], counter);
        } else {
          const docs = await Promise.all(
            users.map(async (userId) => {
              const participant = await User.findOne(
                { samplyId: userId },
                { information: 1 }
              );
              let dateForParticipant = date;
              if (participant && participant.information && participant.information.timezone) {
                dateForParticipant = moment
                  .tz(date, req.body.timezone)
                  .tz(participant.information.timezone, true)
                  .toISOString();
              }
              return {
                ...baseDoc,
                scheduledFor: new Date(dateForParticipant),
                recipientUserIds: [userId],
                recipientGroupIds: [],
              };
            })
          );
          await scheduleBatchTracked(docs, counter);
        }
      }
    })
  );
  } catch (err) {
    if (err instanceof BatchLimitError) return limitErrorResponse(req, res, err.message);
    throw err;
  }

  project.save((saveErr) => {
    if (saveErr) res.status(400);
    else res.status(201);
    const isApiCall = !!req.headers["x-auth-token"];
    if (isApiCall) {
      return res.status(200).json({ message: "Notification was scheduled" });
    }
    if (counter.skipped > 0) {
      const warning = counter.inserted === 0
        ? "All selected dates were in the past — no notifications were queued."
        : `${counter.skipped} date(s) were in the past and skipped; ${counter.inserted} notification(s) were queued.`;
      return res.json({ warning, redirect: req.get("Referer") || "/scheduled" });
    }
    return res.redirect("back");
  });
};

exports.createIntervalNotification = async (req, res) => {
  if (req.body.int_start === "" || req.body.int_end === "") {
    res.status(400).send();
    return;
  }
  let project = await Project.findOne(
    { _id: req.user.project._id },
    { name: 1, notifications: 1, mobileUsers: 1 }
  );
  const id = uniqid();

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

  let users;
  if (req.body.participantId) {
    if (req.body.participantId.length > 0) {
      users = project.mobileUsers.filter((user) =>
        req.body.participantId.includes(user.id)
      );
    } else {
      users = project.mobileUsers.filter((user) => !user.deactivated);
    }
  }

  let groups;
  if (req.body.groups) {
    if (req.body.groups.length > 0) {
      groups = req.body.groups;
    } else {
      const allGroups = project.mobileUsers
        .map((user) => user.group)
        .filter((item) => typeof item !== "undefined");
      const allGroupsIds = allGroups.map((group) => group.id);
      groups = [...new Set(allGroupsIds)];
    }
  }

  const baseDoc = {
    projectId: req.user.project._id,
    notificationConfigId: id,
    title: req.body.title,
    message: req.body.message,
    url: req.body.url || "",
    expireIn: req.body.expireIn,
    timezone: req.body.timezone,
    useParticipantTimezone: !!req.body.useParticipantTimezone,
  };

  const existingPending2 = await PendingNotification.countDocuments({ projectId: req.user.project._id, status: "pending" });
  if (existingPending2 >= MAX_PROJECT_PENDING) {
    return limitErrorResponse(req, res, `This project already has ${existingPending2.toLocaleString()} pending notifications (limit: ${MAX_PROJECT_PENDING.toLocaleString()}). Delete old notifications before scheduling more.`);
  }

  const counter = { inserted: 0, skipped: 0 };

  try {
  if (req.body.randomize) {
    const intervalWindows = req.body.intervalWindows;
    intervalWindows.forEach((window) => {
      project.notifications.push({
        id,
        target: req.body.target,
        schedule: req.body.schedule,
        randomize: req.body.randomize,
        int_start,
        int_end,
        title: req.body.title,
        message: req.body.message,
        url: req.body.url,
        participantId: req.body.participantId,
        groups,
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
          to: window.to && cronstrue.toString(window.to),
        },
        timezone: req.body.timezone,
        expireIn: req.body.expireIn,
        useParticipantTimezone: req.body.useParticipantTimezone,
        reminders: req.body.reminders,
      });
    });

    if (groups) {
      await Promise.all(
        groups.map(async (group) => {
          const sortedUsers = project.mobileUsers
            .filter((user) => user.group && user.group.id === group)
            .sort((a, b) => Date.parse(b.created) - Date.parse(a.created));
          const latestUser = sortedUsers.length ? sortedUsers[0] : undefined;
          if (!latestUser) return;

          await Promise.all(
            intervalWindows.map(async (window) => {
              let groupStart = int_start;
              let groupEnd = int_end;

              if (req.body.int_start.startEvent === "registration") {
                if (req.body.int_start.startNextDay) {
                  const startNextDay = parseInt(req.body.int_start.startNextDay);
                  groupStart =
                    startNextDay == 1
                      ? moment(latestUser.created).add({ minutes: 1 }).toISOString()
                      : moment(latestUser.created)
                          .add({ days: startNextDay - 1 })
                          .startOf("day")
                          .add({ minutes: Math.floor(Math.random() * 10), seconds: Math.floor(Math.random() * 60) })
                          .toISOString();
                } else {
                  const ms = moment.duration(req.body.int_start.startAfter).asMilliseconds();
                  groupStart = new Date(Date.parse(latestUser.created) + ms);
                }
              }
              if (req.body.int_end.stopEvent === "registration") {
                if (req.body.int_end.stopNextDay) {
                  const endNextDay = parseInt(req.body.int_end.stopNextDay);
                  groupEnd = moment(latestUser.created)
                    .add({ days: endNextDay })
                    .startOf("day")
                    .add({ minutes: Math.floor(Math.random() * 10), seconds: Math.floor(Math.random() * 60) })
                    .toISOString();
                } else {
                  const ms = moment.duration(req.body.int_end.stopAfter).asMilliseconds();
                  groupEnd = new Date(Date.parse(latestUser.created) + ms);
                }
              }

              let windowFrom = window.from;
              let windowTo = window.to;
              if (windowFrom && windowFrom.includes("*/")) {
                const p = windowFrom.split(" ");
                if (p[3] && p[3].includes("*/"))
                  p[3] = p[3].replace("*", new Date(groupStart).getDate());
                windowFrom = p.join(" ");
              }
              if (windowTo && windowTo.includes("*/")) {
                const p = windowTo.split(" ");
                if (p[3] && p[3].includes("*/"))
                  p[3] = p[3].replace("*", new Date(groupStart).getDate());
                windowTo = p.join(" ");
              }

              const docs = computeRandomWindowDocs({
                ...baseDoc,
                windowFrom,
                windowTo,
                int_start: groupStart,
                int_end: groupEnd,
                number: window.number,
                distance: window.distance || 0,
                timezone: req.body.timezone,
                recipientGroupIds: [group],
                recipientUserIds: [],
              });
              await scheduleBatchTracked(docs, counter);
            })
          );
        })
      );
    }

    if (users) {
      await Promise.all(
        users.map(async (user) => {
          const participant = await User.findOne(
            { samplyId: user.id },
            { information: 1 }
          );
          const timezone =
            req.body.useParticipantTimezone &&
            participant &&
            participant.information &&
            participant.information.timezone
              ? participant.information.timezone
              : req.body.timezone;

          await Promise.all(
            intervalWindows.map(async (window) => {
              let userStart = int_start;
              let userEnd = int_end;

              if (req.body.int_start.startEvent === "registration") {
                if (req.body.int_start.startNextDay) {
                  const startNextDay = parseInt(req.body.int_start.startNextDay);
                  userStart =
                    startNextDay == 1
                      ? moment(user.created).add({ minutes: 1 }).toISOString()
                      : moment(user.created)
                          .add({ days: startNextDay - 1 })
                          .startOf("day")
                          .add({ minutes: Math.floor(Math.random() * 10), seconds: Math.floor(Math.random() * 60) })
                          .toISOString();
                } else {
                  const ms = moment.duration(req.body.int_start.startAfter).asMilliseconds();
                  userStart = new Date(Date.parse(user.created) + ms);
                }
              }
              if (req.body.int_end.stopEvent === "registration") {
                if (req.body.int_end.stopNextDay) {
                  const endNextDay = parseInt(req.body.int_end.stopNextDay);
                  userEnd = moment(user.created)
                    .add({ days: endNextDay })
                    .startOf("day")
                    .add({ minutes: Math.floor(Math.random() * 10), seconds: Math.floor(Math.random() * 60) })
                    .toISOString();
                } else {
                  const ms = moment.duration(req.body.int_end.stopAfter).asMilliseconds();
                  userEnd = new Date(Date.parse(user.created) + ms);
                }
              }

              let windowFrom = window.from;
              let windowTo = window.to;
              if (windowFrom && windowFrom.includes("*/")) {
                const p = windowFrom.split(" ");
                if (p[3] && p[3].includes("*/"))
                  p[3] = p[3].replace("*", new Date(userStart).getDate());
                windowFrom = p.join(" ");
              }
              if (windowTo && windowTo.includes("*/")) {
                const p = windowTo.split(" ");
                if (p[3] && p[3].includes("*/"))
                  p[3] = p[3].replace("*", new Date(userStart).getDate());
                windowTo = p.join(" ");
              }

              const docs = computeRandomWindowDocs({
                ...baseDoc,
                windowFrom,
                windowTo,
                int_start: userStart,
                int_end: userEnd,
                number: window.number,
                distance: window.distance || 0,
                timezone,
                recipientUserIds: [user.id],
                recipientGroupIds: [],
              });
              await scheduleBatchTracked(docs, counter);
            })
          );
        })
      );
    }
  } else {
    const intervals = req.body.interval;
    intervals.forEach((interval) => {
      project.notifications.push({
        id,
        target: req.body.target,
        schedule: req.body.schedule,
        randomize: req.body.randomize,
        interval,
        int_start,
        int_end,
        title: req.body.title,
        message: req.body.message,
        url: req.body.url,
        participantId: req.body.participantId,
        groups,
        allCurrentParticipants:
          req.body.participantId && req.body.participantId.length === 0,
        allCurrentGroups: req.body.groups && req.body.groups.length === 0,
        name: req.body.name,
        scheduleInFuture: req.body.scheduleInFuture,
        readable: { interval: cronstrue.toString(interval) },
        timezone: req.body.timezone,
        expireIn: req.body.expireIn,
        useParticipantTimezone: req.body.useParticipantTimezone,
        reminders: req.body.reminders,
      });
    });

    await Promise.all(
      intervals.map(async (interval) => {
        if (users && users.length) {
          if (req.body.useParticipantTimezone) {
            await Promise.all(
              users.map(async (user) => {
                const participant = await User.findOne(
                  { samplyId: user.id },
                  { information: 1 }
                );
                const timezone =
                  participant && participant.information && participant.information.timezone
                    ? participant.information.timezone
                    : req.body.timezone;
                const dates = expandCronBetween(interval, int_start, int_end, timezone);
                await scheduleBatchTracked(
                  dates.map((d) => ({
                    ...baseDoc,
                    scheduledFor: new Date(d),
                    timezone,
                    recipientUserIds: [user.id],
                    recipientGroupIds: [],
                  })),
                  counter
                );
              })
            );
          } else {
            const userIds = users.map((u) => u.id);
            const dates = expandCronBetween(interval, int_start, int_end, req.body.timezone);
            await scheduleBatchTracked(
              dates.map((d) => ({
                ...baseDoc,
                scheduledFor: new Date(d),
                recipientUserIds: userIds,
                recipientGroupIds: [],
              })),
              counter
            );
          }
        }

        if (groups && groups.length) {
          const dates = expandCronBetween(interval, int_start, int_end, req.body.timezone);
          await scheduleBatchTracked(
            dates.map((d) => ({
              ...baseDoc,
              scheduledFor: new Date(d),
              recipientGroupIds: groups,
              recipientUserIds: [],
            })),
            counter
          );
        }
      })
    );
  }
  } catch (err) {
    if (err instanceof BatchLimitError) return limitErrorResponse(req, res, err.message);
    throw err;
  }

  project.save((saveErr) => {
    if (saveErr) res.status(400);
    else res.status(201);
    const isApiCall = !!req.headers["x-auth-token"];
    if (isApiCall) {
      return res.status(200).json({ message: "Notification was scheduled" });
    }
    if (counter.skipped > 0) {
      const warning = counter.inserted === 0
        ? "All scheduled times were in the past — no notifications were queued."
        : `${counter.skipped} notification(s) were in the past and skipped; ${counter.inserted} were queued.`;
      return res.json({ warning, redirect: req.get("Referer") || "/scheduled" });
    }
    return res.redirect("back");
  });
};

exports.createIndividualNotification = async (req, res) => {
  if (req.body.interval.length === 0) {
    res.status(400).send();
    return;
  }

  let project = await Project.findOne(
    { _id: req.user.project._id },
    { name: 1, notifications: 1, mobileUsers: 1 }
  );
  const id = uniqid();

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

  let users;
  if (req.body.participantId) {
    if (req.body.participantId.length > 0) {
      users = project.mobileUsers.filter((user) =>
        req.body.participantId.includes(user.id)
      );
    } else {
      users = project.mobileUsers.filter((user) => !user.deactivated);
    }
  }

  let groups;
  if (req.body.groups) {
    if (req.body.groups.length > 0) {
      groups = req.body.groups;
    } else {
      const allGroups = project.mobileUsers
        .map((user) => user.group)
        .filter((item) => typeof item !== "undefined");
      const allGroupsIds = allGroups.map((group) => group.id);
      groups = [...new Set(allGroupsIds)];
    }
  }

  const intervals = req.body.interval;
  intervals.forEach((interval) => {
    project.notifications.push({
      id,
      target: req.body.target,
      schedule: req.body.schedule,
      randomize: req.body.randomize,
      int_start,
      int_end,
      interval,
      title: req.body.title,
      message: req.body.message,
      url: req.body.url,
      name: req.body.name,
      participantId: req.body.participantId,
      groups,
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
      readable: { interval: cronstrue.toString(interval) },
      timezone: req.body.timezone,
      expireIn: req.body.expireIn,
      useParticipantTimezone: req.body.useParticipantTimezone,
      reminders: req.body.reminders,
    });
  });

  const baseDoc = {
    projectId: req.user.project._id,
    notificationConfigId: id,
    title: req.body.title,
    message: req.body.message,
    url: req.body.url || "",
    expireIn: req.body.expireIn,
    timezone: req.body.timezone,
    useParticipantTimezone: !!req.body.useParticipantTimezone,
  };

  const existingPending3 = await PendingNotification.countDocuments({ projectId: req.user.project._id, status: "pending" });
  if (existingPending3 >= MAX_PROJECT_PENDING) {
    return limitErrorResponse(req, res, `This project already has ${existingPending3.toLocaleString()} pending notifications (limit: ${MAX_PROJECT_PENDING.toLocaleString()}). Delete old notifications before scheduling more.`);
  }
  const counter = { inserted: 0, skipped: 0 };

  try {
  if (groups) {
    await Promise.all(
      groups.map(async (group) => {
        const sortedUsers = project.mobileUsers
          .filter((user) => user.group && user.group.id === group)
          .sort((a, b) => Date.parse(b.created) - Date.parse(a.created));
        const latestUser = sortedUsers.length ? sortedUsers[0] : undefined;
        if (!latestUser) return;

        await Promise.all(
          intervals.map(async (interval) => {
            let groupStart = int_start;
            let groupEnd = int_end;

            if (req.body.int_start.startEvent === "registration") {
              if (req.body.int_start.startNextDay) {
                const n = parseInt(req.body.int_start.startNextDay);
                groupStart =
                  n == 1
                    ? moment(latestUser.created).add({ minutes: 1 }).toISOString()
                    : moment.tz(latestUser.created, req.body.timezone)
                        .add({ days: n - 1 }).startOf("day")
                        .add({ minutes: Math.floor(Math.random() * 10), seconds: Math.floor(Math.random() * 60) })
                        .toISOString();
              } else {
                const ms = moment.duration(req.body.int_start.startAfter).asMilliseconds();
                groupStart = new Date(Date.parse(latestUser.created) + ms);
              }
            }
            if (req.body.int_end.stopEvent === "registration") {
              if (req.body.int_end.stopNextDay) {
                const n = parseInt(req.body.int_end.stopNextDay);
                groupEnd = moment.tz(latestUser.created, req.body.timezone)
                  .add({ days: n }).startOf("day")
                  .add({ minutes: Math.floor(Math.random() * 10), seconds: Math.floor(Math.random() * 60) })
                  .toISOString();
              } else {
                const ms = moment.duration(req.body.int_end.stopAfter).asMilliseconds();
                groupEnd = new Date(Date.parse(latestUser.created) + ms);
              }
            }

            let updatedInterval = interval;
            if (updatedInterval && updatedInterval.includes("*/")) {
              const p = updatedInterval.split(" ");
              if (p[3] && p[3].includes("*/"))
                p[3] = p[3].replace("*", new Date(groupStart).getDate());
              updatedInterval = p.join(" ");
            }

            const dates = expandCronBetween(updatedInterval, groupStart, groupEnd, req.body.timezone);
            await scheduleBatchTracked(
              dates.map((d) => ({
                ...baseDoc,
                scheduledFor: new Date(d),
                recipientGroupIds: [group],
                recipientUserIds: [],
              })),
              counter
            );
          })
        );
      })
    );
  }

  if (users) {
    await Promise.all(
      users.map(async (user) => {
        const participant = await User.findOne({ samplyId: user.id }, { information: 1 });
        const timezone =
          req.body.useParticipantTimezone &&
          participant && participant.information && participant.information.timezone
            ? participant.information.timezone
            : req.body.timezone;

        await Promise.all(
          intervals.map(async (interval) => {
            let userStart = int_start;
            let userEnd = int_end;

            if (req.body.int_start.startEvent === "registration") {
              if (req.body.int_start.startNextDay) {
                const n = parseInt(req.body.int_start.startNextDay);
                userStart =
                  n == 1
                    ? moment(user.created).add({ minutes: 1 }).toISOString()
                    : moment.tz(user.created, req.body.timezone)
                        .add({ days: n - 1 }).startOf("day")
                        .add({ minutes: Math.floor(Math.random() * 10), seconds: Math.floor(Math.random() * 60) })
                        .toISOString();
              } else {
                const ms = moment.duration(req.body.int_start.startAfter).asMilliseconds();
                userStart = new Date(Date.parse(user.created) + ms);
              }
            }
            if (req.body.int_end.stopEvent === "registration") {
              if (req.body.int_end.stopNextDay) {
                const n = parseInt(req.body.int_end.stopNextDay);
                userEnd = moment.tz(user.created, req.body.timezone)
                  .add({ days: n }).startOf("day")
                  .add({ minutes: Math.floor(Math.random() * 10), seconds: Math.floor(Math.random() * 60) })
                  .toISOString();
              } else {
                const ms = moment.duration(req.body.int_end.stopAfter).asMilliseconds();
                userEnd = new Date(Date.parse(user.created) + ms);
              }
            }

            let updatedInterval = interval;
            if (updatedInterval && updatedInterval.includes("*/")) {
              const p = updatedInterval.split(" ");
              if (p[3] && p[3].includes("*/"))
                p[3] = p[3].replace("*", new Date(userStart).getDate());
              updatedInterval = p.join(" ");
            }

            const dates = expandCronBetween(updatedInterval, userStart, userEnd, timezone);
            await scheduleBatchTracked(
              dates.map((d) => ({
                ...baseDoc,
                scheduledFor: new Date(d),
                timezone,
                recipientUserIds: [user.id],
                recipientGroupIds: [],
              })),
              counter
            );
          })
        );
      })
    );
  }
  } catch (err) {
    if (err instanceof BatchLimitError) return limitErrorResponse(req, res, err.message);
    throw err;
  }

  project.save((saveErr) => {
    if (saveErr) res.status(400);
    else res.status(201);
    const isApiCall = !!req.headers["x-auth-token"];
    if (isApiCall) {
      return res.status(200).json({ message: "Notification was scheduled" });
    }
    if (counter.skipped > 0) {
      const warning = counter.inserted === 0
        ? "All scheduled times were in the past — no notifications were queued."
        : `${counter.skipped} notification(s) were in the past and skipped; ${counter.inserted} were queued.`;
      return res.json({ warning, redirect: req.get("Referer") || "/scheduled" });
    }
    return res.redirect("back");
  });
};

exports.createFixedIndividualNotification = async (req, res) => {
  if (req.body.intervals.length === 0) {
    res.status(400).send();
    return;
  }

  let project = await Project.findOne(
    { _id: req.user.project._id },
    { name: 1, notifications: 1, mobileUsers: 1 }
  );
  const id = uniqid();

  let users;
  if (req.body.participantId) {
    if (req.body.participantId.length > 0) {
      users = project.mobileUsers.filter((user) =>
        req.body.participantId.includes(user.id)
      );
    } else {
      users = project.mobileUsers.filter((user) => !user.deactivated);
    }
  }

  let groups;
  if (req.body.groups) {
    if (req.body.groups.length > 0) {
      groups = req.body.groups;
    } else {
      const allGroups = project.mobileUsers
        .map((user) => user.group)
        .filter((item) => typeof item !== "undefined");
      const allGroupsIds = allGroups.map((group) => group.id);
      groups = [...new Set(allGroupsIds)];
    }
  }

  const intervals = req.body.intervals;
  intervals.forEach((interval) => {
    project.notifications.push({
      id,
      target: req.body.target,
      schedule: req.body.schedule,
      randomize: req.body.randomize,
      title: req.body.title,
      message: req.body.message,
      url: req.body.url,
      name: req.body.name,
      participantId: req.body.participantId,
      groups,
      allCurrentParticipants:
        req.body.participantId && req.body.participantId.length === 0,
      allCurrentGroups: req.body.groups && req.body.groups.length === 0,
      window_from: interval.from,
      window_to: interval.to,
      number: parseInt(interval.number),
      distance: parseInt(interval.distance),
      scheduleInFuture: req.body.scheduleInFuture,
      timezone: req.body.timezone,
      expireIn: req.body.expireIn,
      useParticipantTimezone: req.body.useParticipantTimezone,
      reminders: req.body.reminders,
    });
  });

  const baseDoc = {
    projectId: req.user.project._id,
    notificationConfigId: id,
    title: req.body.title,
    message: req.body.message,
    url: req.body.url || "",
    expireIn: req.body.expireIn,
    timezone: req.body.timezone,
    useParticipantTimezone: !!req.body.useParticipantTimezone,
  };

  const existingPending4 = await PendingNotification.countDocuments({ projectId: req.user.project._id, status: "pending" });
  if (existingPending4 >= MAX_PROJECT_PENDING) {
    return limitErrorResponse(req, res, `This project already has ${existingPending4.toLocaleString()} pending notifications (limit: ${MAX_PROJECT_PENDING.toLocaleString()}). Delete old notifications before scheduling more.`);
  }
  const counter = { inserted: 0, skipped: 0 };

  try {
  if (groups) {
    const groupDocs = [];
    groups.forEach((group) => {
      intervals.forEach((interval) => {
        const { from, to, number, distance } = interval;
        if (from > to) return;
        getDatesInInterval(Date.parse(from), Date.parse(to), number, distance)
          .forEach((ts) => {
            groupDocs.push({
              ...baseDoc,
              scheduledFor: new Date(ts),
              recipientGroupIds: [group],
              recipientUserIds: [],
            });
          });
      });
    });
    await scheduleBatchTracked(groupDocs, counter);
  }

  if (users) {
    await Promise.all(
      users.map(async (user) => {
        let timezone = req.body.timezone;
        if (req.body.useParticipantTimezone) {
          const participant = await User.findOne({ samplyId: user.id }, { information: 1 });
          if (participant && participant.information && participant.information.timezone) {
            timezone = participant.information.timezone;
          }
        }

        const userDocs = [];
        intervals.forEach((interval) => {
          const { from, to, number, distance } = interval;
          if (from > to) return;

          let adjustedFrom = from;
          let adjustedTo = to;
          if (req.body.useParticipantTimezone && timezone !== req.body.timezone) {
            adjustedFrom = moment.tz(from, req.body.timezone).tz(timezone, true).toISOString();
            adjustedTo = moment.tz(to, req.body.timezone).tz(timezone, true).toISOString();
          }

          getDatesInInterval(Date.parse(adjustedFrom), Date.parse(adjustedTo), number, distance)
            .forEach((ts) => {
              userDocs.push({
                ...baseDoc,
                scheduledFor: new Date(ts),
                timezone,
                recipientUserIds: [user.id],
                recipientGroupIds: [],
              });
            });
        });
        await scheduleBatchTracked(userDocs, counter);
      })
    );
  }
  } catch (err) {
    if (err instanceof BatchLimitError) return limitErrorResponse(req, res, err.message);
    throw err;
  }

  project.save((saveErr) => {
    if (saveErr) res.status(400);
    else res.status(201);
    const isApiCall = !!req.headers["x-auth-token"];
    if (isApiCall) {
      return res.status(200).json({ message: "Notification was scheduled" });
    }
    if (counter.skipped > 0) {
      const warning = counter.inserted === 0
        ? "All scheduled times were in the past — no notifications were queued."
        : `${counter.skipped} notification(s) were in the past and skipped; ${counter.inserted} were queued.`;
      return res.json({ warning, redirect: req.get("Referer") || "/scheduled" });
    }
    return res.redirect("back");
  });
};

// method for researchers to remove all project notifications
exports.deleteProjectNotifications = async (req, res) => {
  const projectID = req.user.project._id;
  let project = await Project.findOne(
    { _id: req.user.project._id },
    {
      name: 1,
      notifications: 1,
    }
  );
  project.notifications = [];
  agenda.cancel(
    {
      "data.projectid": projectID,
    },
    function (err, numRemoved) {
      console.log("Error", err);
    }
  );
  await cancelByProjectId(projectID);
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
      notifications: 1,
    }
  );
  project.notifications = await project.notifications.filter((n) => {
    return n.id !== notificationID;
  });
  agenda.cancel(
    {
      "data.projectid": projectID,
      "data.id": notificationID,
    },
    (err, numRemoved) => {}
  );
  await deleteByNotificationId(projectID, notificationID);
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
  distance,
  number,
  timezone,
  reminders,
}) {
  // get the next execution time
  const cronInstance = new Cron({
    timezone: timezone,
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

  const nums = getDatesInInterval(int_start, int_end, number, distance);
  const ds = nums.map((n) => new Date(n).toISOString());

  // map over ds to schedule the notifications
  ds.map((date) => {
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
      deleteself: deleteself,
      reminders,
    });
  });

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
  schedule_id,
  reminders,
  finid,
}) {
  const content = {
    title,
    message,
    url,
    expireIn,
  };
  // find the project
  const project = await Project.findOne(
    { _id: project_id },
    { mobileUsers: 1, name: 1, settings: 1 }
  );

  if (!project) {
    console.log(
      `We wanted to send a notification, but the project with id ${project_id} does not exist. Therefore, all notifications for this project will be cancelled.`
    );
    agenda.cancel(
      {
        "data.projectid": project_id,
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
      .filter((user) => group_id.includes(user.group && user.group.id))
      .map((user) => ({
        id: user.id,
        token: user.token,
        username: user.username, // transmit the username
        group: user.group && user.group.id, // transmit the group code
        deactivated: user.deactivated, // whether the participant was deactivated
      }));
  }

  // if there are participants, find participants
  if (user_id) {
    tokens = project.mobileUsers
      .filter((user) => user_id.includes(user.id))
      .map((user) => ({
        id: user.id,
        token: user.token,
        username: user.username, // transmit the username
        group: user.group && user.group.id, // transmit the group code
        deactivated: user.deactivated, // whether the participant was deactivated
      }));
  }

  // remove job
  if (notification_id && deleteself) {
    agenda.cancel(
      {
        "data.projectid": project_id,
        "data.id": notification_id,
        "data.scheduleid": schedule_id,
      },
      (err, numRemoved) => {}
    );
  }

  await sendMobileNotification({
    done,
    content,
    tokens,
    project_id: project_id,
    project_name: project.name,
    reminders,
    finishid: finid,
    openStudyScreenFallback: project.settings && project.settings.enableActions,
  });
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
  excludeUntil,
  reminders,
}) {
  const content = {
    title,
    message,
    url,
    expireIn,
  };
  // find the project
  const project = await Project.findOne(
    { _id: project_id },
    { mobileUsers: 1, name: 1, settings: 1 }
  );

  if (!project) {
    console.log(
      `We wanted to send a notification, but the project with id ${project_id} does not exist. Therefore, all notifications for this project will be cancelled.`
    );
    agenda.cancel(
      {
        "data.projectid": project_id,
      },
      (err, numRemoved) => {}
    );
    done();
    return;
  }

  let users = project.mobileUsers;
  if (excludeUntil) {
    users = users.filter((user) => user.created > excludeUntil);
  }

  const tokens = users.map((user) => ({
    id: user.id,
    token: user.token,
    username: user.username, // transmit the username
    group: user.group && user.group.id, // transmit the group code
    deactivated: user.deactivated, // whether the participant was deactivated
  }));

  // remove job
  if (notification_id && deleteself) {
    agenda.cancel(
      {
        "data.projectid": project_id,
        "data.id": notification_id,
      },
      (err, numRemoved) => {}
    );
  }

  await sendMobileNotification({
    done,
    content,
    tokens,
    project_id,
    project_name: project.name,
    reminders,
    openStudyScreenFallback: project.settings && project.settings.enableActions,
  });
}

// the most simple function to send mobile notification with content to the list of tokens
async function sendMobileNotification({
  done,
  content,
  tokens,
  project_id,
  project_name,
  reminders,
  finishid,
  openStudyScreenFallback,
}) {
  const { title, message, url, expireIn } = content;
  const timestampSent = Date.now();

  const messages = await Promise.all(
    tokens.map(async (pushToken) => {
      if (
        pushToken.deactivated ||
        !pushToken.token ||
        pushToken.token === "User left the study" ||
        pushToken.token === "miss" ||
        !Expo.isExpoPushToken(pushToken.token)
      ) {
        return {
          error: "Token is missing or it is invalid",
        };
      }

      // calculate what is the batch number by looking at how many notifications were sent for the project
      const countRecords = await Result.where({
        project: project_id,
        samplyid: pushToken.id,
      }).countDocuments();
      const batch = countRecords + 1;

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
        if (url.includes("%BATCH%")) {
          updatedUrl = updatedUrl.replace("%BATCH%", batch);
        }
      }

      // schedule reminder notification
      let finid = finishid;
      if (reminders && reminders.length) {
        finid = nanoid(15); // completion id

        reminders.forEach((reminder) => {
          const timeToComplete = reminder.time; // time to complete before the deadline
          const deadline = new Date(Date.now() + timeToComplete);

          agenda.schedule(deadline, "personal_notification", {
            userid: [pushToken.id],
            projectid: project_id,
            id: uniqid(),
            title: reminder.title, // parameter from the user
            message: reminder.message, // parameter from the user
            url: updatedUrl, // parameter from the user
            expireIn: content.expireIn,
            deleteself: true, // remove not to clutter database
            scheduleid: finid, // all reminders have the same schedule id to remove it alltogether later
            finid: finid, // the id to pass further to all reminders
          });
        });
      }

      const expireAt = expireIn ? timestampSent + parseInt(expireIn) : null;

      return {
        to: pushToken.token,
        sound: "default",
        title: title,
        body: message,
        data: {
          title,
          body: message,
          message,
          url: updatedUrl,
          messageId,
          expireAt,
          openStudyScreenFallback: openStudyScreenFallback,
        },
        id: pushToken.id,
        priority: "high",
        channelId: "default",
        _displayInForeground: true,
        batch: batch,
        finid: finid,
        categoryId: project_id, // Use the study ID as the category ID
      };
    })
  );

  const validMessages = messages.filter((message) => !message.error);
  let chunks = expo.chunkPushNotifications(validMessages);

  await Promise.all(
    chunks.map(async (chunk) => {
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
            events: [{ status: "sent", created: timestampSent }],
            batch: chunk[i].batch,
            finid: chunk[i].finid, // the schedule id of all job reminders
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

// TODO finish reminders here

// participants join a study on mobile phone, a user id is created if there was no one before
exports.joinStudy = async (req, res) => {
  try {
    const id = req.params.id;
    const project = await Project.findOne(
      { _id: id },
      {
        notifications: 1,
        mobileUsers: 1,
        name: 1,
        description: 1,
        image: 1,
        slug: 1,
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
        (user) => user.group && user.group.name === newGroupName
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
      information: req.body.information,
    };
    let isNew = true;
    project.mobileUsers.map((user) => {
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
      await Promise.all(
        project.notifications.map(async (sub) => {
          const timezone =
            sub.useParticipantTimezone && participantTimezone
              ? participantTimezone
              : sub.timezone;

          const baseDoc = {
            projectId: project._id,
            notificationConfigId: sub.id,
            title: sub.title,
            message: sub.message,
            url: sub.url || "",
            expireIn: sub.expireIn,
            timezone,
            useParticipantTimezone: !!sub.useParticipantTimezone,
            recipientUserIds: [req.body.id],
            recipientGroupIds: [],
          };

          if (sub.scheduleInFuture && sub.schedule === "repeat") {
            let user_int_start = sub.int_start;
            let user_int_end = sub.int_end;

            if (sub.start_event === "registration") {
              if (sub.start_next) {
                const n = parseInt(sub.start_next);
                user_int_start =
                  n == 1
                    ? moment().add({ minutes: 1 }).toISOString()
                    : moment.tz(timezone)
                        .add({ days: n - 1 }).startOf("day")
                        .add({ minutes: Math.floor(Math.random() * 10), seconds: Math.floor(Math.random() * 60) })
                        .toISOString();
              } else {
                const ms = moment.duration(sub.start_after).asMilliseconds();
                user_int_start = new Date(Date.now() + ms);
              }
            }

            if (sub.stop_event === "registration") {
              if (sub.stop_next) {
                const n = parseInt(sub.stop_next);
                user_int_end = moment.tz(timezone)
                  .add({ days: n }).startOf("day")
                  .add({ minutes: Math.floor(Math.random() * 10), seconds: Math.floor(Math.random() * 60) })
                  .toISOString();
              } else {
                const ms = moment.duration(sub.stop_after).asMilliseconds();
                user_int_end = new Date(Date.now() + ms);
              }
            }

            if (sub.randomize) {
              let windowFrom = sub.windowInterval && sub.windowInterval.from;
              let windowTo = sub.windowInterval && sub.windowInterval.to;
              const distance = (sub.windowInterval && sub.windowInterval.distance) || 0;

              if (windowFrom && windowFrom.includes("*/")) {
                const p = windowFrom.split(" ");
                if (p[3] && p[3].includes("*/"))
                  p[3] = p[3].replace("*", new Date(user_int_start).getDate());
                windowFrom = p.join(" ");
              }
              if (windowTo && windowTo.includes("*/")) {
                const p = windowTo.split(" ");
                if (p[3] && p[3].includes("*/"))
                  p[3] = p[3].replace("*", new Date(user_int_start).getDate());
                windowTo = p.join(" ");
              }

              const docs = computeRandomWindowDocs({
                ...baseDoc,
                windowFrom,
                windowTo,
                int_start: user_int_start,
                int_end: user_int_end,
                number: sub.windowInterval && sub.windowInterval.number,
                distance,
                timezone,
              });
              await scheduleBatch(docs);
            } else {
              let updatedInterval = sub.interval;
              if (updatedInterval && updatedInterval.includes("*/")) {
                const p = updatedInterval.split(" ");
                if (p[3] && p[3].includes("*/"))
                  p[3] = p[3].replace("*", new Date(user_int_start).getDate());
                updatedInterval = p.join(" ");
              }
              const dates = expandCronBetween(updatedInterval, user_int_start, user_int_end, timezone);
              await scheduleBatch(dates.map((d) => ({ ...baseDoc, scheduledFor: new Date(d) })));
            }
          } else if (sub.scheduleInFuture && sub.schedule === "one-time") {
            if (sub.target === "fixed-times") {
              const dateForParticipant = moment.tz(sub.date, sub.timezone).tz(timezone, true).toISOString();
              if (new Date(dateForParticipant) > new Date()) {
                await scheduleBatch([{ ...baseDoc, scheduledFor: new Date(dateForParticipant) }]);
              }
            } else if (sub.target === "user-specific") {
              if (sub.window_from > sub.window_to) return;
              const nums = getDatesInInterval(
                Date.parse(sub.window_from),
                Date.parse(sub.window_to),
                sub.number,
                sub.distance || 0
              );
              await scheduleBatch(nums.map((ts) => ({ ...baseDoc, scheduledFor: new Date(ts) })));
            }
          }
        })
      );
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
            slug: project.slug,
          },
        },
      },
      { upsert: true, new: true }
    );

    // trigger webhook
    webhookController.triggerWebhook({
      projectId: id,
      event: "study_joined",
      data: {
        projectId: project.id,
        samplyId: newUser?.id,
        code: username,
        group: group,
      },
    });

    res.status(200).json({ message: "OK" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error });
  }
};

async function removeParticipantFromProject({
  participantId,
  projectId,
  message,
}) {
  const project = await Project.findOne(
    { _id: projectId },
    {
      mobileUsers: 1,
    }
  );
  agenda.cancel(
    {
      "data.projectid": project._id,
      "data.userid": [participantId],
    },
    (err, numRemoved) => {}
  );
  await cancelByParticipantId(project._id, participantId);
  if (!project.mobileUsers) {
    project.mobileUsers = [];
  }
  project.mobileUsers = project.mobileUsers.map((user) => {
    if (user.id === participantId) {
      const updatedUser = {
        ...user._doc,
        deactivated: true,
        token: message,
      };
      return updatedUser;
    } else {
      return user;
    }
  });
  await project.save();
}

// participant deletes the account from the mobile phone
exports.deleteAccountFromMobileApp = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (user && user.validPassword(password)) {
    // delete the participant from studies
    if (user && user.participant_projects && user.participant_projects.length) {
      await Promise.all(
        user.participant_projects.map(async (project) => {
          await removeParticipantFromProject({
            participantId: user.samplyId,
            projectId: project._id,
            message: "User deleted the account",
          });
        })
      );
    }
    await user.remove();
    res.status(200).json({ message: "OK" });
  } else {
    res.status(400).json({ message: "Wrong password" });
  }
};

// participant leaves the study, the jobs with participant's id are deleted
exports.leaveStudy = async (req, res) => {
  await removeParticipantFromProject({
    participantId: req.body.id,
    projectId: req.params.id,
    message: "User left the study",
  });
  const updatedUser = await User.findOneAndUpdate(
    { samplyId: req.body.id },
    {
      ["$pull"]: {
        participant_projects: { _id: req.params.id },
      },
    },
    { upsert: true, new: true }
  );

  const study = await Project.findOne(
    { _id: req.params.id },
    { mobileUsers: 1 }
  );
  let participant = {};
  if (
    study &&
    study.mobileUsers.filter((user) => user.id === req.body.id).length
  ) {
    participant = study.mobileUsers.filter(
      (user) => user.id === req.body.id
    )[0];
  }

  if (updatedUser) {
    // trigger webhook
    webhookController.triggerWebhook({
      projectId: req.params.id,
      event: "study_left",
      data: {
        projectId: req.params.id,
        id: req.body.id, // samply id of the participant
        code: participant?.username,
        group: participant?.group,
      },
    });

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
      creator: 1,
    }
  );
  if (!project.creator.equals(req.user._id)) {
    throw Error("You must be a creator of a project in order to do it!");
  }
  const userId = req.params.id;
  agenda.cancel(
    {
      "data.projectid": project._id,
      "data.userid": userId,
    },
    (err, numRemoved) => {}
  );
  await cancelByParticipantId(project._id, userId);
  // update the project
  if (!project.mobileUsers) {
    project.mobileUsers = [];
  }
  project.mobileUsers = project.mobileUsers.filter(
    (user) => user.id !== userId
  );
  await project.save();

  // update the user
  const updatedUser = await User.findOneAndUpdate(
    { samplyId: userId },
    {
      ["$pull"]: {
        participant_projects: { _id: project._id },
      },
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
  return nanoid(15);
};

const rescheduleRepeatJobs = async () => {
  // look for all jobs with repeat interval
  const rawJobs = await agenda.jobs({ repeatInterval: { $exists: true } });
  const jobs = rawJobs.map((job) => job.attrs);

  jobs.map(async (job) => {
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
          interval_max: new_interval_max,
        });
        newjob.repeatEvery(updatedInterval, {
          skipImmediate: true,
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
          skipImmediate: true,
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
      mobileUsers: 1,
    }
  );

  if (project) {
    let groups = [];
    if (
      project.mobileUsers &&
      project.mobileUsers.length &&
      project.mobileUsers.map((user) => user.group).length
    ) {
      const allGroups = project.mobileUsers
        .map((user) => user.group)
        .filter((item) => typeof item !== "undefined");
      const allGroupsIds = allGroups.map((group) => group.id);
      groups = [...new Set(allGroupsIds)].map((id) => {
        return {
          id,
          name: allGroups
            .filter((group) => group.id === id)
            .map((group) => group.name)[0],
        };
      });
    }
    project.groups = groups;
  }

  res.render("notify", { project, participant });
};

exports.debug = async (req, res) => {
  const rawAdminJobs = await agenda.jobs({ name: "admin_job" });
  const adminJobs = rawAdminJobs.map((job) => job.attrs);
  res.render("debug", { adminJobs });
};

exports.scheduleAdminJob = async (req, res) => {
  const { interval } = req.body;
  const monthlyScheduler = agenda.create("admin_job", {});
  monthlyScheduler.repeatEvery(interval, {
    skipImmediate: true,
  });
  monthlyScheduler.save();
  res.redirect(`back`);
};

exports.updateTokenInStudy = async (req, res) => {
  try {
    const { id, token } = req.body;
    if (!id || !token) {
      return res.status(400).json({ message: "Missing id or token" });
    }
    await Project.updateMany(
      { "mobileUsers.id": id },
      { $set: { "mobileUsers.$[user].token": token } },
      { arrayFilters: [{ "user.id": id }] }
    );
    res.status(200).json({ message: "OK" });
  } catch (e) {
    console.error("updateTokenInStudy error:", e);
    res.status(500).json({ message: "Error updating token" });
  }
};

// record completion of a survey/task and cancel scheduled reminders
async function registerCompletion({ study, messageid }) {
  const project = await Project.findOne(
    { slug: study },
    {
      _id: 1,
      name: 1,
      description: 1,
      created: 1,
      image: 1,
      completionMessage: 1,
    }
  );
  const result = await Result.findOne(
    { messageId: messageid, project: project?._id },
    { finid: 1 }
  );

  let numJobsRemoved = 0;

  if (project && result) {
    const { finid } = result;

    // cancel the job (legacy Agenda jobs + new PendingNotification reminders)
    numJobsRemoved = await agenda.cancel(
      {
        "data.projectid": project._id,
        "data.scheduleid": finid,
      },
      (err, numRemoved) => {
        console.log({ err });
      }
    );
    await cancelByFinid(project._id, finid);

    // log the completion of the survey
    // update the record with completion event (using messageId which is data.id)
    await Result.findOneAndUpdate(
      { messageId: messageid },
      {
        ["$addToSet"]: {
          events: { status: "completed", created: Date.now() },
        },
      },
      { upsert: true, new: true }
    );
  }
  return { project, result, numJobsRemoved };
}

exports.registerCompletionWithGet = async (req, res) => {
  const { project, result, numJobsRemoved } = await registerCompletion({
    study: req.params.study,
    messageid: req.params.messageid,
  });
  res.render("confirmation", { project, result, numJobsRemoved });
};

exports.registerCompletionWithPost = async (req, res) => {
  const numJobsRemoved = await registerCompletion({
    study: req.params.study,
    messageid: req.params.messageid,
  });
  if (numJobsRemoved < 1) {
    res.status(400).send();
  } else {
    res.status(200).send();
  }
};

async function schedulePersonalNotificationsForUsers({
  date, // String
  users, // Array
  groups, // Array
  projectid, // String
  notificationid, // String
  body, // Object
  deleteself, // Boolean
  scheduleid, // String
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
        scheduleid: scheduleid,
        reminders: body.reminders,
      });
    }
  } else {
    // schedule dependent on timezone of participant
    users.map(async (user) => {
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
          scheduleid: scheduleid,
          reminders: body.reminders,
        });
      }
    });
  }

  return { message: "Success" };
}

// Expand a cron expression into all timestamps between from and to (inclusive).
// Handles both 5-part and 6-part cron strings (strips leading seconds field if 6-part).
function expandCronBetween(cronExpr, from, to, timezone) {
  const parts = cronExpr.trim().split(/\s+/);
  const fivePart = parts.length >= 6 ? parts.slice(1).join(" ") : cronExpr;
  const cronInstance = new Cron({ timezone: timezone || "UTC" });
  try {
    cronInstance.fromString(fivePart);
  } catch (e) {
    console.error("expandCronBetween: invalid cron expression", cronExpr, e.message);
    return [];
  }
  const endMs = new Date(to).getTime();
  // Subtract 1ms so that a cron time exactly equal to `from` is included.
  const schedule = cronInstance.schedule(new Date(new Date(from).getTime() - 1));
  const dates = [];
  let next = schedule.next();
  while (next && next.valueOf() <= endMs) {
    dates.push(next.toISOString());
    next = schedule.next();
  }
  return dates;
}

// For a randomized window schedule: enumerate all window periods between int_start and int_end,
// compute random send times within each window, and return PendingNotification-shaped objects.
function computeRandomWindowDocs({
  windowFrom, windowTo, int_start, int_end,
  number, distance, timezone,
  ...docFields
}) {
  const windowStarts = expandCronBetween(windowFrom, int_start, int_end, timezone);
  const docs = [];

  for (const windowStart of windowStarts) {
    const parts = windowTo.trim().split(/\s+/);
    const fivePart = parts.length >= 6 ? parts.slice(1).join(" ") : windowTo;
    const endCron = new Cron({ timezone: timezone || "UTC" });
    try {
      endCron.fromString(fivePart);
    } catch (e) {
      continue;
    }
    const endSchedule = endCron.schedule(new Date(windowStart));
    const windowEndMoment = endSchedule.next();
    if (!windowEndMoment) continue;

    const windowStartMs = new Date(windowStart).getTime();
    const windowEndMs = windowEndMoment.valueOf();
    if (windowStartMs >= windowEndMs) continue;

    let timestamps;
    try {
      timestamps = getDatesInInterval(windowStartMs, windowEndMs, number, distance || 0);
    } catch (e) {
      continue;
    }
    for (const ts of timestamps) {
      docs.push({ ...docFields, scheduledFor: new Date(ts) });
    }
  }

  return docs;
}

function getNumberBetween(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function getNumbersInInterval(min, max, number, distance) {
  const step = (max - min) / number;
  const maxAmountNotifications = (max - min) / distance;

  if (number > maxAmountNotifications + 1) {
    throw new Error("The minimum interval between notifications is too big");
  }
  const numbers = [];
  if (number == maxAmountNotifications + 1) {
    for (let i = 0; i < number; i++) {
      const num = min + i * distance;
      numbers.push(num);
    }
  } else {
    for (let i = 0; i < number; i++) {
      const minStep = min + i * step;
      const maxStep = min + (i + 1) * step;
      numbers.push(getNumberBetween(minStep, maxStep));
    }
  }
  return numbers;
}

function checkTheMinimalDistance(numbers, distance) {
  if (numbers.length < 2) {
    return false;
  }
  for (let i = 0; i < numbers.length - 1; i++) {
    if (numbers[i + 1] - numbers[i] < distance) {
      return true;
    }
  }
  return false;
}

function getDatesInInterval(min, max, number, distance) {
  let numbers = [];
  let i = 0;
  let adjDistance = distance;
  do {
    numbers = getNumbersInInterval(min, max, number, adjDistance);
    i = i + 1;
    const ds = numbers.map((n) => new Date(n).toISOString());
    if (i > 100) {
      adjDistance = adjDistance - adjDistance / 1000;
    }
  } while (checkTheMinimalDistance(numbers, adjDistance) && i < 1000);
  return numbers;
}

// display project scheduled jobs
exports.displayScheduled = async (req, res) => {
  const project = await Project.findOne(
    { _id: req.user.project._id },
    {
      name: 1,
      notifications: 1,
    }
  );
  res.render("scheduled", { project });
};

// display project ID-specific scheduled jobs
exports.displayJobs = async (req, res) => {
  const project = await Project.findOne(
    { _id: req.user.project._id },
    {
      name: 1,
      notifications: 1,
      mobileUsers: 1,
    }
  );
  if (project) {
    project.notifications = project.notifications.filter(
      (notification) => notification?.id == req.params.id
    );
  }
  let jobs;
  if (req.params.type) {
    jobs = await agenda.jobs({
      name: { $in: typesReversed[req.params.type] },
      "data.projectid": req.user.project._id,
      "data.id": req.params.id,
    });
  } else {
    jobs = await agenda.jobs({
      "data.projectid": req.user.project._id,
      "data.id": req.params.id,
    });
  }

  const pnStatus = req.query.pnStatus;
  const pnUser = req.query.pnUser;
  const pnFilter = {
    projectId: req.user.project._id,
    notificationConfigId: req.params.id,
  };
  if (pnStatus) {
    pnFilter.status = pnStatus;
  } else {
    pnFilter.status = { $in: ["pending", "processing", "failed"] };
  }
  if (pnUser) {
    // match docs explicitly for this user OR "all participants" docs (empty recipientUserIds)
    pnFilter.$or = [
      { recipientUserIds: pnUser },
      { recipientUserIds: { $size: 0 } },
    ];
  }
  const pnLimit = 200;
  const [pendingNotifications, pendingCount, hasPendingSystem] = await Promise.all([
    PendingNotification.find(pnFilter).sort({ scheduledFor: 1 }).limit(pnLimit),
    PendingNotification.countDocuments(pnFilter),
    PendingNotification.exists({
      projectId: req.user.project._id,
      notificationConfigId: req.params.id,
    }),
  ]);

  const participants = (project && project.mobileUsers || []).map((u) => ({
    id: u.id,
    username: u.username,
    deactivated: u.deactivated,
  }));

  res.render("jobs", {
    id: req.params.id,
    project,
    jobs,
    types,
    typesReversed,
    pendingNotifications,
    pendingCount,
    pnLimit,
    pnStatus: pnStatus || "",
    pnUser: pnUser || "",
    participants,
    hasPendingSystem: !!hasPendingSystem,
  });
};

// display specific scheduled jobs
exports.getSpecificJob = async (req, res) => {
  const jobs = await agenda.jobs({
    _id: mongoose.Types.ObjectId(req.params.jobid),
  });
  let job;
  if (jobs && jobs.length) {
    job = jobs[0];
  }
  res.render("editJob", { job, types });
};

// update the scheduled job
exports.editJob = async (req, res) => {
  const { jobid, nextRunAt, data } = req.body;
  const jobs = await agenda.jobs({
    _id: mongoose.Types.ObjectId(jobid),
  });
  if (jobs && jobs.length) {
    Object.assign(jobs[0].attrs, { nextRunAt });
    Object.assign(jobs[0].attrs.data, { ...data });
    await jobs[0].save();
  }
  res.redirect("back");
};

// delete specific scheduled jobs
exports.removeJob = async (req, res) => {
  const numRemoved = await agenda.cancel({
    _id: mongoose.Types.ObjectId(req.params.jobid),
  });
  if (numRemoved === 1) {
    res.status(201);
    req.flash("success", `The job was deleted`);
  } else {
    res.status(400);
  }
  res.redirect(`back`);
};

// API FUNCTIONS
exports.findAllProjectJobsAPI = async ({ projectId }) => {
  const jobs = await agenda.jobs({
    "data.projectid": projectId,
  });
  return jobs;
};

// find jobs via API
exports.findJobsAPI = async ({ projectId, notificationId }) => {
  const jobs = await agenda.jobs({
    "data.projectid": projectId,
    "data.id": notificationId,
  });
  return jobs;
};

// find a specific job via API
exports.findJobAPI = async ({ projectId, notificationId, jobId }) => {
  const job = await agenda.jobs({
    "data.projectid": projectId,
    "data.id": notificationId,
    _id: mongoose.Types.ObjectId(jobId),
  });
  return job;
};

const pick = (obj, arr) =>
  Object.fromEntries(Object.entries(obj).filter(([k]) => arr.includes(k)));

// update a job via API
exports.updateJobAPI = async ({ projectId, notificationId, jobId, data }) => {
  const jobs = await agenda.jobs({
    "data.projectid": projectId,
    "data.id": notificationId,
    _id: mongoose.Types.ObjectId(jobId),
  });
  let job;
  if (jobs && jobs.length) {
    job = jobs[0];
    const filteredData = pick(data, ["data", "nextRunAt"]);
    const updatedData = {
      ...filteredData,
      data: { ...job.attrs.data, ...filteredData.data },
    };
    Object.assign(job.attrs, { ...updatedData });
    await job.save();
  }
  return job;
};

// delete a job via API
exports.deleteJobAPI = async ({ projectId, notificationId, jobId }) => {
  const numRemoved = await agenda.cancel({
    "data.projectid": projectId,
    "data.id": notificationId,
    _id: mongoose.Types.ObjectId(jobId),
  });
  return numRemoved;
};
