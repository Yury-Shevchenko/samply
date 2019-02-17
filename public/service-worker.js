importScripts('workbox-sw.prod.v2.1.3.js');
importScripts('/javascripts/indexeddb/idb.js');
importScripts('/javascripts/indexeddb/utility.js');

const workboxSW = new self.WorkboxSW();

//installing and activating
self.addEventListener('install', function(event){
  console.log('[Service Worker] Installing Service Worker ...', event);
});

self.addEventListener('activate', function(event){
  console.log('[Service Worker] Activating Service Worker ...', event);
  return self.clients.claim();
});

//routing
workboxSW.router.registerRoute(/\/test\/.*$/, workboxSW.strategies.staleWhileRevalidate({
  cacheName: 'tests',
  cacheExpiration: {
    maxAgeSeconds: 60 * 60 * 24 * 7 //week
  }
}));

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
  const promiseChain = isClientFocused()
    .then((clientIsFocused) => {
      if (clientIsFocused) {
        console.log('Don\'t need to show a notification.');
        return;
      }
      // Client isn't focused, we need to show a notification.
      return self.registration.showNotification(data.title, options);
    });

  event.waitUntil(promiseChain);
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


workboxSW.precache([
  {
    "url": "dist/App.bundle.js.map",
    "revision": "90566c21166e021bedaf99777c2420f5"
  },
  {
    "url": "dist/style.css.map",
    "revision": "7e89904241b1fe8db60a26ef8bb67cc2"
  },
  {
    "url": "fonts/BebasNeue Bold.ttf",
    "revision": "1e99b0442583593743adb5d91d7c0669"
  },
  {
    "url": "fonts/BebasNeue Regular.otf",
    "revision": "a105cda50ada8b1d3c5a401a5411f8ae"
  },
  {
    "url": "fonts/fontawesome-webfont.ttf",
    "revision": "b06871f281fee6b241d60582ae9369b9"
  },
  {
    "url": "fonts/fontawesome-webfont.woff",
    "revision": "fee66e712a8a08eef5805a46892932ad"
  },
  {
    "url": "fonts/fontawesome-webfont.woff2",
    "revision": "af7ae505a9eed503f8b8e6982036873e"
  },
  {
    "url": "fonts/OpenSans-Bold.ttf",
    "revision": "50145685042b4df07a1fd19957275b81"
  },
  {
    "url": "fonts/OpenSans-Italic.ttf",
    "revision": "c7dcce084c445260a266f92db56f5517"
  },
  {
    "url": "fonts/OpenSans-Regular.ttf",
    "revision": "629a55a7e793da068dc580d184cc0e31"
  },
  {
    "url": "fonts/panama-bold-webfont.woff",
    "revision": "629097e5ba87d71f789ebfc1fe26f5e8"
  },
  {
    "url": "fonts/panama-bold-webfont.woff2",
    "revision": "fb592398564bc10e76d060da13a35279"
  },
  {
    "url": "javascripts/modules/lab.js.map",
    "revision": "6f75697bfe04bdedcb5559e1c40fec98"
  },
  {
    "url": "manifest.json",
    "revision": "8aeac47aaf92a1b6485d1655ee7a3666"
  },
  {
    "url": "workbox-sw.prod.v2.1.3.js.map",
    "revision": "1cbd1bf8f8f05f7504355e0f7674b67e"
  },
  {
    "url": "images/photos/over.jpg",
    "revision": "b5cc7fa8be0c30b640646e8ee5fff73d"
  }
]);
