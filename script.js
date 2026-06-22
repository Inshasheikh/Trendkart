// ============================================================
// COMPLETE JAVASCRIPT — TrendKart
// All features: Cart, Wishlist, Checkout, Orders, Cancel, Track,
// Dark Mode, Hero Slider, Countdown, Skeleton Loader, etc.
// ============================================================

// ============ PRODUCT DATA ============
const products = [
  { id: 1, name: "Noise ColorFit Pro 4", price: 4499, oldPrice: 7999, rating: 4.6, img: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&h=400&fit=crop&crop=center", images: ["https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&h=400&fit=crop&crop=center","https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400&h=400&fit=crop&crop=center"], category: "watch", stock: 3, description: "Advanced smartwatch with 1.8-inch AMOLED display.", features: ["1.8-inch AMOLED", "SpO2 & Heart Rate", "7-Day Battery"] },
  { id: 2, name: "boAt Airdopes 141", price: 1299, oldPrice: 2499, rating: 4.3, img: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=400&h=400&fit=crop&crop=center", images: ["https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=400&h=400&fit=crop&crop=center"], category: "audio", stock: 5, description: "True wireless earbuds with 42 hours battery.", features: ["42 Hours Battery", "Immersive Sound", "IPX5"] },
  { id: 3, name: "Ambrane 20000mAh Powerbank", price: 1499, oldPrice: 2999, rating: 4.4, img: "https://images.unsplash.com/photo-1609592424901-16c85a5b09d1?w=400&h=400&fit=crop&crop=center", images: ["https://images.unsplash.com/photo-1609592424901-16c85a5b09d1?w=400&h=400&fit=crop&crop=center"], category: "powerbank", stock: 2, description: "20000mAh fast charging power bank.", features: ["20000mAh", "Fast Charging", "Dual USB"] },
  { id: 4, name: "Apple MagSafe Charger", price: 2499, oldPrice: 3900, rating: 4.7, img: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=400&fit=crop&crop=center", images: ["https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=400&fit=crop&crop=center"], category: "accessory", stock: 4, description: "Official Apple MagSafe 15W fast charger.", features: ["15W Fast Charging", "Magnetic", "USB-C"] },
  { id: 5, name: "OnePlus Nord Buds 2", price: 2799, oldPrice: 4499, rating: 4.5, img: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=400&fit=crop&crop=center", images: ["https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=400&fit=crop&crop=center"], category: "audio", stock: 3, description: "OnePlus Nord Buds 2 with Dolby Atmos.", features: ["12.4mm Drivers", "Dolby Atmos", "50 Hours"] },
  { id: 6, name: "Realme 65W GaN Charger", price: 999, oldPrice: 1699, rating: 4.2, img: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=400&fit=crop&crop=center", images: ["https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=400&fit=crop&crop=center"], category: "accessory", stock: 6, description: "65W GaN fast charger with dual ports.", features: ["65W Fast Charging", "GaN Tech", "Dual USB-C"] },
  { id: 7, name: "Mi Smart Band 7", price: 3999, oldPrice: 5999, rating: 4.8, img: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400&h=400&fit=crop&crop=center", images: ["https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400&h=400&fit=crop&crop=center"], category: "watch", stock: 1, description: "Mi Band 7 with AMOLED & 14-day battery.", features: ["AMOLED Display", "14-Day Battery", "Blood Oxygen"] },
  { id: 8, name: "Sony WH-CH510 Headphones", price: 3990, oldPrice: 5990, rating: 4.4, img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop&crop=center", images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop&crop=center"], category: "audio", stock: 3, description: "Sony headphones with 35-hour battery.", features: ["35-Hour Battery", "Lightweight", "Bluetooth 5.0"] },
];

// ============ LOCAL STORAGE ============
let cart = JSON.parse(localStorage.getItem('tk_cart')) || [];
let wishlist = JSON.parse(localStorage.getItem('tk_wishlist')) || [];
let orders = JSON.parse(localStorage.getItem('tk_orders')) || [];
let addresses = JSON.parse(localStorage.getItem('tk_addresses')) || [];
let profile = JSON.parse(localStorage.getItem('tk_profile')) || { name: '', email: '', phone: '' };
let currentProductId = null;
let detailQty = 1;
let darkMode = localStorage.getItem('tk_dark') === 'true';
let cancelTargetOrderId = null;
let isLoading = true;

// ============ INIT DARK MODE ============
if (darkMode) {
  document.body.classList.add('dark-theme');
  document.getElementById('darkModeToggle')?.classList.add('active');
}

// ============ SAVE HELPERS ============
function saveCart() { localStorage.setItem('tk_cart', JSON.stringify(cart)); updateCartUI(); }
function saveWishlist() { localStorage.setItem('tk_wishlist', JSON.stringify(wishlist)); updateWishlistUI(); }
function saveOrders() { localStorage.setItem('tk_orders', JSON.stringify(orders)); updateOrderUI(); }
function saveAddresses() { localStorage.setItem('tk_addresses', JSON.stringify(addresses)); }
function saveProfileData() { localStorage.setItem('tk_profile', JSON.stringify(profile)); }

// ============ CART ============
function addToCart(id) {
  const p = products.find(x => x.id === id);
  if (!p) return;
  const existing = cart.find(item => item.id === id);
  if (existing) { existing.qty += 1; } else { cart.push({ ...p, qty: 1 }); }
  saveCart();
  showToast(p.name + ' added to cart');
}

function removeFromCart(id) { cart = cart.filter(item => item.id !== id); saveCart(); renderCartItems(); }

function changeQty(id, delta) {
  const item = cart.find(x => x.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) { removeFromCart(id); return; }
  saveCart();
  renderCartItems();
}

function updateCartUI() {
  const count = cart.reduce((acc, i) => acc + i.qty, 0);
  document.getElementById('cartCount').textContent = count;
  const floatBtn = document.getElementById('floatCartCount');
  if (floatBtn) floatBtn.textContent = count;
}

function renderCartItems() {
  const container = document.getElementById('cartItemsList');
  if (cart.length === 0) {
    container.innerHTML = `<div class="empty-cart"><i class="fas fa-shopping-bag"></i><p>Your cart is empty</p></div>`;
    document.getElementById('cartSummary').style.display = 'none';
    return;
  }
  document.getElementById('cartSummary').style.display = 'block';
  container.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div class="cart-item-img"><img src="${item.img}" alt="${item.name}" /></div>
      <div class="cart-item-info">
        <div class="title">${item.name}</div>
        <div class="price">₹${item.price}</div>
        <div class="qty-control">
          <button class="qty-btn" onclick="changeQty(${item.id}, -1)">−</button>
          <span>${item.qty}</span>
          <button class="qty-btn" onclick="changeQty(${item.id}, 1)">+</button>
          <span class="remove-item" onclick="removeFromCart(${item.id})"><i class="fas fa-trash-alt"></i></span>
        </div>
      </div>
    </div>
  `).join('');
  updateCartSummary();
}

function updateCartSummary() {
  const subtotal = cart.reduce((acc, i) => acc + i.price * i.qty, 0);
  const shipping = subtotal > 0 ? 40 : 0;
  document.getElementById('subtotal').textContent = '₹' + subtotal;
  document.getElementById('shipping').textContent = '₹' + shipping;
  document.getElementById('totalAmount').textContent = '₹' + (subtotal + shipping);
}

// ============ WISHLIST ============
function toggleWishlist(id) {
  const index = wishlist.indexOf(id);
  if (index > -1) { wishlist.splice(index, 1); showToast('Removed from wishlist'); }
  else { wishlist.push(id); showToast('Added to wishlist'); }
  saveWishlist();
  renderProducts();
}

function isInWishlist(id) { return wishlist.includes(id); }
function updateWishlistUI() { document.getElementById('wishlistCount').textContent = wishlist.length; }

// ============ CHECKOUT ============
function goCheckout() {
  if (cart.length === 0) { showToast('Cart is empty'); return; }
  document.getElementById('checkoutName').value = profile.name || '';
  document.getElementById('checkoutPhone').value = profile.phone || '';
  if (addresses.length > 0) document.getElementById('checkoutAddress').value = addresses[0];
  document.getElementById('checkoutCity').value = 'Mumbai';
  document.getElementById('checkoutPincode').value = '400050';
  updateCheckoutSummary();
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-checkout').classList.add('active');
  document.getElementById('stickyBuyNow').style.display = 'none';
}

function updateCheckoutSummary() {
  const subtotal = cart.reduce((acc, i) => acc + i.price * i.qty, 0);
  const shipping = 40;
  document.getElementById('checkoutSubtotal').textContent = '₹' + subtotal;
  document.getElementById('checkoutShipping').textContent = '₹' + shipping;
  document.getElementById('checkoutTotal').textContent = '₹' + (subtotal + shipping);
  const preview = document.getElementById('checkoutItemsPreview');
  preview.innerHTML = cart.map(item => `<div class="item-row"><span>${item.name} × ${item.qty}</span><span>₹${item.price * item.qty}</span></div>`).join('');
}

function confirmOrder() {
  const name = document.getElementById('checkoutName').value.trim();
  const phone = document.getElementById('checkoutPhone').value.trim();
  const address = document.getElementById('checkoutAddress').value.trim();
  const city = document.getElementById('checkoutCity').value.trim();
  const pincode = document.getElementById('checkoutPincode').value.trim();
  if (!name || !phone || !address || !city || !pincode) { showToast('Please fill all delivery details'); return; }
  const paymentMethod = document.querySelector('input[name="payment"]:checked');
  if (!paymentMethod) { showToast('Please select a payment method'); return; }
  const fullAddress = `${address}, ${city}, ${pincode}`;
  if (!addresses.includes(fullAddress)) { addresses.push(fullAddress); saveAddresses(); }

  const now = new Date();
  const deliveryDate = new Date(now);
  deliveryDate.setDate(deliveryDate.getDate() + 5);

  const order = {
    id: 'ORD-' + Date.now().toString().slice(-6),
    items: cart.map(item => ({ name: item.name, qty: item.qty, price: item.price })),
    total: cart.reduce((acc, i) => acc + i.price * i.qty, 0) + 40,
    date: now.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
    shippingAddress: { name, phone, address: fullAddress, city, pincode },
    paymentMethod: paymentMethod.value,
    status: 'Placed',
    tracking: {
      steps: [
        { label: 'Order Placed', desc: 'Your order has been confirmed', time: now.toLocaleString('en-IN', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }), completed: true },
        { label: 'Processing', desc: 'Seller is preparing your order', time: new Date(now.getTime() + 2*60*60*1000).toLocaleString('en-IN', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }), completed: false },
        { label: 'Shipped', desc: 'Order has been dispatched', time: new Date(now.getTime() + 6*60*60*1000).toLocaleString('en-IN', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }), completed: false },
        { label: 'Out for Delivery', desc: 'Order is out for delivery', time: new Date(now.getTime() + 24*60*60*1000).toLocaleString('en-IN', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }), completed: false },
        { label: 'Delivered', desc: 'Order delivered successfully', time: deliveryDate.toLocaleString('en-IN', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }), completed: false }
      ],
      currentStep: 0,
      estimatedDelivery: deliveryDate.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
    }
  };
  orders.push(order);
  saveOrders();
  cart = [];
  saveCart();
  renderCartItems();
  showToast('🎉 Order Placed Successfully!');
  goDashboard();
}

// ============ ORDERS ============
function updateOrderUI() { document.getElementById('orderCount').textContent = orders.length; }

function getStatusClass(status) {
  const map = { 'Placed':'status-placed', 'Processing':'status-processing', 'Shipped':'status-shipped', 'Delivered':'status-delivered', 'Cancelled':'status-cancelled' };
  return map[status] || 'status-placed';
}

function renderOrders() {
  const container = document.getElementById('ordersList');
  if (orders.length === 0) {
    container.innerHTML = `<div class="empty-state"><i class="fas fa-box-open"></i><p>No orders placed yet</p></div>`;
    return;
  }
  container.innerHTML = orders.map((order) => {
    const isCancelled = order.status === 'Cancelled';
    const isDelivered = order.status === 'Delivered';
    const showActions = !isCancelled && !isDelivered;
    return `
      <div class="item-card">
        <div class="order-header">
          <span class="order-id">${order.id}</span>
          <span class="status-badge ${getStatusClass(order.status)}">${order.status}</span>
        </div>
        <div class="order-items">${order.items.map(i => `${i.name} ×${i.qty}`).join(', ')}</div>
        <div class="order-total">₹${order.total}</div>
        <div class="order-meta">
          <span class="date">${order.date}</span>
          <span style="font-size:12px; color:var(--text-light);">${order.paymentMethod || 'COD'}</span>
        </div>
        ${showActions ? `
          <div class="order-actions">
            <button class="btn-track" onclick="openTrackModal('${order.id}')"><i class="fas fa-map-pin"></i> Track</button>
            <button class="btn-cancel" onclick="openCancelModal('${order.id}')"><i class="fas fa-times"></i> Cancel</button>
          </div>
        ` : `
          <div class="order-actions">
            ${isDelivered ? `<button class="btn-track" onclick="openTrackModal('${order.id}')"><i class="fas fa-map-pin"></i> Track</button>` : ''}
            ${isCancelled ? `<span style="font-size:12px; color:var(--text-light);"><i class="fas fa-ban"></i> Order Cancelled</span>` : ''}
          </div>
        `}
      </div>
    `;
  }).join('');
}

// ============ TRACK ORDER MODAL ============
function openTrackModal(orderId) {
  const order = orders.find(o => o.id === orderId);
  if (!order) { showToast('Order not found'); return; }

  const tracking = order.tracking || {
    steps: [
      { label: 'Order Placed', desc: 'Your order has been confirmed', time: order.date + ' 10:30 AM', completed: true },
      { label: 'Processing', desc: 'Seller is preparing your order', time: order.date + ' 2:30 PM', completed: false },
      { label: 'Shipped', desc: 'Order has been dispatched', time: order.date + ' 6:30 PM', completed: false },
      { label: 'Out for Delivery', desc: 'Order is out for delivery', time: order.date + ' (Next day) 9:00 AM', completed: false },
      { label: 'Delivered', desc: 'Order delivered successfully', time: order.date + ' (Next day) 11:00 AM', completed: false }
    ],
    currentStep: 0,
    estimatedDelivery: order.date + ' (Next day)'
  };

  const statusBadge = document.getElementById('trackStatusBadge');
  statusBadge.textContent = order.status;
  statusBadge.className = 'tracking-status ' + order.status.toLowerCase();

  const timeline = document.getElementById('trackTimeline');
  timeline.innerHTML = tracking.steps.map((step, idx) => {
    const isCompleted = step.completed || idx <= tracking.currentStep;
    const isActive = idx === tracking.currentStep;
    let statusClass = 'pending';
    if (isCompleted) statusClass = 'completed';
    if (isActive) statusClass = 'active';
    return `
      <div class="track-step ${statusClass}">
        <div class="dot"></div>
        <div class="step-content">
          <div class="step-title">${step.label}</div>
          <div class="step-desc">${step.desc}</div>
          <div class="step-time">${step.time}</div>
        </div>
      </div>
    `;
  }).join('');

  document.getElementById('trackEstDelivery').textContent = tracking.estimatedDelivery || '5-7 business days';
  document.getElementById('trackModal').classList.add('show');
}

// ============ CANCEL ORDER MODAL (FIXED SMOOTH FLOW) ============
function openCancelModal(orderId) {
  cancelTargetOrderId = orderId;
  // Reset selections
  document.querySelectorAll('.cancel-reason').forEach(el => el.classList.remove('selected'));
  document.querySelectorAll('.cancel-reason input[type="radio"]').forEach(el => el.checked = false);
  document.getElementById('confirmCancelBtn').disabled = true;
  document.getElementById('cancelModal').classList.add('show');
}

function selectCancelReason(el) {
  // Deselect others
  document.querySelectorAll('.cancel-reason').forEach(e => e.classList.remove('selected'));
  el.classList.add('selected');
  el.querySelector('input[type="radio"]').checked = true;
  // Enable confirm button
  document.getElementById('confirmCancelBtn').disabled = false;
}

function confirmCancelOrder() {
  const selected = document.querySelector('.cancel-reason.selected');
  if (!selected) {
    showToast('Please select a reason');
    return;
  }
  const reason = selected.querySelector('input[type="radio"]').value;
  const orderIndex = orders.findIndex(o => o.id === cancelTargetOrderId);
  if (orderIndex === -1) {
    showToast('Order not found');
    return;
  }
  orders[orderIndex].status = 'Cancelled';
  orders[orderIndex].cancellationReason = reason;
  orders[orderIndex].cancelledAt = new Date().toLocaleString('en-IN', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' });
  saveOrders();
  closeModal('cancelModal');
  renderOrders();
  showToast('✅ Order cancelled successfully');
}

// ============ MODAL CONTROLS ============
function closeModal(id) {
  document.getElementById(id).classList.remove('show');
}
// Close modal on overlay click
document.querySelectorAll('.modal-overlay').forEach(modal => {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('show');
  });
});

// ============ ADDRESS ============
function addNewAddress() {
  const addr = prompt('Enter full address:');
  if (addr && addr.trim()) { addresses.push(addr.trim()); saveAddresses(); renderAddresses(); showToast('Address saved'); }
}
function deleteAddress(index) { addresses.splice(index, 1); saveAddresses(); renderAddresses(); }
function renderAddresses() {
  const container = document.getElementById('addressList');
  let html = `<button class="add-address-btn" onclick="addNewAddress()"><i class="fas fa-plus"></i> Add New Address</button>`;
  if (addresses.length === 0) {
    html += `<div class="empty-state"><i class="fas fa-map-marker-alt"></i><p>No saved addresses</p></div>`;
  } else {
    html += addresses.map((a, i) => `
      <div class="item-card">
        <i class="fas fa-home" style="font-size:20px;color:var(--primary);width:40px;text-align:center;"></i>
        <div class="info">
          <div class="title">Address ${i+1}</div>
          <div class="sub">${a}</div>
        </div>
        <button class="action-btn" onclick="deleteAddress(${i}); renderAddresses();">Delete</button>
      </div>
    `).join('');
  }
  container.innerHTML = html;
}

// ============ PROFILE ============
function saveProfile() {
  const name = document.getElementById('profileName').value.trim();
  const email = document.getElementById('profileEmail').value.trim();
  const phone = document.getElementById('profilePhone').value.trim();
  if (!name || !email || !phone) { showToast('Please fill all fields'); return; }
  profile = { name, email, phone };
  saveProfileData();
  showToast('Profile updated');
}
function loadProfile() {
  document.getElementById('profileName').value = profile.name || '';
  document.getElementById('profileEmail').value = profile.email || '';
  document.getElementById('profilePhone').value = profile.phone || '';
}

// ============ DARK MODE ============
function toggleDarkMode() {
  darkMode = !darkMode;
  document.body.classList.toggle('dark-theme', darkMode);
  document.getElementById('darkModeToggle').classList.toggle('active', darkMode);
  localStorage.setItem('tk_dark', darkMode);
}

// ============ PRODUCT DETAIL ============
function openProductDetail(id) {
  const product = products.find(p => p.id === id);
  if (!product) return;
  currentProductId = id;
  detailQty = 1;
  document.getElementById('detailQty').textContent = detailQty;
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-detail').classList.add('active');
  // Show sticky buy now
  const sticky = document.getElementById('stickyBuyNow');
  if (sticky) {
    sticky.style.display = 'flex';
    document.getElementById('stickyPrice').textContent = '₹' + product.price;
  }

  document.getElementById('detailImage').src = product.images[0] || product.img;
  document.getElementById('detailTitle').textContent = product.name;
  document.getElementById('detailRating').textContent = product.rating;
  document.getElementById('detailPrice').textContent = '₹' + product.price;
  document.getElementById('detailOldPrice').textContent = '₹' + product.oldPrice;
  const discount = Math.round((1 - product.price/product.oldPrice) * 100);
  document.getElementById('detailDiscount').textContent = discount + '% off';

  const stockEl = document.getElementById('detailStock');
  if (product.stock <= 0) { stockEl.innerHTML = '<i class="fas fa-times-circle"></i> Out of Stock'; stockEl.className = 'detail-stock out'; }
  else if (product.stock <= 3) { stockEl.innerHTML = `<i class="fas fa-exclamation-circle"></i> Only ${product.stock} left`; stockEl.className = 'detail-stock'; }
  else { stockEl.innerHTML = '<i class="fas fa-check-circle"></i> In Stock'; stockEl.className = 'detail-stock'; }

  document.getElementById('detailDescription').textContent = product.description;
  document.getElementById('detailFeatures').innerHTML = product.features.map(f => `<li>${f}</li>`).join('');

  const thumbContainer = document.getElementById('detailThumbnails');
  thumbContainer.innerHTML = product.images.map((img, idx) =>
    `<img src="${img}" class="${idx === 0 ? 'active' : ''}" onclick="changeDetailImage('${img}', this)" />`
  ).join('');

  renderRelatedProducts(product.id, product.category);
}

function changeDetailImage(src, el) {
  document.getElementById('detailImage').src = src;
  document.querySelectorAll('.detail-thumbnails img').forEach(img => img.classList.remove('active'));
  if (el) el.classList.add('active');
}

function changeDetailQty(delta) {
  detailQty += delta;
  if (detailQty < 1) detailQty = 1;
  document.getElementById('detailQty').textContent = detailQty;
}

function addToCartFromDetail() {
  if (!currentProductId) return;
  const product = products.find(p => p.id === currentProductId);
  if (product.stock < detailQty) { showToast('Not enough stock'); return; }
  const existing = cart.find(item => item.id === currentProductId);
  if (existing) existing.qty += detailQty;
  else cart.push({ ...product, qty: detailQty });
  saveCart();
  showToast(product.name + ' added to cart');
}

function buyNowFromDetail() {
  addToCartFromDetail();
  goCart();
}

function renderRelatedProducts(productId, category) {
  const related = products.filter(p => p.category === category && p.id !== productId).slice(0, 4);
  const container = document.getElementById('relatedGrid');
  if (related.length === 0) {
    container.innerHTML = '<p style="color:var(--text-light);">No related products</p>';
    return;
  }
  container.innerHTML = related.map(p => `
    <div class="related-card" onclick="openProductDetail(${p.id})">
      <img src="${p.img}" />
      <div class="info">
        <div class="name">${p.name}</div>
        <div class="price">₹${p.price}</div>
      </div>
    </div>
  `).join('');
}

// ============ RENDER PRODUCTS WITH SKELETON LOADER ============
function renderProducts(list = products) {
  const grid = document.getElementById('productGrid');
  if (isLoading) {
    grid.innerHTML = Array(4).fill(`
      <div class="skeleton-card">
        <div class="skeleton-img"></div>
        <div class="skeleton-text"></div>
        <div class="skeleton-text short"></div>
        <div class="skeleton-text medium"></div>
      </div>
    `).join('');
    setTimeout(() => {
      isLoading = false;
      renderProducts(list);
    }, 1200);
    return;
  }

  let filtered = list;
  if (currentCategory !== 'all') filtered = list.filter(p => p.category === currentCategory);
  const searchVal = document.getElementById('searchInput').value.toLowerCase().trim();
  if (searchVal) filtered = filtered.filter(p => p.name.toLowerCase().includes(searchVal));

  if (filtered.length === 0) {
    grid.innerHTML = `<div style="grid-column:1/-1; text-align:center; padding:48px; color:var(--text-light);">No products found</div>`;
    return;
  }

  grid.innerHTML = filtered.map(p => {
    const inWish = isInWishlist(p.id);
    return `
      <div class="product-card" onclick="openProductDetail(${p.id})">
        <div class="product-img">
          <img src="${p.img}" loading="lazy" />
          <button class="wishlist-btn ${inWish ? 'active' : ''}" onclick="event.stopPropagation(); toggleWishlist(${p.id})">
            <i class="${inWish ? 'fas' : 'far'} fa-heart"></i>
          </button>
          ${p.stock <= 3 ? `<span class="stock-badge">Only ${p.stock} left</span>` : ''}
        </div>
        <div class="product-info">
          <div class="product-name">${p.name}</div>
          <div class="product-price">
            <span class="price-current">₹${p.price}</span>
            <span class="price-old">₹${p.oldPrice}</span>
            <span class="discount-badge">${Math.round((1 - p.price/p.oldPrice)*100)}% off</span>
          </div>
          <div class="product-rating"><i class="fas fa-star"></i> ${p.rating} <span>(1.2k)</span></div>
          <button class="add-btn" onclick="event.stopPropagation(); addToCart(${p.id})"><i class="fas fa-plus"></i> Add to Cart</button>
        </div>
      </div>
    `;
  }).join('');
}

// ============ FILTER ============
let currentCategory = 'all';

function filterProducts() { renderProducts(products); }
function filterByCategory(category) {
  currentCategory = category;
  goHome();
  renderProducts(products);
  document.getElementById('searchInput').value = '';
  showToast('Showing: ' + category);
}

// ============ NAVIGATION ============
function goHome() {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-home').classList.add('active');
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  document.querySelector('.nav-item[data-page="home"]').classList.add('active');
  currentCategory = 'all';
  document.getElementById('stickyBuyNow').style.display = 'none';
  isLoading = true;
  renderProducts();
}

function goCategories() {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-categories').classList.add('active');
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  document.querySelector('.nav-item[data-page="categories"]').classList.add('active');
  document.getElementById('stickyBuyNow').style.display = 'none';
}

function goCart() {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-cart').classList.add('active');
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  document.querySelector('.nav-item[data-page="cart"]').classList.add('active');
  renderCartItems();
  document.getElementById('stickyBuyNow').style.display = 'none';
}

function goDashboard() {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-dashboard').classList.add('active');
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  document.querySelector('.nav-item[data-page="dashboard"]').classList.add('active');
  updateOrderUI();
  updateWishlistUI();
  renderOrders();
  document.getElementById('stickyBuyNow').style.display = 'none';
}

function openSubPage(type) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const map = {
    'orders': 'page-orders',
    'wishlist': 'page-wishlist',
    'address': 'page-address',
    'profile': 'page-profile'
  };
  document.getElementById(map[type]).classList.add('active');
  if (type === 'orders') renderOrders();
  if (type === 'wishlist') renderWishlist();
  if (type === 'address') renderAddresses();
  if (type === 'profile') loadProfile();
  document.getElementById('stickyBuyNow').style.display = 'none';
}

function renderWishlist() {
  const container = document.getElementById('wishlistList');
  if (wishlist.length === 0) {
    container.innerHTML = `<div class="empty-state"><i class="fas fa-heart"></i><p>Your wishlist is empty</p></div>`;
    return;
  }
  const items = products.filter(p => wishlist.includes(p.id));
  container.innerHTML = items.map(p => `
    <div class="item-card">
      <img src="${p.img}" />
      <div class="info">
        <div class="title">${p.name}</div>
        <div class="sub">₹${p.price}</div>
      </div>
      <button class="action-btn" onclick="toggleWishlist(${p.id}); renderWishlist();">Remove</button>
    </div>
  `).join('');
}

// ============ TOAST ============
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(t._timeout);
  t._timeout = setTimeout(() => t.classList.remove('show'), 2500);
}

// ============ COUNTDOWN TIMER ============
function startCountdown() {
  const endTime = new Date().getTime() + 2 * 60 * 60 * 1000;
  setInterval(() => {
    const now = new Date().getTime();
    const distance = endTime - now;
    if (distance < 0) {
      document.getElementById('countdownTimer').innerHTML = '🔥 Ended';
      return;
    }
    const hours = Math.floor((distance % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
    const minutes = Math.floor((distance % (60 * 60 * 1000)) / (60 * 1000));
    const seconds = Math.floor((distance % (60 * 1000)) / 1000);
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
  }, 1000);
}

// ============ HERO SLIDER AUTO ============
function startHeroSlider() {
  const slides = document.querySelectorAll('.hero-slide');
  let index = 0;
  setInterval(() => {
    slides.forEach((s, i) => {
      s.style.display = i === index ? 'inline-flex' : 'none';
    });
    index = (index + 1) % slides.length;
  }, 3000);
}

// ============ INIT ============
function init() {
  // Sample data if empty
  if (orders.length === 0) {
    const now = new Date();
    const delDate = new Date(now);
    delDate.setDate(delDate.getDate() + 5);
    orders.push({
      id: 'ORD-1001',
      items: [{ name: 'Noise ColorFit Pro 4', qty: 1, price: 4499 }],
      total: 4539,
      date: now.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
      paymentMethod: 'UPI',
      status: 'Delivered',
      tracking: {
        steps: [
          { label: 'Order Placed', desc: 'Your order has been confirmed', time: now.toLocaleString('en-IN', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }), completed: true },
          { label: 'Processing', desc: 'Seller is preparing your order', time: new Date(now.getTime() + 2*60*60*1000).toLocaleString('en-IN', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }), completed: true },
          { label: 'Shipped', desc: 'Order has been dispatched', time: new Date(now.getTime() + 6*60*60*1000).toLocaleString('en-IN', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }), completed: true },
          { label: 'Out for Delivery', desc: 'Order is out for delivery', time: new Date(now.getTime() + 24*60*60*1000).toLocaleString('en-IN', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }), completed: true },
          { label: 'Delivered', desc: 'Order delivered successfully', time: delDate.toLocaleString('en-IN', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }), completed: true }
        ],
        currentStep: 4,
        estimatedDelivery: delDate.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
      }
    });
    orders.push({
      id: 'ORD-1002',
      items: [{ name: 'Ambrane Powerbank', qty: 2, price: 1499 }],
      total: 3038,
      date: new Date(now.getTime() - 2*24*60*60*1000).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
      paymentMethod: 'COD',
      status: 'Shipped',
      tracking: {
        steps: [
          { label: 'Order Placed', desc: 'Your order has been confirmed', time: new Date(now.getTime() - 2*24*60*60*1000).toLocaleString('en-IN', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }), completed: true },
          { label: 'Processing', desc: 'Seller is preparing your order', time: new Date(now.getTime() - 2*24*60*60*1000 + 2*60*60*1000).toLocaleString('en-IN', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }), completed: true },
          { label: 'Shipped', desc: 'Order has been dispatched', time: new Date(now.getTime() - 1*24*60*60*1000).toLocaleString('en-IN', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }), completed: true },
          { label: 'Out for Delivery', desc: 'Order is out for delivery', time: new Date(now.getTime() + 2*60*60*1000).toLocaleString('en-IN', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }), completed: false },
          { label: 'Delivered', desc: 'Order delivered successfully', time: new Date(now.getTime() + 24*60*60*1000).toLocaleString('en-IN', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }), completed: false }
        ],
        currentStep: 2,
        estimatedDelivery: new Date(now.getTime() + 24*60*60*1000).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
      }
    });
    saveOrders();
  }

  if (addresses.length === 0) {
    addresses.push('Bandra West, Mumbai - 400050');
    saveAddresses();
  }
  if (profile.name === '') {
    profile = { name: 'Rahul Sharma', email: 'rahul@email.com', phone: '+91 98765 43210' };
    saveProfileData();
  }

  // Start features
  startCountdown();
  startHeroSlider();
  renderProducts();
  updateCartUI();
  updateWishlistUI();
  updateOrderUI();
  loadProfile();
}

// Run init when DOM is ready
document.addEventListener('DOMContentLoaded', init);


