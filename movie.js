// Get references to DOM elements
const searchButton = document.getElementById('search-btn');
const searchInput = document.getElementById('search');
const movieContainer = document.querySelector('.movie__container');
const filterSelect = document.getElementById('filter'); // Assuming you have a select element for filtering
let currentMovies = [];

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
        currentMovies = data.Search.slice(0, 6); // Store the current movies
        renderMovies(currentMovies); // Render the movies
    } else {
        movieContainer.innerHTML = `<p>No movies found.</p>`; // Handle no results
    }
});

// Function to render movies in the container
function renderMovies(movies) {
    movieContainer.innerHTML = ''; 
    movies.forEach(movie => {
        const movieItem = document.createElement('div');
        movieItem.classList.add('movie-item');
        movieItem.innerHTML = `
            <h3>${movie.Title}</h3>
            <p>Year: ${movie.Year}</p>
            <img src="${movie.Poster}" alt="${movie.Title}" style="width:100px;height:auto;">
        `;
        movieContainer.appendChild(movieItem);
    });
}

// Function to filter movies based on the selected option
function filterMovies(event) {
    const filter = event.target.value;
    let sorted = [...currentMovies];

    if (currentMovies.length === 0) return;

    if (filter === "A__TO__Z") {
        sorted.sort((a, b) => a.Title.localeCompare(b.Title));
    } else if (filter === "Z__TO__A") {
        sorted.sort((a, b) => b.Title.localeCompare(a.Title));
    } else if (filter === "Year") {
        sorted.sort((a, b) => parseInt(a.Year) - parseInt(b.Year));
    }

    renderMovies(sorted);
}

// Add event listener for the filter select
filterSelect.addEventListener('change', filterMovies);

// Optional: Log search input changes
function onSearchChange(event) {
    console.log(event.target.value);
}



