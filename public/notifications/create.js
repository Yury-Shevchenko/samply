const createNotificationBtn = document.querySelector("#createNotificationBtn");
const messageContent = document.querySelector("#messageContent");
const titleContent = document.querySelector("#titleContent");
const urlContent = document.querySelector("#urlContent");

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}

function createNotification() {
  if (!titleContent.value || titleContent.value.trim() === "") {
    alert("Enter a title");
    return;
  }

  if (!messageContent.value || messageContent.value.trim() === "") {
    alert("Enter a message");
    return;
  }

  let timezone;
  const zones = $(".zone-picker").data("timezonePicker").getValue();
  if (zones.length) {
    timezone = zones[0].timezone;
  } else {
    alert("Choose timezone");
    return;
  }

  // 1. get all information from the input fiels
  const input = document.querySelectorAll("input");
  const selected = input
    .filter((i) => i.checked || i.type === "number")
    .map((i) => ({ name: i.name, value: i.value }))
    .reduce((obj, item) => {
      obj[item.name] = item.value;
      return obj;
    }, {});

  const useParticipantTimezone = selected.useParticipantTimezone ? true : false;

  // participants
  let participants, scheduleInFuture;
  if (
    selected.participants_current === "current" &&
    selected.participants === "all"
  ) {
    participants = [];
  } else if (
    selected.participants_current === "current" &&
    selected.participants_ids &&
    selected.participants_ids !== ""
  ) {
    const participantTags = document.querySelectorAll(
      "input[name='participants_ids']"
    );
    participants = Array.from(participantTags)
      .filter((input) => input.checked)
      .map((input) => input.value);
    if (!participants || participants.length === 0) {
      alert(
        "Choose specific participants or select the all participants option"
      );
      return;
    }
  }

  if (selected.participants_future === "future") {
    scheduleInFuture = true;
  }

  if (!participants && !scheduleInFuture && !selected.participants_groups) {
    alert("Choose participants");
    return;
  }

  // groups
  let groups;
  if (selected.participants_groups === "groups" && selected.groups === "all") {
    groups = [];
  } else if (
    selected.participants_groups === "groups" &&
    selected.groups_ids &&
    selected.groups_ids !== ""
  ) {
    const groupTags = document.querySelectorAll("input[name='groups_ids']");
    groups = Array.from(groupTags)
      .filter((input) => input.checked)
      .map((input) => input.value);
  }

  if (selected.participants_groups === "groups" && !groups) {
    alert("Choose specific groups or select the all groups option");
    return;
  }

  // time
  let timepoints = [],
    timeintervals = [];
  let minuteCron;
  const time = selected.time;
  if (time === "specific") {
    timepoints = Array.from(
      document.querySelectorAll(".containerTimePicker")
    ).map((container) => {
      if (
        container.querySelector(".timePickerHour").value == "" ||
        container.querySelector(".timePickerMinute").value == ""
      ) {
        alert("Choose specific time points");
        throw new Error("Missing time values");
      }
      return {
        hour: container.querySelector(".timePickerHour").value,
        minute: container.querySelector(".timePickerMinute").value,
      };
    });
  } else if (time === "interval") {
    timeintervals = Array.from(
      document.querySelectorAll(".containerTimeWindow")
    ).map((container) => {
      if (
        container.querySelector(".windowPickerHourStart").value == "" ||
        container.querySelector(".windowPickerMinuteStart").value == "" ||
        container.querySelector(".windowPickerHourEnd").value == "" ||
        container.querySelector(".windowPickerMinuteEnd").value == ""
      ) {
        alert("Choose specific time points");
        throw new Error("Missing time values");
      }
      // calculate the minimum distance
      const number = parseInt(
        container.querySelector(".timeWindowNumberOfPointsInput").value
      );

      const distanceHour = parseInt(
        container.querySelector(".windowPickerHourDistance").value
      );
      const distanceMin = parseInt(
        container.querySelector(".windowPickerMinuteDistance").value
      );
      const distanceMinInMS = distanceMin * 60 * 1000 || 0;
      const distanceHourInMS = distanceHour * 60 * 60 * 1000 || 0;
      const distance = distanceHourInMS + distanceMinInMS;

      const hourStart = parseInt(
        container.querySelector(".windowPickerHourStart").value
      );
      const minuteStart = parseInt(
        container.querySelector(".windowPickerMinuteStart").value
      );
      const hourEnd = parseInt(
        container.querySelector(".windowPickerHourEnd").value
      );
      const minuteEnd = parseInt(
        container.querySelector(".windowPickerMinuteEnd").value
      );

      const difference =
        (hourEnd * 60 + minuteEnd - hourStart * 60 - minuteStart) * 60 * 1000;
      if (difference <= 0) {
        alert(
          "The time window is set incorrectly. The end time should be after the start time."
        );
        throw new Error(
          "The time window is set incorrectly. The end time should be after the start time."
        );
      }

      const maxAmountNotifications = difference / distance;

      if (number > maxAmountNotifications + 1) {
        alert("The minimum interval between notifications is too large");
        throw new Error(
          "The minimum interval between notifications is too large"
        );
      }

      return {
        hourStart: hourStart,
        minuteStart: minuteStart,
        hourEnd: hourEnd,
        minuteEnd: minuteEnd,
        distance: distance,
        number: number,
      };
    });
  } else if (time === "repeat") {
    const repeatMinute = document.querySelector(
      "select[name='time-every-minute']"
    ).value;
    minuteCron = `*/${repeatMinute}`;
  } else {
    alert("Choose time");
    return;
  }

  // dates: specific dates (dates), cron format of day of the month (dayMonthCron), or cron format for days of the week (dayWeekCron)
  let dates = [],
    dayMonthCron = "",
    dayWeekCron = "";
  const date = selected.date;
  if (date === "specific") {
    dates = Array.from(document.querySelectorAll(".containerDatePicker")).map(
      (container) => {
        if (
          container.querySelector(".datePickerDay").value == "" ||
          container.querySelector(".datePickerMonth").value == "" ||
          container.querySelector(".datePickerYear").value == ""
        ) {
          alert("Choose specific dates");
          throw new Error("Missing dates values");
        }
        return {
          day: container.querySelector(".datePickerDay").value,
          month: container.querySelector(".datePickerMonth").value - 1,
          year: container.querySelector(".datePickerYear").value,
        };
      }
    );
  } else if (date === "every") {
    dayWeekCron = "*";
    const everyday = document.querySelector(
      "select[name='date-every-day']"
    ).value;

    if (everyday == 1) {
      dayMonthCron = "*";
    } else {
      dayMonthCron = `*/${everyday}`; // by default * will be 1 (but has to be replaced later dependent on the starting point)
    }
  } else if (date === "start-month") {
    dayWeekCron = "*";
    const every = document.querySelector(
      "select[name='date-start-month-start-day']"
    ).value;
    const starting = document.querySelector(
      "select[name='date-start-month-from-day']"
    ).value[0];
    dayMonthCron = `${starting}/${every}`;
  } else if (date === "spec-week") {
    dayMonthCron = "*";
    const days = document.querySelectorAll("input[name='date-spec-week-day']");
    const daysShorted = Array.from(days)
      .filter((input) => input.checked)
      .map((input) => input.value);
    if (!daysShorted || daysShorted.length === 0) {
      alert("Choose specific week days or select other options");
      return;
    }
    dayWeekCron = daysShorted.join(",");
  } else if (date === "spec-month") {
    dayWeekCron = "*";
    const monthDays = document.querySelectorAll(
      "input[name='date-spec-week-month']"
    );
    const monthDaysShorted = Array.from(monthDays)
      .filter((input) => input.checked)
      .map((input) => input.value);
    if (!monthDaysShorted || monthDaysShorted.length === 0) {
      alert("Choose specific days of the month or select other options");
      return;
    }
    dayMonthCron = monthDaysShorted.join(",");
  } else {
    alert("Choose dates");
    return;
  }

  // month
  let monthCron = "";
  const month = selected.month;
  if (month === "every") {
    monthCron = "*";
  } else if (month === "specific") {
    const months = document.querySelectorAll("input[name='month-spec-month']");
    const monthShorted = Array.from(months)
      .filter((input) => input.checked)
      .map((input) => input.value);
    if (!monthShorted || monthShorted.length === 0) {
      alert("Choose specific months or select other options");
      return;
    }
    monthCron = monthShorted.join(",");
  } else {
    if (date !== "specific") {
      alert("Choose month");
      return;
    }
  }

  // start moment
  let startMoment = "",
    startAfter = "",
    startEvent = "",
    startNextDay = "";
  const start = selected.start;
  if (start === "specific") {
    const st = {
      hour: selected["start-specific-hour"],
      minute: selected["start-specific-minute"],
      day: selected["start-specific-day"],
      month: selected["start-specific-month"] - 1,
      year: selected["start-specific-year"],
    };
    const stCon = moment.tz(
      {
        year: st.year,
        month: st.month,
        day: st.day,
        hour: st.hour,
        minute: st.minute,
      },
      timezone
    );
    startMoment = stCon.toISOString();
    // change the interval if was not specified
    if (dayMonthCron && dayMonthCron.includes("*/")) {
      dayMonthCron = dayMonthCron.replace("*", st.day);
    }
    if (!startMoment) {
      alert("The date to start notifications is misspecified.");
      return;
    }
  } else if (start === "event") {
    startAfter = {
      days: selected["start-event-days"],
      hours: selected["start-event-hours"],
      minutes: selected["start-event-minutes"],
    };
    startEvent = document.querySelector("select[name='start-event-at']").value;
    if (startEvent === "now") {
      const whenToStart = moment().add({
        days: startAfter.days,
        hours: startAfter.hours,
        minutes: startAfter.minutes,
      });
      startMoment = whenToStart.toISOString();
      if (dayMonthCron && dayMonthCron.includes("*/")) {
        dayMonthCron = dayMonthCron.replace("*", whenToStart.date());
      }
    }
  } else if (start === "next") {
    startNextDay = parseInt(selected["start-next-day"]);
    startEvent = document.querySelector("select[name='start-next-at']").value;
    // if the starting event from now, calculate start moment
    if (startEvent === "now") {
      let whenToStart;
      if (startNextDay == 1) {
        whenToStart = moment().add({ minutes: 1 }); // add 1 minute
      } else {
        whenToStart = moment()
          .add({ days: startNextDay - 1 })
          .startOf("day")
          .add({
            minutes: Math.floor(Math.random() * 10),
            seconds: Math.floor(Math.random() * 60),
          });
      }
      startMoment = whenToStart.toISOString();
      if (dayMonthCron && dayMonthCron.includes("*/")) {
        dayMonthCron = dayMonthCron.replace("*", whenToStart.date());
      }
    }
  } else {
    if (date !== "specific") {
      alert("Choose when to start your schedule");
      return;
    }
  }
  const startingStrategy = {
    start,
    startMoment,
    startAfter,
    startEvent,
    startNextDay,
  };

  // stop moment
  let stopMoment = "",
    stopAfter = "",
    stopEvent = "",
    stopNextDay = "";
  const stop = selected.stop;
  if (stop === "specific") {
    const stopMom = {
      hour: selected["stop-specific-hour"],
      minute: selected["stop-specific-minute"],
      day: selected["stop-specific-day"],
      month: selected["stop-specific-month"] - 1,
      year: selected["stop-specific-year"],
    };
    const stopCon = moment.tz(
      {
        year: stopMom.year,
        month: stopMom.month,
        day: stopMom.day,
        hour: stopMom.hour,
        minute: stopMom.minute,
      },
      timezone
    );
    stopMoment = stopCon.toISOString();
    if (!stopMoment) {
      alert("The date to stop notifications is misspecified.");
      return;
    }
  } else if (stop === "event") {
    stopAfter = {
      days: selected["stop-event-days"],
      hours: selected["stop-event-hours"],
      minutes: selected["stop-event-minutes"],
    };
    stopEvent = document.querySelector("select[name='stop-event-at']").value;
    if (stopEvent === "now") {
      const whenToStop = moment().add({
        days: stopAfter.days,
        hours: stopAfter.hours,
        minutes: stopAfter.minutes,
      });
      stopMoment = whenToStop.toISOString();
    }
  } else if (stop === "next") {
    stopNextDay = parseInt(selected["stop-next-day"]);
    stopEvent = document.querySelector("select[name='stop-next-at']").value;
    // if the starting event from now, calculate start moment
    if (stopEvent === "now") {
      let whenToStop;
      if (stopNextDay == 1) {
        whenToStop = moment().add({ minutes: 1 }); // add 1 minute (in case the connection takes st)
      } else {
        whenToStop = moment()
          .add({ days: stopNextDay - 1 })
          .startOf("day")
          .add({
            minutes: Math.floor(Math.random() * 10),
            seconds: Math.floor(Math.random() * 60),
          });
      }
      stopMoment = whenToStop.toISOString();
      if (dayMonthCron && dayMonthCron.includes("*/")) {
        dayMonthCron = dayMonthCron.replace("*", whenToStart.date());
      }
    }
  } else {
    if (date !== "specific") {
      alert("Choose when to stop your schedule");
      return;
    }
  }
  const stopingStrategy = {
    stop,
    stopMoment,
    stopAfter,
    stopEvent,
    stopNextDay,
  };

  // expiration time
  // calculate the number of ms
  if (!selected["expire"]) {
    alert("Choose whether the link should expire");
    return;
  }
  let expireIn = null;
  if (selected["expire"] === "yes") {
    expireIn =
      24 * 60 * 60000 * selected["expire-in-days"] +
      60 * 60000 * selected["expire-in-hours"] +
      60000 * selected["expire-in-minutes"];
  }

  // 2. transform this information into the object with notification schedule

  // constructed fixed dates and times
  let constructedDates = [];
  timepoints.map((time) => {
    dates.map((date) => {
      const sec = Math.floor(Math.random() * 60); //get the random value for the seconds
      const constructedDate = moment.tz(
        {
          year: date.year,
          month: date.month,
          day: date.day,
          hour: time.hour,
          minute: time.minute,
          second: sec,
        },
        timezone
      );
      const isoDate = constructedDate.toISOString();
      constructedDates.push(isoDate);
    });
  });

  // constructed intervals
  let constructedIntervals = [];
  timeintervals.map((time) => {
    dates.map((date) => {
      const constructedDateFrom = moment.tz(
        {
          year: date.year,
          month: date.month,
          day: date.day,
          hour: time.hourStart,
          minute: time.minuteStart,
        },
        timezone
      );
      const isoDateFrom = constructedDateFrom.toISOString();
      const constructedDateTo = moment.tz(
        {
          year: date.year,
          month: date.month,
          day: date.day,
          hour: time.hourEnd,
          minute: time.minuteEnd,
        },
        timezone
      );
      const isoDateTo = constructedDateTo.toISOString();
      constructedIntervals.push({
        from: isoDateFrom,
        to: isoDateTo,
        number: time.number,
        distance: time.distance,
      });
    });
  });

  // constructed cron schedules with fixed time
  let constructedCronSchedules = [];
  timepoints.map((time) => {
    const sec = Math.floor(Math.random() * 60); //get the random value for the seconds
    const cronFixedIntervalSchedule = `${sec} ${time.minute} ${time.hour} ${dayMonthCron} ${monthCron} ${dayWeekCron}`;
    constructedCronSchedules.push(cronFixedIntervalSchedule);
  });

  let constructedCronSchedulesForTime = [];
  if (minuteCron) {
    // const sec = Math.floor(Math.random() * 60); // get the random value for the seconds
    const sec = getRandomIntInclusive(25, 35); // get the random value between 25th and 35th second
    const hour = "*";
    constructedCronSchedulesForTime.push(
      `${sec} ${minuteCron} ${hour} ${dayMonthCron} ${monthCron} ${dayWeekCron}`
    );
  }

  // constructed cron intervals
  let constructedCronIntervals = [];
  timeintervals.map((interval) => {
    const secStart = Math.floor(Math.random() * 60); //get the random value for the seconds
    const startCron = `${secStart} ${interval.minuteStart} ${interval.hourStart} ${dayMonthCron} ${monthCron} ${dayWeekCron}`;

    const secStop = Math.floor(Math.random() * 60);
    const stopCron = `${secStop} ${interval.minuteEnd} ${interval.hourEnd} ${dayMonthCron} ${monthCron} ${dayWeekCron}`;

    constructedCronIntervals.push({
      from: startCron,
      to: stopCron,
      number: interval.number,
      distance: interval.distance,
    });
  });

  // 3. send this object to the server API

  if (time === "repeat") {
    if (date === "specific") {
      alert(
        "This time combination is still in development. Please choose another option (e.g. repeat every day and month) if you want to send notifications every minute(s)"
      );

      // TO DO! not done yet
      // let constructedCronSchedulesForTimeForDay = [];
      // const sec = Math.floor((Math.random() * 60)); // get the random value for the seconds
      // const hour = '*';
      // console.log('dates', dates);
      // constructedCronSchedulesForTimeForDay.push(`${sec} ${minuteCron} ${hour} ${dates.day} ${dates.month} ${'*'}`)
      // console.log('constructedCronSchedulesForTimeForDay', constructedCronSchedulesForTimeForDay);
      // createFixedIntervalNotification(participants, constructedCronSchedulesForTimeForDay, startingDayStrategy, stopingDayStrategy, scheduleInFuture);
    } else {
      // if date is interval
      if (
        startingStrategy.startEvent === "registration" ||
        stopingStrategy.stopEvent === "registration"
      ) {
        createIndividualSpecificNotification(
          participants,
          groups,
          constructedCronSchedulesForTime,
          startingStrategy,
          stopingStrategy,
          scheduleInFuture,
          timezone,
          expireIn,
          useParticipantTimezone
        );
      } else {
        createFixedIntervalNotification(
          participants,
          groups,
          constructedCronSchedulesForTime,
          startingStrategy,
          stopingStrategy,
          scheduleInFuture,
          timezone,
          expireIn,
          useParticipantTimezone
        );
      }
    }
  }

  if (time === "specific") {
    // if specific date is chosen
    if (date === "specific") {
      createFixedScheduledNotification(
        participants,
        groups,
        constructedDates,
        scheduleInFuture,
        timezone,
        expireIn,
        useParticipantTimezone
      );
    } else {
      // create fixed interval schedule
      if (
        startingStrategy.startEvent === "registration" ||
        stopingStrategy.stopEvent === "registration"
      ) {
        createIndividualSpecificNotification(
          participants,
          groups,
          constructedCronSchedules,
          startingStrategy,
          stopingStrategy,
          scheduleInFuture,
          timezone,
          expireIn,
          useParticipantTimezone
        );
      } else {
        createFixedIntervalNotification(
          participants,
          groups,
          constructedCronSchedules,
          startingStrategy,
          stopingStrategy,
          scheduleInFuture,
          timezone,
          expireIn,
          useParticipantTimezone
        );
      }
    }
  }

  // if we need to randomize the time (interval is given)
  if (time === "interval") {
    if (date === "specific") {
      createRandomFixedNotification(
        participants,
        groups,
        constructedIntervals,
        scheduleInFuture,
        timezone,
        expireIn,
        useParticipantTimezone
      );
    } else {
      // create randomized interval notifications
      createRandomIntervalNotification(
        participants,
        groups,
        constructedCronIntervals,
        startingStrategy,
        stopingStrategy,
        scheduleInFuture,
        timezone,
        expireIn,
        useParticipantTimezone
      );
    }
  }
}

