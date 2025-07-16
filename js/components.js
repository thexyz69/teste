// ===== COMPONENT CLASSES ===== //

/**
 * Product Card Component
 */
class ProductCard {
    constructor(product, container) {
        this.product = product;
        this.container = container;
        this.element = null;
        this.init();
    }
    
    init() {
        this.createElement();
        this.bindEvents();
        this.container.appendChild(this.element);
    }
    
    createElement() {
        this.element = document.createElement('div');
        this.element.className = 'product-card';
        this.element.setAttribute('data-category', this.product.category);
        this.element.setAttribute('data-id', this.product.id);
        
        this.element.innerHTML = `
            <div class="product-image">
                <img src="${this.product.images[0]}" 
                     alt="${this.product.name}" 
                     loading="lazy">
                ${this.product.badge ? `<div class="product-badge ${this.getBadgeClass()}">${this.product.badge}</div>` : ''}
                <div class="product-overlay">
                    <button class="quick-view" aria-label="Aperçu rapide">
                        <i class="fas fa-eye"></i>
                    </button>
                </div>
            </div>
            <div class="product-info">
                <h3 class="product-name">${this.product.name}</h3>
                <p class="product-category">${this.getCategoryName()}</p>
                <div class="product-notes">
                    ${this.product.notes.map(note => `<span class="note-tag">${note}</span>`).join('')}
                </div>
                <div class="product-price">
                    <span class="price-current">${formatPrice(this.product.price)}</span>
                    ${this.product.oldPrice ? `<span class="price-old">${formatPrice(this.product.oldPrice)}</span>` : ''}
                </div>
                <div class="product-actions">
                    <button class="add-to-cart">
                        <i class="fas fa-shopping-bag"></i>
                        <span>Commander</span>
                    </button>
                    <button class="wishlist-btn" aria-label="Ajouter aux favoris">
                        <i class="fas fa-heart"></i>
                    </button>
                </div>
            </div>
        `;
    }
    
    bindEvents() {
        const quickViewBtn = this.element.querySelector('.quick-view');
        const addToCartBtn = this.element.querySelector('.add-to-cart');
        const wishlistBtn = this.element.querySelector('.wishlist-btn');
        
        quickViewBtn.addEventListener('click', () => {
            ProductModal.open(this.product);
        });
        
        addToCartBtn.addEventListener('click', () => {
            this.handlePurchase();
        });
        
        wishlistBtn.addEventListener('click', () => {
            this.toggleWishlist();
        });
    }
    
    getBadgeClass() {
        const badgeClasses = {
            'Premium': 'premium',
            'Best Seller': 'bestseller',
            'Édition Limitée': 'limited',
            'Nouveau': 'new'
        };
        return badgeClasses[this.product.badge] || '';
    }
    
    getCategoryName() {
        const categoryNames = {
            'homme': 'Pour Homme',
            'femme': 'Pour Femme',
            'unisex': 'Unisexe'
        };
        return categoryNames[this.product.category] || this.product.category;
    }
    
    handlePurchase() {
        const url = generateWhatsAppURL(
            this.product.name,
            formatPrice(this.product.price),
            this.product.volume,
            `Parfum ${this.getCategoryName()} - ${this.product.description}`
        );
        
        // Add loading state
        const btn = this.element.querySelector('.add-to-cart');
        const originalHTML = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Traitement...</span>';
        btn.disabled = true;
        
        setTimeout(() => {
            window.open(url, '_blank');
            btn.innerHTML = originalHTML;
            btn.disabled = false;
            showNotification('Redirection vers WhatsApp...', 'success');
        }, 1000);
    }
    
    toggleWishlist() {
        const btn = this.element.querySelector('.wishlist-btn');
        const icon = btn.querySelector('i');
        
        if (icon.classList.contains('fas')) {
            icon.classList.remove('fas');
            icon.classList.add('far');
            showNotification('Retiré des favoris', 'info');
        } else {
            icon.classList.remove('far');
            icon.classList.add('fas');
            showNotification('Ajouté aux favoris', 'success');
        }
        
        addClassWithAnimation(btn, 'animate-pulse');
    }
    
