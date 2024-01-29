// Add Option's

let theInterval,
  backgroundOption = true;

// Save To LocalStorage

const pageColor = window.localStorage.getItem("pageColor");
const pageBackground = window.localStorage.getItem("pageBackground");
const pageBulltes = window.localStorage.getItem("pageBulltes");

if (pageColor != null) {
  document.body.style.setProperty("--mainColor", pageColor);

  document.querySelectorAll(".color-list li").forEach((el) => {
    if (el.dataset.color === pageColor) {
      el.classList.add("active");
    } else {
      el.classList.remove("active");
    }
  });
}

if (pageBulltes != null) {
  document.querySelectorAll(".random-bulltes span").forEach((el) => {
    el.classList.remove("active");
  });
  if (pageBulltes === "Yes") {
    document.querySelector(".nav-bulltes").style.display = "block";
    document.querySelector(".random-bulltes .yes").classList.add("active");
  } else {
    document.querySelector(".nav-bulltes").style.display = "none";
    document.querySelector(".random-bulltes .no").classList.add("active");
  }
}

if (pageBackground != null) {
  document.querySelectorAll(".random-background span").forEach((span) => {
    span.classList.remove("active");

    if (pageBackground === "Yes") {
      backgroundOption = true;

      changeBackground();

      document.querySelector(".random-background .yes").classList.add("active");
    } else {
      backgroundOption = false;

      clearInterval(theInterval);

      document.querySelector(".random-background .no").classList.add("active");
    }
  });
}
// icon => Gear => Setting

document.querySelector(".icon i").onclick = function () {
  this.classList.add("fa-spin");
  document.querySelector(".setting-box").classList.toggle("show");
};

// mega-menu

const megaMenu = document.querySelector(".mega-menu");
const theLinks = document.querySelector(".links");

megaMenu.addEventListener("click", (e) => {
  e.stopPropagation();
  megaMenu.classList.toggle("active");
  theLinks.classList.toggle("show");
});

theLinks.addEventListener("click", (e) => {
  e.stopPropagation();
});

document.addEventListener("click", (e) => {
  if (e.target !== megaMenu) {
    if (theLinks.classList.contains("show")) {
      theLinks.classList.remove("show");
      megaMenu.classList.remove("active");
    }
  }
});

// RandomBG

let theSpans = document.querySelectorAll(".random-background span");
let theBulltes = document.querySelectorAll(".random-bulltes span");

theBulltes.forEach((el) => {
  el.addEventListener("click", (e) => {
    removeAddActive(e);

    if (e.target.dataset.bulltes === "Yes") {
      document.querySelector(".nav-bulltes").style.display = "block";
      window.localStorage.setItem("pageBulltes", "Yes");
    } else {
      document.querySelector(".nav-bulltes").style.display = "none";
      window.localStorage.setItem("pageBulltes", "No");
    }
  });
});

theSpans.forEach((span) => {
  span.addEventListener("click", (e) => {
    removeAddActive(e);

    if (e.target.dataset.background === "Yes") {
      backgroundOption = true;
      changeBackground();
      window.localStorage.setItem("pageBackground", "Yes");
    } else {
      backgroundOption = false;
      clearInterval(theInterval);
      window.localStorage.setItem("pageBackground", "No");
    }
  });
});

// Bulltes => Color's

let theLis = Array.from(document.querySelectorAll(".color-list li"));

theLis.forEach((li) => {
  li.addEventListener("click", (e) => {
    removeAddActive(e);

    // Change Main Color On CSS

    document.body.style.setProperty("--mainColor", e.target.dataset.color);

    // Save To LocalStorage

    window.localStorage.setItem("pageColor", e.target.dataset.color);
  });
});

// Change Background

const theApp = document.querySelector(".app");

let theImages = ["1.jpg", "2.jpg", "3.jpg", "4.jpg"];

function changeBackground() {
  if (backgroundOption === true) {
    theInterval = setInterval(() => {
      // Get Radnom Number

      let theRandom = Math.floor(Math.random() * theImages.length);

      theApp.style.backgroundImage =
        'url("image/' + theImages[theRandom] + '")';
    }, 2000);
  }
}
changeBackground();

// Skills Section

const skSection = document.querySelector(".skills");
const spanProgress = document.querySelectorAll(".progress span");

window.onscroll = function () {
  if (window.scrollY >= skSection.offsetTop - 100) {
    spanProgress.forEach((span) => {
      span.style.width = span.dataset.width;
    });
  }
};

// Start Gallery

let secGalleryImg = document.querySelectorAll(".gallery .content .image img");

secGalleryImg.forEach((img) => {
  img.addEventListener("click", (e) => {
    document.body.style.overflow = "hidden";

    // Create Div => Parent

    let myParentDiv = document.createElement("div");

    myParentDiv.className = "lighthouse";

    let divOverLay = document.createElement("div");

    divOverLay.className = "overlay";

    myParentDiv.appendChild(divOverLay);

    // Container of Text && Img

    let myBox = document.createElement("div");

    myBox.className = "box";

    // The Text

    let theHeading = document.createElement("h3");

    theHeading.appendChild(document.createTextNode(img.alt));

    myBox.appendChild(theHeading);

    // Create Img

    let theImg = document.createElement("img");

    theImg.src = img.src;

    myBox.appendChild(theImg);

    // Close Button

    let closeButton = document.createElement("span");

    closeButton.className = "close";

    closeButton.appendChild(document.createTextNode("X"));

    myBox.appendChild(closeButton);

    myParentDiv.appendChild(myBox);

    document.body.appendChild(myParentDiv);
  });
});

document.addEventListener("click", (e) => {
  if (e.target.className === "close") {
    document.querySelector(".lighthouse").remove();
    document.body.style.overflow = "auto";
  }
});

// The Bullte's

let navLinks = document.querySelectorAll(".nav-bulltes .bulltes");
const ourLinks = document.querySelectorAll(".links li a");

movingLinks(navLinks);
movingLinks(ourLinks);

function movingLinks(navLink) {
  navLink.forEach((el) => {
    el.addEventListener("click", (e) => {
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}

function removeAddActive(el) {
  el.target.parentElement.querySelectorAll(".active").forEach((el) => {
    el.classList.remove("active");
  });

  el.target.classList.add("active");
}

const settingBox = document.querySelector(".setting-box");

window.addEventListener("scroll", (e) => {
  if (window.scrollY != settingBox) {
    settingBox.classList.remove("show");
    document.querySelector(".icon i").classList.remove("fa-spin");
  }
});