createNotificationBtn.addEventListener("click", createNotification);

function createFixedScheduledNotification(
  participants,
  groups,
  times,
  scheduleInFuture,
  timezone,
  expireIn,
  useParticipantTimezone
) {
  fetch("/createschedulenotification", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      target: "fixed-times",
      schedule: "one-time",
      randomize: false,
      participants: participants,
      groups: groups,
      date: times,
      message: messageContent.value,
      title: titleContent.value,
      url: urlContent.value.trim(),
      name: "One-time",
      scheduleInFuture: scheduleInFuture,
      timezone: timezone,
      expireIn: expireIn,
      useParticipantTimezone: useParticipantTimezone,
    }),
  })
    .then((res) => {
      if (res.url && res.ok) {
        window.location = res.url;
      }
      console.log("success");
    })
    .catch((err) => {
      console.log(err);
    });
}

function createFixedIntervalNotification(
  participants,
  groups,
  constructedCronSchedules,
  startingStrategy,
  stopingStrategy,
  scheduleInFuture,
  timezone,
  expireIn,
  useParticipantTimezone
) {
  fetch("/createintervalnotification", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      target: "fixed-intervals",
      schedule: "repeat",
      randomize: false,
      participantId: participants,
      groups: groups,
      interval: constructedCronSchedules,
      int_start: startingStrategy,
      int_end: stopingStrategy,
      message: messageContent.value,
      title: titleContent.value,
      url: urlContent.value.trim(),
      name: "Repeat",
      scheduleInFuture: scheduleInFuture,
      timezone: timezone,
      expireIn: expireIn,
      useParticipantTimezone: useParticipantTimezone,
    }),
  })
    .then((res) => {
      if (res.url && res.ok) {
        window.location = res.url;
      }
      console.log("success");
    })
    .catch((err) => {
      console.log(err);
    });
}

