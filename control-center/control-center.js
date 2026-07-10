// Super Admin Control Center Logic

// ==================== STATE MANAGEMENT ====================
const state = {
    activeView: 'analytics',
    nutritionists: [],
    clients: [],
    appointments: [],
    selectedClientForAllocation: null,
    editingPatientId: null
};

let successTrendsChartInstance = null;
let growthChartInstance = null;
let goalsChartInstance = null;

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
            { id: 'exp-3', name: 'Dr. Marcus Reid', email: 'm.reid@nutriflow.com', specialty: 'Therapeutic Diets', status: 'active', avatar: 'MR' },
            { id: 'exp-4', name: 'Dr. John Doe', email: 'john@nutriflow.com', specialty: 'Pediatric Nutrition', status: 'active', avatar: 'JD' }
        ];
        saveState();
    }

    // 2. Load Clients/Patients
    if (localStorage.getItem('nutriflow_clients')) {
        state.clients = JSON.parse(localStorage.getItem('nutriflow_clients'));
        // Ensure all clients have an id
        let dirty = false;
        state.clients.forEach(c => {
            if (!c.id) {
                c.id = `pat-${Date.now()}-${Math.random().toString(36).slice(2)}`;
                dirty = true;
            }
        });
        if (dirty) saveState();
    } else {
        state.clients = [
            { id: 'pat-1', name: 'Sarah Jenkins', email: 'sarah.j@email.com', goal: 'Weight Loss', compliance: 92, therapist: 'Dr. Hasan', avatar: 'SJ' },
            { id: 'pat-2', name: 'Marcus Reid', email: 'm.reid@email.com', goal: 'Muscle Gain', compliance: 78, therapist: 'Dr. Amanda', avatar: 'MR' },
            { id: 'pat-3', name: 'Elena Lopez', email: 'elena.l@email.com', goal: 'Maintenance', compliance: 95, therapist: 'Dr. Marcus Reid', avatar: 'EL' }
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

    const links = ['analytics', 'patients', 'nutritionists'];
    links.forEach(l => {
        const linkEl = document.getElementById(`link-${l}`);
        const viewEl = document.getElementById(`view-${l}`);
        if (linkEl) linkEl.classList.toggle('active', l === viewName);
        if (viewEl) viewEl.classList.toggle('hidden', l !== viewName);
    });

    if (viewName === 'analytics') renderAnalyticsCharts();
    else if (viewName === 'patients') renderPatientsTable();
    else if (viewName === 'nutritionists') renderNutritionistsTable();
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
    } else if (avgComplianceEl) {
        avgComplianceEl.innerText = '—';
    }

    // Also update the practice metric cards inside the merged analytics view
    const reportTotal = document.getElementById('report-total-patients');
    const reportComp = document.getElementById('report-avg-compliance');
    if (reportTotal) reportTotal.innerText = state.clients.length;
    if (reportComp) {
        if (state.clients.length > 0) {
            const totalComp = state.clients.reduce((acc, c) => acc + (c.compliance || 0), 0);
            reportComp.innerText = `${(totalComp / state.clients.length).toFixed(1)}%`;
        } else {
            reportComp.innerText = '—';
        }
    }
}

