/* scripts for use in website
 * created by mathew de vin
 */
let pageScroll = 0;
let page = "home";

// BARBA //
barba.init({
  transitions: [{
    name: 'opacity-transition',
    leave(data) {
      if (data.current.namespace === "home")
        pageScroll = window.scrollY;
      return gsap.to(data.current.container, {
        opacity: 0
      });
    },
    beforeEnter(data) {
      if (data.next.namespace === "projects") {
        page = "projects";
        window.scrollTo(0, 0);
      } else if (data.next.namespace === "home") {
        page = "home";
        window.scrollTo(0, pageScroll);
      }
    },
    enter(data) {
      return gsap.from(data.next.container, {
        opacity: 0
      });
    }
  }]
});

barba.hooks.afterEnter(() => {
  ///////////////////////////////////////
  //////////////// GSAP /////////////////
  ///////////////////////////////////////
  gsap.registerPlugin(ScrollTrigger);
  gsap.registerPlugin(TextPlugin);

  let timelineMain = new TimelineMax({paused: true});

  ScrollTrigger.defaults({
    toggleActions: "restart none none reverse",
    markers: false
  });

  if (page === "home") {
    let t1 = new TimelineMax()
      .to(".loading__bg", {
        width: "14rem",
        height: "14rem",
        borderRadius: "50%",
        duration: 1
      });

    gsap.to(".parallax__element--circular-text-small", {
      rotation: 360,
      repeat: -1,
      duration: 20,
      ease: "none"
    })
    gsap.to(".parallax__element--circular-text-large", {
      rotation: -360,
      repeat: -1,
      duration: 25,
      ease: "none"
    })

    let tIntro = new TimelineMax({
      scrollTrigger: {
        trigger: ".intro__content",
        start: "center center",
        end: "center top-=500",
        scrub: true,
        pin: true
      }
    }).to(".intro__element--hide", {
      opacity: 0,
      delay: 2
    }).to(".intro__element--name", {
      opacity: 0,
      delay: 3
    });

    let t2 = new TimelineMax({
      scrollTrigger: {
        trigger: ".about",
        start: "top-=800 center",
        end: "top-=800 center-=700",
        scrub: true
      }
    }).to(".nav__element--name", {
      opacity: 1,
      duration: 0.75
    }).to(".links__element", {
      opacity: 1,
      stagger: 1
    }).to(".links__element--about-img", {
      scale: 1,
      duration: 0.25
    }).to(".logo__element", {
      opacity: 1,
      stagger: 1,
      delay: 3
    });

    let tAbout = new TimelineMax({
      repeat: -1,
      repeatDelay: 0.25,
      ease: "none",
    }).to(".img-1", {
      display: "block"
    }).to(".img-1", {
      display: "none"
    }).to(".img-2", {
      display: "block"
    }).to(".img-2", {
      display: "none"
    }).to(".img-3", {
      display: "block"
    }).to(".img-3", {
      display: "none"
    }).to(".img-4", {
      display: "block"
    });

    let t4 = new TimelineMax({
      scrollTrigger: {
        trigger: ".about",
        start: "top+=300 bottom",
        end: `top+=300 bottom-=${document.querySelector(".projects").offsetHeight * 1.8 + document.querySelector(".about").offsetHeight} + 500`,
        scrub: true
      }
    }).to(".links__element--about-img", {
      y: "+=2rem",
      duration: 15
    }).to(".links__element--about-img", {
      y: "+=2rem",
      marginLeft: "+=0.5rem",
      duration: 30
    });

    let tProjects = new TimelineMax({
      scrollTrigger: {
        trigger: ".projects__element--titles",
        start: "center center",
        end: `center bottom-=${document.querySelector(".projects").offsetHeight * 1.7}`,// + document.querySelector(".footer").offsetHeight}`,
        scrub: true,
        pin: true
      }
    }).to(".projects__element--title", {
      delay: 1,
      text: "rock paper scissors____",
      ease: "none"
    }).to(".projects__element--title", {
      delay: 1,
      text: "ecommerce website___",
      ease: "none"
    }).to(".projects__element--title", {
      delay: 1,
      text: "exodus_____________",
      ease: "none"
    }).to(".projects__element--title", {
      delay: 1,
      text: "logo collection_______",
      ease: "none"
    });

    gsap.to(".projects__element--title", {
      xPercent: "-=100",
      duration: 10,
      repeat: -1,
      ease: "none"
    });

    timelineMain.add(t1, t2, t4, tProjects, tIntro, tAbout);
  } else if (page === "projects") {
    let t5 = new TimelineMax({
      scrollTrigger: {
        trigger: ".project__large_title",
        start: "top bottom",
        end: "center top",
        scrub: 1
      }
    }).to(".project__large_title", {
      y: "-=1000",
      ease: "none"
    });
    timelineMain.add(t5);
  }

  window.onload = () => {
    timelineMain.play();
    document.querySelector("body").style.overflowY = "scroll";
  }

  if (page === "home") {
    ///////////////////////////////////////
    ////////////// Parallax ///////////////
    ///////////////////////////////////////
    let parallaxElements = document.getElementsByClassName("parallax__element");

    function parallaxCalculate(height, width, mouseY, mouseX, speedX, speedY, xOffset, yOffset) {
      return [((((height - mouseY) / height * 100) - 50) * speedY) + yOffset,
        ((((width - mouseX) / width * 100) - 50) * speedX) + xOffset];
    }

    function parallax(e) {
      let width = window.innerWidth;
      let height = window.innerHeight;
      let mouseX = e.clientX;
      let mouseY = e.clientY;

      if (mouseX == null && mouseY == null) {
        mouseX = width / 2;
        mouseY = height / 2;
      }

      if (width >= 450) {
        for (let i = 0; i < parallaxElements.length; ++i) {
          let idManipulates = parallaxElements[i].id;
          idManipulates = idManipulates.split("_");
          let parallaxCalc = parallaxCalculate(height, width, mouseY, mouseX,
            Number(idManipulates[0]), Number(idManipulates[1]),
            Number(idManipulates[2]), Number(idManipulates[3]));

          parallaxElements[i].style["-webkit-transform"] = "translate3d(" + (parallaxCalc[1]) + "vw," + (parallaxCalc[0]) + "vh, 0)";
          parallaxElements[i].style["-ms-transform"] = "translate3d(" + (parallaxCalc[1]) + "vw," + (parallaxCalc[0]) + "vh, 0)";
          parallaxElements[i].style.transform = "translate3d(" + (parallaxCalc[1]) + "vw," + (parallaxCalc[0]) + "vh, 0)";
          parallaxElements[i].style.zIndex = (parallaxElements.length - i).toString();
          // parallaxElements[i].style["-webkit-filter"] = "drop-shadow(0 0.25rem " + ((parallaxElements.length - i) / 8) + "rem rgba(0, 0, 0, 0.2))";
          // parallaxElements[i].style.filter = "drop-shadow(0 0.25rem " + ((parallaxElements.length - i) / 8) + "rem rgba(0, 0, 0, 0.2))";
        }
      }
    }

    window.addEventListener("mousemove", (e) => {
      if (window.innerWidth >= 1250)
        parallax(e);
    });
    window.dispatchEvent(new Event("mousemove"));

    ///////////////////////////////////////
    //////////// HOVER SKEW ///////////////
    ///////////////////////////////////////
    function skew(e) {
      let boundRect = e.target.getBoundingClientRect();
      let mouseX = e.clientX;
      let mouseY = e.clientY;
      let imageWidth = boundRect.width;
      let imageHeight = boundRect.height;
      let imageX = boundRect.x;
      let imageY = boundRect.y;

      let rotateY = -1 * ((imageX + imageWidth / 2) - mouseX) / imageWidth * 20;
      let rotateX = ((imageY + imageHeight / 2) - mouseY) / imageHeight * 20;

      e.target.style["-webkit-transform"] = "";
      e.target.style["-ms-transform"] = "";
      e.target.style.transform = "rotateY(" + rotateY + "deg) rotateX(" + rotateX + "deg)";
    }

    window.addEventListener("mousemove", (e) => {
      if (window.innerWidth >= 800)
        if (e.target.classList.contains("projects__element--image"))
          skew(e);
    });
  }

  if (page === "projects") {
    ///////////////////////////////////////
    /////////// PROJECTS PAGE /////////////
    ///////////////////////////////////////
    let backButton = document.getElementById("back-link");
    backButton.setAttribute("href", document.referrer);
    backButton.onclick = () => {
      history.back();
      // if (history.back() === undefined)
      //     window.location = "../index.html"
      return false;
    }
  }
});


