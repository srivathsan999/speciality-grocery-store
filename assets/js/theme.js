/**
 * Theme Controller
 * Manages light/dark mode with localStorage persistence
 */

class ThemeController {
  constructor() {
    this.theme = localStorage.getItem('theme') || 'light';
    this.initialized = false;
  }

  init() {
    if (this.initialized) return;
    this.initialized = true;
    
    // Set initial theme immediately
    if (document.documentElement) {
      document.documentElement.setAttribute('data-theme', this.theme);
    }
    
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        this.setupThemeToggle();
      });
    } else {
      // DOM is already ready
      this.setupThemeToggle();
    }
  }

  setupThemeToggle() {
    this.updateToggleButton();
    
    // Use event delegation - this will work even if buttons are added later
    const attachListener = () => {
      if (document.body) {
        document.body.addEventListener('click', (e) => {
          const target = e.target.closest('.theme-toggle, [data-theme-toggle]');
          if (target) {
            e.preventDefault();
            e.stopPropagation();
            this.toggle();
          }
        }, true); // Use capture phase for better reliability
      } else {
        // Retry if body not ready
        setTimeout(attachListener, 10);
      }
    };
    
    attachListener();
  }

  toggle() {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', this.theme);
    localStorage.setItem('theme', this.theme);
    this.updateToggleButton();
    
    // Dispatch custom event for any components that need to react
    window.dispatchEvent(new CustomEvent('themeChanged', { 
      detail: { theme: this.theme } 
    }));
  }

  updateToggleButton() {
    const toggleButtons = document.querySelectorAll('.theme-toggle, [data-theme-toggle]');
    toggleButtons.forEach(btn => {
      let icon = btn.querySelector('svg');
      if (!icon) {
        // Create SVG if it doesn't exist
        icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        icon.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        icon.setAttribute('width', '20');
        icon.setAttribute('height', '20');
        icon.setAttribute('viewBox', '0 0 24 24');
        icon.setAttribute('fill', 'none');
        icon.setAttribute('stroke', 'currentColor');
        icon.setAttribute('stroke-width', '2');
        icon.setAttribute('stroke-linecap', 'round');
        icon.setAttribute('stroke-linejoin', 'round');
        btn.appendChild(icon);
      }
      
      if (this.theme === 'dark') {
        // Show sun icon for dark mode (to switch to light)
        icon.innerHTML = `
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        `;
      } else {
        // Show moon icon for light mode (to switch to dark)
        icon.innerHTML = `
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        `;
      }
    });
  }

  getCurrentTheme() {
    return this.theme;
  }
}

// Initialize theme controller
const themeController = new ThemeController();
themeController.init();

// Make it globally available
window.themeController = themeController;

// Also support direct function calls
window.toggleTheme = function() {
  themeController.toggle();
};
