/* =========================================================
   THEME
========================================================= */

const body = document.body;
const themeToggle = document.getElementById("themeToggle");

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "light") {
    body.classList.add("light");
    themeToggle.textContent = "☀";
}

themeToggle.addEventListener("click", () => {

    body.classList.toggle("light");

    const isLight = body.classList.contains("light");

    themeToggle.textContent = isLight ? "☀" : "☾";

    localStorage.setItem(
        "theme",
        isLight ? "light" : "dark"
    );

});


/* =========================================================
   MOBILE MENU
========================================================= */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");


menuToggle.addEventListener("click", () => {

    navLinks.classList.toggle("open");

});


navLinks.querySelectorAll("a").forEach((link) => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("open");

    });

});


/* =========================================================
   NAVIGATION
========================================================= */

const navItems =
    document.querySelectorAll("#navLinks a");

const sections =
    document.querySelectorAll("section[id]");


/*
    Function to change the active navigation item
*/

function setActiveLink(sectionId) {

    navItems.forEach((link) => {

        link.classList.remove("active");

        const linkTarget =
            link.getAttribute("href")
                .replace("#", "");

        if (linkTarget === sectionId) {

            link.classList.add("active");

        }

    });

}


/* =========================================================
   NAVIGATION CLICK
========================================================= */

navItems.forEach((link) => {

    link.addEventListener("click", function () {

        const targetId =
            this.getAttribute("href")
                .substring(1);

        /*
            Move the underline immediately
        */

        setActiveLink(targetId);

    });

});


/* =========================================================
   ACTIVE SECTION WHILE SCROLLING
========================================================= */

const sectionObserver =
    new IntersectionObserver(

        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    setActiveLink(
                        entry.target.id
                    );

                }

            });

        },

        {
            root: null,

            /*
                Controls when a section becomes
                the active navigation item.
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
   NAVBAR SCROLL EFFECT
========================================================= */

const navbar =
    document.getElementById("navbar");


window.addEventListener("scroll", () => {

    if (window.scrollY > 30) {

        navbar.classList.add("scrolled");

    } else {

        navbar.classList.remove("scrolled");

    }

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


    /*
        Typing
    */

    if (!deleting) {

        typing.textContent =
            currentRole.substring(
                0,
                charIndex + 1
            );

        charIndex++;


        /*
            Pause when the word is complete
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


    /*
        Deleting
    */

    else {

        typing.textContent =
            currentRole.substring(
                0,
                charIndex - 1
            );

        charIndex--;


        /*
            Move to next word
        */

        if (charIndex === 0) {

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
    document.querySelectorAll(".filter");


const projects =
    document.querySelectorAll(".project");


filterButtons.forEach((button) => {

    button.addEventListener("click", () => {

        /*
            Remove active from all filters
        */

        filterButtons.forEach((btn) => {

            btn.classList.remove("active");

        });


        /*
            Activate clicked filter
        */

        button.classList.add("active");


        const filter =
            button.dataset.filter;


        projects.forEach((project) => {

            const category =
                project.dataset.category;


            /*
                Show matching projects
            */

            if (
                filter === "all" ||
                category === filter
            ) {

                project.style.display =
                    "flex";

            }


            /*
                Hide other projects
            */

            else {

                project.style.display =
                    "none";

            }

        });

    });

});


/* =========================================================
   CONTACT FORM
========================================================= */

const form =
    document.getElementById("contactForm");


const formMessage =
    document.getElementById("formMessage");


form.addEventListener("submit", (event) => {

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
        Check fields
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
        CHANGE THIS EMAIL
        TO YOUR REAL EMAIL ADDRESS.
    */

    const myEmail =
        "your-email@example.com";


    /*
        Create email subject
    */

    const subject =
        encodeURIComponent(
            "Portfolio message from " +
            name
        );


    /*
        Create email body
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
        Open default email application
    */

    window.location.href =
        `mailto:${myEmail}?subject=${subject}&body=${emailBody}`;


    formMessage.textContent =
        "Opening your email application...";

});


/* =========================================================
   FOOTER YEAR
========================================================= */

const year =
    document.getElementById("year");


year.textContent =
    new Date().getFullYear();


/* =========================================================
   INITIAL ACTIVE NAVIGATION
========================================================= */

setActiveLink("home");
