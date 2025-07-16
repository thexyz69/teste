// ===== ANIMATION CONTROLLER ===== //

/**
 * Scroll Reveal Animation Controller
 */
class ScrollRevealController {
    constructor() {
        this.observer = null;
        this.elements = [];
        this.init();
    }
    
    init() {
        this.setupObserver();
        this.observeElements();
    }
    
    setupObserver() {
        const options = {
            threshold: CONFIG.observer.threshold,
            rootMargin: CONFIG.observer.rootMargin
        };
        
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.revealElement(entry.target);
                }
            });
        }, options);
    }
    
    observeElements() {
        // Auto-detect elements with scroll reveal classes
        const selectors = [
            '.scroll-reveal',
            '.scroll-reveal-left',
            '.scroll-reveal-right',
            '.scroll-reveal-scale',
            '.product-card',
            '.feature-item',
            '.contact-item',
            '.process-step'
        ];
        
        selectors.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(element => {
                this.observer.observe(element);
                this.elements.push(element);
            });
        });
    }
    
    revealElement(element) {
        element.classList.add('revealed');
        
        // Add stagger effect for grouped elements
        if (element.parentElement.classList.contains('stagger-children')) {
            const siblings = Array.from(element.parentElement.children);
            const index = siblings.indexOf(element);
            element.style.animationDelay = `${index * 0.1}s`;
        }
        
        // Unobserve after revealing
        this.observer.unobserve(element);
    }
    
    destroy() {
        if (this.observer) {
            this.observer.disconnect();
        }
    }
}

/**
 * Parallax Effect Controller
 */
class ParallaxController {
    constructor() {
        this.elements = [];
        this.isActive = false;
        this.init();
    }
    
    init() {
        this.findParallaxElements();
        this.bindEvents();
        this.checkSupport();
    }
    
    findParallaxElements() {
        const selectors = [
            '.parallax-slow',
            '.parallax-medium',
            '.parallax-fast'
        ];
        
        selectors.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(element => {
                const speed = this.getSpeedFromClass(element);
                this.elements.push({ element, speed });
            });
        });
    }
    
    getSpeedFromClass(element) {
        if (element.classList.contains('parallax-slow')) return 0.2;
        if (element.classList.contains('parallax-medium')) return 0.5;
        if (element.classList.contains('parallax-fast')) return 0.8;
        return 0.5;
    }
    
    bindEvents() {
        window.addEventListener('scroll', throttle(() => {
            if (this.isActive) {
                this.updateParallax();
            }
        }, CONFIG.debounce.scroll));
        
        window.addEventListener('resize', debounce(() => {
            this.checkSupport();
        }, CONFIG.debounce.resize));
    }
    
    checkSupport() {
        // Disable parallax on mobile devices for performance
        const isMobile = getDeviceType() === 'mobile';
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        this.isActive = !isMobile && !prefersReducedMotion;
        
        if (!this.isActive) {
            this.resetParallax();
        }
    }
    
    updateParallax() {
        const scrollY = window.pageYOffset;
        
        this.elements.forEach(({ element, speed }) => {
            const rect = element.getBoundingClientRect();
            const elementTop = rect.top + scrollY;
            const elementHeight = rect.height;
            const windowHeight = window.innerHeight;
            
            // Check if element is in viewport
            if (rect.bottom >= 0 && rect.top <= windowHeight) {
                const yPos = -(scrollY - elementTop) * speed;
                element.style.transform = `translateY(${yPos}px)`;
            }
        });
    }
    
    resetParallax() {
        this.elements.forEach(({ element }) => {
            element.style.transform = '';
        });
    }
    
    destroy() {
        this.resetParallax();
        this.elements = [];
        this.isActive = false;
    }
}

/**
 * Loading Animation Controller
 */
class LoadingController {
    constructor() {
        this.loadingScreen = document.getElementById('loadingScreen');
        this.isLoading = true;
        this.init();
    }
    
    init() {
        this.simulateLoading();
        this.bindEvents();
    }
    
    simulateLoading() {
        // Simulate loading time
        const minLoadTime = 1500;
        const startTime = Date.now();
        
        const checkReady = () => {
            const elapsed = Date.now() - startTime;
            const isDocumentReady = document.readyState === 'complete';
            
            if (elapsed >= minLoadTime && isDocumentReady) {
                this.hideLoading();
            } else {
                requestAnimationFrame(checkReady);
            }
        };
        
        requestAnimationFrame(checkReady);
    }
    
    bindEvents() {
        // Ensure loading screen is hidden when page is fully loaded
        window.addEventListener('load', () => {
            setTimeout(() => {
                if (this.isLoading) {
                    this.hideLoading();
                }
            }, 500);
        });
    }
    
    hideLoading() {
        if (!this.isLoading) return;
        
        this.isLoading = false;
        this.loadingScreen.classList.add('hidden');
        
        // Remove from DOM after animation
        setTimeout(() => {
            if (this.loadingScreen.parentNode) {
                this.loadingScreen.parentNode.removeChild(this.loadingScreen);
            }
        }, 500);
        
        // Trigger page animations
        this.triggerPageAnimations();
    }
    
    triggerPageAnimations() {
        // Add entrance animations to main elements
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.classList.add('animate-fade-in-up');
        }
        
        // Stagger navigation items
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('animate-fade-in-down');
            }, index * 100);
        });
    }
}

/**
 * Hover Effect Controller
 */
class HoverEffectController {
    constructor() {
        this.init();
    }
    
    init() {
        this.setupProductCardHovers();
        this.setupButtonHovers();
        this.setupImageHovers();
    }
    
