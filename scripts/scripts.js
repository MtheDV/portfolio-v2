/* scripts for use in website
 * created by mathew de vin
 */

///////////////////////////////////////
//////////////// GSAP /////////////////
///////////////////////////////////////
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(TextPlugin);
gsap.registerPlugin(ScrollToPlugin);

let timelineMain = new TimelineMax({paused: true});

ScrollTrigger.defaults({
  toggleActions: "restart none none reverse",
  markers: false
});

window.onload = () => {
  document.querySelector(".loading").style.position = "absolute";

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
  });
  gsap.to(".parallax__element--circular-text-large", {
    rotation: -360,
    repeat: -1,
    duration: 25,
    ease: "none"
  });

  new ScrollTrigger({
    trigger: ".parallax",
    start: "bottom+=10 bottom",
    end: "bottom+=20 bottom",
    onEnter: () => {
      if (window.scrollY <= window.innerHeight + 30) {
        gsap.to(window, {
          duration: 6,
          scrollTo: {
            y: "#about", offsetY: 300, autoKill: true
          },
          ease: CustomEase.create("custom", "M0,0 C0.194,0.214 0.272,0.338 0.424,0.39 0.603,0.451 0.714,0.768 1,1 ")
        });
      }
    }
  });

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

  let projectArray = gsap.utils.toArray(".projects__element--group");
  projectArray.forEach(project => {
    ScrollTrigger.create({
      trigger: project,
      start: "top center",
      end: "bottom center",
      onEnter: self => {
        gsap.timeline().to(".project-title", {
          text: {
            value: project.id,
            delimiter: " "
          },
          duration: 0,
          ease: "none"
        }).to(".project-title", {
          opacity: 1,
          duration: 0.75,
          ease: "none"
        });
      },
      onEnterBack: self => {
        gsap.timeline().to(".project-title", {
          text: {
            value: project.id,
            delimiter: " "
          },
          duration: 0,
          ease: "none"
        }).to(".project-title", {
          opacity: 1,
          duration: 0.75,
          ease: "none"
        });
      },
      onLeave: self => {
        gsap.to(".project-title", {
          opacity: 0,
          duration: 0.25,
          ease: "none"
        });
      },
      onLeaveBack: self => {
        gsap.to(".project-title", {
          opacity: 0,
          duration: 0.25,
          ease: "none"
        });
      }
    });
  });

  let tProjects = new TimelineMax({
    scrollTrigger: {
      trigger: ".projects",
      start: "top center",
      end: "bottom-=300 center",
      snap: {
        snapTo: [0.11, 0.33, 0.56, 0.8, 1.0], duration: 0.25
      }
    }
  })

  timelineMain.add(t1, t2, t4, tProjects, tIntro, tAbout);
  document.querySelector("body").style.overflowY = "scroll";
  timelineMain.play();

  ///////////////////////////////////////
  ////////////// Parallax ///////////////
  ///////////////////////////////////////
  let parallaxElementsLanding = document.getElementsByClassName("parallax__element");

  function parallaxCalculate(height, width, mouseY, mouseX, speedX, speedY, xOffset, yOffset) {
    return [((((height - mouseY) / height * 100) - 50) * speedY) + yOffset,
      ((((width - mouseX) / width * 100) - 50) * speedX) + xOffset];
  }

  function parallax(e, parallaxElements) {
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
        if (!parallaxElements[i].classList.contains("no-z-index-change"))
          parallaxElements[i].style.zIndex = (parallaxElements.length * -1 - i).toString();
      }
    }
  }

  window.addEventListener("mousemove", (e) => {
    if (window.innerWidth >= 1100)
      parallax(e, parallaxElementsLanding);
    //parallax(e, parallaxProjectGroup)
  });
  window.dispatchEvent(new Event("mousemove"));

  ///////////////////////////////////////
  //////////// HOVER SKEW ///////////////
  ///////////////////////////////////////
  function skew(e, ...skewAlongside) {
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

    for (let i = 0; i < skewAlongside.length; ++i) {
      skewAlongside[i].style["-webkit-transform"] = "rotateY(" + rotateY + "deg) rotateX(" + rotateX + "deg)";
      skewAlongside[i].style["-ms-transform"] = "rotateY(" + rotateY + "deg) rotateX(" + rotateX + "deg)";
      skewAlongside[i].style.transform = "rotateY(" + rotateY + "deg) rotateX(" + rotateX + "deg)";
    }
  }

  window.addEventListener("mousemove", (e) => {
    if (window.innerWidth >= 800)
      if (e.target.classList.contains("projects__element--image")) {
        skew(e);
      }
  });

  ///////////////////////////////////////
  /////////// Project View //////////////
  ///////////////////////////////////////
  let scrollBooster = new ScrollBooster({
    viewport: document.querySelector(".project-view"),
    content: document.querySelector(".project-view__project"),
    scrollMode: "transform",
    direction: "horizontal",
  });

  let projectView = document.getElementsByClassName("project-view__project");
  let projectsGroup = document.getElementsByClassName("projects__element--group");
  let exitProjectButton = document.querySelector(".project-view__exit");
  let projectViewOverall = document.querySelector(".project-view");
  let projectViewLinks = document.getElementsByClassName("project-view__link");
  let body = document.querySelector("body");

  const hideProjectView = () => {
    projectViewOverall.style.display = "none";
    body.style.overflowY = "scroll";
    for (let j = 0; j < projectView.length; ++j) {
      projectView[j].style.display = "none";
    }
  }

  exitProjectButton.onclick = () => hideProjectView();
  exitProjectButton.ontouchstart = () => hideProjectView();

  for (let i = 0; i < projectViewLinks.length; ++i) {
    projectViewLinks[i].ontouchstart = () => {
      window.open(projectViewLinks[i].href, "_blank");
    }
  }

  const displayProjectView = (i) => {
    hideProjectView();
    body.style.overflowY = "hidden";
    projectViewOverall.style.display = "grid";
    projectViewOverall.style.pointerEvents = "all";
    projectView[i].style.display = "flex";
    scrollBooster.updateOptions({content: projectView[i]})
    scrollBooster.updateMetrics();
  }

  for (let i = 0; i < projectView.length; ++i) {
    projectsGroup[i].onclick = () => {
      displayProjectView(i);
    }
    projectsGroup[i].ontouchstart = () => {
      displayProjectView(i);
    }
  }

  let dragProjectText = document.querySelector(".project-view__drag-text");

  window.addEventListener("mousemove", (e) => {
    if (window.innerWidth >= 800) {
      dragProjectText.style.top = e.clientY + "px";
      dragProjectText.style.left = e.clientX + "px";
    }
  });
}