// =====================================================
// PERSONA - MBTI Phone Case Store
// Main JavaScript File
// =====================================================

// DOM Elements
const cursor = document.querySelector('.cursor');
const filterBtns = document.querySelectorAll('.filter-btn');
const mbtiCards = document.querySelectorAll('.mbti-card');
const cartCountEl = document.querySelector('.cart-count');
const quickViewBtns = document.querySelectorAll('.quick-view button');

// Dark Mode Elements
const themeToggle = document.getElementById('theme-toggle');
const sunIcon = document.querySelector('.sun-icon');
const moonIcon = document.querySelector('.moon-icon');

// Cart Elements
const cartToggle = document.getElementById('cart-toggle');
const cartSidebar = document.getElementById('cart-sidebar');
const cartOverlay = document.getElementById('cart-overlay');
const cartClose = document.getElementById('cart-close');
const cartCloseBtn = document.getElementById('cart-close-btn');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalEl = document.getElementById('cart-total');

// State
let cartItems = [];
let cartTotal = 0;
let mouseX = 0;
let mouseY = 0;

// =====================================================
// Custom Cursor
// =====================================================

// Update cursor position
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
});

// Add hover effect to interactive elements
const interactiveElements = document.querySelectorAll('a, button, .mbti-card, .product-card');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
});

// =====================================================
// Smooth Scrolling
// =====================================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 100; // Account for fixed navigation
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// =====================================================
// Filter Functionality
// =====================================================

filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        this.classList.add('active');
        
        // Here you would typically filter the products
        const filterType = this.textContent;
        console.log(`Filtering by: ${filterType}`);
        
        // Add filter animation
        const productCards = document.querySelectorAll('.product-card');
        productCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 50);
        });
    });
});

// =====================================================
// MBTI Card Interactions
// =====================================================

mbtiCards.forEach(card => {
    card.addEventListener('click', function(event) {
        const type = this.querySelector('.mbti-type').textContent;
        const name = this.querySelector('.mbti-name').textContent;
        
        console.log(`Selected MBTI type: ${type} - ${name}`);
        
        // Navigate to MBTI type page
        window.location.href = `mbti/${type.toLowerCase()}.html`;
        
        // Add ripple effect for immediate feedback
        const ripple = document.createElement('div');
        ripple.style.position = 'absolute';
        ripple.style.width = '20px';
        ripple.style.height = '20px';
        ripple.style.background = 'rgba(0, 102, 255, 0.3)';
        ripple.style.borderRadius = '50%';
        ripple.style.transform = 'translate(-50%, -50%)';
        ripple.style.pointerEvents = 'none';
        ripple.style.animation = 'ripple 0.6s ease-out';
        
        const rect = this.getBoundingClientRect();
        ripple.style.left = (event.clientX - rect.left) + 'px';
        ripple.style.top = (event.clientY - rect.top) + 'px';
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        0% {
            width: 20px;
            height: 20px;
            opacity: 1;
        }
        100% {
            width: 200px;
            height: 200px;
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// =====================================================
// Cart Functionality
// =====================================================

quickViewBtns.forEach((btn, index) => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        
        // Get product ID from the product card
        const productCard = btn.closest('.product-card');
        const productTitle = productCard.querySelector('.product-title').textContent;
        
        // Extract MBTI type from title
        const mbtiType = productTitle.split(' ')[0];
        
        // Add to cart
        addToCart(mbtiType);
        
        // Animate cart count
        cartCountEl.style.transform = 'scale(1.2)';
        setTimeout(() => {
            cartCountEl.style.transform = 'scale(1)';
        }, 200);
    });
});

// Toast notification function
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    // Animate in
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);
    
    // Remove after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// =====================================================
// Intersection Observer for Animations
// =====================================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
        }
    });
}, observerOptions);

// Observe all fade-in elements
document.querySelectorAll('.fade-in').forEach(el => {
    el.style.animationPlayState = 'paused';
    observer.observe(el);
});

// =====================================================
// Navigation Scroll Effect
// =====================================================

let lastScroll = 0;
const nav = document.querySelector('nav');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add shadow on scroll
    if (currentScroll > 50) {
        nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        nav.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// =====================================================
// Product Card Hover Effect
// =====================================================

const productCards = document.querySelectorAll('.product-card');

productCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// =====================================================
// Mobile Menu Toggle (for future implementation)
// =====================================================

function createMobileMenu() {
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
    `;
    
    // Add styles
    const mobileMenuStyles = `
        .mobile-menu-btn {
            display: none;
            flex-direction: column;
            justify-content: space-around;
            width: 30px;
            height: 25px;
            background: transparent;
            border: none;
            cursor: pointer;
            padding: 0;
            z-index: 10;
        }
        
        .mobile-menu-btn span {
            width: 30px;
            height: 3px;
            background: var(--color-black);
            transition: all 0.3s linear;
            position: relative;
            transform-origin: 1px;
        }
        
        @media (max-width: 768px) {
            .mobile-menu-btn {
                display: flex;
                grid-column: 11 / 13;
            }
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = mobileMenuStyles;
    document.head.appendChild(styleSheet);
    
    return mobileMenuBtn;
}

// =====================================================
// Dark Mode Functionality
// =====================================================

// Initialize theme
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        document.documentElement.setAttribute('data-theme', 'dark');
        updateThemeIcons(true);
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        updateThemeIcons(false);
    }
}

