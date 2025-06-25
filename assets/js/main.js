// Main JavaScript for Hemant Ghuge Portfolio
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeNavigation();
    initializeFormHandling();
    initializeAnimations();
    initializeExternalLinkTracking();
    initializeAccessibility();
    
    console.log('Portfolio website initialized successfully');
});

// Navigation functionality
function initializeNavigation() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            const isHidden = mobileMenu.classList.contains('hidden');
            
            if (isHidden) {
                mobileMenu.classList.remove('hidden');
                mobileMenuButton.innerHTML = '<i class="fas fa-times text-xl"></i>';
                mobileMenuButton.setAttribute('aria-expanded', 'true');
            } else {
                mobileMenu.classList.add('hidden');
                mobileMenuButton.innerHTML = '<i class="fas fa-bars text-xl"></i>';
                mobileMenuButton.setAttribute('aria-expanded', 'false');
            }
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (mobileMenu && !mobileMenu.contains(event.target) && 
            !mobileMenuButton.contains(event.target) && 
            !mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
            mobileMenuButton.innerHTML = '<i class="fas fa-bars text-xl"></i>';
            mobileMenuButton.setAttribute('aria-expanded', 'false');
        }
    });
    
    // Close mobile menu when window is resized to desktop
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 768 && mobileMenu && !mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
            mobileMenuButton.innerHTML = '<i class="fas fa-bars text-xl"></i>';
            mobileMenuButton.setAttribute('aria-expanded', 'false');
        }
    });
    
    // Smooth scrolling for anchor links
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
    
    // Update active navigation state based on current page
    updateActiveNavigation();
}

// Update active navigation state
function updateActiveNavigation() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && (currentPath.endsWith(href) || (href === 'index.html' && currentPath === '/'))) {
            link.classList.add('active');
            if (link.classList.contains('nav-link')) {
                link.classList.add('text-primary', 'font-medium');
                link.classList.remove('text-gray-600');
            }
        } else {
            link.classList.remove('active');
            if (link.classList.contains('nav-link')) {
                link.classList.remove('text-primary', 'font-medium');
                link.classList.add('text-gray-600');
            }
        }
    });
}

// Form handling
function initializeFormHandling() {
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    const statusMessage = document.getElementById('status-message');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleContactFormSubmission(this, formStatus, statusMessage);
        });
    }
    
    // Form validation
    const formInputs = document.querySelectorAll('input, textarea, select');
    formInputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearFieldError);
    });
}

// Handle contact form submission
function handleContactFormSubmission(form, statusElement, messageElement) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Show loading state
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    submitButton.classList.add('loading');
    
    // Simulate form submission (replace with actual endpoint)
    setTimeout(() => {
        // For demo purposes, we'll show a success message
        // In production, this would be an actual API call
        showFormStatus(statusElement, messageElement, 'success', 
            'Thank you for your message! I\'ll get back to you within 24-48 hours.');
        
        // Reset form
        form.reset();
        
        // Reset button
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        submitButton.classList.remove('loading');
        
        // Track form submission
        trackEvent('form_submission', 'contact', data.subject || 'general');
        
    }, 1500);
}

// Show form status
function showFormStatus(statusElement, messageElement, type, message) {
    if (statusElement && messageElement) {
        statusElement.className = `mt-4 p-4 rounded-lg ${type === 'success' ? 'success-state' : 'error-state'}`;
        messageElement.textContent = message;
        statusElement.classList.remove('hidden');
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            statusElement.classList.add('hidden');
        }, 5000);
    }
}

// Field validation
function validateField(event) {
    const field = event.target;
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    // Remove existing error styling
    field.classList.remove('border-red-500');
    removeFieldError(field);
    
    // Validate based on field type
    switch (field.type) {
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            isValid = emailRegex.test(value);
            errorMessage = 'Please enter a valid email address';
            break;
        case 'text':
            if (field.hasAttribute('required')) {
                isValid = value.length > 0;
                errorMessage = 'This field is required';
            }
            break;
        case 'textarea':
            if (field.hasAttribute('required')) {
                isValid = value.length > 0;
                errorMessage = 'Please enter your message';
            }
            break;
    }
    
    if (!isValid) {
        showFieldError(field, errorMessage);
    }
    
    return isValid;
}

