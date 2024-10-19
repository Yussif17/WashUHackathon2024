import { API_KEY } from "./config.js";
import { locations } from "./locations.js"; 
function loadMap() {
    const location = ;
    const latitude = document.getElementById('latitude').value || '38.6463999'; 
    const longitude = document.getElementById('longitude').value || '-90.3109969'; 

  //  const mapUrl = `
  //  https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=15&size=600x400&key=${API_KEY}
  //  `;
    const mapUrl=`https://maps.googleapis.com/maps/api/streetview?location=${latitude},${longitude}&size=1920x1080&key=${API_KEY}`;
   
    document.getElementById('map').src = mapUrl;
}
document.querySelector('.js-load-map').addEventListener('click', () => {
  loadMap();
})

