// Shared initial data as fallback
const initialUsersFallback = [
  {
    username: "user",
    password: "user123",
    role: "user",
    name: "Juan Dela Cruz",
    address: "123 Main St., Brgy. San Jose",
    meterNumber: "WD-001",
    billing: {
      month: "April",
      deadline: "April 30, 2026",
      weeks: [250, 300, 200, 350]
    },
    history: [
      { month: "March", total: 900 },
      { month: "February", total: 1100 }
    ]
  },
  {
    username: "maria",
    password: "password123",
    role: "user",
    name: "Maria Clara",
    address: "456 Rizal Ave., Brgy. Poblacion",
    meterNumber: "WD-042",
    billing: {
      month: "April",
      deadline: "April 30, 2026",
      weeks: [150, 200, 180, 210]
    },
    history: [
      { month: "March", total: 800 },
      { month: "February", total: 750 }
    ]
  },
  {
    username: "admin",
    password: "admin123",
    role: "admin",
    name: "System Administrator"
  }
];

const initialAnnouncementsFallback = [
  { date: "April 1, 2026", message: "Water interruption advisory on April 10 from 8AM to 5PM due to system maintenance." },
  { date: "March 15, 2026", message: "New online and convenience store payment channels are now available." }
];

// Shared logic for the simplified billing system
window.BillingSystem = {
  getTotalBill: (user) => {
    if (!user.billing || !user.billing.weeks) return 0;
    return user.billing.weeks.reduce((sum, week) => sum + week, 0);
  },

  archiveMonth: (user, nextMonthName) => {
    const total = window.BillingSystem.getTotalBill(user);
    user.history.unshift({
      month: user.billing.month,
      total: total
    });
    // Reset next month
    user.billing = {
      month: nextMonthName,
      weeks: [0, 0, 0, 0]
    };
    return user;
  },

  compareBills: (user) => {
    const current = window.BillingSystem.getTotalBill(user);
    const previous = user.history[0]?.total;

    if (!previous) return "no-data";
    if (current > previous) return "increase";
    if (current < previous) return "decrease";
    return "same";
  }
};

// Initialize data from JSON or fallback
async function initializeAppData() {
  const accounts = localStorage.getItem("accounts");
  const announcements = localStorage.getItem("announcements");

  if (!accounts) {
    try {
      // Adjust path based on current location
      const prefix = window.location.pathname.includes('/admin/') || window.location.pathname.includes('/user/') || window.location.pathname.includes('/pages/') ? '../' : '';
      const response = await fetch(prefix + 'data/users.json');
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("accounts", JSON.stringify(data));
      } else {
        localStorage.setItem("accounts", JSON.stringify(initialUsersFallback));
      }
    } catch (e) {
      console.warn("Using fallback user data due to fetch error:", e);
      localStorage.setItem("accounts", JSON.stringify(initialUsersFallback));
    }
  }

  if (!announcements) {
    try {
      const prefix = window.location.pathname.includes('/admin/') || window.location.pathname.includes('/user/') || window.location.pathname.includes('/pages/') ? '../' : '';
      const response = await fetch(prefix + 'data/announcements.json');
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("announcements", JSON.stringify(data));
      } else {
        localStorage.setItem("announcements", JSON.stringify(initialAnnouncementsFallback));
      }
    } catch (e) {
      console.warn("Using fallback announcement data due to fetch error:", e);
      localStorage.setItem("announcements", JSON.stringify(initialAnnouncementsFallback));
    }
  }
}

// Start initialization
initializeAppData();