// Show field error
function showFieldError(field, message) {
    field.classList.add('border-red-500');
    
    const errorElement = document.createElement('p');
    errorElement.className = 'text-red-500 text-sm mt-1 field-error';
    errorElement.textContent = message;
    
    field.parentNode.appendChild(errorElement);
}

// Remove field error
function removeFieldError(field) {
    const errorElement = field.parentNode.querySelector('.field-error');
    if (errorElement) {
        errorElement.remove();
    }
}

// Clear field error on input
function clearFieldError(event) {
    const field = event.target;
    field.classList.remove('border-red-500');
    removeFieldError(field);
}

// Animation initialization
function initializeAnimations() {
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Add staggered animation for timeline items
                if (entry.target.classList.contains('timeline-item')) {
                    const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 200;
                    entry.target.style.animationDelay = `${delay}ms`;
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.timeline-item, .project-card, .animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
    
    // Typing animation for hero text (if present)
    const typingElement = document.querySelector('.typing-animation');
    if (typingElement) {
        startTypingAnimation(typingElement);
    }
}

// Typing animation
function startTypingAnimation(element) {
    const text = element.textContent;
    element.textContent = '';
    let i = 0;
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, 100);
        }
    }
    
    type();
}

// External link tracking
function initializeExternalLinkTracking() {
    document.querySelectorAll('a[href^="http"], a[href^="https"]').forEach(link => {
        link.addEventListener('click', function(e) {
            const url = this.href;
            const domain = new URL(url).hostname;
            
            // Track external link clicks
            trackEvent('external_link_click', domain, url);
            
            // Add visual feedback
            this.style.opacity = '0.7';
            setTimeout(() => {
                this.style.opacity = '1';
            }, 200);
        });
    });
}

// Global function for tracking external links (called from HTML)
function trackExternalLink(platform, source) {
    trackEvent('external_link_click', platform, source);
}

// Event tracking
function trackEvent(action, category, label) {
    // In production, this would integrate with Google Analytics or similar
    console.log(`Event tracked: ${action} - ${category} - ${label}`);
    
    // Example Google Analytics 4 tracking (uncomment when GA is set up)
    // if (typeof gtag !== 'undefined') {
    //     gtag('event', action, {
    //         event_category: category,
    //         event_label: label
    //     });
    // }
}

// Accessibility enhancements
function initializeAccessibility() {
    // Add skip link
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add main content landmark if not present
    if (!document.getElementById('main-content')) {
        const main = document.querySelector('main') || document.querySelector('.main-content');
        if (main) {
            main.id = 'main-content';
        }
    }
    
    // Keyboard navigation for cards
    document.querySelectorAll('.project-card').forEach(card => {
        card.setAttribute('tabindex', '0');
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const button = this.querySelector('button');
                if (button) {
                    button.click();
                }
            }
        });
    });
    
    // Focus management for modals
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const openModal = document.querySelector('.modal:not(.hidden)');
            if (openModal) {
                const modalId = openModal.id;
                closeModal(modalId);
            }
        }
    });
    
    // Announce page changes for screen readers
    announcePageChange();
}

// Announce page change
function announcePageChange() {
    const title = document.title;
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = `Page loaded: ${title}`;
    document.body.appendChild(announcement);
    
    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 1000);
}

// Utility functions
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

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Performance monitoring
function monitorPerformance() {
    if ('performance' in window) {
        window.addEventListener('load', () => {
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            console.log(`Page load time: ${loadTime}ms`);
            
            // Track performance metrics
            trackEvent('performance', 'page_load_time', loadTime);
        });
    }
}

// Initialize performance monitoring
monitorPerformance();

// Global modal functions (used in HTML)
window.openModal = function(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
        
        // Focus management
        const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (focusableElements.length > 0) {
            focusableElements[0].focus();
        }
        
        // Track modal open
        trackEvent('modal_open', modalId, 'user_interaction');
    }
};

window.closeModal = function(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('show');
        document.body.style.overflow = '';
        
        // Track modal close
        trackEvent('modal_close', modalId, 'user_interaction');
    }
};

// Export functions for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        validateField,
        trackEvent,
        debounce,
        throttle
    };
}
