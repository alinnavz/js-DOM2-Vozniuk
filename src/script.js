const gallery = document.getElementById("gallery");
const btnLoad = document.getElementById("btnLoad");
const btnClear = document.getElementById("btnClear");
const btnDeleteLast = document.getElementById("btnDeleteLast");
const btnReverse = document.getElementById("btnReverse");


let images = []; // список картинок з API
let index = 0; // поточна позиція в масиві


async function loadFromAPI() {
const response = await fetch("https://picsum.photos/v2/list?page=1&limit=100");
images = await response.json();
}


function addImages() {
for (let i = 0; i < 4; i++) {
if (index >= images.length) return;


const img = document.createElement("img");
img.src = images[index].download_url;
gallery.appendChild(img);
index++;
}
}


window.addEventListener("load", async () => {
await loadFromAPI();
addImages();
});


btnLoad.addEventListener("click", addImages);


btnClear.addEventListener("click", () => {
gallery.innerHTML = "";
index = 0;
});


btnDeleteLast.addEventListener("click", () => {
const last = gallery.lastElementChild;
if (last) last.remove();
});


btnReverse.addEventListener("click", () => {
const items = Array.from(gallery.children);
gallery.innerHTML = "";
for (let i = items.length - 1; i >= 0; i--) {
gallery.appendChild(items[i]);
}
});