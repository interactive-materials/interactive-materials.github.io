let active = -1, x = -1, y = -1;
let activeGallery = "A";
const BREAK_WIDTH = 0;

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
    document.querySelector("#logo-img").src = "/assets/logo.svg";
    loadImage();
    setInterval(() => {
      loadImage();
    }, 10000);
  }, 6000);

  imgArray.forEach(img => {
    let imgObj = document.createElement("img");
    imgObj.onload = () => {
    }
    imgObj.src = img;
  });
  
  document.querySelector("#gallery").style.height = document.querySelector("#start").offsetHeight + "px";
  window.addEventListener("resize", (e) => {
    document.querySelector("#gallery").style.height = document.querySelector("#start").offsetHeight + "px";
  });

  document.querySelector("#menu-projects").addEventListener("click", (e) => {
    if (document.querySelector(".open")) close(document.querySelector(".open"), true); 
    // document.querySelector("#projects").scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
    // history.pushState("", "", "#projects");
  });

  document.querySelector("#menu-people").addEventListener("click", (e) => {
    if (document.querySelector(".open")) close(document.querySelector(".open"), true); 
    // document.querySelector("#people").scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
    // history.pushState("", "", "#people");
  });

  document.querySelectorAll(".project").forEach((p) => {
    p.style.order = 1;
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

  loadUrl(window.location.href);
}

window.addEventListener("popstate", (e) => {
  loadUrl(window.location.href);
});

const loadUrl = (url) => {
  url = url.split("/");
  if (url.length > 1) {
    let id = url.at(-1);
    id = id.split("#");
    let ele = document.querySelector(`#${id.at(-1)}`);
    console.log(id);
    if (ele) {
      if (ele.classList.contains("project")) {
        open(ele, true);
      } else {
        if (document.querySelector(".project.open")) close(document.querySelector(".project.open"));
        ele.scrollIntoView({behavior: "auto", block: "start", inline: "nearest"});
      }
    } 
  }
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

const open = (ele, back) => {
  if (document.querySelector(".open")) close(document.querySelector(".open"), true); 
  ele.classList.add("open");
  if (window.innerWidth > BREAK_WIDTH) ele.style.order = -1;
  ele.querySelector(".project-open").innerHTML = "close &#x2715;";
  ele.scrollIntoView({behavior: "auto", block: "start", inline: "nearest"});
  if (!back) history.pushState("", "", `#${ele.id}`);
}

const close = (ele, open) => {
  ele.classList.remove("open");
  ele.style.order = 1;
  ele.querySelector(".project-open").innerHTML = "";
  if (!open) {
    history.pushState("", "", `#projects`);
    setTimeout(() => {
      document.querySelector("#projects").scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
    }, 150);
  }
}