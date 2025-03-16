/**
 * Project filtering functionality
 * Handles filtering of project cards based on categories
 */

document.addEventListener('DOMContentLoaded', () => {
    initProjectFilters();
});

// Track if a filter operation is in progress
let isFilteringInProgress = false;
// Track last filter time to prevent spam clicking
let lastFilterTime = 0;
const FILTER_COOLDOWN = 300; // ms between allowed filter operations

/**
 * Initialize project filtering functionality
 */
function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    // Skip if no filter buttons or project cards are found
    if (!filterButtons.length || !projectCards.length) return;
    
    // Set initial active state
    const initialActiveFilter = document.querySelector('.filter-btn.active') || filterButtons[0];
    if (initialActiveFilter) {
        initialActiveFilter.classList.add('active');
        applyFilter(initialActiveFilter.getAttribute('data-filter'), projectCards);
    }
    
    // Add click event listeners to filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            // Prevent default behavior
            e.preventDefault();
            
            // Anti-spam protection - check if filtering is already in progress
            if (isFilteringInProgress) return;
            
            // Check if enough time has passed since last filter
            const now = Date.now();
            if (now - lastFilterTime < FILTER_COOLDOWN) return;
            lastFilterTime = now;
            
            // Get the filter value
            const filterValue = button.getAttribute('data-filter');
            
            // Don't do anything if the same filter is clicked again
            if (button.classList.contains('active')) return;
            
            // Set filtering flag
            isFilteringInProgress = true;
            
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Apply the filter
            applyFilter(filterValue, projectCards);
            
            // Add animation to the filtered cards
            animateFilteredCards();
            
            // Reset filtering flag after animation completes
            setTimeout(() => {
                isFilteringInProgress = false;
            }, 600); // Match this with the animation duration
        });
    });
    
    // Clean up function to remove event listeners when navigating away
    window.addEventListener('beforeunload', () => {
        filterButtons.forEach(button => {
            button.removeEventListener('click', null);
        });
    });
}

/**
 * Apply filter to project cards
 * @param {string} filterValue - The category to filter by
 * @param {NodeList} projectCards - The collection of project cards
 */
function applyFilter(filterValue, projectCards) {
    // Cache DOM operations for better performance
    const showCards = [];
    const hideCards = [];
    
    projectCards.forEach(card => {
        // Reset visibility first
        card.classList.remove('hide', 'show');
        
        // Show all projects if "all" is selected
        if (filterValue === 'all') {
            showCards.push(card);
            return;
        }
        
        // Show/hide projects based on category
        const cardCategory = card.getAttribute('data-category');
        if (cardCategory === filterValue || cardCategory?.includes(filterValue)) {
            showCards.push(card);
        } else {
            hideCards.push(card);
        }
    });
    
    // Batch DOM operations for better performance
    requestAnimationFrame(() => {
        showCards.forEach(card => card.classList.add('show'));
        hideCards.forEach(card => card.classList.add('hide'));
    });
}

/**
 * Animate the filtered cards for a smooth transition
 */
function animateFilteredCards() {
    const visibleCards = document.querySelectorAll('.project-card.show');
    
    // Limit the number of animated cards for better performance
    const maxCardsToAnimate = Math.min(visibleCards.length, 6);
    
    // Use requestAnimationFrame for smoother animations
    requestAnimationFrame(() => {
        visibleCards.forEach((card, index) => {
            // Reset animation
            card.style.animation = 'none';
            card.offsetHeight; // Trigger reflow
            
            // Apply staggered animation with a maximum delay
            if (index < maxCardsToAnimate) {
                card.style.animation = `fadeInUp 0.5s ease forwards ${Math.min(index * 0.1, 0.5)}s`;
            } else {
                // For cards beyond the limit, just make them visible without animation
                card.style.animation = 'none';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }
        });
    });
}

// Export the initialization function
export default initProjectFilters;
