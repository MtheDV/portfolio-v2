gsap.registerPlugin(ScrollTrigger);

let timelineMain = new TimelineMax({paused: true});

ScrollTrigger.defaults({
  toggleActions: "restart none none reverse",
  markers: true
});

let t1 = new TimelineMax();

t1.to(".loading__bg", {
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

let t2 = new TimelineMax({
  scrollTrigger: {
    trigger: ".name_page__name",
    start: "center center",
    end: "center center",
    id: "name--scroll"
  }
});

t2.to(".name_page__name", {
  x: "-400rem",
  ease: "none",
  duration: 0.75
}).to(".nav__element--name", {
  opacity: 1,
  duration: 0.75
}).to(".links__element--about-img", {
  scale: 1,
  duration: 0.25
});

let t3 = new TimelineMax({
  scrollTrigger: {
    trigger: ".about__element",
    start: "center bottom",
    end: "center top+=100",
    scrub: true,
    id: "about--logos"
  }
});

t3.to(".logo__element", {
  opacity: 1,
  stagger: 1
});

let t4 = new TimelineMax({
  scrollTrigger: {
    trigger: ".projects",
    start: "top+=300 bottom",
    end: "top+=300 bottom"
  }
});

t4.to(".links__element--about-img", {
  y: "+=2rem",
  duration: 0.5
})

// let t4 = new TimelineMax({
//   scrollTrigger: {
//     trigger: ".final",
//     start: "top center",
//     end: "top center",
//     id: "final",
//     scrub: true
//   }
// });
//
// t4.to(".logo__element--self", {
//   position: "absolute",
//   x: 350,
//   y: 200,
//   width: "75rem",
//   duration: 2
// })

//
// gsap.utils.toArray(".project__element").forEach((panel, i) => {
//   ScrollTrigger.create({
//     trigger: panel,
//     start: "top top",
//     pin: true,
//     pinSpacing: false
//   })
// })

//timelineMain.add([t1, time, t2, t3]);

window.onload = () => {
  timelineMain.play();
}