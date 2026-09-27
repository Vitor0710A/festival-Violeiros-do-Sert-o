const header = document.getElementById("siteHeader");
const menuToggle = document.getElementById("menuToggle");
const siteNav = document.getElementById("siteNav");
const homeTicker = document.getElementById("homeTicker");

function updatePageState() {
    const y = window.scrollY || 0;

    if (header) {
        header.classList.toggle("scrolled", y > 24);
    }

    if (homeTicker) {
        const showTicker = y > 70 && window.innerWidth > 620;
        homeTicker.classList.toggle("visible", showTicker);
        homeTicker.setAttribute("aria-hidden", showTicker ? "false" : "true");
    }
}

function closeMenu() {
    if (!menuToggle || !siteNav) return;

    siteNav.classList.remove("open");
    menuToggle.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
}

if (menuToggle && siteNav) {
    menuToggle.addEventListener("click", () => {
        const opening = !siteNav.classList.contains("open");

        siteNav.classList.toggle("open", opening);
        menuToggle.classList.toggle("open", opening);
        menuToggle.setAttribute("aria-expanded", opening ? "true" : "false");
        document.body.classList.toggle("menu-open", opening);
    });

    siteNav.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", closeMenu);
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 820) {
            closeMenu();
        }

        updatePageState();
    });

    document.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            closeMenu();
        }
    });
}

window.addEventListener("scroll", updatePageState, { passive: true });
window.addEventListener("load", updatePageState);
updatePageState();
