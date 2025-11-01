let cart = [];

document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', () => {
    const name = button.dataset.name;
    const price = parseInt(button.dataset.price);

    const existing = cart.find(item => item.name === name);
    if (existing) {
      existing.qty++;
    } else {
      cart.push({ name, price, qty: 1 });
    }

    renderCart();
  });
});

document.getElementById('clear-cart').addEventListener('click', () => {
  cart = [];
  renderCart();
});

function renderCart() {
  const cartItems = document.getElementById('cart-items');
  const totalElement = document.getElementById('total');
  cartItems.innerHTML = '';

  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.qty;
    const li = document.createElement('li');
    li.innerHTML = `
      ${item.name} (x${item.qty}) - Rp${(item.price * item.qty).toLocaleString('id-ID')}
      <button class="remove" data-index="${index}">❌</button>
    `;
    cartItems.appendChild(li);
  });

  totalElement.textContent = `Total: Rp${total.toLocaleString('id-ID')}`;

  document.querySelectorAll('.remove').forEach(btn => {
    btn.addEventListener('click', () => {
      const index = btn.dataset.index;
      cart.splice(index, 1);
      renderCart();
    });
  });
}
