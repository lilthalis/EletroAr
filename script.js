document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // 1. EFEITO NO HEADER AO ROLAR A PÁGINA
    // ==========================================
    const header = document.querySelector(".main-header");
    
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.style.backgroundColor = "rgba(255, 255, 255, 0.98)";
            header.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.08)";
            header.style.padding = "10px 0"; // Reduz sutilmente a altura
        } else {
            header.style.backgroundColor = "#FFFFFF";
            header.style.boxShadow = "0 2px 10px rgba(0,0,0,0.02)";
            header.style.padding = "20px 0";
        }
    });

    // ==========================================
    // 2. SUPORTE A MENU MOBILE (HAMBÚRGUER)
    // ==========================================
    // Cria dinamicamente o botão caso não queira alterar o HTML manual
    const headerContainer = document.querySelector(".header-container");
    const navMenu = document.querySelector(".nav-menu");
    
    const mobileMenuBtn = document.createElement("button");
    mobileMenuBtn.className = "mobile-menu-btn";
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    mobileMenuBtn.style.cssText = `
        display: none;
        background: none;
        border: none;
        font-size: 1.5rem;
        color: #001F3F;
        cursor: pointer;
    `;
    
    headerContainer.insertBefore(mobileMenuBtn, navMenu);

    mobileMenuBtn.addEventListener("click", () => {
        navMenu.classList.toggle("active");
        const isOpen = navMenu.classList.contains("active");
        mobileMenuBtn.innerHTML = isOpen ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });

    // Fecha o menu ao clicar em qualquer link interna
    document.querySelectorAll(".nav-menu a").forEach(link => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("active");
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });


    // ==========================================
    // 3. ANIMAÇÃO DE REVELAÇÃO AO ROLAR (SCROLL REVEAL)
    // ==========================================
    const animatedElements = document.querySelectorAll('.service-card, .why-card, .about-content, .about-image-placeholder');
    
    // Configura o estilo inicial via JS para evitar que fiquem invisíveis se o JS falhar
    animatedElements.forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        el.style.transition = "opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)";
    });

    const checkScroll = () => {
        const triggerBottom = (window.innerHeight / 5) * 4.5;
        
        animatedElements.forEach(el => {
            const boxTop = el.getBoundingClientRect().top;
            
            if (boxTop < triggerBottom) {
                el.style.opacity = "1";
                el.style.transform = "translateY(0)";
            }
        });
    };

    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Executa uma vez no início


    // ==========================================
    // 4. INTERCEPTAÇÃO E VALIDAÇÃO DO FORMULÁRIO
    // ==========================================
    const form = document.querySelector(".contact-form");
    
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            
            const submitBtn = form.querySelector("button[type='submit']");
            const originalText = submitBtn.innerText;
            
            // Simulação de envio corporativo
            submitBtn.disabled = true;
            submitBtn.innerText = "ENVIANDO REQUISIÇÃO...";
            submitBtn.style.opacity = "0.7";
            
            setTimeout(() => {
                // Alerta elegante ou modificação no DOM
                alert("Obrigado pelo contato! Nossa equipe de engenharia técnica retornará o seu chamado em até 2 horas úteis.");
                
                form.reset();
                submitBtn.disabled = false;
                submitBtn.innerText = originalText;
                submitBtn.style.opacity = "1";
            }, 1500);
        });
    }
});