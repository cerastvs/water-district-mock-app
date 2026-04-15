document.addEventListener("DOMContentLoaded", async () => {
  // Wait for data initialization if needed
  if (window.dataReady) await window.dataReady;

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
  const WATER_CHALLENGE_TASKS = [
    // Week 1
    { text: "Shorten your daily shower to 5 minutes or less to save gallons of water.", icon: "fa-stopwatch", save: 10 },
    { text: "Turn off the faucet while brushing your teeth or shaving.", icon: "fa-tooth", save: 10 },
    { text: "Only run the washing machine when you have a full load of clothes.", icon: "fa-tshirt", save: 10 },
    { text: "Use a bowl of water to wash fruits and vegetables instead of a running tap.", icon: "fa-apple-alt", save: 10 },
    { text: "Fix any leaking faucets or dripping showerheads immediately.", icon: "fa-wrench", save: 10 },
    { text: "Use a broom to clean your porch or driveway instead of a hose.", icon: "fa-broom", save: 10 },
    { text: "Thaw frozen foods in the refrigerator overnight instead of using running water.", icon: "fa-icicles", save: 10 },
    // Week 2
    { text: "Scrape leftover food into the bin instead of rinsing it off under the tap.", icon: "fa-trash", save: 10 },
    { text: "Water your garden only in the early morning or late evening.", icon: "fa-leaf", save: 10 },
    { text: "Put a bottle of water in the fridge so you don't have to run the tap for a cold drink.", icon: "fa-snowflake", save: 10 },
    { text: "Reuse leftover pasta water to water your plants once it has cooled down.", icon: "fa-seedling", save: 10 },
    { text: "Turn off the shower water while you are lathering your hair with shampoo.", icon: "fa-pump-soap", save: 10 },
    { text: "Collect the water used while waiting for the shower to get hot.", icon: "fa-bucket", save: 10 },
    { text: "Check your toilet for leaks by putting a few drops of food coloring in the tank.", icon: "fa-tint", save: 10 },
    // Week 3
    { text: "Use a bucket and sponge to wash your car instead of a running hose.", icon: "fa-car", save: 10 },
    { text: "Install a low-flow showerhead to reduce water usage automatically.", icon: "fa-shower", save: 10 },
    { text: "Do not use the toilet as a trash can for tissues or wipes.", icon: "fa-ban", save: 10 },
    { text: "Soak dirty pots and pans in the sink instead of scrubbing them under running water.", icon: "fa-sink", save: 10 },
    { text: "Cover your pool when not in use to stop water from evaporating.", icon: "fa-swimming-pool", save: 10 },
    { text: "Choose a quick shower over a full bathtub to save dozens of gallons.", icon: "fa-bath", save: 10 },
    { text: "Point your sprinklers toward the grass and away from the sidewalk.", icon: "fa-water", save: 10 },
    // Week 4
    { text: "Use mulch in your garden to keep the soil moist for longer.", icon: "fa-tree", save: 10 },
    { text: "Turn off the water while you are scrubbing your hands with soap.", icon: "fa-hands-wash", save: 10 },
    { text: "Wash your pets on the grass so you water the lawn at the same time.", icon: "fa-dog", save: 10 },
    { text: "Read your water meter weekly to track your progress and find hidden leaks.", icon: "fa-tachometer-alt", save: 10 },
    { text: "Set a timer on your phone to keep your showers on track.", icon: "fa-mobile-alt", save: 10 },
    { text: "Use a reusable water bottle to reduce the number of glasses you need to wash.", icon: "fa-glass-water", save: 10 },
    { text: "Check outdoor hoses and connections for any cracks or leaks.", icon: "fa-wrench", save: 10 },
    // Week 5
    { text: "Use the smallest amount of water possible when boiling food.", icon: "fa-fire-burner", save: 10 },
    { text: "Upgrade to a water-efficient toilet if your current one is very old.", icon: "fa-toilet", save: 10 },
    { text: "Wash dark clothes in cold water to save energy and water.", icon: "fa-tshirt", save: 10 },
    { text: "Keep a bucket in the shower to catch excess water for flushing the toilet.", icon: "fa-bucket", save: 10 },
    { text: "Use a lid on pots when boiling water to prevent loss through steam.", icon: "fa-temperature-high", save: 10 },
    { text: "Only water your lawn when the grass doesn't spring back after you step on it.", icon: "fa-shoe-prints", save: 10 },
    { text: "Tell a family member or roommate about your water-saving goal for the week.", icon: "fa-users", save: 10 }
  ];

  let currentWeek = 1;
  const stateKey = "waterChallenge_" + user.username;
  let challengeState = JSON.parse(localStorage.getItem(stateKey)) || Array(35).fill(false);

  const tabs = document.querySelectorAll('.challenge-tab');
  const checklistContainer = document.getElementById('challenge-checklist');
  const weekTitle = document.getElementById('challenge-week-title');
  const progressFill = document.getElementById('challenge-progress-fill');
  const progressText = document.getElementById('challenge-progress-text');
  const impactLabel = document.getElementById('impact-week-label');
  const impactGallons = document.getElementById('impact-gallons');

  const updateProgress = () => {
    const completedCount = challengeState.filter(Boolean).length;
    const totalCount = WATER_CHALLENGE_TASKS.length;
    const percentage = Math.round((completedCount / totalCount) * 100);

    if (progressFill) progressFill.style.width = percentage + "%";
    if (progressText) progressText.textContent = percentage + "% COMPLETE";

    // Update local storage
    localStorage.setItem(stateKey, JSON.stringify(challengeState));

    // Update impact for current week
    const weekStart = (currentWeek - 1) * 7;
    let weekSaved = 0;
    for (let i = weekStart; i < weekStart + 7; i++) {
      if (challengeState[i]) weekSaved += WATER_CHALLENGE_TASKS[i].save;
    }
    if (impactGallons) impactGallons.textContent = weekSaved + " GALLONS SAVED!";
  };

  const renderWeek = (week) => {
    currentWeek = week;

    // Update tabs
    tabs.forEach(t => t.classList.remove('active'));
    document.querySelector(`.challenge-tab[data-week="${week}"]`)?.classList.add('active');

    // Update labels
    if (weekTitle) weekTitle.textContent = `WEEK ${week}: 7 STEPS TO SAVINGS`;
    if (impactLabel) impactLabel.textContent = `WEEK ${week} IMPACT:`;

    // Render list
    if (checklistContainer) {
      let html = '';
      const startIndex = (week - 1) * 7;
      const dayNames = ["DAY-1", "DAY-2", "DAY-3", "DAY-4", "DAY-5", "DAY-6", "DAY-7"];

      for (let i = 0; i < 7; i++) {
        const itemIndex = startIndex + i;
        if (itemIndex >= WATER_CHALLENGE_TASKS.length) break;

        const task = WATER_CHALLENGE_TASKS[itemIndex];
        const isChecked = challengeState[itemIndex];
        const dayLabel = dayNames[i];

        html += `
          <div class="challenge-item ${isChecked ? 'completed' : ''}" data-index="${itemIndex}">
            <div class="challenge-day">${dayLabel}</div>
            <input type="checkbox" class="challenge-checkbox" ${isChecked ? 'checked' : ''}>
            <div class="challenge-desc">${task.text}</div>
            <div class="challenge-icon"><i class="fas ${task.icon}"></i></div>
            <div class="challenge-badge">
              <span>SAVE</span>
              <span>${task.save}</span>
              <span>GALS</span>
            </div>
          </div>
        `;
      }
      checklistContainer.innerHTML = html;

      // Add event listeners to new checkboxes
      const items = checklistContainer.querySelectorAll('.challenge-item');
      items.forEach(item => {
        const checkbox = item.querySelector('.challenge-checkbox');
        const index = parseInt(item.getAttribute('data-index'));

        checkbox.addEventListener('change', (e) => {
          challengeState[index] = e.target.checked;
          if (e.target.checked) {
            item.classList.add('completed');
          } else {
            item.classList.remove('completed');
          }
          updateProgress();
        });
      });
    }

    updateProgress();
  };

  // Add click events to tabs
  tabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      const week = parseInt(e.target.getAttribute('data-week'));
      renderWeek(week);
    });
  });

  // Initial render
  if (tabs.length > 0) {
    renderWeek(1);
  }
}
