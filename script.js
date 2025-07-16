// Função para comprar perfume via WhatsApp
function comprarPerfume(nome, preco, volume, descricao) {
    const numeroWhatsApp = "5511999999999";
    
    const mensagem = `🌟 *TATAIFELPS - PREMIUM FRAGRANCES* 🌟

Olá! Tenho interesse neste perfume:

🍾 *${nome}*
💰 Preço: ${preco}
📏 Volume: ${volume}
📝 ${descricao}

Gostaria de mais informações e finalizar a compra.

Obrigado!`;
    
    const mensagemCodificada = encodeURIComponent(mensagem);
    const linkWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensagemCodificada}`;
    
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
            
            const targetSection = document.querySelector('#catalog');
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

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Filter functionality
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            productCards.forEach(card => {
                if (filterValue === 'all') {
                    card.classList.remove('hidden');
                } else {
                    const cardCategory = card.getAttribute('data-category');
                    if (cardCategory === filterValue) {
                        card.classList.remove('hidden');
                    } else {
                        card.classList.add('hidden');
                    }
                }
            });
        });
    });
});

// Product Modal functionality
function openProductModal(name, price, category, description) {
    const modal = document.getElementById('productModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalCategory = document.getElementById('modalCategory');
    const modalPrice = document.getElementById('modalPrice');
    const modalDescription = document.getElementById('modalDescription');
    const modalImage = document.getElementById('modalImage');
    const modalBuyBtn = document.getElementById('modalBuyBtn');
    
    // Set modal content
    modalTitle.textContent = name;
    modalCategory.textContent = category.charAt(0).toUpperCase() + category.slice(1);
    modalPrice.textContent = price;
    modalDescription.textContent = description;
    
    // Set image based on category
    if (category === 'masculino') {
        modalImage.src = 'https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg?auto=compress&cs=tinysrgb&w=400';
    } else {
        modalImage.src = 'https://images.pexels.com/photos/1961795/pexels-photo-1961795.jpeg?auto=compress&cs=tinysrgb&w=400';
    }
    modalImage.alt = name;
    
    // Set buy button onclick
    modalBuyBtn.onclick = function() {
        comprarPerfume(name, price, '100ml', `Perfume ${category} - ${description}`);
    };
    
    // Show modal
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Close modal functionality
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('productModal');
    const closeBtn = document.querySelector('.close');
    
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
});

// Mobile navigation toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('.nav');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
});

// Form submission
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const message = this.querySelector('textarea').value;
            
            const whatsappMessage = `🌟 *CONTATO - TATAIFELPS* 🌟

*Nome:* ${name}
*E-mail:* ${email}

*Mensagem:*
${message}

Aguardo retorno. Obrigado!`;
            
            const numeroWhatsApp = "5511999999999";
            const mensagemCodificada = encodeURIComponent(whatsappMessage);
            const linkWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensagemCodificada}`;
            
            window.open(linkWhatsApp, '_blank');
            
            // Reset form
            this.reset();
            
            // Show success message
            alert('Mensagem enviada! Você será redirecionado para o WhatsApp.');
        });
    }
});

// Intersection Observer for animations
document.addEventListener('DOMContentLoaded', function() {
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
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.product-card, .feature-item, .contact-item');
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image img');
    
    if (heroImage) {
        const speed = scrolled * 0.1;
        heroImage.style.transform = `translateY(${speed}px)`;
    }
});

// Add to cart button animation
document.addEventListener('DOMContentLoaded', function() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Add loading state
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processando...';
            this.disabled = true;
            
            // Reset after 2 seconds
            setTimeout(() => {
                this.innerHTML = originalText;
                this.disabled = false;
            }, 2000);
        });
    });
});

// Search functionality (if needed in the future)
function searchProducts(query) {
    const productCards = document.querySelectorAll('.product-card');
    const searchQuery = query.toLowerCase();
    
    productCards.forEach(card => {
        const productName = card.querySelector('h3').textContent.toLowerCase();
        const productCategory = card.querySelector('.product-category').textContent.toLowerCase();
        
        if (productName.includes(searchQuery) || productCategory.includes(searchQuery)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Loading animation
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Smooth reveal animations
function revealOnScroll() {
    const reveals = document.querySelectorAll('.product-card, .about-text, .contact-info');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    revealOnScroll();
});