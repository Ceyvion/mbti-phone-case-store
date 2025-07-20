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

// State
let cartCount = 0;
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
    card.addEventListener('click', function() {
        const type = this.querySelector('.mbti-type').textContent;
        const name = this.querySelector('.mbti-name').textContent;
        
        console.log(`Selected MBTI type: ${type} - ${name}`);
        
        // Add ripple effect
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
        
        // Scroll to products section
        const shopSection = document.querySelector('#shop');
        if (shopSection) {
            shopSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
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

quickViewBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        
        // Increment cart count
        cartCount++;
        cartCountEl.textContent = cartCount;
        
        // Animate cart count
        cartCountEl.style.transform = 'scale(1.2)';
        setTimeout(() => {
            cartCountEl.style.transform = 'scale(1)';
        }, 200);
        
        // Show toast notification
        showToast('Item added to cart!');
    });
});

// Toast notification function
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: var(--color-black);
        color: var(--color-white);
        padding: 16px 24px;
        border-radius: 4px;
        font-size: 14px;
        transform: translateY(100px);
        transition: transform 0.3s ease;
        z-index: 1000;
    `;
    
    document.body.appendChild(toast);
    
    // Animate in
    setTimeout(() => {
        toast.style.transform = 'translateY(0)';
    }, 10);
    
    // Remove after 3 seconds
    setTimeout(() => {
        toast.style.transform = 'translateY(100px)';
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
// Initialize
// =====================================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('PERSONA - MBTI Phone Case Store initialized');
    
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