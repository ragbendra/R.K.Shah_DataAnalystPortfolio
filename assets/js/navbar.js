/**
 * Navbar functionality
 * Handles navbar behavior, visibility, and mobile menu
 */

// Import utility functions if needed
import { getBasePath } from './script.js';

// Initialize navbar functionality
export function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelector('.nav-links');
    const menuBtn = document.querySelector('.menu-btn');
    
    // Check if on home page
    const isHomePage = window.location.pathname === getBasePath() + '/' || 
                      window.location.pathname === getBasePath() + '/index.html';
    
    // Set initial navbar state
    if (!isHomePage) {
        navbar.classList.add('not-home');
        navbar.classList.add('white-bg');
    }
    
    // Handle scroll events
    window.addEventListener('scroll', () => {
        // Only handle background color changes on scroll, not visibility
        if (isHomePage) {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
        
        // Always ensure navbar is visible
        navbar.classList.remove('nav-hidden');
        navbar.style.top = '0';
    });

    menuBtn?.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
        if (!menuBtn.contains(e.target) && !navLinks.contains(e.target)) {
            navLinks.classList.remove('active');
        }
    });
}

// Initialize navbar when the module is imported
document.addEventListener('DOMContentLoaded', initNavbar);

// Export the initialization function
export default initNavbar;
