const createScheduleNotificationsBtn = document.querySelector('#create_schedule_notification');
const createIntervalNotificationBtn = document.querySelector('#create_interval_notification');
const createIndividualNotificationBtn = document.querySelector('#create_individual_notification');
const deleteAllNotificationsBtn = document.querySelector('#delete_all_notifications') || 'not_defined';
const messageContent = document.querySelector('#messageContent');
const titleContent = document.querySelector('#titleContent');

function createScheduleNotification(){
  createScheduleNotificationsBtn.disabled = true;
  document.getElementById('notification_status_schedule').style.visibility = 'visible';
  const scheduleArray = Array.from(document.querySelectorAll('.scheduleInput'));
  const schedule = scheduleArray
    .map(e => e.value)
    .filter(v => v !== '')
    .map(d => new Date(d).toISOString())
  // console.log('Sending test notification', schedule);
  fetch('/createschedulenotification', {
    method:'POST',
    headers: {
      'Content-Type':'application/json',
      'Accept':'application/json',
    },
    body: JSON.stringify({
      name: 'notification',
      mode: 'Schedule',
      date: schedule,
      message: messageContent.value,
      title: titleContent.value,
    })
  })
    .then(res => {
      // console.log('Response', res);
      if(res.url && res.ok){
        window.location = res.url;
      }
      createScheduleNotificationsBtn.disabled = false;
      document.getElementById('notification_status_schedule').style.visibility = 'hidden';
    })
    .catch(err => {
      console.log(err);
      createScheduleNotificationsBtn.disabled = false;
      document.getElementById('notification_status_schedule').style.visibility = 'hidden';
    })
};

function createIntervalNotification(){
  createIntervalNotificationBtn.disabled = true;
  document.getElementById('notification_status_schedule').style.visibility = 'visible';
  const int_start = $('input[name="datetimes_regular"]').data('daterangepicker').startDate._d.toISOString();
  const int_end = $('input[name="datetimes_regular"]').data('daterangepicker').endDate._d.toISOString();
  const sec = Math.floor((Math.random() * 60));//get the random value for the seconds
  const min = document.getElementById('int_min_regular').value;
  const hour = document.getElementById('int_hour_regular').value;
  const day = document.getElementById('int_day_regular').value;
  const month = document.getElementById('int_month_regular').value;
  const week = document.getElementById('int_week_regular').value;
  const interval = `${sec} ${min} ${hour} ${day} ${month} ${week}`;
  // console.log('regular times:', int_start, int_end, interval);
  fetch('/createintervalnotification', {
    method:'POST',
    headers: {
      'Content-Type':'application/json',
      'Accept':'application/json',
    },
    body: JSON.stringify({
      name: 'notification',
      mode: 'Interval',
      interval: interval,
      int_start: int_start,
      int_end: int_end,
      message: messageContent.value,
      title: titleContent.value,
    })
  })
    .then(res => {
      // console.log('Response', res);
      if(res.url && res.ok){
        window.location = res.url;
      }
      createIntervalNotificationBtn.disabled = false;
      document.getElementById('notification_status_schedule').style.visibility = 'hidden';
    })
    .catch(err => {
      console.log(err);
      createIntervalNotificationBtn.disabled = false;
      document.getElementById('notification_status_schedule').style.visibility = 'hidden';
    })
}

function createIndividualNotification(){
  createIndividualNotificationBtn.disabled = true;
  document.getElementById('notification_status_schedule').style.visibility = 'visible';
  const duration = $('#duration')[0].value; //in seconds
  const sec = Math.floor((Math.random() * 60));//get the random value for the seconds
  const min = document.getElementById('int_min_individual').value;
  const hour = document.getElementById('int_hour_individual').value;
  const day = document.getElementById('int_day_individual').value;
  const month = document.getElementById('int_month_individual').value;
  const week = document.getElementById('int_week_individual').value;
  const interval = `${sec} ${min} ${hour} ${day} ${month} ${week}`;
  console.log('interval ', interval);
  // console.log('individual times:', int_start, int_end);
  fetch('/createindividualnotification', {
    method:'POST',
    headers: {
      'Content-Type':'application/json',
      'Accept':'application/json',
    },
    body: JSON.stringify({
      name: 'notification',
      mode: 'Individual',
      interval: interval,
      message: messageContent.value,
      title: titleContent.value,
      duration: duration,
    })
  })
    .then(res => {
      // console.log('Response', res);
      if(res.url && res.ok){
        window.location = res.url;
      }
      createIndividualNotificationBtn.disabled = false;
      document.getElementById('notification_status_schedule').style.visibility = 'hidden';
    })
    .catch(err => {
      console.log(err);
      createIndividualNotificationBtn.disabled = false;
      document.getElementById('notification_status_schedule').style.visibility = 'hidden';
    })
}

function deleteAllNotifications(){
  deleteAllNotificationsBtn.disabled = true;
  fetch('/deleteprojectnotifications', {
    method:'POST',
    headers: {
      'Content-Type':'application/json',
      'Accept':'application/json',
    },
    body: JSON.stringify({
      name: 'notification',
    })
  })
    .then(res => {
      if(res.url && res.ok){
        window.location = res.url;
      }
      deleteAllNotificationsBtn.disabled = false;
    })
    .catch(err => {
      console.log(err);
      deleteAllNotificationsBtn.disabled = false;
    })
};

function removeScheduleDateTimePicker(){
  const id = this.id;
  var container = document.getElementById("dateTimePicker");
  const containerPicker = document.getElementById(`container-picker${id}`);
  const inputToClean = document.getElementById(`dateresult${id}`);
  inputToClean.value = "";
  container.removeChild(containerPicker);
};

createScheduleNotificationsBtn.addEventListener('click', createScheduleNotification);
if(deleteAllNotificationsBtn !== 'not_defined'){
  deleteAllNotificationsBtn.addEventListener('click', deleteAllNotifications);
};
createIntervalNotificationBtn.addEventListener('click', createIntervalNotification);
createIndividualNotificationBtn.addEventListener('click', createIndividualNotification);
