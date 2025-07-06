// Get references to DOM elements
const searchButton = document.getElementById('search-btn');
const searchInput = document.getElementById('search');
const movieContainer = document.querySelector('.movie__container');


// Add event listener to the search button
searchButton.addEventListener('click', async () => {
    const searchTerm = searchInput.value; // Get the search term from input
    const apiKey = 'https://www.omdbapi.com/?apikey=b5b98c80'; // Replace with your actual API key
    const response = await fetch(`http://www.omdbapi.com/?s=${searchTerm}&apikey=b5b98c80`);
    const data = await response.json(); // Parse the JSON response


    // Clear previous results
    movieContainer.innerHTML = '';

    
    // Check if the response is successful
    if (data.Response === 'True') {
        // Loop through the results and create movie items
        data.Search.slice(0, 6).forEach(movie => {
            const movieItem = document.createElement('div');
            movieItem.classList.add('movie-item');
            movieItem.innerHTML = `
                <h3>${movie.Title}</h3>
                <p>Year: ${movie.Year}</p>
                <img src="${movie.Poster}" alt="${movie.Title}" style="width:100px;height:auto;">
            `;
            movieContainer.appendChild(movieItem); // Append movie item to container
        });
    } else {
        movieContainer.innerHTML = `<p>No movies found.</p>`; // Handle no results
    }



const array1 = (`http://www.omdbapi.com/?s=${searchTerm}&apikey=b5b98c80`)

// order an array of names
array1.sort();

// order an array of objects with name
users.sort(function (a, b) {
  if (a.array1 < b.array1) {
    return -1;
  }
  if (a.array1 > b.array1) {
    return 1;
  }
  return 0;
});

});


function filterMovies(event) {
    console.log(event.target.value)


 function onSearchChange(event) {
        console.log(event.target.value)
    };
}

// Call the function to fetch and sort data
fetchAndSortData(); 


  //  if (filter === "A__TO__Z") {
  //      movies.sort(
  //      )
 //   }

 //   else if (filter === "Z__TO__A") {
  ///      movies.sort(
  //      )
  //  }

 //   else if (filter === "Year") {
  //     (a, b) => a - b;
  // }


 
//setTimeout(() => {
//    renderMovies();
//});

//API data
//function getMovies() {array of movies from API}

    