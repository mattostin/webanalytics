/*This file is a javascript file meant for the functionality of differnet parts of the html files
This has several functions for things like opening and closing the navigation, adding items to card, updating cart, remove from cart and update card \
Author: Matthew Ostin*/
let cart = [];

//load cart from localStorage if available
if (localStorage.getItem("cart")) {
    cart = JSON.parse(localStorage.getItem("cart"));
}

/**
 *function to add an item to the cart.
 */
function addToCart(itemName, price) {
    console.log(`Adding item: ${itemName} with price $${price}`);

    const item = cart.find(i => i.name === itemName);
    if (item) {
        item.quantity += 1;
    } else {
        cart.push({ name: itemName, price: price, quantity: 1 });
    }

    //save updated cart to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));
    
    //Show feedback
    alert(`${itemName} added to cart.`);
}

/**
 * function to update the cart display on Cart.html.
 */
function updateCartDisplay() {
    const cartElement = document.getElementById("cartContents");
    const totalElement = document.getElementById("cartTotal");

    //check if elements exist on the page before proceeding
    if (!cartElement || !totalElement) {
        console.warn("Cart display elements not found. Ensure this is on Cart.html.");
        return;
    }

    //clear current cart display
    cartElement.innerHTML = "";
    let total = 0;

    //populate the cart display
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const itemElement = document.createElement("div");
        itemElement.className = "cart-item";
        itemElement.innerHTML = `
            <span>${item.name}</span>
            <span>${item.quantity} x $${item.price.toFixed(2)}</span>
            <span>$${itemTotal.toFixed(2)}</span>
            <button onclick="removeFromCart('${item.name}')">Remove</button>
        `;
        cartElement.appendChild(itemElement);
    });

    //Display the total price
    totalElement.innerText = `Total: $${total.toFixed(2)}`;
}

/**
 *Function to remove an item from the cart.
 */
function removeFromCart(itemName) {
    cart = cart.filter(item => item.name !== itemName);
    
    //update localStorage
    localStorage.setItem("cart", JSON.stringify(cart));
    
    updateCartDisplay();
}

/**
 *load and display the cart when Cart.html is opened.
 */
window.onload = function() {
    updateCartDisplay();
};
