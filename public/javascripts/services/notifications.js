const enableNotificationsButton = document.querySelector(
  "#enable_notifications"
);
const disableNotificationsButton = document.querySelector(
  "#disable_notifications"
);
const notificationStatus = document.querySelector("#notification_status");

const subscribeButton = document.querySelector("#subscribeForStudy");
const unsubscribeButton = document.querySelector("#unsubscribeFromStudy");
const subscription_status = document.querySelector("#subscription_status");

function displayConfirmNotification() {
  if ("serviceWorker" in navigator) {
    var options = {
      body: "You are successfully subscribed to Samply notification service",
      dir: "ltr",
      lang: "en-US", //BCP 47
      vibrate: [100, 50, 200], //vibration pause vibration in ms
      //- badge: '/src/images/icons/app-icon-96x96.png',
      tag: "confirm-notification", //id for notification, notifications with the same tag will be stacked together - good not to spam user
      renotify: true, //even if you need the same tag, the phone will vibrate and notify. (if false - very passive notification)
      //- actions: [//might not be displayed
      //-   {action: 'confirm', title: 'Okay', icon: '/src/images/icons/app-icon-96x96.png'},
      //-   {action: 'cancel', title: 'Cancel', icon: '/src/images/icons/app-icon-96x96.png'},
      //- ]
    };
    notificationStatus.innerText = "You are subscribed to notifications";
    enableNotificationsButton.style.display = "none";
    // disableNotificationsButton.style.display = "inline-block";
    navigator.serviceWorker.ready.then((swreg) => {
      swreg.showNotification("Successfully subscribed!", options);
    });
  }
}

