import { API_KEY } from "./config.js";



let latitude = document.getElementById('latitude').value || '38.6463999'; 
let longitude = document.getElementById('longitude').value || '-90.3109969'; 
let a = document.getElementById('a').value || '3'; 
let y = document.getElementById('y').value || '75';
let h = document.getElementById('h').value || '300.85'; 
let t = document.getElementById('t').value || '86.49';  

export function loadMap() {
   latitude = document.getElementById('latitude').value || '38.6463999'; 
   longitude = document.getElementById('longitude').value || '-90.3109969'; 
    a = document.getElementById('a').value || '3'; 
    y = document.getElementById('y').value || '75';
   h = document.getElementById('h').value || '300.85'; 
   t = document.getElementById('t').value || '26.49'; 

  //const mapUrl = `
  //https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=15&size=600x400&key=${API_KEY};

  const mapUrl = `https://maps.googleapis.com/maps/api/streetview?location=${latitude},${longitude}&size=600x400&heading=${h}&pitch=${t}&fov=${y}&key=${API_KEY}`;
   
  document.getElementById('realmap').src = mapUrl;
};

export function switchImage() {
  const button = document.querySelector('.js-switch-img');
  if (button.innerHTML === 'Show Map') {
    
    //document.getElementById('realmap').src = `https://maps.googleapis.com/maps/api/staticmap?location=${latitude},${longitude}&zoom=10&size=600x400&key=${API_KEY}`;
    document.getElementById('realmap').src = '';
    document.getElementById('realmap').innerHTML = '';
   
    button.innerHTML = 'Show Image';

//https://maps.googleapis.com/maps/api/streetview?location=<latitude>,<longitude>&size=<width>x<height>&heading=<heading>&pitch=<pitch>&fov=<fov>&key=<YOUR_API_KEY>


    // https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=maps&v=beta
    //https://maps.googleapis.com/maps/api/staticmap?location=${latitude},${longitude}&zoom=15&size=600x400&key=${API_KEY}
  }
  else {
    document.getElementById('realmap').src = `https://maps.googleapis.com/maps/api/streetview?location=${latitude},${longitude}&size=600x400&heading=${h}&pitch=${t}&fov=${y}&key=${API_KEY}`;
    
    button.innerHTML = 'Show Map';
  }
};


