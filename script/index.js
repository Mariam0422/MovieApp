import { KEY, URL } from "./const.js";
getMovies(URL);
async function getMovies(url) {
  const resp = await fetch(url, {
    headers: {
      "Content-Type": "application.json",
      "x-api-key": KEY,
    },
  });
  const respData = await resp.json();
  console.log(respData);
  showMovies(respData);
}

function showMovies(data) {
  const moviesEl = document.querySelector(".movies");
  data.items.forEach((movie) => {
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    movieEl.innerHTML = `
    <div class="movie_cover-inner">
                     <img src="${movie.posterUrlPreview}" class="movie_cover" alt="${movie.nameRu}">
                     <div class="movie_cover-dark"></div>
                </div>
                <div class="movie_info">
                    <div class="movie_title">${movie.nameRu}</div>
                    <div class="movie_category">${movie.genres.map(
                      (genre) => ` ${genre.genre}`
                    )}</div>
                    <div class="movie_average movie_average-green">${movie.ratingKinopoisk}</div>
                </div>
    `;
    moviesEl.append(movieEl);
  });
}
