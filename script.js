let active = -1, x = -1, y = -1;
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

  imgArray.forEach(img => {
    let imgObj = document.createElement("img");
    imgObj.src = img;
  });

  document.querySelector("#menu-projects").addEventListener("click", (e) => {
    document.querySelector("#projects").scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
    history.pushState("", "", "/#projects");
  });

  document.querySelector("#menu-people").addEventListener("click", (e) => {
    document.querySelector("#people").scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
    history.pushState("", "", "/#people");
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
  
  let t = Math.random() * 0.9;
  let l = Math.random();
  
  while(Math.pow(t - y, 2) + Math.pow(l - x, 2) < 0.3) {
    t = Math.random() * 0.9;
    l = Math.random();
  }
  
  x = l;
  y = t;

  gallery.style.backgroundImage = `url("${imgArray[active]}")`
  gallery.style.top = Math.floor(y * (h - hg)) + "px";
  gallery.style.left = Math.floor(x * (w - wg)) + "px";

  gallery.classList.add("active");
  activeGallery = activeGallery === "A" ? "B" : "A";
  document.querySelector(`#gallery-${activeGallery}`).classList.remove("active");
}

const open = (ele) => {
  ele.classList.add("open");
  ele.querySelector(".project-open").innerHTML = "close";
  ele.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  history.pushState("", "", `#${ele.id}`);
}

const close = (ele) => {
  ele.classList.remove("open");
  ele.querySelector(".project-open").innerHTML = "read more";
}