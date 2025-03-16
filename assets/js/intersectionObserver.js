/**
 * Intersection Observer functionality
 * Handles scroll-based animations and lazy loading
 */

// Initialize the intersection observer
export function initScrollObserver() {
    // Options for the observer
    const observerOptions = {
        root: null, // Use viewport as root
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of element is visible
    };
    
    // Create observer for animations
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                // Optionally unobserve after animation
                if (entry.target.dataset.observeOnce) {
                    animationObserver.unobserve(entry.target);
                }
            } else if (!entry.target.dataset.observeOnce) {
                entry.target.classList.remove('in-view');
            }
        });
    }, observerOptions);
    
    // Observe elements with animation classes
    document.querySelectorAll('.fade-in, .slide-in, .scale-in').forEach(element => {
        animationObserver.observe(element);
    });
    
    // Create observer for lazy loading
    const lazyLoadObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                // Handle images
                if (element.tagName === 'IMG' && element.dataset.src) {
                    element.src = element.dataset.src;
                    element.removeAttribute('data-src');
                }
                
                // Handle background images
                if (element.dataset.background) {
                    element.style.backgroundImage = `url('${element.dataset.background}')`;
                    element.removeAttribute('data-background');
                }
                
                // Handle iframes (like YouTube videos)
                if (element.tagName === 'IFRAME' && element.dataset.src) {
                    element.src = element.dataset.src;
                    element.removeAttribute('data-src');
                }
                
                lazyLoadObserver.unobserve(element);
            }
        });
    }, {
        rootMargin: '200px 0px' // Start loading when within 200px of viewport
    });
    
    // Observe elements to lazy load
    document.querySelectorAll('[data-src], [data-background]').forEach(element => {
        lazyLoadObserver.observe(element);
    });
}

// Export the initialization function
export default initScrollObserver;
