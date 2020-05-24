const deleteAllNotificationsBtn = document.querySelector('#delete_all_notifications') || 'not_defined';

function deleteAllNotifications(){
  const deleteAll = confirm("Are you sure you want to delete all notifications? The action is not reversible.");
  if (deleteAll === true) {
    deleteAllNotificationsBtn.disabled = true;
    fetch('/deleteprojectnotifications', {
      method:'POST',
      headers: {
        'Content-Type':'application/json',
        'Accept':'application/json',
      },
      body: JSON.stringify({
        name: 'notification',
      })
    })
      .then(res => {
        if(res.url && res.ok){
          window.location = res.url;
        }
        deleteAllNotificationsBtn.disabled = false;
      })
      .catch(err => {
        console.log(err);
        deleteAllNotificationsBtn.disabled = false;
      })
  } else {
    // console.log('Cancelled');
  };
};

if(deleteAllNotificationsBtn !== 'not_defined'){
  deleteAllNotificationsBtn.addEventListener('click', deleteAllNotifications);
};
