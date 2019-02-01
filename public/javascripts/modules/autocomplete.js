function autocomplete(input, latinput, lnginput){
  //console.log(input, latinput, lnginput);
  if(!input) return;
  const dropdown = new google.maps.places.Autocomplete(input);
  dropdown.addListener('place_changed', () => {
    const place = dropdown.getPlace();
    //console.log(place);
    latinput.value = place.geometry.location.lat();
    lnginput.value = place.geometry.location.lng();
  });
  //do not submit the form on hitting the enter
  input.on('keydown', (e) => {
    if(e.keyCode === 13) e.preventDefault();  
  })

}

export default autocomplete;
