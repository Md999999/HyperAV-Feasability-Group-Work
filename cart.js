// Load cart items from localStorage and display them
function loadCart() {
    const cartItems = document.getElementById('cart-items');
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
  
    if (storedCart.length === 0) {
      cartItems.innerHTML = '<p>Your cart is empty!</p>';
      return;
    }
  
    cartItems.innerHTML = '';
    let total = 0;
  
    storedCart.forEach((item, index) => {
      const cartItem = document.createElement('div');
      cartItem.className = 'cart-item';
      cartItem.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <div class="cart-details">
          <h3>${item.name}</h3>
          <p>Price: £${item.price}</p>
          <p>
            Quantity: 
            <button onclick="changeQuantity(${index}, -1)">➖</button> 
            ${item.quantity} 
            <button onclick="changeQuantity(${index}, 1)">➕</button>
          </p>
          <button class="remove-button" onclick="removeFromCart(${index})">Remove</button>
        </div>
      `;
      cartItems.appendChild(cartItem);
      total += item.price * item.quantity;
    });
  
    const totalDiv = document.createElement('div');
    totalDiv.className = 'cart-total';
    totalDiv.innerHTML = `Total: £${total.toFixed(2)}`;
    cartItems.appendChild(totalDiv);
  }
  
  // Remove item from cart
  function removeFromCart(index) {
    if (confirm('Are you sure you want to remove this item?')) {
      let storedCart = JSON.parse(localStorage.getItem('cart')) || [];
      storedCart.splice(index, 1);
      localStorage.setItem('cart', JSON.stringify(storedCart));
      loadCart();
      updateCartCount();
    }
  }
  
  // Change quantity of an item in the cart
  function changeQuantity(index, change) {
    let storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    storedCart[index].quantity += change;
  
    if (storedCart[index].quantity <= 0) {
      if (confirm('Remove this item from cart?')) {
        storedCart.splice(index, 1);
      } else {
        storedCart[index].quantity = 1;
      }
    }
  
    localStorage.setItem('cart', JSON.stringify(storedCart));
    loadCart();
    updateCartCount();
  }
  
  // Update cart count in the header
  function updateCartCount() {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    const count = storedCart.reduce((total, item) => total + item.quantity, 0);
    const cartCountSpan = document.getElementById('cart-count');
    if (cartCountSpan) {
      cartCountSpan.textContent = count;
    }
  }
  
  // Initialize the cart when the page loads
  loadCart();
  