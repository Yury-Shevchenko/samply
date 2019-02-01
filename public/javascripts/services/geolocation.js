//LOCATION
const locationButton = document.querySelector('#location-btn');
const locationLoader = document.querySelector('#location-loader');
const locationInput = document.querySelector('#location-input');
let fetchedLocation;

function initializeLocation(){
  if(!('geolocation' in navigator)){
    locationButton.style.display = 'none';
  }
};

locationButton.addEventListener('click', function(event){
  if(!('geolocation' in navigator)){
    return;
  }
  locationButton.style.display = 'none';
  locationLoader.style.display = 'block';
  navigator.geolocation.getCurrentPosition(function(position){
    locationButton.style.display = 'block';
    locationLoader.style.display = 'none';
    fetchedLocation = {lat: position.coords.latitude, lng: position.coords.longitude};
    console.log('Position', fetchedLocation);
    locationInput.innerText = fetchedLocation;
    //- locationInput.classList.add('is-focused');

  }, function(error){
    console.error(error);
    locationButton.style.display = 'block';
    locationLoader.style.display = 'none';
    alert('Could not fetch location, please enter manually.');
    fetchedLocation = {lat: null, lng: null};;
  }, {
    timeout: 7000 //in milliseconds
  })
});

initializeLocation();
