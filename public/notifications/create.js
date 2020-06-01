const createNotificationBtn = document.querySelector('#createNotificationBtn');
const messageContent = document.querySelector('#messageContent');
const titleContent = document.querySelector('#titleContent');
const urlContent = document.querySelector('#urlContent');


function createNotification(){

  // console.log('creating notifications');

  // 1. get all information from the input fiels
  const input = document.querySelectorAll('input');
  const selected = input
    .filter(i => i.checked || i.type === 'number')
    .map(i => ({ name: i.name, value: i.value }))
    .reduce( (obj, item) => {
      obj[item.name] = item.value
      return obj
    }, {});
  // console.log('selected', selected);

  // participants
  let participants, scheduleInFuture;
  if (selected.participants_current === "current" && selected.participants === 'all'){
    participants = [];
  } else if (selected.participants_current === "current" && selected.participants_ids && selected.participants_ids !== '') {
    const participantTags = document.querySelectorAll("input[name='participants_ids']");
    participants = Array.from(participantTags).filter(input => input.checked).map(input => input.value);
    if(!participants || participants.length === 0){
      alert('Choose specific participants or select the all participants option');
      return;
    }
  }
  if (selected.participants_future === 'future') {
    scheduleInFuture = true;
  }

  if (!participants && !scheduleInFuture){
    alert('Choose participants');
    return;
  }
  // console.log('participants', participants);
  // console.log('scheduleInFuture', scheduleInFuture);

  // time
  let timepoints = [], timeintervals = [];
  const time = selected.time;
  if (time === 'specific') {
    timepoints = Array.from(document.querySelectorAll(".containerTimePicker")).map(container => {
      if(container.querySelector(".timePickerHour").value == '' || container.querySelector(".timePickerMinute").value == '') {
        alert('Choose specific time points');
        throw new Error('Missing time values');
        return;
      }
      return {
        hour: container.querySelector(".timePickerHour").value,
        minute: container.querySelector(".timePickerMinute").value
      }
    })
  } else if (time === 'interval') {
    timeintervals = Array.from(document.querySelectorAll(".containerTimeWindow")).map(container => {
      if(container.querySelector(".windowPickerHourStart").value == '' || container.querySelector(".windowPickerMinuteStart").value == '' || container.querySelector(".windowPickerHourEnd").value == '' || container.querySelector(".windowPickerMinuteEnd").value == '') {
        alert('Choose specific time points');
        throw new Error('Missing time values');
        return;
      }
      return {
        hourStart: container.querySelector(".windowPickerHourStart").value,
        minuteStart: container.querySelector(".windowPickerMinuteStart").value,
        hourEnd: container.querySelector(".windowPickerHourEnd").value,
        minuteEnd: container.querySelector(".windowPickerMinuteEnd").value,
        number: container.querySelector(".timeWindowNumberOfPointsInput").value,
      }
    })
  } else {
    alert('Choose time');
    return;
  }
  // console.log('timeintervals', timeintervals);


  // dates: specific dates (dates), cron format of day of the month (dayMonthCron), or cron format for days of the week (dayWeekCron)
  let dates = [], dayMonthCron = '', dayWeekCron = '';
  const date = selected.date;
  if(date === 'specific') {
    dates = Array.from(document.querySelectorAll(".containerDatePicker")).map(container => {
      if(container.querySelector(".datePickerDay").value == '' || container.querySelector(".datePickerMonth").value == '' || container.querySelector(".datePickerYear").value == '') {
        alert('Choose specific dates');
        throw new Error('Missing dates values');
        return;
      }
      return {
        day: container.querySelector(".datePickerDay").value,
        month: container.querySelector(".datePickerMonth").value - 1,
        year: container.querySelector(".datePickerYear").value
      }
    })
  } else if(date === 'every') {
    dayWeekCron = '*';
    const everyday = document.querySelector("select[name='date-every-day']").value;

    if(everyday == 1){
      dayMonthCron = '*';
    } else {
      dayMonthCron = `*/${everyday}`; // by default * will be 1 (but has to be replaced later dependent on the starting point)
    }

    // console.log('everyday', everyday);
    // console.log('dayMonthCron', dayMonthCron);

  } else if(date === 'start-month') {
    dayWeekCron = '*';
    const every = document.querySelector("select[name='date-start-month-start-day']").value;
    const starting = document.querySelector("select[name='date-start-month-from-day']").value[0];
    dayMonthCron = `${starting}/${every}`
  } else if(date === 'spec-week') {
    dayMonthCron = '*';
    const days = document.querySelectorAll("input[name='date-spec-week-day']");
    const daysShorted = Array.from(days).filter(input => input.checked).map(input => input.value.slice(0,3).toUpperCase());
    if(!daysShorted || daysShorted.length === 0){
      alert('Choose specific week days or select other options');
      return;
    }
    dayWeekCron = daysShorted.join(',');
  } else if(date === 'spec-month') {
    dayWeekCron = '*';
    const monthDays = document.querySelectorAll("input[name='date-spec-week-month']");
    const monthDaysShorted = Array.from(monthDays).filter(input => input.checked).map(input => input.value);
    if(!monthDaysShorted || monthDaysShorted.length === 0){
      alert('Choose specific days of the month or select other options');
      return;
    }
    dayMonthCron = monthDaysShorted.join(',');
  } else {
    alert('Choose dates');
    return;
  }

  // console.log('dates', dates);
  // console.log('dayMonthCron dayWeekCron', dayMonthCron, dayWeekCron);

  // month
  let monthCron = '';
  const month = selected.month;
  if(month === 'every') {
    monthCron = '*';
  } else if(month === 'specific') {
    const months = document.querySelectorAll("input[name='month-spec-month']");
    const monthShorted = Array.from(months).filter(input => input.checked).map(input => input.value.slice(0,3).toUpperCase());
    if(!monthShorted || monthShorted.length === 0){
      alert('Choose specific months or select other options');
      return;
    }
    monthCron = monthShorted.join(',');
  } else {
    if(date !== 'specific'){
      alert('Choose month');
      return;
    }
  }
  // console.log('monthCron', monthCron);

  // start moment
  let startMoment = '', startAfter = '', startEvent = '';
  const start = selected.start;
  if(start === 'specific'){
    const st = {
      hour: selected['start-specific-hour'],
      minute: selected['start-specific-minute'],
      day: selected['start-specific-day'],
      month: selected['start-specific-month'] - 1,
      year: selected['start-specific-year'],
    }
    const stCon = moment({ year: st.year, month: st.month, day: st.day, hour: st.hour, minute: st.minute });
    startMoment = stCon.toISOString();
    // change the interval if was not specified
    if(dayMonthCron && dayMonthCron.includes('*/')) {
      dayMonthCron = dayMonthCron.replace('*', st.day);
    }
    // console.log('startMoment', dayMonthCron, st.day, startMoment);
    if(!startMoment){
      alert('The date to start notifications is misspecified.');
      return;
    }
  } else if(start === 'event') {
    startAfter = {
      days: selected['start-event-days'],
      hours: selected['start-event-hours'],
      minutes: selected['start-event-minutes']
    }
    startEvent = document.querySelector("select[name='start-event-at']").value;
    if(startEvent === 'now'){
      const whenToStart = moment().add({days: startAfter.days, hours: startAfter.hours, minutes: startAfter.minutes})
      startMoment = whenToStart.toISOString();
      if(dayMonthCron && dayMonthCron.includes('*/')) {
        dayMonthCron = dayMonthCron.replace('*', whenToStart.date());
      }
      // console.log('startMoment', dayMonthCron, whenToStart.date());
    }
  } else {
    if(date !== 'specific'){
      alert('Choose when to start your schedule');
      return;
    }
  }
  const startingStrategy = {
    start, startMoment, startAfter, startEvent
  }
  // console.log('startingStrategy', startingStrategy);

  // stop moment
  let stopMoment = '', stopAfter = '', stopEvent = '';
  const stop = selected.stop;
  if(stop === 'specific'){
    const stopMom = {
      hour: selected['stop-specific-hour'],
      minute: selected['stop-specific-minute'],
      day: selected['stop-specific-day'],
      month: selected['stop-specific-month'] - 1,
      year: selected['stop-specific-year'],
    }
    const stopCon = moment({ year: stopMom.year, month: stopMom.month, day: stopMom.day, hour: stopMom.hour, minute: stopMom.minute });
    stopMoment = stopCon.toISOString();
    // console.log('stopMoment', stopMoment);
    if(!stopMoment){
      alert('The date to stop notifications is misspecified.');
      return;
    }
  } else if(stop === 'event') {
    stopAfter = {
      days: selected['stop-event-days'],
      hours: selected['stop-event-hours'],
      minutes: selected['stop-event-minutes']
    }
    stopEvent = document.querySelector("select[name='stop-event-at']").value;
    if(stopEvent === 'now'){
      const whenToStop = moment().add({days: stopAfter.days, hours: stopAfter.hours, minutes: stopAfter.minutes})
      stopMoment = whenToStop.toISOString();
    }

  } else {
    if(date !== 'specific'){
      alert('Choose when to stop your schedule');
      return;
    }
  }
  const stopingStrategy = {
    stop, stopMoment, stopAfter, stopEvent
  }
  // console.log('stopingStrategy', stopingStrategy);
  // console.log('stopMoment', stopMoment, stopAfter, stopEvent);

  // 2. transform this information into the object with notification schedule

  // constructed fixed dates and times
  let constructedDates = [];
  timepoints.map(time => {
    dates.map(date => {
      const sec = Math.floor((Math.random() * 60));//get the random value for the seconds
      const constructedDate = moment({ year: date.year, month: date.month, day: date.day, hour: time.hour, minute: time.minute, second: sec });
      const isoDate = constructedDate.toISOString();
      constructedDates.push(isoDate);
    })
  })
  // console.log('constructedDates', constructedDates);

  // constructed intervals
  let constructedIntervals = [];
  timeintervals.map(time => {
    dates.map(date => {
      const constructedDateFrom = moment({ year: date.year, month: date.month, day: date.day, hour: time.hourStart, minute: time.minuteStart });
      const isoDateFrom = constructedDateFrom.toISOString();
      const constructedDateTo = moment({ year: date.year, month: date.month, day: date.day, hour: time.hourEnd, minute: time.minuteEnd });
      const isoDateTo = constructedDateTo.toISOString();
      constructedIntervals.push({ from: isoDateFrom, to: isoDateTo, number: time.number });
    })
  })
  // console.log('constructedIntervals', constructedIntervals);

  // constructed cron schedules with fixed time
  let constructedCronSchedules = [];
  timepoints.map(time => {
    const sec = Math.floor((Math.random() * 60));//get the random value for the seconds
    const cronFixedIntervalSchedule = `${sec} ${time.minute} ${time.hour} ${dayMonthCron} ${monthCron} ${dayWeekCron}`
    constructedCronSchedules.push(cronFixedIntervalSchedule);
  })
  // console.log('constructedCronSchedules', constructedCronSchedules);

  // constructed cron intervals
  let constructedCronIntervals = [];
  timeintervals.map(interval => {
    const secStart = Math.floor((Math.random() * 60));//get the random value for the seconds
    const startCron = `${secStart} ${interval.minuteStart} ${interval.hourStart} ${dayMonthCron} ${monthCron} ${dayWeekCron}`

    const secStop = Math.floor((Math.random() * 60));
    const stopCron = `${secStop} ${interval.minuteEnd} ${interval.hourEnd} ${dayMonthCron} ${monthCron} ${dayWeekCron}`

    constructedCronIntervals.push({
      from: startCron,
      to: stopCron,
      number: interval.number
    });
  })

  // 3. send this object to the server API
  if(time === 'specific') {
    // if specific date is chosen
    if (date === 'specific') {
      // console.log('specific fixed notifications', participants, constructedDates, scheduleInFuture);
      createFixedScheduledNotification(participants, constructedDates, scheduleInFuture);
    } else {
      // create fixed interval schedule
      if (startingStrategy.startEvent === 'registration' || stopingStrategy.stopEvent === 'registration'){
        // console.log('participant-dependent specific interval notifications', participants, constructedCronSchedules, startingStrategy, stopingStrategy, scheduleInFuture);
        createIndividualSpecificNotification(participants, constructedCronSchedules, startingStrategy, stopingStrategy, scheduleInFuture);
      } else {
        // console.log('specific interval notifications', participants, constructedCronSchedules, startingStrategy, stopingStrategy, scheduleInFuture);
        createFixedIntervalNotification(participants, constructedCronSchedules, startingStrategy, stopingStrategy, scheduleInFuture);
      }
    }
  }

  // if we need to randomize the time (interval is given)
  if(time === 'interval') {
    if(date === 'specific') {
      // console.log('randomized fixed notifications', participants, constructedIntervals, scheduleInFuture);
      createRandomFixedNotification(participants, constructedIntervals, scheduleInFuture);
    } else {
      // create randomized interval notifications
      // console.log('randomized interval notifications', participants, constructedCronIntervals, startingStrategy, stopingStrategy, scheduleInFuture);
      createRandomIntervalNotification(participants, constructedCronIntervals, startingStrategy, stopingStrategy, scheduleInFuture);
    }
  }

};

