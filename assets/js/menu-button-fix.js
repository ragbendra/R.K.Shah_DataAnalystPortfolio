/**
 * Menu Button Fix
 * Ensures the menu button is always visible on mobile, especially on the home page
 */

// Execute immediately
(function() {
    // Function to ensure menu button is always visible
    function ensureMenuButtonVisible() {
        const menuBtn = document.querySelector('.menu-btn');
        
        if (!menuBtn) {
            console.error('Menu button not found');
            return;
        }
        
        // Force menu button to be visible
        menuBtn.style.display = 'block';
        menuBtn.style.opacity = '1';
        menuBtn.style.visibility = 'visible';
        
        // Add a MutationObserver to ensure menu button stays visible if DOM changes
        const observer = new MutationObserver(function(mutations) {
            // Force menu button to be visible
            menuBtn.style.display = 'block';
            menuBtn.style.opacity = '1';
            menuBtn.style.visibility = 'visible';
        });
        
        // Start observing the menu button for attribute changes
        observer.observe(menuBtn, { attributes: true });
        
        // Also check periodically
        setInterval(function() {
            menuBtn.style.display = 'block';
            menuBtn.style.opacity = '1';
            menuBtn.style.visibility = 'visible';
        }, 1000);
    }
    
    // Initialize when DOM is loaded
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        ensureMenuButtonVisible();
    } else {
        document.addEventListener('DOMContentLoaded', ensureMenuButtonVisible);
    }
    
    // Also initialize after a short delay to ensure it works in all scenarios
    setTimeout(ensureMenuButtonVisible, 500);
})();