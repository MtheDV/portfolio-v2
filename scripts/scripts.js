/* scripts for use in website
 * created by mathew de vin
 */

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

window.onload = () => {
  let t1 = new TimelineMax()
    .to(".loading__circle", {
      opacity: 0,
      duration: 0.5,
      ease: "none"
    }).to(".loading__bg", {
      width: "14rem",
      height: "14rem",
      borderRadius: "50%",
      duration: 0.75,
      ease: "circ"
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
      end: `top+=300 bottom-=${document.querySelector(".projects").offsetHeight + document.querySelector(".about").offsetHeight} + 500`,
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
      end: `center center-=${document.querySelector(".projects").offsetHeight - 600}`,
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
  document.querySelector("body").style.overflowY = "scroll";
  timelineMain.play();

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

    e.target.style["-webkit-transform"] = "rotateY(" + rotateY + "deg) rotateX(" + rotateX + "deg)";
    e.target.style["-ms-transform"] = "rotateY(" + rotateY + "deg) rotateX(" + rotateX + "deg)";
    e.target.style.transform = "rotateY(" + rotateY + "deg) rotateX(" + rotateX + "deg)";
  }

  window.addEventListener("mousemove", (e) => {
    if (window.innerWidth >= 800)
      if (e.target.classList.contains("projects__element--image"))
        skew(e);
  });
}