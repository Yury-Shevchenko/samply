const createIndividualNotificationBtn = document.querySelector('#create_individual_notification');

// target: 'user-specific'
// schedule: 'repeat'
// randomize: false

function createIndividualNotification(){
  createIndividualNotificationBtn.disabled = true;
  document.getElementById('notification_status_schedule').style.visibility = 'visible';
  const duration = $('#duration')[0].value; //in seconds
  // const sec = Math.floor((Math.random() * 60));//get the random value for the seconds
  // const min = document.getElementById('int_min_individual').value;
  // const hour = document.getElementById('int_hour_individual').value;
  // const day = document.getElementById('int_day_individual').value;
  // const month = document.getElementById('int_month_individual').value;
  // const week = document.getElementById('int_week_individual').value;
  // const interval = `${sec} ${min} ${hour} ${day} ${month} ${week}`;
  // console.log('interval ', interval);

  const interval = {
    sec: Math.floor((Math.random() * 60)),
    min: document.getElementById('int_min_individual').value,
    hour: document.getElementById('int_hour_individual').value,
    day: document.getElementById('int_day_individual').value,
    month: document.getElementById('int_month_individual').value,
    week: document.getElementById('int_week_individual').value,
  }
  // console.log('individual times:', int_start, int_end);

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
};

createIndividualNotificationBtn.addEventListener('click', createIndividualNotification);
