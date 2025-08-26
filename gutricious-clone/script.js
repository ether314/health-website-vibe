// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initCookieModal();
    initSmoothScrolling();
    initFormHandling();
    initNavigation();
    initAnimations();
});

// Cookie Modal Functionality
function initCookieModal() {
    const cookieModal = document.getElementById('cookieModal');
    const continueWithoutBtn = document.querySelector('.continue-without');
    const acceptBtn = document.querySelector('.accept-continue');
    const setPreferencesBtn = document.querySelector('.set-preferences');

    // Show cookie modal on page load (after a short delay)
    setTimeout(() => {
        cookieModal.classList.add('show');
    }, 1000);

    // Continue without accepting
    continueWithoutBtn.addEventListener('click', () => {
        cookieModal.classList.remove('show');
        localStorage.setItem('cookiePreference', 'declined');
    });

    // Accept and continue
    acceptBtn.addEventListener('click', () => {
        cookieModal.classList.remove('show');
        localStorage.setItem('cookiePreference', 'accepted');
    });

    // Set preferences (for now, just close modal)
    setPreferencesBtn.addEventListener('click', () => {
        cookieModal.classList.remove('show');
        localStorage.setItem('cookiePreference', 'custom');
    });

    // Check if user has already made a choice
    const cookiePreference = localStorage.getItem('cookiePreference');
    if (cookiePreference) {
        cookieModal.classList.remove('show');
    }

    // Close modal when clicking outside
    cookieModal.addEventListener('click', (e) => {
        if (e.target === cookieModal) {
            cookieModal.classList.remove('show');
        }
    });
}

// Smooth Scrolling
function initSmoothScrolling() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Scroll indicator functionality
    const scrollArrow = document.querySelector('.scroll-arrow');
    if (scrollArrow) {
        scrollArrow.addEventListener('click', () => {
            const nextSection = document.querySelector('.body-lock');
            if (nextSection) {
                nextSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
}

// Form Handling
function initFormHandling() {
    const signupForm = document.querySelector('.signup-form');
    
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const submitBtn = this.querySelector('button[type="submit"]');
            const email = emailInput.value.trim();
            
            // Basic email validation
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            // Simulate form submission
            submitBtn.textContent = 'Enlisting...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                showNotification('Thank you! You\'ve been added to our early access list.', 'success');
                emailInput.value = '';
                submitBtn.textContent = 'Enlist';
                submitBtn.disabled = false;
            }, 2000);
        });
    }
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '15px 20px',
        borderRadius: '8px',
        color: 'white',
        fontWeight: '600',
        zIndex: '3000',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease',
        maxWidth: '300px',
        wordWrap: 'break-word'
    });
    
    // Set background color based on type
    switch (type) {
        case 'success':
            notification.style.background = '#4ecdc4';
            break;
        case 'error':
            notification.style.background = '#ef5350';
            break;
        default:
            notification.style.background = '#667eea';
    }
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after delay
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 4000);
}

// Navigation functionality
function initNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Header scroll effect
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
        
        lastScrollY = currentScrollY;
    });
}

// Animation functionality
function initAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.blueprint-card, .cornerstone-card, .food-card, .sugar-card');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Add CSS for animate-in class
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
    
    // Play button interaction
    const playBtn = document.querySelector('.play-btn');
    if (playBtn) {
        playBtn.addEventListener('click', () => {
            // Simulate video play (you could integrate with actual video player)
            showNotification('Video feature coming soon!', 'info');
        });
    }
    
    // Read more buttons
    const readMoreBtns = document.querySelectorAll('.read-more');
    readMoreBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            showNotification('More details coming soon!', 'info');
        });
    });
    
    // CTA button interactions
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const emailSignup = document.getElementById('footer');
            if (emailSignup) {
                emailSignup.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Parallax effect for hero section
function initParallax() {
    const hero = document.querySelector('.hero');
    
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        });
    }
}

// Initialize parallax (optional - can be resource intensive)
// initParallax();

// Utility function to debounce scroll events
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

// Add loading state management
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Add loaded class styles
    const loadedStyles = document.createElement('style');
    loadedStyles.textContent = `
        body.loaded {
            opacity: 1;
            transition: opacity 0.3s ease;
        }
        
        body:not(.loaded) {
            opacity: 0;
        }
    `;
    document.head.appendChild(loadedStyles);
});

// Handle resize events
window.addEventListener('resize', debounce(() => {
    // Recalculate any size-dependent elements
    const heroContent = document.querySelector('.hero-content');
    if (heroContent && window.innerWidth <= 768) {
        heroContent.style.gridTemplateColumns = '1fr';
    } else if (heroContent) {
        heroContent.style.gridTemplateColumns = '1fr 1fr';
    }
}, 250));

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    // Escape key closes cookie modal
    if (e.key === 'Escape') {
        const cookieModal = document.getElementById('cookieModal');
        if (cookieModal && cookieModal.classList.contains('show')) {
            cookieModal.classList.remove('show');
        }
    }
    
    // Enter key on buttons
    if (e.key === 'Enter' && e.target.tagName === 'BUTTON') {
        e.target.click();
    }
});

// Add focus management for accessibility
document.addEventListener('focusin', (e) => {
    if (e.target.matches('button, a, input, [tabindex]')) {
        e.target.style.outline = '2px solid #4ecdc4';
        e.target.style.outlineOffset = '2px';
    }
});

document.addEventListener('focusout', (e) => {
    if (e.target.matches('button, a, input, [tabindex]')) {
        e.target.style.outline = '';
        e.target.style.outlineOffset = '';
    }
});

// Console welcome message
console.log('%c🥗 Gutricious Clone', 'color: #4ecdc4; font-size: 20px; font-weight: bold;');
console.log('%cWelcome to the Gutricious website clone!', 'color: #667eea; font-size: 14px;');
console.log('%cThis is a demonstration clone of the original Gutricious website.', 'color: #666; font-size: 12px;');
