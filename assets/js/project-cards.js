// Project Cards Interaction
document.addEventListener('DOMContentLoaded', function() {
    // Open modal when a project card is clicked
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', () => {
            const modalId = card.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.style.display = 'flex';
            }
        });
    });

    // Close modal when the close button or background is clicked
    document.querySelectorAll('.project-modal').forEach(modal => {
        const closeBtn = modal.querySelector('.close-btn');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                modal.style.display = 'none';
            });
        }

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    });
});
