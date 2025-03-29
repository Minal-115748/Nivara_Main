// Initialize cart if not exists
if (!localStorage.getItem('cart')) {
    localStorage.setItem('cart', JSON.stringify([]));
}

// Add to cart function
function addToCart(productId, productName, price, imageUrl) {
    const cart = JSON.parse(localStorage.getItem('cart'));
    
    // Check if product already exists
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: productId,
            name: productName,
            price: parseFloat(price),
            image: imageUrl || 'img/default-product.jpg',
            quantity: 1
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCounter();
}

// Update cart counter in nav
function updateCartCounter() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelectorAll('.cart-counter').forEach(el => {
        el.textContent = totalItems;
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    updateCartCounter();
    
    // Attach click handlers to all "Add to Cart" buttons
    document.querySelectorAll('.box1').forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent triggering the product view
            const product = this.closest('.product');
            addToCart(
                product.dataset.id,
                product.dataset.name,
                product.querySelector('p:last-child').textContent.replace('Rs.', '').trim(),
                product.querySelector('img').src
            );
            
            // Visual feedback
            this.textContent = '✓ Added';
            setTimeout(() => {
                this.textContent = 'Add TO CART';
            }, 2000);
        });
    });
});