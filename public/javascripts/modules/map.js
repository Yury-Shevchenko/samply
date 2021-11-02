import axios from 'axios'
import { $ } from './bling'

const mapOptions = {
  center: {
    lat: 47.689,
    lng: 9.18
  },
  zoom: 2 // usa and europe
}

// navigator.geolocation.getCurrentPosition
// day 21 of js30

function loadPlaces(map, lat = 47.689, lng = 9.18) {
  axios.get(`api/studies/near?lat=${lat}&lng=${lng}`)
    .then(res => {
      const places = res.data
      if(!places.length){
        // alert('no places found!')
        return
      }

      // create a bounds
      const bounds = new google.maps.LatLngBounds()
      const infoWindow = new google.maps.InfoWindow()

      const markers = places.map(place => {
        const [placeLng, placeLat] = place.location.coordinates
        const position = { lat: placeLat, lng: placeLng }
        bounds.extend(position)
        const marker = new google.maps.Marker({
          map: map,
          position: position
        })
        marker.place = place
        return marker
      })

      // event listener
      markers.forEach(marker => marker.addListener('click', function(){
        const html = `
          <div class="popup">
            <a href="/study/${this.place.slug}">
              <img src="/uploads/${this.place.photo || 'wall.jpg'}" alt="${this.place.title}" />
              <p><strong>${this.place.title}</strong></p>
              <p>${this.place.location.address}</p>
            </a>
          </div>
        `
        infoWindow.setContent(html)
        infoWindow.open(map, this)
      }))

      map.setCenter(bounds.getCenter())
      map.fitBounds(bounds)

    })
    .catch(err => {
      console.error(err);
    })
}

// function getCurrentUserPosition() {
//
//   var options = {
//     enableHighAccuracy: true,
//     timeout: 5000,
//     maximumAge: 0
//   };
//
//   function success(pos) {
//     var crd = pos.coords;
//
//     console.log('Your current position is:');
//     console.log(`Latitude : ${crd.latitude}`);
//     console.log(`Longitude: ${crd.longitude}`);
//     console.log(`More or less ${crd.accuracy} meters.`);
//
//   }
//
//   function error(err) {
//     console.warn(`ERROR(${err.code}): ${err.message}`);
//   }
//
//   navigator.geolocation.getCurrentPosition(success, error, options);
//
// }

function makeMap(mapDiv) {
  if(!mapDiv) return
  // make a map
  // const currentUserPosition = getCurrentUserPosition()
  // console.log('currentUserPosition', currentUserPosition);

  const map = new google.maps.Map(mapDiv, mapOptions)
  loadPlaces(map)

  const input = $('[name="geolocate"]')
  const autocomplete = new google.maps.places.Autocomplete(input)
  autocomplete.addListener('place_changed', () => {
    const place = autocomplete.getPlace()
    loadPlaces(map, place.geometry.location.lat(), place.geometry.location.lng())
  })
}

export default makeMap
