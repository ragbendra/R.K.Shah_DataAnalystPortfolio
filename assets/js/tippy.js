/**
 * Tippy.js initialization module
 * Handles tooltip functionality across the site
 */

// Wait for both DOM and Tippy.js to be loaded
function waitForTippy(callback) {
    if (typeof tippy !== 'undefined') {
        callback();
    } else {
        setTimeout(() => waitForTippy(callback), 100);
    }
}

// Initialize tooltips when everything is ready
document.addEventListener('DOMContentLoaded', () => {
    waitForTippy(initTippy);
});

/**
 * Initialize all tooltips on the page
 */
function initTippy() {
    if (typeof tippy === 'undefined') {
        console.warn('Tippy.js is not loaded. Tooltips will not be initialized.');
        return;
    }

    // Initialize tooltips for visualization statistics
    document.querySelectorAll('.viz-stat').forEach(stat => {
        const label = stat.querySelector('.stat-label')?.textContent;
        const value = stat.querySelector('.stat-value')?.textContent;
        
        if (label && value) {
            tippy(stat, {
                content: `${label}: ${value}`,
                placement: 'top',
                animation: 'scale',
                theme: 'viz-tooltip'
            });
        }
    });

    // Initialize tooltips for skill cards
    document.querySelectorAll('.skill-logo').forEach(logo => {
        const skillName = logo.getAttribute('alt') || 
                         logo.closest('.flip-card')?.querySelector('.skill-title')?.textContent;
        
        if (skillName) {
            tippy(logo, {
                content: skillName,
                placement: 'top',
                animation: 'scale',
                delay: [300, 0], // Delay before showing tooltip
                theme: 'skill-tooltip'
            });
        }
    });

    // Initialize tooltips for social links
    document.querySelectorAll('.social-icon').forEach(icon => {
        const platform = icon.getAttribute('aria-label') || 
                        icon.getAttribute('data-platform') ||
                        icon.getAttribute('title');
        
        if (platform) {
            tippy(icon, {
                content: platform,
                placement: 'bottom',
                animation: 'shift-away',
                theme: 'social-tooltip'
            });
        }
    });

    // Initialize tooltips for project tech tags
    document.querySelectorAll('.tech-tag').forEach(tag => {
        tippy(tag, {
            content: `Built with ${tag.textContent}`,
            placement: 'top',
            animation: 'shift-away',
            theme: 'tech-tooltip'
        });
    });

    // Initialize tooltips for any element with data-tooltip attribute
    document.querySelectorAll('[data-tooltip]').forEach(element => {
        tippy(element, {
            content: element.getAttribute('data-tooltip'),
            placement: element.getAttribute('data-tooltip-placement') || 'top',
            animation: 'scale',
            theme: element.getAttribute('data-tooltip-theme') || 'default'
        });
    });
}

// Add custom themes for tooltips
function addCustomThemes() {
    // Add custom CSS for tooltip themes if needed
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        .tippy-box[data-theme~='viz-tooltip'] {
            background-color: rgba(0, 0, 0, 0.8);
            color: white;
            border-radius: 4px;
            font-size: 14px;
        }
        
        .tippy-box[data-theme~='skill-tooltip'] {
            background-color: #4f46e5;
            color: white;
            border-radius: 4px;
            font-size: 14px;
        }
        
        .tippy-box[data-theme~='social-tooltip'] {
            background-color: #333;
            color: white;
            border-radius: 4px;
            font-size: 12px;
        }
        
        .tippy-box[data-theme~='tech-tooltip'] {
            background-color: #2c3e50;
            color: white;
            border-radius: 4px;
            font-size: 12px;
        }
    `;
    document.head.appendChild(styleElement);
}

// Initialize custom themes
addCustomThemes();

// Export the initialization function
export default initTippy; 