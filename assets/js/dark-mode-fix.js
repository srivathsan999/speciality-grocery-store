/**
 * Dark Mode Fix for Tailwind CDN
 * Ensures dark mode classes work properly with data-theme attribute
 */

(function() {
  try {
  // Function to update dark class - can be called immediately
  function updateDarkClass() {
    if (!document.documentElement) return;
    const theme = document.documentElement.getAttribute('data-theme');
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
  
  // Initialize immediately if possible, otherwise wait for DOM
  function init() {
    // Force Tailwind to recognize dark mode - try multiple times if needed
    function configureTailwind() {
      if (typeof tailwind !== 'undefined') {
        // Re-initialize Tailwind with dark mode config
        const config = {
          darkMode: ['selector', '[data-theme="dark"]']
        };
        
        // Apply config if possible
        if (tailwind.config) {
          Object.assign(tailwind.config, config);
        } else if (window.tailwindConfig) {
          // If config is in window, merge it
          Object.assign(window.tailwindConfig, config);
        }
      }
    }
    
    // Try to configure Tailwind immediately
    configureTailwind();
    
    // Also try after a short delay in case Tailwind loads later
    setTimeout(configureTailwind, 100);
    
    // Initial update - run immediately
    updateDarkClass();
    
    // Watch for theme changes
    if (document.documentElement) {
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
            updateDarkClass();
            // Reconfigure Tailwind when theme changes
            configureTailwind();
          }
        });
      });
      
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['data-theme']
      });
    }
  }
  
  // Run update immediately if documentElement exists
  if (document.documentElement) {
    updateDarkClass();
  }
  
  // Full initialization
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  
  // Make updateDarkClass available globally for theme.js to call
  window.updateDarkClass = updateDarkClass;
  } catch (error) {
    console.error('Error initializing dark mode fix:', error);
  }
})();

