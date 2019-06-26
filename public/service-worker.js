importScripts('workbox-sw.prod.v2.1.3.js');
importScripts('/javascripts/indexeddb/idb.js');
importScripts('/javascripts/indexeddb/utility.js');

const workboxSW = new self.WorkboxSW();

//installing and activating
self.addEventListener('install', function(event){
  // console.log('[Service Worker] Installing Service Worker ...', event);
});

self.addEventListener('activate', function(event){
  // console.log('[Service Worker] Activating Service Worker');
  return self.clients.claim();
});


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
  console.log('Data to save', data);

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
    })
  })
}


self.addEventListener('push', event => {
  // console.log('Push notification received', event);
  var data = {
    title: 'Samply study',
    content: 'Please check the new test',
    openUrl: 'https://samply.tk',
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
      url: data.openUrl
    }
  };

  event.waitUntil(self.registration.showNotification(data.title, options));
});


self.addEventListener('notificationclick', function(event) {
  console.log('event', event);
  console.log('event.notification', event.notification);
  console.log('event.data, event.data');
  console.log('event.data.json()', event.data.json());

  var notification = event.notification;

  if (event.action === 'no') {
    saveResults(notification.data, 'not now');
    notification.close();
  } else if(event.action === 'go') {;
    saveResults(notification.data, 'go to test');
    const urlToOpen = new URL(notification.data.url, self.location.origin).href;
    event.waitUntil(
      clients.matchAll({
        type: 'window',
        includeUncontrolled: true
      })
        .then(function(clis) {
          // var client = clis.find(function(c) {
          //   return c.visibilityState === 'visible';
          // });
          let client = null;
          let matchingClient = null;
          for (let i = 0; i < clis.length; i++) {
            client = clis[i];
            // console.log("client", client);
            if (client.url === urlToOpen) {
              matchingClient = client;
              break;
            }
          }
          if(matchingClient){
            matchingClient.focus();
          } else if (client) {
            client.navigate(urlToOpen);
            client.focus();
          } else {
            clients.openWindow(urlToOpen);
          }
          notification.close();
        })
    );
  }
});

//if a user closed the notification
self.addEventListener('notificationclose', (event) => {
  saveResults(event.notification.data, 'closed');
})

//background synchronization
self.onsync = function(event) {
  if(event.tag == 'sync-task-parameters') {
    // console.log('[Service Worker] Syncing new Posts');
  }
}
