const createIntervalNotificationBtn = document.querySelector('#create_interval_notification');

// target: 'all-users' or 'one-user'
// schedule: 'repeat'
// randomize: false

function createIntervalNotification(){
  let participantId = [], participantTarget;
  if(document.getElementById('participantId') && document.getElementById('participantId').value){
    participantId = [document.getElementById('participantId').value];
    participantTarget = 'one-user';
  } else {
    participantTarget = 'all-users';
  }

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
      target: participantTarget,
      schedule: 'repeat',
      randomize: true,
      participantId: participantId,
      interval: interval,
      int_start: int_start,
      int_end: int_end,
      message: messageContent.value,
      title: titleContent.value,
      url: urlContent.value,
      name: 'Repeat',
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
};

createIntervalNotificationBtn.addEventListener('click', createIntervalNotification);
