//Retrieve cart from localStorage or use sample data if empty
let cart = JSON.parse(localStorage.getItem('cartItems')) || [];

// Function to calculate discount
function calculateDiscount(total) {
    if (total > 30000) {
        // 10% discount for orders over $30,000
        return total * 0.10;
    }
    return 0;
}

// Function to display the cart items
function displayCart() {
    const cartItemsContainer = document.getElementById('cart-items'); //gets element where cart items will be displayed
    cartItemsContainer.innerHTML = '';  // Clear the current contents
    let totalPrice = 0.00;

    //loops through each cart item
    cart.forEach(item => {
        // Calculate total price
        totalPrice += item.price * item.quantity;
        
        // Create cart item element
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            
            <div class = "item-name">${item.name}</div>
            <div>
                <span>Price: $${item.price}</span>
                <input type="number" 
                    id="quantity-${item.id}" 
                    value="${item.quantity}" 
                    min="1" 
                    max="10" />
                <button class="remove-btn" 
                    onclick="removeItem(${item.id})">Remove</button>
            </div>
        `;
        cartItemsContainer.appendChild(cartItem); //adds the item to cart display
    });

    // Calculate discount
    const discount = calculateDiscount(totalPrice);
    const finalPrice = totalPrice - discount;

    // Update total price and discount information
    document.getElementById('total-price').innerText = totalPrice.toFixed(2);
    document.getElementById('discount-amount').innerText = discount.toFixed(2);
    document.getElementById('final-price').innerText = finalPrice.toFixed(2);
}

// Function to update the cart quantities
function updateCart() {
    cart.forEach(item => {
        const quantityInput = document.getElementById(`quantity-${item.id}`);
        const newQuantity = parseInt(quantityInput.value);
        
        if (newQuantity > 0 && newQuantity <= 10) {  // Assuming max quantity is 10
            item.quantity = newQuantity;
        } else {
            alert("Quantity must be between 1 and 10");
        }
    });
    
    // Save updated cart to localStorage
    localStorage.setItem('cartItems', JSON.stringify(cart));
    displayCart();  // Re-display the cart with updated quantities
}

// Function to remove an item from the cart
function removeItem(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cartItems', JSON.stringify(cart));
    displayCart();  // Re-display the cart after removal
}

// Function to simulate checkout
function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
    } else {
        const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const discount = calculateDiscount(totalPrice);
        const finalPrice = totalPrice - discount;
        
        alert(`Order Summary:
        Subtotal: $${totalPrice.toFixed(2)}
        Discount: $${discount.toFixed(2)}
        Final Price: $${finalPrice.toFixed(2)}`);
        
        // Clear cart after successful checkout
        cart = [];
        localStorage.setItem('cartItems', JSON.stringify(cart));
        displayCart();
        // You can redirect to the checkout page or display an invoice here
    }
}

// Display cart items on page load
window.onload = displayCart;