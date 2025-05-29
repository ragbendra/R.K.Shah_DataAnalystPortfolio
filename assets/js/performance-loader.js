/**
 * Performance Loader
 * Optimizes the loading of JavaScript resources based on priority
 */

// Define script loading priorities
const PRIORITIES = {
  CRITICAL: 'critical',   // Load immediately
  HIGH: 'high',           // Load during idle time with short timeout
  MEDIUM: 'medium',       // Load during idle time with longer timeout
  LOW: 'low',             // Load after page load
  LAZY: 'lazy'            // Load on demand or when scrolled into view
};

// Script registry with priorities
const scripts = [
  { src: './assets/js/hamburger-menu.js', priority: PRIORITIES.CRITICAL },
  { src: './assets/js/navbar-scroll-fix.js', priority: PRIORITIES.HIGH },
  { src: './assets/js/script.js', type: 'module', priority: PRIORITIES.MEDIUM },
  { src: 'https://unpkg.com/aos@2.3.1/dist/aos.js', priority: PRIORITIES.LOW, onload: initAOS }
];

// Track loaded scripts to avoid duplicates
const loadedScripts = new Set();

// Initialize AOS library with optimized settings
function initAOS() {
  if (window.AOS) {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      startEvent: 'DOMContentLoaded',
      disable: window.innerWidth < 768 // Disable on mobile for better performance
    });
  }
}

// Load a script with given priority
function loadScript(scriptConfig) {
  if (loadedScripts.has(scriptConfig.src)) return Promise.resolve();
  
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = scriptConfig.src;
    
    if (scriptConfig.type) {
      script.type = scriptConfig.type;
    }
    
    script.onload = () => {
      loadedScripts.add(scriptConfig.src);
      if (typeof scriptConfig.onload === 'function') {
        scriptConfig.onload();
      }
      resolve();
    };
    
    script.onerror = (error) => {
      console.error(`Failed to load script: ${scriptConfig.src}`, error);
      reject(error);
    };
    
    document.body.appendChild(script);
  });
}

// Load scripts based on priority
function loadScriptsByPriority() {
  // Load critical scripts immediately
  const criticalScripts = scripts.filter(s => s.priority === PRIORITIES.CRITICAL);
  criticalScripts.forEach(loadScript);
  
  // Load high priority scripts during idle time with short timeout
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
      const highPriorityScripts = scripts.filter(s => s.priority === PRIORITIES.HIGH);
      highPriorityScripts.forEach(loadScript);
    }, { timeout: 1000 });
  } else {
    setTimeout(() => {
      const highPriorityScripts = scripts.filter(s => s.priority === PRIORITIES.HIGH);
      highPriorityScripts.forEach(loadScript);
    }, 100);
  }
  
  // Load medium priority scripts after a delay
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
      const mediumPriorityScripts = scripts.filter(s => s.priority === PRIORITIES.MEDIUM);
      mediumPriorityScripts.forEach(loadScript);
    }, { timeout: 2000 });
  } else {
    setTimeout(() => {
      const mediumPriorityScripts = scripts.filter(s => s.priority === PRIORITIES.MEDIUM);
      mediumPriorityScripts.forEach(loadScript);
    }, 500);
  }
  
  // Load low priority scripts after page load
  window.addEventListener('load', () => {
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        const lowPriorityScripts = scripts.filter(s => s.priority === PRIORITIES.LOW);
        lowPriorityScripts.forEach(loadScript);
      });
    } else {
      setTimeout(() => {
        const lowPriorityScripts = scripts.filter(s => s.priority === PRIORITIES.LOW);
        lowPriorityScripts.forEach(loadScript);
      }, 1000);
    }
  });
}

// Load lazy scripts when they come into view
function setupLazyScriptLoading() {
  if ('IntersectionObserver' in window) {
    const lazyScripts = scripts.filter(s => s.priority === PRIORITIES.LAZY);
    
    if (lazyScripts.length === 0) return;
    
    const lazyScriptObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const targetId = entry.target.id;
          const scriptsToLoad = lazyScripts.filter(s => s.loadFor === targetId);
          
          scriptsToLoad.forEach(loadScript);
          
          // Stop observing this element
          lazyScriptObserver.unobserve(entry.target);
        }
      });
    });
    
    // Get unique section IDs that need lazy scripts
    const uniqueSectionIds = [...new Set(lazyScripts.map(s => s.loadFor))];
    
    // Observe each section
    uniqueSectionIds.forEach(id => {
      const element = document.getElementById(id);
      if (element) {
        lazyScriptObserver.observe(element);
      }
    });
  }
}

// Initialize performance loader
document.addEventListener('DOMContentLoaded', () => {
  loadScriptsByPriority();
  setupLazyScriptLoading();
});

// Export functions for use in other modules
export {
  loadScript,
  PRIORITIES
};