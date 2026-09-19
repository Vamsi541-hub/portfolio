/* =========================================================
   THEME
========================================================= */

const body = document.body;

const themeToggle =
    document.getElementById("themeToggle");


const savedTheme =
    localStorage.getItem("theme");


if (savedTheme === "light") {

    body.classList.add("light");

    themeToggle.textContent = "☀";

}


/* Theme button */

themeToggle.addEventListener("click", () => {

    body.classList.toggle("light");


    const isLight =
        body.classList.contains("light");


    themeToggle.textContent =
        isLight ? "☀" : "☾";


    localStorage.setItem(
        "theme",
        isLight ? "light" : "dark"
    );

});


/* =========================================================
   MOBILE MENU
========================================================= */

const menuToggle =
    document.getElementById("menuToggle");


const navLinks =
    document.getElementById("navLinks");


menuToggle.addEventListener("click", () => {

    navLinks.classList.toggle("open");

});


/* Close mobile menu after clicking a link */

navLinks
    .querySelectorAll("a")
    .forEach((link) => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("open");

        });

    });


/* =========================================================
   NAVIGATION
========================================================= */

const navItems =
    document.querySelectorAll(
        "#navLinks a"
    );


const sections =
    document.querySelectorAll(
        "section[id]"
    );


/*
    Change active navigation item.
*/

function setActiveLink(sectionId) {

    navItems.forEach((link) => {

        link.classList.remove("active");


        const linkTarget =
            link
                .getAttribute("href")
                .replace("#", "");


        if (
            linkTarget === sectionId
        ) {

            link.classList.add("active");

        }

    });

}


/* =========================================================
   SUPER SMOOTH NAVIGATION
========================================================= */

navItems.forEach((link) => {

    link.addEventListener(
        "click",
        function (event) {

            event.preventDefault();


            const targetId =
                this
                    .getAttribute("href")
                    .substring(1);


            const target =
                document.getElementById(targetId);


            if (!target) {
                return;
            }


            /*
                Immediately move active underline.
            */

            setActiveLink(targetId);


            /*
                Calculate position while accounting
                for the fixed navbar.
            */

            const navbarHeight = 78;


            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                navbarHeight;


            /*
                Native browser smooth scrolling.
            */

            window.scrollTo({

                top:
                    targetPosition,

                behavior:
                    "smooth"

            });

        }
    );

});


/* =========================================================
   ALL INTERNAL LINKS
   SMOOTH SCROLL
========================================================= */

document
    .querySelectorAll('a[href^="#"]')
    .forEach((link) => {

        link.addEventListener(
            "click",
            function (event) {

                const href =
                    this.getAttribute("href");


                /*
                    Ignore empty "#"
                */

                if (
                    !href ||
                    href === "#"
                ) {

                    return;

                }


                /*
                    Navigation links are already
                    handled above.
                */

                if (
                    this.closest("#navLinks")
                ) {

                    return;

                }


                const target =
                    document.getElementById(
                        href.substring(1)
                    );


                if (!target) {

                    return;

                }


                event.preventDefault();


                const navbarHeight = 78;


                const targetPosition =
                    target.getBoundingClientRect().top +
                    window.scrollY -
                    navbarHeight;


                window.scrollTo({

                    top:
                        targetPosition,

                    behavior:
                        "smooth"

                });

            }
        );

    });


/* =========================================================
   NAVBAR SCROLL EFFECT
========================================================= */

const navbar =
    document.getElementById("navbar");


function updateNavbar() {

    if (
        window.scrollY > 30
    ) {

        navbar.classList.add("scrolled");

    } else {

        navbar.classList.remove("scrolled");

    }

}


window.addEventListener(
    "scroll",
    updateNavbar,
    { passive: true }
);


updateNavbar();


/* =========================================================
   ACTIVE SECTION WHILE SCROLLING
========================================================= */

