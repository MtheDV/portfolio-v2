/* scripts for use in website
 * created by mathew de vin
 */
import {commonAnimations, killCommonAnimations} from "./common.js";

function projectFunctions() {
  commonAnimations();

  document.querySelectorAll(".arrow").forEach(arrow => {
    arrow.addEventListener("mouseover", (e) => {
      gsap.to(e.target, {
        x: 20,
        duration: 0.1,
        ease: "none",
        repeat: 1,
        yoyo: true
      });
    });
  });

  let projectImages = document.querySelectorAll(".project-view__image")
  projectImages.forEach(image => {
    gsap.timeline({
      scrollTrigger: {
        trigger: image,
        start: "top bottom",
        end: "bottom top"
      }
    }).from(image, {
      yPercent: 20,
      opacity: 0,
      duration: 0.5,
      ease: "none"
    });
  })
}

function destroyProjectFunctions() {
  killCommonAnimations();
}

export {
  projectFunctions,
  destroyProjectFunctions
};