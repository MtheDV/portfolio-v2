/* IMPORTS */
import {homeFunctions, destroyHomeFunctions} from "./scripts.js";
import {projectFunctions, destroyProjectFunctions} from "./project.js";

/* GSAP */
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(TextPlugin);

ScrollTrigger.defaults({
  toggleActions: "restart none none reverse",
  markers: false
});

gsap.timeline().to(".loading__screen", {
  opacity: 0,
  duration: 1,
  ease: "none"
}).to("main", {
  opacity: 1,
  duration: 1,
  ease: "none"
});

/* SWUP */
const options = [
  {
    from: '(.*)',
    to: '(.*)',
    in: function (next) {
      document.querySelector('#swup').style.opacity = 0;
      gsap.to(document.querySelector('#swup'), {
        opacity: 1,
        delay: 0.5,
        duration: 0.5,
        onComplete: next
      });
    },
    out: (next) => {
      document.querySelector('#swup').style.opacity = 1;
      gsap.to(document.querySelector('#swup'), {
        opacity: 0,
        duration: 0.5,
        onComplete: next
      });
    }
  }
];

const swup = new Swup({
  animateHistoryBrowsing: true,
  plugins: [
    new SwupJsPlugin(options),
    new SwupScrollPlugin({
      animateScroll: false
    })
  ]
});

let scrollValues = {};

swup.on('clickLink', () => {
  scrollValues[window.location.href] = window.scrollY;
});

swup.on('contentReplaced', () => {
  setTimeout(function () {
    window.scrollTo(0, scrollValues[window.location.href]);
  }, 100);
});

window.onload = () => {
  homeFunctions();
  projectFunctions();
}

swup.on('contentReplaced', () => {
  if (document.getElementById("swup").dataset.type === "home")
    homeFunctions();
  if (document.getElementById("swup").dataset.type === "project")
    projectFunctions();
});

swup.on('willReplaceContent', () => {
  destroyHomeFunctions();
  destroyProjectFunctions();
})