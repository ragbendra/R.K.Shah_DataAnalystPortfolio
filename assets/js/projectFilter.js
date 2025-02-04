const filterButtons = document.querySelectorAll('.filter-btn');
const projectItems = document.querySelectorAll('.project-item');

const allButton = document.querySelector('[data-filter="all"]');
if (allButton) {
    allButton.classList.add('active');
    projectItems.forEach(item => {
        item.style.display = 'block';
        item.style.opacity = '1';
        item.style.transform = 'scale(1)';
    });
}

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');
        
        projectItems.forEach(project => {
            const category = project.getAttribute('data-category');
            if (filterValue === 'all' || filterValue === category) {
                project.style.display = 'block';
                setTimeout(() => {
                    project.style.opacity = '1';
                    project.style.transform = 'scale(1)';
                }, 50);
            } else {
                project.style.opacity = '0';
                project.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    project.style.display = 'none';
                }, 300);
            }
        });
    });
});
