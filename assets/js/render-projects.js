// Import project data
import projectData from './project-data.js';

// Function to render project cards
export function renderProjectCards(container, projectType) {
  const projects = projectData[projectType];
  if (!projects || !container) return;
  
  // Clear existing content
  container.innerHTML = '';
  
  // Create project cards
  projects.forEach(project => {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.setAttribute('data-category', project.category);
    card.setAttribute('data-modal', project.modalId);
    
    card.innerHTML = `
      <img src="${project.thumbnail}" alt="${project.title}" class="project-image">
      <h3 class="project-title">${project.title}</h3>
      <p class="project-description">${project.description}</p>
      <a href="${project.githubLink}" target="_blank" class="view-code-btn">View Code</a>
    `;
    
    container.appendChild(card);
  });
}

// Function to render project modals
export function renderProjectModals(container, projectType) {
  const projects = projectData[projectType];
  if (!projects || !container) return;
  
  // Clear existing modals
  const existingModals = container.querySelectorAll('.project-modal');
  existingModals.forEach(modal => modal.remove());
  
  // Create project modals
  projects.forEach(project => {
    const modal = document.createElement('div');
    modal.id = project.modalId;
    modal.className = 'project-modal';
    
    // Create slides HTML
    const slidesHTML = project.slides.map(slide => `
      <div class="slide fade">
        <img src="${slide.image}" alt="${slide.alt}" class="modal-image">
      </div>
    `).join('');
    
    // Create tags HTML
    const tagsHTML = project.tags.map(tag => `
      <span class="tag">${tag}</span>
    `).join('');
    
    modal.innerHTML = `
      <div class="modal-content">
        <span class="close-btn">&times;</span>
        <!-- Slideshow Container -->
        <div class="slideshow-container">
          ${slidesHTML}
          <!-- Navigation Buttons -->
          <a class="prev" onclick="changeSlide(-1)">&#10094;</a>
          <a class="next" onclick="changeSlide(1)">&#10095;</a>
        </div>
        <h3 class="modal-title">${project.title}</h3>
        <p class="modal-description">${project.description}</p>
        <div class="tech-tags">
          ${tagsHTML}
        </div>
        <div class="modal-actions">
          <a href="${project.githubLink}" target="_blank" class="modal-btn">View Code</a>
        </div>
      </div>
    `;
    
    container.appendChild(modal);
  });
}