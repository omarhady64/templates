let cart = JSON.parse(localStorage.getItem('cart') || '[]');
let nearestBranch = "Mall Mazar, Sheikh Zayed";

function addToCart(name, price) {
    const existing = cart.find(item => item.name === name);
    if (existing) existing.qty +=1;
    else cart.push({name, price, qty:1});
    saveCart();
    updateCartDisplay();
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartDisplay() {
    const cartDiv = document.getElementById('cartItems');
    const totalDiv = document.getElementById('totalPrice');
    if(!cartDiv) return;
    cartDiv.innerHTML = '';
    let total = 0;
    cart.forEach((item,index)=>{
        total += item.price*item.qty;
        cartDiv.innerHTML += `
        <div class="menu-item">
            <h3>${item.name}</h3>
            <p>Unit Price: ${item.price} EGP</p>
            <p>Quantity: 
                <button onclick="changeQty(${index},-1)">-</button>
                ${item.qty}
                <button onclick="changeQty(${index},1)">+</button>
            </p>
            <p>Total: ${item.price*item.qty} EGP</p>
        </div>`;
    });
    totalDiv.innerText = `Current Total: ${total} EGP`;
}

// تعديل الكمية
function changeQty(index, delta) {
    cart[index].qty += delta;
    if(cart[index].qty <=0) cart.splice(index,1);
    saveCart();
    updateCartDisplay();
}

// تحديد أقرب فرع عند اختيار العميل
function updateNearestBranch() {
    const select = document.getElementById('branchSelect');
    nearestBranch = select.value;
    document.getElementById('nearestBranch').innerText = "Nearest Branch: " + nearestBranch;
}

function openMap(location) {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`;
    window.open(url,'_blank');
}

window.onload = updateCartDisplay;
