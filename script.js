// Função para comprar produto via WhatsApp
function comprarProduto(nome, preco, descricao) {
    // Número do WhatsApp (substitua pelo seu número)
    const numeroWhatsApp = "5511999999999"; // Formato: código do país + DDD + número
    
    // Mensagem personalizada com os dados do produto
    const mensagem = `🔥 *THREE IMPORT* 🔥

Salve! Tenho interesse neste produto:

📦 *${nome}*
💰 Preço: ${preco}
📝 Descrição: ${descricao}

Quero saber mais sobre este produto! 🛒`;
    
    // Codifica a mensagem para URL
    const mensagemCodificada = encodeURIComponent(mensagem);
    
    // Cria o link do WhatsApp
    const linkWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensagemCodificada}`;
    
    // Abre o WhatsApp em uma nova aba
    window.open(linkWhatsApp, '_blank');
}

// Smooth scrolling para links de navegação
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // CTA button smooth scroll
    const ctaButton = document.querySelector('.cta-btn');
    if (ctaButton) {
        ctaButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetSection = document.querySelector('#produtos');
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }
});

// Efeito parallax no hero
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    
    if (heroContent) {
        const speed = scrolled * 0.3;
        heroContent.style.transform = `translateY(${speed}px)`;
    }
});

// Animação de entrada dos cards quando entram na viewport
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observa todos os cards de produto
document.addEventListener('DOMContentLoaded', function() {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});

// Efeito hover nos botões de compra
document.addEventListener('DOMContentLoaded', function() {
    const buyButtons = document.querySelectorAll('.buy-btn');
    
    buyButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    
    if (window.scrollY > 100) {
        header.style.background = 'rgba(10, 10, 10, 0.98)';
        header.style.backdropFilter = 'blur(15px)';
    } else {
        header.style.background = 'rgba(10, 10, 10, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    }
});

// Efeito de glitch no texto principal
function glitchEffect() {
    const graffiti = document.querySelector('.graffiti-text h2');
    if (graffiti) {
        graffiti.style.textShadow = `
            ${Math.random() * 5}px ${Math.random() * 5}px 0 #ff0040,
            ${Math.random() * 5}px ${Math.random() * 5}px 0 #00ff41,
            ${Math.random() * 5}px ${Math.random() * 5}px 0 #0a0a0a
        `;
        
        setTimeout(() => {
            graffiti.style.textShadow = `
                3px 3px 0 #0a0a0a,
                6px 6px 0 #2a2a2a,
                0 0 30px #ff0040
            `;
        }, 100);
    }
}

// Aplica o efeito glitch ocasionalmente
setInterval(glitchEffect, 5000);

// Efeito de neon pulsante
function neonPulse() {
    const neonElements = document.querySelectorAll('.wall-text-2, .section-title .outline');
    neonElements.forEach(element => {
        element.style.textShadow = '0 0 30px currentColor';
        setTimeout(() => {
            element.style.textShadow = '0 0 20px currentColor';
        }, 500);
    });
}

setInterval(neonPulse, 3000);