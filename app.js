'use strict';

// DOM Elements
const hourEl = document.getElementById('hour');
const minuteEl = document.getElementById('minute');







// Time setup
// Function to update time and change hour and minute text
const updateTime = () => {
    const currentTime = new Date();
    
    let currentHour = currentTime.getHours();
    let currentMinute = currentTime.getMinutes();
    
    hourEl.textContent = currentHour.toString();
    minuteEl.textContent = currentMinute.toString();
}

//Runs the update time function every second
setInterval(updateTime, 1000);
updateTime();