    hide() {
        this.element.classList.add('hidden');
    }
    
    show() {
        this.element.classList.remove('hidden');
    }
}

/**
 * Product Modal Component
 */
class ProductModal {
    static instance = null;
    
    constructor() {
        if (ProductModal.instance) {
            return ProductModal.instance;
        }
        
        this.modal = document.getElementById('productModal');
        this.currentProduct = null;
        this.init();
        
        ProductModal.instance = this;
    }
    
    static getInstance() {
        if (!ProductModal.instance) {
            new ProductModal();
        }
        return ProductModal.instance;
    }
    
    static open(product) {
        const instance = ProductModal.getInstance();
        instance.openModal(product);
    }
    
    static close() {
        const instance = ProductModal.getInstance();
        instance.closeModal();
    }
    
    init() {
        this.bindEvents();
    }
    
    bindEvents() {
        const closeBtn = this.modal.querySelector('.modal-close');
        const overlay = this.modal.querySelector('.modal-overlay');
        const buyBtn = this.modal.querySelector('#modalBuyBtn');
        
        closeBtn.addEventListener('click', () => this.closeModal());
        overlay.addEventListener('click', () => this.closeModal());
        buyBtn.addEventListener('click', () => this.handlePurchase());
        
        // Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                this.closeModal();
            }
        });
    }
    
    openModal(product) {
        this.currentProduct = product;
        this.populateModal();
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    closeModal() {
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
        this.currentProduct = null;
    }
    
    populateModal() {
        const { product } = this;
        
        // Update images
        const mainImage = this.modal.querySelector('#modalMainImage');
        mainImage.src = product.images[0];
        mainImage.alt = product.name;
        
        // Update thumbnails
        const thumbnailsContainer = this.modal.querySelector('.modal-thumbnails');
        thumbnailsContainer.innerHTML = product.images.map((image, index) => `
            <img src="${image}" 
                 alt="${product.name} ${index + 1}" 
                 class="${index === 0 ? 'active' : ''}"
                 data-index="${index}">
        `).join('');
        
        // Bind thumbnail events
        thumbnailsContainer.querySelectorAll('img').forEach(thumb => {
            thumb.addEventListener('click', () => {
                const index = parseInt(thumb.dataset.index);
                this.switchImage(index);
            });
        });
        
        // Update content
        this.modal.querySelector('#modalTitle').textContent = product.name;
        this.modal.querySelector('#modalCategory').textContent = this.getCategoryName(product.category);
        this.modal.querySelector('#modalPrice').textContent = formatPrice(product.price);
        
        const oldPriceEl = this.modal.querySelector('#modalOldPrice');
        if (product.oldPrice) {
            oldPriceEl.textContent = formatPrice(product.oldPrice);
            oldPriceEl.style.display = 'inline';
        } else {
            oldPriceEl.style.display = 'none';
        }
        
        this.modal.querySelector('#modalDescription').textContent = product.description;
        
        // Update notes
        const notesContainer = this.modal.querySelector('#modalNotes');
        notesContainer.innerHTML = product.notes.map(note => `
            <span class="note-tag">${note}</span>
        `).join('');
    }
    
    switchImage(index) {
        const mainImage = this.modal.querySelector('#modalMainImage');
        const thumbnails = this.modal.querySelectorAll('.modal-thumbnails img');
        
        mainImage.src = this.currentProduct.images[index];
        
        thumbnails.forEach((thumb, i) => {
            thumb.classList.toggle('active', i === index);
        });
    }
    
    getCategoryName(category) {
        const categoryNames = {
            'homme': 'Pour Homme',
            'femme': 'Pour Femme',
            'unisex': 'Unisexe'
        };
        return categoryNames[category] || category;
    }
    
    handlePurchase() {
        const url = generateWhatsAppURL(
            this.currentProduct.name,
            formatPrice(this.currentProduct.price),
            this.currentProduct.volume,
            `Parfum ${this.getCategoryName(this.currentProduct.category)} - ${this.currentProduct.description}`
        );
        
        window.open(url, '_blank');
        this.closeModal();
        showNotification('Redirection vers WhatsApp...', 'success');
    }
    
    get product() {
        return this.currentProduct;
    }
}

