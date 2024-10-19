import { API_KEY } from "./config.js";



let latitude = '38.6463999'; 
let longitude =  '-90.3109969'; 
let a =  '3'; 
let y =  '75';
let h =  '300.85'; 
let t =  '86.49';  

export function loadMap() {
   

 // const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=15&size=600x400&key=${API_KEY}`;

  const mapUrl = `https://maps.googleapis.com/maps/api/streetview?location=${latitude},${longitude}&size=600x400&heading=${h}&pitch=${t}&fov=${y}&key=${API_KEY}`;
   
  document.getElementById('realmap').src = mapUrl;
};

export function switchImage() {
  const button = document.querySelector('.js-switch-img');
  if (button.innerHTML === 'Show Map') {
    
   
    document.querySelector('.js-image').classList.add('invisible');
    document.querySelector('.js-map').classList.remove('invisible');
   
    button.innerHTML = 'Show Image';

//https://maps.googleapis.com/maps/api/streetview?location=<latitude>,<longitude>&size=<width>x<height>&heading=<heading>&pitch=<pitch>&fov=<fov>&key=<YOUR_API_KEY>


    // https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=maps&v=beta
    //https://maps.googleapis.com/maps/api/staticmap?location=${latitude},${longitude}&zoom=15&size=600x400&key=${API_KEY}
  }
  else {
    //document.getElementById('realmap').src = `https://maps.googleapis.com/maps/api/streetview?location=${latitude},${longitude}&size=600x400&heading=${h}&pitch=${t}&fov=${y}&key=${API_KEY}`;
    document.querySelector('.js-map').classList.add('invisible');
    document.querySelector('.js-image').classList.remove('invisible');
    button.innerHTML = 'Show Map';
  }
};