createNotificationBtn.addEventListener('click', createNotification);



function createFixedScheduledNotification(participants, times, scheduleInFuture){
  fetch('/createschedulenotification', {
    method:'POST',
    headers: {
      'Content-Type':'application/json',
      'Accept':'application/json',
    },
    body: JSON.stringify({
      target: 'fixed-times',
      schedule: 'one-time',
      randomize: false,
      participantId: participants,
      date: times,
      message: messageContent.value,
      title: titleContent.value,
      url: urlContent.value,
      name: 'One-time',
      scheduleInFuture: scheduleInFuture,
    })
  })
    .then(res => {
      if(res.url && res.ok){
        window.location = res.url;
      }
      console.log('success');
      // createScheduleNotificationsBtn.disabled = false;
      // document.getElementById('notification_status_schedule').style.visibility = 'hidden';
    })
    .catch(err => {
      console.log(err);
      // createScheduleNotificationsBtn.disabled = false;
      // document.getElementById('notification_status_schedule').style.visibility = 'hidden';
    })
}


function createFixedIntervalNotification(participants, constructedCronSchedules, startingStrategy, stopingStrategy, scheduleInFuture){

  fetch('/createintervalnotification', {
    method:'POST',
    headers: {
      'Content-Type':'application/json',
      'Accept':'application/json',
    },
    body: JSON.stringify({
      target: 'fixed-intervals',
      schedule: 'repeat',
      randomize: false,
      participantId: participants,
      interval: constructedCronSchedules,
      int_start: startingStrategy,
      int_end: stopingStrategy,
      message: messageContent.value,
      title: titleContent.value,
      url: urlContent.value,
      name: 'Repeat',
      scheduleInFuture: scheduleInFuture,
    })
  })
    .then(res => {
      // console.log('Response', res);
      if(res.url && res.ok){
        window.location = res.url;
      }
      console.log('success');
      // createIntervalNotificationBtn.disabled = false;
      // document.getElementById('notification_status_schedule').style.visibility = 'hidden';
    })
    .catch(err => {
      console.log(err);
      // createIntervalNotificationBtn.disabled = false;
      // document.getElementById('notification_status_schedule').style.visibility = 'hidden';
    })
};

