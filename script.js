// /*This file is a javascript file meant for the functionality of differnet parts of the html files
// This has several functions for things like opening and closing the navigation, adding items to card, updating cart, remove from cart and update card \
// Author: Matthew Ostin*/


let cart = [];

// Load cart from localStorage if available
if (localStorage.getItem("cart")) {
    cart = JSON.parse(localStorage.getItem("cart"));
}

/**
 * Function to add an item to the cart.
 */

function addToCart(itemName, price, image) {
    console.log(`Adding item: ${itemName} with price $${price} and image ${image}`); // Log item being added

    // Get the quantity from the input field (make sure it's a number and greater than 0)



    const quantity = parseInt(document.querySelector(`#Quantity`).value);

    if (quantity <= 0 || isNaN(quantity)) {
        alert("Please select a valid quantity.");
        return;
    }

    const item = cart.find(i => i.name === itemName);
    if (item) {
        item.quantity += quantity;   // Add the selected quantity to the existing quantity
    } else {
        cart.push({ name: itemName, price: price, quantity: quantity, image: image }); // Add new item with the selected quantity
    }

    // Save updated cart to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));
    
    console.log(cart);  // <-- Debugging: Log updated cart to console

    // Show feedback to the user
    alert(`${itemName} added to cart.`);
}


/**
 * Function to update the cart display on Cart.html.
 */
function updateCartDisplay() {
    const cartElement = document.getElementById("cartContents");
    const totalElement = document.getElementById("cartTotal");

    // Check if elements exist on the page before proceeding
    if (!cartElement || !totalElement) {
        console.warn("Cart display elements not found. Ensure this is on Cart.html.");
        return;
    }

    // Clear current cart display
    cartElement.innerHTML = "";
    let total = 0;

    // Populate the cart display
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const itemElement = document.createElement("div");
        itemElement.className = "cart-item";

        // Add product image, name, price, quantity, and total price to cart display
        itemElement.innerHTML = `
            <span>${item.name}</span>
            <span>${item.quantity} x $${item.price.toFixed(2)}</span>
            <span>$${itemTotal.toFixed(2)}</span>
            <button onclick="removeFromCart('${item.name}')">Remove</button>
        `;
        cartElement.appendChild(itemElement);
    });

    // Display the total price
    totalElement.innerText = `Total: $${total.toFixed(2)}`;

    // Log cart contents for debugging
    console.log("Cart contents:", cart);  // <-- Debugging: Log cart contents for debugging
}

/**
 * Function to remove an item from the cart.
 */
function removeFromCart(itemName) {
    cart = cart.filter(item => item.name !== itemName);

    // Update localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartDisplay();
}

/**
 * Load and display the cart when Cart.html is opened.
 */
window.onload = function() {
    updateCartDisplay(); // Call updateCartDisplay to display cart contents on page load
};
