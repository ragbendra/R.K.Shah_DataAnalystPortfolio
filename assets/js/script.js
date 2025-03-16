// Main script file with modular imports
import './navbar.js';
import './dropdown.js';
import './projectFilter.js';
import './smoothScroll.js';
import './intersectionObserver.js';
import './modal.js';
import './highlightSQL.js';
import './tippy.js';
import './circuitTraceAnimation.js';
import './skillsBgAnimation.js';
import './textParticleAnimation.js';
import initProjectFilters from './projectFilter.js';
import initCircuitTraceAnimation from './circuitTraceAnimation.js';
import initSkillsBgAnimation from './skillsBgAnimation.js';
import initTextParticleAnimation from './textParticleAnimation.js';

// Utility function to get base path
const getBasePath = () => {
    const pathArray = window.location.pathname.split('/');
    const repoName = pathArray[1];
    return repoName ? `/${repoName}` : '';
};

// Global variables
const menuLinks = document.querySelectorAll('.nav-links a');

// Performance optimization: Defer non-critical operations
const deferredOperations = [];

// Add operations to the deferred queue
const addDeferredOperation = (fn) => {
    deferredOperations.push(fn);
};

// Process deferred operations during idle time
const processDeferredOperations = () => {
    if (deferredOperations.length === 0) return;
    
    // Use requestIdleCallback if available, otherwise use setTimeout
    if ('requestIdleCallback' in window) {
        requestIdleCallback(() => {
            const operation = deferredOperations.shift();
            if (operation) operation();
            if (deferredOperations.length > 0) processDeferredOperations();
        });
    } else {
        setTimeout(() => {
            const operation = deferredOperations.shift();
            if (operation) operation();
            if (deferredOperations.length > 0) processDeferredOperations();
        }, 1);
    }
};

// Ensure skills section is visible even if JS is slow to load
window.addEventListener('load', () => {
    // Remove loading class from skills section after page fully loads
    const skillsSection = document.querySelector('.skills');
    if (skillsSection) {
        skillsSection.classList.remove('loading');
    }
    
    // Make all skill cards visible with basic styling
    document.querySelectorAll('.flip-card').forEach(card => {
        card.style.opacity = '1';
        card.style.visibility = 'visible';
    });
    
    // Start processing deferred operations after page load
    processDeferredOperations();
});

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Critical operations that should run immediately
    updateActiveMenuItem();
    handleNavigation();
    
    // Initialize skills section without animations
    initSkillsBgAnimation();
    
    // Set a timeout to ensure skills section is visible even if JS fails
    setTimeout(() => {
        const skillsSection = document.querySelector('.skills');
        if (skillsSection) {
            // Make all skill cards visible with basic styling
            document.querySelectorAll('.flip-card').forEach(card => {
                card.style.opacity = '1';
                card.style.visibility = 'visible';
                card.style.transition = 'none';
                card.style.transform = 'none';
            });
        }
    }, 100); // Shorter timeout for faster display
    
    // Remove any existing animations from about-description elements
    document.querySelectorAll('.about-description').forEach(el => {
        // Remove all classes that might trigger animations
        el.classList.remove('animate', 'active');
        
        // Remove any animation-related inline styles
        el.style.animation = 'none';
        el.style.transition = 'none';
        el.style.transform = 'none';
        el.style.opacity = '1';
        
        // Remove any child elements that might be part of animations
        Array.from(el.children).forEach(child => {
            if (['circuit-line', 'left-split', 'right-split', 'text-particle-canvas'].includes(child.className)) {
                child.remove();
            }
        });
    });
    
    // Remove circuit trace background from about section
    const aboutText = document.querySelector('.about-text');
    if (aboutText) {
        // Remove the ::before pseudo-element that creates the grid background
        aboutText.style.position = 'relative';
        
        // Create and apply a style element to override the ::before pseudo-element
        const styleElement = document.createElement('style');
        styleElement.textContent = `
            .about-text::before {
                display: none !important;
                content: none !important;
                background: none !important;
            }
        `;
        document.head.appendChild(styleElement);
    }
    
    // Defer non-critical operations
    addDeferredOperation(() => {
        // Initialize project filters
        initProjectFilters();
    });
    
    // Optimize image loading
    addDeferredOperation(() => {
        lazyLoadImages();
    });
    
    // Start processing deferred operations
    processDeferredOperations();
});

// Lazy load images for better performance
function lazyLoadImages() {
    // Use Intersection Observer if available
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.getAttribute('data-src');
                    if (src) {
                        img.src = src;
                        img.removeAttribute('data-src');
                    }
                    observer.unobserve(img);
                }
            });
        });
        
        // Target all images with data-src attribute
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // Fallback for browsers that don't support Intersection Observer
        document.querySelectorAll('img[data-src]').forEach(img => {
            img.src = img.getAttribute('data-src');
            img.removeAttribute('data-src');
        });
    }
}

// Update active menu item based on scroll position
function updateActiveMenuItem() {
    const sections = document.querySelectorAll('section');
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - sectionHeight / 3) {
            current = section.getAttribute('id');
        }
    });

    menuLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') && link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
}

// Handle navigation links active state
function handleNavigation() {
    // Get current page path
    const currentPath = window.location.pathname;
    
    // Set active state for navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        const linkPath = link.getAttribute('href');
        if (linkPath && (
            linkPath === currentPath || 
            (currentPath.includes(linkPath) && linkPath !== '#' && linkPath !== '/')
        )) {
            link.classList.add('active');
        }
    });
}

// Listen for navigation changes
window.addEventListener('load', handleNavigation);
window.addEventListener('hashchange', handleNavigation);

// Export functions that might be needed by other modules
export {
    getBasePath
};
