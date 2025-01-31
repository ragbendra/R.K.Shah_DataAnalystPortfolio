// Global variables
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelector('.nav-links');
let lastScrollTop = 0;
let hideTimeout;

// Ensure menuLinks is declared only once
const menuLinks = document.querySelectorAll('.nav-links a');

// DOM Content Loaded Event Handler
document.addEventListener('DOMContentLoaded', () => {
    const isHomePage = window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/');
    
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
    const hamburger = document.querySelector('.hamburger');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        
        const spans = hamburger.querySelectorAll('span');
        if (hamburger.classList.contains('active')) {
            spans[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
        } else {
            spans.forEach(span => {
                span.style.transform = 'none';
                span.style.opacity = '1';
            });
        }
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            
            const spans = hamburger.querySelectorAll('span');
            spans.forEach(span => {
                span.style.transform = 'none';
                span.style.opacity = '1';
            });
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
let scrollTimer = null;
const isHomePage = window.location.pathname.endsWith('index.html') || window.location.pathname === '/';

// Set initial state
if (!isHomePage) {
    navbar.classList.add('not-home');
}

// Single scroll handler for all navigation behavior
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    
    // Clear the existing timer
    clearTimeout(scrollTimer);

    // Handle background color change on home page
    if (isHomePage) {
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    // Handle hide/show with delay
    if (currentScroll > lastScrollTop && currentScroll > 100) {
        // Scrolling down - hide navbar after delay
        scrollTimer = setTimeout(() => {
            navbar.style.transform = 'translateY(-100%)';
        }, 300);
    } else {
        // Scrolling up - show navbar immediately
        navbar.style.transform = 'translateY(0)';
    }

    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});

// Hide Navigation on Scroll with Delay
const nav = document.querySelector('nav');

window.addEventListener('scroll', () => {
    clearTimeout(hideTimeout);
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop) {
        // Scrolling down
        hideTimeout = setTimeout(() => {
            navLinks.classList.remove('nav-visible');
            navLinks.classList.add('nav-hidden'); // Add class to hide
        }, 500); // Delay of 500ms
    } else {
        // Scrolling up
        navLinks.classList.remove('nav-hidden'); // Remove hide class
        navLinks.classList.add('nav-visible'); // Add class to show
    }
    lastScrollTop = scrollTop;
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
    const isHomePage = window.location.pathname === '/' || 
                      window.location.pathname === '/index.html' ||
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
    const isHomePage = window.location.pathname === '/'; // Adjust this condition based on your home page URL

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
const hamburger = document.querySelector('.hamburger');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    
    // Animate hamburger
    const spans = hamburger.querySelectorAll('span');
    if (hamburger.classList.contains('active')) {
        spans[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
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