// Flip card functionality - optimized for performance
document.addEventListener('DOMContentLoaded', () => {
  // Detect if device is touch-enabled
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  
  // Use event delegation for better performance
  const skillsContainer = document.querySelector('.skills-container');
  if (!skillsContainer) return;
  
  // Track last flip time to prevent spam clicking
  let lastFlipTime = 0;
  const FLIP_COOLDOWN = 300; // ms between allowed flips
  
  // Single event listener instead of multiple
  skillsContainer.addEventListener(isTouchDevice ? 'touchend' : 'click', (e) => {
    // Find the closest flip-card parent
    const card = e.target.closest('.flip-card');
    if (!card) return;
    
    // Prevent default behavior on touch devices
    if (isTouchDevice) {
      e.preventDefault();
    }
    
    // Anti-spam protection - check if enough time has passed since last flip
    const now = Date.now();
    if (now - lastFlipTime < FLIP_COOLDOWN) return;
    lastFlipTime = now;
    
    // Prevent multiple rapid clicks/touches
    if (card.dataset.flipping === 'true') return;
    
    // Set flipping state
    card.dataset.flipping = 'true';
    
    // Toggle flipped class
    card.classList.toggle('flipped');
    
    // Reset flipping state after animation completes
    setTimeout(() => {
      card.dataset.flipping = 'false';
    }, 600);
  }, { passive: !isTouchDevice }); // Use passive listener when possible for better performance
  
  // Prevent ghost clicks on touch devices
  if (isTouchDevice) {
    skillsContainer.addEventListener('touchstart', (e) => {
      const card = e.target.closest('.flip-card');
      if (card) {
        card.dataset.touchStarted = 'true';
      }
    }, { passive: true });
    
    skillsContainer.addEventListener('touchmove', (e) => {
      const card = e.target.closest('.flip-card');
      if (card) {
        card.dataset.touchStarted = 'false';
      }
    }, { passive: true });
  }

  // Add entrance animation when page loads - optimized with requestAnimationFrame
  const cards = document.querySelectorAll('.flip-card');
  
  // Limit the number of cards that get animated based on viewport
  const maxCardsToAnimate = window.innerWidth < 768 ? 6 : 12;
  const cardsToAnimate = Array.from(cards).slice(0, maxCardsToAnimate);
  
  // Use IntersectionObserver for better performance
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          const card = entry.target;
          
          // Use requestAnimationFrame for smoother animations
          requestAnimationFrame(() => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            
            // Stagger the animations with a maximum delay
            setTimeout(() => {
              card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, Math.min(50 * index, 300)); // Cap the maximum delay at 300ms
          });
          
          // Unobserve after animation
          observer.unobserve(card);
        }
      });
    }, { threshold: 0.1 });
    
    cardsToAnimate.forEach(card => observer.observe(card));
  } else {
    // Fallback for browsers that don't support IntersectionObserver
    cardsToAnimate.forEach((card, index) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      
      setTimeout(() => {
        card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, Math.min(50 * index, 300)); // Cap the maximum delay at 300ms
    });
  }
  
  // For cards that don't get animated, just make them visible immediately
  if (cards.length > maxCardsToAnimate) {
    Array.from(cards).slice(maxCardsToAnimate).forEach(card => {
      card.style.opacity = '1';
      card.style.transform = 'none';
    });
  }
  
  // Clean up function to remove event listeners when navigating away
  window.addEventListener('beforeunload', () => {
    skillsContainer.removeEventListener(isTouchDevice ? 'touchend' : 'click', null);
    if (isTouchDevice) {
      skillsContainer.removeEventListener('touchstart', null);
      skillsContainer.removeEventListener('touchmove', null);
    }
  });
}); 