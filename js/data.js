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
        { prev: 1700, current: 0 },
        { prev: 1705, current: 0 },
      ],
    },
    history: [{ month: "March", total: 540 }],
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
        { prev: 3543, current: 0 },
        { prev: 3546, current: 0 },
      ],
    },
    history: [{ month: "March", total: 420 }],
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
        { prev: 620, current: 0 },
        { prev: 621, current: 0 },
      ],
    },
    history: [{ month: "March", total: 610 }],
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
        { prev: 458, current: 0 },
        { prev: 466, current: 0 },
      ],
    },
    history: [{ month: "March", total: 780 }],
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
        { prev: 603, current: 0 },
        { prev: 604, current: 0 },
      ],
    },
    history: [{ month: "March", total: 450 }],
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
        { prev: 419, current: 0 },
        { prev: 419, current: 0 },
      ],
    },
    history: [{ month: "March", total: 520 }],
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
        { prev: 1908, current: 0 },
        { prev: 1913, current: 0 },
      ],
    },
    history: [{ month: "March", total: 670 }],
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
        { prev: 853, current: 0 },
        { prev: 855, current: 0 },
      ],
    },
    history: [{ month: "March", total: 490 }],
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
        { prev: 2900, current: 0 },
        { prev: 2906, current: 0 },
      ],
    },
    history: [{ month: "March", total: 720 }],
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
        { prev: 871, current: 0 },
        { prev: 877, current: 0 },
      ],
    },
    history: [{ month: "March", total: 580 }],
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
        { prev: 2079, current: 0 },
        { prev: 2082, current: 0 },
      ],
    },
    history: [{ month: "March", total: 630 }],
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
        { prev: 528, current: 0 },
        { prev: 531, current: 0 },
      ],
    },
    history: [{ month: "March", total: 470 }],
  },
];

const initialAnnouncementsFallback = [
  {
    date: "Apr 15, 2026",
    message:
      "Water Service Advisory\nAng SRWD ay magsasagawa ng System Flushing bukas, April 16, 2026 (2PM - onwards). Makararanas ng paghina at pagdumi ng supply ng tubig sa Brgy. Del Pilar, Gomez, Luna, San Mariano, Mabini at Tramo-Del Pilar habang at pagkatapos isagawa ang naturang aktibidad.\nPaunawa sa abala.",
  },
  {
    date: "Apr 16, 2026",
    message:
      "Ang SRWD ay magsasagawa ng Maintenance of Gomez Pumping Station ngayong April 7, 2026 (8:30PM-7AM).\nMakararanas ng pagkawala, paghina at paglabo ng supply ng tubig sa Santa Rosa Town proper (Rizal, Zamora, Cojuangco, Del Pilar, Gomez, San Mariano, Luna, Valenzuela, Tramo, Mabini, San Gregorio, Katuray, Agunaldo, Burgos at Soledad habang at pagkatapos isagawa ang naturang aktibidad.",
  },
  {
    date: "Apr 17, 2026",
    message:
      "Ang SRWD ay magsasagawa ng Maintenance of Gomez Pumping Station ngayong April 7, 2026 (8:30PM-7AM).\nMakararanas ng pagkawala, paghina at paglabo ng supply ng tubig sa Santa Rosa Town proper (Rizal, Zamora, Cojuangco, Del Pilar, Gomez, San Mariano, Luna, Valenzuela, Tramo, Mabini, San Gregorio, Katuray, Agunaldo, Burgos at Soledad habang at pagkatapos isagawa ang naturang aktibidad.",
  },
  {
    date: "Apr 18, 2026",
    message:
      "Ang SRWD ay magsasagawa ng System Flushing sa mga lugar at oras na nakasaad sa schedule.\nPosibleng makaranas ng paghina at paglabo ng supply ng tubig sa mga lugar na nakasaad habang at pagkatapos isagawa ang naturang aktibidad.\n\nPaunawa sa abala.\n\nMONDAY – April 6, 2026 - 9:00 PM TO 3:00 AM\nIMBUNIA (2PM - 3PM)\nRAJAL CENTRO (HIGHWAY)\nRAJAL SUR\nRAJAL NORTE 1\nPILANG\nRAJAL SUR (RIVERSIDE)\n\nTUESDAY – April 7, 2026 - 9:00 PM TO 4:00 AM\nDEEPWELL\nSAN ISIDRO\nSAN PEDRO\nSANTO ROSARIO\nBERANG\nMAGSALISI\nLOURDES\nISLA (JIL)\nISLA(NICOLAS-PASTRANA-BENOG)\n\nWEDNESDAY – April 8, 2026 - 9:00 PM TO 4:00 AM\nSTO. NIÑO\nSAPSAP\nSTA. ROSA HOMES\nSAN JOSEPH\nLA FUENTE\nLAFUENTE B (SITIO TUMANA)\n\nTHURSDAY – April 9, 2026 - 11:00 PM TO 4:00 AM\nLUNA\nSAN MARIANO\nGOMEZ\nDEL PILAR\nRIZAL\nSOLEDAD A\n\nFRIDAY – April 10, 2026 - 9:00 PM TO 3:00 AM\nAGUINALDO\nBURGOS\nTRAMO CHUA\nSAN GREGORIO\nMABINI\nSOLEDAD A\nKATURAY\nVALENZUELA\nCOJUANCO\n\nMONDAY – April 13, 2026, 2025 - 9:00 PM TO 4:00 AM\nTAGPOS B (2:00 PM TO 5:00 AM)\nMAPALAD\nSAPANG KUBO\nMALACAÑANG\nPATALAC\nMGL\nSOLEDAD B",
  },
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
    return user.billing.weeks.reduce(
      (sum, week) => sum + window.BillingSystem.calculateWeekBill(week),
      0,
    );
  },

  archiveMonth: (user, nextMonthName) => {
    const total = window.BillingSystem.getTotalBill(user);
    user.history.unshift({
      month: user.billing.month,
      total: total,
    });

    // Get last reading to be the previous for next month's first week
    const lastReading =
      user.billing.weeks[3].current || user.billing.weeks[2].current || 0;

    user.billing = {
      month: nextMonthName,
      weeks: [
        { prev: lastReading, current: 0 },
        { prev: 0, current: 0 },
        { prev: 0, current: 0 },
        { prev: 0, current: 0 },
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

  // Force update if accounts exists but lacks history (for testing purposes)
  if (accounts) {
    const parsedAccounts = JSON.parse(accounts);
    if (
      parsedAccounts.length > 0 &&
      parsedAccounts[1] &&
      (!parsedAccounts[1].history || parsedAccounts[1].history.length === 0)
    ) {
      localStorage.setItem("accounts", JSON.stringify(initialUsersFallback));
    }
  }

  if (!accounts || accounts === "[]") {
    localStorage.setItem("accounts", JSON.stringify(initialUsersFallback));
  }

  if (!announcements) {
    localStorage.setItem(
      "announcements",
      JSON.stringify(initialAnnouncementsFallback),
    );
  }
}

// Start initialization and export the promise
window.dataReady = initializeAppData();
