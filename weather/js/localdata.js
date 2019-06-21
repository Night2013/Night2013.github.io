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
    // Get the wind data 
    let locWind = g.Wind;
    console.log(locWind);
    // Get the current conditions
    let locSummary = g.Summary;
    console.log(locSummary);
    // Get the hourly data 
    let locHourly = g.Hourly;
    console.log(locHourly);
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

    // Set the wind information
    locWind = document.getElementById("wind-speed").innerHTML;
    buildWC
    // Set the current conditions information
    locSummary = document.getElementById("condition").innerHTML;

    // Set the hourly temperature information
    locHourly = document.getElementById("forecast").innerHTML;

    // Change the status of the containers
    contentContainer.setAttribute('class', ''); // removes the hide class
    statusContainer.setAttribute('class', 'hide'); // hides the status container
  })
  .catch(function(error){
  console.log('There was a fetch problem: ', error.message);
  statusContainer.innerHTML = 'Sorry, the data could not be processed.';
  })
}