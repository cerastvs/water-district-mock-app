document.addEventListener('DOMContentLoaded', async () => {
    // Wait for data initialization if needed
    if (window.dataReady) await window.dataReady;

    // Check if admin is logged in
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (!user || user.role !== 'admin') {
        window.location.href = '../login.html';
        return;
    }

    // Update display name
    const adminNameElement = document.getElementById('admin-name');
    if (adminNameElement) {
        adminNameElement.textContent = user.username;
    }

    // Sidebar toggle for mobile
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('active');
        });
    }

    // Initialize content based on page
    initAdminPageContent();

    // Handle logout
    const logoutLink = document.querySelector('.logout-link');
    if (logoutLink) {
        logoutLink.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('currentUser');
            localStorage.removeItem('role');
            window.location.href = '../login.html';
        });
    }

    // New Portal Interactions (Search, Reset)
    initPortalInteractions();
});

function initPortalInteractions() {
    const searchBtn = document.querySelector('.btn-search');
    const searchInput = document.getElementById('consumer-meter-input');
    const nameVal = document.getElementById('consumer-name');
    const addressVal = document.getElementById('consumer-address');
    const statusVal = document.getElementById('consumer-status');

    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', () => {
            const meterNo = searchInput.value.trim();
            if (!meterNo) {
                alert("Please enter a meter number.");
                return;
            }

            const accounts = JSON.parse(localStorage.getItem('accounts')) || [];
            const userFound = accounts.find(acc => acc.meterNumber === meterNo);

            if (userFound) {
                nameVal.textContent = userFound.name || userFound.username;
                addressVal.textContent = userFound.address || "N/A";
                statusVal.textContent = "Active";
                statusVal.className = "value status-active";

                // Visual feedback
                searchInput.style.borderColor = "#22C55E";
            } else {
                nameVal.textContent = "Not Found";
                addressVal.textContent = "N/A";
                statusVal.textContent = "Inactive";
                statusVal.className = "value status-inactive";

                // Visual feedback
                searchInput.style.borderColor = "#EF4444";
            }
        });

        // Search on Enter
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') searchBtn.click();
        });
    }

    // Reset Button logic
    const resetBtn = document.querySelector('.btn-reset');
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            // Clear meter digits
            const digits = document.querySelectorAll('.digit-box input');
            digits.forEach(input => input.value = "0");

            // Clear remarks
            const remarks = document.querySelector('.remarks-group textarea');
            if (remarks) remarks.value = "";

            // Clear search info if desired (optional)
            if (searchInput) {
                searchInput.value = "";
                searchInput.style.borderColor = "";
                nameVal.textContent = "---";
                addressVal.textContent = "---";
                statusVal.textContent = "---";
                statusVal.className = "value";
            }
        });
    }

    // Meter digit auto-tab logic
    const digits = document.querySelectorAll('.digit-box input');
    digits.forEach((input, idx) => {
        input.addEventListener('input', (e) => {
            if (e.target.value.length === 1 && idx < digits.length - 1) {
                digits[idx + 1].focus();
            }
        });

        input.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace' && e.target.value.length === 0 && idx > 0) {
                digits[idx - 1].focus();
            }
        });
    });
}

function initAdminPageContent() {
    const path = window.location.pathname;
    const accounts = JSON.parse(localStorage.getItem('accounts')) || [];

    if (path.includes('dashboard.html')) {
        renderAdminDashboard(accounts);
    } else if (path.includes('manage-bills.html')) {
        renderManageBills(accounts);
    } else if (path.includes('announcements.html')) {
        renderAdminAnnouncements();
        const aform = document.getElementById('announcement-form');
        if (aform) aform.onsubmit = window.addAnnouncement;
    }
}
function renderAdminDashboard(accounts) {
    const userCount = accounts.filter(acc => acc.role === 'user').length;
    const totalCountElem = document.getElementById('total-users-count');
    if (totalCountElem) totalCountElem.textContent = userCount;

    // For demo, assume "pending" if any week is 0
    const pendingCount = accounts.filter(acc =>
        acc.role === 'user' && acc.billing.weeks.some(w => w === 0)
    ).length;
    const pendingCountElem = document.getElementById('pending-bills-count');
    if (pendingCountElem) pendingCountElem.textContent = pendingCount;
}

function renderManageBills(accounts) {
    const tableBody = document.getElementById('user-bills-table');
    if (!tableBody) return;

    let html = '';
    accounts.forEach((acc, index) => {
        if (acc.role !== 'user') return;

        const total = window.BillingSystem.getTotalBill(acc);
        html += `
            <tr>
                <td>${acc.username}</td>
                <td>${acc.meterNumber}</td>
                <td>${acc.billing.month}</td>
                <td>₱ ${total.toLocaleString()}</td>
                <td>
                    <button class="btn btn-accent btn-sm" onclick="openEditModal(${index})">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="btn btn-primary btn-sm" onclick="archiveUserMonth(${index})">
                        <i class="fas fa-archive"></i> Archive
                    </button>
                </td>
            </tr>
        `;
    });
    tableBody.innerHTML = html;
}

