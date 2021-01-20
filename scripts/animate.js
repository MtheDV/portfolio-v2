gsap.registerPlugin(ScrollTrigger);

let timelineMain = new TimelineMax({paused: true}),
    t1 = new TimelineMax(),
    t2 = new TimelineMax();

t1.to(".loading__bg", {
  width: "14rem",
  height: "14rem",
  borderRadius: "50%",
  duration: 2
});

t2.to(".name_page__name", {
  scrollTrigger: {
    trigger: ".name_page__name",
    start: "29% 29%",
    end: "-200% -450%",
    scrub: true,
    pin: true
  },
  left: "-400rem",
  ease: "none",
  duration: 5
})
  // .to(".name_page__name", {
  //   opacity: 0,
  //   ease: "none",
  //   duration: 2
  // })

timelineMain.add([t1, t2]);

window.onload = () => {
  timelineMain.play();
}