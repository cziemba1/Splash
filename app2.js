const auth = "563492ad6f917000010000011ede660bd45348d2b0c553ddbda047c4";
const gallery = document.querySelector(".gallery");
const searchInput = document.querySelector(".search-input");
const submitButton = document.querySelector(".submit-btn");
let searchValue;

async function curatedPhotos() {
  const dataFetch = await fetch(
    "https://api.pexels.com/v1/curated?per_page=15&page=1",
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: auth,
      },
    }
  );

  const data = await dataFetch.json();
  console.log(data);
  const fragment = document.createDocumentFragment();
  data.photos.forEach((photo) => {
    const galleryImg = document.createElement("div");
    galleryImg.classList.add("gallery-image");
    galleryImg.innerHTML = `<img src=${photo.src.landscape}> </img>
    <p>${photo.photographer}</p>
    `;
    gallery.appendChild(galleryImg);
  });
}

curatedPhotos();