/**
 * Search Modal Component
 */
class SearchModal {
    static instance = null;
    
    constructor() {
        if (SearchModal.instance) {
            return SearchModal.instance;
        }
        
        this.modal = document.getElementById('searchModal');
        this.searchInput = document.getElementById('searchInput');
        this.searchResults = document.getElementById('searchResults');
        this.init();
        
        SearchModal.instance = this;
    }
    
    static getInstance() {
        if (!SearchModal.instance) {
            new SearchModal();
        }
        return SearchModal.instance;
    }
    
    static open() {
        const instance = SearchModal.getInstance();
        instance.openModal();
    }
    
    static close() {
        const instance = SearchModal.getInstance();
        instance.closeModal();
    }
    
    init() {
        this.bindEvents();
    }
    
    bindEvents() {
        const closeBtn = this.modal.querySelector('.search-close');
        const overlay = this.modal.querySelector('.modal-overlay');
        
        closeBtn.addEventListener('click', () => this.closeModal());
        overlay.addEventListener('click', () => this.closeModal());
        
        // Search input
        this.searchInput.addEventListener('input', debounce((e) => {
            this.performSearch(e.target.value);
        }, CONFIG.debounce.search));
        
        // Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                this.closeModal();
            }
        });
    }
    
    openModal() {
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        setTimeout(() => {
            this.searchInput.focus();
        }, 100);
    }
    
    closeModal() {
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
        this.searchInput.value = '';
        this.searchResults.innerHTML = '';
    }
    
    performSearch(query) {
        if (!query.trim()) {
            this.searchResults.innerHTML = '';
            return;
        }
        
        const results = PRODUCTS_DATA.filter(product => 
            product.name.toLowerCase().includes(query.toLowerCase()) ||
            product.description.toLowerCase().includes(query.toLowerCase()) ||
            product.notes.some(note => note.toLowerCase().includes(query.toLowerCase()))
        );
        
        this.displayResults(results);
    }
    
    displayResults(results) {
        if (results.length === 0) {
            this.searchResults.innerHTML = `
                <div class="search-no-results">
                    <p>Aucun résultat trouvé</p>
                </div>
            `;
            return;
        }
        
        this.searchResults.innerHTML = results.map(product => `
            <div class="search-result-item" data-product-id="${product.id}">
                <div class="search-result-image">
                    <img src="${product.images[0]}" alt="${product.name}">
                </div>
                <div class="search-result-info">
                    <h4>${product.name}</h4>
                    <p>${formatPrice(product.price)} - ${product.volume}</p>
                </div>
            </div>
        `).join('');
        
        // Bind result click events
        this.searchResults.querySelectorAll('.search-result-item').forEach(item => {
            item.addEventListener('click', () => {
                const productId = parseInt(item.dataset.productId);
                const product = PRODUCTS_DATA.find(p => p.id === productId);
                if (product) {
                    this.closeModal();
                    ProductModal.open(product);
                }
            });
        });
    }
}

/**
 * Navigation Component
 */
class Navigation {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.navMenu = document.getElementById('navMenu');
        this.menuToggle = document.getElementById('menuToggle');
        this.searchBtn = document.getElementById('searchBtn');
        this.cartBtn = document.getElementById('cartBtn');
        this.cartCount = document.getElementById('cartCount');
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.updateActiveLink();
    }
    
    bindEvents() {
        // Scroll effect
        window.addEventListener('scroll', throttle(() => {
            this.handleScroll();
        }, CONFIG.debounce.scroll));
        
        // Navigation links
        this.navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                smoothScrollTo(targetId);
                this.updateActiveLink(link);
            });
        });
        
        // Mobile menu toggle
        this.menuToggle.addEventListener('click', () => {
            this.toggleMobileMenu();
        });
        
        // Search button
        this.searchBtn.addEventListener('click', () => {
            SearchModal.open();
        });
        
        // Cart button
        this.cartBtn.addEventListener('click', () => {
            showNotification('Fonctionnalité à venir', 'info');
        });
    }
    
    handleScroll() {
        const scrollY = window.scrollY;
        
        // Add scrolled class
        if (scrollY > 50) {
            this.navbar.classList.add('scrolled');
        } else {
            this.navbar.classList.remove('scrolled');
        }
        
        // Update active link based on scroll position
        this.updateActiveLink();
    }
    
    updateActiveLink(clickedLink = null) {
        if (clickedLink) {
            this.navMenu.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            clickedLink.classList.add('active');
            return;
        }
        
        // Auto-update based on scroll position
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.scrollY + CONFIG.scroll.offset;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                this.navMenu.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    toggleMobileMenu() {
        this.navMenu.classList.toggle('active');
        this.menuToggle.classList.toggle('active');
    }
    
    updateCartCount(count) {
        this.cartCount.textContent = count;
        if (count > 0) {
            this.cartCount.style.display = 'block';
        } else {
            this.cartCount.style.display = 'none';
        }
    }
}

