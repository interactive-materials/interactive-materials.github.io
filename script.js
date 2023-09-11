let active = -1, x = -1, y = -1;
let activeGallery = 1;
const BREAK_WIDTH = 0;
let imageGalleryClicked = false;
let startDiv;
let startDivHeight = window.innerHeight;
let divSizeRatio = 1.2;
let pHeight = 0;

const imgArray = [
  "assets/shape-haptics-1.jpg",
  "assets/sensing-kirigami-1.jpg",
  "assets/sensing-kirigami-2.jpg",
  "assets/ppm-1.jpg",
  "assets/mechamagnets-1.jpg",
  "assets/ceramics-1.jpg",
];
const imgRand = imgArray.map((a, i) => ({random: Math.random(), index: i}));
imgRand.sort((a, b) => (a.random - b.random));

window.onload = () => {

  startDiv = document.querySelector("#start");
  startDivHeight = window.innerHeight;

  document.querySelector("#menu-projects").addEventListener("click", (e) => {
    e.stopImmediatePropagation();
    if (document.querySelector(".open")) close(document.querySelector(".open"), true);
    document.querySelector("#start").classList.remove("hide");
    document.querySelector("#projects").scrollIntoView(true);
    // setTimeout(() => {
    //   window.scrollTo(0, document.querySelector("#projects").getBoundingClientRect().y);
    // }, 50);
    // history.pushState("", "", "#projects");
  });

  document.querySelector("#menu-people").addEventListener("click", (e) => {
    e.stopImmediatePropagation();
    if (document.querySelector(".open")) close(document.querySelector(".open"), true);
    document.querySelector("#start").classList.remove("hide");
    document.querySelector("#people").scrollIntoView(true);
    // setTimeout(() => {
    //   window.scrollTo(0, document.querySelector("#people").getBoundingClientRect().y);
    // }, 50);
    // history.pushState("", "", "#people");
  });

  document.querySelector("#arrow").addEventListener("click", (e) => {
    document.querySelector("#projects").scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
  });

  document.querySelectorAll(".project").forEach((p) => {
    p.style.order = 1;
    p.addEventListener("click", (e) => {
      if (!p.classList.contains("open")) {
        open(p, false, true);
      }
      e.stopPropagation();
    });

    let openEle = p.querySelector(".project-open");
    openEle.addEventListener("click", (e) => {
      e.stopPropagation();
      if (p.classList.contains("open")) {
        close(p);
      } else {
        open(p, false);
      }
    });
  });

  document.querySelectorAll(".project-thumbnail").forEach((t) => {
    t.style.backgroundImage = `url("${t.dataset.bg}")`;
  });

  document.querySelectorAll(".image-gallery").forEach((g) => {
    g.querySelectorAll(".item").forEach((i) => {
      i.addEventListener("click", (e) => {
        if (g.querySelector(".item.active")) g.querySelector(".item.active").classList.remove("active");
        i.classList.add("active");
        imageGalleryClicked = true;
      });
    });
  });

  loadUrl(window.location.href, false);

  document.querySelector("#start-bg").style.backgroundImage = `url(${imgArray[Math.floor(Math.random() * imgArray.length)]})`;

  document.querySelector("#loading-projects").classList.add("hide");
  document.querySelector(".menu").classList.remove("hidden");
  document.querySelectorAll(".project").forEach((p) => {p.classList.add("loaded")});
}

window.addEventListener("popstate", (e) => {
  loadUrl(window.location.href, true);
});

const loadUrl = (url, back) => {
  url = url.split("/");
  if (url.length > 1) {
    let id = url.at(-1);
    id = id.split("#");
    if (id.length > 1) {
      let ele = document.querySelector(`#${id.at(-1)}`);
      console.log(id);
      if (ele) {
        if (ele.classList.contains("project")) {
          open(ele, back);
        } else {
          if (document.querySelector(".project.open")) close(document.querySelector(".project.open"));
          ele.scrollIntoView({behavior: "auto", block: "start", inline: "nearest"});
        }
      }
    } 
  }
}

const loadImage = () => {
  const gallery = document.querySelector(`#gallery-${activeGallery}`);

  active = (active + 1) % imgArray.length;

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

  gallery.style.backgroundImage = `url("${imgArray[imgRand[active].index]}")`
  gallery.style.top = Math.floor(y * (h - hg)) + "px";
  gallery.style.left = Math.floor(x * (w - wg)) + "px";

  gallery.classList.add("active");
  activeGallery = activeGallery === 1 ? 2 : 1;
  // activeGallery = activeGallery === 1 ? 2 : activeGallery === 2 ? 3 : 1;
  document.querySelector(`#gallery-${activeGallery}`).classList.remove("active");
}

const open = (ele, back, instant) => {
  document.querySelector("#start").classList.add("hide");
  if (document.querySelector(".open")) close(document.querySelector(".open"), true); 
  ele.classList.add("open");
  if (window.innerWidth > BREAK_WIDTH) ele.style.order = -1;
  ele.querySelector(".project-open").innerHTML = "close &#x2715;";
  // if (instant) {
  //   ele.scrollIntoView({behavior: "auto", block: "start", inline: "nearest"});
  // } else {
  //   setTimeout(() => {ele.scrollIntoView({behavior: "auto", block: "start", inline: "nearest"});}, 150);
  // }
  window.scrollTo({top:0, left: 0, behavior:"instant"});
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