// ==================== ANALYTICS & CHARTS ====================
function renderAnalyticsCharts() {
    const growthCtx = document.getElementById('chart-growth-bookings');
    if (growthCtx) {
        if (growthChartInstance) growthChartInstance.destroy();
        growthChartInstance = new Chart(growthCtx, {
            type: 'line',
            data: {
                labels: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
                datasets: [
                    {
                        label: 'Registered Patients',
                        data: [1, 2, 2, 3, 3, state.clients.length],
                        borderColor: '#006e2f',
                        backgroundColor: 'rgba(0, 110, 47, 0.07)',
                        fill: true, tension: 0.4, pointRadius: 4,
                        pointBackgroundColor: '#006e2f'
                    },
                    {
                        label: 'Appointments',
                        data: [2, 3, 4, 3, 5, state.appointments.length],
                        borderColor: '#006a61',
                        backgroundColor: 'rgba(0, 106, 97, 0.07)',
                        fill: true, tension: 0.4, pointRadius: 4,
                        pointBackgroundColor: '#006a61'
                    }
                ]
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                plugins: { legend: { labels: { font: { size: 11, weight: 'bold' } } } },
                scales: {
                    y: { beginAtZero: true, grid: { color: 'rgba(0,0,0,0.04)' }, ticks: { font: { size: 10 } } },
                    x: { grid: { display: false }, ticks: { font: { size: 10 } } }
                }
            }
        });
    }

    const goalsCtx = document.getElementById('chart-goals');
    if (goalsCtx) {
        if (goalsChartInstance) goalsChartInstance.destroy();
        let weightLoss = 0, muscleGain = 0, maintenance = 0, other = 0;
        state.clients.forEach(c => {
            if (c.goal === 'Weight Loss') weightLoss++;
            else if (c.goal === 'Muscle Gain') muscleGain++;
            else if (c.goal === 'Maintenance') maintenance++;
            else other++;
        });
        goalsChartInstance = new Chart(goalsCtx, {
            type: 'doughnut',
            data: {
                labels: ['Weight Loss', 'Muscle Gain', 'Maintenance', 'Other'],
                datasets: [{ data: [weightLoss, muscleGain, maintenance, other], backgroundColor: ['#006e2f', '#006a61', '#9d4300', '#5c7a5a'], borderWidth: 2, borderColor: '#fff' }]
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                plugins: { legend: { position: 'bottom', labels: { font: { size: 10, weight: 'bold' }, padding: 12 } } }
            }
        });
    }

    // Also render the compliance trends chart (part of merged analytics view)
    setTimeout(initAdminReportsCharts, 50);
}

// ==================== PATIENTS TABLE ====================
let filteredPatients = [];

function renderPatientsTable(data) {
    const tbody = document.getElementById('patients-table-body');
    if (!tbody) return;

    const patients = data || state.clients;
    filteredPatients = patients;

    if (patients.length === 0) {
        tbody.innerHTML = `
            <tr><td colspan="6" class="px-6 py-12 text-center text-on-surface-variant">
                <div class="flex flex-col items-center gap-2">
                    <span class="material-symbols-outlined text-4xl text-outline-variant">person_search</span>
                    <p class="text-xs">No patients found. Click "Add Patient" to add one.</p>
                </div>
            </td></tr>`;
        return;
    }

    tbody.innerHTML = patients.map(c => {
        const compColor = c.compliance >= 80 ? 'text-emerald-700 bg-emerald-50' : c.compliance >= 60 ? 'text-amber-700 bg-amber-50' : 'text-red-700 bg-red-50';
        const goalColors = {
            'Weight Loss': 'bg-blue-50 text-blue-700',
            'Muscle Gain': 'bg-purple-50 text-purple-700',
            'Maintenance': 'bg-teal-50 text-teal-700',
            'Therapeutic Diet': 'bg-orange-50 text-orange-700',
        };
        const goalColor = goalColors[c.goal] || 'bg-slate-100 text-slate-600';
        return `
            <tr class="hover:bg-surface-container-low transition-colors">
                <td class="px-6 py-4">
                    <div class="flex items-center gap-3">
                        <div class="w-8 h-8 rounded-full bg-secondary/10 text-secondary font-bold text-[11px] flex items-center justify-center shrink-0">${c.avatar || c.name?.split(' ').map(s=>s[0]).join('').slice(0,2).toUpperCase() || 'P'}</div>
                        <span class="font-semibold text-on-background text-xs">${c.name}</span>
                    </div>
                </td>
                <td class="px-6 py-4 text-on-surface-variant text-xs">${c.email || '—'}</td>
                <td class="px-6 py-4"><span class="font-bold text-[10px] px-2.5 py-1 rounded-full ${goalColor}">${c.goal}</span></td>
                <td class="px-6 py-4">
                    ${c.therapist
                        ? `<span class="bg-primary/8 text-primary font-semibold text-xs px-2.5 py-1 rounded-lg flex items-center gap-1 w-fit">
                                <span class="material-symbols-outlined text-[12px]">support_agent</span>${c.therapist}
                           </span>`
                        : `<span class="text-on-surface-variant text-xs italic">Not assigned</span>`}
                </td>
                <td class="px-6 py-4 text-center">
                    <span class="font-bold text-xs px-2.5 py-1 rounded-full ${compColor}">${c.compliance ?? '—'}%</span>
                </td>
                <td class="px-6 py-4">
                    <div class="flex items-center justify-end gap-2">
                        <button onclick="openAllocationModal('${c.name}')" class="text-tertiary hover:bg-tertiary/10 font-bold text-[10px] flex items-center gap-0.5 px-2.5 py-1.5 rounded-lg transition-all cursor-pointer" title="Assign Specialist">
                            <span class="material-symbols-outlined text-[14px]">swap_horiz</span> Assign
                        </button>
                        <button onclick="openEditPatientModal('${c.id}')" class="text-primary hover:bg-primary/10 font-bold text-[10px] flex items-center gap-0.5 px-2.5 py-1.5 rounded-lg transition-all cursor-pointer">
                            <span class="material-symbols-outlined text-[14px]">edit</span> Edit
                        </button>
                        <button onclick="deletePatient('${c.id}')" class="text-red-500 hover:bg-red-50 font-bold text-[10px] flex items-center gap-0.5 px-2.5 py-1.5 rounded-lg transition-all cursor-pointer">
                            <span class="material-symbols-outlined text-[14px]">delete</span> Delete
                        </button>
                    </div>
                </td>
            </tr>`;
    }).join('');
}