/**
 * Contact Form Component
 */
class ContactForm {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.init();
    }
    
    init() {
        this.bindEvents();
    }
    
    bindEvents() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit();
        });
        
        // Real-time validation
        this.form.querySelectorAll('input, select, textarea').forEach(field => {
            field.addEventListener('blur', () => {
                this.validateField(field);
            });
        });
    }
    
    handleSubmit() {
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData.entries());
        
        // Validate form
        if (!this.validateForm(data)) {
            return;
        }
        
        // Generate WhatsApp URL
        const url = generateContactWhatsAppURL(data);
        
        // Show loading state
        const submitBtn = this.form.querySelector('button[type="submit"]');
        const originalHTML = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Envoi...</span>';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            window.open(url, '_blank');
            this.form.reset();
            submitBtn.innerHTML = originalHTML;
            submitBtn.disabled = false;
            showNotification('Message envoyé ! Redirection vers WhatsApp...', 'success');
        }, 1000);
    }
    
    validateForm(data) {
        let isValid = true;
        
        // Required fields
        const requiredFields = ['firstName', 'lastName', 'email', 'interest'];
        requiredFields.forEach(field => {
            if (!data[field] || !data[field].trim()) {
                this.showFieldError(field, 'Ce champ est requis');
                isValid = false;
            }
        });
        
        // Email validation
        if (data.email && !isValidEmail(data.email)) {
            this.showFieldError('email', 'Format d\'email invalide');
            isValid = false;
        }
        
        // Phone validation
        if (data.phone && !isValidPhone(data.phone)) {
            this.showFieldError('phone', 'Format de téléphone invalide');
            isValid = false;
        }
        
        return isValid;
    }
    
    validateField(field) {
        const value = field.value.trim();
        const name = field.name;
        
        // Clear previous errors
        this.clearFieldError(name);
        
        // Required field validation
        if (field.hasAttribute('required') && !value) {
            this.showFieldError(name, 'Ce champ est requis');
            return false;
        }
        
        // Specific validations
        if (name === 'email' && value && !isValidEmail(value)) {
            this.showFieldError(name, 'Format d\'email invalide');
            return false;
        }
        
        if (name === 'phone' && value && !isValidPhone(value)) {
            this.showFieldError(name, 'Format de téléphone invalide');
            return false;
        }
        
        return true;
    }
    
    showFieldError(fieldName, message) {
        const field = this.form.querySelector(`[name="${fieldName}"]`);
        const formGroup = field.closest('.form-group');
        
        formGroup.classList.add('error');
        
        let errorEl = formGroup.querySelector('.field-error');
        if (!errorEl) {
            errorEl = document.createElement('span');
            errorEl.className = 'field-error';
            formGroup.appendChild(errorEl);
        }
        
        errorEl.textContent = message;
    }
    
    clearFieldError(fieldName) {
        const field = this.form.querySelector(`[name="${fieldName}"]`);
        const formGroup = field.closest('.form-group');
        const errorEl = formGroup.querySelector('.field-error');
        
        formGroup.classList.remove('error');
        if (errorEl) {
            errorEl.remove();
        }
    }
}

// Export components
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        ProductCard,
        ProductModal,
        SearchModal,
        Navigation,
        ContactForm
    };
}