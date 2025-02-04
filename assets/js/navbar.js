const navbar = document.querySelector('.navbar');
const navLinks = document.querySelector('.nav-links');
const menuBtn = document.querySelector('.menu-btn');

let lastScrollY = window.scrollY;
let isScrolling = false;
let scrollTimeout;

document.addEventListener('DOMContentLoaded', () => {
    const isHomePage = window.location.pathname === getBasePath() + '/' || 
                      window.location.pathname === getBasePath() + '/index.html';
    if (!isHomePage) {
        navbar.classList.add('not-home');
        navbar.classList.add('white-bg');
    }

    window.addEventListener('scroll', () => {
        if (!isScrolling) {
            window.requestAnimationFrame(() => {
                const currentScrollY = window.scrollY;
                const direction = currentScrollY > lastScrollY ? 'down' : 'up';
                clearTimeout(scrollTimeout);
                if (direction === 'down' && currentScrollY > 100) {
                    scrollTimeout = setTimeout(() => {
                        navbar.classList.add('nav-hidden');
                    }, 150);
                } else {
                    navbar.classList.remove('nav-hidden');
                }
                lastScrollY = currentScrollY;
                isScrolling = false;
            });
        }
        isScrolling = true;
    });

    menuBtn?.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
        if (!menuBtn.contains(e.target) && !navLinks.contains(e.target)) {
            navLinks.classList.remove('active');
        }
    });
});
