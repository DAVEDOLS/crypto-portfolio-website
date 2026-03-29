// =============================================
// CryptoPortfolio - Main JavaScript
// Shared functionality across all pages
// =============================================

// Dark Mode Toggle
function toggleDarkMode() {
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('darkMode', document.documentElement.classList.contains('dark'));
}

// Initialize Dark Mode from saved preference
function initDarkMode() {
    const savedDarkMode = localStorage.getItem('darkMode');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedDarkMode === 'true' || (savedDarkMode === null && prefersDark)) {
        document.documentElement.classList.add('dark');
    }
}

// Smooth scrolling for anchor links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Mobile Menu Toggle (for future enhancement)
function initMobileMenu() {
    // You can expand this later if you want a full hamburger menu
    console.log('%cMobile menu ready (expandable)', 'color: #22c55e; font-size: 12px');
}

// Add active class to current page in navigation
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    document.querySelectorAll('nav a').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || 
            (currentPage === '' && href === 'index.html')) {
            link.classList.add('active', 'text-green-500', 'font-semibold');
        }
    });
}

// Format currency helper
function formatPrice(price) {
    if (price < 1) {
        return '$' + price.toFixed(4);
    }
    return '$' + price.toLocaleString('en-US');
}

// Format percentage helper
function formatPercentage(change) {
    const sign = change >= 0 ? '+' : '';
    return `${sign}${change.toFixed(2)}%`;
}

// Generic "Add to Portfolio" function
function addToPortfolio(coinName) {
    if (!coinName) return;
    
    const message = `✅ ${coinName} has been added to your portfolio!`;
    
    // Simple toast notification
    showToast(message);
    
    // In a real app, you would save to localStorage or backend here
    console.log(`Added to portfolio: ${coinName}`);
}

// Simple Toast Notification
function showToast(message, duration = 3000) {
    // Create toast element
    const toast = document.createElement('div');
    toast.style.position = 'fixed';
    toast.style.bottom = '24px';
    toast.style.left = '50%';
    toast.style.transform = 'translateX(-50%)';
    toast.style.backgroundColor = '#166534';
    toast.style.color = 'white';
    toast.style.padding = '14px 24px';
    toast.style.borderRadius = '9999px';
    toast.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.2)';
    toast.style.zIndex = '10000';
    toast.style.whiteSpace = 'nowrap';
    toast.style.fontWeight = '500';
    toast.style.opacity = '0';
    toast.style.transition = 'all 0.3s ease';
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    // Show toast
    setTimeout(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateX(-50%) translateY(-10px)';
    }, 10);
    
    // Hide and remove toast
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(-50%)';
        
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, duration);
}

// Initialize all shared functionality
function initializeApp() {
    console.log('%c🚀 CryptoPortfolio initialized successfully!', 'color: #22c55e; font-weight: bold;');
    
    initDarkMode();
    initSmoothScroll();
    initMobileMenu();
    setActiveNavLink();
    
    // Make key functions globally available
    window.toggleDarkMode = toggleDarkMode;
    window.addToPortfolio = addToPortfolio;
    window.formatPrice = formatPrice;
    window.formatPercentage = formatPercentage;
    window.showToast = showToast;
}

// Run when DOM is fully loaded
document.addEventListener('DOMContentLoaded', initializeApp);

// Bonus: Keyboard shortcut for dark mode (Ctrl/Cmd + Shift + D)
document.addEventListener('keydown', function(e) {
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'd') {
        e.preventDefault();
        toggleDarkMode();
    }
});