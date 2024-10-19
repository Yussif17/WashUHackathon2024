import { API_KEY } from "./config.js";

let latitude = '38.6463999'; 
let longitude =  '-90.3109969'; 
let a =  '3'; 
let y =  '75';
let h =  '300.85'; 
let t =  '86.49';  

export function loadMap(long, lat, h, t) {

  const mapUrl = `https://maps.googleapis.com/maps/api/streetview?location=${long},${lat}&size=600x400&heading=${h}&pitch=${90 - t}&fov=120&key=${API_KEY}`;
   
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


