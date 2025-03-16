// Shared functionality for all project pages
document.addEventListener('DOMContentLoaded', () => {
    initProjectPageNavigation();
    initMobileMenu();
    initProjectModals();
});

// Navigation behavior for project pages
function initProjectPageNavigation() {
    const navbar = document.querySelector('.navbar');
    
    // Set initial state for non-home pages
    navbar.classList.add('not-home');
    
    // Always ensure navbar is visible
    navbar.style.transform = 'translateY(0)';
    
    // Single scroll handler for navigation
    window.addEventListener('scroll', () => {
        // Always keep navbar visible
        navbar.style.transform = 'translateY(0)';
    });
}

// Mobile menu toggle
function initMobileMenu() {
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (menuBtn && navLinks && !menuBtn.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('active');
            }
        });
    }
}

// Project modal functionality
function initProjectModals() {
    // Open modal when clicking on project card
    document.querySelectorAll('.project-card[data-modal]').forEach(card => {
        card.addEventListener('click', (e) => {
            // Don't trigger if clicking on the view code button
            if (!e.target.closest('.view-code-btn')) {
                const modalId = card.getAttribute('data-modal');
                const modal = document.getElementById(modalId);
                if (modal) {
                    modal.style.display = 'flex';
                    setTimeout(() => {
                        modal.classList.add('show');
                    }, 10);
                }
            }
        });
    });
    
    // Close modal when clicking on close button or outside
    document.querySelectorAll('.close-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.project-modal');
            closeModal(modal);
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
}

// Function to close modal with animation
function closeModal(modal) {
    modal.classList.remove('show');
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
} 