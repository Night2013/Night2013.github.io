'use strict';

let navListItems = "/acme/js/acme.json";

console.log("test");
fetchData(navListItems);

console.log("test2");
function fetchData(navListItems) {
    
    fetch(navListItems)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Network response was not O')
        })
        .then(function (data) {
            console.log(data.navList);
        })
}