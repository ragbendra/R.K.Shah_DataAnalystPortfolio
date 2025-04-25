/**
 * Hamburger Menu Functionality
 * Standalone script to ensure mobile menu works across all pages
 */

// Execute immediately to ensure the menu works even if DOMContentLoaded has already fired
(function() {
    // Keep track of which dropdown is currently open
    let currentOpenDropdown = null;
    
    // Function to initialize the mobile menu
    function initMobileMenu() {
        // Get references to menu elements
        const menuBtn = document.querySelector('.menu-btn');
        const navLinks = document.querySelector('.nav-links');
        
        // Ensure elements exist before proceeding
        if (!menuBtn || !navLinks) {
            console.error('Menu elements not found');
            return;
        }
        
        // Remove any existing event listeners by cloning and replacing the button
        const newMenuBtn = menuBtn.cloneNode(true);
        menuBtn.parentNode.replaceChild(newMenuBtn, menuBtn);
        
        // Add click event to the new button
        newMenuBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation(); // Prevent event bubbling
            
            // Toggle the active class
            navLinks.classList.toggle('active');
            
            // Force repaint to ensure CSS transitions work properly
            void navLinks.offsetWidth;
            
            console.log('Menu button clicked, navLinks active:', navLinks.classList.contains('active'));
        });
        
        // Handle dropdown toggles on mobile
        const dropdowns = document.querySelectorAll('.dropdown');
        dropdowns.forEach(dropdown => {
            // Get the dropdown toggle link (first link in dropdown)
            const dropdownLink = dropdown.querySelector('a');
            
            if (dropdownLink) {
                // Remove existing listeners by cloning
                const newDropdownLink = dropdownLink.cloneNode(true);
                dropdownLink.parentNode.replaceChild(newDropdownLink, dropdownLink);
                
                // Add click event to the new dropdown link
                newDropdownLink.addEventListener('click', function(e) {
                    if (window.innerWidth <= 768) {
                        e.preventDefault();
                        e.stopPropagation();
                        
                        // Check if this dropdown is already open
                        const isOpen = dropdown.classList.contains('active');
                        
                        // If it's already open, close it
                        if (isOpen) {
                            dropdown.classList.remove('active');
                            currentOpenDropdown = null;
                        } else {
                            // Otherwise, open it and track it
                            dropdown.classList.add('active');
                            currentOpenDropdown = dropdown;
                            
                            // Force repaint to ensure CSS transitions work properly
                            void dropdown.offsetWidth;
                        }
                        
                        // Close other dropdowns
                        dropdowns.forEach(otherDropdown => {
                            if (otherDropdown !== dropdown && otherDropdown.classList.contains('active')) {
                                otherDropdown.classList.remove('active');
                            }
                        });
                        
                        // Prevent any other click handlers from firing
                        return false;
                    }
                });
                
                // Also handle clicks on the dropdown content to prevent it from closing
                const dropdownContent = dropdown.querySelector('.dropdown-content');
                if (dropdownContent) {
                    dropdownContent.addEventListener('click', function(e) {
                        // Only stop propagation if we're not clicking a link
                        if (!e.target.closest('a') || e.target === newDropdownLink) {
                            e.stopPropagation();
                        }
                    });
                }
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            // Don't do anything if we're clicking the menu button or a dropdown toggle
            if (e.target.closest('.menu-btn') || e.target.closest('.dropdown > a')) {
                return;
            }
            
            // Check if we're clicking inside a dropdown that's currently being interacted with
            const isClickInsideActiveDropdown = currentOpenDropdown && currentOpenDropdown.contains(e.target);
            
            // If clicking outside the active dropdown, close it
            if (currentOpenDropdown && !isClickInsideActiveDropdown) {
                currentOpenDropdown.classList.remove('active');
                currentOpenDropdown = null;
            }
            
            // Don't close the menu if clicking inside an active dropdown
            if (navLinks.classList.contains('active')) {
                // Only close if clicking outside menu
                if (!navLinks.contains(e.target) && !e.target.closest('.menu-btn')) {
                    navLinks.classList.remove('active');
                }
            }
        });
        
        // Close mobile menu when a regular nav link is clicked
        const regularNavLinks = navLinks.querySelectorAll('li:not(.dropdown) a');
        regularNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    navLinks.classList.remove('active');
                }
            });
        });
        
        // Handle dropdown links (the actual links inside dropdown menus)
        const dropdownLinks = navLinks.querySelectorAll('.dropdown-content a');
        dropdownLinks.forEach(link => {
            // Remove existing listeners by cloning
            const newLink = link.cloneNode(true);
            link.parentNode.replaceChild(newLink, link);
            
            newLink.addEventListener('click', function(e) {
                // Don't stop propagation - we want the click to bubble up
                // so the link works, but we do want to close the mobile menu
                if (window.innerWidth <= 768) {
                    // Small delay to allow the click to register before closing the menu
                    setTimeout(() => {
                        // Close both the dropdown and the mobile menu
                        const parentDropdown = newLink.closest('.dropdown');
                        if (parentDropdown) {
                            parentDropdown.classList.remove('active');
                        }
                        navLinks.classList.remove('active');
                    }, 100);
                }
            });
        });
        
        // Add escape key handler to close menu
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        });
        
        // Handle window resize
        window.addEventListener('resize', function() {
            // If window is resized to desktop size, remove active class from mobile menu
            if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                
                // Also close any open dropdowns when switching to desktop
                dropdowns.forEach(dropdown => {
                    if (dropdown.classList.contains('active')) {
                        dropdown.classList.remove('active');
                    }
                });
            }
            
            // No need to reinitialize dropdowns - we already set up the event handlers properly
        });
        
        // Add a CSS fix for mobile menu if needed
        const styleEl = document.createElement('style');
        styleEl.textContent = `
            @media (max-width: 768px) {
                .nav-links.active {
                    right: 0 !important;
                    display: flex !important;
                }
                
                .dropdown.active .dropdown-content {
                    display: block !important;
                    opacity: 1 !important;
                    visibility: visible !important;
                    position: static !important;
                    box-shadow: none !important;
                    transform: none !important;
                    pointer-events: auto !important;
                    background-color: rgba(0, 0, 0, 0.02) !important;
                    margin-top: 0 !important;
                    padding: 0 !important;
                }
                
                .dropdown > a {
                    position: relative;
                }
                
                .dropdown > a:after {
                    content: '';
                    position: absolute;
                    right: 15px;
                    top: 50%;
                    transform: translateY(-50%);
                    width: 0;
                    height: 0;
                    border-left: 5px solid transparent;
                    border-right: 5px solid transparent;
                    border-top: 5px solid #333;
                    transition: transform 0.3s ease;
                }
                
                .dropdown.active > a:after {
                    transform: translateY(-50%) rotate(180deg);
                }
            }
        `;
        document.head.appendChild(styleEl);
    }
    
    // Initialize immediately if document is already loaded
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        initMobileMenu();
    } else {
        // Otherwise wait for DOMContentLoaded
        document.addEventListener('DOMContentLoaded', initMobileMenu);
    }
    
    // Also initialize after a short delay to ensure it works in all scenarios
    setTimeout(initMobileMenu, 500);
})();