document.addEventListener("DOMContentLoaded", () => {
  // Check if user is logged in
  let user = JSON.parse(localStorage.getItem("currentUser"));
  if (!user || user.role !== "user") {
    window.location.href = "../login.html";
    return;
  }

  // Sync user with latest data from accounts (db)
  const accounts = JSON.parse(localStorage.getItem("accounts") || "[]");
  const latestUserData = accounts.find(acc => acc.username === user.username);
  if (latestUserData) {
    const { password, ...userWithoutPassword } = latestUserData;
    user = userWithoutPassword;
    localStorage.setItem("currentUser", JSON.stringify(user));
  }

  // Update display name
  const userNameElement = document.getElementById("user-name");
  if (userNameElement) {
    userNameElement.textContent = user.username || user.name;
  }

  // Sidebar toggle for mobile
  const menuToggle = document.getElementById("menu-toggle");
  const sidebar = document.querySelector(".sidebar");
  if (menuToggle && sidebar) {
    menuToggle.addEventListener("click", () => {
      sidebar.classList.toggle("active");
    });
  }

  // Initialize content based on page
  initPageContent(user);

  // Handle logout
  const logoutLink = document.querySelector(".logout-link");
  if (logoutLink) {
    logoutLink.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.removeItem("currentUser");
      localStorage.removeItem("role");
      window.location.href = "../login.html";
    });
  }
});

function initPageContent(user) {
  const path = window.location.pathname;

  if (path.includes("dashboard.html")) {
    renderDashboard(user);
  } else if (path.includes("weekly-bill.html")) {
    renderWeeklyBill(user);
  } else if (path.includes("history.html")) {
    renderHistory(user);
  } else if (path.includes("usage.html")) {
    renderUsageComparison(user);
  } else if (path.includes("announcements.html")) {
    renderAnnouncements(user);
  } else if (path.includes("goals.html")) {
    renderGoals(user);
  }
}
function renderDashboard(user) {
  // 1. Calculate and display total bill
  const totalAmount = window.BillingSystem.getTotalBill(user);
  const totalElement = document.getElementById('dashboard-total');
  if (totalElement) {
    totalElement.textContent = `₱ ${totalAmount.toLocaleString()}`;
  }

  // 2. Display the correct Month in the label
  const monthLabel = document.getElementById('bill-month-label');
  if (monthLabel && user.billing) {
    monthLabel.textContent = `Total Bill (${user.billing.month})`;
  }

  // 3. Display Meter Number
  const meterElement = document.getElementById('dashboard-meter');
  if (meterElement) {
    meterElement.textContent = user.meterNumber;
  }

  // 4. Update Welcome Name
  const welcomeName = document.getElementById('display-username');
  if (welcomeName) {
    welcomeName.textContent = user.name || user.username;
  }

  // 5. Render History Preview
  const previewBody = document.getElementById('history-preview-body');
  if (previewBody && user.history) {
    const preview = user.history.slice(0, 3); // last 3 months
    if (preview.length === 0) {
      previewBody.innerHTML = '<tr><td colspan="2">No history found.</td></tr>';
    } else {
      previewBody.innerHTML = preview.map(item => `
                <tr>
                    <td>${item.month}</td>
                    <td>₱ ${item.total.toLocaleString()}</td>
                </tr>
            `).join('');
    }
  }
}

function renderWeeklyBill(user) {
  // Current Bill Amount
  const currentBillContainer = document.getElementById("current-bill-boxes");
  if (currentBillContainer) {
    const total = window.BillingSystem.getTotalBill(user);
    const paddedAmount = Math.floor(total).toString().padStart(6, '0');
    let html = `<div class="boxed-char symbol">₱</div>`;
    for (let char of paddedAmount) {
      html += `<div class="boxed-char">${char}</div>`;
    }
    currentBillContainer.innerHTML = html;
  }

  // Meter Number
  const meterContainer = document.getElementById("meter-number-boxes");
  if (meterContainer) {
    // Standardize to 7 chars for the boxes look
    let meterRaw = user.meterNumber.replace(/[^a-zA-Z0-9]/g, '');
    if (meterRaw.length < 7) {
      meterRaw = "800" + meterRaw.padStart(4, '0');
    }
    let html = '';
    for (let char of meterRaw) {
      html += `<div class="boxed-char">${char}</div>`;
    }
    meterContainer.innerHTML = html;
  }

  // Consumption breakdown month header
  const headerMonth = document.getElementById("consumption-header-month");
  if (headerMonth) {
    headerMonth.textContent = `CONSUMPTION BREAKDOWN (${user.billing.month.toUpperCase()} 2026)`;
  }

  // Weeks breakdown
  const weeksContainer = document.getElementById("weeks-container");
  if (weeksContainer) {
    const dates = ["Apr 08", "Apr 15", "Apr 23", "Apr 30"];
    let html = '';
    user.billing.weeks.forEach((amount, index) => {
      const isFinal = index === user.billing.weeks.length - 1;
      html += `
        <div class="week-card ${isFinal ? 'final' : ''}">
            <div class="week-card-title">WEEK ${index + 1}${isFinal ? ' (Final)' : ''}</div>
            <div class="week-card-date">${dates[index] || 'TBD'}</div>
            <input type="text" class="week-card-input" value="${amount.toFixed(2)}" readonly>
        </div>
      `;
    });
    weeksContainer.innerHTML = html;
  }

  // Deadline banner
  const deadlineBanner = document.getElementById("deadline-banner");
  if (deadlineBanner) {
    const deadlineStr = user.billing.deadline ? user.billing.deadline.replace('April', 'Apr') : "TBA";
    deadlineBanner.innerHTML = `
        <div class="deadline-info">
            <h2>Deadline of Final Bill</h2>
            <p>Please settle your payment on or before the due date to avoid service interruption.</p>
        </div>
        <div class="deadline-action">
            <span>PAY BEFORE:</span>
            <div class="deadline-pill">${deadlineStr}</div>
        </div>
    `;
  }
}

