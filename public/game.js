let timeTaken;

// Function to start a two-minute countdown timer
function startTimer() {
    let timeRemaining = 2 * 60; // 2 minutes in seconds

    const timerInterval = setInterval(() => {
        const minutes = Math.floor(timeRemaining / 60); // Get remaining minutes
        const seconds = timeRemaining % 60; // Get remaining seconds

        // Pad seconds with a leading zero if needed (e.g., 01, 02, ...)
        const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;


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



/*
x - latitude
y - longitude
*/
function distance(x,y) {
    return Math.sqrt(Math.pow(x,2) + Math.pow(y, 2));
}

/*
R - the leeway with distance
C1 - weight of distance
D - distance
T - the leeway with time
c2 - weight of time
t - time taken
*/
function calculateScore(R, c1, D, T, c2, t) {
    var score = 1000 + ( R - (c1 * D)) + (T - (c2 * t));
}