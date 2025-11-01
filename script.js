let cart = [];

// Add to Cart
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

    updateCartIcon();
  });
});

// Floating Cart & Modal
const cartIcon = document.getElementById('cart-icon');
const cartModal = document.getElementById('cart-modal');
const closeModal = document.querySelector('.close');
const cartItemsEl = document.getElementById('cart-items');
const totalEl = document.getElementById('total');
const payBtn = document.getElementById('pay-btn');

cartIcon.onclick = () => {
  renderCart();
  cartModal.style.display = 'block';
};
closeModal.onclick = () => cartModal.style.display = 'none';
window.onclick = e => { if (e.target === cartModal) cartModal.style.display = 'none'; };

function renderCart() {
  cartItemsEl.innerHTML = '';
  let total = 0;
  cart.forEach((item, i) => {
    total += item.price * item.qty;
    const li = document.createElement('li');
    li.innerHTML = `${item.name} (x${item.qty}) - Rp${(item.price * item.qty).toLocaleString('id-ID')}`;
    cartItemsEl.appendChild(li);
  });
  totalEl.textContent = `Total: Rp${total.toLocaleString('id-ID')}`;
}

function updateCartIcon() {
  const count = cart.reduce((acc, item) => acc + item.qty, 0);
  document.getElementById('cart-count').textContent = count;
}

// Dummy Payment
payBtn.addEventListener('click', () => {
  alert('Pembayaran sedang diproses... (dummy)');
  cart = [];
  updateCartIcon();
  renderCart();
  cartModal.style.display = 'none';
});
