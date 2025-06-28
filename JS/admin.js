console.log("✅ admin.js loaded");

const productForm = document.getElementById("productForm");
const adminList = document.getElementById("admin-product-list");

productForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const price = parseInt(document.getElementById("price").value);
  const image = document.getElementById("image").value;

  const newProduct = { name, price, image };

  const motors = JSON.parse(localStorage.getItem("motors")) || [];
  motors.push(newProduct);
  localStorage.setItem("motors", JSON.stringify(motors));

  alert("✅ Product added!");
  productForm.reset();
  loadAdminProducts(); // reload list
});

// 🗑️ Load products for admin view
function loadAdminProducts() {
  const motors = JSON.parse(localStorage.getItem("motors")) || [];
  adminList.innerHTML = "";

  if (motors.length === 0) {
    adminList.innerHTML = "<p>No products available.</p>";
    return;
  }

  motors.forEach((product, index) => {
    const div = document.createElement("div");
    div.classList.add("product-card");

    div.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h4>${product.name}</h4>
      <p>₹${product.price}</p>
      <button onclick="deleteProduct(${index})">❌ Delete</button>
    `;

    adminList.appendChild(div);
  });
}

function deleteProduct(index) {
  let motors = JSON.parse(localStorage.getItem("motors")) || [];
  const confirmDelete = confirm("Are you sure you want to delete this product?");
  if (!confirmDelete) return;

  motors.splice(index, 1);
  localStorage.setItem("motors", JSON.stringify(motors));
  alert("🗑️ Product deleted.");
  loadAdminProducts();
}

window.onload = loadAdminProducts;
