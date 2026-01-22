/**
 * Cart Page Functionality
 */

document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const emptyCart = document.getElementById('empty-cart');
    const cartContent = document.getElementById('cart-content');

    function renderCart() {
        if (!window.cartManager) return;
        
        const cart = window.cartManager.cart;
        
        if (cart.length === 0) {
            if (emptyCart) emptyCart.classList.remove('hidden');
            if (cartContent) cartContent.classList.add('hidden');
            return;
        }

        if (emptyCart) emptyCart.classList.add('hidden');
        if (cartContent) cartContent.classList.remove('hidden');

        if (cartItemsContainer) {
            cartItemsContainer.innerHTML = cart.map(item => `
                <div class="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-6 border-b border-[#E5E7EB] dark:border-[rgba(255,255,255,0.1)]">
                    <img src="${item.image || 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=100&h=100&fit=crop'}" alt="${item.name}" class="w-24 h-24 object-cover rounded-lg">
                    <div class="flex-1">
                        <h3 class="font-heading font-semibold text-lg text-[#14532D] dark:text-[#84CC16] mb-2">${item.name}</h3>
                        <p class="text-[#64748B] dark:text-[#9CA3AF]">$${item.price.toFixed(2)}</p>
                    </div>
                    <div class="flex items-center space-x-4">
                        <div class="qty-controls flex items-center space-x-3">
                            <button class="qty-btn qty-decrease" data-id="${item.id}">-</button>
                            <input type="number" value="${item.quantity}" min="1" class="qty-input w-16 text-center border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.1)] rounded-lg py-2 bg-white dark:bg-[#0F172A]" data-id="${item.id}">
                            <button class="qty-btn qty-increase" data-id="${item.id}">+</button>
                        </div>
                        <p class="text-xl font-bold text-[#14532D] dark:text-[#84CC16] w-24 text-right">$${(item.price * item.quantity).toFixed(2)}</p>
                        <button class="remove-item text-red-500 hover:text-red-700 p-2" data-id="${item.id}">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <polyline points="3 6 5 6 21 6"></polyline>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            `).join('');
        }

        if (cartTotal) {
            const total = window.cartManager.getTotal();
            cartTotal.textContent = `$${total.toFixed(2)}`;
            const cartTotalFinal = document.getElementById('cart-total-final');
            if (cartTotalFinal) {
                cartTotalFinal.textContent = `$${total.toFixed(2)}`;
            }
        }

        // Attach event listeners
        document.querySelectorAll('.qty-decrease').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.target.dataset.id;
                const input = document.querySelector(`.qty-input[data-id="${id}"]`);
                let qty = parseInt(input.value) || 1;
                if (qty > 1) {
                    window.cartManager.updateQuantity(id, qty - 1);
                    renderCart();
                }
            });
        });

        document.querySelectorAll('.qty-increase').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.target.dataset.id;
                const input = document.querySelector(`.qty-input[data-id="${id}"]`);
                let qty = parseInt(input.value) || 1;
                window.cartManager.updateQuantity(id, qty + 1);
                renderCart();
            });
        });

        document.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.target.closest('.remove-item').dataset.id;
                window.cartManager.removeItem(id);
                renderCart();
            });
        });
    }

    renderCart();
    
    // Listen for cart updates
    window.addEventListener('cartUpdated', renderCart);
});

