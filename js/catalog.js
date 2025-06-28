// catalog.js ✅

console.log("✅ catalog.js loaded");

const productList = document.getElementById("product-list");

function loadMotors() {
  const motors = JSON.parse(localStorage.getItem("motors")) || [];
  productList.innerHTML = "";

  if (motors.length === 0) {
    productList.innerHTML = "<p>No products found. Please add products via Admin page.</p>";
    return;
  }

  motors.forEach((motor, index) => {
    const productCard = document.createElement("div");
    productCard.classList.add("product-card");

   productCard.innerHTML = `
  <div onclick='viewProduct(${JSON.stringify(motor)})' style="cursor: pointer;">
    <img src="${motor.image}" alt="${motor.name}">
    <h3>${motor.name}</h3>
  </div>
  <p>Price: ₹${motor.price}</p>
  <button onclick="addToCart(${index})">Add to Cart</button>
`;


    productList.appendChild(productCard);
  });
}

function addToCart(index) {
  const motors = JSON.parse(localStorage.getItem("motors")) || [];
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const selected = motors[index];
  const existingIndex = cart.findIndex(item => item.name === selected.name);

  if (existingIndex !== -1) {
    cart[existingIndex].quantity += 1; // Increment quantity
  } else {
    selected.quantity = 1; // Add quantity field
    cart.push(selected);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert("✅ Added to cart!");
}

window.onload = loadMotors;

function viewProduct(product) {
  localStorage.setItem("selectedProduct", JSON.stringify(product));
  window.location.href = "product.html";
}

