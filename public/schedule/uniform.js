
const createScheduleNotificationsBtn = document.querySelector('#create_schedule_notification');

// target: 'all-users' or 'one-user'
// schedule: 'one-time'
// randomize: false

function createScheduleNotification(){

  let participantId, participantTarget;
  if(document.getElementById('participantId') && document.getElementById('participantId').value){
    participantId = parseInt(document.getElementById('participantId').value);
    participantTarget = 'one-user';
  } else {
    participantTarget = 'all-users';
  }

  createScheduleNotificationsBtn.disabled = true;
  document.getElementById('notification_status_schedule').style.visibility = 'visible';
  const scheduleArray = Array.from(document.querySelectorAll('.scheduleInput'));
  const schedule = scheduleArray
    .map(e => e.value)
    .filter(v => v !== '')
    .map(d => moment(d).toISOString())

  fetch('/createschedulenotification', {
    method:'POST',
    headers: {
      'Content-Type':'application/json',
      'Accept':'application/json',
    },
    body: JSON.stringify({
      target: participantTarget,
      schedule: 'one-time',
      randomize: false,
      participantId: [participantId],
      date: schedule,
      message: messageContent.value,
      title: titleContent.value,
      url: urlContent.value,
      name: 'One-time',
    })
  })
    .then(res => {
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

createScheduleNotificationsBtn.addEventListener('click', createScheduleNotification);
