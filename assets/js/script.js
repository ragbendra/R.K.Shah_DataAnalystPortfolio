// Add this at the beginning of script.js
const getBasePath = () => {
    // Get the repository name from the URL
    const pathArray = window.location.pathname.split('/');
    const repoName = pathArray[1];
    return repoName ? `/${repoName}` : '';
};

// Global variables
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelector('.nav-links');
let lastScrollTop = 0;
let hideTimeout;

// Ensure menuLinks is declared only once
const menuLinks = document.querySelectorAll('.nav-links a');

// DOM Content Loaded Event Handler
document.addEventListener('DOMContentLoaded', () => {
    const isHomePage = window.location.pathname === getBasePath() + '/' || 
                      window.location.pathname === getBasePath() + '/index.html';
    
    // Initial navbar setup
    if (!isHomePage) {
        navbar.classList.add('white-bg');
    }

    // Scroll event handler
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Background Transition
        if (scrollTop > 50) {
            navbar.style.backgroundColor = 'white';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.backgroundColor = 'transparent';
            navbar.style.boxShadow = 'none';
        }

        // Auto-Hide on Scroll
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }

        // Update scroll position
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;

        // Handle active section highlighting
        let current = '';
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollTop >= sectionTop - sectionHeight / 3) {
                current = section.getAttribute('id');
            }
        });

        menuLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // Project filtering functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');

    // Set initial state for projects
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

    // Handle mobile menu
    const menuBtn = document.querySelector('.menu-btn');
    
    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!menuBtn.contains(e.target) && !navLinks.contains(e.target)) {
            navLinks.classList.remove('active');
        }
    });

    // Dropdown menu handlers
    document.querySelectorAll('.dropdown').forEach(dropdown => {
        dropdown.addEventListener('mouseenter', () => {
            const dropdownContent = dropdown.querySelector('.dropdown-content');
            if (dropdownContent) dropdownContent.style.display = 'block';
        });

        dropdown.addEventListener('mouseleave', () => {
            const dropdownContent = dropdown.querySelector('.dropdown-content');
            if (dropdownContent) dropdownContent.style.display = 'none';
        });
    });
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Navigation behavior
const navbar = document.querySelector('.navbar');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    
    // Handle background color change
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
        navbar.style.backgroundColor = 'white';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.classList.remove('scrolled');
        navbar.style.backgroundColor = 'transparent';
        navbar.style.boxShadow = 'none';
    }

    // Keep navbar visible at all times
    navbar.style.transform = 'translateY(0)';
    navbar.style.transition = 'background-color 0.3s ease, box-shadow 0.3s ease';

    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});

// Add hover effect to keep navbar visible
navbar.addEventListener('mouseenter', () => {
    navbar.style.transform = 'translateY(0)';
});

// Ensure dropdown menus are easily accessible
document.querySelectorAll('.dropdown').forEach(dropdown => {
    const dropdownContent = dropdown.querySelector('.dropdown-content');
    
    // Add delay before hiding dropdown
    let hideTimeout;
    
    dropdown.addEventListener('mouseenter', () => {
        clearTimeout(hideTimeout);
        if (dropdownContent) {
            dropdownContent.style.display = 'block';
            dropdownContent.style.opacity = '1';
        }
    });

    dropdown.addEventListener('mouseleave', () => {
        hideTimeout = setTimeout(() => {
            if (dropdownContent) {
                dropdownContent.style.opacity = '0';
                setTimeout(() => {
                    dropdownContent.style.display = 'none';
                }, 200);
            }
        }, 200); // 200ms delay before hiding
    });
});

// Ensure the nav is visible on page load
window.addEventListener('load', () => {
    navLinks.classList.add('nav-visible'); // Show nav on load
});

// Highlight Active Menu Item on Scroll
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - sectionHeight / 3) {
            current = section.getAttribute('id');
        }
    });

    menuLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// Add animation to skill cards when they come into view
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.skill-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.5s ease-out';
    observer.observe(card);
});

