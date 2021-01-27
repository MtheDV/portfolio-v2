/* scripts for use in website
 * created by mathew de vin
 */
let pageScroll = 0;

// BARBA //
barba.init({
    transitions: [{
        name: 'opacity-transition',
        leave(data) {
            if (data.current.namespace === "home")
                pageScroll = window.scrollY;
            return gsap.to(data.current.container, {
                opacity: 0
            });
        },
        beforeEnter(data) {
            console.log(data.next.namespace);
            console.log(pageScroll);
            if (data.next.namespace === "projects") {
                window.scrollTo(0, 0);
            } else if (data.next.namespace === "home") {
                //gsap.to(window, {duration: 0.25, scrollTo: pageScroll});
                window.scrollTo(0, pageScroll);
                //document.documentElement.scrollTop = pageScroll;
            }
        },
        enter(data) {
            return gsap.from(data.next.container, {
                opacity: 0
            });
        }
    }]
});

barba.hooks.afterEnter(() => {
    ///////////////////////////////////////
    //////////////// GSAP /////////////////
    ///////////////////////////////////////
    gsap.registerPlugin(ScrollTrigger);

    let timelineMain = new TimelineMax({paused: true});

    ScrollTrigger.defaults({
        toggleActions: "restart none none reverse",
        markers: false
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

    let tIntro = new TimelineMax({
        scrollTrigger: {
            trigger: ".intro__content",
            start: "center center",
            end: "center top-=500",
            id: "intro--scroll",
            scrub: true,
            pin: true
        }
    });

    tIntro.to(".intro__element--hide", {
        opacity: 0,
        delay: 2
    }).to(".intro__element--name", {
        opacity: 0,
        delay: 2
    });

    let t2 = new TimelineMax({
        scrollTrigger: {
            trigger: ".nav__element--name",
            start: "center center",
            end: "center center-=200",
            id: "name--scroll",
            scrub: true
        }
    });

    t2.to(".nav__element--name", {
        opacity: 1,
        duration: 0.75
    }).to(".links__element", {
        opacity: 1,
        stagger: 1
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
    });

    let t5 = new TimelineMax({
        scrollTrigger: {
            trigger: ".project__large_title",
            start: "top bottom",
            end: "center top",
            scrub: 1
        }
    });

    t5.to(".project__large_title", {
        y: "-=1000",
        ease: "none"
    });

    window.onload = () => {
        timelineMain.play();
    }

    ///////////////////////////////////////
    ////////////// Parallax ///////////////
    ///////////////////////////////////////
    let parallaxElements = document.getElementsByClassName("parallax__element");

    function parallaxCalculate(height, width, mouseY, mouseX, speedX, speedY, xOffset, yOffset) {
        return [((((height - mouseY) / height * 100) - 50) * speedY) + yOffset,
            ((((width - mouseX) / width * 100) - 50) * speedX) + xOffset];
    }

    function parallax(e) {
        let width = window.innerWidth;
        let height = window.innerHeight;
        let mouseX = e.clientX;
        let mouseY = e.clientY;

        if (mouseX == null && mouseY == null) {
            mouseX = width/2;
            mouseY = height/2;
        }

        if (width >= 450) {
            for (let i = 0; i < parallaxElements.length; ++i) {
                let idManipulates = parallaxElements[i].id;
                idManipulates = idManipulates.split("_");
                let parallaxCalc = parallaxCalculate(height, width, mouseY, mouseX,
                  Number(idManipulates[0]), Number(idManipulates[1]),
                  Number(idManipulates[2]), Number(idManipulates[3]));

                parallaxElements[i].style["-webkit-transform"] = "translate3d("+ (parallaxCalc[1]) + "vw," + (parallaxCalc[0]) + "vh, 0)";
                parallaxElements[i].style["-ms-transform"] = "translate3d("+ (parallaxCalc[1]) + "vw," + (parallaxCalc[0]) + "vh, 0)";
                parallaxElements[i].style.transform = "translate3d("+ (parallaxCalc[1]) + "vw," + (parallaxCalc[0]) + "vh, 0)";// scale(" + parallaxElements[i].style.scale + ")";
                parallaxElements[i].style.zIndex = (parallaxElements.length - i).toString();
                // parallaxElements[i].style["-webkit-filter"] = "drop-shadow(0 0.25rem " + ((parallaxElements.length - i) / 8) + "rem rgba(0, 0, 0, 0.2))";
                // parallaxElements[i].style.filter = "drop-shadow(0 0.25rem " + ((parallaxElements.length - i) / 8) + "rem rgba(0, 0, 0, 0.2))";
            }
        }
    }
    window.addEventListener("mousemove", (e) => {
        parallax(e);
    });
    window.dispatchEvent(new Event("mousemove"));

    ///////////////////////////////////////
    /////////// PROJECTS PAGE /////////////
    ///////////////////////////////////////
    let backButton = document.getElementById("back-link");
    backButton.setAttribute("href", document.referrer);
    backButton.onclick = () => {
        history.back();
        // if (history.back() === undefined)
        //     window.location = "../index.html"
        return false;
    }
});


/*
////////// HEADER BUTTONS /////////////
///////////////////////////////////////
let body = document.querySelector("body");
let hamburgerButton = document.querySelector(".hamburger");
let exitButton = document.querySelector(".exit_overlay");
let backToTopButton = document.querySelector(".return_top")
let headerButtons = document.querySelector(".header_buttons");

hamburgerButton.onclick = () => {
    headerButtons.style.display = "block";
    body.style.overflow = "hidden";
}
exitButton.onclick = () => {
    hideHeader();
}

let contactButton = document.querySelector(".button_contact");
let linkedinButton = document.querySelector(".button_linkedin");
let instagramButton = document.querySelector(".button_instagram");
let aboutButton = document.querySelector(".button_about");
let projectsButton = document.querySelector(".button_projects");
let githubButton = document.querySelector(".button_github")
let logo = document.querySelector(".logo");

let about = document.querySelector(".skills");
let projects = document.querySelector(".projects");
let contact = document.querySelector(".contact");

const openLink = function(link) {
    window.open(link);
}
const hideHeader = function() {
    if (window.innerWidth <= 450) {
        headerButtons.style.display = "none";
        body.style.overflow = "scroll";
    }
}

linkedinButton.onclick = () => openLink("https://www.linkedin.com/in/mathew-de-vin-705a8a198/");
instagramButton.onclick = () => openLink("https://www.instagram.com/mathew_dv/");
githubButton.onclick = () => openLink("https://github.com/MtheDV");

function _scrollTo(selector, yOffset = 0){
    const y = selector.getBoundingClientRect().top + window.pageYOffset + yOffset;

    window.scrollTo({top: y, behavior: 'smooth'});
}
aboutButton.onclick = () => {
    _scrollTo(about, -60);
    hideHeader();
}
contactButton.onclick = () => {
    _scrollTo(contact, -60);
    hideHeader();
}
projectsButton.onclick = () => {
    _scrollTo(projects, -60);
    hideHeader();
}
logo.onclick = () => {
    window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });
    hideHeader();
};
backToTopButton.onclick = () => {
    window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });
};

let exodusGit = document.querySelector(".exodus_git");
let exodusPlay = document.querySelector(".exodus_play");
let nececcGit = document.querySelector(".nececc_git");
let remarrkGit = document.querySelector(".remarrk_git");

exodusGit.onclick = () => {
    openLink("https://github.com/MtheDV/Exodus");
}
exodusPlay.onclick = () => {
    openLink("https://play.google.com/store/apps/details?id=com.platypi.exodus");
}
nececcGit.onclick = () => {
    openLink("https://github.com/MtheDV/ubco-cosc304-project")
}
remarrkGit.onclick = () => {
    openLink("https://github.com/JadenBalogh/remarrk")
}
///////////////////////////////////////


// SCROLL TO CHANGE PARALLAX OPACITY //
///////////////////////////////////////
window.addEventListener("scroll", () => {
    let scrollY = window.scrollY;
    let winHeight = window.innerHeight;
    // if (scrollY > winHeight/2)
    //     parallaxPage.style.opacity = "0.0";
    // else
    //     parallaxPage.style.opacity = "1.0";

    if (scrollY > winHeight/2)
        backToTopButton.style.opacity = "1.0";
    else
        backToTopButton.style.opacity = "0.0";
});
///////////////////////////////////////


///////// REMOVE FORM DATA ////////////
///////////////////////////////////////
if ( window.history.replaceState ) {
    window.history.replaceState( null, null, window.location.href );
}
///////////////////////////////////////

////// DEPRECATED GALLERY CODE ////////
///////////////////////////////////////
/*let projectsButton = document.querySelector(".button_projects");
let exitButton = document.querySelector(".gallery_exit");
let exitButtonMobile = document.querySelector(".gallery_exit_mobile");
let projectsPage = document.querySelector(".gallery");

let galleryMore = document.querySelector(".gallery_more");

function animateOutParallax() {
    parallaxPage.style.opacity = "0.5";
}

function animateOut(element) {
    element.style.opacity = "0.0";
    setTimeout(function() {
        element.style.display = "none";
    }, 350);
}
function animateIn(element, display) {
    element.style.display = display;
    setTimeout(function() {
        element.style.opacity = "1.0";
    }, 20);
}

projectsButton.onclick = function() {
    animateOutParallax();

    animateIn(projectsPage, "flex");
    pageType = 1;
}
exitButton.onclick = function() {
    animateOut(projectsPage);

    animateIn(parallaxPage, "block");
    pageType = 0;

    galleryMore.style.display = "none";
}
exitButtonMobile.onclick = function() {
    galleryMore.style.display = "none";
    for (let i = 0; i < galleryDetails.length; i++) {
        galleryDetails[i].style.display = "none";
    }

    exitButtonMobile.style.display = "none";
}

let galleryImages = document.getElementsByClassName("gallery_block");
let galleryDetails = document.getElementsByClassName("gallery_details");

window.addEventListener("click", function() {
    if (pageType == 1) {
        for (let i = 0; i < galleryImages.length; i++) {
            galleryImages[i].onclick = function() {
                if (galleryImages[i].classList.contains("link"))
                    window.location = galleryImages[i].id;
                else {
                    galleryDetails[i].style.display = "block";
                    galleryMore.style.display = "block";
                    for (let j = 0; j < galleryDetails.length; j++) {
                        if (j != i) {
                            galleryDetails[j].style.display = "none";
                        }
                    }
                    exitButtonMobile.style.display = "block";
                }
            }
        }
    }
});*/
///////////////////////////////////////
