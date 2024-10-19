import { API_KEY } from "./config.js";
import { loadMap, switchImage } from "./mapfunctions.js";
document.addEventListener("DOMContentLoaded", event => {

  const app = firebase.app();
  const db = firebase.firestore();
  const locations = db.collection('locations').doc('0');
  console.log(locations);

  
});


  
document.querySelector('.js-load-map').addEventListener('click', () => {
    loadMap();
});

document.querySelector('.js-switch-img').addEventListener('click', () => {
  switchImage();
})


