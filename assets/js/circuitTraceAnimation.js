/**
 * Circuit Trace Animation
 * Applies a circuit trace effect to the about description text
 */

// Initialize the circuit trace animation
export function initCircuitTraceAnimation() {
  // Skip processing about-description elements
  // The about-description elements should not have any animations
  
  // Intersection Observer to trigger animation on scroll for other elements
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Skip about-description elements
        const paragraphs = entry.target.querySelectorAll('p:not(.about-description)');
        paragraphs.forEach((p, index) => {
          // Add animation with delay based on index
          setTimeout(() => {
            p.classList.add('animate');
            // Add temporary glow effect
            setTimeout(() => p.classList.add('active'), 300);
            setTimeout(() => p.classList.remove('active'), 1300);
          }, index * 300);
        });
        observer.unobserve(entry.target); // Run once
      }
    });
  }, { threshold: 0.5 });

  // Observe the about section
  const aboutText = document.querySelector('.about-text');
  if (aboutText) {
    observer.observe(aboutText);
  }
}

// Export the initialization function
export default initCircuitTraceAnimation; 