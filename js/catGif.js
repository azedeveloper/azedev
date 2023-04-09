const catGifElement = document.getElementById("cat-gif");
const loaderElement = document.querySelector(".loader");

async function fetchRandomCatGif() {
  const response = await fetch("https://api.thecatapi.com/v1/images/search?mime_types=gif");
  const data = await response.json();
  const catGifUrl = data[0].url;
  catGifElement.src = catGifUrl;
}

catGifElement.addEventListener("load", () => {
  loaderElement.style.display = "none";
});

fetchRandomCatGif();
setInterval(fetchRandomCatGif, 3000); // Change the cat gif every 3 seconds
