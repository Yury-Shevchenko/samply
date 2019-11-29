importScripts('workbox-sw.prod.v2.1.3.js');
importScripts('/javascripts/indexeddb/idb.js');
importScripts('/javascripts/indexeddb/utility.js');

const workboxSW = new self.WorkboxSW();

// activating
self.addEventListener('activate', function(event){
  return self.clients.claim();
});

workboxSW.router.registerRoute(/testing/, workboxSW.strategies.staleWhileRevalidate({
  cacheName: 'testingPage'
}));

workboxSW.precache([]);

//handle notifications
function isClientFocused() {
  return clients.matchAll({
    type: 'window',
    includeUncontrolled: true
  })
  .then((windowClients) => {
    let clientIsFocused = false;
    for (let i = 0; i < windowClients.length; i++) {
      const windowClient = windowClients[i];
      if (windowClient.focused) {
        clientIsFocused = true;
        break;
      }
    }
    return clientIsFocused;
  });
}

function saveResults(data, name){
  fetch('/save', {
    method:'POST',
    headers: {
      'Content-Type':'application/json',
      'Accept':'application/json',
    },
    body: JSON.stringify({
      author: data.author,
      project: data.project,
      samplyid: data.samplyid,
      name: name,
      data: {
        title: data.title,
        content: data.content,
        openUrl: data.openUrl,
      },
      timestamp: Date.now(),
      appVersion: this && this.navigator && this.navigator.appVersion,
    })
  })
}

let that = this;

self.addEventListener('push', event => {
  var data = {
    title: 'Samply study',
    content: 'Please check the new test',
    openUrl: 'https://samply.uni-konstanz.de',
    author: '5d108c051e7ed9050a283989',
    project: '5d1091b3ea5dc1052dd171b3',
    samplyid: '1234567890',
  };

  if(event.data) {
    try{
      data = event.data.json();
    }
    catch(error){
      console.log(error)
    }
  }

  saveResults(data, 'received');

  var options = {
    body: data.content,
    icon: '/images/icons/lamp.png',
    badge: '/images/icons/lamp.png',
    vibrate: [300,110,300],
    tag: data.title,
    actions: [
      {
        action: 'go',
        title: 'Go to the test',
      },
      {
        action: 'no',
        title: 'Not now',
      }
    ],
    data: {
      title: data.title,
      content: data.content,
      openUrl: data.openUrl,
      author: data.author,
      project: data.project,
      samplyid: data.samplyid,
    }
  };

  event.waitUntil(self.registration.showNotification(data.title, options));
});


self.addEventListener('notificationclick', function(event) {
  var notification = event.notification;
  if (event.action === 'no') {
    if(notification && notification.data) saveResults(notification.data, 'not now');
    notification.close();
  } else {
    if(notification && notification.data){
      saveResults(notification.data, 'go to test');
      const urlToOpen = notification.data.openUrl;
      event.waitUntil(
        clients.openWindow(urlToOpen);
        // clients.matchAll({
        //   type: 'window',
        //   includeUncontrolled: true
        // })
        //   .then(function(clis) {
        //     let client = null;
        //     let matchingClient = null;
        //     for (let i = 0; i < clis.length; i++) {
        //       client = clis[i];
        //       if (client.url === urlToOpen) {
        //         matchingClient = client;
        //         break;
        //       }
        //     }
        //     if(matchingClient){
        //       matchingClient.focus();
        //     } else if (client) {
        //       client.navigate(urlToOpen);
        //       client.focus();
        //     } else {
        //       clients.openWindow(urlToOpen);
        //     }
        //     notification.close();
        //   })
      );
    }
  }
});

//if a user closed the notification
self.addEventListener('notificationclose', (event) => {
  if(event.notification && event.notification.data) saveResults(event.notification.data, 'closed');
})

self.addEventListener('message', function(event){
  console.log("SW Received Message: " + event.data);
});
