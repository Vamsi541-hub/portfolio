const body = document.body;
const themeToggle = document.getElementById("themeToggle");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const navbar = document.getElementById("navbar");
const typing = document.getElementById("typing");
const form = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");
const year = document.getElementById("year");

const savedTheme = localStorage.getItem("theme");
if (savedTheme === "light") {
    body.classList.add("light");
    themeToggle.textContent = "☀";
}

themeToggle.addEventListener("click", () => {
    body.classList.toggle("light");
    const isLight = body.classList.contains("light");
    themeToggle.textContent = isLight ? "☀" : "☾";
    localStorage.setItem("theme", isLight ? "light" : "dark");
});

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    menuToggle.textContent = navLinks.classList.contains("open") ? "✕" : "☰";
});

navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle.textContent = "☰";
    });
});

function smoothScrollTo(target) {
    if (!target) return;
    const top = target.getBoundingClientRect().top + window.scrollY - 96;
    window.scrollTo({ top, behavior: "smooth" });
}

document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
        const href = link.getAttribute("href");
        if (!href || href === "#") return;
        const target = document.getElementById(href.slice(1));
        if (!target) return;
        event.preventDefault();
        smoothScrollTo(target);
    });
});

function updateNavbar() {
    navbar.classList.toggle("scrolled", window.scrollY > 30);
}
window.addEventListener("scroll", updateNavbar, { passive: true });
updateNavbar();

const navItems = [...document.querySelectorAll("#navLinks a")];
const sections = [...document.querySelectorAll("main section[id]")];

function setActiveLink(sectionId) {
    navItems.forEach((link) => {
        const target = link.getAttribute("href").slice(1);
        link.classList.toggle("active", target === sectionId);
    });
}

const sectionObserver = new IntersectionObserver(
    (entries) => {
        const visible = entries
            .filter((entry) => entry.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) setActiveLink(visible.target.id);
    },
    { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.15, 0.4, 0.7] }
);

sections.forEach((section) => sectionObserver.observe(section));
setActiveLink("home");

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
    const current = roles[roleIndex];

    if (!deleting) {
        typing.textContent = current.slice(0, charIndex + 1);
        charIndex += 1;

        if (charIndex === current.length) {
            deleting = true;
            setTimeout(typeEffect, 1200);
            return;
        }
    } else {
        typing.textContent = current.slice(0, charIndex - 1);
        charIndex -= 1;

        if (charIndex === 0) {
            deleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
        }
    }

    setTimeout(typeEffect, deleting ? 35 : 65);
}

typeEffect();

const filterButtons = document.querySelectorAll(".filter");
const projects = document.querySelectorAll(".project");

filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        filterButtons.forEach((btn) => btn.classList.remove("active"));
        button.classList.add("active");

        const filter = button.dataset.filter;

        projects.forEach((project) => {
            const visible = filter === "all" || project.dataset.category === filter;
            project.style.display = visible ? "" : "none";
        });
    });
});

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
        formMessage.textContent = "Please fill all fields.";
        return;
    }

    const myEmail = "v7182616@gmail.com";
    const subject = encodeURIComponent("Portfolio message from " + name);
    const emailBody = encodeURIComponent(
        "Name: " + name +
        "\nEmail: " + email +
        "\n\nMessage:\n" + message
    );

    formMessage.textContent = "Opening your email application...";
    window.location.href = `mailto:${myEmail}?subject=${subject}&body=${emailBody}`;
});

year.textContent = new Date().getFullYear();

document.querySelectorAll(".technology-list span, .stat, .project, .bento-card").forEach((element) => {
    element.addEventListener("mouseenter", () => element.classList.add("hovered"));
    element.addEventListener("mouseleave", () => element.classList.remove("hovered"));
});
