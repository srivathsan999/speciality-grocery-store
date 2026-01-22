/**
 * Main JavaScript
 * Initializes GSAP animations and other interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize GSAP animations if available
  if (typeof gsap !== 'undefined') {
    // Fade in animations for elements
    gsap.utils.toArray('.fade-in-up').forEach((element, index) => {
      gsap.from(element, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: index * 0.1,
        ease: 'power3.out'
      });
    });

    // Stagger animation for product cards
    gsap.utils.toArray('.product-card').forEach((card, index) => {
      gsap.from(card, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        delay: index * 0.05,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      });
    });
  }

  // Quantity buttons
  document.querySelectorAll('.qty-decrease').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const input = e.target.closest('.qty-controls').querySelector('.qty-input');
      let value = parseInt(input.value) || 1;
      if (value > 1) {
        input.value = value - 1;
      }
    });
  });

  document.querySelectorAll('.qty-increase').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const input = e.target.closest('.qty-controls').querySelector('.qty-input');
      let value = parseInt(input.value) || 1;
      input.value = value + 1;
    });
  });

  // Add to cart buttons
  document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const productCard = e.target.closest('.product-card, .product-item');
      const productId = productCard?.dataset.productId || Math.random().toString(36);
      const productName = productCard?.querySelector('.product-name')?.textContent || 'Product';
      const productPrice = parseFloat(productCard?.dataset.price || productCard?.querySelector('.product-price')?.textContent?.replace(/[^0-9.]/g, '') || 0);
      const productImage = productCard?.querySelector('img')?.src || '';

      if (window.cartManager) {
        window.cartManager.addItem({
          id: productId,
          name: productName,
          price: productPrice,
          image: productImage,
          quantity: 1
        });

        // Show feedback
        btn.textContent = 'Added!';
        btn.disabled = true;
        setTimeout(() => {
          btn.textContent = 'Add to Cart';
          btn.disabled = false;
        }, 2000);
      }
    });
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href !== '#' && href.length > 1) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });
});

