document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector(".main-header");
    const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
    const navMenu = document.querySelector(".nav-menu");
    const mobileMenuIcon = mobileMenuBtn?.querySelector("i");

    const updateHeader = () => {
        header?.classList.toggle("is-scrolled", window.scrollY > 50);
    };

    const closeMobileMenu = () => {
        navMenu?.classList.remove("active");
        mobileMenuBtn?.setAttribute("aria-expanded", "false");
        mobileMenuBtn?.setAttribute("aria-label", "Abrir menu");
        if (mobileMenuIcon) {
            mobileMenuIcon.className = "fas fa-bars";
        }
    };

    window.addEventListener("scroll", updateHeader, { passive: true });
    updateHeader();

    mobileMenuBtn?.addEventListener("click", () => {
        const isOpen = navMenu?.classList.toggle("active") ?? false;
        mobileMenuBtn.setAttribute("aria-expanded", String(isOpen));
        mobileMenuBtn.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
        if (mobileMenuIcon) {
            mobileMenuIcon.className = isOpen ? "fas fa-times" : "fas fa-bars";
        }
    });

    document.querySelectorAll(".nav-menu a").forEach((link) => {
        link.addEventListener("click", closeMobileMenu);
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeMobileMenu();
        }
    });

    const revealElements = document.querySelectorAll(".reveal-on-scroll");

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });

        revealElements.forEach((element) => observer.observe(element));
    } else {
        revealElements.forEach((element) => element.classList.add("is-visible"));
    }

    const form = document.querySelector(".contact-form");

    form?.addEventListener("submit", (event) => {
        event.preventDefault();

        const formData = new FormData(form);
        const message = [
            "Olá, equipe Eletro Ar! Gostaria de solicitar um orçamento.",
            `Nome: ${formData.get("nome")}`,
            `Empresa: ${formData.get("empresa") || "Não informado"}`,
            `E-mail: ${formData.get("email")}`,
            `Telefone: ${formData.get("telefone")}`,
            `Mensagem: ${formData.get("mensagem")}`,
        ].join("\n");

        window.open(`https://wa.me/554632624616?text=${encodeURIComponent(message)}`, "_blank", "noopener");
        form.reset();
    });
});
