importScripts('workbox-sw.prod.v2.1.3.js');
importScripts('/javascripts/indexeddb/idb.js');
importScripts('/javascripts/indexeddb/utility.js');

const workboxSW = new self.WorkboxSW();

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
      //data = JSON.parse(event.data.text());
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
        action: 'busy',
        title: 'I am busy now',
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

  if (!event.action) {
    // Was a normal notification click
    console.log('Notification Click.');
    return;
  }

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

workboxSW.precache([
  {
    "url": "dist/App.bundle.js.map",
    "revision": "7537fc5f027d0b9b074b5000c4403d7e"
  },
  {
    "url": "dist/style.css.map",
    "revision": "99ab586c21da3c83699b4223c6ec642b"
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
