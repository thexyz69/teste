// ===== UTILITY FUNCTIONS ===== //

/**
 * Debounce function to limit the rate of function execution
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @param {boolean} immediate - Execute immediately
 * @returns {Function} Debounced function
 */
function debounce(func, wait, immediate = false) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}

/**
 * Throttle function to limit the rate of function execution
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in milliseconds
 * @returns {Function} Throttled function
 */
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * Format price with currency
 * @param {number} price - Price value
 * @param {string} currency - Currency symbol
 * @returns {string} Formatted price
 */
function formatPrice(price, currency = 'R$') {
    return `${currency} ${price.toLocaleString('pt-BR')}`;
}

/**
 * Generate WhatsApp message URL
 * @param {string} productName - Product name
 * @param {string} price - Product price
 * @param {string} volume - Product volume
 * @param {string} description - Product description
 * @returns {string} WhatsApp URL
 */
function generateWhatsAppURL(productName, price, volume, description) {
    const message = `🌟 *TATAIFELPS - MAISON DE PARFUMS EXCLUSIFS* 🌟

Bonjour ! Je suis intéressé(e) par ce parfum :

🍾 *${productName}*
💰 Prix : ${price}
📏 Volume : ${volume}
📝 ${description}

J'aimerais avoir plus d'informations et finaliser l'achat.

Merci !`;

    const encodedMessage = encodeURIComponent(message);
    return `${CONFIG.whatsapp.baseUrl}${CONFIG.whatsapp.number}?text=${encodedMessage}`;
}

/**
 * Generate contact WhatsApp message URL
 * @param {Object} formData - Form data object
 * @returns {string} WhatsApp URL
 */
function generateContactWhatsAppURL(formData) {
    const message = `🌟 *CONTACT - TATAIFELPS* 🌟

*Nom :* ${formData.firstName} ${formData.lastName}
*Email :* ${formData.email}
*Téléphone :* ${formData.phone || 'Non renseigné'}
*Intérêt :* ${formData.interest}

*Message :*
${formData.message}

J'attends votre retour. Merci !`;

    const encodedMessage = encodeURIComponent(message);
    return `${CONFIG.whatsapp.baseUrl}${CONFIG.whatsapp.number}?text=${encodedMessage}`;
}

/**
 * Smooth scroll to element
 * @param {string} targetId - Target element ID
 * @param {number} offset - Scroll offset
 */
function smoothScrollTo(targetId, offset = CONFIG.scroll.offset) {
    const target = document.querySelector(targetId);
    if (!target) return;

    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
    
    window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
    });
}

/**
 * Check if element is in viewport
 * @param {Element} element - DOM element
 * @param {number} threshold - Visibility threshold (0-1)
 * @returns {boolean} Is element visible
 */
function isElementInViewport(element, threshold = 0.1) {
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const windowWidth = window.innerWidth || document.documentElement.clientWidth;
    
    const vertInView = (rect.top <= windowHeight * (1 - threshold)) && ((rect.top + rect.height) >= windowHeight * threshold);
    const horInView = (rect.left <= windowWidth * (1 - threshold)) && ((rect.left + rect.width) >= windowWidth * threshold);
    
    return vertInView && horInView;
}

/**
 * Add CSS class with animation
 * @param {Element} element - DOM element
 * @param {string} className - CSS class name
 * @param {number} duration - Animation duration
 */
function addClassWithAnimation(element, className, duration = CONFIG.animations.duration.base) {
    element.classList.add(className);
    
    setTimeout(() => {
        element.classList.remove(className);
    }, duration);
}

/**
 * Create loading spinner element
 * @param {string} size - Spinner size (small, medium, large)
 * @returns {Element} Spinner element
 */
function createLoadingSpinner(size = 'medium') {
    const spinner = document.createElement('div');
    spinner.className = `loading-spinner loading-spinner--${size}`;
    return spinner;
}

/**
 * Show notification
 * @param {string} message - Notification message
 * @param {string} type - Notification type (success, error, info, warning)
 * @param {number} duration - Display duration in milliseconds
 */
function showNotification(message, type = 'info', duration = 3000) {
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
        <div class="notification__content">
            <span class="notification__message">${message}</span>
            <button class="notification__close" aria-label="Fermer">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove
    setTimeout(() => {
        notification.remove();
    }, duration);
    
    // Manual close
    notification.querySelector('.notification__close').addEventListener('click', () => {
        notification.remove();
    });
}

/**
 * Validate email format
 * @param {string} email - Email address
 * @returns {boolean} Is valid email
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Validate phone format
 * @param {string} phone - Phone number
 * @returns {boolean} Is valid phone
 */
function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
}

/**
 * Format phone number
 * @param {string} phone - Phone number
 * @returns {string} Formatted phone
 */
function formatPhone(phone) {
    const cleaned = phone.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);
    
    if (match) {
        return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    
    return phone;
}

/**
 * Get device type
 * @returns {string} Device type (mobile, tablet, desktop)
 */
function getDeviceType() {
    const width = window.innerWidth;
    
    if (width < CONFIG.ui.mobileBreakpoint) {
        return 'mobile';
    } else if (width < CONFIG.ui.tabletBreakpoint) {
        return 'tablet';
    } else {
        return 'desktop';
    }
}

/**
 * Check if device supports touch
 * @returns {boolean} Supports touch
 */
function isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

/**
 * Get random item from array
 * @param {Array} array - Source array
 * @returns {*} Random item
 */
function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

/**
 * Shuffle array
 * @param {Array} array - Array to shuffle
 * @returns {Array} Shuffled array
 */
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

/**
 * Deep clone object
 * @param {Object} obj - Object to clone
 * @returns {Object} Cloned object
 */
function deepClone(obj) {
    if (obj === null || typeof obj !== 'object') return obj;
    if (obj instanceof Date) return new Date(obj.getTime());
    if (obj instanceof Array) return obj.map(item => deepClone(item));
    if (typeof obj === 'object') {
        const clonedObj = {};
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                clonedObj[key] = deepClone(obj[key]);
            }
        }
        return clonedObj;
    }
}

/**
 * Local storage helper
 */
const Storage = {
    set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (error) {
            console.error('Error saving to localStorage:', error);
            return false;
        }
    },
    
    get(key, defaultValue = null) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (error) {
            console.error('Error reading from localStorage:', error);
            return defaultValue;
        }
    },
    
    remove(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (error) {
            console.error('Error removing from localStorage:', error);
            return false;
        }
    },
    
    clear() {
        try {
            localStorage.clear();
            return true;
        } catch (error) {
            console.error('Error clearing localStorage:', error);
            return false;
        }
    }
};

/**
 * Cookie helper
 */
const Cookie = {
    set(name, value, days = 7) {
        const expires = new Date();
        expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
        document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
    },
    
    get(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    },
    
    remove(name) {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }
};

// Export utilities
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        debounce,
        throttle,
        formatPrice,
        generateWhatsAppURL,
        generateContactWhatsAppURL,
        smoothScrollTo,
        isElementInViewport,
        addClassWithAnimation,
        createLoadingSpinner,
        showNotification,
        isValidEmail,
        isValidPhone,
        formatPhone,
        getDeviceType,
        isTouchDevice,
        getRandomItem,
        shuffleArray,
        deepClone,
        Storage,
        Cookie
    };
}