function renderHistory(user) {
  const historyTable = document.getElementById("history-table");
  if (historyTable && user.history) {
    if (user.history.length === 0) {
      historyTable.innerHTML =
        '<tr><td colspan="4">No transactions found.</td></tr>';
      return;
    }

    let html = "";
    user.history.forEach((item) => {
      html += `
                <tr>
                    <td>${item.month}</td>
                    <td>Water Bill Payment</td>
                    <td>₱ ${item.total.toFixed(2)}</td>
                    <td><span class="status-paid">Paid</span></td>
                </tr>
            `;
    });
    historyTable.innerHTML = html;
  }
}

function renderUsageComparison(user) {
  const container = document.getElementById("usage-chart");
  if (container) {
    const currentTotal = window.BillingSystem.getTotalBill(user);
    const previousTotal = user.history[0]?.total;
    const trend = window.BillingSystem.compareBills(user);

    let trendMsg = "";
    let trendClass = "";

    if (trend === "increase") {
      trendMsg = "Your usage has increased compared to last month.";
      trendClass = "trend-up";
    } else if (trend === "decrease") {
      trendMsg = "Great job! Your usage has decreased compared to last month.";
      trendClass = "trend-down";
    } else if (trend === "same") {
      trendMsg = "Your usage is the same as last month.";
      trendClass = "trend-same";
    } else {
      trendMsg = "Not enough data to compare.";
    }

    container.innerHTML = `
            <div class="comparison-card">
                <div class="stat">
                    <span>This Month (${user.billing.month}):</span>
                    <strong>₱ ${currentTotal.toFixed(2)}</strong>
                </div>
                ${previousTotal
        ? `
                <div class="stat">
                    <span>Last Month (${user.history[0].month}):</span>
                    <strong>₱ ${previousTotal.toFixed(2)}</strong>
                </div>
                `
        : ""
      }
                <div class="trend-message ${trendClass}">
                    ${trendMsg}
                </div>
            </div>
        `;
  }
}

function renderAnnouncements(user) {
  const container = document.getElementById("announcements-container");
  if (container) {
    const total = window.BillingSystem.getTotalBill(user);
    const pendingBillNotice = total > 0 ?
      `<div class="trend-message trend-up" style="margin-bottom: 2rem;">
        <i class="fas fa-exclamation-circle"></i> You have a pending bill of ₱ ${total.toLocaleString()} for the month of ${user.billing.month}. Please pay before the deadline!
      </div>` : '';

    const announcements = JSON.parse(localStorage.getItem("announcements")) || [];

    let announcementsHtml = announcements.map(a => `
      <div class="card" style="margin-bottom: 1rem;">
        <h4>${a.date}</h4>
        <p style="margin-top: 0.5rem; color: #555;">${a.message}</p>
      </div>
    `).join("");

    if (!announcementsHtml) announcementsHtml = "<p>No new announcements at this time.</p>";

    container.innerHTML = pendingBillNotice + announcementsHtml;
  }
}

function renderGoals(user) {
  const checklistItems = document.querySelectorAll('.goal-checkbox');

  // Restore state from local storage if exists
  const savedState = JSON.parse(localStorage.getItem("goalChecklist_" + user.username)) || {};

  checklistItems.forEach((item, index) => {
    if (savedState[index]) {
      item.checked = true;
      item.parentElement.style.textDecoration = 'line-through';
      item.parentElement.style.color = '#888';
    }

    item.addEventListener('change', (e) => {
      const isChecked = e.target.checked;
      if (isChecked) {
        e.target.parentElement.style.textDecoration = 'line-through';
        e.target.parentElement.style.color = '#888';
      } else {
        e.target.parentElement.style.textDecoration = 'none';
        e.target.parentElement.style.color = 'inherit';
      }

      // Save state
      savedState[index] = isChecked;
      localStorage.setItem("goalChecklist_" + user.username, JSON.stringify(savedState));
    });
  });
}
