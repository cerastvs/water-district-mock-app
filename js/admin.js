document.addEventListener('DOMContentLoaded', () => {
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
});

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
    document.getElementById('total-users-count').textContent = userCount;

    // For demo, assume "pending" if any week is 0
    const pendingCount = accounts.filter(acc =>
        acc.role === 'user' && acc.billing.weeks.some(w => w === 0)
    ).length;
    document.getElementById('pending-bills-count').textContent = pendingCount;
}

function renderManageBills(accounts) {
    const tableBody = document.getElementById('user-bills-table');
    if (!tableBody) return;

    let html = '';
    accounts.forEach((acc, index) => {
        if (acc.role !== 'user') return;

        const total = BillingSystem.getTotalBill(acc);
        html += `
            <tr>
                <td>${acc.username}</td>
                <td>${acc.meterNumber}</td>
                <td>${acc.billing.month}</td>
                <td>₱ ${total.toFixed(2)}</td>
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

    announcements.unshift({ date: dateStr, message: messageInput });
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
    listContainer.innerHTML = announcements.map((a, index) => `
        <div class="card" style="margin-bottom: 1rem; display: flex; justify-content: space-between; align-items: start; background-color: #F8FAFC; border: 1px solid #E2E8F0; padding: 1rem; box-shadow: none;">
            <div style="flex-grow:1; padding-right: 1.5rem;">
                <h4 style="margin:0; color:#1E3A8A;">${a.date}</h4>
                <p style="margin-top: 0.5rem; color: #334155;">${a.message}</p>
            </div>
            <button class="btn btn-accent btn-sm" onclick="deleteAnnouncement(${index})"><i class="fas fa-trash"></i> Delete</button>
        </div>
    `).join("");
}

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
