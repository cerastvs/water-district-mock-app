// Shared initial data as fallback
const initialUsersFallback = [
  {
    username: "admin",
    password: "admin123",
    role: "admin",
    name: "System Administrator",
  },
  {
    username: "roselyn",
    password: "password123",
    role: "user",
    name: "Roselyn C. Lising",
    address: "Santa Rosa, Nueva Ecija",
    meterNumber: "GKM16A150690A",
    billing: {
      month: "April",
      deadline: "April 30, 2026",
      weeks: [
        { prev: 0, current: 0 },
        { prev: 0, current: 0 },
        { prev: 1700, current: 1705 },
        { prev: 1705, current: 0 }
      ]
    },
    history: []
  },
  {
    username: "rosita",
    password: "password123",
    role: "user",
    name: "Rosita P. Jacob",
    address: "Santa Rosa, Nueva Ecija",
    meterNumber: "10081320308",
    billing: {
      month: "April",
      deadline: "April 30, 2026",
      weeks: [
        { prev: 0, current: 0 },
        { prev: 0, current: 0 },
        { prev: 3543, current: 3546 },
        { prev: 3546, current: 0 }
      ]
    },
    history: []
  },
  {
    username: "estrelita",
    password: "password123",
    role: "user",
    name: "Estrelita C. Ramos",
    address: "Santa Rosa, Nueva Ecija",
    meterNumber: "GKM23A071612A",
    billing: {
      month: "April",
      deadline: "April 30, 2026",
      weeks: [
        { prev: 0, current: 0 },
        { prev: 0, current: 0 },
        { prev: 620, current: 621 },
        { prev: 621, current: 0 }
      ]
    },
    history: []
  },
  {
    username: "gundina",
    password: "password123",
    role: "user",
    name: "Gundina P. Garcia",
    address: "Santa Rosa, Nueva Ecija",
    meterNumber: "GKM20A005422A",
    billing: {
      month: "April",
      deadline: "April 30, 2026",
      weeks: [
        { prev: 0, current: 0 },
        { prev: 0, current: 0 },
        { prev: 458, current: 466 },
        { prev: 466, current: 0 }
      ]
    },
    history: []
  },
  {
    username: "jorel",
    password: "password123",
    role: "user",
    name: "Jorel D. Bernardino",
    address: "Santa Rosa, Nueva Ecija",
    meterNumber: "GKM19A079941A",
    billing: {
      month: "April",
      deadline: "April 30, 2026",
      weeks: [
        { prev: 0, current: 0 },
        { prev: 0, current: 0 },
        { prev: 603, current: 604 },
        { prev: 604, current: 0 }
      ]
    },
    history: []
  },
  {
    username: "luisa",
    password: "password123",
    role: "user",
    name: "Luisa M. Mallare",
    address: "Santa Rosa, Nueva Ecija",
    meterNumber: "GKM18A380494A",
    billing: {
      month: "April",
      deadline: "April 30, 2026",
      weeks: [
        { prev: 0, current: 0 },
        { prev: 0, current: 0 },
        { prev: 419, current: 419 },
        { prev: 419, current: 0 }
      ]
    },
    history: []
  },
  {
    username: "frederick",
    password: "password123",
    role: "user",
    name: "Frederick M. Lustre",
    address: "Santa Rosa, Nueva Ecija",
    meterNumber: "GKM17A258956A",
    billing: {
      month: "April",
      deadline: "April 30, 2026",
      weeks: [
        { prev: 0, current: 0 },
        { prev: 0, current: 0 },
        { prev: 1908, current: 1913 },
        { prev: 1913, current: 0 }
      ]
    },
    history: []
  },
  {
    username: "candido",
    password: "password123",
    role: "user",
    name: "Candido D. Villianueva",
    address: "Santa Rosa, Nueva Ecija",
    meterNumber: "GKM19A080064A",
    billing: {
      month: "April",
      deadline: "April 30, 2026",
      weeks: [
        { prev: 0, current: 0 },
        { prev: 0, current: 0 },
        { prev: 853, current: 855 },
        { prev: 855, current: 0 }
      ]
    },
    history: []
  },
  {
    username: "nerissa",
    password: "password123",
    role: "user",
    name: "Nerissa P. Bustamante",
    address: "Santa Rosa, Nueva Ecija",
    meterNumber: "GKM17A258963A",
    billing: {
      month: "April",
      deadline: "April 30, 2026",
      weeks: [
        { prev: 0, current: 0 },
        { prev: 0, current: 0 },
        { prev: 2900, current: 2906 },
        { prev: 2906, current: 0 }
      ]
    },
    history: []
  },
  {
    username: "ligaya",
    password: "password123",
    role: "user",
    name: "Ligaya M. Sta. Ana",
    address: "Santa Rosa, Nueva Ecija",
    meterNumber: "GKM23A180853A",
    billing: {
      month: "April",
      deadline: "April 30, 2026",
      weeks: [
        { prev: 0, current: 0 },
        { prev: 0, current: 0 },
        { prev: 871, current: 877 },
        { prev: 877, current: 0 }
      ]
    },
    history: []
  },
  {
    username: "edgardo",
    password: "password123",
    role: "user",
    name: "Edgardo C. Dela Isla",
    address: "Santa Rosa, Nueva Ecija",
    meterNumber: "GKM17A257866A",
    billing: {
      month: "April",
      deadline: "April 30, 2026",
      weeks: [
        { prev: 0, current: 0 },
        { prev: 0, current: 0 },
        { prev: 2079, current: 2082 },
        { prev: 2082, current: 0 }
      ]
    },
    history: []
  },
  {
    username: "med",
    password: "password123",
    role: "user",
    name: "Med P. Dandan",
    address: "Santa Rosa, Nueva Ecija",
    meterNumber: "GKM22A096886A",
    billing: {
      month: "April",
      deadline: "April 30, 2026",
      weeks: [
        { prev: 0, current: 0 },
        { prev: 0, current: 0 },
        { prev: 528, current: 531 },
        { prev: 531, current: 0 }
      ]
    },
    history: []
  }
];

