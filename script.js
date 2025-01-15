// Function to add a product to the cart
function addToCart(productName, productPrice) {
    // Check if cart already exists in localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Create a new product object
    const product = {
        name: productName,
        price: productPrice
    };

    // Add the new product to the cart
    cart.push(product);

    // Save the updated cart back to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Notify the user that the item has been added
    alert(`${productName} has been added to your cart!`);
}

// Function to display cart items
function displayCart() {
    // Retrieve the cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Find the cart element in HTML to display the cart items
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalContainer = document.getElementById('cart-total');
    cartItemsContainer.innerHTML = '';  // Clear any existing items

    let total = 0;

    // Loop through the cart and display each item
    cart.forEach(item => {
        const cartItemElement = document.createElement('div');
        cartItemElement.classList.add('cart-item');
        cartItemElement.innerHTML = `
            <p>${item.name}</p>
            <p>Price: $${item.price}</p>
        `;
        cartItemsContainer.appendChild(cartItemElement);
        total += item.price;  // Add the price to the total
    });

    // Display the total price
    cartTotalContainer.innerHTML = `Total: $${total.toFixed(2)}`;
}

// Event listener for page load
document.addEventListener('DOMContentLoaded', function () {
    // Display the cart when the cart page is loaded
    if (window.location.href.includes('cart.html')) {
        displayCart();
    }

    // Add event listeners to "Add to Cart" buttons on product pages
    const addToCartButtons = document.querySelectorAll('.product button');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function () {
            const productName = this.parentElement.querySelector('h3').innerText;
            const productPrice = parseFloat(this.parentElement.querySelector('p').innerText.replace('$', ''));
            addToCart(productName, productPrice);
        });
    });
});
