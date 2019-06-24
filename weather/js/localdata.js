"use strict";





let navbar = document.getElementById("nav-bar");
let statusContainer = document.getElementById("status");
let contentContainer = document.getElementById("content");
let weatherURL = "/weather/js/weather.json"

// fetches function
fetchData(weatherURL);

function fetchData(weatherURL){
  let cityName = 'Greenville'; // The data we want from the weather.json file
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
    locTemp = document.getElementById("current-temp").innerHTML;
    locHigh = document.getElementById("daily-high").innerHTML;

    // Set the wind information
    locWind = document.getElementById("wind-speed").innerHTML;
    buildWC;
    // Set the current conditions information
    locSummary = document.getElementById("condition").innerHTML;

    // Set the hourly temperature information
    tenAM = document.getElementById("10am").innerHTML;
    elevenAM = document.getElementById("11am").innerHTML;
    twelvePM = document.getElementById("12pm").innerHTML;
    onePM = document.getElementById("1pm").innerHTML;
    twoPM = document.getElementById("2pm").innerHTML;
    threePM = document.getElementById("3pm").innerHTML;
    fourPM = document.getElementById("4pm").innerHTML;
    fivePM = document.getElementById("5pm").innerHTML;
    sixPM = document.getElementById("6pm").innerHTML;
    sevenPM = document.getElementById("7pm").innerHTML;
    eightPM = document.getElementById("8pm").innerHTML;
    ninePM = document.getElementById("9pm").innerHTML;
    tenPM = document.getElementById("10pm").innerHTML;

    // Set the zip and elevation
    locZip = document.getElementById("zip").innerHTML;

    // Change the status of the containers
    contentContainer.setAttribute('class', ''); // removes the hide class
    statusContainer.setAttribute('class', 'hide'); // hides the status container
  })
  .catch(function(error){
  console.log('There was a fetch problem: ', error.message);
  statusContainer.innerHTML = 'Sorry, the data could not be processed.';
  })
}