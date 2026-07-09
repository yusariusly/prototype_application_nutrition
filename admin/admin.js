// NutriFlow Admin Application Logic

// ==================== STATE MANAGEMENT ====================
const state = {
    activeView: 'admin-clients',
    appointments: [],
    clients: [
        { name: 'Sarah Jenkins', email: 'sarah.j@email.com', goal: 'Weight Loss', lastCheckIn: 'Today, 9:00 AM', compliance: 92, weightTrend: [168, 169, 170, 173, 174, 176], avatar: 'SJ' },
        { name: 'Marcus Reid', email: 'm.reid@email.com', goal: 'Muscle Gain', lastCheckIn: '2 days ago', compliance: 78, weightTrend: [180, 182, 181, 183, 182, 185], avatar: 'MR' },
        { name: 'Elena Lopez', email: 'elena.l@email.com', goal: 'Maintenance', lastCheckIn: 'Yesterday', compliance: 95, weightTrend: [142, 142, 141, 142, 142, 142], avatar: 'EL' }
    ],
    foodLibrary: [
        { id: 'f-1', title: 'Avocado Egg Toast', type: 'Recipes', calories: 320, p: 14, c: 22, f: 18, image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=200', favorite: true },
        { id: 'f-2', title: 'Grilled Chicken Salad', type: 'Recipes', calories: 450, p: 45, c: 12, f: 20, image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200', favorite: true },
        { id: 'f-3', title: 'Greek Yogurt Bowl', type: 'Recipes', calories: 250, p: 20, c: 30, f: 5, image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=200', favorite: true },
        { id: 'f-4', title: 'Baked Salmon & Quinoa', type: 'Recipes', calories: 520, p: 38, c: 45, f: 22, image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=200', favorite: true },
        { id: 'f-5', title: 'Fresh Apple & Almonds', type: 'Raw Foods', calories: 150, p: 4, c: 18, f: 9, image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=200', favorite: false },
        { id: 'f-6', title: 'Mixed Raw Berries', type: 'Raw Foods', calories: 85, p: 1, c: 21, f: 0.5, image: 'https://images.unsplash.com/photo-1518635017498-87f514b751ba?w=200', favorite: false }
    ],
    clientMealPlans: {},
    selectedMealBuilderClient: 'Sarah Jenkins',
    adminSelectedFoodFilter: 'all',
    adminCalendarOffset: 0,
    clientsPage: 0
};

let successTrendsChartInstance = null;

// ==================== SESSION CHECK ====================
function checkAdminSession() {
    if (localStorage.getItem('nutriflow_admin_logged') !== 'true') {
        window.location.href = './login.html';
    }
}

// ==================== STATE SYNC ====================
function loadAdminState() {
    // Load appointments booked by Client
    if (localStorage.getItem('nutriflow_appointments')) {
        state.appointments = JSON.parse(localStorage.getItem('nutriflow_appointments'));
    } else {
        state.appointments = [
            {
                id: 'apt-1',
                clientName: 'Sarah Jenkins',
                clientEmail: 'sarah.j@email.com',
                serviceId: 'initial-consultation',
                serviceTitle: 'Monthly Progress Review',
                price: 150,
                duration: '60 min',
                therapist: 'Dr. Sarah Jenkins',
                date: '2024-10-24',
                time: '10:00 AM',
                status: 'approved',
                type: 'Video Call'
            },
            {
                id: 'apt-2',
                clientName: 'Sarah Jenkins',
                clientEmail: 'sarah.j@email.com',
                serviceId: 'follow-up',
                serviceTitle: 'Meal Plan Adjustment',
                price: 75,
                duration: '30 min',
                therapist: 'Mark Davies',
                date: '2024-11-05',
                time: '02:30 PM',
                status: 'approved',
                type: 'In-Person'
            },
            {
                id: 'apt-3',
                clientName: 'Michael Chang',
                clientEmail: 'm.chang@email.com',
                serviceId: 'follow-up',
                serviceTitle: 'Follow-up & Macros Review',
                price: 75,
                duration: '30 min',
                therapist: 'Dr. Eleanor Vance, RD',
                date: '2024-10-15',
                time: '02:00 PM',
                status: 'approved',
                type: 'Video Call'
            },
            {
                id: 'apt-4',
                clientName: 'Emma Watson',
                clientEmail: 'emma@email.com',
                serviceId: 'body-composition',
                serviceTitle: 'Dietary Adjustments Scan',
                price: 120,
                duration: '45 min',
                therapist: 'Dr. Sarah Jenkins',
                date: '2024-10-15',
                time: '03:30 PM',
                status: 'approved',
                type: 'In-Person'
            }
        ];
        saveAdminState();
    }
    
    // Load Meal Plans
    if (localStorage.getItem('nutriflow_client_meal_plans')) {
        state.clientMealPlans = JSON.parse(localStorage.getItem('nutriflow_client_meal_plans'));
    } else {
        // Init mock plans
        state.clientMealPlans = {
            'Sarah Jenkins': {
                'Mon': [
                    { type: 'Breakfast', title: 'Avocado Egg Toast', calories: 320, p: 14, c: 22, f: 18 },
                    { type: 'Lunch', title: 'Grilled Chicken Salad', calories: 450, p: 45, c: 12, f: 20 }
                ],
                'Tue': [
                    { type: 'Breakfast', title: 'Greek Yogurt Bowl', calories: 250, p: 20, c: 30, f: 5 }
                ],
                'Wed': [
                    { type: 'Breakfast', title: 'Berry Protein Smoothie Bowl', calories: 350, p: 30, c: 45, f: 8, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAhdLncVr5YHSg696oNNaWNcDNX27FpwShpuVV2sROhcLkU1xYKMhi-UtErJlr9jpaS1aHCEsYwaHknma9nw7SgPy1Fhbq3qbe0s13GK6BowfyxFbOHwCJIJQLBIWAEJ8-y7WFQl-rQadTyMya_y1kGIlKkclrRz4YAo636MVND2hDJ_kt5PVntLx-dw-UhQPiKXFvsUtAHf3MUYe_dhx77FGOyLPOJ4_BRXE7wQfQQrYmmQ4zb0E2J3A' },
                    { type: 'Lunch', title: 'Quinoa Buddha Bowl', calories: 450, p: 15, c: 65, f: 18, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBEJYji3THZ26fZU1y7s_UlX3R5JiXYh8bDKQCgoB_eeBrxiKFJKp983-OzaHO2s7bOGibm_Ffq78DZMIj37z6OO73EXDwTwUKe7WEXsg1ejJE92FBq-nT19yX8htJOacJuuKupzenZJZZPm_6PtBatL55KP4abBQyqSrEMeSFnzbk1OzrX8qcm8ByqZ6WrAMGgLkkRh7lCkTEF5E8WTVQEvDVIoyGeZykvJ7PO6fmFFWMRZ_FlYGtFOw' },
                    { type: 'Snack', title: 'Mixed Nuts & Apple', calories: 200, p: 5, c: 25, f: 10, image: 'https://images.unsplash.com/photo-1596560548464-f01068e3dbf0?w=200' },
                    { type: 'Dinner', title: 'Grilled Salmon & Asparagus', calories: 520, p: 42, c: 12, f: 32, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCmYwtQEKZuQeHbBcF8Z60P_F01JjQ-P01ItJBoz7lWy-FK2NVaEJb3Hqy6oemYRu6b2zWfF5bmfKj9u6PC4JZtGsHvyyUYGgU5hMj-BLnCgmbTc5VDZy-QI6zc259LqW5YPX2r_aCLcW5xsQzLAzlALozsVfWYENWIhLDvaf3jCLuApaunpIs9t0u-hPB3Rhks8C5OQ8Y2RQPiuPrtWg7JqSsunfQMLXnpQ4zAhuIl_qhOzqjCGJJPpw' }
                ]
            }
        };
        saveAdminState();
    }
    
    // Ensure Wednesday snack is present in local cache for demonstration
    if (state.clientMealPlans['Sarah Jenkins'] && state.clientMealPlans['Sarah Jenkins']['Wed']) {
        if (!state.clientMealPlans['Sarah Jenkins']['Wed'].find(m => m.type.toLowerCase() === 'snack')) {
            state.clientMealPlans['Sarah Jenkins']['Wed'].push({
                type: 'Snack',
                title: 'Mixed Nuts & Apple',
                calories: 200,
                p: 5,
                c: 25,
                f: 10,
                image: 'https://images.unsplash.com/photo-1596560548464-f01068e3dbf0?w=200'
            });
            saveAdminState();
        }
    }
}

function saveAdminState() {
    localStorage.setItem('nutriflow_appointments', JSON.stringify(state.appointments));
    localStorage.setItem('nutriflow_client_meal_plans', JSON.stringify(state.clientMealPlans));
}

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', () => {
    checkAdminSession();
    loadAdminState();
    navigateTo('admin-clients');
});

// ==================== TOASTS ====================
window.showToast = function(message, type = 'success') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    // Overwrite previous toasts instead of stacking them
    container.innerHTML = '';

    const toast = document.createElement('div');
    toast.className = `p-4 rounded-xl shadow-lg text-white font-semibold text-xs flex items-center gap-3 transition-all duration-300 transform translate-y-4 opacity-0 border`;
    
    if (type === 'success') {
        toast.className += ' bg-[#006e2f] border-[#005321]';
    } else if (type === 'error') {
        toast.className += ' bg-red-600 border-red-800';
    } else {
        toast.className += ' bg-[#006a61] border-[#005049]';
    }

    toast.innerHTML = `
        <span class="material-symbols-outlined text-[20px]">${type === 'error' ? 'error' : 'check_circle'}</span>
        <span>${message}</span>
    `;

    container.appendChild(toast);
    setTimeout(() => toast.classList.remove('translate-y-4', 'opacity-0'), 50);
    setTimeout(() => {
        toast.classList.add('translate-y-[-10px]', 'opacity-0');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
};

// ==================== ROUTER ====================
window.navigateTo = function(viewId) {
    state.activeView = viewId;
    
    document.querySelectorAll('.view-section').forEach(sec => sec.classList.add('hidden'));
    const activeSec = document.getElementById('view-' + viewId);
    if (activeSec) activeSec.classList.remove('hidden');

    document.querySelectorAll('.nav-link').forEach(link => {
        link.className = 'nav-link h-full flex items-center text-on-surface-variant hover:text-primary font-label-md text-label-md transition-colors px-3 cursor-pointer';
    });
    const activeLink = document.getElementById(`link-${viewId}`);
    if (activeLink) {
        activeLink.className = 'nav-link h-full flex items-center text-primary font-bold border-b-2 border-primary font-label-md text-label-md px-3 cursor-pointer';
    }

    if (viewId === 'admin-clients') {
        renderAdminClientsList();
    } else if (viewId === 'admin-meal-builder') {
        renderAdminMealBuilder();
    } else if (viewId === 'admin-calendar') {
        renderAdminCalendar();
    } else if (viewId === 'admin-reports') {
        setTimeout(initAdminReportsCharts, 50);
    }
};

window.handleAdminSignOut = function() {
    localStorage.removeItem('nutriflow_admin_logged');
    showToast('Signed out of Admin account.');
    setTimeout(() => {
        window.location.href = './login.html';
    }, 1000);
};

// ==================== CLIENTS LIST ====================
function renderAdminClientsList() {
    const tbody = document.getElementById('admin-clients-table-body');
    if (!tbody) return;
    
    // Recalculate and update top KPIs dynamically
    const totalClients = state.clients.length;
    const avgCompliance = totalClients > 0 ? Math.round(state.clients.reduce((acc, c) => acc + c.compliance, 0) / totalClients) : 0;
    const consultationsToday = state.appointments.filter(a => a.status === 'approved').length;
    
    const metricClients = document.getElementById('admin-metric-clients');
    const metricCompliance = document.getElementById('admin-metric-compliance');
    const metricConsultations = document.getElementById('admin-metric-consultations');
    
    if (metricClients) metricClients.innerText = totalClients;
    if (metricCompliance) metricCompliance.innerText = `${avgCompliance}%`;
    if (metricConsultations) metricConsultations.innerText = consultationsToday;

    const query = document.getElementById('admin-client-search').value.toLowerCase();
    const goalFilter = document.getElementById('admin-client-filter-goal').value;

    const filtered = state.clients.filter(cli => {
        const matchesQuery = cli.name.toLowerCase().includes(query) || cli.email.toLowerCase().includes(query);
        const matchesGoal = goalFilter === 'all' || cli.goal === goalFilter;
        return matchesQuery && matchesGoal;
    });

    if (filtered.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" class="p-6 text-center text-on-surface-variant font-semibold">No clients matching current criteria.</td></tr>`;
        document.getElementById('admin-clients-count-label').innerText = 'Showing 0 clients';
        return;
    }

    // Pagination sizing
    const pageSize = 5;
    const maxPage = Math.ceil(filtered.length / pageSize) - 1;
    if (state.clientsPage > maxPage) state.clientsPage = Math.max(0, maxPage);
    
    const startIdx = state.clientsPage * pageSize;
    const pageItems = filtered.slice(startIdx, startIdx + pageSize);

    tbody.innerHTML = pageItems.map(cli => {
        return `
            <tr class="hover:bg-surface-container-low/30 transition-colors">
                <td class="p-4 pl-6">
                    <div class="flex items-center gap-2">
                        <div class="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">${cli.avatar}</div>
                        <div>
                            <div class="font-bold text-on-background">${cli.name}</div>
                            <div class="text-[10px] text-on-surface-variant/80">${cli.email}</div>
                        </div>
                    </div>
                </td>
                <td class="p-4"><span class="bg-[#e5eeff] text-[#006a61] px-2 py-0.5 rounded text-[10px] font-semibold">${cli.goal}</span></td>
                <td class="p-4 text-on-surface-variant">${cli.lastCheckIn}</td>
                <td class="p-4">
                    <div class="flex items-center gap-1.5 font-bold">
                        <div class="w-16 bg-surface-variant h-1.5 rounded-full overflow-hidden">
                            <div class="bg-primary h-full" style="width: ${cli.compliance}%"></div>
                        </div>
                        <span>${cli.compliance}%</span>
                    </div>
                </td>
                <td class="p-4 w-28">
                    <svg class="w-full h-8" viewBox="0 0 100 30">
                        <path d="M 0 25 Q 20 10, 40 20 T 80 5 T 100 15" fill="none" stroke="${cli.compliance > 80 ? '#006e2f' : '#9d4300'}" stroke-width="2"></path>
                    </svg>
                </td>
                <td class="p-4 pr-6 text-right space-x-1">
                    <button onclick="handleAdminAction('${cli.name}', 'chat')" class="p-1 hover:text-primary transition-colors inline-block cursor-pointer" title="Send message"><span class="material-symbols-outlined text-[18px]">chat</span></button>
                    <button onclick="handleAdminAction('${cli.name}', 'edit-diet')" class="p-1 hover:text-[#006a61] transition-colors inline-block cursor-pointer" title="Manage meal plans"><span class="material-symbols-outlined text-[18px]">restaurant_menu</span></button>
                </td>
            </tr>
        `;
    }).join('');

    const endIdx = Math.min(startIdx + pageSize, filtered.length);
    document.getElementById('admin-clients-count-label').innerText = `Showing ${startIdx + 1} to ${endIdx} of ${filtered.length} clients`;

    // Enable/disable page controls
    const prevBtn = document.getElementById('admin-pagination-prev');
    const nextBtn = document.getElementById('admin-pagination-next');
    if (prevBtn) prevBtn.disabled = (state.clientsPage === 0);
    if (nextBtn) nextBtn.disabled = (state.clientsPage >= maxPage);
}

window.changeAdminClientsPage = function(direction) {
    state.clientsPage += direction;
    renderAdminClientsList();
};

window.filterAdminClients = function() {
    state.clientsPage = 0;
    renderAdminClientsList();
};

// Simulated Chat State & Handlers
let activeChatClient = '';
const defaultChats = {
    'Sarah Jenkins': [
        { sender: 'client', text: 'Hi doc, I have been feeling a bit bloated after Wednesday\'s afternoon snack.' },
        { sender: 'doctor', text: 'Understood Sarah, let\'s discuss adjusting your complex carb portion sizing during our next video call!' }
    ]
};

window.handleAdminAction = function(name, action) {
    if (action === 'edit-diet') {
        state.selectedMealBuilderClient = name;
        document.getElementById('meal-builder-client-select').value = name;
        navigateTo('admin-meal-builder');
        showToast(`Loaded meal builder for ${name}`, 'info');
    } else if (action === 'chat') {
        openAdminChatModal(name);
    }
};

window.openAdminChatModal = function(name) {
    activeChatClient = name;
    document.getElementById('chat-client-name').innerText = name;
    document.getElementById('chat-client-avatar').innerText = name.split(' ').map(n => n[0]).join('').toUpperCase();
    
    // Load chat messages
    const chatContainer = document.getElementById('chat-messages-container');
    if (!chatContainer) return;
    
    let chatHistory = JSON.parse(localStorage.getItem(`nutriflow_chat_${name}`)) || defaultChats[name] || [
        { sender: 'client', text: 'Hello! Can we check my daily protein limits?' }
    ];
    
    chatContainer.innerHTML = chatHistory.map(msg => {
        const isClient = msg.sender === 'client';
        return `
            <div class="flex flex-col ${isClient ? 'items-start' : 'items-end'} w-full">
                <div class="px-3.5 py-2.5 rounded-2xl max-w-[80%] text-xs font-semibold ${isClient ? 'bg-surface-variant text-on-surface' : 'bg-primary text-white'} shadow-sm">
                    ${msg.text}
                </div>
            </div>
        `;
    }).join('');
    
    // Scroll to bottom
    setTimeout(() => { chatContainer.scrollTop = chatContainer.scrollHeight; }, 50);

    const modal = document.getElementById('admin-chat-modal');
    modal.classList.remove('hidden');
    modal.classList.add('flex');
};

window.closeAdminChatModal = function() {
    const modal = document.getElementById('admin-chat-modal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
};

window.handleSendAdminChatMessage = function(e) {
    e.preventDefault();
    const input = document.getElementById('admin-chat-input');
    if (!input || !input.value.trim()) return;

    const messageText = input.value.trim();
    input.value = '';

    const chatContainer = document.getElementById('chat-messages-container');
    
    let chatHistory = JSON.parse(localStorage.getItem(`nutriflow_chat_${activeChatClient}`)) || defaultChats[activeChatClient] || [
        { sender: 'client', text: 'Hello! Can we check my daily protein limits?' }
    ];

    // Push doctor message
    chatHistory.push({ sender: 'doctor', text: messageText });
    localStorage.setItem(`nutriflow_chat_${activeChatClient}`, JSON.stringify(chatHistory));

    // Render doctor message
    const docMsgHtml = `
        <div class="flex flex-col items-end w-full">
            <div class="px-3.5 py-2.5 rounded-2xl max-w-[80%] text-xs font-semibold bg-primary text-white shadow-sm">
                ${messageText}
            </div>
        </div>
    `;
    chatContainer.innerHTML += docMsgHtml;
    chatContainer.scrollTop = chatContainer.scrollHeight;

    // Simulate client response
    setTimeout(() => {
        let replies = [
            'Thank you doctor! I will adjust my snacks accordingly.',
            'Got it, I just saw the updated goals in my client portal. Thanks!',
            'Understood, I will log my water glasses now.',
            'Perfect! See you at our next video consultation call.'
        ];
        const randomReply = replies[Math.floor(Math.random() * replies.length)];
        
        chatHistory.push({ sender: 'client', text: randomReply });
        localStorage.setItem(`nutriflow_chat_${activeChatClient}`, JSON.stringify(chatHistory));

        const clientMsgHtml = `
            <div class="flex flex-col items-start w-full">
                <div class="px-3.5 py-2.5 rounded-2xl max-w-[80%] text-xs font-semibold bg-surface-variant text-on-surface shadow-sm">
                    ${randomReply}
                </div>
            </div>
        `;
        chatContainer.innerHTML += clientMsgHtml;
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }, 1500);
};

window.showAddNewClientModal = function() {
    document.getElementById('add-client-modal').classList.remove('hidden');
    document.getElementById('add-client-modal').classList.add('flex');
};

window.closeAddNewClientModal = function() {
    document.getElementById('add-client-modal').classList.add('hidden');
    document.getElementById('add-client-modal').classList.remove('flex');
};

window.handleAddNewClientSubmit = function(e) {
    e.preventDefault();
    const name = document.getElementById('new-client-name').value;
    const email = document.getElementById('new-client-email').value;
    const goal = document.getElementById('new-client-goal').value;
    const initials = name.split(' ').map(n => n[0]).join('').toUpperCase();
    
    state.clients.push({
        name: name,
        email: email,
        goal: goal,
        lastCheckIn: 'Never',
        compliance: 100,
        weightTrend: [160, 160],
        avatar: initials
    });

    closeAddNewClientModal();
    renderAdminClientsList();
    showToast(`Added client ${name}!`, 'success');
};

// ==================== WEEKLY MEAL BUILDER ====================
function renderAdminMealBuilder() {
    loadMealBuilderClientPlan();
    renderLibraryList();
}

window.loadMealBuilderClientPlan = function() {
    const select = document.getElementById('meal-builder-client-select');
    if (!select) return;
    
    state.selectedMealBuilderClient = select.value;
    
    // Load targets from local storage or fallback to defaults
    const kcal = localStorage.getItem('nutriflow_client_calories_target') || 2000;
    const kcalInput = document.getElementById('target-kcal');
    if (kcalInput) kcalInput.value = kcal;

    renderWeeklyMealTable();
};

window.saveClientTargets = function() {
    const kcal = document.getElementById('target-kcal').value || 2000;
    localStorage.setItem('nutriflow_client_calories_target', kcal);
    renderWeeklyTotalsSummary();
    showToast(`Targets for ${state.selectedMealBuilderClient} updated to ${kcal} kcal/day`, 'success');
};

window.setLibraryFilter = function(filter) {
    state.adminSelectedFoodFilter = filter;
    
    // Toggle active class on chips
    const chips = document.querySelectorAll('.library-chip');
    chips.forEach(chip => {
        const text = chip.innerText.trim();
        if (filter === 'all' && text === 'All') {
            chip.className = 'library-chip active bg-primary text-white text-[10px] font-bold px-3 py-1 rounded-full hover:opacity-95 transition-all';
        } else if (text.toLowerCase() === filter.toLowerCase()) {
            chip.className = 'library-chip active bg-primary text-white text-[10px] font-bold px-3 py-1 rounded-full hover:opacity-95 transition-all';
        } else {
            chip.className = 'library-chip bg-surface-container border text-[10px] font-bold text-on-surface-variant px-3 py-1 rounded-full hover:opacity-95 transition-all';
        }
    });
    
    renderLibraryList();
};

window.filterLibraryFoods = function() {
    renderLibraryList();
};

function renderLibraryList() {
    const container = document.getElementById('library-list-container');
    if (!container) return;
    
    const query = (document.getElementById('library-search')?.value || '').toLowerCase();
    const activeFilter = state.adminSelectedFoodFilter || 'all';
    
    const filtered = state.foodLibrary.filter(f => {
        const matchesQuery = f.title.toLowerCase().includes(query) || (f.type || '').toLowerCase().includes(query);
        const matchesFilter = activeFilter === 'all' || 
            (activeFilter === 'Recipes' && (f.type === 'Recipes' || f.type.toLowerCase().includes('recipe'))) ||
            (activeFilter === 'Raw Foods' && (f.type === 'Raw Foods' || f.type.toLowerCase().includes('raw'))) ||
            (activeFilter === 'Favorites' && f.favorite);
        return matchesQuery && matchesFilter;
    });
    
    if (filtered.length === 0) {
        container.innerHTML = `<div class="text-[10px] text-on-surface-variant font-medium text-center py-6">No foods found.</div>`;
        return;
    }
    
    container.innerHTML = filtered.map(f => `
        <div class="bg-surface border border-outline-variant/20 rounded-xl p-2.5 flex gap-2.5 items-center hover:border-primary/45 transition-colors">
            <div class="w-10 h-10 rounded-lg overflow-hidden bg-slate-100 shrink-0">
                <img class="w-full h-full object-cover" src="${f.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100'}" alt="${f.title}">
            </div>
            <div class="min-w-0 flex-grow text-left">
                <h4 class="font-bold text-xs text-on-background truncate" title="${f.title}">${f.title}</h4>
                <p class="text-[9px] text-on-surface-variant font-semibold mt-0.5">${f.calories} kcal</p>
                <p class="text-[8px] text-on-surface-variant/80 font-medium">P:${f.p}g • C:${f.c}g • F:${f.f}g</p>
            </div>
        </div>
    `).join('');
}

function renderWeeklyMealTable() {
    const tbody = document.getElementById('weekly-meal-table-body');
    if (!tbody) return;
    
    const client = state.selectedMealBuilderClient;
    const clientPlan = state.clientMealPlans[client] || {};
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const rowTypes = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];
    
    let html = '';
    
    rowTypes.forEach(rowType => {
        html += `<tr class="hover:bg-slate-50/50 transition-colors">`;
        html += `<td class="p-3 font-bold text-center border-r border-outline-variant/20 bg-surface-container-low/20 align-middle text-on-surface">${rowType}</td>`;
        
        days.forEach(day => {
            const meals = (clientPlan[day] || []).filter(m => m.type.toLowerCase() === rowType.toLowerCase());
            
            html += `<td class="p-3 border-r border-outline-variant/20 align-top relative min-h-[100px]">`;
            html += `<div class="flex flex-col gap-2">`;
            
            meals.forEach(m => {
                html += `
                    <div class="bg-surface border border-outline-variant/30 rounded-xl p-2 flex flex-col gap-1 relative shadow-sm text-[10px] text-left">
                        <button onclick="removeFoodFromSlot('${day}', '${rowType}', '${m.title}')" class="absolute top-1.5 right-1.5 text-on-surface-variant hover:text-red-600 transition-colors flex items-center justify-center cursor-pointer shrink-0">
                            <span class="material-symbols-outlined text-[12px] font-bold">close</span>
                        </button>
                        <div class="font-bold text-on-background pr-4 truncate" title="${m.title}">${m.title}</div>
                        <div class="text-[9px] text-[#006e2f] font-semibold">${m.calories} kcal</div>
                        <div class="text-[8px] text-on-surface-variant/80 font-medium">P:${m.p}g · C:${m.c}g · F:${m.f}g</div>
                    </div>
                `;
            });
            
            html += `
                <button onclick="openAssignFoodModal('${day}', '${rowType}')" class="w-full border border-dashed border-outline-variant/30 hover:border-primary/60 hover:bg-primary/5 rounded-xl py-2 flex items-center justify-center text-outline-variant/80 hover:text-primary transition-all cursor-pointer">
                    <span class="material-symbols-outlined text-sm">add</span>
                </button>
            `;
            
            html += `</div>`;
            html += `</td>`;
        });
        
        html += `</tr>`;
    });
    
    tbody.innerHTML = html;
    
    renderWeeklyTotalsSummary();
}

function renderWeeklyTotalsSummary() {
    const container = document.getElementById('weekly-totals-summary-container');
    if (!container) return;
    
    const client = state.selectedMealBuilderClient;
    const clientPlan = state.clientMealPlans[client] || {};
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const targetKcal = parseInt(document.getElementById('target-kcal').value) || 2000;
    
    let html = '';
    html += `<h4 class="text-xs font-bold uppercase tracking-wider text-on-surface mb-3 flex items-center gap-2">`;
    html += `<span class="material-symbols-outlined text-primary text-base">analytics</span> Weekly Nutrition Summary`;
    html += `</h4>`;
    
    html += `<div class="grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-7 gap-3">`;
    
    days.forEach(day => {
        const meals = clientPlan[day] || [];
        let kcal = 0;
        let p = 0;
        let c = 0;
        let f = 0;
        
        meals.forEach(m => {
            kcal += m.calories;
            p += m.p || 0;
            c += m.c || 0;
            f += m.f || 0;
        });
        
        const pct = Math.min((kcal / targetKcal) * 100, 100);
        
        html += `
            <div class="bg-surface rounded-xl p-3 border border-outline-variant/20 shadow-sm flex flex-col gap-1.5">
                <div class="flex justify-between items-center">
                    <span class="font-bold text-[11px] text-on-background">${day} Totals</span>
                    <span class="font-bold text-[10px] text-primary">${kcal} kcal</span>
                </div>
                <div class="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div class="bg-[#006e2f] h-full rounded-full transition-all" style="width: ${pct}%"></div>
                </div>
                <div class="flex justify-between items-center text-[9px] text-on-surface-variant font-medium mt-1">
                    <span>P: <b>${p}g</b></span>
                    <span>C: <b>${c}g</b></span>
                    <span>F: <b>${f}g</b></span>
                </div>
            </div>
        `;
    });
    
    html += `</div>`;
    
    container.innerHTML = html;
}

window.openAssignFoodModal = function(day, mealType) {
    state.activeAssignDay = day;
    state.activeAssignMealType = mealType;
    
    document.getElementById('assign-food-day-label').innerText = day;
    document.getElementById('assign-food-type-label').innerText = mealType;
    
    const container = document.getElementById('assign-food-options-container');
    if (container) {
        container.innerHTML = state.foodLibrary.map(f => `
            <div onclick="assignFoodToSlot('${f.id}')" class="bg-surface hover:bg-primary/5 border border-outline-variant/30 rounded-xl p-3 flex gap-3 items-center cursor-pointer transition-all">
                <div class="w-10 h-10 rounded-lg overflow-hidden bg-slate-100 shrink-0">
                    <img class="w-full h-full object-cover" src="${f.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100'}" alt="${f.title}">
                </div>
                <div class="min-w-0 flex-grow text-left">
                    <h4 class="font-bold text-xs text-on-background truncate">${f.title}</h4>
                    <p class="text-[9px] text-on-surface-variant font-medium mt-0.5">${f.calories} kcal · P:${f.p}g • C:${f.c}g • F:${f.f}g</p>
                </div>
                <span class="material-symbols-outlined text-primary text-base">add_circle</span>
            </div>
        `).join('');
    }
    
    document.getElementById('assign-food-modal').classList.remove('hidden');
    document.getElementById('assign-food-modal').classList.add('flex');
};

window.closeAssignFoodModal = function() {
    document.getElementById('assign-food-modal').classList.add('hidden');
    document.getElementById('assign-food-modal').classList.remove('flex');
};

window.assignFoodToSlot = function(foodId) {
    const food = state.foodLibrary.find(f => f.id === foodId);
    if (!food) return;
    
    const client = state.selectedMealBuilderClient;
    if (!state.clientMealPlans[client]) {
        state.clientMealPlans[client] = {};
    }
    const day = state.activeAssignDay;
    if (!state.clientMealPlans[client][day]) {
        state.clientMealPlans[client][day] = [];
    }
    
    state.clientMealPlans[client][day].push({
        type: state.activeAssignMealType,
        title: food.title,
        calories: food.calories,
        p: food.p,
        c: food.c,
        f: food.f,
        image: food.image
    });
    
    saveAdminState();
    closeAssignFoodModal();
    renderWeeklyMealTable();
};

window.removeFoodFromSlot = function(day, mealType, foodTitle) {
    const client = state.selectedMealBuilderClient;
    if (!state.clientMealPlans[client] || !state.clientMealPlans[client][day]) return;
    
    state.clientMealPlans[client][day] = state.clientMealPlans[client][day].filter(
        m => !(m.type.toLowerCase() === mealType.toLowerCase() && m.title === foodTitle)
    );
    
    saveAdminState();
    renderWeeklyMealTable();
};

window.publishWeeklyPlanToClient = function() {
    saveAdminState();
    showToast(`Weekly meal plan for ${state.selectedMealBuilderClient} published successfully!`, 'success');
};

window.saveWeeklyTemplate = function() {
    showToast(`Weekly meal template saved successfully!`, 'success');
};

// ==================== CALENDAR ====================
function renderAdminCalendar() {
    loadAdminState(); // sync fresh appointments from LocalStorage
    
    const pendList = document.getElementById('admin-pending-requests-list');
    if (!pendList) return;
    
    const pendings = state.appointments.filter(a => a.status === 'pending');
    
    if (pendings.length === 0) {
        pendList.innerHTML = `<div class="text-xs text-on-surface-variant font-medium text-center py-4">No pending requests.</div>`;
    } else {
        pendList.innerHTML = pendings.map(apt => `
            <div class="bg-surface-container-low p-4 rounded-xl border border-surface-variant/35 flex flex-col gap-2 relative">
                <div>
                    <h4 class="font-bold text-on-background text-xs leading-tight">${apt.clientName}</h4>
                    <p class="text-[9px] text-on-surface-variant mt-0.5">${apt.serviceTitle}</p>
                    <p class="text-[9px] text-[#006e2f] font-bold mt-1">${apt.date} • ${apt.time}</p>
                </div>
                <div class="flex gap-2 mt-1">
                    <button onclick="approveAppointment('${apt.id}')" class="bg-primary hover:bg-[#005321] text-white font-bold text-[9px] px-2.5 py-1 rounded-lg">Accept</button>
                    <button onclick="declineAppointment('${apt.id}')" class="border border-outline-variant/30 hover:bg-surface-container text-on-surface-variant font-bold text-[9px] px-2.5 py-1 rounded-lg">Decline</button>
                </div>
            </div>
        `).join('');
    }

    const adminUpcomingList = document.getElementById('admin-upcoming-consultations-list');
    if (adminUpcomingList) {
        const upcomingApproved = state.appointments.filter(a => a.status === 'approved');
        if (upcomingApproved.length === 0) {
            adminUpcomingList.innerHTML = `<div class="text-xs text-on-surface-variant font-medium text-center py-4">No approved consultations.</div>`;
        } else {
            adminUpcomingList.innerHTML = upcomingApproved.map(apt => `
                <div class="flex gap-3 pb-2 border-b border-surface-variant/20 items-center justify-between">
                    <div class="flex items-center gap-3">
                        <div class="w-8 h-8 rounded-lg bg-surface-container-high border text-[10px] font-extrabold flex items-center justify-center text-primary shrink-0">${apt.date.split('-').pop()}</div>
                        <div class="min-w-0">
                            <h4 class="font-bold text-on-background text-xs truncate leading-tight">${apt.clientName}</h4>
                            <p class="text-[9px] text-on-surface-variant/80 truncate mt-0.5">${apt.serviceTitle} • ${apt.time}</p>
                        </div>
                    </div>
                    ${apt.type === 'Video Call' ? `
                        <button onclick="joinAdminVideoCall('${apt.id}')" class="bg-primary hover:bg-[#005321] text-white font-bold text-[9px] px-2 py-1 rounded shadow-sm transition-all active:scale-95 shrink-0 cursor-pointer">Join Call</button>
                    ` : ''}
                </div>
            `).join('');
        }
    }

    const monthGrid = document.getElementById('admin-calendar-month-grid');
    if (!monthGrid) return;
    
    document.getElementById('admin-calendar-title').innerText = "October 2024";

    let gridHtml = '';
    gridHtml += `<div class="p-2 border border-surface-variant/10 text-outline-variant/20 bg-surface-container-low/25 text-[10px]">29</div>`;
    gridHtml += `<div class="p-2 border border-surface-variant/10 text-outline-variant/20 bg-surface-container-low/25 text-[10px]">30</div>`;

    for (let day = 1; day <= 31; day++) {
        const dateStr = `2024-10-${day.toString().padStart(2, '0')}`;
        const dayApts = state.appointments.filter(a => a.date === dateStr);
        let cellClass = 'p-2 border border-surface-variant/10 text-[10px] font-bold flex flex-col justify-between items-start ';
        if (day === 15) {
            cellClass += 'bg-[#006e2f]/5 ring-1 ring-primary';
        } else {
            cellClass += 'hover:bg-surface-container-low/20';
        }

        let aptsHtml = dayApts.map(a => `
            <div class="w-full bg-primary/10 text-primary text-[8px] font-bold p-1 rounded mt-1 truncate" title="${a.clientName}">
                ${a.time} - ${a.clientName.split(' ')[0]}
            </div>
        `).join('');

        gridHtml += `
            <div class="${cellClass}">
                <span class="${day === 15 ? 'text-primary' : 'text-on-surface-variant'}">${day}</span>
                <div class="w-full overflow-hidden max-h-[70px]">${aptsHtml}</div>
            </div>
        `;
    }

    gridHtml += `<div class="p-2 border border-surface-variant/10 text-outline-variant/20 bg-surface-container-low/25 text-[10px]">1</div>`;
    gridHtml += `<div class="p-2 border border-surface-variant/10 text-outline-variant/20 bg-surface-container-low/25 text-[10px]">2</div>`;

    monthGrid.innerHTML = gridHtml;
}

window.approveAppointment = function(id) {
    const apt = state.appointments.find(a => a.id === id);
    if (apt) {
        apt.status = 'approved';
        saveAdminState();
        showToast(`Approved session for ${apt.clientName}!`, 'success');
        renderAdminCalendar();
    }
};

window.declineAppointment = function(id) {
    state.appointments = state.appointments.filter(a => a.id !== id);
    saveAdminState();
    showToast('Declined request.');
    renderAdminCalendar();
};

window.joinAdminVideoCall = function(aptId) {
    const apt = state.appointments.find(a => a.id === aptId);
    if (!apt) return;
    
    showToast(`Connecting to video call with client ${apt.clientName}...`, 'success');
    setTimeout(() => {
        window.location.href = `../telehealth.html?practitioner=${encodeURIComponent(apt.therapist)}&role=admin&client=${encodeURIComponent(apt.clientName)}`;
    }, 850);
};

window.changeAdminCalendarMonth = function(dir) {
    showToast('Multi-month calendar paging disabled in this prototype.', 'info');
};
window.setAdminCalendarToday = function() {
    showToast('Navigated to October 2024.', 'info');
};

// ==================== REPORTS ====================
function initAdminReportsCharts() {
    const ctxSuccess = document.getElementById('adminSuccessTrendsChartCanvas').getContext('2d');
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

window.filterFoodCategory = function(cat) {
    state.adminSelectedFoodFilter = cat;
    
    document.querySelectorAll('.food-cat-btn').forEach(btn => {
        btn.className = 'food-cat-btn bg-surface-container-low text-on-surface-variant text-[10px] font-bold px-3 py-1.5 rounded-full whitespace-nowrap hover:bg-surface-variant';
    });
    
    if (event && event.target) {
        event.target.className = 'food-cat-btn bg-primary text-white text-[10px] font-bold px-3 py-1.5 rounded-full whitespace-nowrap';
    }
    
    renderAdminMealBuilder();
};

window.filterFoodLibrary = function() {
    renderAdminMealBuilder();
};

