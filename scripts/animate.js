gsap.registerPlugin(ScrollTrigger);

let timelineMain = new TimelineMax({paused: true}),
    t1 = new TimelineMax();

t1.to(".loading__bg", {
  width: "14rem",
  height: "14rem",
  borderRadius: "50%",
  duration: 2,
});

timelineMain.add([t1]);

window.onload = () => {
  timelineMain.play();
}