function createIndividualSpecificNotification(
  participants,
  groups,
  constructedCronSchedules,
  startingStrategy,
  stopingStrategy,
  scheduleInFuture,
  timezone,
  expireIn,
  useParticipantTimezone
) {
  fetch("/createindividualnotification", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      target: "user-specific",
      schedule: "repeat",
      randomize: false,
      interval: constructedCronSchedules,
      int_start: startingStrategy,
      int_end: stopingStrategy,
      message: messageContent.value,
      title: titleContent.value,
      url: urlContent.value.trim(),
      name: "Repeat",
      participantId: participants,
      groups: groups,
      scheduleInFuture: scheduleInFuture,
      timezone: timezone,
      expireIn: expireIn,
      useParticipantTimezone: useParticipantTimezone,
    }),
  })
    .then((res) => {
      if (res.url && res.ok) {
        window.location = res.url;
      }
      console.log("success");
    })
    .catch((err) => {
      console.log(err);
    });
}

function createRandomFixedNotification(
  participants,
  groups,
  constructedIntervals,
  scheduleInFuture,
  timezone,
  expireIn,
  useParticipantTimezone
) {
  fetch("/createfixedindividualnotification", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      target: "user-specific",
      schedule: "one-time",
      randomize: true,
      intervals: constructedIntervals,
      message: messageContent.value,
      title: titleContent.value,
      url: urlContent.value.trim(),
      name: "One-time",
      participantId: participants,
      groups: groups,
      scheduleInFuture: scheduleInFuture,
      timezone: timezone,
      expireIn: expireIn,
      useParticipantTimezone: useParticipantTimezone,
    }),
  })
    .then((res) => {
      if (res.url && res.ok) {
        window.location = res.url;
      }
      console.log("success");
    })
    .catch((err) => {
      console.log(err);
    });
}

function createRandomIntervalNotification(
  participants,
  groups,
  constructedCronIntervals,
  startingStrategy,
  stopingStrategy,
  scheduleInFuture,
  timezone,
  expireIn,
  useParticipantTimezone
) {
  fetch("/createintervalnotification", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      target: "user-specific",
      schedule: "repeat",
      randomize: true,
      participantId: participants,
      groups: groups,
      intervalWindows: constructedCronIntervals, // from: "45 00 12 * * *" number: "1" to: "0 00 14 * * *"
      int_start: startingStrategy,
      int_end: stopingStrategy,
      message: messageContent.value,
      title: titleContent.value,
      url: urlContent.value.trim(),
      name: "Repeat",
      scheduleInFuture: scheduleInFuture,
      timezone: timezone,
      expireIn: expireIn,
      useParticipantTimezone: useParticipantTimezone,
    }),
  })
    .then((res) => {
      if (res.url && res.ok) {
        window.location = res.url;
      }
      console.log("success");
    })
    .catch((err) => {
      console.log(err);
    });
}
