/**
 * Mobile and Performance Optimizations
 * Detects device capabilities and adjusts the website accordingly
 */

// Use a throttle function to limit how often certain functions can run
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

// Global variables to track device capabilities
let isMobile = false;
let isLowEndDevice = false;
let prefersReducedMotion = false;

document.addEventListener('DOMContentLoaded', () => {
    // Detect device capabilities once at load
    isMobile = window.innerWidth < 768;
    isLowEndDevice = isLowPerformanceDevice();
    prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Initialize optimizations based on device detection
    initOptimizations();

    // Listen for resize events to reapply optimizations, but throttle to avoid performance issues
    window.addEventListener('resize', throttle(() => {
        isMobile = window.innerWidth < 768;
        if (isMobile || isLowEndDevice || prefersReducedMotion) {
            applyPerformanceOptimizations();
        }
    }, 250));

    // Listen for orientation change on mobile devices
    window.addEventListener('orientationchange', throttle(() => {
        fixVhUnits();
    }, 250));
});

// Initialize all optimizations
function initOptimizations() {
    // Apply critical optimizations first
    fixVhUnits();
    improveTouchInteractions();

    // Apply performance optimizations if needed
    if (isMobile || isLowEndDevice || prefersReducedMotion) {
        applyPerformanceOptimizations();
    }

    // Initialize mobile dropdowns after a slight delay to ensure DOM is ready
    setTimeout(() => {
        initMobileDropdowns();
    }, 100);

    // Preload critical resources
    preloadCriticalResources();
}

// Make dropdowns work better on mobile
function initMobileDropdowns() {
    if (window.innerWidth <= 768) {
        // Use event delegation for better performance
        const navContainer = document.querySelector('nav') || document.querySelector('.navbar') || document.body;

        // Remove any existing listeners first to prevent duplicates
        const oldListener = navContainer._dropdownListener;
        if (oldListener) {
            navContainer.removeEventListener('click', oldListener);
        }

        // Create a new listener with event delegation
        const dropdownListener = function(e) {
            const link = e.target.closest('.dropdown > a');
            if (!link) return;

            e.preventDefault();
            e.stopPropagation(); // Prevent event bubbling

            const dropdown = link.parentElement;
            
            // Toggle active class for dropdown
            dropdown.classList.toggle('active');
            
            // Log for debugging
            console.log('Mobile dropdown toggled:', dropdown.classList.contains('active'));
            
            // Close all other dropdowns
            document.querySelectorAll('.dropdown').forEach(d => {
                if (d !== dropdown && d.classList.contains('active')) {
                    d.classList.remove('active');
                }
            });
        };

        // Store the listener for future cleanup
        navContainer._dropdownListener = dropdownListener;

        // Add the listener
        navContainer.addEventListener('click', dropdownListener);

        // Remove any existing document click listener
        const oldDocListener = document._dropdownOutsideClickListener;
        if (oldDocListener) {
            document.removeEventListener('click', oldDocListener);
        }

        // Close dropdowns when clicking outside
        const outsideClickListener = function(e) {
            // Only process if not clicking on a dropdown or its children
            if (!e.target.closest('.dropdown')) {
                document.querySelectorAll('.dropdown.active').forEach(d => {
                    d.classList.remove('active');
                });
            }
        };

        // Store the listener for future cleanup
        document._dropdownOutsideClickListener = outsideClickListener;

        // Add the listener with capture phase to ensure it runs before other handlers
        document.addEventListener('click', outsideClickListener, true);
        
        // Add escape key handler to close dropdowns
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                document.querySelectorAll('.dropdown.active').forEach(d => {
                    d.classList.remove('active');
                });
            }
        });
    }
}

// Make the function globally accessible for other scripts
window.initMobileDropdowns = initMobileDropdowns;

