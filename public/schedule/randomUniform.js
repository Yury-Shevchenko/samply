const createRandomNotificationBtn = document.querySelector('#create_random_notification');

// randomization is done on the user side
// target: 'all-users' or 'one-user'
// schedule: 'one-time'
// randomize: true

function createRandomNotification(){
  let participantId = [], participantTarget;
  if(document.getElementById('participantId') && document.getElementById('participantId').value){
    participantId = [document.getElementById('participantId').value];
    participantTarget = 'one-user';
  } else {
    participantTarget = 'all-users';
  }

  createScheduleNotificationsBtn.disabled = true;
  document.getElementById('notification_status_schedule').style.visibility = 'visible';

  const int_start = $('input[name="random_datetimes_regular"]').data('daterangepicker').startDate._d;
  const int_end = $('input[name="random_datetimes_regular"]').data('daterangepicker').endDate._d;

  const getRandomArbitrary = (min, max) => {
    return Math.round(Math.random() * (max - min) + min);
  }
  console.log('int_start', int_start);
  const randomEvent = getRandomArbitrary(Date.parse(int_start), Date.parse(int_end));
  const timeRandomEvent = [new Date(randomEvent).toISOString()];

  fetch('/createschedulenotification', {
    method:'POST',
    headers: {
      'Content-Type':'application/json',
      'Accept':'application/json',
    },
    body: JSON.stringify({
      target: participantTarget,
      schedule: 'one-time',
      randomize: true,
      participantId: participantId,
      date: timeRandomEvent,
      message: messageContent.value,
      title: titleContent.value,
      url: urlContent.value,
      name: 'One-time (random)'
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

createRandomNotificationBtn.addEventListener('click', createRandomNotification);
