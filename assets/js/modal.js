/**
 * Modal functionality
 * Handles opening and closing of modal dialogs
 */

// Initialize modal functionality
export function initModals() {
    // Open modal when trigger is clicked
    document.querySelectorAll('[data-modal-target]').forEach(trigger => {
        trigger.addEventListener('click', () => {
            const modalId = trigger.getAttribute('data-modal-target');
            const modal = document.getElementById(modalId);
            
            if (modal) {
                openModal(modal);
            }
        });
    });
    
    // Close modal when close button is clicked
    document.querySelectorAll('.close-modal, .modal-close').forEach(closeBtn => {
        closeBtn.addEventListener('click', () => {
            const modal = closeBtn.closest('.modal, .project-modal');
            if (modal) {
                closeModal(modal);
            }
        });
    });
    
    // Close modal when clicking outside content
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal') || e.target.classList.contains('project-modal')) {
            closeModal(e.target);
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const openModal = document.querySelector('.modal.show, .project-modal.show');
            if (openModal) {
                closeModal(openModal);
            }
        }
    });
}

/**
 * Open a modal dialog
 * @param {HTMLElement} modal - The modal element to open
 */
export function openModal(modal) {
    if (!modal) return;
    
    // Display modal
    modal.style.display = 'flex';
    
    // Add show class after a small delay for animation
    setTimeout(() => {
        modal.classList.add('show');
        document.body.classList.add('modal-open');
    }, 10);
}

/**
 * Close a modal dialog
 * @param {HTMLElement} modal - The modal element to close
 */
export function closeModal(modal) {
    if (!modal) return;
    
    // Remove show class
    modal.classList.remove('show');
    
    // Hide modal after animation completes
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.classList.remove('modal-open');
    }, 300);
}

// Initialize modals when the module is imported
document.addEventListener('DOMContentLoaded', initModals);

// Export functions
export default {
    initModals,
    openModal,
    closeModal
};
