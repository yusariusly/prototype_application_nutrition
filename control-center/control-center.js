// Super Admin Control Center Logic

// ==================== STATE MANAGEMENT ====================
const state = {
    activeView: 'analytics',
    nutritionists: [],
    clients: [],
    appointments: [],
    selectedClientForAllocation: null
};

let successTrendsChartInstance = null;

// ==================== SESSION CHECK ====================
function checkSuperAdminSession() {
    if (localStorage.getItem('nutriflow_superadmin_logged') !== 'true') {
        window.location.href = './login.html';
    }
}

// ==================== STATE SYNC ====================
function loadState() {
    // 1. Load Nutritionists
    if (localStorage.getItem('nutriflow_nutritionists')) {
        state.nutritionists = JSON.parse(localStorage.getItem('nutriflow_nutritionists'));
    } else {
        state.nutritionists = [
            { id: 'exp-1', name: 'Dr. Hasan', email: 'hasan@nutriflow.com', specialty: 'Weight Management', status: 'active', avatar: 'DH' },
            { id: 'exp-2', name: 'Dr. Amanda', email: 'amanda@nutriflow.com', specialty: 'Sport Nutrition', status: 'active', avatar: 'DA' },
            { id: 'exp-3', name: 'Dr. Marcus Reid', email: 'm.reid@email.com', specialty: 'Therapeutic Diets', status: 'active', avatar: 'MR' },
            { id: 'exp-4', name: 'Dr. John Doe', email: 'john@nutriflow.com', specialty: 'Pediatric Nutrition', status: 'active', avatar: 'JD' }
        ];
        saveState();
    }

    // 2. Load Clients
    if (localStorage.getItem('nutriflow_clients')) {
        state.clients = JSON.parse(localStorage.getItem('nutriflow_clients'));
    } else {
        state.clients = [
            { name: 'Sarah Jenkins', email: 'sarah.j@email.com', goal: 'Weight Loss', compliance: 92, therapist: 'Dr. Hasan', avatar: 'SJ' },
            { name: 'Marcus Reid', email: 'm.reid@email.com', goal: 'Muscle Gain', compliance: 78, therapist: 'Dr. Amanda', avatar: 'MR' },
            { name: 'Elena Lopez', email: 'elena.l@email.com', goal: 'Maintenance', compliance: 95, therapist: 'Dr. Marcus Reid', avatar: 'EL' }
        ];
        saveState();
    }

    // 3. Load Appointments
    if (localStorage.getItem('nutriflow_appointments')) {
        state.appointments = JSON.parse(localStorage.getItem('nutriflow_appointments'));
    } else {
        state.appointments = [
            { id: 'apt-1', clientName: 'Sarah Jenkins', clientEmail: 'sarah.j@email.com', serviceTitle: 'Monthly Progress Review', price: 150, date: '2024-10-24', status: 'approved' },
            { id: 'apt-2', clientName: 'Sarah Jenkins', clientEmail: 'sarah.j@email.com', serviceTitle: 'Meal Plan Adjustment', price: 75, date: '2024-11-05', status: 'approved' },
            { id: 'apt-3', clientName: 'Michael Chang', clientEmail: 'm.chang@email.com', serviceTitle: 'Follow-up & Macros Review', price: 75, date: '2024-10-15', status: 'approved' }
        ];
        saveState();
    }
}

function saveState() {
    localStorage.setItem('nutriflow_nutritionists', JSON.stringify(state.nutritionists));
    localStorage.setItem('nutriflow_clients', JSON.stringify(state.clients));
    localStorage.setItem('nutriflow_appointments', JSON.stringify(state.appointments));
}

