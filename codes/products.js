let lastScrollTop = 0;
const header = document.querySelector(".header");

window.addEventListener("scroll", function() {
    console.log('Scroll Event');
    let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    if (currentScroll > lastScrollTop) {
        // Scrolling down: hide the header
        header.style.top = "-200px"; // Move it up (adjust the value based on header height)
    } else {
        // Scrolling up: show the header
        header.style.top = "0";
    }

    lastScrollTop = currentScroll;
});

//Default quantity for each item
var availableStock = {
    1: 10, 
    2: 10, 
    3: 10, 
    4: 10,
    5: 10, 
    6: 10, 
    7: 10,
    8: 10,
    9: 10,
    10: 10, 
    11: 10, 
    12: 10  
};

// Array to store cart items
var cart = [];
var products = [
    { id: 1, name: "Rose", price: 1200 },
    { id: 2, name: "Tulip", price: 1200 },
    { id: 3, name: "Sunflower", price: 950 },
    { id: 4, name: "Orchid", price: 650 },
    { id: 5, name: "Lily", price: 1050 },
    { id: 6, name: "Peony", price: 1250 },
    { id: 7, name: "Rose Bouquet", price: 14000 },
    { id: 8, name: "Sunflower Bouquet", price: 12000 },
    { id: 9, name: "Lily Bouquet", price: 12500 },
    { id: 10, name: "Orchid Bouquet", price: 10000 },
    { id: 11, name: "Tulip Bouquet", price: 14000 },
    { id: 12, name: "Peony Bouquet", price: 15000 }
];

// Function to add product to cart
function addToCart(productId) {
    if (availableStock[productId] > 0) {
        var product = products.find(p => p.id === productId);
        cart.push(product);
        availableStock[productId]--;
        alert(product.name + " has been added to your cart.");
    } else {
        alert("Sorry, this item is out of stock!");
    }
}

// Function to handle checkout - just redirects to cart page
document.getElementById('checkout-btn').addEventListener('click', function() {
    if (cart.length === 0) {
        alert("Your cart is empty. Please add items to your cart before checking out.");
        return;
    }
    // Store cart data for cart.js to use
    localStorage.setItem('cartItems', JSON.stringify(cart));
    window.location.href = "cart.html";
});

// Function to handle cancel
document.getElementById('cancel-btn').addEventListener('click', function() {
    // Restore stock
    cart.forEach(item => {
        availableStock[item.id]++;
    });
    cart = [];
    alert("Your cart has been emptied.");
});

// Function to exit page
document.getElementById('exit-btn').addEventListener('click', function(){
    window.location.href = "index.html";
});