function urlBase64ToUint8Array(base64String) {
  var padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  var base64 = (base64String + padding).replace(/\-/g, "+").replace(/_/g, "/");

  var rawData = window.atob(base64);
  var outputArray = new Uint8Array(rawData.length);

  for (var i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

function configurePushSub() {
  if (!("serviceWorker" in navigator)) {
    return;
  }
  var reg;
  navigator.serviceWorker
    .register("/service-worker.js")
    .then(function () {
      return navigator.serviceWorker.ready;
    })
    .then((swreg) => {
      reg = swreg;
      return swreg.pushManager.getSubscription(); //check subscription of this browser and this device
    })
    .then((sub) => {
      if (sub === null) {
        var vapidPublicKey =
          "BJ-KXZLw9zvIdVFMGpmiasjO4q9KVZIhAHHresr5AJv32rnnGicDdk13YizCJDR51TTNTfah29McZQB-FOHtQhA";
        var convertedVapidPublicKey = urlBase64ToUint8Array(vapidPublicKey);
        // Create new subscription
        return reg.pushManager.subscribe({
          userVisibleOnly: true, //push notifications are only visible to the user
          applicationServerKey: convertedVapidPublicKey,
        });
      } else {
        // Already have a subscription
        notificationStatus.innerText = "You are subscribed to notifications";
        enableNotificationsButton.style.display = "none";
        // throw new Error("You already have subscription");
        return sub;
      }
    })
    .then((newSub) => {
      if (typeof newSub !== "undefined") {
        //pass subscription to the database through a post request
        return fetch("/registernotification", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(newSub),
          credentials: "include",
        });
      }
    })
    .then((res) => {
      console.log("Results from server are received", res);
      if (res && res.ok) {
        displayConfirmNotification();
        window.location = "/studies";
      }
    })
    .catch((err) => {
      console.error(err);
    });
}

function askForNotificationPermission() {
  Notification.requestPermission().then((result) => {
    if (result === "denied") {
      alert(
        "You disabled notifications. To allow notifications, change the settingd of your browser."
      );
      console.log("Permission wasn't granted. Allow a retry.");
      return;
    }
    if (result === "default") {
      console.log("The permission request was dismissed.");
      return;
    }
    configurePushSub();
  });
}

// function sendNotification(){
//   console.log('Sending test notification');
//   fetch('/sendnotification', {
//     method:'POST',
//     headers: {
//       'Content-Type':'application/json',
//       'Accept':'application/json',
//     },
//     body: JSON.stringify({title: 'New post', message: 'New message'})
//   })
// }

function unsubscribeNotifications() {
  if (!("serviceWorker" in navigator)) {
    return;
  }
  var reg;
  navigator.serviceWorker
    .register("/service-worker.js")
    .then(function () {
      return navigator.serviceWorker.ready;
    })
    .then((swreg) => {
      reg = swreg;
      return swreg.pushManager.getSubscription(); //check subscription of this browser and this device
    })
    .then(function (subscription) {
      if (subscription) {
        return subscription.unsubscribe();
      }
    })
    .then(function (sub) {
      if (sub) {
        return fetch("/unregisternotification", {
          method: "POST",
          credentials: "include",
        });
      }
    })
    .then((res) => {
      console.log("Results from server are received", res);
      alert("You are unsubscribed");
      enableNotificationsButton.style.display = "inline-block";
      disableNotificationsButton.style.display = "none";
      // notificationStatus.innerText = "";
    })
    .catch((err) => {
      console.error(err);
    });
}

function checkNotificationSubscription() {
  notificationStatus.innerText = "";
  if (!("serviceWorker" in navigator)) {
    notificationStatus.innerText =
      "Sorry, your device or browser does not support notifications.";
    return;
  }
  var reg;

  navigator.serviceWorker
    .register("/service-worker.js")
    .then(function () {
      console.log("Trying register");
      return navigator.serviceWorker.ready;
    })
    .then(function (swreg) {
      if (navigator.serviceWorker.controller) {
        console.log("ready", swreg);
        reg = swreg;
        return swreg.pushManager.getSubscription(); //check subscription of this browser and this device
      } else {
        var listener = navigator.serviceWorker.addEventListener(
          "controllerchange",
          () => {
            navigator.serviceWorker.removeEventListener(
              "controllerchange",
              listener
            );
            console.log("now ready - do something", swreg);
            reg = swreg;
            return swreg.pushManager.getSubscription();
          }
        );
      }
    })
    .then((sub) => {
      if (sub === null) {
        // notificationStatus.innerText = "You can allow notifications";
        if (subscribeButton) subscribeButton.style.display = "none";
        if (enableNotificationsButton)
          enableNotificationsButton.style.display = "inline-block";
      } else {
        console.log("You have already subscription on this device", sub);
        // subscribeButton.style.display = "inline-block";
        if (enableNotificationsButton)
          enableNotificationsButton.style.display = "inline-block";
        // notificationStatus.innerText = "You have allowed notifications";
        // disableNotificationsButton.style.display = "inline-block";
      }
    })
    .catch((err) => {
      console.error(err);
    });
}

function subscribeForStudy() {
  console.log("Subscribing for study");
  fetch("/subscribeforstudy", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })
    .then((res) => {
      if (res.url && res.ok) {
        console.log("Success");
        window.location = "/studies";
      }
      subscription_status.innerText = "You are subscribed";
      // subscribeButton.disabled = true;
      // subscribeButton.style.display = "none";
      // unsubscribeButton.disabled = false;
      // unsubscribeButton.style.display = "inline-block";
    })
    .catch((err) => {
      console.log(err);
      // subscribeButton.disabled = false;
      // subscribeButton.style.display = "inline-block";
      // unsubscribeButton.disabled = true;
      // unsubscribeButton.style.display = "none";
    });
}

function unsubscribeFromStudy() {
  console.log("Unsubscribing from study");
  fetch("/unsubscribefromstudy", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })
    .then((res) => {
      if (res.url && res.ok) {
        console.log("Success");
        window.location = "/studies";
      }
      subscription_status.innerText = "You are unsubscribed";
      // subscribeButton.disabled = false;
      // subscribeButton.style.display = "inline-block";
      // unsubscribeButton.disabled = true;
      // unsubscribeButton.style.display = "none";
    })
    .catch((err) => {
      console.log(err);
      // subscribeButton.disabled = true;
      // subscribeButton.style.display = "none";
      // unsubscribeButton.disabled = false;
      // unsubscribeButton.style.display = "inline-block";
    });
}

window.addEventListener("load", function () {
  if ("Notification" in window && "serviceWorker" in navigator) {
    if (enableNotificationsButton)
      enableNotificationsButton.addEventListener(
        "click",
        askForNotificationPermission
      );
    // disableNotificationsButton.addEventListener('click', unsubscribeNotifications);
    if (subscribeButton)
      subscribeButton.addEventListener("click", subscribeForStudy);
    if (unsubscribeButton)
      unsubscribeButton.addEventListener("click", unsubscribeFromStudy);
    checkNotificationSubscription();
  }
});