// ==================== VIEW ROUTING ====================
window.navigateToView = function(viewName) {
    state.activeView = viewName;

    // Toggle active link styling
    const links = ['analytics', 'nutritionists', 'allocation', 'reports'];
    links.forEach(l => {
        const linkEl = document.getElementById(`link-${l}`);
        const viewEl = document.getElementById(`view-${l}`);
        if (linkEl) {
            if (l === viewName) {
                linkEl.classList.add('active');
            } else {
                linkEl.classList.remove('active');
            }
        }
        if (viewEl) {
            if (l === viewName) {
                viewEl.classList.remove('hidden');
            } else {
                viewEl.classList.add('hidden');
            }
        }
    });

    if (viewName === 'analytics') {
        renderAnalyticsCharts();
    } else if (viewName === 'nutritionists') {
        renderNutritionistsTable();
    } else if (viewName === 'allocation') {
        renderAllocationTable();
    } else if (viewName === 'reports') {
        setTimeout(initAdminReportsCharts, 50);
    }
};

// ==================== SUMMARY STATS ====================
function updateSummaryStats() {
    const totalClientsEl = document.getElementById('stat-total-clients');
    const totalExpertsEl = document.getElementById('stat-total-experts');
    const totalBookingsEl = document.getElementById('stat-total-bookings');
    const avgComplianceEl = document.getElementById('stat-avg-compliance');

    if (totalClientsEl) totalClientsEl.innerText = state.clients.length;
    if (totalExpertsEl) totalExpertsEl.innerText = state.nutritionists.length;
    if (totalBookingsEl) totalBookingsEl.innerText = state.appointments.length;

    if (avgComplianceEl && state.clients.length > 0) {
        const totalComp = state.clients.reduce((acc, c) => acc + (c.compliance || 0), 0);
        const avg = (totalComp / state.clients.length).toFixed(1);
        avgComplianceEl.innerText = `${avg}%`;
    }
}

// ==================== ANALYTICS & CHARTS ====================
let growthChartInstance = null;
let goalsChartInstance = null;

function renderAnalyticsCharts() {
    // 1. Line Chart: Growth & Bookings
    const growthCtx = document.getElementById('chart-growth-bookings');
    if (growthCtx) {
        if (growthChartInstance) {
            growthChartInstance.destroy();
        }
        growthChartInstance = new Chart(growthCtx, {
            type: 'line',
            data: {
                labels: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
                datasets: [
                    {
                        label: 'Registered Clients',
                        data: [1, 2, 2, 3, 3, state.clients.length],
                        borderColor: '#006e2f',
                        backgroundColor: 'rgba(0, 110, 47, 0.05)',
                        fill: true,
                        tension: 0.3
                    },
                    {
                        label: 'Janji Temu',
                        data: [2, 3, 4, 3, 5, state.appointments.length],
                        borderColor: '#006a61',
                        backgroundColor: 'rgba(0, 106, 97, 0.05)',
                        fill: true,
                        tension: 0.3
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: { font: { size: 10, weight: 'bold' } }
                    }
                },
                scales: {
                    y: { beginAtZero: true, grid: { color: 'rgba(0,0,0,0.05)' } },
                    x: { grid: { display: false } }
                }
            }
        });
    }

    // 2. Doughnut Chart: Goals
    const goalsCtx = document.getElementById('chart-goals');
    if (goalsCtx) {
        if (goalsChartInstance) {
            goalsChartInstance.destroy();
        }

        // Count categories
        let weightLossCount = 0;
        let muscleGainCount = 0;
        let maintenanceCount = 0;

        state.clients.forEach(c => {
            if (c.goal === 'Weight Loss') weightLossCount++;
            else if (c.goal === 'Muscle Gain') muscleGainCount++;
            else maintenanceCount++;
        });

        goalsChartInstance = new Chart(goalsCtx, {
            type: 'doughnut',
            data: {
                labels: ['Weight Loss', 'Muscle Gain', 'Maintenance'],
                datasets: [{
                    data: [weightLossCount, muscleGainCount, maintenanceCount],
                    backgroundColor: ['#006e2f', '#006a61', '#9d4300'],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: { font: { size: 9, weight: 'bold' } }
                    }
                }
            }
        });
    }
}

