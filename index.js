const API_KEY = "8c8e1a50-6322-4135-8875-5d40a5420d86";
const API_URL_POPULAR =
  "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1";

const API_URL_SEARCH =
  "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=";

const form = document.querySelector(".header__form");
const search = document.querySelector(".header__input");

const modalEl = document.querySelector(".modal");

function openModal(id) {
  modalEl.classList.add("modal--show");
  modalEl.innerHTML = `
    <div class="modal__card">
      <img src="" alt="" class="modal__movie-backdrop" />
      <h2 class="modal__title">Название: ${this.nameRu}</h2>
      <h2 class="modal__title">Год: ${this.year}</h2>
      <ul class="modal__list">
        <li class="modal__item">Жанр: ${this.genres.map(
          (obj) => " " + obj.genre
        )}</li>
        <li class="modal__item">Время: ${this.filmLength}</li>
        <li class="modal__item">
          сайт: <a href="${"https://www.kinopoisk.vip/series/"}${
    this.filmId
  }" class="modal__link" target="_blank"> ссылка</a>
        </li>
        <li class="modal__item">Описание: ${
          this.description ? this.description : "отсутсвует"
        }</li>
      </ul>
      <button class="modal__button">закрыть</button>
    </div>       
  `;

  btn_close = document.querySelector(".modal__button");
  btn_close.addEventListener("click", () => {
    closeModal();
  });
}

function closeModal() {
  modalEl.classList.remove("modal--show");
}

window.addEventListener("click", (event) => {
  if (event.target === modalEl) {
    closeModal();
  }
});

function showMovies(data) {
  const movieElmain = document.querySelector(".films__list");
  movieElmain.innerHTML = "";

  data.films.forEach((movie) => {
    const movieEl = document.createElement("li");

    movieEl.classList.add("films__item");
    movieEl.innerHTML = `
  <li class="films__item">
    <div class="films__film">
      <img
        src="${movie.posterUrlPreview}"
        alt="film"
          class="films__image"
      />
      <h3 class="films__title">${movie.nameRu}</h3>
      <div class="films__genre">${movie.genres.map(
        (obj) => " " + obj.genre
      )}</div>
      <span class="films__grade films__grade--${
        movie.rating >= 8.5
          ? "green"
          : movie.rating >= 6
          ? "orange"
          : movie.rating > 0
          ? "red"
          : ""
      }"> ${movie.rating ? movie.rating : "?"} </span>
    </div>
  </li>
  `;
    movieEl.addEventListener("click", () => openModal.bind(movie)());
    movieElmain.appendChild(movieEl);
  });
}

getMovies(API_URL_POPULAR);

async function getMovies(url) {
  const responsive = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": API_KEY,
    },
  });
  const respData = await responsive.json();
  console.log(respData);
  showMovies(respData);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const apiSearchUrl = `${API_URL_SEARCH}${search.value}`;
  if (search.value) {
    getMovies(apiSearchUrl);
  }
  search.value = "";
});
