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

window.addEventListener("scroll", atualizarScroll, {
    passive: true
});

atualizarScroll();

if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
        const aberto = nav.classList.toggle("aberto");

        menuButton.classList.toggle("aberto", aberto);
        menuButton.setAttribute(
            "aria-expanded",
            aberto ? "true" : "false"
        );
    });

    nav.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            nav.classList.remove("aberto");
            menuButton.classList.remove("aberto");
            menuButton.setAttribute("aria-expanded", "false");
        });
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 900) {
            nav.classList.remove("aberto");
            menuButton.classList.remove("aberto");
            menuButton.setAttribute("aria-expanded", "false");
        }
    });
}

const elementos = document.querySelectorAll(
    ".home-reveal, .revelar"
);

function mostrarElemento(elemento) {
    if (elemento.classList.contains("home-reveal")) {
        elemento.classList.add("home-visible");
    }

    if (elemento.classList.contains("revelar")) {
        elemento.classList.add("visivel");
    }
}

if (window.innerWidth <= 900) {
    elementos.forEach(elemento => {
        mostrarElemento(elemento);
    });
} else if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) {
                    return;
                }

                mostrarElemento(entry.target);
                observer.unobserve(entry.target);
            });
        },
        {
            threshold: 0.08,
            rootMargin: "0px 0px 40px 0px"
        }
    );

    elementos.forEach(elemento => {
        observer.observe(elemento);
    });
} else {
    elementos.forEach(elemento => {
        mostrarElemento(elemento);
    });
}