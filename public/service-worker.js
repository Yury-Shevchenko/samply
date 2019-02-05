importScripts('workbox-sw.prod.v2.1.3.js');
importScripts('/javascripts/indexeddb/idb.js');
importScripts('/javascripts/indexeddb/utility.js');

const workboxSW = new self.WorkboxSW();

//using regular expressions or routes
//REGEXP
// /.*(?:googleapis|gstatic)\.com.*/
//1 - router 2- what to do
workboxSW.router.registerRoute('/studies', workboxSW.strategies.staleWhileRevalidate({
  cacheName: 'openlab-studies',
  cacheExpiration: {
    maxEntries: 3,
    maxAgeSeconds: 60 * 60 * 24 * 30 //month
  }
}));
//staleWhileRevalidate: cache then network, with dynamic caching
// workboxSW.router.registerRoute('/test/:test/:id', workboxSW.strategies.staleWhileRevalidate({
//   cacheName: 'openlab-tests'
// }));

//indexedDB - customized strategy
// workboxSW.router.registerRoute('/getSomeData', function(args){
//   return fetch(args.event.request)
//     .then(function (res) {
//       var clonedRes = res.clone();
//       clearAllData('posts')
//         .then(function () {
//           return clonedRes.json();
//         })
//         .then(function (data) {
//           for (var key in data) {
//             writeData('posts', data[key])
//           }
//         });
//       return res;
//     })
// });

//fallback page
// workboxSW.router.registerRoute(function(routeData){
//   return (routeData.event.request.headers.get('accept').includes('text/html'));
// }, function(args){
//   console.log("Request is", args.event.request);
//   return caches.match(args.event.request)
//     .then(function (response) {
//       if (response) {
//         return response;
//       } else {
//         return fetch(args.event.request)
//           .catch(function (err){
//             console.log("No file with this name");
//             return caches.match('/studies')
//               .then(function (res) {
//                 return res;
//               });
//           });
//       }
//     })
// });


//listen to push messages
self.addEventListener('push', event => {
  console.log('Push notification received', event);
  //Fallback (if there is no data)
  var data = {title: 'New test', content: 'Please check the new test', openUrl: '/testing'};
  //check whether data exists
  if(event.data) {
    try{
      data = JSON.parse(event.data.text());
    }
    catch(error){
      console.log(error)
    }
  }
  //show notification
  var options = {
    body: data.content,
    icon: '/images/icons/rat.png', //can be url
    // image: 'https://www.visit-mannheim.de/extension/portal-mannheim/var/storage/images/media/bibliothek/grosse-bildbuehnen-1440x900px/mannheim_barockschloss_-c-stadtmarketing-mannheim-gmbh_achim-mende_117_1440x900px/19637-9-ger-DE/mannheim_barockschloss_-c-stadtmarketing-mannheim-gmbh_achim-mende_117_1440x900px_liscms-l.jpg',
    //badge: '',
    data: {
      url: data.openUrl
    }
  };
  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );

});

self.addEventListener('notificationclick', function(event) {
  var notification = event.notification;
  var action = event.action;

  console.log(notification);

  if (action === 'confirm') {
    console.log('Confirm was chosen');
    notification.close();
  } else {
    console.log(action);
    event.waitUntil(
      clients.matchAll()
        .then(function(clis) {
          var client = clis.find(function(c) {
            return c.visibilityState === 'visible';
          });

          if (client !== undefined) {
            client.navigate(notification.data.url);
            client.focus();
          } else {
            clients.openWindow(notification.data.url);
          }
          notification.close();
        })
    );
  }
});

// self.addEventListener('notificationclick', (event) => {
//   var notification = event.notification;
//   var action = event.action;
//   console.log('Notification info', notification);
//
//   if(action === 'confirm'){
//     notification.close();
//   } else {
//     console.log('Action info', action);
//     console.log('Clients', clients);
//     event.waitUntil(
//       clients.matchAll() //all browser tasks related to sw
//         .then(clis => {
//           console.log('Clients', clis);
//           var client = clis.find( c => {
//             return c.visibilityState = 'visible';
//           });
//           console.log('Client', client);
//           if (client !== 'undefined'){
//             // client.navigate(notification.data.url);
//             // client.focus();
//           } else {
//             clients.openWindow(notification.data.url);
//           }
//           notification.close();
//         })
//     );
//   }
// });

//if user did not interact with application - might be used for analytics
self.addEventListener('notificationclose', (event) => {
  console.log('Notification was closed', event);
})

workboxSW.precache([
  {
    "url": "dist/App.bundle.js.map",
    "revision": "ec46af147de4df3d770d5ee9f2e756c6"
  },
  {
    "url": "dist/style.css.map",
    "revision": "1b1b18ec3d88bcda0c500003c6edc3ec"
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
