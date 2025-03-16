// Text Particle Animation for About Section
class TextParticleAnimation {
  constructor(elementSelector) {
    // Skip about-description elements completely
    const element = document.querySelector(elementSelector);
    if (!element || element.classList.contains('about-description')) return;
    
    this.element = element;
    this.originalText = this.element.innerText;
    this.particles = [];
    this.mouse = { x: 0, y: 0 };
    this.isActive = false;
    this.canvas = null;
    this.ctx = null;
    this.rect = null;
    this.animationFrame = null;
    
    this.init();
  }
  
  init() {
    // Create canvas element
    this.canvas = document.createElement('canvas');
    this.canvas.className = 'text-particle-canvas';
    this.ctx = this.canvas.getContext('2d');
    
    // Position canvas over the text
    this.positionCanvas();
    
    // Replace original element with canvas
    this.element.innerHTML = '';
    this.element.appendChild(this.canvas);
    
    // Add hidden span with original text for accessibility
    const hiddenText = document.createElement('span');
    hiddenText.className = 'sr-only';
    hiddenText.innerText = this.originalText;
    this.element.appendChild(hiddenText);
    
    // Initialize particles
    this.initParticles();
    
    // Add event listeners
    window.addEventListener('resize', this.handleResize.bind(this));
    this.canvas.addEventListener('mousemove', this.handleMouseMove.bind(this));
    this.canvas.addEventListener('mouseleave', this.handleMouseLeave.bind(this));
    
    // Start animation
    this.animate();
    
    // Add intersection observer to pause animation when not visible
    this.setupIntersectionObserver();
  }
  
  positionCanvas() {
    this.rect = this.element.getBoundingClientRect();
    this.canvas.width = this.rect.width;
    this.canvas.height = this.rect.height;
    
    // Set font properties for text measurement
    this.ctx.font = window.getComputedStyle(this.element).font;
    this.ctx.textBaseline = 'top';
    this.ctx.fillStyle = window.getComputedStyle(this.element).color;
  }
  
  initParticles() {
    this.particles = [];
    
    // Clear canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Draw text to canvas
    this.ctx.fillText(this.originalText, 0, 0);
    
    // Get image data
    const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
    const data = imageData.data;
    
    // Clear canvas again
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Create particles based on text pixels
    const particleSize = 2;
    const particleGap = 4;
    
    for (let y = 0; y < this.canvas.height; y += particleGap) {
      for (let x = 0; x < this.canvas.width; x += particleGap) {
        const index = (y * this.canvas.width + x) * 4;
        if (data[index + 3] > 128) { // If pixel is visible (alpha > 128)
          this.particles.push({
            x: x,
            y: y,
            originX: x,
            originY: y,
            size: particleSize,
            color: `rgba(${data[index]}, ${data[index + 1]}, ${data[index + 2]}, ${data[index + 3] / 255})`,
            vx: 0,
            vy: 0
          });
        }
      }
    }
  }
  
  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      
      // Calculate distance from mouse
      if (this.isActive) {
        const dx = this.mouse.x - p.x;
        const dy = this.mouse.y - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const forceDirectionX = dx / distance;
        const forceDirectionY = dy / distance;
        const force = Math.min(2000 / (distance * distance), 12);
        
        // Apply force away from mouse
        p.vx -= forceDirectionX * force;
        p.vy -= forceDirectionY * force;
      }
      
      // Apply spring force back to original position
      const dx = p.originX - p.x;
      const dy = p.originY - p.y;
      p.vx += dx * 0.1;
      p.vy += dy * 0.1;
      
      // Apply friction
      p.vx *= 0.92;
      p.vy *= 0.92;
      
      // Update position
      p.x += p.vx;
      p.y += p.vy;
      
      // Draw particle
      this.ctx.fillStyle = p.color;
      this.ctx.fillRect(p.x, p.y, p.size, p.size);
    }
    
    this.animationFrame = requestAnimationFrame(this.animate.bind(this));
  }
  
  handleResize() {
    this.positionCanvas();
    this.initParticles();
  }
  
  handleMouseMove(e) {
    this.isActive = true;
    const rect = this.canvas.getBoundingClientRect();
    this.mouse.x = e.clientX - rect.left;
    this.mouse.y = e.clientY - rect.top;
  }
  
  handleMouseLeave() {
    this.isActive = false;
  }
  
  setupIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Element is visible, start animation if paused
          if (!this.animationFrame) {
            this.animate();
          }
        } else {
          // Element is not visible, pause animation
          if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
            this.animationFrame = null;
          }
        }
      });
    }, { threshold: 0.1 });
    
    observer.observe(this.element);
  }
}

// Initialize function to be exported
function initTextParticleAnimation(selector) {
  // Do not apply particle animation to about-description elements
  // The circuit trace animation will be used instead
  if (selector) {
    new TextParticleAnimation(selector);
  }
}

// Export the initialization function
export default initTextParticleAnimation;
