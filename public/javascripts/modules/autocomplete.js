import { $ } from './bling'

function autocomplete(input, latinput, lnginput){
  //console.log(input, latinput, lnginput);
  if(!input) return;
  const dropdown = new google.maps.places.Autocomplete(input);
  dropdown.addListener('place_changed', () => {
    const place = dropdown.getPlace();
    //console.log(place);
    latinput.value = place.geometry.location.lat();
    lnginput.value = place.geometry.location.lng();
    // show the location on the map below
    displayLocation($('#single_map'), place, latinput, lnginput)
  });
  //do not submit the form on hitting the enter
  input.on('keydown', (e) => {
    if(e.keyCode === 13) e.preventDefault();
  })

}

function displayLocation(mapDiv, place, latinput, lnginput) {
  if(!mapDiv) return

  const lat = place.geometry.location.lat();
  const lng = place.geometry.location.lng();
  const position = { lat, lng };

  // get the centre and zoom (higher number -> bigger zoom)
  const mapOptions = {
    center: position,
    zoom: 15
  }

  // make a map
  const map = new google.maps.Map(mapDiv, mapOptions)

  //make a marker
  const marker = new google.maps.Marker({
    map: map,
    position: position,
    draggable: true,
  })
  function onDragEnd(e, message) {
    console.log('message', message);
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    console.log('Latitude ', lat);
    console.log('Longitude ', lng);
    latinput.value = lat;
    lnginput.value = lng;
  }
  marker.addListener('dragend', (e) => onDragEnd (e, 'test'));


  mapDiv.style.height = '600px';

}

export default autocomplete;
