/**
 * Dark Mode Fix for Tailwind CDN
 * Ensures dark mode classes work properly with data-theme attribute
 */

(function() {
  // Wait for DOM to be ready
  function init() {
    // Force Tailwind to recognize dark mode
    if (typeof tailwind !== 'undefined') {
      // Re-initialize Tailwind with dark mode config
      const config = {
        darkMode: ['selector', '[data-theme="dark"]']
      };
      
      // Apply config if possible
      if (tailwind.config) {
        Object.assign(tailwind.config, config);
      }
    }
    
    // Add a class to html when dark mode is active for additional CSS targeting
    function updateDarkClass() {
      const theme = document.documentElement.getAttribute('data-theme');
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
    
    // Initial update
    updateDarkClass();
    
    // Watch for theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
          updateDarkClass();
        }
      });
    });
    
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });
  }
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

