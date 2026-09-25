const homeHeader = document.getElementById("homeHeader");
const faixa = document.querySelector(".home-faixa");

const headerInterno = document.querySelector(".site-header");

const menuButton =
    document.getElementById("menuButton") ||
    document.querySelector(".menu-botao");

const nav =
    document.getElementById("homeNav") ||
    document.querySelector(".site-nav");

function atualizarScroll() {
    if (homeHeader) {
        if (window.scrollY > 40) {
            homeHeader.classList.add("scrolled");
        } else {
            homeHeader.classList.remove("scrolled");
        }
    }

    if (headerInterno) {
        if (window.scrollY > 20) {
            headerInterno.classList.add("rolando");
        } else {
            headerInterno.classList.remove("rolando");
        }
    }

    if (faixa) {
        if (window.scrollY > 110) {
            faixa.classList.add("apareceu");
        } else {
            faixa.classList.remove("apareceu");
        }
    }
}

window.addEventListener("scroll", atualizarScroll);
atualizarScroll();

if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
        const aberto = nav.classList.toggle("aberto");

        menuButton.classList.toggle("aberto", aberto);
        menuButton.setAttribute("aria-expanded", aberto);
    });

    nav.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            nav.classList.remove("aberto");
            menuButton.classList.remove("aberto");
            menuButton.setAttribute("aria-expanded", "false");
        });
    });
}

const elementos = document.querySelectorAll(".home-reveal, .revelar");

if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains("home-reveal")) {
                    entry.target.classList.add("home-visible");
                }

                if (entry.target.classList.contains("revelar")) {
                    entry.target.classList.add("visivel");
                }

                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold:0.12
    });

    elementos.forEach(elemento => {
        observer.observe(elemento);
    });
} else {
    elementos.forEach(elemento => {
        elemento.classList.add("home-visible");
        elemento.classList.add("visivel");
    });
}