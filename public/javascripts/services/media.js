//CAMERA
const startVideoButton = document.querySelector('#start_video');
const stopVideoButton = document.querySelector('#stop_video');
const videoPlayer = document.querySelector('#player');
const canvasElement = document.querySelector('#canvas');
const captureButton = document.querySelector('#capture-btn');
const imagePicker = document.querySelector('#image-picker');
const imagePickerArea = document.querySelector('#pick-image');
let picture;

function startVideo() {
  initializeMedia();
}

function stopVideo() {
  videoPlayer.style.display = 'none';
  imagePickerArea.style.display = 'none';
  canvasElement.style.display = 'none';
  if (videoPlayer && videoPlayer.srcObject){
    videoPlayer.srcObject.getVideoTracks().forEach( track => {
      track.stop();
    });
  }
}

function initializeMedia() {
  //enable camera in a progressive way
  if(!('mediaDevices' in navigator)){
    //polyfill
    navigator.mediaDevices = {};
  }
  if(!('getUserMedia' in navigator.mediaDevices)){
    navigator.mediaDevices.getUserMedia = (constrains) => {
      const getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
      if(!getUserMedia) {
        return Promise.reject(new Error('getUserMedia is not implemented'));
      }
      return new Promise( function(resolve, reject) {
        getUserMedia.call(navigator, constrains, resolve, reject);
      })
    }
  }
  navigator.mediaDevices.getUserMedia({video: true})
    .then(function(stream){
      videoPlayer.srcObject = stream;
      videoPlayer.style.display = 'block';
    })
    .catch(error => {
      imagePickerArea.style.display = 'block';
    });
};

startVideoButton.addEventListener('click', startVideo);
stopVideoButton.addEventListener('click', stopVideo);

//canvas methods
captureButton.addEventListener('click', function(event) {
  canvasElement.style.display = 'block';
  videoPlayer.style.display = 'none';
  captureButton.style.display = 'none';
  const context = canvasElement.getContext('2d');
  context.drawImage(videoPlayer, 0, 0, canvas.width, videoPlayer.videoHeight / (videoPlayer.videoWidth / canvas.width));
  videoPlayer.srcObject.getVideoTracks().forEach( track => {
    track.stop();
  });
  picture = dataURItoBlob(canvasElement.toDataURL());
  sendImage();
});

function sendImage() {
  var postData = new FormData();
  var id = new Date().toISOString();
  postData.append('id', id);
  postData.append('title', 'A new post');
  postData.append('file', picture, id + '.png');
  postData.append('upload_preset', 'openlab');
  fetch('https://api.cloudinary.com/v1_1/dfshkvgf3/image/upload', {
    method:'POST',
    body: postData
  })
    .then(res => res.json())
    .then(body => {
      console.log("Uploaded to: ", body.secure_url)
    })
}

function dataURItoBlob(dataURI) {
  var byteString = atob(dataURI.split(',')[1]);
  var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
  var ab = new ArrayBuffer(byteString.length);
  var ia = new Uint8Array(ab);
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  var blob = new Blob([ab], {type: mimeString});
  return blob;
}

imagePicker.addEventListener('change', function(event){
  picture = event.target.files[0];
  sendImage();
});
