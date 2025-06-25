// Get references to DOM elements
const searchButton = document.getElementById('search-btn');
const searchInput = document.getElementById('search');
const movieContainer = document.getElementById('movie-container');

// Add event listener to the search button
searchButton.addEventListener('click', async (fast) => {
    const searchTerm = searchInput.value; // Get the search term from input
    const apiKey = 'https://www.omdbapi.com/?apikey=b5b98c80'; // Replace with your actual API key
    const response = await fetch(`http://www.omdbapi.com/?s=fast&apikey=b5b98c80`);
    const data = await response.json(); // Parse the JSON response
    
    // Clear previous results
    movieContainer.innerHTML = '';


    // Check if the response is successful
    if (data.Response === 'True') {
        // Loop through the results and create movie items
        data.Search.forEach(movie => {
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
});


//The API is called every single time a user stops typing on the search input, and we can do that using the onChange event in the input.
//  Then inside of it we need to find a way to have access to whatever the user is typing, pass it to the function, and use it in the API 
// so it returns to us a different content based on that value, so if I search for batman, it will show to me the first ten movies related 
// to the word batman.