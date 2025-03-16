/**
 * Skills Section Background Animation - All animations disabled
 */

// Initialize the skills background animation (now just a setup function)
function initSkillsBgAnimation() {
  // Check if the skills section exists
  const skillsSection = document.querySelector('.skills');
  if (!skillsSection) return;
  
  // Make all skill cards visible immediately with basic styling
  document.querySelectorAll('.flip-card').forEach(card => {
    card.style.opacity = '1';
    card.style.visibility = 'visible';
    
    // Ensure no animations or transitions
    card.style.transition = 'none';
    card.style.transform = 'none';
    
    // Remove any AOS attributes
    card.removeAttribute('data-aos');
    card.removeAttribute('data-aos-delay');
    card.removeAttribute('data-aos-once');
  });
  
  // Ensure section title is selectable
  const sectionTitle = skillsSection.querySelector('.section-title');
  if (sectionTitle) {
    sectionTitle.style.position = 'relative';
    sectionTitle.style.zIndex = '10';
    sectionTitle.style.pointerEvents = 'auto';
  }
}

// Export the initialization function
export default initSkillsBgAnimation; 