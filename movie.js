const searchButton = document.getElementById('search-btn');
const searchInput = document.getElementById('search');
const movieContainer = document.querySelector('.movie__container');
const filterSelect = document.getElementById('filter'); 
const spinner = document.getElementById('spinner');
let currentMovies = [];



function showLoading() {
    spinner.style.display = 'block'; 
}

function hideLoading() {
    spinner.style.display = 'none'; 
}


searchButton.addEventListener('click', async () => {
    const searchTerm = searchInput.value;
    const apiKey = 'https://www.omdbapi.com/?apikey=b5b98c80'; 
    const response = await fetch(`http://www.omdbapi.com/?s=${searchTerm}&apikey=b5b98c80`);
    const data = await response.json();


  
    movieContainer.innerHTML = '';

   
    if (data.Response === 'True') {
        currentMovies = data.Search.slice(0, 6); 
        renderMovies(currentMovies);
    } else {
        movieContainer.innerHTML = `<p>No movies found.</p>`; 
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



