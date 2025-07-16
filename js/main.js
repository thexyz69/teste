// ===== MAIN APPLICATION ===== //

/**
 * Tataifelps Luxury Perfume Website
 * Main application controller
 */
class TataifelpsApp {
    constructor() {
        this.components = {};
        this.state = {
            currentFilter: 'all',
            products: [],
            cart: [],
            wishlist: [],
            isLoading: true
        };
        
        this.init();
    }
    
    async init() {
        try {
            // Wait for DOM to be ready
            if (document.readyState === 'loading') {
                await new Promise(resolve => {
                    document.addEventListener('DOMContentLoaded', resolve);
                });
            }
            
            // Initialize data
            this.initializeData();
            
            // Initialize components
            this.initializeComponents();
            
            // Initialize product catalog
            this.initializeProductCatalog();
            
            // Initialize event listeners
            this.bindGlobalEvents();
            
            // Load saved state
            this.loadSavedState();
            
            console.log('🌹 Tataifelps App initialized successfully');
            
        } catch (error) {
            console.error('Error initializing Tataifelps App:', error);
            this.handleInitializationError(error);
        }
    }
    
    initializeData() {
        // Set initial products data
        this.state.products = PRODUCTS_DATA || [];
        
        // Validate data integrity
        if (!this.state.products.length) {
            console.warn('No products data found');
        }
    }
    
    initializeComponents() {
        try {
            // Initialize navigation
            this.components.navigation = new Navigation();
            
            // Initialize modals
            this.components.productModal = new ProductModal();
            this.components.searchModal = new SearchModal();
            
            // Initialize contact form
            const contactForm = document.getElementById('contactForm');
            if (contactForm) {
                this.components.contactForm = new ContactForm();
            }
            
            console.log('✅ Components initialized');
            
        } catch (error) {
            console.error('Error initializing components:', error);
        }
    }
    
    initializeProductCatalog() {
        try {
            const productsGrid = document.getElementById('productsGrid');
            if (!productsGrid) {
                console.warn('Products grid not found');
                return;
            }
            
            // Clear existing products
            productsGrid.innerHTML = '';
            
            // Create product cards
            this.state.products.forEach(product => {
                const productCard = new ProductCard(product, productsGrid);
                // Store reference for filtering
                productCard.element.setAttribute('data-product-id', product.id);
            });
            
            // Initialize filters
            this.initializeFilters();
            
            console.log(`✅ Product catalog initialized with ${this.state.products.length} products`);
            
        } catch (error) {
            console.error('Error initializing product catalog:', error);
        }
    }
    
    initializeFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.getAttribute('data-filter');
                this.applyFilter(filter);
                this.updateActiveFilter(button);
            });
        });
    }
    
    applyFilter(filter) {
        this.state.currentFilter = filter;
        const productCards = document.querySelectorAll('.product-card');
        
        productCards.forEach(card => {
            const category = card.getAttribute('data-category');
            const productId = parseInt(card.getAttribute('data-product-id'));
            const product = this.state.products.find(p => p.id === productId);
            
            let shouldShow = false;
            
            switch (filter) {
                case 'all':
                    shouldShow = true;
                    break;
                case 'limited':
                    shouldShow = product && product.badge === 'Édition Limitée';
                    break;
                default:
                    shouldShow = category === filter;
            }
            
            if (shouldShow) {
                card.classList.remove('hidden');
                // Add stagger animation
                setTimeout(() => {
                    card.classList.add('animate-fade-in-up');
                }, Math.random() * 200);
            } else {
                card.classList.add('hidden');
                card.classList.remove('animate-fade-in-up');
            }
        });
        
        // Save filter state
        this.saveState();
        
        console.log(`🔍 Filter applied: ${filter}`);
    }
    
    updateActiveFilter(activeButton) {
        const filterButtons = document.querySelectorAll('.filter-btn');
        
        filterButtons.forEach(button => {
            button.classList.remove('active');
        });
        
        activeButton.classList.add('active');
    }
    
    bindGlobalEvents() {
        // Handle window resize
        window.addEventListener('resize', debounce(() => {
            this.handleResize();
        }, CONFIG.debounce.resize));
        
        // Handle visibility change
        document.addEventListener('visibilitychange', () => {
            this.handleVisibilityChange();
        });
        
        // Handle online/offline status
        window.addEventListener('online', () => {
            this.handleOnlineStatus(true);
        });
        
        window.addEventListener('offline', () => {
            this.handleOnlineStatus(false);
        });
        
        // Handle keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            this.handleKeyboardShortcuts(e);
        });
        
        // Handle scroll events for performance monitoring
        window.addEventListener('scroll', throttle(() => {
            this.handleScroll();
        }, CONFIG.debounce.scroll));
    }
    
    handleResize() {
        const deviceType = getDeviceType();
        document.body.setAttribute('data-device', deviceType);
        
        // Adjust layout for different screen sizes
        if (deviceType === 'mobile') {
            this.optimizeForMobile();
        } else {
            this.optimizeForDesktop();
        }
    }
    
    handleVisibilityChange() {
        if (document.hidden) {
            // Page is hidden, pause heavy operations
            this.pauseAnimations();
        } else {
            // Page is visible, resume operations
            this.resumeAnimations();
        }
    }
    
    handleOnlineStatus(isOnline) {
        if (isOnline) {
            showNotification('Connexion rétablie', 'success');
            document.body.classList.remove('offline');
        } else {
            showNotification('Connexion perdue', 'warning');
            document.body.classList.add('offline');
        }
    }
    
    handleKeyboardShortcuts(e) {
        // Ctrl/Cmd + K for search
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            SearchModal.open();
        }
        
        // Escape to close modals
        if (e.key === 'Escape') {
            this.closeAllModals();
        }
    }
    
    handleScroll() {
        const scrollY = window.scrollY;
        const documentHeight = document.documentElement.scrollHeight;
        const windowHeight = window.innerHeight;
        const scrollPercentage = (scrollY / (documentHeight - windowHeight)) * 100;
        
        // Update scroll progress
        document.documentElement.style.setProperty('--scroll-progress', `${scrollPercentage}%`);
        
        // Lazy load images when they're about to enter viewport
        this.lazyLoadImages();
    }
    
    optimizeForMobile() {
        // Disable heavy animations on mobile
        document.body.classList.add('mobile-optimized');
        
        // Reduce parallax effects
        const parallaxElements = document.querySelectorAll('[class*="parallax"]');
        parallaxElements.forEach(el => {
            el.style.transform = 'none';
        });
    }
    
    optimizeForDesktop() {
        document.body.classList.remove('mobile-optimized');
    }
    
    pauseAnimations() {
        document.body.classList.add('animations-paused');
    }
    
    resumeAnimations() {
        document.body.classList.remove('animations-paused');
    }
    
    closeAllModals() {
        // Close product modal
        if (this.components.productModal) {
            ProductModal.close();
        }
        
        // Close search modal
        if (this.components.searchModal) {
            SearchModal.close();
        }
    }
    
    lazyLoadImages() {
        const images = document.querySelectorAll('img[data-src]');
        
        images.forEach(img => {
            if (isElementInViewport(img, 0.1)) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                img.classList.add('loaded');
            }
        });
    }
    
    // State management
    saveState() {
        const stateToSave = {
            currentFilter: this.state.currentFilter,
            cart: this.state.cart,
            wishlist: this.state.wishlist
        };
        
        Storage.set('tataifelps_state', stateToSave);
    }
    
    loadSavedState() {
        const savedState = Storage.get('tataifelps_state');
        
        if (savedState) {
            // Restore filter
            if (savedState.currentFilter && savedState.currentFilter !== 'all') {
                const filterButton = document.querySelector(`[data-filter="${savedState.currentFilter}"]`);
                if (filterButton) {
                    filterButton.click();
                }
            }
            
            // Restore cart and wishlist
            this.state.cart = savedState.cart || [];
            this.state.wishlist = savedState.wishlist || [];
            
            // Update UI
            this.updateCartCount();
            this.updateWishlistUI();
        }
    }
    
    // Cart management
    addToCart(productId, quantity = 1) {
        const product = this.state.products.find(p => p.id === productId);
        if (!product) return false;
        
        const existingItem = this.state.cart.find(item => item.productId === productId);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.state.cart.push({
                productId,
                quantity,
                addedAt: new Date().toISOString()
            });
        }
        
        this.updateCartCount();
        this.saveState();
        
        showNotification(`${product.name} ajouté au panier`, 'success');
        return true;
    }
    
    removeFromCart(productId) {
        this.state.cart = this.state.cart.filter(item => item.productId !== productId);
        this.updateCartCount();
        this.saveState();
    }
    
    updateCartCount() {
        const totalItems = this.state.cart.reduce((sum, item) => sum + item.quantity, 0);
        
        if (this.components.navigation) {
            this.components.navigation.updateCartCount(totalItems);
        }
    }
    
    // Wishlist management
    toggleWishlist(productId) {
        const index = this.state.wishlist.indexOf(productId);
        
        if (index > -1) {
            this.state.wishlist.splice(index, 1);
            showNotification('Retiré des favoris', 'info');
        } else {
            this.state.wishlist.push(productId);
            showNotification('Ajouté aux favoris', 'success');
        }
        
        this.updateWishlistUI();
        this.saveState();
    }
    
    updateWishlistUI() {
        // Update wishlist buttons state
        const wishlistButtons = document.querySelectorAll('.wishlist-btn');
        
        wishlistButtons.forEach(button => {
            const productCard = button.closest('.product-card');
            const productId = parseInt(productCard.getAttribute('data-product-id'));
            const icon = button.querySelector('i');
            
            if (this.state.wishlist.includes(productId)) {
                icon.classList.remove('far');
                icon.classList.add('fas');
                button.classList.add('active');
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
                button.classList.remove('active');
            }
        });
    }
    
    // Error handling
    handleInitializationError(error) {
        console.error('Initialization error:', error);
        
        // Show user-friendly error message
        const errorMessage = document.createElement('div');
        errorMessage.className = 'initialization-error';
        errorMessage.innerHTML = `
            <div class="error-content">
                <h3>Erreur de chargement</h3>
                <p>Une erreur s'est produite lors du chargement de l'application.</p>
                <button onclick="location.reload()" class="btn btn-primary">
                    Recharger la page
                </button>
            </div>
        `;
        
        document.body.appendChild(errorMessage);
    }
    
    // Performance monitoring
    measurePerformance() {
        if ('performance' in window) {
            const navigation = performance.getEntriesByType('navigation')[0];
            const loadTime = navigation.loadEventEnd - navigation.loadEventStart;
            
            console.log(`📊 Page load time: ${loadTime}ms`);
            
            // Send analytics if needed
            this.sendPerformanceMetrics({
                loadTime,
                domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
                firstPaint: performance.getEntriesByName('first-paint')[0]?.startTime || 0
            });
        }
    }
    
    sendPerformanceMetrics(metrics) {
        // Implementation for sending metrics to analytics service
        console.log('Performance metrics:', metrics);
    }
    
    // Public API methods
    getProduct(id) {
        return this.state.products.find(p => p.id === id);
    }
    
    getProducts(filter = null) {
        if (!filter) return this.state.products;
        
        return this.state.products.filter(product => {
            switch (filter) {
                case 'featured':
                    return product.featured;
                case 'inStock':
                    return product.inStock;
                case 'onSale':
                    return product.oldPrice;
                default:
                    return product.category === filter;
            }
        });
    }
    
    searchProducts(query) {
        const searchTerm = query.toLowerCase();
        
        return this.state.products.filter(product =>
            product.name.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm) ||
            product.notes.some(note => note.toLowerCase().includes(searchTerm))
        );
    }
    
    // Cleanup
    destroy() {
        // Clean up event listeners
        window.removeEventListener('resize', this.handleResize);
        window.removeEventListener('scroll', this.handleScroll);
        document.removeEventListener('visibilitychange', this.handleVisibilityChange);
        
        // Destroy components
        Object.values(this.components).forEach(component => {
            if (component.destroy) {
                component.destroy();
            }
        });
        
        // Clear state
        this.state = null;
        this.components = {};
        
        console.log('🧹 Tataifelps App destroyed');
    }
}

// Initialize application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Create global app instance
    window.tataifelpsApp = new TataifelpsApp();
    
    // Expose useful methods globally for debugging
    if (typeof window !== 'undefined') {
        window.TataifelpsAPI = {
            getProduct: (id) => window.tataifelpsApp.getProduct(id),
            getProducts: (filter) => window.tataifelpsApp.getProducts(filter),
            searchProducts: (query) => window.tataifelpsApp.searchProducts(query),
            addToCart: (id, qty) => window.tataifelpsApp.addToCart(id, qty),
            toggleWishlist: (id) => window.tataifelpsApp.toggleWishlist(id)
        };
    }
});

// Handle page unload
window.addEventListener('beforeunload', () => {
    if (window.tataifelpsApp) {
        window.tataifelpsApp.saveState();
    }
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TataifelpsApp;
}