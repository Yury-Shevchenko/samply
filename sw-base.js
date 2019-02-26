importScripts('workbox-sw.prod.v2.1.3.js');
importScripts('/javascripts/indexeddb/idb.js');
importScripts('/javascripts/indexeddb/utility.js');

const workboxSW = new self.WorkboxSW();

//installing and activating
self.addEventListener('install', function(event){
  console.log('[Service Worker] Installing Service Worker ...', event);
});

self.addEventListener('activate', function(event){
  console.log('[Service Worker] Activating Service Worker');
  return self.clients.claim();
});


workboxSW.precache([]);

//routing
// workboxSW.router.registerRoute(/\/test\/.*$/, workboxSW.strategies.staleWhileRevalidate({
//   cacheName: 'tests',
//   cacheExpiration: {
//     maxAgeSeconds: 60 * 60 * 24 * 7 //week
//   }
// }));

//saving data when a user is offline
// workboxSW.router.registerRoute('/save', function(args){
//   console.log("the data are sent for saving");
//   return fetch(args.event.request)
//     .then(function(res){
//       console.log("Response", res);
//     })
// });


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

self.addEventListener('push', event => {
  console.log('Push notification received', event);
  var data = {title: 'New test', content: 'Please check the new test', openUrl: '/testing'};
  if(event.data) {
    try{
      data = event.data.json();
    }
    catch(error){
      console.log(error)
    }
  }
  var options = {
    body: data.content,
    icon: '/images/icons/rat.png',
    badge: '/images/icons/rat.png',
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

  // const promiseChain = isClientFocused()
    // .then((clientIsFocused) => {
    //   if (clientIsFocused) {
    //     console.log('Don\'t need to show a notification.');
    //     return;
    //   }
    //   // Client isn't focused, we need to show a notification.
    //   return self.registration.showNotification(data.title, options);
    // });

  event.waitUntil(self.registration.showNotification(data.title, options));
});


self.addEventListener('notificationclick', function(event) {
  var notification = event.notification;

  // if (!event.action) {
  //   // Was a normal notification click
  //   console.log('Notification Click.');
  //   return;
  // }

  if (event.action === 'busy') {
    console.log('Busy was chosen');
    notification.close();
  } else {
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
            console.log("client", client);
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

//if user did not interact with application - might be used for analytics
self.addEventListener('notificationclose', (event) => {
  console.log('Notification was closed', event);
  //can be used for analytics
  // const dismissedNotification = event.notification;
  // const promiseChain = notificationCloseAnalytics();
  // event.waitUntil(promiseChain);
})

//background synchronization
self.onsync = function(event) {
  if(event.tag == 'sync-task-parameters') {
    console.log('[Service Worker] Syncing new Posts');
  }
}

// self.addEventListener('sync', function(event) {
//   console.log('[Service Worker] Background syncing', event);
//   if (event.tag === 'sync-task-parameters') {
//
//     // event.waitUntil(
//     //   readAllData('sync-parameters')
//     //     .then(function(data) {
//     //       for (var dt of data) {
//     //         var postData = new FormData();
//     //         postData.append('id', dt.id);
//     //         postData.append('parameters', dt.parameters);
//     //         fetch(`/tasks/${dt.task_id}/${dt.task_slug}/${dt.param_language}`, {
//     //           method: 'POST',
//     //           body: postData
//     //         })
//     //           .then(function(res) {
//     //             console.log('Sent data', res);
//     //             if (res.ok) {
//     //               res.json()
//     //                 .then(function(resData) {
//     //                   deleteItemFromData('sync-parameters', resData.id);
//     //                 });
//     //             }
//     //           })
//     //           .catch(function(err) {
//     //             console.log('Error while sending data', err);
//     //           });
//     //       }
//     //
//     //     })
//     // );
//   }
// });