/*
////////// HEADER BUTTONS /////////////
///////////////////////////////////////
let body = document.querySelector("body");
let hamburgerButton = document.querySelector(".hamburger");
let exitButton = document.querySelector(".exit_overlay");
let backToTopButton = document.querySelector(".return_top")
let headerButtons = document.querySelector(".header_buttons");

hamburgerButton.onclick = () => {
    headerButtons.style.display = "block";
    body.style.overflow = "hidden";
}
exitButton.onclick = () => {
    hideHeader();
}

let contactButton = document.querySelector(".button_contact");
let linkedinButton = document.querySelector(".button_linkedin");
let instagramButton = document.querySelector(".button_instagram");
let aboutButton = document.querySelector(".button_about");
let projectsButton = document.querySelector(".button_projects");
let githubButton = document.querySelector(".button_github")
let logo = document.querySelector(".logo");

let about = document.querySelector(".skills");
let projects = document.querySelector(".projects");
let contact = document.querySelector(".contact");

const openLink = function(link) {
    window.open(link);
}
const hideHeader = function() {
    if (window.innerWidth <= 450) {
        headerButtons.style.display = "none";
        body.style.overflow = "scroll";
    }
}

linkedinButton.onclick = () => openLink("https://www.linkedin.com/in/mathew-de-vin-705a8a198/");
instagramButton.onclick = () => openLink("https://www.instagram.com/mathew_dv/");
githubButton.onclick = () => openLink("https://github.com/MtheDV");

function _scrollTo(selector, yOffset = 0){
    const y = selector.getBoundingClientRect().top + window.pageYOffset + yOffset;

    window.scrollTo({top: y, behavior: 'smooth'});
}
aboutButton.onclick = () => {
    _scrollTo(about, -60);
    hideHeader();
}
contactButton.onclick = () => {
    _scrollTo(contact, -60);
    hideHeader();
}
projectsButton.onclick = () => {
    _scrollTo(projects, -60);
    hideHeader();
}
logo.onclick = () => {
    window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });
    hideHeader();
};
backToTopButton.onclick = () => {
    window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });
};

let exodusGit = document.querySelector(".exodus_git");
let exodusPlay = document.querySelector(".exodus_play");
let nececcGit = document.querySelector(".nececc_git");
let remarrkGit = document.querySelector(".remarrk_git");

exodusGit.onclick = () => {
    openLink("https://github.com/MtheDV/Exodus");
}
exodusPlay.onclick = () => {
    openLink("https://play.google.com/store/apps/details?id=com.platypi.exodus");
}
nececcGit.onclick = () => {
    openLink("https://github.com/MtheDV/ubco-cosc304-project")
}
remarrkGit.onclick = () => {
    openLink("https://github.com/JadenBalogh/remarrk")
}
///////////////////////////////////////


// SCROLL TO CHANGE PARALLAX OPACITY //
///////////////////////////////////////
window.addEventListener("scroll", () => {
    let scrollY = window.scrollY;
    let winHeight = window.innerHeight;
    // if (scrollY > winHeight/2)
    //     parallaxPage.style.opacity = "0.0";
    // else
    //     parallaxPage.style.opacity = "1.0";

    if (scrollY > winHeight/2)
        backToTopButton.style.opacity = "1.0";
    else
        backToTopButton.style.opacity = "0.0";
});
///////////////////////////////////////


///////// REMOVE FORM DATA ////////////
///////////////////////////////////////
if ( window.history.replaceState ) {
    window.history.replaceState( null, null, window.location.href );
}
///////////////////////////////////////

////// DEPRECATED GALLERY CODE ////////
///////////////////////////////////////
/*let projectsButton = document.querySelector(".button_projects");
let exitButton = document.querySelector(".gallery_exit");
let exitButtonMobile = document.querySelector(".gallery_exit_mobile");
let projectsPage = document.querySelector(".gallery");

let galleryMore = document.querySelector(".gallery_more");

function animateOutParallax() {
    parallaxPage.style.opacity = "0.5";
}

function animateOut(element) {
    element.style.opacity = "0.0";
    setTimeout(function() {
        element.style.display = "none";
    }, 350);
}
function animateIn(element, display) {
    element.style.display = display;
    setTimeout(function() {
        element.style.opacity = "1.0";
    }, 20);
}

projectsButton.onclick = function() {
    animateOutParallax();

    animateIn(projectsPage, "flex");
    pageType = 1;
}
exitButton.onclick = function() {
    animateOut(projectsPage);

    animateIn(parallaxPage, "block");
    pageType = 0;

    galleryMore.style.display = "none";
}
exitButtonMobile.onclick = function() {
    galleryMore.style.display = "none";
    for (let i = 0; i < galleryDetails.length; i++) {
        galleryDetails[i].style.display = "none";
    }

    exitButtonMobile.style.display = "none";
}

let galleryImages = document.getElementsByClassName("gallery_block");
let galleryDetails = document.getElementsByClassName("gallery_details");

window.addEventListener("click", function() {
    if (pageType == 1) {
        for (let i = 0; i < galleryImages.length; i++) {
            galleryImages[i].onclick = function() {
                if (galleryImages[i].classList.contains("link"))
                    window.location = galleryImages[i].id;
                else {
                    galleryDetails[i].style.display = "block";
                    galleryMore.style.display = "block";
                    for (let j = 0; j < galleryDetails.length; j++) {
                        if (j != i) {
                            galleryDetails[j].style.display = "none";
                        }
                    }
                    exitButtonMobile.style.display = "block";
                }
            }
        }
    }
});*/
///////////////////////////////////////