// Admin Announcements
window.addAnnouncement = (e) => {
    e.preventDefault();
    const dateInput = document.getElementById('announcement-date').value;
    const titleInput = document.getElementById('announcement-title').value;
    const messageInput = document.getElementById('announcement-message').value;
    if (!messageInput) return;

    let announcements = JSON.parse(localStorage.getItem('announcements')) || [];

    let dateStr = "";
    if (dateInput) {
        // preserve standard "Month DD format"
        const d = new Date(dateInput);
        dateStr = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    } else {
        const d = new Date();
        dateStr = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }

    announcements.unshift({
        date: dateStr,
        title: titleInput || "Water Service Advisory",
        message: messageInput
    });
    localStorage.setItem('announcements', JSON.stringify(announcements));

    document.getElementById('announcement-form').reset();
    renderAdminAnnouncements();
};

window.deleteAnnouncement = (index) => {
    let announcements = JSON.parse(localStorage.getItem('announcements')) || [];
    if (confirm('Are you sure you want to delete this announcement?')) {
        announcements.splice(index, 1);
        localStorage.setItem('announcements', JSON.stringify(announcements));
        renderAdminAnnouncements();
    }
};

function renderAdminAnnouncements() {
    const listContainer = document.getElementById('admin-announcements-list');
    if (!listContainer) return;

    let announcements = JSON.parse(localStorage.getItem('announcements')) || [];
    if (announcements.length === 0) {
        listContainer.innerHTML = '<p>No announcements found.</p>';
        return;
    }
    listContainer.innerHTML = announcements.map((a, index) => {
        const title = a.title || "Water Service Advisory";
        const formattedMessage = a.message.replace(/\n/g, '<br>');

        return `
            <div class="card announcement-card" 
                 style="margin-bottom: 1rem; display: flex; justify-content: space-between; align-items: start; background-color: #F8FAFC; border: 1px solid #E2E8F0; padding: 1rem; box-shadow: none;"
                 onclick="openAnnouncementModal(${index})">
                <div style="flex-grow:1; padding-right: 1.5rem;">
                    <h4 style="margin:0; color:#1E3A8A;">${a.date}</h4>
                    <p style="margin-top: 0.5rem; color: #1E293B; font-weight: bold; margin-bottom: 0.25rem;">${title}</p>
                    <p style="margin-top: 0; color: #334155; line-height: 1.5;">${formattedMessage}</p>
                </div>
                <button class="btn btn-accent btn-sm" onclick="event.stopPropagation(); deleteAnnouncement(${index})">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </div>
        `;
    }).join("");
}

window.openAnnouncementModal = (index) => {
    const announcements = JSON.parse(localStorage.getItem('announcements')) || [];
    const a = announcements[index];
    if (!a) return;

    const modal = document.getElementById('global-announcement-modal');
    const modalTitle = document.getElementById('modal-announcement-title');
    const modalDate = document.getElementById('modal-announcement-date');
    const modalMessage = document.getElementById('modal-announcement-message');

    if (modal && modalTitle && modalDate && modalMessage) {
        modalTitle.textContent = a.title || "Water Service Advisory";
        modalDate.textContent = a.date;
        modalMessage.innerHTML = a.message.replace(/\n/g, '<br>');
        modal.classList.remove('hidden');
    }
};

window.closeAnnouncementModal = () => {
    const modal = document.getElementById('global-announcement-modal');
    if (modal) {
        modal.classList.add('hidden');
    }
};

// Global functions for onclick handlers
window.openEditModal = (index) => {
    const accounts = JSON.parse(localStorage.getItem('accounts'));
    const user = accounts[index];

    document.getElementById('edit-username').textContent = user.username;
    document.getElementById('edit-user-index').value = index;
    document.getElementById('week1').value = user.billing.weeks[0];
    document.getElementById('week2').value = user.billing.weeks[1];
    document.getElementById('week3').value = user.billing.weeks[2];
    document.getElementById('week4').value = user.billing.weeks[3];

    document.getElementById('edit-bill-modal').style.display = 'flex';
};

window.archiveUserMonth = (index) => {
    const accounts = JSON.parse(localStorage.getItem('accounts'));
    const user = accounts[index];

    const nextMonth = prompt("Enter next month name (e.g., May):", "May");
    if (!nextMonth) return;

    if (confirm(`Archive ${user.billing.month} for ${user.username}?`)) {
        BillingSystem.archiveMonth(user, nextMonth);
        localStorage.setItem('accounts', JSON.stringify(accounts));
        renderManageBills(accounts);
        alert("Month archived successfully!");
    }
};

// Modal close logic
const modal = document.getElementById('edit-bill-modal');
const closeModal = document.getElementById('close-modal');
if (closeModal) {
    closeModal.onclick = () => modal.style.display = 'none';
}

// Form submit logic
const editForm = document.getElementById('edit-bill-form');
if (editForm) {
    editForm.onsubmit = (e) => {
        e.preventDefault();
        const index = document.getElementById('edit-user-index').value;
        const accounts = JSON.parse(localStorage.getItem('accounts'));

        accounts[index].billing.weeks = [
            parseFloat(document.getElementById('week1').value),
            parseFloat(document.getElementById('week2').value),
            parseFloat(document.getElementById('week3').value),
            parseFloat(document.getElementById('week4').value)
        ];

        localStorage.setItem('accounts', JSON.stringify(accounts));
        modal.style.display = 'none';
        renderManageBills(accounts);
        alert("Bill updated successfully!");
    };
}