// Fix viewport height issues on mobile browsers
function fixVhUnits() {
    // First we get the viewport height and multiply it by 1% to get a value for a vh unit
    const vh = window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// Improve touch interactions
function improveTouchInteractions() {
    // Add touch-specific classes
    if ('ontouchstart' in window || navigator.maxTouchPoints) {
        document.body.classList.add('touch-device');
    }

    // Fix 300ms delay on mobile browsers
    document.addEventListener('touchstart', function() {}, {passive: true});

    // Use event delegation for flip cards to improve performance
    const mainContainer = document.querySelector('main') || document.body;

    // Remove any existing listeners first to prevent duplicates
    const oldTouchListener = mainContainer._flipCardTouchListener;
    if (oldTouchListener) {
        mainContainer.removeEventListener('touchstart', oldTouchListener);
    }

    // Track touch interactions
    let touchStartTime = 0;
    let touchStartX = 0;
    let touchStartY = 0;

    // Create a new listener with event delegation
    const flipCardTouchListener = function(e) {
        const card = e.target.closest('.flip-card');
        if (!card || !document.body.classList.contains('touch-device')) return;

        // Store touch start info
        touchStartTime = Date.now();
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;

        // Mark card as being touched
        card.dataset.touchStarted = 'true';
    };

    // Store the listener for future cleanup
    mainContainer._flipCardTouchListener = flipCardTouchListener;

    // Add the listener
    mainContainer.addEventListener('touchstart', flipCardTouchListener, {passive: true});

    // Handle touch end with debounce to prevent multiple rapid flips
    const oldTouchEndListener = mainContainer._flipCardTouchEndListener;
    if (oldTouchEndListener) {
        mainContainer.removeEventListener('touchend', oldTouchEndListener);
    }

    // Last flip time to prevent spam
    let lastFlipTime = 0;
    const FLIP_COOLDOWN = 300;

    const flipCardTouchEndListener = function(e) {
        const card = e.target.closest('.flip-card');
        if (!card || !document.body.classList.contains('touch-device')) return;

        // Check if this is a tap (not a scroll)
        const touchEndTime = Date.now();
        const touchDuration = touchEndTime - touchStartTime;

        // Only flip if it was a short tap and not a scroll
        if (touchDuration < 300 && card.dataset.touchStarted === 'true') {
            // Anti-spam protection
            if (touchEndTime - lastFlipTime < FLIP_COOLDOWN) return;
            lastFlipTime = touchEndTime;

            e.preventDefault();
            card.classList.toggle('flipped');
        }

        // Reset touch state
        card.dataset.touchStarted = 'false';
    };

    // Store the listener for future cleanup
    mainContainer._flipCardTouchEndListener = flipCardTouchEndListener;

    // Add the listener
    mainContainer.addEventListener('touchend', flipCardTouchEndListener, {passive: false});

    // Handle touch move to cancel flip on scroll
    const oldTouchMoveListener = mainContainer._flipCardTouchMoveListener;
    if (oldTouchMoveListener) {
        mainContainer.removeEventListener('touchmove', oldTouchMoveListener);
    }

    const flipCardTouchMoveListener = function(e) {
        const card = e.target.closest('.flip-card');
        if (!card) return;

        // Cancel flip on scroll
        card.dataset.touchStarted = 'false';
    };

    // Store the listener for future cleanup
    mainContainer._flipCardTouchMoveListener = flipCardTouchMoveListener;

    // Add the listener
    mainContainer.addEventListener('touchmove', flipCardTouchMoveListener, {passive: true});
}

/**
 * Detects if the device is likely a low-performance device
 * @returns {boolean} True if the device is likely low-performance
 */
function isLowPerformanceDevice() {
    // Check for hardware concurrency (CPU cores)
    const lowCPUCores = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4;

    // Check for device memory (if available)
    const lowMemory = navigator.deviceMemory && navigator.deviceMemory <= 4;

    // Check for mobile device
    const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    // Check for connection speed (if available)
    const slowConnection = navigator.connection &&
        (navigator.connection.effectiveType === 'slow-2g' ||
         navigator.connection.effectiveType === '2g' ||
         navigator.connection.effectiveType === '3g');

    // If any of these conditions are true, consider it a low-performance device
    return lowCPUCores || lowMemory || (isMobileDevice && slowConnection);
}

/**
 * Applies various optimizations for better performance
 */
function applyPerformanceOptimizations() {
    // Reduce or disable animations
    disableNonEssentialAnimations();

    // Optimize image loading
    lazyLoadImages();

    // Reduce particles count even further on very low-end devices
    optimizeParticles();

    // Simplify DOM for better performance
    simplifyDOM();
}

/**
 * Disables non-essential animations for better performance
 */
function disableNonEssentialAnimations() {
    // Remove background animations in skills section
    const graphBg = document.querySelector('.graph-bg');
    const waveBg = document.querySelector('.wave-bg');

    if (graphBg) graphBg.style.display = 'none';
    if (waveBg) waveBg.style.display = 'none';

    // Simplify AOS animations
    document.querySelectorAll('[data-aos]').forEach(el => {
        // Keep only fade-up animation and make it faster
        el.setAttribute('data-aos', 'fade-up');
        el.setAttribute('data-aos-duration', '400');
        el.setAttribute('data-aos-once', 'true');

        // Remove delays to speed up page rendering
        if (el.hasAttribute('data-aos-delay')) {
            const currentDelay = parseInt(el.getAttribute('data-aos-delay'));
            el.setAttribute('data-aos-delay', Math.min(currentDelay, 100).toString());
        }
    });

    // Simplify flip card animations
    document.querySelectorAll('.flip-card-inner').forEach(card => {
        card.style.transition = 'transform 0.3s ease';
    });

    // Disable hover animations on mobile
    if (isMobile) {
        const style = document.createElement('style');
        style.textContent = `
            @media (max-width: 768px) {
                .project-card:hover, .skill-card:hover, .button:hover {
                    transform: none !important;
                    box-shadow: none !important;
                }
                .project-card, .skill-card, .button {
                    transition: opacity 0.3s ease !important;
                }
                /* Reduce animation complexity for better performance */
                .dropdown-content {
                    transition: opacity 0.2s ease, visibility 0.2s ease !important;
                    transform: none !important;
                }
                /* Optimize animations for low-end devices */
                * {
                    animation-duration: 0.3s !important;
                    transition-duration: 0.3s !important;
                }
                /* Disable text animations on mobile */
                #name, #position, .cursor, .position-cursor {
                    animation: none !important;
                    transition: none !important;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

/**
 * Implements lazy loading for images
 * Exported for use in other modules
 */
export function lazyLoadImages() {
    // Use Intersection Observer for better performance
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.getAttribute('data-src');
                    if (src) {
                        img.src = src;
                        img.removeAttribute('data-src');
                    }
                    imageObserver.unobserve(img);
                }
            });
        });

        // Add loading="lazy" to all images that don't already have it
        document.querySelectorAll('img:not([loading])').forEach(img => {
            img.setAttribute('loading', 'lazy');

            // If the image doesn't have a src yet, set up data-src for lazy loading
            if (!img.src && img.getAttribute('data-src')) {
                imageObserver.observe(img);
            }
        });

        // Defer loading of background images
        const bgObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const bg = el.getAttribute('data-bg');
                    if (bg) {
                        el.style.backgroundImage = bg;
                        el.removeAttribute('data-bg');
                    }
                    bgObserver.unobserve(el);
                }
            });
        });

        document.querySelectorAll('[data-bg]').forEach(el => {
            bgObserver.observe(el);
        });
    } else {
        // Fallback for browsers without IntersectionObserver
        document.querySelectorAll('img:not([loading])').forEach(img => {
            img.setAttribute('loading', 'lazy');
        });

        document.querySelectorAll('[data-bg]').forEach(el => {
            el.style.backgroundImage = el.getAttribute('data-bg');
        });
    }
}

/**
 * Optimizes particles.js configuration for low-end devices
 */
function optimizeParticles() {
    const particlesContainer = document.getElementById('particles-js');

    if (particlesContainer && window.pJSDom && window.pJSDom.length > 0) {
        try {
            // Get the particles instance
            const pJS = window.pJSDom[0].pJS;

            // Check if we're on a mobile or low-end device
            const isMobile = window.innerWidth < 768;
            const isLowEndDevice = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4;

            if (isLowEndDevice) {
                // Significantly reduce particles for very low-end devices
                if (pJS.particles.array.length > 30) {
                    // Remove excess particles
                    pJS.particles.array.splice(30);

                    // Update the particles count
                    pJS.particles.number.value = 30;

                    // Reduce particle speed
                    pJS.particles.move.speed = 2;

                    // Keep basic interactivity but optimize
                    pJS.interactivity.events.onhover.enable = true;
                    pJS.interactivity.events.onclick.enable = true;
                    pJS.interactivity.events.onhover.mode = "grab";
                }
            } else if (isMobile) {
                // Moderately reduce particles for mobile devices
                if (pJS.particles.array.length > 60) {
                    // Remove some particles but keep enough for good effect
                    pJS.particles.array.splice(60);

                    // Update the particles count
                    pJS.particles.number.value = 60;

                    // Slightly reduce particle speed
                    pJS.particles.move.speed = 3;

                    // Keep interactivity
                    pJS.interactivity.events.onhover.enable = true;
                    pJS.interactivity.events.onclick.enable = true;
                }
            } else {
                // For high-end devices, ensure full interactivity
                pJS.interactivity.events.onhover.enable = true;
                pJS.interactivity.events.onclick.enable = true;
                pJS.interactivity.events.onhover.mode = "grab";
                pJS.interactivity.events.onclick.mode = "push";
            }
        } catch (e) {
            console.log('Error optimizing particles:', e);
        }
    }
}

/**
 * Simplifies the DOM for better performance
 */
function simplifyDOM() {
    // Remove unnecessary elements on mobile
    if (window.innerWidth < 480) {
        // Keep only the first 3 projects on mobile
        const projectCards = document.querySelectorAll('.project-card');
        if (projectCards.length > 3) {
            for (let i = 3; i < projectCards.length; i++) {
                projectCards[i].style.display = 'none';
            }
        }
    }
}

/**
 * Preload critical resources
 */
function preloadCriticalResources() {
    // Preload critical fonts
    const fontPreloadLink = document.createElement('link');
    fontPreloadLink.rel = 'preload';
    fontPreloadLink.as = 'font';
    fontPreloadLink.href = 'assets/fonts/main-font.woff2'; // Update with your actual font path
    fontPreloadLink.type = 'font/woff2';
    fontPreloadLink.crossOrigin = 'anonymous';
    document.head.appendChild(fontPreloadLink);

    // Preload hero image if it exists
    const heroImg = document.querySelector('.hero-section img');
    if (heroImg && heroImg.src) {
        const imgPreloadLink = document.createElement('link');
        imgPreloadLink.rel = 'preload';
        imgPreloadLink.as = 'image';
        imgPreloadLink.href = heroImg.src;
        document.head.appendChild(imgPreloadLink);
    }

    // Preload skill card images (first 4 only to avoid too many requests)
    const skillImages = document.querySelectorAll('.flip-card-front img');
    if (skillImages.length > 0) {
        // Only preload the first 4 skill images to avoid too many requests
        const imagesToPreload = Array.from(skillImages).slice(0, 4);

        imagesToPreload.forEach(img => {
            if (img.src) {
                const imgPreloadLink = document.createElement('link');
                imgPreloadLink.rel = 'preload';
                imgPreloadLink.as = 'image';
                imgPreloadLink.href = img.src;
                document.head.appendChild(imgPreloadLink);
            }
        });
    }

    // Ensure skills section is visible even if JS is slow
    setTimeout(() => {
        const skillsSection = document.querySelector('.skills');
        if (skillsSection) {
            skillsSection.classList.remove('loading');

            // Make all skill cards visible
            document.querySelectorAll('.flip-card').forEach(card => {
                card.style.opacity = '1';
                card.style.visibility = 'visible';
            });
        }
    }, 2000); // 2 second timeout as a fallback
}

// Clean up event listeners when page unloads
window.addEventListener('beforeunload', () => {
    // Remove resize listener
    window.removeEventListener('resize', null);

    // Remove orientation change listener
    window.removeEventListener('orientationchange', null);

    // Clean up any other listeners
    const mainContainer = document.querySelector('main') || document.body;
    const navContainer = document.querySelector('nav') || document.body;

    if (mainContainer._flipCardTouchListener) {
        mainContainer.removeEventListener('touchstart', mainContainer._flipCardTouchListener);
    }

    if (mainContainer._flipCardTouchEndListener) {
        mainContainer.removeEventListener('touchend', mainContainer._flipCardTouchEndListener);
    }

    if (mainContainer._flipCardTouchMoveListener) {
        mainContainer.removeEventListener('touchmove', mainContainer._flipCardTouchMoveListener);
    }

    if (navContainer._dropdownListener) {
        navContainer.removeEventListener('click', navContainer._dropdownListener);
    }
});