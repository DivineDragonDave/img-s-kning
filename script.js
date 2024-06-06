// api key
const apiKey = "gJakgxcvj5jVPt_fOIvGGCePqBEcURXODAWU9isGH4w";

// hämta hem alla element
const formEL = document.querySelector("form");
const inputEL = document.getElementById("search-input");
const searchResultEL = document.querySelector(".search-results");
const showMoreBtnEL = document.getElementById("show-more-btn");

let inputData = "";
let page = 1;

async function searchimages() {
  inputData = inputEL.value;

  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${apiKey}`;
  const response = await fetch(url);
  const data = await response.json();

  if (page === 1) {
    searchResultEL.innerHTML = "";
  }

  const results = data.results;
  console.log(results);

  results.map((result) => {
    const imageWrapper = document.createElement("div");
    imageWrapper.classList.add("search-result");
    const image = document.createElement("img");
    image.src = result.urls.small;
    image.alt = result.alt_description;
    const imageLink = document.createElement("a");
    imageLink.href = result.links.html;
    imageLink.target = "_blank";
    imageLink.textContent = result.alt_description;

    imageWrapper.appendChild(image);
    imageWrapper.appendChild(imageLink);
    searchResultEL.appendChild(imageWrapper);
  });
  page++;
  console.log(page);
  if (page > 1) {
    showMoreBtnEL.style.display = "block";
  }
}

formEL.addEventListener("submit", (event) => {
  event.preventDefault();
  page = 1;
  searchimages();
});

showMoreBtnEL.addEventListener("click", () => {
  searchimages();
});
