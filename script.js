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

  document.querySelector("#menu-projects").addEventListener("click", (e) => {
    document.querySelector("#projects").scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  });

  document.querySelector("#menu-people").addEventListener("click", (e) => {
    document.querySelector("#people").scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  });

  document.querySelectorAll(".project").forEach((p) => {
    p.addEventListener("click", (e) => {
      if (!p.classList.contains("open")) {
        open(p);
      }
      e.stopPropagation();
    });

    let openEle = p.querySelector(".project-open");
    openEle.addEventListener("click", (e) => {
      e.stopPropagation();
      if (p.classList.contains("open")) {
        close(p);
      } else {
        open(p);
      }
    });
  });
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

  const top = Math.floor(Math.random() * 0.75 * (h - hg));
  let l = Math.random();
  // l = l < 0.5 ? 0.05 + l * 0.2 : 0.95 - 0.2 * (1 - l);
  const left = Math.floor(l * (w - wg));

  gallery.style.backgroundImage = `url("${imgArray[active]}")`
  gallery.style.top = top + "px";
  gallery.style.left = left + "px";

  gallery.classList.add("active");
  activeGallery = activeGallery === "A" ? "B" : "A";
  document.querySelector(`#gallery-${activeGallery}`).classList.remove("active");
}

const open = (ele) => {
  ele.classList.add("open");
  ele.querySelector(".project-open").innerHTML = "close";
  ele.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
}

const close = (ele) => {
  ele.classList.remove("open");
  ele.querySelector(".project-open").innerHTML = "read more";
}