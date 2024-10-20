import { API_KEY } from "./config.js";


export function loadMap(lat, long, h, t) {

  const mapUrl = `https://maps.googleapis.com/maps/api/streetview?location=${lat},${long}&size=600x400&heading=${h}&pitch=${90 - t}&fov=100&key=${API_KEY}`;
   
  document.getElementById('realmap').src = mapUrl;
};

export function switchImage() {
  const button = document.querySelector('.js-switch-img');
  if (button.innerHTML === 'Show Map') {
    document.querySelector('.js-image').classList.add('invisible');
    document.querySelector('.js-map').classList.remove('invisible');
    button.innerHTML = 'Show Image';
  }
  else {
    document.querySelector('.js-map').classList.add('invisible');
    document.querySelector('.js-image').classList.remove('invisible');
    button.innerHTML = 'Show Map';
  }
};