const sectionObserver =
    new IntersectionObserver(

        (entries) => {

            entries.forEach((entry) => {

                if (
                    entry.isIntersecting
                ) {

                    setActiveLink(
                        entry.target.id
                    );

                }

            });

        },

        {

            root: null,

            /*
                This makes the active line
                follow the section currently
                near the center of the screen.
            */

            rootMargin:
                "-35% 0px -55% 0px",

            threshold: 0

        }

    );


sections.forEach((section) => {

    sectionObserver.observe(section);

});


/* =========================================================
   TYPING ANIMATION
========================================================= */

const typing =
    document.getElementById("typing");


const roles = [

    "web experiences.",

    "AI-powered tools.",

    "Android apps.",

    "creative products."

];


let roleIndex = 0;

let charIndex = 0;

let deleting = false;


function typeEffect() {

    const currentRole =
        roles[roleIndex];


    /* Typing */

    if (!deleting) {

        typing.textContent =
            currentRole.substring(
                0,
                charIndex + 1
            );


        charIndex++;


        /*
            Pause when complete.
        */

        if (
            charIndex ===
            currentRole.length
        ) {

            deleting = true;


            setTimeout(
                typeEffect,
                1500
            );


            return;

        }

    }


    /* Deleting */

    else {

        typing.textContent =
            currentRole.substring(
                0,
                charIndex - 1
            );


        charIndex--;


        /*
            Go to next sentence.
        */

        if (
            charIndex === 0
        ) {

            deleting = false;

            roleIndex++;


            if (
                roleIndex >=
                roles.length
            ) {

                roleIndex = 0;

            }

        }

    }


    setTimeout(

        typeEffect,

        deleting
            ? 40
            : 70

    );

}


typeEffect();


/* =========================================================
   PROJECT FILTER
========================================================= */

const filterButtons =
    document.querySelectorAll(
        ".filter"
    );


const projects =
    document.querySelectorAll(
        ".project"
    );


filterButtons.forEach((button) => {

    button.addEventListener(
        "click",
        () => {

            /*
                Remove active from all.
            */

            filterButtons.forEach(
                (btn) => {

                    btn.classList.remove(
                        "active"
                    );

                }
            );


            /*
                Activate selected filter.
            */

            button.classList.add(
                "active"
            );


            const filter =
                button.dataset.filter;


            projects.forEach(
                (project) => {

                    const category =
                        project.dataset.category;


                    if (
                        filter === "all" ||
                        category === filter
                    ) {

                        project.style.display =
                            "flex";

                    } else {

                        project.style.display =
                            "none";

                    }

                }
            );

        }
    );

});


/* =========================================================
   CONTACT FORM
========================================================= */

const form =
    document.getElementById(
        "contactForm"
    );


const formMessage =
    document.getElementById(
        "formMessage"
    );


form.addEventListener(
    "submit",
    (event) => {

        event.preventDefault();


        const name =
            document
                .getElementById("name")
                .value
                .trim();


        const email =
            document
                .getElementById("email")
                .value
                .trim();


        const message =
            document
                .getElementById("message")
                .value
                .trim();


        /*
            Validate form.
        */

        if (
            !name ||
            !email ||
            !message
        ) {

            formMessage.textContent =
                "Please fill all fields.";

            return;

        }


        /*
            IMPORTANT:

            Replace this with YOUR
            actual email address.
        */

        const myEmail =
            "your-email@example.com";


        /*
            Email subject.
        */

        const subject =
            encodeURIComponent(
                "Portfolio message from " +
                name
            );


        /*
            Email body.
        */

        const emailBody =
            encodeURIComponent(

                "Name: " +
                name +

                "\nEmail: " +
                email +

                "\n\nMessage:\n" +
                message

            );


        /*
            Open the user's email application.
        */

        window.location.href =
            `mailto:${myEmail}?subject=${subject}&body=${emailBody}`;


        formMessage.textContent =
            "Opening your email application...";

    }
);


/* =========================================================
   FOOTER YEAR
========================================================= */

const year =
    document.getElementById("year");


year.textContent =
    new Date().getFullYear();


/* =========================================================
   INITIAL ACTIVE LINK
========================================================= */

setActiveLink("home");
