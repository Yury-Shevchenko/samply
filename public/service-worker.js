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

workboxSW.precache([
  {
    "url": "dist/App.bundle.js",
    "revision": "0eef6cadae30ebd7818a8c3cbf12a9ba"
  },
  {
    "url": "dist/style.css",
    "revision": "6e094decbad7801b2accd55f2c16ab61"
  },
  {
    "url": "javascripts/datepicker/bootstrap-duration-picker.css",
    "revision": "8390d8a52599eaf3e830f116c647c628"
  },
  {
    "url": "javascripts/datepicker/bootstrap-duration-picker.js",
    "revision": "388d948d4a31f7c7072a9c76b685a2bf"
  },
  {
    "url": "javascripts/datepicker/daterangepicker.css",
    "revision": "b57cd7693581de2d51da1e34ca38be45"
  },
  {
    "url": "javascripts/datepicker/daterangepicker.min.js",
    "revision": "e5b7176b5bbac0671a9dd44a5243072f"
  },
  {
    "url": "javascripts/datepicker/datetimepicker.css",
    "revision": "61ea380a5c8db59eda4770c11746bdd9"
  },
  {
    "url": "javascripts/datepicker/datetimepicker.js",
    "revision": "abeb16e6cec01d02b3b2508cebeea386"
  },
  {
    "url": "javascripts/datepicker/font-awesome.min.css",
    "revision": "6f1b5406e93ccea85e5d352f83b8ece1"
  },
  {
    "url": "javascripts/datepicker/jquery-3.3.1.min.js",
    "revision": "5f48fc77cac90c4778fa24ec9c57f37d"
  },
  {
    "url": "javascripts/datepicker/jquerysctipttop.css",
    "revision": "0e573383f483f4c873c7b29ab02f7beb"
  },
  {
    "url": "javascripts/datepicker/moment-with-locales.min.js",
    "revision": "4126f2c3b4ac2cd4af1d34653f7890a8"
  },
  {
    "url": "javascripts/delicious-app.js",
    "revision": "345f9392e924a773310d9779428598ad"
  },
  {
    "url": "javascripts/indexeddb/idb.js",
    "revision": "017ced36d82bea1e08b08393361e354d"
  },
  {
    "url": "javascripts/indexeddb/utility.js",
    "revision": "8f3604242c595135664508c68e3e575d"
  },
  {
    "url": "javascripts/modules/addTest.js",
    "revision": "9cbbe6ca7896f31e17496ce675abd4ed"
  },
  {
    "url": "javascripts/modules/analytics.js",
    "revision": "1232588d1fc08315416c2df1c4fbec8a"
  },
  {
    "url": "javascripts/modules/autocomplete.js",
    "revision": "583afc9125e0e91643e0a9dedcb6979b"
  },
  {
    "url": "javascripts/modules/bling.js",
    "revision": "90291aca14d0ccf5cc1e168496faf9e0"
  },
  {
    "url": "javascripts/modules/jquery.js",
    "revision": "c9f5aeeca3ad37bf2aa006139b935f0a"
  },
  {
    "url": "javascripts/modules/service.js",
    "revision": "bd7ed09c3457d3059a0ac4e20ff38bb7"
  },
  {
    "url": "javascripts/modules/typeAhead.js",
    "revision": "063cd0ce4d6c25a2a98785868fe9cb37"
  },
  {
    "url": "javascripts/services/notifications.js",
    "revision": "8767108a775ab2c904e38cc771999e66"
  },
  {
    "url": "javascripts/services/notify.js",
    "revision": "581df4cc4154cff95ba0fe5fe3626d3f"
  },
  {
    "url": "manifest.json",
    "revision": "868e0c1cf837feb3a3df5110788dd69e"
  },
  {
    "url": "service-worker.js",
    "revision": "79f641ee37e1b6357649086b41e8258f"
  },
  {
    "url": "workbox-sw.prod.v2.1.3.js",
    "revision": "a9890beda9e5f17e4c68f42324217941"
  },
  {
    "url": "images/photos/balloons.jpg",
    "revision": "6cc34bff3bddca21e93f88c04d9a75dd"
  },
  {
    "url": "images/photos/desert.jpg",
    "revision": "fe13e655ea97ab4b7c13c64586cf2453"
  },
  {
    "url": "images/photos/konstanz.jpg",
    "revision": "f3dc9b111a8c5eda3c6f60f5a614c29a"
  },
  {
    "url": "images/photos/over.jpg",
    "revision": "b5cc7fa8be0c30b640646e8ee5fff73d"
  }
]);

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
        clients.matchAll({
          type: 'window',
          includeUncontrolled: true
        })
          .then(function(clis) {
            let client = null;
            let matchingClient = null;
            for (let i = 0; i < clis.length; i++) {
              client = clis[i];
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
  }
});

//if a user closed the notification
self.addEventListener('notificationclose', (event) => {
  if(event.notification && event.notification.data) saveResults(event.notification.data, 'closed');
})

self.addEventListener('message', function(event){
  console.log("SW Received Message: " + event.data);
});
