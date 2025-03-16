// Dropdown functionality
export function initDropdowns() {
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
        }
        
        // For mobile: click events
        if (window.innerWidth <= 768) {
            const dropdownLink = dropdown.querySelector('a');
            
            if (dropdownLink) {
                dropdownLink.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    // Toggle dropdown visibility
                    if (dropdownContent.style.display === 'block') {
                        // Close dropdown
                        dropdownContent.style.opacity = '0';
                        dropdownContent.style.visibility = 'hidden';
                        dropdownContent.style.transform = 'translateY(10px)';
                        dropdownContent.style.pointerEvents = 'none';
                        setTimeout(() => {
                            dropdownContent.style.display = 'none';
                        }, 300);
                    } else {
                        // Open dropdown
                        dropdownContent.style.display = 'block';
                        requestAnimationFrame(() => {
                            dropdownContent.style.opacity = '1';
                            dropdownContent.style.visibility = 'visible';
                            dropdownContent.style.transform = 'translateY(0)';
                            dropdownContent.style.pointerEvents = 'auto';
                        });
                    }
                });
            }
        }
    });
    
    // Handle window resize to update dropdown behavior
    window.addEventListener('resize', () => {
        // Re-initialize dropdowns when window size changes
        setTimeout(() => {
            initDropdowns();
        }, 300);
    });
}

// Initialize dropdowns when the module is imported
document.addEventListener('DOMContentLoaded', initDropdowns);
