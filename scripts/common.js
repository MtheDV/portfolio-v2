/* scripts for use in website
 * created by mathew de vin
 */

export function commonAnimations() {
  gsap.to(".star", {
    rotate: 360,
    duration: 10,
    repeat: -1,
    ease: "none"
  });
}

export function killCommonAnimations() {
  gsap.killTweensOf(".star");
}

// TODO: remove all common animations in the timeline so that nothing goes crazy when loading into new swup page