// ==================== NUTRITIONISTS TABLE ====================
function renderNutritionistsTable() {
    const tbody = document.getElementById('nutritionists-table-body');
    if (!tbody) return;

    tbody.innerHTML = state.nutritionists.map(n => {
        // Count active clients assigned to this nutritionist
        const clientCount = state.clients.filter(c => c.therapist === n.name).length;

        return `
            <tr class="hover:bg-slate-50 transition-colors">
                <td class="p-4 flex items-center gap-3">
                    <div class="w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-xs flex items-center justify-center shrink-0">${n.avatar || 'N'}</div>
                    <span class="font-bold text-slate-800">${n.name}</span>
                </td>
                <td class="p-4 text-slate-500 font-medium">${n.email}</td>
                <td class="p-4"><span class="bg-blue-50 text-blue-700 font-bold px-2.5 py-1 rounded-full text-[10px]">${n.specialty}</span></td>
                <td class="p-4">
                    <span class="inline-flex items-center gap-1.5 font-bold ${n.status === 'active' ? 'text-green-600' : 'text-slate-400'}">
                        <span class="w-2 h-2 rounded-full ${n.status === 'active' ? 'bg-green-600' : 'bg-slate-400'}"></span>
                        ${n.status.toUpperCase()}
                    </span>
                </td>
                <td class="p-4 text-center font-bold text-slate-700">${clientCount}</td>
                <td class="p-4 text-right">
                    <button onclick="deleteNutritionist('${n.id}')" class="text-red-500 hover:text-red-700 font-bold flex items-center gap-0.5 justify-end w-full cursor-pointer">
                        <span class="material-symbols-outlined text-[16px]">delete</span> Delete
                    </button>
                </td>
            </tr>
        `;
    }).join('');
}

window.openAddNutritionistModal = function() {
    document.getElementById('add-nutritionist-modal').classList.remove('hidden');
    document.getElementById('add-nutritionist-modal').classList.add('flex');
};

window.closeAddNutritionistModal = function() {
    document.getElementById('add-nutritionist-modal').classList.add('hidden');
    document.getElementById('add-nutritionist-modal').classList.remove('flex');
};

window.handleAddNutritionist = function(e) {
    e.preventDefault();
    const name = document.getElementById('expert-name').value;
    const email = document.getElementById('expert-email').value;
    const specialty = document.getElementById('expert-specialty').value;
    const avatar = name.split(' ').map(s => s[0]).join('').substring(0, 2).toUpperCase();

    const newExp = {
        id: `exp-${Date.now()}`,
        name,
        email,
        specialty,
        status: 'active',
        avatar
    };

    state.nutritionists.push(newExp);
    saveState();
    closeAddNutritionistModal();
    renderNutritionistsTable();
    updateSummaryStats();
    showToast(`Registered practitioner ${name} successfully!`, 'success');

    // Clean inputs
    document.getElementById('expert-name').value = '';
    document.getElementById('expert-email').value = '';
};

window.deleteNutritionist = function(id) {
    if (confirm("Are you sure you want to remove this practitioner?")) {
        const index = state.nutritionists.findIndex(n => n.id === id);
        if (index !== -1) {
            const removed = state.nutritionists.splice(index, 1)[0];
            saveState();
            renderNutritionistsTable();
            updateSummaryStats();
            showToast(`Practitioner ${removed.name} removed successfully!`, 'info');
        }
    }
};

