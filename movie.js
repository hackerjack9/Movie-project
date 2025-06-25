// Get references to DOM elements
const searchButton = document.getElementById('search-btn');
const searchInput = document.getElementById('search');
const movieContainer = document.getElementById('movie-container');

// Add event listener to the search button
searchButton.addEventListener('click', async () => {
    const searchTerm = searchInput.value; // Get the search term from input
    const apiKey = 'https://www.omdbapi.com/?apikey=b5b98c80'; // Replace with your actual API key
    const response = await fetch(`http://www.omdbapi.com/?s=fast&apikey=b5b98c80`);
    const data = await response.json(); // Parse the JSON response
    
     function onSearchChange(event) {
        console.log(event.target.value)
    }

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


