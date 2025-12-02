const gallery = document.getElementById("gallery");
const loadMoreBtn = document.getElementById("btnLoad");
const clearBtn = document.getElementById("btnClear");
const removeLastBtn = document.getElementById("btnDeleteLast");
const reverseBtn = document.getElementById("btnReverse");

let allImages = []; 
let page = 1;       

async function fetchImages(count = 4) {
  try {
    const response = await fetch(
      `https://picsum.photos/v2/list?page=${page}&limit=100`
    );
    const data = await response.json();
    page++; 
    return data;
  } catch (error) {
    console.error("Помилка при завантаженні картинок:", error);
    return [];
  }
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function renderImages(images, count = 4) {
  shuffleArray(images); 
  const selectedImages = images.slice(0, count); 
  
  selectedImages.forEach((img) => {
    const imageElement = document.createElement("img");
    imageElement.src = img.download_url;
    imageElement.alt = img.author;
    gallery.appendChild(imageElement);
    allImages.push(imageElement);
  });
}

fetchImages().then((data) => renderImages(data));

loadMoreBtn.addEventListener("click", async () => {
  const data = await fetchImages();
  renderImages(data);
});

clearBtn.addEventListener("click", () => {
  gallery.innerHTML = "";
  allImages = [];
  page = 1; 
});

removeLastBtn.addEventListener("click", () => {
  const lastImage = allImages.pop();
  if (lastImage) gallery.removeChild(lastImage);
});

reverseBtn.addEventListener("click", () => {
  allImages.reverse();
  gallery.innerHTML = "";
  allImages.forEach((img) => gallery.appendChild(img));
});