window.filterPatientsTable = function() {
    const q = document.getElementById('patient-search')?.value?.toLowerCase() || '';
    const filtered = state.clients.filter(c =>
        c.name?.toLowerCase().includes(q) || c.email?.toLowerCase().includes(q)
    );
    renderPatientsTable(filtered);
};

// ==================== PATIENT MODAL ====================
function populateSpecialistDropdown(selectId, selected = '') {
    const sel = document.getElementById(selectId);
    if (!sel) return;
    sel.innerHTML = `<option value="">— Not Assigned —</option>` +
        state.nutritionists.map(n => `<option value="${n.name}" ${n.name === selected ? 'selected' : ''}>${n.name} (${n.specialty})</option>`).join('');
}

window.openAddPatientModal = function() {
    state.editingPatientId = null;
    document.getElementById('patient-modal-title').innerText = 'Add Patient';
    document.getElementById('patient-modal-id').value = '';
    document.getElementById('patient-modal-name').value = '';
    document.getElementById('patient-modal-email').value = '';
    document.getElementById('patient-modal-goal').value = 'Weight Loss';
    document.getElementById('patient-modal-compliance').value = '';
    populateSpecialistDropdown('patient-modal-therapist', '');
    const m = document.getElementById('patient-modal');
    m.classList.remove('hidden'); m.classList.add('flex');
};

window.openEditPatientModal = function(patientId) {
    const p = state.clients.find(c => c.id === patientId);
    if (!p) return;
    state.editingPatientId = patientId;
    document.getElementById('patient-modal-title').innerText = 'Edit Patient';
    document.getElementById('patient-modal-id').value = p.id;
    document.getElementById('patient-modal-name').value = p.name;
    document.getElementById('patient-modal-email').value = p.email || '';
    document.getElementById('patient-modal-goal').value = p.goal || 'Weight Loss';
    document.getElementById('patient-modal-compliance').value = p.compliance ?? '';
    populateSpecialistDropdown('patient-modal-therapist', p.therapist || '');
    const m = document.getElementById('patient-modal');
    m.classList.remove('hidden'); m.classList.add('flex');
};

window.closePatientModal = function() {
    const m = document.getElementById('patient-modal');
    m.classList.add('hidden'); m.classList.remove('flex');
};

window.handleSavePatient = function(e) {
    e.preventDefault();
    const name = document.getElementById('patient-modal-name').value.trim();
    const email = document.getElementById('patient-modal-email').value.trim();
    const goal = document.getElementById('patient-modal-goal').value;
    const compliance = parseInt(document.getElementById('patient-modal-compliance').value) || 0;
    const therapist = document.getElementById('patient-modal-therapist').value;
    const avatar = name.split(' ').map(s => s[0]).join('').substring(0, 2).toUpperCase();

    if (state.editingPatientId) {
        // Edit existing
        const idx = state.clients.findIndex(c => c.id === state.editingPatientId);
        if (idx !== -1) {
            state.clients[idx] = { ...state.clients[idx], name, email, goal, compliance, therapist, avatar };
            showToast(`Patient "${name}" updated successfully!`, 'success');
        }
    } else {
        // Add new
        const newPatient = {
            id: `pat-${Date.now()}`,
            name, email, goal, compliance, therapist, avatar
        };
        state.clients.push(newPatient);
        showToast(`Patient "${name}" added successfully!`, 'success');
    }

    saveState();
    closePatientModal();
    renderPatientsTable();
    updateSummaryStats();
};

