gsap.registerPlugin(ScrollTrigger);

let timeline = new TimelineMax({paused: true});

timeline.to(".loading__bg", {
  width: "14rem",
  height: "14rem",
  borderRadius: "50%",
  duration: 2,
  delay: 1
});

window.onload = () => {
  timeline.play();
}