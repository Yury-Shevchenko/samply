const deleteAllNotificationsBtn = document.querySelector('#delete_all_notifications') || 'not_defined';
const messageContent = document.querySelector('#messageContent');
const titleContent = document.querySelector('#titleContent');
const urlContent = document.querySelector('#urlContent');


function deleteAllNotifications(){
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
};

function removeScheduleDateTimePicker(){
  const id = this.id;
  var container = document.getElementById("dateTimePicker");
  const containerPicker = document.getElementById(`container-picker${id}`);
  const inputToClean = document.getElementById(`dateresult${id}`);
  inputToClean.value = "";
  container.removeChild(containerPicker);
};

if(deleteAllNotificationsBtn !== 'not_defined'){
  deleteAllNotificationsBtn.addEventListener('click', deleteAllNotifications);
};