// Function to handle navigation background
function handleNavigation() {
    const body = document.body;
    const isHomePage = window.location.pathname === getBasePath() + '/' || 
                      window.location.pathname === getBasePath() + '/index.html' ||
                      window.location.href.includes('#home');
    
    if (isHomePage) {
        body.classList.add('home-page');
    } else {
        body.classList.remove('home-page');
    }
    
    // Ensure dropdown background is removed on home page
    const dropdowns = document.querySelectorAll('.dropdown-content');
    dropdowns.forEach(dropdown => {
        if (isHomePage) {
            dropdown.style.background = 'none'; // Remove background on home page
        } else {
            dropdown.style.background = 'rgba(255, 255, 255, 0.95)'; // Set background when not on home page
        }
    });
}

// Listen for navigation changes
window.addEventListener('load', handleNavigation);
window.addEventListener('hashchange', handleNavigation);

// Function to handle scroll event
window.addEventListener('scroll', function() {
    const isHomePage = window.location.pathname === getBasePath() + '/'; // Adjust this condition based on your home page URL

    if (!isHomePage && window.scrollY > 0) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Hide menu on scroll down
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop) {
        // Scroll down
        navbar.style.top = '-80px'; // Adjust based on your navbar height
    } else {
        // Scroll up
        navbar.style.top = '0';
    }
    lastScrollTop = scrollTop;
});

// Simple project filtering with debug logs
const filterButtons = document.querySelectorAll('.filter-btn');
const projects = document.querySelectorAll('.project-item');

console.log('Filter Buttons:', filterButtons);
console.log('Projects:', projects);

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        console.log('Clicked Button:', button);

        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        // Get filter value
        const filter = button.getAttribute('data-filter');
        console.log('Filter Value:', filter);

        // Filter projects
        projects.forEach(project => {
            console.log('Project Category:', project.getAttribute('data-category'));
            if (filter === 'all' || project.getAttribute('data-category') === filter) {
                project.style.display = 'block';
            } else {
                project.style.display = 'none';
            }
        });
    });
});

// Set initial state
const allButton = document.querySelector('[data-filter="all"]');
if (allButton) {
    allButton.classList.add('active');
    console.log('Initial Active Button:', allButton);
}

// Add fade-in class when the item comes into view
projects.forEach(item => {
    item.classList.add('fade-in');
});

// Add smooth reveal animation to project items on scroll
const observeProjectItems = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.project-item').forEach(item => {
        observer.observe(item);
    });
};

// Call the function when DOM is loaded
document.addEventListener('DOMContentLoaded', observeProjectItems);

// Handle mobile menu
const menuBtn = document.querySelector('.menu-btn');

menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!menuBtn.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('active');
    }
});

// Ensure dropdown menus work properly
document.querySelectorAll('.dropdown').forEach(dropdown => {
    dropdown.addEventListener('mouseenter', () => {
        const dropdownContent = dropdown.querySelector('.dropdown-content');
        if (dropdownContent) {
            dropdownContent.style.display = 'block';
        }
    });

    dropdown.addEventListener('mouseleave', () => {
        const dropdownContent = dropdown.querySelector('.dropdown-content');
        if (dropdownContent) {
            dropdownContent.style.display = 'none';
        }
    });
});

// Single scroll handler for navigation
document.addEventListener('DOMContentLoaded', () => {
    const navbarId = document.getElementById('navbar');
    let lastScrollTop = 0;

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Background Transition
        if (scrollTop > 50) {
            navbar.style.backgroundColor = 'white';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.backgroundColor = 'transparent';
            navbar.style.boxShadow = 'none';
        }

        // Auto-Hide on Scroll
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }

        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });
});

