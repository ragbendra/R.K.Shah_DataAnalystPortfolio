// Import required modules
import { initNavbar } from './navbar.js';
import './mobileOptimizations.js';
import { openModal, closeModal } from './modal.js';

// Shared functionality for all project pages
document.addEventListener('DOMContentLoaded', () => {
    // Initialize navbar first
    initNavbar();
    
    // Initialize project-specific functionality
    initProjectPageNavigation();
    initProjectModals();
    
    // Initialize mobile dropdowns
    if (typeof window.initMobileDropdowns === 'function') {
        window.initMobileDropdowns();
    }
    
    // Ensure mobile menu works on project pages
    initMobileMenu();
});

// Mobile menu functionality specifically for project pages
function initMobileMenu() {
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuBtn && navLinks) {
        // Remove any existing event listeners to prevent duplicates
        const newMenuBtn = menuBtn.cloneNode(true);
        menuBtn.parentNode.replaceChild(newMenuBtn, menuBtn);
        
        // Add click event listener to toggle menu
        newMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent event from bubbling
            navLinks.classList.toggle('active');
            console.log('Project page menu button clicked');
        });
        
        // Handle dropdown toggles on mobile
        document.querySelectorAll('.dropdown > a').forEach(dropdownToggle => {
            dropdownToggle.addEventListener('click', (e) => {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    e.stopPropagation();
                    const dropdown = dropdownToggle.parentElement;
                    dropdown.classList.toggle('active');
                }
            });
        });
    }
}

// Additional navigation behavior for project pages
function initProjectPageNavigation() {
    const navbar = document.querySelector('.navbar');
    
    // Ensure navbar is always visible on project pages
    if (navbar) {
        navbar.style.transform = 'translateY(0)';
    }
}

// Project modal functionality
function initProjectModals() {
    console.log('Initializing project modals');
    
    // Open modal when clicking on project card
    document.querySelectorAll('.project-card[data-modal]').forEach(card => {
        card.addEventListener('click', (e) => {
            // Don't trigger if clicking on the view code button
            if (!e.target.closest('.view-code-btn')) {
                const modalId = card.getAttribute('data-modal');
                const modal = document.getElementById(modalId);
                console.log('Opening modal:', modalId);
                if (modal) {
                    openModal(modal);
                }
            }
        });
        
        // Prevent default behavior for view code button
        const viewCodeBtn = card.querySelector('.view-code-btn');
        if (viewCodeBtn) {
            viewCodeBtn.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent event from bubbling up to card
            });
        }
    });
    
    // Close modal when clicking on close button
    document.querySelectorAll('.close-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.project-modal');
            if (modal) {
                closeModal(modal);
            }
        });
    });
    
    // Close when clicking outside the modal content
    document.querySelectorAll('.project-modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal);
            }
        });
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const openModal = document.querySelector('.project-modal.show');
            if (openModal) {
                closeModal(openModal);
            }
        }
    });
} 