window.deletePatient = function(patientId) {
    const p = state.clients.find(c => c.id === patientId);
    if (!p) return;
    if (confirm(`Are you sure you want to remove patient "${p.name}"? This cannot be undone.`)) {
        state.clients = state.clients.filter(c => c.id !== patientId);
        saveState();
        renderPatientsTable();
        updateSummaryStats();
        showToast(`Patient "${p.name}" removed.`, 'info');
    }
};

// ==================== NUTRITIONISTS TABLE ====================
function renderNutritionistsTable() {
    const tbody = document.getElementById('nutritionists-table-body');
    if (!tbody) return;

    tbody.innerHTML = state.nutritionists.map(n => {
        const clientCount = state.clients.filter(c => c.therapist === n.name).length;
        const statusColor = n.status === 'active' ? 'text-emerald-700 bg-emerald-50' : 'text-slate-500 bg-slate-100';
        const dotColor = n.status === 'active' ? 'bg-emerald-500' : 'bg-slate-400';
        return `
            <tr class="hover:bg-surface-container-low transition-colors">
                <td class="px-6 py-4">
                    <div class="flex items-center gap-3">
                        <div class="w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-[11px] flex items-center justify-center shrink-0">${n.avatar || 'N'}</div>
                        <span class="font-semibold text-on-background text-xs">${n.name}</span>
                    </div>
                </td>
                <td class="px-6 py-4 text-on-surface-variant text-xs">${n.email}</td>
                <td class="px-6 py-4"><span class="bg-blue-50 text-blue-700 font-bold px-2.5 py-1 rounded-full text-[10px]">${n.specialty}</span></td>
                <td class="px-6 py-4">
                    <span class="inline-flex items-center gap-1.5 font-bold text-[10px] px-2.5 py-1 rounded-full ${statusColor}">
                        <span class="w-1.5 h-1.5 rounded-full ${dotColor}"></span>${n.status.toUpperCase()}
                    </span>
                </td>
                <td class="px-6 py-4 text-center font-bold text-on-background text-xs">${clientCount}</td>
                <td class="px-6 py-4">
                    <div class="flex items-center justify-end gap-2">
                        <button onclick="openEditNutritionistModal('${n.id}')" class="text-primary hover:bg-primary/10 font-bold text-[10px] flex items-center gap-0.5 px-2.5 py-1.5 rounded-lg transition-all cursor-pointer">
                            <span class="material-symbols-outlined text-[14px]">edit</span> Edit
                        </button>
                        <button onclick="deleteNutritionist('${n.id}')" class="text-red-500 hover:bg-red-50 font-bold text-[10px] flex items-center gap-0.5 px-2.5 py-1.5 rounded-lg transition-all cursor-pointer">
                            <span class="material-symbols-outlined text-[14px]">delete</span> Delete
                        </button>
                    </div>
                </td>
            </tr>`;
    }).join('');
}

window.openAddNutritionistModal = function() {
    document.getElementById('expert-name').value = '';
    document.getElementById('expert-email').value = '';
    document.getElementById('expert-specialty').value = 'Weight Management';
    document.getElementById('expert-status').value = 'active';
    const m = document.getElementById('add-nutritionist-modal');
    m.classList.remove('hidden'); m.classList.add('flex');
};

window.closeAddNutritionistModal = function() {
    const m = document.getElementById('add-nutritionist-modal');
    m.classList.add('hidden'); m.classList.remove('flex');
};

window.handleAddNutritionist = function(e) {
    e.preventDefault();
    const name = document.getElementById('expert-name').value.trim();
    const email = document.getElementById('expert-email').value.trim();
    const specialty = document.getElementById('expert-specialty').value;
    const status = document.getElementById('expert-status').value;
    const avatar = name.split(' ').map(s => s[0]).join('').substring(0, 2).toUpperCase();

    state.nutritionists.push({ id: `exp-${Date.now()}`, name, email, specialty, status, avatar });
    saveState();
    closeAddNutritionistModal();
    renderNutritionistsTable();
    updateSummaryStats();
    showToast(`Registered specialist "${name}" successfully!`, 'success');
};

window.openEditNutritionistModal = function(id) {
    const n = state.nutritionists.find(x => x.id === id);
    if (!n) return;
    document.getElementById('edit-expert-id').value = n.id;
    document.getElementById('edit-expert-name').value = n.name;
    document.getElementById('edit-expert-email').value = n.email;
    document.getElementById('edit-expert-specialty').value = n.specialty;
    document.getElementById('edit-expert-status').value = n.status;
    const m = document.getElementById('edit-nutritionist-modal');
    m.classList.remove('hidden'); m.classList.add('flex');
};

