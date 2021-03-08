/* scripts for use in website
 * created by mathew de vin
 */
import {commonAnimations, killCommonAnimations} from "./common.js";

/* SKEW */
// potential refactor so that events can be added to the images instead of the window
const skew = (e, ...skewAlongside) => {
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

const skewListener = (e) => {
  if (e.target.classList.contains("projects__image")) {
    skew(e);
  }
}

const addSkew = () => {
  window.addEventListener("mousemove", skewListener);
}

const removeSkew = () => {
  window.removeEventListener("mousemove", skewListener);
}

function homeFunctions() {
  commonAnimations();

  gsap.from(".intro", {
    opacity: 0,
    duration: 1.5,
    ease: "none"
  });

  addSkew();

  let projectTitles = document.querySelectorAll(".projects__title");
  let projects = document.querySelectorAll(".projects__group");
  projects.forEach((project, index) => {
    gsap.timeline({
      scrollTrigger: {
        trigger: project,
        start: "center bottom",
        end: "center top"
      }
    }).from(project, {
      yPercent: 20,
      opacity: 0,
      duration: 0.5,
      ease: "none"
    }).from(projectTitles.item(index), {
      yPercent: -20,
      opacity: 0,
      duration: 0.5,
      ease: "none"
    })

    project.addEventListener("mouseover", () => {
      gsap.to(projectTitles.item(index), {
        color: "#4173FD",
        duration: 0.15,
        ease: "none"
      });
    });
    project.addEventListener("mouseleave", () => {
      gsap.to(projectTitles.item(index), {
        color: "#191919",
        duration: 0.15,
        ease: "none"
      });
    })
  });
}

function destroyHomeFunctions() {
  removeSkew();
  killCommonAnimations();
}

export {
  homeFunctions,
  destroyHomeFunctions
};