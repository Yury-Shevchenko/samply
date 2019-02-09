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

workboxSW.precache([]);
