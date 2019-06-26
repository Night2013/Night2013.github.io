"use strict";





let navbar = document.getElementById("nav-bar");
let statusContainer = document.getElementById("status");
let contentContainer = document.getElementById("content");

navbar.addEventListener("click", function(evt){

  // Get the city name
  let cityName = evt.target.innerHTML;
    switch (cityName) {
      case "Franklin":
        case "Greenville":
          case "Springfield":
            evt.preventDefault();
        break;
  }

let hourlyList = document.getElementById("hourlyData");
let weatherURL = "/weather/js/weather.json"

// fetches function
// fetchData(weatherURL);

// function fetchData(weatherURL){
  // let cityName = 'Greenville'; // The data we want from the weather.json file
  fetch(weatherURL)
  .then(function(response) {
  if(response.ok){
  return response.json();
  }
  throw new ERROR('Network response was not OK.');
  })
  .then(function(data){
    // Check the data object that was retrieved
    console.log(data);
    // data is the full JavaScript object, but we only want the greenville part
    // shorten the variable and focus only on the data we want to reduce typing
    let g = data[cityName];

    // ************ Get the content ******************************

    // Get the location data
    let locName = g.City;
    let locState = g.State;
    // Put them together
    let fullName = locName+', '+locState;
    // See if it worked
    console.log('fullName is: '+fullName);

    // Get the temperature data
    let locTemp = g.Temp;
    console.log(locTemp);
    let locHigh = g.High;
    console.log(locHigh);
    let locLow = g.Low;
    console.log(locLow);

    // Get the wind data 
    let locWind = g.Wind;
    console.log(locWind);
    let locDirection = g.Direction;
    console.log(locDirection);
    let locGusts = g.Gusts;
    console.log(locGusts);
    
    // Get the current conditions
    let locSummary = g.Summary;
    console.log(locSummary);
    
    // Get the hourly data 
    let tenAM = g.Hourly[0];
    console.log(tenAM);
    let elevenAM = g.Hourly[1];
    console.log(elevenAM);
    let twelvePM = g.Hourly[2];
    console.log(twelvePM);
    let onePM = g.Hourly[3];
    console.log(onePM);
    let twoPM = g.Hourly[4];
    console.log(twoPM);
    let threePM = g.Hourly[5];
    console.log(threePM);
    let fourPM = g.Hourly[6];
    console.log(fourPM);
    let fivePM = g.Hourly[7];
    console.log(fivePM);
    let sixPM = g.Hourly[8];
    console.log(sixPM);
    let sevenPM = g.Hourly[9];
    console.log(sevenPM);
    let eightPM = g.Hourly[10];
    console.log(eightPM);
    let ninePM = g.Hourly[11];
    console.log(ninePM);
    let tenPM = g.Hourly[12];
    console.log(tenPM);

    // Get zip and elevation
    let locZip = g.Zip;
    console.log(locZip);
    let locElevation = g.Elevation;
    console.log(locElevation);
    let locLongitude = g.Longitude;
    console.log(locLongitude);
    let locLatitude = g.Latitude;
    console.log(locLatitude);

    // ************ Display the content ******************************
    // Set the title with the location name at the first
    // Gets the title element so it can be worked with
    let pageTitle = document.getElementById('title-page');
    // Create a text node containing the full name 
    let fullNameNode = document.createTextNode(fullName);
    // inserts the fullName value before any other content that might exist
    pageTitle.insertBefore(fullNameNode, pageTitle.childNodes[0]);
    // When this is done the title should look something like this:
    // Greenville, SC | The Weather Site

    // Set the Location information
    // Get the h1 to display the city location
    let contentHeading = document.getElementById('contentHeading');
    contentHeading.innerHTML = fullName;
    // The h1 in main h1 should now say "Greenville, SC"
    

    // Set the temperature information
    let inputTemp = document.getElementById("current-temp");
    inputTemp.innerHTML = locTemp + "&#8457;";
    let inputHigh = document.getElementById("daily-high");
    inputHigh.innerHTML = locHigh + "&#8457;";
    let inputLow = document.getElementById("daily-low");
    inputLow.innerHTML = locLow + "&#8457;";

    // Set the wind information
    let inputWind = document.getElementById("wind-speed");
    inputWind.innerHTML = locWind + "mph";
    let inputDirection = document.getElementById("direction");
    inputDirection.innerHTML = "Wind Direction: " + locDirection;
    let inputGusts = document.getElementById("gusts");
    inputGusts.innerHTML = "Gusts: " + locGusts;
    buildWC;

    // Set the current conditions information
    let inputSummary = document.getElementById("condition");
    inputSummary.innerHTML = locSummary;

    // Set the hourly temperature information
    let inputTenAM = document.getElementById("10am");
    inputTenAM.innerHTML = "10am: " + tenAM + " |";
    let inputElevenAM = document.getElementById("11am");
    inputElevenAM.innerHTML = "11am: " + elevenAM + " |";
    let inputTwelvePM = document.getElementById("12pm");
    inputTwelvePM.innerHTML = "12pm: " + twelvePM + " |";
    let inputOnePM = document.getElementById("1pm");
    inputOnePM.innerHTML = "1pm: " + onePM + " |";
    let inputTwoPM = document.getElementById("2pm");
    inputTwoPM.innerHTML = "2pm: " + twoPM + " |";
    let inputThreePM = document.getElementById("3pm");
    inputThreePM.innerHTML = "3pm: " + threePM + " |";
    let inputFourPM = document.getElementById("4pm");
    inputFourPM.innerHTML = "4pm: " + fourPM + " |";
    let inputFivePM = document.getElementById("5pm");
    inputFivePM.innerHTML = "5pm: " + fivePM + " |";
    let inputSixPM = document.getElementById("6pm");
    inputSixPM.innerHTML = "6pm: " + sixPM + " |";
    let inputSevenPM = document.getElementById("7pm");
    inputSevenPM.innerHTML = "7pm: " + sevenPM + " |";
    let inputEightPM = document.getElementById("8pm");
    inputEightPM.innerHTML = "8pm: " + eightPM + " |";
    let inputNinePM = document.getElementById("9pm");
    inputNinePM.innerHTML = "9pm: " + ninePM + " |";
    let inputTenPM = document.getElementById("10pm");
    inputTenPM.innerHTML = "10pm: " + tenPM;
    // Set the zip and elevation
    let inputZip = document.getElementById("zip");
    inputZip.innerHTML = "Zip: " + locZip  + " |";
    let inputElevation = document.getElementById("elevation");
    inputElevation.innerHTML = "Elevation: " + locElevation + " |";
    let inputLongitude = document.getElementById("longitude");
    inputLongitude.innerHTML = locLongitude;
    let inputLatitude = document.getElementById("latitude");
    inputLatitude.innerHTML = locLatitude;

    // Change the status of the containers
    contentContainer.setAttribute('class', ''); // removes the hide class
    statusContainer.setAttribute('class', 'hide'); // hides the status container
  })
  .catch(function(error){
  console.log('There was a fetch problem: ', error.message);
  statusContainer.innerHTML = 'Sorry, the data could not be processed.';
  })
// }
})