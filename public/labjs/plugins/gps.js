const updateLocation = (e) => {
  if (study && study.options && study.options.datastore){
    study.options.datastore.set(e.detail.location);
    // console.log("Updated the location", e.detail.location)
  }
}

class gps {
  constructor(options) {
    // console.log(options);
    this.title = options.title;
  }

  handle(context, event) {
    // console.log(`Component ${ this.title } received ${ event }`)

    if(event == 'plugin:init'){
      if(!('geolocation' in navigator)){
        console.log("geolocation is absent")
        return;
      }
      window.addEventListener('changelocation', updateLocation);
      window.watchId = navigator.geolocation.watchPosition(function(position){
        let location = {location: {lat: position.coords.latitude, lng: position.coords.longitude}};
        let event = new CustomEvent('changelocation', {detail: location});
        window.dispatchEvent(event);
      }, function(error){
        console.error(error);
      }, {
        timeout: 7000 //in milliseconds
      })
    }

    if (event == "end"){
      window.removeEventListener('changelocation', updateLocation)
      // console.log("Watch id", window.watchId);
      navigator.geolocation.clearWatch(watchId);
    }

  }
}

window.gps = gps
