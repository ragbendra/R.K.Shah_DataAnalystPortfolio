/**
 * Navbar Scroll Fix
 * Ensures the navbar doesn't hide when scrolling
 * Makes navbar transparent in home section and white in other sections
 */

// Execute immediately
(function() {
    // Function to prevent navbar from hiding and handle background color
    function preventNavbarHiding() {
        // Get the navbar element
        const navbar = document.querySelector('.navbar');
        
        if (!navbar) {
            console.error('Navbar element not found');
            return;
        }
        
        // Check if we're on the home page
        const isHomePage = !document.body.classList.contains('portfolio-page') && 
                          !document.body.classList.contains('project-page');
        
        // If not on home page, always use white background
        if (!isHomePage) {
            navbar.classList.add('white-bg');
            navbar.classList.remove('transparent');
            return;
        }
        
        // Function to check which section is currently visible
        function updateNavbarBackground() {
            // Prevent any hiding behavior
            navbar.style.transform = 'none';
            navbar.classList.remove('nav-hidden');
            
            // Get the home section element
            const homeSection = document.getElementById('home');
            
            if (!homeSection) {
                // If home section not found, default to white background
                navbar.classList.add('white-bg');
                navbar.classList.remove('transparent');
                return;
            }
            
            // Get the bottom position of the home section
            const homeSectionBottom = homeSection.getBoundingClientRect().bottom;
            
            // If we're in the home section (with a small buffer)
            if (homeSectionBottom > 50) {
                // Make navbar transparent
                navbar.classList.add('transparent');
                navbar.classList.remove('white-bg');
            } else {
                // Make navbar white
                navbar.classList.add('white-bg');
                navbar.classList.remove('transparent');
            }
            
            // Also handle scrolled class for other styling
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
        
        // Initial update
        updateNavbarBackground();
        
        // Update on scroll
        window.addEventListener('scroll', updateNavbarBackground);
        
        // Update on resize (in case section heights change)
        window.addEventListener('resize', updateNavbarBackground);
    }
    
    // Initialize when DOM is loaded
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        preventNavbarHiding();
    } else {
        document.addEventListener('DOMContentLoaded', preventNavbarHiding);
    }
})();