    setupProductCardHovers() {
        const productCards = document.querySelectorAll('.product-card');
        
        productCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.addHoverEffect(card, 'hover-lift');
            });
            
            card.addEventListener('mouseleave', () => {
                this.removeHoverEffect(card, 'hover-lift');
            });
        });
    }
    
    setupButtonHovers() {
        const buttons = document.querySelectorAll('.btn, .add-to-cart, .quick-view');
        
        buttons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                this.addHoverEffect(button, 'hover-glow');
            });
            
            button.addEventListener('mouseleave', () => {
                this.removeHoverEffect(button, 'hover-glow');
            });
        });
    }
    
    setupImageHovers() {
        const images = document.querySelectorAll('.heritage-image, .gallery-main, .gallery-thumbnails img');
        
        images.forEach(image => {
            image.addEventListener('mouseenter', () => {
                this.addHoverEffect(image, 'hover-scale');
            });
            
            image.addEventListener('mouseleave', () => {
                this.removeHoverEffect(image, 'hover-scale');
            });
        });
    }
    
    addHoverEffect(element, effectClass) {
        element.classList.add(effectClass);
    }
    
    removeHoverEffect(element, effectClass) {
        element.classList.remove(effectClass);
    }
}

/**
 * Smooth Scroll Controller
 */
class SmoothScrollController {
    constructor() {
        this.init();
    }
    
    init() {
        this.setupSmoothScrolling();
        this.setupScrollIndicator();
    }
    
    setupSmoothScrolling() {
        // Enhanced smooth scrolling for better performance
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                const targetId = link.getAttribute('href');
                const target = document.querySelector(targetId);
                
                if (target) {
                    this.smoothScrollTo(target);
                }
            });
        });
    }
    
    setupScrollIndicator() {
        const scrollIndicator = document.querySelector('.scroll-indicator');
        
        if (scrollIndicator) {
            scrollIndicator.addEventListener('click', () => {
                const nextSection = document.querySelector('#collection');
                if (nextSection) {
                    this.smoothScrollTo(nextSection);
                }
            });
        }
    }
    
    smoothScrollTo(target) {
        const headerHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        // Use native smooth scroll with fallback
        if ('scrollBehavior' in document.documentElement.style) {
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        } else {
            // Fallback for older browsers
            this.animateScroll(targetPosition);
        }
    }
    
    animateScroll(targetPosition) {
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 800;
        let start = null;
        
        const step = (timestamp) => {
            if (!start) start = timestamp;
            const progress = timestamp - start;
            const percentage = Math.min(progress / duration, 1);
            
            // Easing function
            const ease = this.easeInOutCubic(percentage);
            
            window.scrollTo(0, startPosition + distance * ease);
            
            if (progress < duration) {
                requestAnimationFrame(step);
            }
        };
        
        requestAnimationFrame(step);
    }
    
    easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    }
}

/**
 * Animation Manager
 */
class AnimationManager {
    constructor() {
        this.controllers = [];
        this.init();
    }
    
    init() {
        // Initialize all animation controllers
        this.controllers.push(new LoadingController());
        this.controllers.push(new ScrollRevealController());
        this.controllers.push(new ParallaxController());
        this.controllers.push(new HoverEffectController());
        this.controllers.push(new SmoothScrollController());
        
        this.bindGlobalEvents();
    }
    
    bindGlobalEvents() {
        // Handle reduced motion preference
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        mediaQuery.addListener(this.handleReducedMotion.bind(this));
        this.handleReducedMotion(mediaQuery);
        
        // Performance monitoring
        this.monitorPerformance();
    }
    
    handleReducedMotion(mediaQuery) {
        if (mediaQuery.matches) {
            document.body.classList.add('reduced-motion');
            this.disableAnimations();
        } else {
            document.body.classList.remove('reduced-motion');
            this.enableAnimations();
        }
    }
    
    disableAnimations() {
        // Disable heavy animations for better accessibility
        const style = document.createElement('style');
        style.id = 'reduced-motion-styles';
        style.textContent = `
            *, *::before, *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
                scroll-behavior: auto !important;
            }
        `;
        document.head.appendChild(style);
    }
    
    enableAnimations() {
        const style = document.getElementById('reduced-motion-styles');
        if (style) {
            style.remove();
        }
    }
    
    monitorPerformance() {
        // Monitor frame rate and disable heavy animations if needed
        let lastTime = performance.now();
        let frameCount = 0;
        let fps = 60;
        
        const checkPerformance = (currentTime) => {
            frameCount++;
            
            if (currentTime - lastTime >= 1000) {
                fps = frameCount;
                frameCount = 0;
                lastTime = currentTime;
                
                // Disable parallax if FPS is too low
                if (fps < 30) {
                    this.optimizeForPerformance();
                }
            }
            
            requestAnimationFrame(checkPerformance);
        };
        
        requestAnimationFrame(checkPerformance);
    }
    
    optimizeForPerformance() {
        // Disable heavy animations for better performance
        document.body.classList.add('performance-mode');
        
        // Disable parallax
        const parallaxController = this.controllers.find(c => c instanceof ParallaxController);
        if (parallaxController) {
            parallaxController.destroy();
        }
    }
    
    destroy() {
        this.controllers.forEach(controller => {
            if (controller.destroy) {
                controller.destroy();
            }
        });
        this.controllers = [];
    }
}

// Initialize animation manager when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.animationManager = new AnimationManager();
});

// Export animation classes
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        ScrollRevealController,
        ParallaxController,
        LoadingController,
        HoverEffectController,
        SmoothScrollController,
        AnimationManager
    };
}