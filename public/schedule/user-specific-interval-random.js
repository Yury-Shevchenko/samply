const createRandomIndividualNotificationBtn = document.querySelector('#create_random_individual_notification');

// target: 'user-specific'
// schedule: 'repeat'
// randomize: true

function createRandomIndividualNotification(){

  createIndividualNotificationBtn.disabled = true;
  document.getElementById('notification_status_schedule').style.visibility = 'visible';
  const duration = $('#durationRandomIndividual')[0].value; //in seconds

  // const sec = Math.floor((Math.random() * 60));//get the random value for the seconds
  // const min = document.getElementById('int_min_individual_1').value;
  // const hour = document.getElementById('int_hour_individual_1').value;
  // const day = document.getElementById('int_day_individual_1').value;
  // const month = document.getElementById('int_month_individual_1').value;
  // const week = document.getElementById('int_week_individual_1').value;
  // const interval = String(`${sec} ${min} ${hour} ${day} ${month} ${week}`);

  const interval = {
    sec: Math.floor((Math.random() * 60)),
    min: document.getElementById('int_min_individual_1').value,
    hour: document.getElementById('int_hour_individual_1').value,
    day: document.getElementById('int_day_individual_1').value,
    month: document.getElementById('int_month_individual_1').value,
    week: document.getElementById('int_week_individual_1').value,
  }

  const interval_2 = {
    sec: Math.floor((Math.random() * 60)),
    min: document.getElementById('int_min_individual_2').value,
    hour: document.getElementById('int_hour_individual_2').value,
    day: document.getElementById('int_day_individual_2').value,
    month: document.getElementById('int_month_individual_2').value,
    week: document.getElementById('int_week_individual_2').value,
  }
  //const interval_2 = String(`${sec_2} ${min_2} ${hour_2} ${day_2} ${month_2} ${week_2}`);
  console.log('interval ', interval);
  console.log('interval_2 ', interval_2);
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
      randomize: true,
      interval: interval,
      interval_2: interval_2,
      message: messageContent.value,
      title: titleContent.value,
      url: urlContent.value,
      duration: duration,
    })
  })
    .then(res => {
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

createRandomIndividualNotificationBtn.addEventListener('click', createRandomIndividualNotification);
