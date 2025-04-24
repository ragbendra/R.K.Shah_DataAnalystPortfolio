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

    // Ensure menuBtn exists before adding event listener
    if (menuBtn) {
        // Clear any existing event listeners by using the clone technique
        menuBtn.replaceWith(menuBtn.cloneNode(true));
        
        // Get the fresh reference to the button
        const freshMenuBtn = document.querySelector('.menu-btn');
        
        // Add click event listener to toggle menu
        freshMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent event from bubbling
            navLinks.classList.toggle('active');
            console.log('Menu button clicked, navLinks active:', navLinks.classList.contains('active'));
        });
    }

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navLinks && navLinks.classList.contains('active')) {
            // Only close if clicking outside menu and menu button
            if (!navLinks.contains(e.target) && !e.target.closest('.menu-btn')) {
                navLinks.classList.remove('active');
                console.log('Clicked outside, closing menu');
            }
        }
    });
    
    // Close mobile menu when a nav link is clicked (except dropdown toggles)
    if (navLinks) {
        navLinks.addEventListener('click', (e) => {
            const link = e.target.closest('a');
            // Only close menu if it's a regular link (not a dropdown toggle)
            if (link && !link.closest('.dropdown') && window.innerWidth <= 768) {
                navLinks.classList.remove('active');
            }
        });
    }
    
    // Add escape key handler to close menu
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            console.log('Escape key pressed, closing menu');
        }
    });
}

// Initialize navbar when the module is imported
document.addEventListener('DOMContentLoaded', initNavbar);

// Export the initialization function
export default initNavbar;
