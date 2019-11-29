//register service worker
if ('serviceWorker' in navigator && 'PushManager' in window) {
  // console.log('window', window);
  // if (window.matchMedia('(display-mode: standalone)').matches) {
  //   console.log("This is running as standalone.");
  // }
  navigator.serviceWorker
    .register('/service-worker.js')
    .then(function(registration){
      console.log("SW registered in the scope", registration.scope)
    })
    .catch(function(error){
      console.error(error);
    })
} else {
  console.log("SW is not supported");
  if(document.querySelector('#notSupportedInfo')){
    document.querySelector('#notSupportedInfo').style.display = 'block';
  };
};


window.onbeforeinstallprompt = function(beforeInstallPromptEvent) {
  beforeInstallPromptEvent.preventDefault();
  const installButton = document.querySelector('#installApp');
  if(installButton){
    const installationStatus = document.querySelector('#installation_status');
    installButton.style.display = "block";
    installButton.addEventListener("click", function(mouseEvent) {
      // installButton.disabled = true;
      beforeInstallPromptEvent.prompt();
      beforeInstallPromptEvent.userChoice.then(function(choiceResult){
        if(choiceResult.outcome === 'dismissed') {
          console.log('User cancelled installation');
          installButton.disabled = true;
          if(installationStatus) installationStatus.innerText = "You have cancelled the installation of Samply.";
        } else {
          console.log('User added to home screen');
          installButton.style.display = "none";
          if(installationStatus) installationStatus.innerText = "You have installed Samply.";
        }
      });
    });
  }
};


// //when to show invitation
// window.addEventListener("beforeinstallprompt", function(beforeInstallPromptEvent) {
//   beforeInstallPromptEvent.preventDefault(); // Prevents immediate prompt display
//   // Shows prompt after a user clicks an "install" button
//   const installButton = document.querySelector('#installApp');
//   installButton.style.visibility = "visible";
//   installButton.addEventListener("click", function(mouseEvent) {
//     // you should not use the MouseEvent here, obviously
//     beforeInstallPromptEvent.prompt();
//     beforeInstallPromptEvent.userChoice.then(function(choiceResult){
//       console.log(choiceResult.outcome);
//       if(choiceResult.outcome === 'dismissed') {
//         console.log('User cancelled installation');
//         installButton.style.visibility = "hidden";
//       } else {
//         console.log('User added to home screen');
//         installButton.style.visibility = "hidden";
//       }
//     });
//     //beforeInstallPromptEvent = null;
//   });
//   installButton.hidden = false; // Make button operable
// });

// window.addEventListener('beforeinstallprompt', function(event){
//   console.log("beforeinstallprompt fired");
//   //event.preventDefault();
//   //diferredPrompt = event;
//   //showNotification();
//   //event.prompt();
//   //return false;
// });

//activate notification
function showNotification(){
  if (typeof(diferredPrompt) !== 'undefined' && diferredPrompt) {
    console.log('diferredPrompt', diferredPrompt);
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then(function(choiceResult){
      console.log(choiceResult.outcome);
      if(choiceResult.outcome === 'dismissed') {
        console.log('User cancelled installation');
      } else {
        console.log('User added to home screen');
      }
    });
    deferredPrompt = null;
  }
}
