// Weather Site JavaScript Functions

console.log('test');
console.log('My javascript is being read.');

// Variables for Function Use
// Variables for buildWC()
    let temp = 31;
    let speed = 5;
    buildWC(speed, temp);

// Variables for windDial()
    // let direction = "";
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

    var storage = window.localStorage;
    
    // Set global variable for custom header required by NWS API
    var idHeader = {
    headers: {
      "User-Agent": "Student Learning Project - cra18016@byui.edu"
    }

};

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
    console.log(direction.innerHTML);
    // Determine the dial class
    switch (direction.innerHTML){
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


// Gets location information from the NWS API
function getLocation(locale) {
    const URL = "https://api.weather.gov/points/" + locale; 
    // NWS User-Agent header (built above) will be the second parameter 
    fetch(URL, idHeader) 
    .then(function(response){
      if(response.ok){ 
       return response.json(); 
      } 
      throw new ERROR('Response not OK.');
    })
    .then(function (data) { 
      // Let's see what we got back
      console.log('Json object from getLocation function:'); 
      console.log(data);
      // Store data to localstorage 
      storage.setItem("locName", data.properties.relativeLocation.properties.city); 
      storage.setItem("locState", data.properties.relativeLocation.properties.state); 
   
      // Next, get the weather station ID before requesting current conditions 
      // URL for station list is in the data object 
      let stationsURL = data.properties.observationStations; 
      // Call the function to get the list of weather stations
      getStationId(stationsURL); 
      let forecastURL = data.properties.forecast;
      getForecast(forecastURL);
      let hourlyURL = data.properties.forecastHourly;
      getHourly(hourlyURL);
     }) 
    .catch(error => console.log('There was a getLocation error: ', error)) 
   } // end getLocation function

   // Gets weather station list and the nearest weather station ID from the NWS API
function getStationId(stationsURL) { 
    // NWS User-Agent header (built above) will be the second parameter 
    fetch(stationsURL, idHeader) 
    .then(function(response){
      if(response.ok){ 
       return response.json(); 
      } 
      throw new ERROR('Response not OK.');
    })
    .then(function (data) { 
      // Let's see what we got back
      console.log('From getStationId function:'); 
      console.log(data);
    
      // Store station ID and elevation (in meters - will need to be converted to feet) 
      let stationId = data.features[0].properties.stationIdentifier; 
      let stationElevation = data.features[0].properties.elevation.value; 
      console.log('Station and Elevation are: ' + stationId, stationElevation); 
   
      // Store data to localstorage 
      storage.setItem("stationId", stationId); 
      storage.setItem("stationElevation", stationElevation); 
   
      // Request the Current Weather for this station 
      getWeather(stationId);
     }) 
    .catch(error => console.log('There was a getStationId error: ', error)) 
   } // end getStationId function

   // Gets current weather information for a specific weather station from the NWS API
function getWeather(stationId) { 
    // This is the URL for current observation data 
    const URL = 'https://api.weather.gov/stations/' + stationId + '/observations/latest';
    // NWS User-Agent header (built above) will be the second parameter 
    fetch(URL, idHeader) 
    .then(function(response){
      if(response.ok){ 
       return response.json(); 
      } 
      throw new ERROR('Response not OK.');
    })
    .then(function (data) { 
      // Let's see what we got back
      console.log('From getWeather function:'); 
      console.log(data);
    
      // Store weather information to localStorage 
      storage.setItem("latitude", data.geometry.coordinates[0].toFixed(2));
      storage.setItem("longitude", data.geometry.coordinates[1].toFixed(2));
      storage.setItem("windSpeed", data.properties.windSpeed.value);
      storage.setItem("elevation", data.properties.elevation.value);

      // Build the page for viewing 
      buildPage();
     }) 
    .catch(error => console.log('There was a getWeather error: ', error)) 
   } // end getWeather function

   function getForecast(forecastURL) {
    fetch(forecastURL, idHeader) 
    .then(function(response){
      if(response.ok){ 
       return response.json(); 
      } 
      throw new ERROR('Response not OK.');
    })
    .then(function (data) { 
      // Let's see what we got back
      console.log('Json object from getForecast function:'); 
      console.log(data);
    
    // Storing weather data in local storage
    storage.getItem("gusts", data.properties.periods[0].windSpeed);
    // Determining high and low by the time of day
    if (data.properties.periods[0].temperature > data.properties.periods[1].temperature) {
        storage.setItem("dailyHigh", data.properties.periods[0].temperature);
        storage.setItem("dailyLow", data.properties.periods[1].temperature);
    }
    else {
        storage.setItem("dailyHigh", data.properties.periods[1].temperature);
        storage.setItem("dailyLow", data.properties.periods[0].temperature);
    }
   })
   .catch(error => console.log("There was a getForecast error: ", error))
}

   // Gets hours from location
   function getHourly(hourlyURL) {
        // NWS User-Agent header (built above) will be the second parameter 
    fetch(hourlyURL, idHeader) 
    .then(function(response){
      if(response.ok){ 
       return response.json(); 
      } 
      throw new ERROR('Response not OK.');
    })
    .then(function (data) { 
      // Let's see what we got back
      console.log('Json object from getHourly function:'); 
      console.log(data);

      storage.setItem("hourOne", data.properties.periods[0].temperature);
      storage.setItem("hourTwo", data.properties.periods[1].temperature);
      storage.setItem("hourThree", data.properties.periods[2].temperature);
      storage.setItem("hourFour", data.properties.periods[3].temperature);
      storage.setItem("hourFive", data.properties.periods[4].temperature);
      storage.setItem("hourSix", data.properties.periods[5].temperature);
      storage.setItem("hourSeven", data.properties.periods[6].temperature);
      storage.setItem("hourEight", data.properties.periods[7].temperature);
      storage.setItem("hourNine", data.properties.periods[8].temperature);
      storage.setItem("hourTen", data.properties.periods[9].temperature);
      storage.setItem("hourEleven", data.properties.periods[10].temperature);
      storage.setItem("hourTwelve", data.properties.periods[11].temperature);
      storage.setItem("hourThirteen", data.properties.periods[12].temperature);

      console.log(hourOne);
      // Store data into local storage
      let ct = new Date();
      console.log(ct);
      let hour = ct.getHours();
      console.log(hour);
      let test = format_time(hour);
      console.log(test);
      storage.setItem("hour1", format_time(hour));
      storage.setItem("hour2", format_time(hour + 1));
      storage.setItem("hour3" , format_time(hour + 2));
      storage.setItem("hour4" , format_time(hour + 3));
      storage.setItem("hour5" , format_time(hour + 4));
      storage.setItem("hour6" , format_time(hour + 5));
      storage.setItem("hour7" , format_time(hour + 6));
      storage.setItem("hour8" , format_time(hour + 7));
      storage.setItem("hour9" , format_time(hour + 8));
      storage.setItem("hour10" , format_time(hour + 9));
      storage.setItem("hour11" , format_time(hour + 10));
      storage.setItem("hour12" , format_time(hour + 11));
      storage.setItem("hour13" , format_time(hour + 12));

      // Get direction
      storage.setItem("direction", data.properties.periods[0].windDirection);

      // Get current temp
      storage.setItem("current-temp", data.properties.periods[0].temperature);

      // Get summary
      storage.setItem("condition", data.properties.periods[0].shortForecast);
    })
    .catch(error => console.log("There was an error in getHourly function", error));
   }
   // Populate the current location weather page
    function buildPage(){
    // Populate weather information
        let temperature = storage.getItem("current-temp");
        let wind = storage.getItem("windSpeed");
        let condition = storage.getItem("condition");
        let elevation = storage.getItem("elevation");
        let windDirection = storage.getItem("direction");
        let gusts = storage.getItem("gusts");
        let dailyHigh = storage.getItem("dailyHigh");
        let dailyLow = storage.getItem('dailyLow');

        console.log(gusts);
    // Populate location information
        let locName = storage.getItem("locName");
        let locState = storage.getItem("locState");
        let latitude = storage.getItem("latitude");
        let longitude = storage.getItem("longitude");
    // Populate temperature for each hour
        let hourOne = storage.getItem('hourOne');
        let hourTwo = storage.getItem('hourTwo');
        let hourThree = storage.getItem('hourThree');
        let hourFour = storage.getItem('hourFour');
        let hourFive = storage.getItem('hourFive');
        let hourSix = storage.getItem('hourSix');
        let hourSeven = storage.getItem('hourSeven');
        let hourEight = storage.getItem('hourEight');
        let hourNine = storage.getItem('hourNine');
        let hourTen = storage.getItem('hourTen');
        let hourEleven = storage.getItem('hourEleven');
        let hourTwelve = storage.getItem('hourTwelve');
        let hourThirteen = storage.getItem('hourThirteen');
        
        console.log(hourOne);
    // Populate hour for each temperature
        let hour1 = storage.getItem('hour1');
        let hour2 = storage.getItem('hour2');
        let hour3 = storage.getItem('hour3');
        let hour4 = storage.getItem('hour4');
        let hour5 = storage.getItem('hour5');
        let hour6 = storage.getItem('hour6');
        let hour7 = storage.getItem('hour7');
        let hour8 = storage.getItem('hour8');
        let hour9 = storage.getItem('hour9');
        let hour10 = storage.getItem('hour10');
        let hour11 = storage.getItem('hour11');
        let hour12 = storage.getItem('hour12');
        let hour13 = storage.getItem('hour13');

        console.log(hour1);

    // Put variables in html
    // Time
        document.getElementById('hour1').innerHTML = hour1;
        document.getElementById('hour2').innerHTML = hour2;
        document.getElementById('hour3').innerHTML = hour3;
        document.getElementById('hour4').innerHTML = hour4;
        document.getElementById('hour5').innerHTML = hour5;
        document.getElementById('hour6').innerHTML = hour6;
        document.getElementById('hour7').innerHTML = hour7;
        document.getElementById('hour8').innerHTML = hour8;
        document.getElementById('hour9').innerHTML = hour9;
        document.getElementById('hour10').innerHTML = hour10;
        document.getElementById('hour11').innerHTML = hour11;
        document.getElementById('hour12').innerHTML = hour12;
        document.getElementById('hour13').innerHTML = hour13;

    // Temp
        document.getElementById('hourOne').innerHTML = hourOne;
        document.getElementById('hourTwo').innerHTML = hourTwo;
        document.getElementById('hourThree').innerHTML = hourThree;
        document.getElementById('hourFour').innerHTML = hourFour;
        document.getElementById('hourFive').innerHTML = hourFive;
        document.getElementById('hourSix').innerHTML = hourSix;
        document.getElementById('hourSeven').innerHTML = hourSeven;
        document.getElementById('hourEight').innerHTML = hourEight;
        document.getElementById('hourNine').innerHTML = hourNine;
        document.getElementById('hourTen').innerHTML = hourTen;
        document.getElementById('hourEleven').innerHTML = hourEleven;
        document.getElementById('hourTwelve').innerHTML = hourTwelve;
        document.getElementById('hourThirteen').innerHTML = hourThirteen;

    // Title
        let pageTitle = locName + ', ' + locState;
        console.log(pageTitle);
        document.getElementById('contentHeading').innerHTML = pageTitle;
        document.getElementById('title-page').innerHTML = pageTitle + ' | Weather Site';
    // Latitude + Longitude
        document.getElementById('latitude').innerHTML = latitude;
        document.getElementById('longitude').innerHTML = longitude;
    // Elevation
        convertMeters(elevation);
    // High and Low
        document.getElementById('dailyHigh').innerHTML = dailyHigh + '&deg;F';
        document.getElementById('dailyLow').innerHTML = dailyLow + '&deg;F';
    // Current temp
        document.getElementById('current-temp').innerHTML = temperature + '&deg;F';
    // Wind
        document.getElementById('wind-speed').innerHTML = Math.round(wind) + ' mph';
        document.getElementById('gusts').innerHTML = gusts;
        document.getElementById('direction').innerHTML = windDirection;
    // Run windDial()
        windDial(direction);
    // Run buildWC()
        buildWC(wind, temp);
    // Condition
        document.getElementById('condition').innerHTML = condition;
    // Remove hide and displaying content
        document.getElementById("status").setAttribute("class", "hide");
        content.setAttribute("class", "");
   }

   // Converting Celcius to Fahrenheit
   function convertToFahrenheit(temp) {
       let fahrenheit = (temp * 9/5) + 32;
       let avgFahrenheit = Math.round(fahrenheit);
       return avgFahrenheit;
   }
   