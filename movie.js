const searchButton = document.getElementById('search-btn');
const searchInput = document.getElementById('search');
const movieContainer = document.querySelector('.movie__container');
const filterSelect = document.getElementById('filter');
const spinner = document.getElementById('spinner');
let currentMovies = [];

function showLoading() {
    spinner.style.display = 'block';
    // Optionally, hide existing movie content or overlay it
    // movieContainer.innerHTML = ''; // This is already done later, but good to note
    // movieContainer.classList.add('loading-overlay'); // If you want an overlay effect
}

function hideLoading() {
    spinner.style.display = 'none';
    // movieContainer.classList.remove('loading-overlay'); // If you added an overlay
}

searchButton.addEventListener('click', async () => {
    const searchTerm = searchInput.value;
    // const apiKey = 'https://www.omdbapi.com/?apikey=b5b98c80'; // This line is not needed here
    // Show the spinner as soon as the search is initiated
    showLoading();
    movieContainer.innerHTML = ''; // Clear previous results immediately

    try {
        const response = await fetch(`http://www.omdbapi.com/?s=${searchTerm}&apikey=b5b98c80`);
        const data = await response.json();

        if (data.Response === 'True') {
            currentMovies = data.Search.slice(0, 6);
            renderMovies(currentMovies);
        } else {
            movieContainer.innerHTML = `<p>No movies found.</p>`;
        }
    } catch (error) {
        console.error("Error fetching movies:", error);
        movieContainer.innerHTML = `<p>An error occurred while fetching movies. Please try again.</p>`;
    } finally {
        // Hide the spinner once the fetch operation is complete, regardless of success or failure
        hideLoading();
    }
});

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

filterSelect.addEventListener('change', filterMovies);

function onSearchChange(event) {
    console.log(event.target.value);
}