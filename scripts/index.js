/*function pageTransitionIn() {
  return gsap.fromTo("div.loader",
    {
      rotation: 10,
      scaleX: 0,
      xPercent: -5
    },
    {
      duration: 0.8,
      xPercent: 0,
      scaleX: 1,
      rotation: 0,
      ease: "power4.inOut",
      transformOrigin: "left center"
    });
}
function pageTransitionOut() {
  return gsap.to("div.loader", {
    duration: 0.8,
    scaleX: 0,
    xPercent: 5,
    rotation: -10,
    ease: "power4.inOut",
    transformOrigin: "right, center"
  });
}

gsap.set("div.loader", {
  scaleX: 0,
  rotation: 10,
  xPercent: -5,
  yPercent: -50,
  transformOrigin: 'left center',
  autoAlpha: 1
})

// barba.init({
//   sync: true,
//   transition: [{
//     async leave(data) {
//       console.log("leave");
//       await pageTransitionIn();
//     },
//     enter(data) {
//       console.log("enter");
//       pageTransitionOut();
//     }
//   }]
// })
barba.init({
  transitions: [{
    name: 'opacity-transition',
    leave(data) {
      return gsap.to(data.current.container, {
        opacity: 0
      });
    },
    enter(data) {
      return gsap.from(data.next.container, {
        opacity: 0
      });
    }
  }]
});

*/

function delay(n) {
  n = n || 2000;
  return new Promise((done) => {
    setTimeout(() => {
      done();
    }, n);
  });
}

function pageTransition() {
  let timeline = gsap.timeline();
  timeline.to(".loader", {
    duration: 1.2,
    width: "100%",
    left: "0%",
    ease: "Expo.easeInOut"
  });
  timeline.to(".loader", {
    duration: 1,
    width: "100%",
    left: "100%",
    ease: "Expo.easeInOut",
    delay: 0.3
  });
  timeline.set(".loader", { left: "-100%" })
}

// barba.init({
//   sync: true,
//
//   transitions: [{
//     async leave(data) {
//       const done = this.async();
//
//       pageTransition();
//       await delay(1000);
//       done();
//     }
//   }]
// })
barba.init({
  transitions: [{
    name: 'opacity-transition',
    leave(data) {
      return gsap.to(data.current.container, {
        opacity: 0
      });
    },
    enter(data) {
      return gsap.from(data.next.container, {
        opacity: 0
      });
    }
  }]
});
barba.hooks.before(() => {
  document.querySelector("html").classList.add("is-transition");
})
barba.hooks.after(() => {
  document.querySelector("html").classList.remove("is-transition");
})