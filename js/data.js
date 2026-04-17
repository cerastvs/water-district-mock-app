// Shared initial data as fallback
const initialUsersFallback = [
  {
    username: "user",
    password: "user123",
    role: "user",
    name: "Juan Dela Cruz",
    address: "123 Main St., Brgy. San Jose",
    meterNumber: "8004",
    billing: {
      month: "April",
      deadline: "April 30, 2026",
      weeks: [250, 300, 200, 350],
    },
    history: [
      { month: "March", total: 900 },
      { month: "February", total: 1100 },
    ],
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
      weeks: [150, 200, 180, 210],
    },
    history: [
      { month: "March", total: 800 },
      { month: "February", total: 750 },
    ],
  },
  {
    username: "admin",
    password: "admin123",
    role: "admin",
    name: "System Administrator",
  },
];

const initialAnnouncementsFallback = [
  {
    date: "Apr 15, 2026",
    message:
      " \nAng SRWD ay magsasagawa ng System Flushing bukas, April 16, 2026 (2PM - onwards). Makararanas ng paghina at pagdumi ng supply ng tubig sa Brgy. Del Pilar, Gomez, Luna, San Mariano, Mabini at Tramo-Del Pilar habang at pagkatapos isagawa ang naturang aktibidad.\nPaunawa sa abala.",
  },
  {
    date: "March 15, 2026",
    message:
      " \nAng SRWD ay magsasagawa ng Maintenance of Gomez Pumping Station ngayong April 7, 2026 (8:30PM-7AM). Makararanas ng pagkawala, paghina at paglabo ng supply ng tubig sa Santa Rosa Town proper (Rizal, Zamora, Cojuangco, Del Pilar, Gomez, San Mariano, Luna, Valenzuela, Tramo, Mabini, San Gregorio, Katuray, Agunaldo, Burgos at Soledad habang at pagkatapos isagawa ang naturang aktibidad. \nPaunawa sa abala.",
  },
  {
    date: "March 15, 2026",
    message:
      " \nAng SRWD ay magsasagawa ng Maintenance of Gomez Pumping Station ngayong April 7, 2026 (8:30PM-7AM). Makararanas ng pagkawala, paghina at paglabo ng supply ng tubig sa Santa Rosa Town proper (Rizal, Zamora, Cojuangco, Del Pilar, Gomez, San Mariano, Luna, Valenzuela, Tramo, Mabini, San Gregorio, Katuray, Agunaldo, Burgos at Soledad habang at pagkatapos isagawa ang naturang aktibidad. \nPaunawa sa abala.",
  },
  {
    date: "March 15, 2026",
    message:
      "WATER SERVICE ADVISORY\n\nAng SRWD ay magsasagawa ng System Flushing sa mga lugar at oras na nakasaad sa schedule. Posibleng makaranas ng paghina at paglabo ng supply ng tubig sa mga lugar na nakasaad habang at pagkatapos isagawa ang naturang aktibidad.\n\nPaunawa sa abala.\n\nMONDAY – April 6, 2026 - 9:00 PM TO 3:00 AM\n\nIMBUNIA (2PM - 3PM)\nRAJAL CENTRO (HIGHWAY)\nRAJAL SUR\nRAJAL NORTE 1\nPILANG\nRAJAL SUR (RIVERSIDE)\n\nTUESDAY – April 7, 2026 - 9:00 PM TO 4:00 AM\n\nDEEPWELL\nSAN ISIDRO\nSAN PEDRO\nSANTO ROSARIO\nBERANG\nMAGSALISI\nLOURDES\nISLA (JIL)\nISLA(NICOLAS-PASTRANA-BENOG)\n\nWEDNESDAY – April 8, 2026 - 9:00 PM TO 4:00 AM\n\nSTO. NIÑO\nSAPSAP\nSTA. ROSA HOMES\nSAN JOSEPH\nLA FUENTE\nLAFUENTE B (SITIO TUMANA)\n\nTHURSDAY – April 9, 2026 - 11:00 PM TO 4:00 AM\n\nLUNA\nSAN MARIANO\nGOMEZ\nDEL PILAR\nRIZAL\nSOLEDAD A\n\nFRIDAY – April 10, 2026 - 9:00 PM TO 3:00 AM\n\nAGUINALDO\nBURGOS\nTRAMO CHUA\nSAN GREGORIO\nMABINI\nSOLEDAD A\nKATURAY\nVALENZUELA\nCOJUANCO\n\nMONDAY – April 13, 2026, 2025 - 9:00 PM TO 4:00 AM\n\nTAGPOS B (2:00 PM TO 5:00 AM)\nMAPALAD\nSAPANG KUBO\nMALACAÑANG\nPATALAC\nMGL\nSOLEDAD B",
  },
  {
    date: "March 15, 2026",
    message:
      "New online and convenience store payment channels are now available.",
  },
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
      total: total,
    });
    // Reset next month
    user.billing = {
      month: nextMonthName,
      weeks: [0, 0, 0, 0],
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

  if (!accounts) {
    try {
      // Adjust path based on current location
      const prefix =
        window.location.pathname.includes("/admin/") ||
        window.location.pathname.includes("/user/") ||
        window.location.pathname.includes("/pages/")
          ? "../"
          : "";
      const response = await fetch(prefix + "data/users.json");
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
      const prefix =
        window.location.pathname.includes("/admin/") ||
        window.location.pathname.includes("/user/") ||
        window.location.pathname.includes("/pages/")
          ? "../"
          : "";
      const response = await fetch(prefix + "data/announcements.json");
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("announcements", JSON.stringify(data));
      } else {
        localStorage.setItem(
          "announcements",
          JSON.stringify(initialAnnouncementsFallback),
        );
      }
    } catch (e) {
      console.warn("Using fallback announcement data due to fetch error:", e);
      localStorage.setItem(
        "announcements",
        JSON.stringify(initialAnnouncementsFallback),
      );
    }
  }
}

// Start initialization and export the promise
window.dataReady = initializeAppData();
