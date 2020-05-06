const auth = "563492ad6f917000010000011ede660bd45348d2b0c553ddbda047c4";
const gallery = document.querySelector(".gallery");
const searchInput = document.querySelector(".search-input");
const form = document.querySelector(".search-form");
const btnMore = document.querySelector(".more");
let searchValue;
let page = 1;
let fetchLink;
let currentSearch;

searchInput.addEventListener("input", updateInput);
form.addEventListener("sumbit", (event) => {
  event.preventDefault();
  currentSearch = searchValue;
  searchPhotos(searchValue);
});

btnMore.addEventListener("click", loadMore);

function updateInput(e) {
  searchValue = e.target.value;
    currentSearch = searchValue;
}

async function fetchApi(url) {
  const dataFetch = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: auth,
    },
  });
  const data = await dataFetch.json();
  return data;
}

function generatePicture(data) {
  data.photos.forEach(function (photo) {
    const galleryImg = document.createElement("div");
    galleryImg.classList.add("gallery-img");
    galleryImg.innerHTML = `
    <div class="gallery-info">
        <p>Author: ${photo.photographer}</p>
        <a href=${photo.src.original}>Download</a>
    </div>
    <img class="gallery-img" src=${photo.src.large}> </img>
    `;
    gallery.appendChild(galleryImg);
  });
}

async function curatedPhotos() {
  fetchLink = "https://api.pexels.com/v1/curated?per_page=15&page=1";
  const data = await fetchApi(fetchLink);
  generatePicture(data);
}

async function searchPhotos(query) {
  fetchLink = `https://api.pexels.com/v1/search?query=${query}+query&per_page=15&page=1`;
  clear();
  const data = await fetchApi(fetchLink);
  generatePicture(data);
}

function clear() {
  gallery.innerHTML = "";
  searchInput.value = "";
}

async function loadMore() {
  page++;
  if (currentSearch) {
    fetchLink = `https://api.pexels.com/v1/search?query=${currentSearch}+query&per_page=15&page=${page}`;
  } else {
    fetchLink = `https://api.pexels.com/v1/curated?per_page=15&page=${page}`;
  }
  const data = await fetchApi(fetchLink);
  generatePicture(data);
}

curatedPhotos();