window.closeEditNutritionistModal = function() {
    const m = document.getElementById('edit-nutritionist-modal');
    m.classList.add('hidden'); m.classList.remove('flex');
};

window.handleEditNutritionist = function(e) {
    e.preventDefault();
    const id = document.getElementById('edit-expert-id').value;
    const name = document.getElementById('edit-expert-name').value.trim();
    const email = document.getElementById('edit-expert-email').value.trim();
    const specialty = document.getElementById('edit-expert-specialty').value;
    const status = document.getElementById('edit-expert-status').value;
    const avatar = name.split(' ').map(s => s[0]).join('').substring(0, 2).toUpperCase();

    const idx = state.nutritionists.findIndex(n => n.id === id);
    if (idx !== -1) {
        state.nutritionists[idx] = { ...state.nutritionists[idx], name, email, specialty, status, avatar };
    }
    saveState();
    closeEditNutritionistModal();
    renderNutritionistsTable();
    showToast(`Specialist "${name}" updated successfully!`, 'success');
};

window.deleteNutritionist = function(id) {
    const n = state.nutritionists.find(x => x.id === id);
    if (!n) return;
    if (confirm(`Are you sure you want to remove specialist "${n.name}"?`)) {
        state.nutritionists = state.nutritionists.filter(x => x.id !== id);
        saveState();
        renderNutritionistsTable();
        updateSummaryStats();
        showToast(`Specialist "${n.name}" removed.`, 'info');
    }
};



window.openAllocationModal = function(clientName) {
    state.selectedClientForAllocation = clientName;
    document.getElementById('allocation-client-name').innerText = clientName;
    const currentClient = state.clients.find(c => c.name === clientName);
    const select = document.getElementById('allocation-expert-select');
    if (select) {
        select.innerHTML = `<option value="">— Not Assigned —</option>` +
            state.nutritionists.map(n => `<option value="${n.name}" ${n.name === currentClient?.therapist ? 'selected' : ''}>${n.name} (${n.specialty})</option>`).join('');
    }
    const m = document.getElementById('edit-allocation-modal');
    m.classList.remove('hidden'); m.classList.add('flex');
};

window.closeEditAllocationModal = function() {
    const m = document.getElementById('edit-allocation-modal');
    m.classList.add('hidden'); m.classList.remove('flex');
};

window.saveAllocationChange = function() {
    const expert = document.getElementById('allocation-expert-select').value;
    const client = state.clients.find(c => c.name === state.selectedClientForAllocation);
    if (client) {
        client.therapist = expert || null;
        saveState();
        closeEditAllocationModal();
        renderPatientsTable();
        showToast(`Assigned "${expert || 'none'}" to ${state.selectedClientForAllocation}!`, 'success');
    }
};

// ==================== TOASTS ====================
function showToast(message, type = 'success') {
    const toast = document.getElementById('admin-toast');
    const toastText = document.getElementById('toast-text');
    const toastIcon = document.getElementById('toast-icon');
    if (!toast || !toastText) return;
    toastText.innerText = message;
    if (type === 'success') {
        toastIcon.innerText = 'check_circle';
        toastIcon.className = 'material-symbols-outlined text-primary text-base';
    } else {
        toastIcon.innerText = 'info';
        toastIcon.className = 'material-symbols-outlined text-secondary text-base';
    }
    toastIcon.style.fontVariationSettings = "'FILL' 1";
    toast.classList.remove('translate-y-20', 'opacity-0');
    toast.classList.add('translate-y-0', 'opacity-100');
    setTimeout(() => {
        toast.classList.add('translate-y-20', 'opacity-0');
        toast.classList.remove('translate-y-0', 'opacity-100');
    }, 3000);
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
    const ctxSuccess = document.getElementById('adminSuccessTrendsChartCanvas');
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
                backgroundColor: 'rgba(0, 106, 97, 0.07)',
                borderWidth: 2.5,
                pointBackgroundColor: '#006a61',
                pointBorderColor: '#ffffff',
                pointBorderWidth: 2,
                tension: 0.35,
                fill: true
            }]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                y: { grid: { color: 'rgba(0,0,0,0.04)' }, ticks: { color: '#43493e', font: { size: 10 } } },
                x: { grid: { display: false }, ticks: { color: '#43493e', font: { size: 10 } } }
            }
        }
    });
}
