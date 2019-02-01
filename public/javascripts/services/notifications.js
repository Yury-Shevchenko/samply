console.log('Notification service is turned on');

const enableNotificationsButton = document.querySelector('#enable_notifications');
const disableNotificationsButton = document.querySelector('#disable_notifications');
// const sendNotificationButton = document.querySelector('#send_notification');
const notificationStatus = document.querySelector('#notification_status');

function displayConfirmNotification(){
  if('serviceWorker' in navigator){
    var options = {
      body: 'You are successfully subscribed to Open Lab notification service',
      //- icon: '/src/images/icons/app-icon-96x96.png',
      //- image: '/src/images/sf-boat.jpg',
      dir: 'ltr',
      lang: 'en-US',//BCP 47
      vibrate: [100, 50, 200],//vibration pause vibration in ms
      //- badge: '/src/images/icons/app-icon-96x96.png',
      tag: 'confirm-notification',//id for notification, notifications with the same tag will be stacked together - good not to spam user
      renotify: true,//even if you need the same tag, the phone will vibrate and notify. (if false - very passive notification)
      //- actions: [//might not be displayed
      //-   {action: 'confirm', title: 'Okay', icon: '/src/images/icons/app-icon-96x96.png'},
      //-   {action: 'cancel', title: 'Cancel', icon: '/src/images/icons/app-icon-96x96.png'},
      //- ]
    };
    notificationStatus.innerText = "You are subscribed to notifications";
    enableNotificationsButton.style.display = "none";
    disableNotificationsButton.style.display = "inline-block";
    navigator.serviceWorker.ready
      .then(swreg => {
        swreg.showNotification('Successfully subscribed!', options)
      })
  }
}

function urlBase64ToUint8Array(base64String) {
  var padding = '='.repeat((4 - base64String.length % 4) % 4);
  var base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  var rawData = window.atob(base64);
  var outputArray = new Uint8Array(rawData.length);

  for (var i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

function configurePushSub(){
  if(!('serviceWorker' in navigator)){
    return;
  }
  var reg;
  navigator.serviceWorker.ready
    .then(swreg => {
      reg = swreg;
      return swreg.pushManager.getSubscription();//check subscription of this browser and this device
    })
    .then(sub => {
      if(sub === null){
        var vapidPublicKey = 'BJ-KXZLw9zvIdVFMGpmiasjO4q9KVZIhAHHresr5AJv32rnnGicDdk13YizCJDR51TTNTfah29McZQB-FOHtQhA';
        var convertedVapidPublicKey = urlBase64ToUint8Array(vapidPublicKey);
        //Create new subscription
        return reg.pushManager.subscribe({
          userVisibleOnly: true,//push notifications are only visible to the user
          applicationServerKey: convertedVapidPublicKey,
        });
      } else {
        //Already have subscription
        notificationStatus.innerText = "You are subscribed to notifications";
        enableNotificationsButton.style.display = "none";
        console.log("You already have subscription", sub);
        throw new Error("You already have subscription");
      }
    })
    .then(newSub => {
      if(typeof(newSub) !== 'undefined'){
        //pass subscription to the database through a post request
        console.log('New subscription', JSON.stringify(newSub));
        return fetch('/registernotification', {
          method:'POST',
          headers: {
            'Content-Type':'application/json',
            'Accept':'application/json',
          },
          body: JSON.stringify(newSub)
        })
      }
    })
    .then(res => {
      console.log('Results from server are received', res);
      if(res && res.ok){
        displayConfirmNotification();
      }
      // return res.json();
    })
    // .then(data => {
    //   console.log('data received', data);
    // })
    .catch(err => {
      console.error(err);
    })
}

function askForNotificationPermission(){
  Notification.requestPermission((result)=>{
    console.log('User choice', result);
    if(result !== 'granted'){
      console.log('No notifications granted');
    } else {
      configurePushSub();
    }
  })
};

function sendNotification(){
  console.log('Sending test notification');
  fetch('/sendnotification', {
    method:'POST',
    headers: {
      'Content-Type':'application/json',
      'Accept':'application/json',
    },
    body: JSON.stringify({title: 'New post', message: 'New message'})
  })
}

function checkNotificationSubscription() {
  if(!('serviceWorker' in navigator)){
    return;
  }
  var reg;
  navigator.serviceWorker.ready
    .then(swreg => {
      reg = swreg;
      return swreg.pushManager.getSubscription();//check subscription of this browser and this device
    })
    .then(sub => {
      if(sub === null){
        notificationStatus.innerText = "Please subscribe to receive notifications about the tests";
      } else {
        notificationStatus.innerText = "You are subscribed to notifications";
        enableNotificationsButton.style.display = "none";
        disableNotificationsButton.style.display = "inline-block";
      }
    })
    .catch(err => {
      console.error(err);
    })
};

function unsubscribeNotifications() {

  if(!('serviceWorker' in navigator)){
    return;
  }
  var reg;
  navigator.serviceWorker.ready
    .then(swreg => {
      reg = swreg;
      return swreg.pushManager.getSubscription();//check subscription of this browser and this device
    })
    .then(function(subscription) {
      if (subscription) {
        return subscription.unsubscribe();
      }
    })
    .then(function(sub) {
      if(sub){
        return fetch('/unregisternotification', {
          method:'POST'
        })
      }
    })
    .then(res => {
      console.log('Results from server are received', res);
      alert("You are unsubscribed");
      enableNotificationsButton.style.display = "inline-block";
      disableNotificationsButton.style.display = "none";
      notificationStatus.innerText = "Please subscribe to receive notifications about the tests";
    })
    .catch(err => {
      console.error(err);
    })
}


//TODO: fix the styling of buttons in css
enableNotificationsButton.style.display = "none";
// sendNotificationButton.style.display = "none";

if ('Notification' in window && 'serviceWorker' in navigator) {
  enableNotificationsButton.style.display = "inline-block";
  enableNotificationsButton.addEventListener('click', askForNotificationPermission);
  disableNotificationsButton.style.display = "none";
  disableNotificationsButton.addEventListener('click', unsubscribeNotifications);
  // sendNotificationButton.style.display = "inline-block";
  // sendNotificationButton.addEventListener('click', sendNotification);
  checkNotificationSubscription();
}
