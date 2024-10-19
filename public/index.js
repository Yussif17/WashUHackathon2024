import { API_KEY } from "./config.js";
import { loadMap, switchImage } from "./mapfunctions.js";


document.addEventListener("DOMContentLoaded", async event => {
  document.querySelector('.js-map').classList.add('invisible');

  class markerValues {
    constructor(lat, lng) {
      this.lat = lat;
      this.lng = lng;
    }
  }
  class dataValues {
    constructor() {
      this.longitude = '';
      this.latitude = '';
      this.a = '';
      this.y = '';
      this.h = '';
      this.t = '';
    }

    async parse(url) {
      let i = 0;
  
      while (url[i] != ',') {
        this.longitude += url[i];
        i++;
      }
      i++;
      while (url[i] != ',') {
        this.latitude += url[i];
        i++
      }
      i++;
      while (url[i] != 'a') {
        this.a += url[i];
        i++
      }
      i += 2;
      while (url[i] != 'y') {
        this.y += url[i];
        i++;
      }
      i += 2;
      while (url[i] != 'h') {
        this.h += url[i];
        i++;
      }
      i += 2;
      while (url[i] != 't') {
        this.t += url[i];
        i++;
      }
    }
  }

  function pickRandomPlace() {
    return db.collection('locations').doc('' + getRandomInt(102));
  }
            
  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  
  const dataValue = new dataValues();
  const app = firebase.app();
  const db = firebase.firestore();
  const doc = await pickRandomPlace().get();
  const data = doc.data();
   
  dataValue.parse(data.data);
  document.querySelector('.js-load-map').addEventListener('click', () => {
    loadMap(dataValue.longitude, dataValue.latitude, dataValue.h, dataValue.t, dataValue.y);
    console.log(dataValue);
  });

  console.log(dataValue.longitude);
  

  (g=>{var h,a,k,p="The Google Maps JavaScript API",c="google",l="importLibrary",q="__ib__",m=document,b=window;b=b[c]||(b[c]={});var d=b.maps||(b.maps={}),r=new Set,e=new URLSearchParams,u=()=>h||(h=new Promise(async(f,n)=>{await (a=m.createElement("script"));e.set("libraries",[...r]+"");for(k in g)e.set(k.replace(/[A-Z]/g,t=>"_"+t[0].toLowerCase()),g[k]);e.set("callback",c+".maps."+q);a.src=`https://maps.${c}apis.com/maps/api/js?`+e;d[q]=f;a.onerror=()=>h=n(Error(p+" could not load."));a.nonce=m.querySelector("script[nonce]")?.nonce||"";m.head.append(a)}));d[l]?console.warn(p+" only loads once. Ignoring:",g):d[l]=(f,...n)=>r.add(f)&&u().then(()=>d[l](f,...n))})({
    key: API_KEY,
    v: "weekly",
    // Use the 'v' parameter to indicate the version to use (weekly, beta, alpha, etc.).
    // Add other bootstrap parameters as needed, using camel case.
  });


  let map;
  let mark;
  let array = [];
  let temp;

  async function initMap() {
    const { Map } = await google.maps.importLibrary("maps");
    map = new Map(document.getElementById("map"), {
      center: { lat: 38.6469166, lng: -90.3129897 }, 
      zoom: 16,
      streetViewControl: false,
      mapTypeControl: false,
    });

    const marker = await map.addListener("click", (event) => {
      if (mark) {
        mark.setMap(null);
      }
      mark = addMarker(event.latLng);
      temp = new markerValues(event.latLng.lat(), event.latLng.lng()); 
    }); 
  
    function addMarker(location) {
      return new google.maps.Marker({
        position: location,
        map: map
      });
    }
  }
  

 initMap();




  
(g=>{var h,a,k,p="The Google Maps JavaScript API",c="google",l="importLibrary",q="__ib__",m=document,b=window;b=b[c]||(b[c]={});var d=b.maps||(b.maps={}),r=new Set,e=new URLSearchParams,u=()=>h||(h=new Promise(async(f,n)=>{await (a=m.createElement("script"));e.set("libraries",[...r]+"");for(k in g)e.set(k.replace(/[A-Z]/g,t=>"_"+t[0].toLowerCase()),g[k]);e.set("callback",c+".maps."+q);a.src=`https://maps.${c}apis.com/maps/api/js?`+e;d[q]=f;a.onerror=()=>h=n(Error(p+" could not load."));a.nonce=m.querySelector("script[nonce]")?.nonce||"";m.head.append(a)}));d[l]?console.warn(p+" only loads once. Ignoring:",g):d[l]=(f,...n)=>r.add(f)&&u().then(()=>d[l](f,...n))})
  ({key: `${API_KEY}`, v: "weekly"});
});

document.querySelector('.js-load-map').addEventListener('click', () => {
    loadMap();
});

document.querySelector('.js-switch-img').addEventListener('click', () => {
  switchImage();
})





