// Weather Site JavaScript Functions

console.log('My javascript is being read.');

// Calculate the Windchill
function buildWC(speed, temp) {
    // Compute the windchill
    let wc = 35.74 + 0.6215 * temp - 35.75 * Math.pow(speed, 0.16) + 0.4275 * temp * Math.pow(speed, 0.16);
    console.log(wc);

    const feelTemp = document.getElementById('feelTemp');
}