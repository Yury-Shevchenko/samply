// console.log(self);
var CACHE_STATIC_NAME = 'static-v1';
var CACHE_DYNAMIC_NAME = 'dynamic-v1';

var STATIC_FILES = [
  // '/',
  '/images/icons/rat.png',
  '/fonts/BebasNeue%20Bold.ttf',
  '/fonts/OpenSans-Regular.ttf',
  '/fonts/OpenSans-Bold.ttf',
  '/dist/style.css',
  '/javascripts/modules/service.js',
  '/dist/App.bundle.js',
  '/images/icons/chevron-arrow-down.png',
  '/manifest.json',
  '/javascripts/modules/lab.js',
  '/dist/lab.css',
];

var TEST_FILES = [
  '/test'
];

// function trimCache(cacheName, maxItems){
//   caches.open(cacheName)
//     .then(cache => {
//       return cache.keys()
//         .then(keys => {
//           if (keys.length > maxItems){
//             cache.delete(keys[0])
//               .then(trimCache(cacheName, maxItems));
//           }
//         });
//     })
// }

self.addEventListener('install', function(event){
  console.log('[Service Worker] Installing Service Worker ...', event);
  event.waitUntil(
    caches.open(CACHE_STATIC_NAME)
      .then(cache => {
        console.log('[Service Worker] Precaching App Shell');
        cache.addAll(STATIC_FILES);
      })
  );
});

self.addEventListener('activate', function(event){
  // console.log('[Service Worker] Activating Service Worker ...', event);
  //clean old cache
  event.waitUntil(
    caches.keys()
      .then(keyList => {
        return Promise.all(keyList.map(key => {
          if(key !== CACHE_STATIC_NAME && key !== CACHE_DYNAMIC_NAME){
            console.log('[Service Worker] Removing old cache.', key);
            return caches.delete(key);
          }
        }));
      })
  );
  return self.clients.claim();
});

function isInArray(string, array) {
  var cachePath;
  if (string.indexOf(self.origin) === 0) { // request targets domain where we serve the page from (i.e. NOT a CDN)
    console.log('matched ', string);
    cachePath = string.substring(self.origin.length); // take the part of the URL AFTER the domain (e.g. after localhost:8080)
  } else {
    cachePath = string; // store the full request (for CDNs)
  }
  return array.indexOf(cachePath) > -1;
}

self.addEventListener('fetch', function(event) {
  //console.log('Reaching url', event.request.url.split('/')[3]);
  if(event.request.url.split('/')[3] === 'test'){
    event.respondWith(
      caches.match(event.request)
        .then(function (response) {
          if (response) {
            return response;
          } else {
            return fetch(event.request)
              .then(function (res) {
                return caches.open(CACHE_DYNAMIC_NAME)
                  .then(function (cache) {
                    // trimCache(CACHE_DYNAMIC_NAME, 3);
                    cache.put(event.request.url, res.clone());
                    return res;
                  })
              })
              .catch(function (err) {
                return caches.open(CACHE_STATIC_NAME)
                  .then(function (cache) {
                    if (event.request.headers.get('accept').includes('text/html')) {
                      return cache.match('/');
                    }
                  });
              });
          }
        })
    );
  } else {
    event.respondWith(fetch(event.request));
    // event.respondWith(
    //   caches.match(event.request)
    //     .then(function (response) {
    //       if (response) {
    //         return response;
    //       } else {
    //         return fetch(event.request)
    //       }
    //     })
    // );
  }
});

// self.addEventListener('fetch', function(event){
//   //console.log('[Service Worker] Fetching something ...', event);
//   var url = '/code';
//   if(event.request.url.indexOf(url) > -1){
//     console.log("You requested the page with use login", event);
//   // } else if (new RegExp('\\b' + STATIC_FILES.join('\\b|\\b') + '\\b').test(event.request.url)){
//   } else if(false){
//     console.log("You requested one of the static files");
//     event.respondWith(
//       caches.match(event.request)
//     );
//   } else {
//     event.respondWith(
//       caches.match(event.request)
//         .then(response => {
//           if (response){
//             return response;
//           } else {
//             return fetch(event.request)
//               .then( res => {
//                 if(event.request.headers.get('accept').includes('text/html')){
//                   return caches.open(CACHE_DYNAMIC_NAME)
//                     .then(cache => {
//                       // trimCache(CACHE_DYNAMIC_NAME, 5);
//                       cache.put(event.request.url, res.clone());//responses are consumed, so we need to clone the response
//                       return res;
//                     })
//                 } else {
//                   return res;
//                 }
//               })
//               .catch(err => {
//                 console.error(err);
//                 return caches.open(CACHE_STATIC_NAME)
//                   .then(cache => {
//                     //event.request.headers.get('accept').includes('text/html')
//                     if(event.request.url.indexOf('/testing')){
//                       return cache.match('/testing')
//                     }
//                 })
//               })
//           }
//         })
//     );
//   }
// });

//listen to push messages
self.addEventListener('push', event => {
  // console.log('Push notification received', event);
  //Fallback (if there is no data)
  var data = {title: 'New', content: 'Something new', openUrl: '/testing'};
  //check whether data exists
  if(event.data) {
    data = JSON.parse(event.data.text());
  }
  //show notification
  var options = {
    body: data.content,
    icon: '/images/icons/rat.png', //can be url
    image: 'https://www.visit-mannheim.de/extension/portal-mannheim/var/storage/images/media/bibliothek/grosse-bildbuehnen-1440x900px/mannheim_barockschloss_-c-stadtmarketing-mannheim-gmbh_achim-mende_117_1440x900px/19637-9-ger-DE/mannheim_barockschloss_-c-stadtmarketing-mannheim-gmbh_achim-mende_117_1440x900px_liscms-l.jpg',
    //badge: '',
    data: {
      url: data.openUrl
    }
  };
  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );

});


self.addEventListener('notificationclick', (event) => {
  var notification = event.notification;
  var action = event.action;
  // console.log('Notification info', notification);

  if(action === 'confirm'){
    notification.close();
  } else {
    console.log('Action info', action);
    event.waitUntil(
      clients.matchAll() //all browser tasks related to sw
        .then(clis => {
          console.log('Clients', clis);
          var client = clis.find( c => {
            return c.visibilityState = 'visible';
          })
          if (client !== 'undefined'){
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

//if user did not interact with application - might be used for analytics
self.addEventListener('notificationclose', (event) => {
  console.log('Notification was closed', event);
})
