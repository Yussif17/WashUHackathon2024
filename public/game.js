let timeTaken;

// Function to start a two-minute countdown timer
function startTimer() {
    let timeRemaining = 60; // 1 minutes in seconds

    const timerInterval = setInterval(() => {
        const minutes = Math.floor(timeRemaining / 60); // Get remaining minutes
        const seconds = timeRemaining % 60; // Get remaining seconds

        // Pad seconds with a leading zero if needed (e.g., 01, 02, ...)
        const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;

        //format to (min:sec) and display (for every second)

        // Update the display element with the remaining time
        //displayElement.textContent = `${minutes}:${formattedSeconds}`;

        // Decrease timeRemaining each second
        timeRemaining--;

        // Stop the timer when it reaches zero
        if (timeRemaining < 0) {
            clearInterval(timerInterval); // Stop the timer
            //alert('Time’s up!'); 
        }
    }, 1000); // Update every 1 second (1000ms)
}


function haversine_distance(realLat, realLng, mk2) { //RealMarker(split into its own lat and lng) , InputMarker
    var R = 3958.8; // Radius of the Earth in miles
    var rlat1 =realLat * (Math.PI/180); // Convert degrees to radians
    var rlat2 = mk2.position.lat() * (Math.PI/180); // Convert degrees to radians
    var difflat = rlat2-rlat1; // Radian difference (latitudes)
    var difflon = (mk2.position.lng()-realLng) * (Math.PI/180); // Radian difference (longitudes)

    var d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat/2)*Math.sin(difflat/2)+Math.cos(rlat1)*Math.cos(rlat2)*Math.sin(difflon/2)*Math.sin(difflon/2))); // in miles
    console.log(d);//for debugging
    return d;
  }

  function calculateScore(D, t, D_max = 10000, t_max = 300) {
    // Ensure distance and time are within valid ranges
    D = Math.min(D, D_max);
    t = Math.min(t, t_max);
  
    // Calculate the distance and time factors
    const distanceFactor = 1 - D / D_max;
    const timeFactor = 1 - t / t_max;
  
    // Calculate the final score, capped between 0 and 1000
    const score = Math.max(0, Math.round(1000 * distanceFactor * timeFactor));
  
    return score;
  }
  
  // Example: Calculate score for a guess 2000 meters away, submitted in 100 seconds
  const D = 2000; // Distance in meters
  const t = 100;  // Time in seconds
  console.log(calculateScore(D, t)); // Output: 800 (example score)
  