const initialAnnouncementsFallback = [
  {
    date: "Apr 15, 2026",
    message: "Water Service Advisory\nAng SRWD ay magsasagawa ng System Flushing bukas, April 16, 2026 (2PM - onwards). Makararanas ng paghina at pagdumi ng supply ng tubig sa Brgy. Del Pilar, Gomez, Luna, San Mariano, Mabini at Tramo-Del Pilar habang at pagkatapos isagawa ang naturang aktibidad.\nPaunawa sa abala."
  }
];

// Shared logic for the simplified billing system
window.BillingSystem = {
  RATE: 21,
  MINIMUM_BILL: 210,

  calculateUsage: (weekData) => {
    if (!weekData || weekData.current === 0) return 0;
    const usage = weekData.current - weekData.prev;
    return usage > 0 ? usage : 0;
  },

  calculateWeekBill: (weekData) => {
    const usage = window.BillingSystem.calculateUsage(weekData);
    if (weekData.current === 0 && weekData.prev === 0) return 0;
    
    // Logic: usage * 21 (No minimum for now)
    return usage * window.BillingSystem.RATE;
  },

  getTotalBill: (user) => {
    if (!user.billing || !user.billing.weeks) return 0;
    return user.billing.weeks.reduce((sum, week) => sum + window.BillingSystem.calculateWeekBill(week), 0);
  },

  archiveMonth: (user, nextMonthName) => {
    const total = window.BillingSystem.getTotalBill(user);
    user.history.unshift({
      month: user.billing.month,
      total: total,
    });
    
    // Get last reading to be the previous for next month's first week
    const lastReading = user.billing.weeks[3].current || user.billing.weeks[2].current || 0;

    user.billing = {
      month: nextMonthName,
      weeks: [
        { prev: lastReading, current: 0 },
        { prev: 0, current: 0 },
        { prev: 0, current: 0 },
        { prev: 0, current: 0 }
      ],
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
  },
};

// Initialize data from JSON or fallback
async function initializeAppData() {
  const accounts = localStorage.getItem("accounts");
  const announcements = localStorage.getItem("announcements");

  if (!accounts || accounts === '[]') {
    localStorage.setItem("accounts", JSON.stringify(initialUsersFallback));
  }

  if (!announcements) {
    localStorage.setItem("announcements", JSON.stringify(initialAnnouncementsFallback));
  }
}

// Start initialization and export the promise
window.dataReady = initializeAppData();
