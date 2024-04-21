import {
  KEY,
  URL,
  URL_Serch,
  modalEl,
  API_URL_MOVIE_DETALIS,
  moviesEl
} from "./const.js";


getMovies(URL);
async function getMovies(url) {
  const resp = await fetch(url, {
    headers: {
      "Content-Type": "application.json",
      "x-api-key": KEY,
    },
  });
  const respData = await resp.json();

  showMovies(respData);
}

function getClassByRate(rate) {
  if (rate >= 7) {
    return "green";
  } else if (rate >= 5) {
    return "orange";
  } else {
    return "red";
  }
}

function showMovies(data) {
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
                    <div class="movie_average movie_average-${getClassByRate(
                      movie.ratingKinopoisk
                    )}">${movie.ratingKinopoisk}</div>
                </div>
    `;
    movieEl.addEventListener("click", () => openModal(movie.kinopoiskId));
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

//modal
async function openModal(id) {
  const resp = await fetch(API_URL_MOVIE_DETALIS + id, {
    headers: {
      "Content-Type": "application.json",
      "x-api-key": KEY,
    },
  });
  const respData = await resp.json();

  modalEl.classList.add("modal--show");
  document.body.classList.add("stop-scrolling");
  modalEl.innerHTML = `
  <div class="modal__card">
    <img class="modal__movie-backdrop" src="${respData.posterUrl}" alt="">
    <h2>
      <span class="modal__movie-title">${respData.nameRu} </span>
      <span class="modal__movie-release-year">${respData.year} </span>
    </h2>
    <ul class="modal__movie-info">
      <div class="loader"></div>
      <li class = "modal_movie_genre">${respData.genres.map(
        (el) => `<span>${el.genre}</span>`
      )}</li>
      <li class = "modal_movie_runtime">${respData.filmLength} минут</li>
      <li>Сайт: <a class = "modal_movie_site" href ="${respData.webUrl}">${
    respData.webUrl
  }</a></li>
      <li class = "modal_movie_overview">${respData.description}</li>
    </ul>
    <button type ="button" class="modal_button_close">Закрыть</button>
  </div>
  `;
  const btnClosed = document.querySelector(".modal_button_close");
  console.log(btnClosed);
  btnClosed.addEventListener("click", () => closeModal());

}

function closeModal() {
  modalEl.classList.remove("modal--show");
  document.body.classList.remove("stop-scrolling");
  
}

window.addEventListener("click", (e) => {
  console.log(e.target);
  if (e.target === modalEl) {
    closeModal();

  } else if (e.target.closest(".movie")) {
    closeModal();    
  }
});

window.addEventListener("keydown", (e) => {
  console.log(e.keyCode);
  if (e.keyCode === 27) {
    closeModal();
  }
});
