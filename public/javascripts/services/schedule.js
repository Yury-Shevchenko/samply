const createNotificationButton = document.querySelector('#create_schedule_notification');
const createIntervalButton = document.querySelector('#create_interval_notification');
const deleteNotificationButton = document.querySelector('#delete_notification') || 'not_defined';
const createRelativeButton = document.querySelector('#create_relative_notification');
const messageContent = document.querySelector('#messageContent');
const titleContent = document.querySelector('#titleContent');


function createNotification(){
  createNotificationButton.disabled = true;
  const message = messageContent.value;
  const titleNotification = titleContent.value;
  document.getElementById('notification_status_schedule').innerText = 'Registering notification ...';
  const scheduleInputs = document.querySelectorAll('.scheduleInput');
  const scheduleArray = Array.from(scheduleInputs);
  const schedule = scheduleArray.map(e => e.value).filter(v => v !== '' && new Date(v) - new Date() > 0);//["2019-01-31 14:12", "2019-01-30 16:12"]
  console.log('Sending test notification');
  fetch('/createnotification', {
    method:'POST',
    headers: {
      'Content-Type':'application/json',
      'Accept':'application/json',
    },
    body: JSON.stringify({
      name: 'notify',
      mode: 'Schedule',
      date: schedule,
      message: message,
      title: titleNotification,
    })
  })
    .then(res => {
      console.log('Response', res);
      if(res.url && res.ok){
        window.location = res.url;
      }
      createNotificationButton.disabled = false;
      document.getElementById('notification_status_schedule').innerText = '';
    })
    .catch(err => {
      console.log(err);
      createNotificationButton.disabled = false;
      document.getElementById('notification_status_schedule').innerText = '';
    })
};

function deleteAllNotifications(){
  deleteNotificationButton.disabled = true;
  console.log('Deleting notification');
  const name = 'notify';
  fetch('/deletenotification', {
    method:'POST',
    headers: {
      'Content-Type':'application/json',
      'Accept':'application/json',
    },
    body: JSON.stringify({
      name: name,
    })
  })
    .then(res => {
      console.log('Response', res);
      if(res.url && res.ok){
        window.location = res.url;
      }
      deleteNotificationButton.disabled = false;
    })
    .catch(err => {
      console.log(err);
      deleteNotificationButton.disabled = false;
    })
};

function removePicker(){
  const id = this.id;
  var container = document.getElementById("dateTimePicker");
  const containerPicker = document.getElementById(`container-picker${id}`);
  const inputToClean = document.getElementById(`dateresult${id}`);
  inputToClean.value = "";
  container.removeChild(containerPicker);
};

function createInterval(){
  createIntervalButton.disabled = true;
  const message = messageContent.value;
  const titleNotification = titleContent.value;
  document.getElementById('notification_status_schedule').innerText = 'Registering interval notification ...';
  const int_start = $('input[name="datetimes_regular"]').data('daterangepicker').startDate._d;
  const int_end = $('input[name="datetimes_regular"]').data('daterangepicker').endDate._d;
  const sec = document.getElementById('int_sec_regular').value;
  const min = document.getElementById('int_min_regular').value;
  const hour = document.getElementById('int_hour_regular').value;
  const day = document.getElementById('int_day_regular').value;
  const month = document.getElementById('int_month_regular').value;
  const week = document.getElementById('int_week_regular').value;

  const interval = `${sec} ${min} ${hour} ${day} ${month} ${week}`;
  console.log('regular times:', int_start, int_end, interval);

  fetch('/createnotificationinterval', {
    method:'POST',
    headers: {
      'Content-Type':'application/json',
      'Accept':'application/json',
    },
    body: JSON.stringify({
      name: 'notify',
      mode: 'Interval',
      interval: interval,
      int_start: int_start,
      int_end: int_end,
      message: message,
      title: titleNotification,
    })
  })
    .then(res => {
      console.log('Response', res);
      if(res.url && res.ok){
        window.location = res.url;
      }
      createIntervalButton.disabled = false;
      document.getElementById('notification_status_schedule').innerText = '';
    })
    .catch(err => {
      console.log(err);
      createIntervalButton.disabled = false;
      document.getElementById('notification_status_schedule').innerText = '';
    })
}

function createRelativeNotification(){
  document.getElementById('notification_status_schedule').innerText = 'Registering relative notification ...';
  const message = messageContent.value;
  const titleNotification = titleContent.value;
  createRelativeButton.disabled = true;
  const int_start = $('input[name="datetimes_individual"]').data('daterangepicker').startDate._d;
  const int_end = $('input[name="datetimes_individual"]').data('daterangepicker').endDate._d;
  const sec = document.getElementById('int_sec_individual').value;
  const min = document.getElementById('int_min_individual').value;
  const hour = document.getElementById('int_hour_individual').value;
  const day = document.getElementById('int_day_individual').value;
  const month = document.getElementById('int_month_individual').value;
  const week = document.getElementById('int_week_individual').value;

  const interval = `${sec} ${min} ${hour} ${day} ${month} ${week}`;
  console.log('individual times:', int_start, int_end, interval);

  fetch('/createrelativenotification', {
    method:'POST',
    headers: {
      'Content-Type':'application/json',
      'Accept':'application/json',
    },
    body: JSON.stringify({
      name: 'notify',
      mode: 'Individual',
      interval: interval,
      int_start: int_start,
      int_end: int_end,
      message: message,
      title: titleNotification,
    })
  })
    .then(res => {
      console.log('Response', res);
      if(res.url && res.ok){
        window.location = res.url;
      }
      createRelativeButton.disabled = false;
      document.getElementById('notification_status_schedule').innerText = '';
    })
    .catch(err => {
      console.log(err);
      createRelativeButton.disabled = false;
      document.getElementById('notification_status_schedule').innerText = '';
    })
}

createNotificationButton.addEventListener('click', createNotification);
if(deleteNotificationButton !== 'not_defined'){
  deleteNotificationButton.addEventListener('click', deleteAllNotifications);
};
createIntervalButton.addEventListener('click', createInterval);
createRelativeButton.addEventListener('click', createRelativeNotification);
