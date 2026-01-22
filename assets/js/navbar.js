/**
 * Navbar Controller
 * Handles sticky navbar with glassmorphism on scroll
 */

document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.querySelector('.navbar');
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const cartBadge = document.querySelector('.cart-badge');

  // Sticky navbar with glassmorphism
  if (navbar) {
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;
      
      if (currentScroll > 100) {
        navbar.classList.add('scrolled');
        navbar.classList.add('glass-nav');
      } else {
        navbar.classList.remove('scrolled');
        navbar.classList.remove('glass-nav');
      }
      
      lastScroll = currentScroll;
    });
  }

  // Mobile menu toggle
  if (mobileMenuToggle && mobileMenu) {
    mobileMenuToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('active');
      mobileMenuToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!mobileMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
        mobileMenu.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
      }
    });
  }

  // Update cart badge from localStorage
  function updateCartBadge() {
    if (cartBadge) {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const count = cart.reduce((sum, item) => sum + item.quantity, 0);
      cartBadge.textContent = count;
      cartBadge.style.display = count > 0 ? 'flex' : 'none';
    }
  }

  updateCartBadge();
  
  // Listen for cart updates
  window.addEventListener('storage', updateCartBadge);
  window.addEventListener('cartUpdated', updateCartBadge);
});

