document.querySelectorAll('.dropdown').forEach(dropdown => {
    const dropdownContent = dropdown.querySelector('.dropdown-content');
    let hideTimeout;
    
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
});
