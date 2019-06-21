// Weather Site JavaScript Functions

console.log('test');
console.log('My javascript is being read.');

// Variables for Function Use
// Variables for buildWC()
    let temp = 31;
    let speed = 5;
    buildWC(speed, temp);

// Variables for windDial()
    let direction = "SSW";
    windDial(direction);

// Variables for getConditions()
    let condition = "cloud";
    let newCondition = getCondition(condition);
    changeSummaryImage(newCondition);

// Variables for convertMeters()
    let meters = 1200;
    convertMeters(meters);

    // Variables for convertElevation()
    let elevationFeet = convertMeters(meters);
    convertElevation(elevationHeight);

    // Get the next hour based on the current time
    let date = new Date(); 
    let nextHour = date.getHours() + 1;

// Calculate the Windchill
function buildWC(speed, temp) {
  let feelTemp = document.getElementById('feelTemp');   
    // Compute the windchill
    let wc = 35.74 + 0.6215 * temp - 35.75 * Math.pow(speed, 0.16) + 0.4275 * temp * Math.pow(speed, 0.16);
    console.log(wc);

    // Round the answer down to integer
    wc = Math.floor(wc);

    // If chill is greater than temp, return the temp
    wc = (wc > temp)?temp:wc;

    // Display the windchill
    console.log(wc);
    feelTemp.innerHTML = wc;
}

// Wind Dial Function
function windDial(direction){
    // Get the wind dial container
    let dial = document.getElementById("dial");

    // Determine the dial class
    switch (direction){
    case "North":
    case "N":
     dial.setAttribute("class", "n"); //"n" is the CSS rule selector
     break;
    case "NE":
    case "NNE":
    case "ENE":
     dial.setAttribute("class", "ne");
     break;
    case "NW":
    case "NNW":
    case "WNW":
     dial.setAttribute("class", "nw");
     break;
    case "South":
    case "S":
     dial.setAttribute("class", "s");
     break;
    case "SE":
    case "SSE":
    case "ESE":
     dial.setAttribute("class", "se");
     break;
    case "SW":
    case "SSW":
    case "WSW":
     dial.setAttribute("class", "sw");
     break;
    case "East":
    case "E":
     dial.setAttribute("class", "e");
     break;
    case "West":
    case "W":
     dial.setAttribute("class", "w");
     break;
   }
}

// Get the weather condition
function getCondition(condtion) {
    // check if the condition passed
    console.log(condition);
    switch(true) {
        // Clear
        case (condition.includes("clear")) || condition.includes("sunny"):
            return "clear";
        // Rain
        case (condition.includes("rain")) || condition.includes("wet"):
            return "rain";
        // Fog
        case (condition.includes("fog")):
            return "fog";
        // Snow
        case (condition.includes("snow")):
            return "snow";
        // Clouds
        case (condition.includes("cloud")):
            return "clouds";
        default:
            return "clear";
    }
}

// changes weather background image
function changeSummaryImage(newCondition) {
    // Checks the weather condition
    console.log(newCondition);

    // Changes the class depending on condition
    switch(newCondition) {
        // Clear
        case "clear": curWeather.setAttribute("class", "clear");
        break;
        // Rain
        case "rain": curWeather.setAttribute("class", "rain");
        break;
        // Fog
        case "fog": curWeather.setAttribute("class", "fog");
        break;
        // Snow
        case "snow": curWeather.setAttribute("class", "snow");
        break;
        // Clouds
        case "clouds": curWeather.setAttribute("class", "clouds");
        break;
    }
}

// converts meters into feet
function convertMeters(meters) {
    // Convert to feet
    let feet = meters * 3.2808;
    // Checks to see if equation is right
    console.log(feet);
    // Round to nearest integer
    feet = Math.round(feet);
    console.log(feet);
    return feet;
}

// puts convertMeters into elevation
function convertElevation(elevation) {
    // convert elevation into feet
    elevationHeight.innerHTML = elevationFeet;
}

// converts and formats hours to a 12 hour format
function format_time(hour) {
    if(hour > 23){ 
        hour -= 24; 
       } 
       let amPM = (hour > 11) ? "pm" : "am"; 
       if(hour > 12) { 
        hour -= 12; 
       } 
       if(hour == 0) { 
        hour = "12"; 
       } 
       return hour + amPM;
}

// Build the hourly temperature list
function buildHourlyData(nextHour,hourlyTemps) {
    // Data comes from a JavaScript object of hourly temp name - value pairs
    // Next hour should have a value between 0-23
    // The hourlyTemps variable holds an array of temperatures
    // Line 8 builds a list item showing the time for the next hour 
    // and then the first element (value in index 0) from the hourly temps array
     let hourlyListItems = '<li>' + format_time(nextHour) + ': ' + hourlyTemps[0] + '&deg;F</li>';
     // Build the remaining list items using a for loop
     for (let i = 1, x = hourlyTemps.length; i < x; i++) {
      hourlyListItems += '<li>' + format_time(nextHour+i) + ': ' + hourlyTemps[i] + '&deg;F</li>';
     }
     console.log('HourlyList is: ' +hourlyListItems);
     return hourlyListItems;
    }