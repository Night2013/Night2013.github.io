'use strict';


// Variables for functions
let navBar = document.getElementById('nav-bar');
let acmeURL = '/acme-project/js/acme.json';

// Run getNavList();
getNavList();

// Functions
function getNavList() {
  fetch(acmeURL)
    .then(function (response) {
      if (response.ok) {
        return response.json();
      }
      throw new ERROR('Network response was not OK.');
    })
    .then(function (data) {
        // Check the data object that was retrieved
        console.log('Json object from getNavList function')
        console.log(data);
        // Create an array that contains the name of each page
        let navItems = Object.keys(data);
        console.log(navItems);

        // Set the inner HTML to the list items
        let navBar = document.getElementById('nav-bar');
        navBar.innerHTML = buildNavBar(navItems);
    })
    .catch(error => console.log('There was a getNavList error: ', error))
  }

  // This function build the navbar
  function buildNavBar(navItems) {
    // Create starting html for nav list
    let navigationList = '<li><a href="https://night2013.github.io/acme-project/index.html" title="Go to the home page">Home</a></li>';

    // Input the rest of the items into the nav along with the proper HTML
    for (let i = 0; navItems.length > i; i++) {
        navigationList += '<li><a href="https://night2013.github.io/acme-project/' + 
        navItems[i].toLowerCase() + '.html" title ="Go to the ' + navItems[i] + ' page">' + navItems[i] + '</li>';
    }

    console.log("Nav Bar inner HTML = " + navigationList);
    
    return navigationList;
  }

        navBar.addEventListener('click', function (evt) {

          let pageName = evt.target.innerHTML;
          switch (pageName) {
            case 'Anvils':
            case 'Explosives':
            case 'Decoys':
            case 'Traps':
              evt.preventDefault();
              break;
          }


          fetch(acmeURL)
            .then(function (response) {
              if (response.ok) {
                return response.json();
              }
              throw new ERROR('Network response was not OK.');
            })
            .then(function (data) {
              // Check the data object that was retrieved
              console.log(data);

              // Give a shortcut
              let info = data[pageName];

              // Create variable and put them into object

              let description = info.description;
              // Check
              console.log(description);

              let name = info.name;
              // Check
              console.log(name);

              let path = info.path;
              // Check
              console.log(path);

              let manufacturer = info.manufacturer;
              // Check
              console.log(manufacturer);

              let price = info.price;
              // Check
              console.log(price);

              let reviews = info.reviews;
              // Check
              console.log(reviews);

              // Start putting info in page
              document.getElementById('name').innerHTML = name;
              document.getElementById('description').innerHTML = description;
              document.getElementById('path').src = path;
              document.getElementById('manufacturer').innerHTML = manufacturer;
              document.getElementById('contentReviews').innerHTML = reviews;
              document.getElementById('price').innerHTML = 'Price: ' + price;

              // Change title page
              document.getElementById('titlePage').innerHTML = 'ACME | ' + name;

              // Display content and hide home page
              contentPage.setAttribute('class', '');
              homePage.setAttribute('class', 'hide');
            })
            .catch(function (error) {
              console.log('There was a fetch problem: ', error.message);


            })

        })