function createIndividualSpecificNotification(participants, constructedCronSchedules, startingStrategy, stopingStrategy, scheduleInFuture){

  fetch('/createindividualnotification', {
    method:'POST',
    headers: {
      'Content-Type':'application/json',
      'Accept':'application/json',
    },
    body: JSON.stringify({
      target: 'user-specific',
      schedule: 'repeat',
      randomize: false,
      interval: constructedCronSchedules,
      int_start: startingStrategy,
      int_end: stopingStrategy,
      message: messageContent.value,
      title: titleContent.value,
      url: urlContent.value,
      name: 'Repeat',
      participantId: participants,
      scheduleInFuture: scheduleInFuture,
    })
  })
    .then(res => {
      if(res.url && res.ok){
        window.location = res.url;
      }
      console.log('success');
      // createIndividualNotificationBtn.disabled = false;
      // document.getElementById('notification_status_schedule').style.visibility = 'hidden';
    })
    .catch(err => {
      console.log(err);
      // createIndividualNotificationBtn.disabled = false;
      // document.getElementById('notification_status_schedule').style.visibility = 'hidden';
    })
};


function createRandomFixedNotification(participants, constructedIntervals, scheduleInFuture){

  fetch('/createfixedindividualnotification', {
    method:'POST',
    headers: {
      'Content-Type':'application/json',
      'Accept':'application/json',
    },
    body: JSON.stringify({
      target: 'user-specific',
      schedule: 'one-time',
      randomize: true,
      intervals: constructedIntervals,
      message: messageContent.value,
      title: titleContent.value,
      url: urlContent.value,
      name: 'One-time',
      participantId: participants,
      scheduleInFuture: scheduleInFuture,
    })
  })
    .then(res => {
      if(res.url && res.ok){
        window.location = res.url;
      }
      console.log('success');
      // createIndividualNotificationBtn.disabled = false;
      // document.getElementById('notification_status_schedule').style.visibility = 'hidden';
    })
    .catch(err => {
      console.log(err);
      // createIndividualNotificationBtn.disabled = false;
      // document.getElementById('notification_status_schedule').style.visibility = 'hidden';
    })
};

function createRandomIntervalNotification(participants, constructedCronIntervals, startingStrategy, stopingStrategy, scheduleInFuture){

  fetch('/createintervalnotification', {
    method:'POST',
    headers: {
      'Content-Type':'application/json',
      'Accept':'application/json',
    },
    body: JSON.stringify({
      target: 'user-specific',
      schedule: 'repeat',
      randomize: true,
      participantId: participants,
      intervalWindows: constructedCronIntervals, // from: "45 00 12 * * *" number: "1" to: "0 00 14 * * *"
      int_start: startingStrategy,
      int_end: stopingStrategy,
      message: messageContent.value,
      title: titleContent.value,
      url: urlContent.value,
      name: 'Repeat',
      scheduleInFuture: scheduleInFuture,
    })
  })
    .then(res => {
      // console.log('Response', res);
      if(res.url && res.ok){
        window.location = res.url;
      }
      console.log('success');
      // createIntervalNotificationBtn.disabled = false;
      // document.getElementById('notification_status_schedule').style.visibility = 'hidden';
    })
    .catch(err => {
      console.log(err);
      // createIntervalNotificationBtn.disabled = false;
      // document.getElementById('notification_status_schedule').style.visibility = 'hidden';
    })
};
