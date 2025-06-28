// Toggle between Login and Register form
function showLogin() {
  document.getElementById("loginForm").style.display = "block";
  document.getElementById("registerForm").style.display = "none";
  document.getElementById("authMessage").textContent = "";
}

function showRegister() {
  document.getElementById("loginForm").style.display = "none";
  document.getElementById("registerForm").style.display = "block";
  document.getElementById("authMessage").textContent = "";
}

// Handle Registration
document.getElementById("registerForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("registerEmail").value.trim();
  const password = document.getElementById("registerPassword").value;

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const exists = users.find(user => user.email === email);

  if (exists) {
    showMessage("User already exists.", "red");
    return;
  }

  users.push({ email, password });
  localStorage.setItem("users", JSON.stringify(users));
  showMessage("Registration successful! Please login.", "green");
  showLogin();
});

// Handle Login
document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value;

  if (email === "admin" && password === "krushi@1212") {
    localStorage.setItem("loggedInUser", "admin");
    showMessage("Admin login successful!", "green");

    setTimeout(() => {
      window.location.href = "admin.html";
    }, 1000);
    return;
  }

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
    localStorage.setItem("loggedInUser", email);
    showMessage("Login successful!", "green");

    setTimeout(() => {
      window.location.href = "index.html";
    }, 1000);
  } else {
    showMessage("Invalid email or password.", "red");
  }
});

// Helper to show messages
function showMessage(text, color) {
  const msg = document.getElementById("authMessage");
  msg.textContent = text;
  msg.style.color = color;
}


