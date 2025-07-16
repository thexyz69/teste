// ===== CONFIGURATION ===== //
const CONFIG = {
    // WhatsApp Configuration
    whatsapp: {
        number: "5511999999999",
        baseUrl: "https://wa.me/"
    },
    
    // Animation Configuration
    animations: {
        duration: {
            fast: 150,
            base: 300,
            slow: 500,
            luxury: 800
        },
        easing: {
            ease: "ease",
            easeIn: "ease-in",
            easeOut: "ease-out",
            easeInOut: "ease-in-out",
            luxury: "cubic-bezier(0.4, 0, 0.2, 1)"
        }
    },
    
    // Scroll Configuration
    scroll: {
        offset: 100,
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    },
    
    // Intersection Observer Configuration
    observer: {
        threshold: [0, 0.1, 0.5, 1],
        rootMargin: "0px 0px -100px 0px"
    },
    
    // Debounce Configuration
    debounce: {
        search: 300,
        scroll: 16,
        resize: 250
    },
    
    // API Configuration
    api: {
        timeout: 10000,
        retries: 3
    },
    
    // UI Configuration
    ui: {
        mobileBreakpoint: 768,
        tabletBreakpoint: 1024,
        desktopBreakpoint: 1200
    },
    
    // Performance Configuration
    performance: {
        lazyLoadOffset: 200,
        imageQuality: 85,
        enableWebP: true
    }
};

// Export configuration
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
} else if (typeof window !== 'undefined') {
    window.CONFIG = CONFIG;
}