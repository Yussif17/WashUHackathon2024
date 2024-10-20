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
      this.latitude = '';
      this.longitude = '';
      this.a = '';
      this.y = '';
      this.h = '';
      this.t = '';
    }

    async parse(url) {
      let i = 0;
  
      while (url[i] != ',') {
        this.latitude += url[i];
        i++;
      }
      i++;
      while (url[i] != ',') {
        this.longitude += url[i];
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

  const dataValue = new dataValues();
  const app = firebase.app();
  const db = firebase.firestore();
  const doc = await pickRandomPlace().get();
  const data = doc.data();


  let map;
  let mark;
  let lastKnownMarkerVals;

  function pickRandomPlace() {
    return db.collection('locations').doc('' + getRandomInt(102));
  }
            
  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  function addMarker(location) {
    document.querySelector('.js-submit').classList.remove('invisible');
      return new google.maps.Marker({
        position: location,
        map: map
      });
  }
   
  dataValue.parse(data.data); //dataValue object holds picture location data
   
  const urlParams = new URLSearchParams(window.location.search);

  const difficulty = urlParams.get('difficulty');
  document.querySelector('.p-timer').classList.remove('invisible');
    startTimer(difficulty);
    loadMap(dataValue.latitude, dataValue.longitude, dataValue.h, dataValue.t, dataValue.y);


  

  (g=>{var h,a,k,p="The Google Maps JavaScript API",c="google",l="importLibrary",q="__ib__",m=document,b=window;b=b[c]||(b[c]={});var d=b.maps||(b.maps={}),r=new Set,e=new URLSearchParams,u=()=>h||(h=new Promise(async(f,n)=>{await (a=m.createElement("script"));e.set("libraries",[...r]+"");for(k in g)e.set(k.replace(/[A-Z]/g,t=>"_"+t[0].toLowerCase()),g[k]);e.set("callback",c+".maps."+q);a.src=`https://maps.${c}apis.com/maps/api/js?`+e;d[q]=f;a.onerror=()=>h=n(Error(p+" could not load."));a.nonce=m.querySelector("script[nonce]")?.nonce||"";m.head.append(a)}));d[l]?console.warn(p+" only loads once. Ignoring:",g):d[l]=(f,...n)=>r.add(f)&&u().then(()=>d[l](f,...n))})({
    key: API_KEY,
    v: "weekly",
    // Use the 'v' parameter to indicate the version to use (weekly, beta, alpha, etc.).
    // Add other bootstrap parameters as needed, using camel case.
  });


  

  async function initMap() {
    const { Map } = await google.maps.importLibrary("maps"); //promise
    map = new Map(document.getElementById("map"), {
      center: { lat: 38.6479166, lng: -90.3099897 }, 
      zoom: 15.2,
      streetViewControl: false,
      mapTypeControl: false,
      clickableIcons: false,
      fullscreenControl: false
    });

    const marker = await map.addListener("click", (event) => {
      if (mark) {
        mark.setMap(null);
      }
      mark = addMarker(event.latLng);
      lastKnownMarkerVals = new markerValues(event.latLng.lat(), event.latLng.lng()); 
      //console.log(lastKnownMarkerVals); for debug (works properly)
    }); 
  }
  

 initMap(); //async function


  document.querySelector('.js-submit').addEventListener('click',  async () => {
    submitButtonClicked();
  });

let timerIntervalDone;
  let timeUsed;
// Function to start a two-minute countdown timer
 function startTimer(difficulty) {
  let timeRemaining;
  let timerInterval;
      if (difficulty==='easy') {
        timeRemaining = 61;
       }
       else if (difficulty==='medium') {
        timeRemaining = 31;
       }
       else if (difficulty==='hard') {
        timeRemaining = 11;
       }
 

     timerInterval = setInterval(() => {
        timeRemaining--;
        timeUsed = timeRemaining;
        timerIntervalDone = timerInterval;
        document.querySelector('.p-timer').innerHTML = `${timeRemaining}`;
        // Stop the timer when it reaches zero
        if (timeRemaining <= 0) {
            clearInterval(timerInterval); // Stop the timer
            submitButtonClicked();
        }
    }, 1000); // Update every 1 second 
}


function haversine_distance(realLat, realLng, mk2) { //RealMarker(split into its own lat and lng) , InputMarker
    var R = 3958.8; // Radius of the Earth in miles
    var rlat1 =realLat * (Math.PI/180); // Convert degrees to radians
    var rlat2 = mk2.lat * (Math.PI/180); // Convert degrees to radians
    var difflat = rlat2-rlat1; // Radian difference (latitudes)
    var difflon = (mk2.lng-realLng) * (Math.PI/180); // Radian difference (longitudes)

    var d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat/2)*Math.sin(difflat/2)+Math.cos(rlat1)*Math.cos(rlat2)*Math.sin(difflon/2)*Math.sin(difflon/2))); // in miles
    console.log(d);//for debugging
    return d;
  }

  function calculateScore(D, t, D_max = 1, t_max =60, alpha = 0.65, beta = 0.35) {
    // Ensure distance and time are within valid ranges
    D = Math.min(D, D_max);
    t = Math.min(t, t_max);
  
    // Calculate the distance and time factors
    const distanceFactor = 1 - D / D_max;
    const timeFactor = 1 - (60 - t) / t_max;
    const weightedScore = alpha * distanceFactor + beta * timeFactor;
  
    // Calculate the final score, capped between 0 and 1000
    const score = Math.max(0, Math.round(1000 * weightedScore));
  
    return score;
  }
  
  
  

   async function submitButtonClicked() {
    document.querySelector('.js-submit').classList.add('invisible');
    document.querySelector('.js-switch-img').classList.add('invisible');
    document.querySelector('.replay-button').classList.remove('invisible');
    document.querySelector('.popup-overlay').classList.remove('invisible');
      document.getElementById('difficulty-popup').style.display = 'block';

    clearInterval(timerIntervalDone);
    try{
    const linePlan = [
      { lat: Number(dataValue.latitude), lng: Number(dataValue.longitude) }, 
      { lat: lastKnownMarkerVals.lat, lng: lastKnownMarkerVals.lng }, 
    ]

    const image = {
      url: './img/file.png',
      size: new google.maps.Size(25, 29),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(13, 13)
    } 

    const originalPoint = new google.maps.Marker({
      position: { lat: Number(dataValue.latitude), lng: Number(dataValue.longitude) },
      map: map,
      icon: image
    })

    const line = await new google.maps.Polyline({
      path: linePlan,
      geodesic: false,
      strokeColor: '#000000',
      strokeOpacity: 1.0,
      strokeWeight: 2
    });

  
    line.setMap(map);
    

    async function animateZoom(duration) {
      map.setCenter({
        lat: (Number(dataValue.latitude) + lastKnownMarkerVals.lat) / 2,
        lng: (Number(dataValue.longitude) + lastKnownMarkerVals.lng) / 2
      });
      const startZoom = map.getZoom();
      const steps = 50;
      const stepDuration = duration / steps;
      let currentStep = 0;
  
      async function step() {
        currentStep++;
        if (currentStep <= steps) {
          const zoomDiff = duration - startZoom;
          const newZoom = startZoom + (zoomDiff * currentStep / steps);
          map.setZoom(newZoom);
          setTimeout(step, stepDuration);
        }
      }
  
      await step();
    }
    animateZoom(65);

    google.maps.event.clearListeners(map);

    let d = haversine_distance(Number(dataValue.latitude), Number(dataValue.longitude), lastKnownMarkerVals);

   const test = calculateScore(d,timeUsed);
   document.querySelector('.popup-score').innerHTML = `${test}/1000`;
  }
  catch {
    const test = calculateScore(1, 0);
    document.querySelector('.popup-score').innerHTML = `${test}/1000`;
  }
  };



});



document.querySelector('.js-switch-img').addEventListener('click', () => {
  switchImage();
});

document.querySelector('.replay-button').addEventListener('click', () => {
  location.reload();
});

document.querySelector('.back-button').addEventListener('click', () => {
  document.getElementById('difficulty-popup').style.display = 'none';
  document.querySelector('.continue-button').classList.remove('invisible');
});

document.querySelector('.continue-button').addEventListener('click', () => {
  document.getElementById('difficulty-popup').style.display = 'block';
  location.reload();
});


