// Weather Site JavaScript Functions

console.log('test');
console.log('My javascript is being read.');

// Variables for Function Use
// Variables for buildWC()
    const temp = 31;
    const speed = 5;
    buildWC(speed, temp);

// Variables for windDial()
    const direction = "SSW";
    windDial(direction);

// Variables for getConditions()
    let condition = "cloud";
    let newCondition = getCondition(condition);
    changeSummaryImage(newCondition);

// Variables for convertMeters()
    let meters = 1200;
    convertMeters(meters);

    // Variables for convertElevation()
    const elevationFeet = convertMeters(meters);
    convertElevation(elevationHeight);

// Calculate the Windchill
function buildWC(speed, temp) {
  const feelTemp = document.getElementById('feelTemp');   
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
    const dial = document.getElementById("dial");

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

function convertElevation(elevation) {
    // convert elevation into feet
    elevationHeight.innerHTML = elevationFeet;
}