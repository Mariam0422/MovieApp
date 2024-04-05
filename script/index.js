import { KEY, URL, URL_Serch } from "./const.js";
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
function getClassByRate(rate) {
  if (rate >= 7) {
    return "green";
  } else if ((rate) => 5) {
    return "orange";
  } else {
    return "red";
  }
}
function showMovies(data) {
  const moviesEl = document.querySelector(".movies");
  document.querySelector(".movies").innerHTML = "";
  let moviesData = data.items || data.films;
  moviesData.forEach((movie) => {
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    movieEl.innerHTML = `
    <div class="movie_cover-inner">
                     <img src="${
                       movie.posterUrlPreview
                     }" class="movie_cover" alt="${movie.nameRu}">
                     <div class="movie_cover-dark"></div>
                </div>
                <div class="movie_info">
                    <div class="movie_title">${movie.nameRu}</div>
                    <div class="movie_category">${movie.genres.map(
                      (genre) => ` ${genre.genre}`
                    )}</div>
                    <div class="movie_average movie_average-${getClassByRate(movie.ratingKinopoisk)}">${movie.ratingKinopoisk}</div>
                </div>
    `;
    moviesEl.append(movieEl);
  });
}

const form = document.querySelector("form");
const search = document.querySelector(".header_search");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const apiSearchUrl = `${URL_Serch}${search.value}`;
  if (search.value) {
    getMovies(apiSearchUrl);
    search.value = "";
  }
});
