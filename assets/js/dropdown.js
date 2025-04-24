// Dropdown functionality
export function initDropdowns() {
    // Only initialize desktop dropdowns here
    // Mobile dropdowns are handled by mobileOptimizations.js
    document.querySelectorAll('.dropdown').forEach(dropdown => {
        const dropdownContent = dropdown.querySelector('.dropdown-content');
        let hideTimeout;

        // For desktop: mouse hover events
        if (window.innerWidth > 768) {
            dropdown.addEventListener('mouseenter', () => {
                clearTimeout(hideTimeout);
                if (dropdownContent) {
                    dropdownContent.style.display = 'block';
                    requestAnimationFrame(() => {
                        dropdownContent.style.opacity = '1';
                        dropdownContent.style.visibility = 'visible';
                        dropdownContent.style.transform = 'translateY(0)';
                        dropdownContent.style.pointerEvents = 'auto';
                    });
                }
            });

            dropdown.addEventListener('mouseleave', () => {
                hideTimeout = setTimeout(() => {
                    if (dropdownContent) {
                        dropdownContent.style.opacity = '0';
                        dropdownContent.style.visibility = 'hidden';
                        dropdownContent.style.transform = 'translateY(10px)';
                        dropdownContent.style.pointerEvents = 'none';
                        setTimeout(() => {
                            if (dropdownContent.style.opacity === '0') {
                                dropdownContent.style.display = 'none';
                            }
                        }, 300);
                    }
                }, 200);
            });
        } else {
            // For mobile: make sure we initialize mobile dropdowns
            if (typeof window.initMobileDropdowns === 'function') {
                window.initMobileDropdowns();
            }
        }

        // We're removing the mobile click events from here since they're handled in mobileOptimizations.js
    });

    // Handle window resize to update dropdown behavior with throttling for better performance
    let resizeTimeout;
    window.addEventListener('resize', () => {
        // Cancel any pending re-initialization
        clearTimeout(resizeTimeout);
        
        // Re-initialize dropdowns when window size changes, but throttle to avoid performance issues
        resizeTimeout = setTimeout(() => {
            initDropdowns();
            
            // Also reinitialize mobile dropdowns if we're on mobile
            if (window.innerWidth <= 768 && typeof window.initMobileDropdowns === 'function') {
                window.initMobileDropdowns();
            }
        }, 300);
    });
}

// Initialize dropdowns when the module is imported
document.addEventListener('DOMContentLoaded', initDropdowns);
