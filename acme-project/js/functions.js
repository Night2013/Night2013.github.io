'use strict';



let navBar = document.getElementById('nav-bar');

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

    let acmeURL = '/acme-project/js/acme.json';
    
    fetch(acmeURL)
    .then(function(response) {
    if(response.ok){
    return response.json();
    }
    throw new ERROR('Network response was not OK.');
    })
    .then(function(data){
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
    .catch(function(error){
    console.log('There was a fetch problem: ', error.message);


    statusContainer.innerHTML = 'Sorry, the data could not be processed.';
    })
  
  })