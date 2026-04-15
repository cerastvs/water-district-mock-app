// Authentication Logic
function login(username, password) {
  const accountsStr = localStorage.getItem("accounts");
  if (!accountsStr) {
    alert("System error: Accounts data not found.");
    return;
  }

  const accounts = JSON.parse(accountsStr);
  const user = accounts.find(acc =>
    acc.username === username && acc.password === password
  );

  if (user) {
    localStorage.setItem("role", user.role);
    const { password, ...userWithoutPassword } = user;
    localStorage.setItem("currentUser", JSON.stringify(userWithoutPassword));

    if (user.role === "admin") {
      window.location.href = "admin/dashboard.html";
    } else {
      window.location.href = "user/dashboard.html";
    }
  } else {
    alert("Invalid login");
  }
}

function checkAuth(requiredRole) {
  const role = localStorage.getItem("role");
  if (!role) {
    window.location.href = "../login.html";
  } else if (requiredRole && role !== requiredRole) {
    window.location.href = "../index.html"; // Redirect to home if unauthorized
  }
}

function logout() {
  localStorage.removeItem("role");
  localStorage.removeItem("currentUser");
  window.location.href = "../login.html";
}