function openProjectModal(title, description) {
    // Create modal HTML
    const modalHTML = `
        <div class="project-modal">
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <h2>${title}</h2>
                <p>${description}</p>
                <!-- Add more project details here -->
            </div>
        </div>
    `;

    // Add modal to body
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // Get modal elements
    const modal = document.querySelector('.project-modal');
    const closeBtn = modal.querySelector('.close-modal');

    // Show modal
    setTimeout(() => modal.classList.add('show'), 10);

    // Close modal events
    closeBtn.onclick = () => closeModal(modal);
    modal.onclick = (e) => {
        if (e.target === modal) closeModal(modal);
    };
}

function closeModal(modal) {
    modal.classList.remove('show');
    setTimeout(() => modal.remove(), 300);
}

// Initialize AOS
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800,
        offset: 100,
        once: true
    });

    // Add hover effect for metric previews
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        const metricsPreview = card.querySelector('.metrics-preview');
        
        card.addEventListener('mouseenter', () => {
            metricsPreview.style.transform = 'translateY(0)';
            metricsPreview.style.opacity = '1';
        });

        card.addEventListener('mouseleave', () => {
            metricsPreview.style.transform = 'translateY(100%)';
            metricsPreview.style.opacity = '0';
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Initialize syntax highlighting for SQL code
    document.querySelectorAll('pre code').forEach((block) => {
        highlightSQL(block);
    });

    // Add copy button to code blocks
    document.querySelectorAll('.query-preview').forEach(preview => {
        const copyBtn = document.createElement('button');
        copyBtn.className = 'copy-btn';
        copyBtn.innerHTML = '<i class="far fa-copy"></i>';
        preview.appendChild(copyBtn);

        copyBtn.addEventListener('click', () => {
            const code = preview.querySelector('code').textContent;
            navigator.clipboard.writeText(code.trim());
            copyBtn.innerHTML = '<i class="fas fa-check"></i>';
            setTimeout(() => {
                copyBtn.innerHTML = '<i class="far fa-copy"></i>';
            }, 2000);
        });
    });
});

// Simple SQL syntax highlighting function
function highlightSQL(block) {
    let html = block.innerHTML;
    
    // Keywords
    const keywords = ['SELECT', 'FROM', 'WHERE', 'JOIN', 'ON', 'GROUP BY', 'ORDER BY', 'HAVING', 'AS', 'AND', 'OR', 'IN', 'COUNT', 'SUM', 'AVG'];
    keywords.forEach(keyword => {
        const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
        html = html.replace(regex, `<span class="keyword">${keyword}</span>`);
    });

    // Numbers
    html = html.replace(/\b\d+\b/g, '<span class="number">$&</span>');

    // Strings
    html = html.replace(/'([^']+)'/g, '<span class="string">\'$1\'</span>');

    block.innerHTML = html;
}

// Consolidate visualization initialization
function initializeVisualizations() {
    // Initialize visualization previews
    const vizPreviews = document.querySelectorAll('.viz-preview-section');
    
    // Lazy load iframes
    const observerOptions = {
        root: null,
        rootMargin: '50px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const iframe = entry.target.querySelector('iframe');
                if (iframe && !iframe.src && iframe.dataset.src) {
                    iframe.src = iframe.dataset.src;
                }
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    vizPreviews.forEach(preview => {
        observer.observe(preview);
    });

    // Tool icon hover effects
    document.querySelectorAll('.tool-icon').forEach(icon => {
        icon.addEventListener('mouseenter', () => {
            icon.style.transform = 'translateY(-5px) rotate(10deg)';
        });

        icon.addEventListener('mouseleave', () => {
            icon.style.transform = 'translateY(0) rotate(0)';
        });
    });

    // Initialize tooltips
    if (typeof tippy !== 'undefined') {
        document.querySelectorAll('.viz-stat').forEach(stat => {
            const label = stat.querySelector('.stat-label').textContent;
            const value = stat.querySelector('.stat-value').textContent;
            
            tippy(stat, {
                content: `${label}: ${value}`,
                placement: 'top',
                animation: 'scale',
                theme: 'viz-tooltip'
            });
        });
    }
}

// Call initialization on DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    initializeVisualizations();
});