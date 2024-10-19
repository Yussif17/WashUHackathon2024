import { API_KEY } from "./config.js";

document.addEventListener("DOMContentLoaded", (event) => {

  

  class dataValues {
    constructor() {
      this.longitude = '';
      this.latitude = '';
      this.a = '';
      this.y = '';
      this.h = '';
      this.t = '';
    }

    parse(url) {
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

  let data;
  const dataValue = new dataValues();
  const app = firebase.app();
  const db = firebase.firestore();
  pickRandomPlace().get().then(doc => {
    data = doc.data()
    dataValue.parse(data.data);
      
    console.log(data.data);
    console.log(dataValue.longitude);
    console.log(dataValue.latitude);
    console.log(dataValue.a);
    console.log(dataValue.y);
    console.log(dataValue.h);
    console.log(dataValue.t); 
    }); 

  document.querySelector('.js-load-map').addEventListener('click', () => {
        loadMap();
  });

  (g=>{var h,a,k,p="The Google Maps JavaScript API",c="google",l="importLibrary",q="__ib__",m=document,b=window;b=b[c]||(b[c]={});var d=b.maps||(b.maps={}),r=new Set,e=new URLSearchParams,u=()=>h||(h=new Promise(async(f,n)=>{await (a=m.createElement("script"));e.set("libraries",[...r]+"");for(k in g)e.set(k.replace(/[A-Z]/g,t=>"_"+t[0].toLowerCase()),g[k]);e.set("callback",c+".maps."+q);a.src=`https://maps.${c}apis.com/maps/api/js?`+e;d[q]=f;a.onerror=()=>h=n(Error(p+" could not load."));a.nonce=m.querySelector("script[nonce]")?.nonce||"";m.head.append(a)}));d[l]?console.warn(p+" only loads once. Ignoring:",g):d[l]=(f,...n)=>r.add(f)&&u().then(()=>d[l](f,...n))})({
    key: API_KEY,
    v: "weekly",
    // Use the 'v' parameter to indicate the version to use (weekly, beta, alpha, etc.).
    // Add other bootstrap parameters as needed, using camel case.
  });
  
  let map;
  
  async function initMap() {
    const { Map } = await google.maps.importLibrary("maps");
  
    map = new Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8,
    });
  } 
  
  initMap();
  

  function pickRandomPlace() {
      return db.collection('locations').doc('' + getRandomInt(25));
  }
              
  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

});

function loadMap() {
  const latitude = document.getElementById('latitude').value || '38.6463999'; 
  const longitude = document.getElementById('longitude').value || '-90.3109969'; 

  //const mapUrl = `
  //https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=15&size=600x400&key=${API_KEY};

  const mapUrl = `https://maps.googleapis.com/maps/api/streetview?location=${latitude},${longitude}&size=600x400&key=${API_KEY}`;
   
  document.getElementById('map').src = mapUrl;
}





