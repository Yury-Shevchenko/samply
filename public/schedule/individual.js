const createIndividualNotificationBtn = document.querySelector('#create_individual_notification');

// target: 'user-specific'
// schedule: 'repeat'
// randomize: false

function createIndividualNotification(){

  let participantId = [], participantTarget;
  if(document.getElementById('participantId') && document.getElementById('participantId').value){
    participantId = [document.getElementById('participantId').value];
    participantTarget = 'one-user';
  } else {
    participantTarget = 'all-users';
  }

  createIndividualNotificationBtn.disabled = true;
  document.getElementById('notification_status_schedule').style.visibility = 'visible';
  const duration = $('#duration')[0].value; //in seconds
  const interval = {
    sec: Math.floor((Math.random() * 60)),
    min: document.getElementById('int_min_individual').value,
    hour: document.getElementById('int_hour_individual').value,
    day: document.getElementById('int_day_individual').value,
    month: document.getElementById('int_month_individual').value,
    week: document.getElementById('int_week_individual').value,
  }
  // console.log('duration:', duration, 'interval:', interval);
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
      interval: interval,
      message: messageContent.value,
      title: titleContent.value,
      url: urlContent.value,
      duration: duration,
      name: 'Event-dependent',
      participantId: participantId,
    })
  })
    .then(async res => {
      createIndividualNotificationBtn.disabled = false;
      document.getElementById('notification_status_schedule').style.visibility = 'hidden';
      if (res.redirected) { window.location = res.url; return; }
      const data = await res.json();
      if (data.warning) alert(data.warning);
      if (data.redirect) window.location = data.redirect;
    })
    .catch(err => {
      console.log(err);
      createIndividualNotificationBtn.disabled = false;
      document.getElementById('notification_status_schedule').style.visibility = 'hidden';
    })
};

createIndividualNotificationBtn.addEventListener('click', createIndividualNotification);