// Update theme icons
function updateThemeIcons(isDark) {
    if (isDark) {
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'block';
    } else {
        sunIcon.style.display = 'block';
        moonIcon.style.display = 'none';
    }
}

// Toggle theme
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcons(newTheme === 'dark');
}

// Theme toggle event listener
if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
}

// =====================================================
// Cart Functionality
// =====================================================

// Product data
const products = {
    'INTJ': { name: 'INTJ Architect Case', price: 49.00, type: 'INTJ', description: 'The Architect' },
    'ENFP': { name: 'ENFP Campaigner Case', price: 49.00, type: 'ENFP', description: 'The Campaigner' },
    'ISTP': { name: 'ISTP Virtuoso Case', price: 49.00, type: 'ISTP', description: 'The Virtuoso' },
    'INFJ': { name: 'INFJ Advocate Case', price: 49.00, type: 'INFJ', description: 'The Advocate' },
    'ESTP': { name: 'ESTP Entrepreneur Case', price: 49.00, type: 'ESTP', description: 'The Entrepreneur' },
    'ISFJ': { name: 'ISFJ Defender Case', price: 49.00, type: 'ISFJ', description: 'The Defender' }
};

// Add item to cart
function addToCart(productId, quantity = 1) {
    const product = products[productId];
    if (!product) return;
    
    const existingItem = cartItems.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cartItems.push({
            id: productId,
            name: product.name,
            price: product.price,
            quantity: quantity,
            type: product.type,
            description: product.description
        });
    }
    
    updateCartUI();
    showToast(`${product.name} added to cart!`);
}

// Remove item from cart
function removeFromCart(productId) {
    cartItems = cartItems.filter(item => item.id !== productId);
    updateCartUI();
}

// Update item quantity
function updateQuantity(productId, newQuantity) {
    const item = cartItems.find(item => item.id === productId);
    if (item) {
        if (newQuantity <= 0) {
            removeFromCart(productId);
        } else {
            item.quantity = newQuantity;
            updateCartUI();
        }
    }
}

// Calculate cart total
function calculateCartTotal() {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Update cart UI
function updateCartUI() {
    const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
    cartCountEl.textContent = itemCount;
    
    cartTotal = calculateCartTotal();
    cartTotalEl.textContent = formatPrice(cartTotal);
    
    renderCartItems();
    
    // Save to localStorage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

// Render cart items
function renderCartItems() {
    cartItemsContainer.innerHTML = '';
    
    if (cartItems.length === 0) {
        cartItemsContainer.innerHTML = '<p style="text-align: center; color: var(--color-text-muted); padding: 40px;">Your cart is empty</p>';
        return;
    }
    
    cartItems.forEach(item => {
        const cartItemEl = document.createElement('div');
        cartItemEl.className = 'cart-item';
        cartItemEl.innerHTML = `
            <div class="cart-item-image">
                [${item.type}]
            </div>
            <div class="cart-item-details">
                <h4>${item.name}</h4>
                <p class="cart-item-price">${formatPrice(item.price)}</p>
                <div class="cart-item-quantity">
                    <button class="quantity-btn" onclick="updateQuantity('${item.id}', ${item.quantity - 1})">−</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity('${item.id}', ${item.quantity + 1})">+</button>
                </div>
            </div>
            <div>
                <button class="cart-remove" onclick="removeFromCart('${item.id}')">Remove</button>
            </div>
        `;
        cartItemsContainer.appendChild(cartItemEl);
    });
}

// Open cart
function openCart() {
    cartSidebar.classList.add('open');
    cartOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
}

// Close cart
function closeCart() {
    cartSidebar.classList.remove('open');
    cartOverlay.classList.remove('open');
    document.body.style.overflow = '';
}

// Cart event listeners
if (cartToggle) {
    cartToggle.addEventListener('click', openCart);
}

if (cartClose) {
    cartClose.addEventListener('click', closeCart);
}

if (cartCloseBtn) {
    cartCloseBtn.addEventListener('click', closeCart);
}

if (cartOverlay) {
    cartOverlay.addEventListener('click', closeCart);
}

// Load cart from localStorage
function loadCart() {
    const savedCart = localStorage.getItem('cartItems');
    if (savedCart) {
        cartItems = JSON.parse(savedCart);
        updateCartUI();
    }
}

// =====================================================
// Initialize
// =====================================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('PERSONA - MBTI Phone Case Store initialized');
    
    // Initialize theme
    initializeTheme();
    
    // Load saved cart
    loadCart();
    
    // Add loading animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// =====================================================
// Utility Functions
// =====================================================

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Format price
function formatPrice(price) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(price);
}

// =====================================================
// Export functions for potential use
// =====================================================

window.PERSONA = {
    addToCart: function(productId) {
        cartCount++;
        cartCountEl.textContent = cartCount;
        showToast('Item added to cart!');
    },
    
    filterProducts: function(category) {
        console.log(`Filtering by category: ${category}`);
        // Implementation would go here
    },
    
    selectMBTI: function(type) {
        console.log(`Selected MBTI type: ${type}`);
        // Implementation would go here
    }
};