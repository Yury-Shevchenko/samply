//register service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/service-worker.js', {scope: '/'})
    .then(function(){
      console.log("SW registered")
    })
    .catch(function(error){
      console.log(error);
    })
}

var diferredPrompt;

//when to show invitation
window.addEventListener('beforeinstallprompt', function(event){
  console.log("beforeinstallprompt fired");
  event.preventDefault();
  diferredPrompt = event;
  showNotification();
  return false;
});

//activate notification
function showNotification(){
  if (typeof(diferredPrompt) !== 'undefined' && false) {
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
