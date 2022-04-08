let active = -1;
let activeGallery = "A";
const imgArray = [
  "assets/shape-haptics-1.jpg",
  "assets/sensing-kirigami-1.jpg",
  "assets/sensing-kirigami-2.jpg",
  "assets/ppm-1.jpg",
  "assets/mechamagnets-1.jpg",
  "assets/joinery-1.jpg",
];

window.onload = () => {
  setTimeout(() => {
    loadImage();
    setInterval(() => {
      loadImage();
    }, 10000);
  }, 6000);
}

const loadImage = () => {
  const gallery = document.querySelector(`#gallery-${activeGallery}`);

  let randomVal = Math.floor(Math.random() * imgArray.length);
  while(randomVal === active) {
    randomVal = Math.floor(Math.random() * imgArray.length);
  }
  active = randomVal;

  const w = document.querySelector(`#gallery`).offsetWidth;
  const h = document.querySelector(`#gallery`).offsetHeight;
  const wg = gallery.offsetWidth;
  const hg = gallery.offsetHeight;

  const top = Math.floor(Math.random() * (h - hg));
  let l = Math.random();
  l = l < 0.5 ? 0.05 + l * 0.2 : 0.95 - 0.2 * (1 - l);
  const left = Math.floor(l * (w - wg));

  gallery.style.backgroundImage = `url("${imgArray[active]}")`
  gallery.style.top = top + "px";
  gallery.style.left = left + "px";

  gallery.classList.add("active");
  activeGallery = activeGallery === "A" ? "B" : "A";
  document.querySelector(`#gallery-${activeGallery}`).classList.remove("active");
}