// ==================== ALLOCATION TABLE ====================
function renderAllocationTable() {
    const tbody = document.getElementById('allocation-table-body');
    if (!tbody) return;

    tbody.innerHTML = state.clients.map(c => {
        return `
            <tr class="hover:bg-slate-50 transition-colors">
                <td class="p-4 flex items-center gap-3">
                    <div class="w-8 h-8 rounded-full bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center shrink-0">${c.avatar || 'C'}</div>
                    <span class="font-bold text-slate-800">${c.name}</span>
                </td>
                <td class="p-4 text-slate-500 font-medium">${c.goal}</td>
                <td class="p-4">
                    <span class="bg-primary/5 text-primary font-bold px-3 py-1 rounded-xl text-xs flex items-center gap-1.5 w-fit">
                        <span class="material-symbols-outlined text-[14px]">support_agent</span>
                        ${c.therapist || 'None'}
                    </span>
                </td>
                <td class="p-4 text-center font-bold text-emerald-700">${c.compliance}%</td>
                <td class="p-4 text-right">
                    <button onclick="openAllocationModal('${c.name}')" class="text-primary hover:text-[#005321] font-bold flex items-center gap-0.5 justify-end w-full cursor-pointer">
                        <span class="material-symbols-outlined text-[16px]">sync_alt</span> Change
                    </button>
                </td>
            </tr>
        `;
    }).join('');
}

window.openAllocationModal = function(clientName) {
    state.selectedClientForAllocation = clientName;
    document.getElementById('allocation-client-name').innerText = clientName;

    const select = document.getElementById('allocation-expert-select');
    if (select) {
        select.innerHTML = state.nutritionists.map(n => `<option value="${n.name}">${n.name} (${n.specialty})</option>`).join('');
    }

    document.getElementById('edit-allocation-modal').classList.remove('hidden');
    document.getElementById('edit-allocation-modal').classList.add('flex');
};

window.closeEditAllocationModal = function() {
    document.getElementById('edit-allocation-modal').classList.add('hidden');
    document.getElementById('edit-allocation-modal').classList.remove('flex');
};

window.saveAllocationChange = function() {
    const expert = document.getElementById('allocation-expert-select').value;
    const client = state.clients.find(c => c.name === state.selectedClientForAllocation);
    if (client) {
        client.therapist = expert;
        saveState();
        closeEditAllocationModal();
        renderAllocationTable();
        showToast(`Assigned ${expert} to ${state.selectedClientForAllocation}!`, 'success');
    }
};

// ==================== TOASTS ====================
function showToast(message, type = 'success') {
    const toast = document.getElementById('admin-toast');
    const toastText = document.getElementById('toast-text');
    const toastIcon = document.getElementById('toast-icon');

    if (toast && toastText) {
        toastText.innerText = message;
        if (type === 'success') {
            toastIcon.innerText = 'check_circle';
            toastIcon.className = 'material-symbols-outlined text-green-500 text-base';
        } else {
            toastIcon.innerText = 'info';
            toastIcon.className = 'material-symbols-outlined text-blue-500 text-base';
        }

        toast.classList.remove('translate-y-20', 'opacity-0');
        toast.classList.add('translate-y-0', 'opacity-100');

        setTimeout(() => {
            toast.classList.add('translate-y-20', 'opacity-0');
            toast.classList.remove('translate-y-0', 'opacity-100');
        }, 3000);
    }
}

// ==================== LOGOUT ====================
window.handleSignOut = function() {
    localStorage.removeItem('nutriflow_superadmin_logged');
    window.location.href = './login.html';
};

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', () => {
    checkSuperAdminSession();
    loadState();
    updateSummaryStats();
    navigateToView('analytics');
});

// ==================== REPORTS CHART ====================
function initAdminReportsCharts() {
    const ctxSuccess = document.getElementById('adminSuccessTrendsChartCanvas').getContext('2d');
    if (!ctxSuccess) return;
    if (successTrendsChartInstance) successTrendsChartInstance.destroy();
    successTrendsChartInstance = new Chart(ctxSuccess, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Compliance Rate (%)',
                data: [55, 62, 60, 68, 75, 87],
                borderColor: '#006a61',
                backgroundColor: 'rgba(0, 106, 97, 0.05)',
                borderWidth: 2,
                pointBackgroundColor: '#006a61',
                pointBorderColor: '#ffffff',
                tension: 0.25,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                y: { grid: { color: 'rgba(211, 228, 254, 0.4)' }, ticks: { color: '#6d7b6c', font: { size: 10 } } },
                x: { grid: { display: false }, ticks: { color: '#6d7b6c', font: { size: 10 } } }
            }
        }
    });
}
