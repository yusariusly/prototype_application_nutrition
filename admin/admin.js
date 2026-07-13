// NutriFlow Admin Application Logic

// ==================== STATE MANAGEMENT ====================
const state = {
    activeView: 'admin-clients',
    appointments: [],
    clients: [
        { name: 'Sarah Jenkins', email: 'sarah.j@email.com', goal: 'Weight Loss', lastCheckIn: 'Today, 9:00 AM', compliance: 92, weightTrend: [168, 169, 170, 173, 174, 176], avatar: 'SJ', therapist: 'Dr. Hasan', activeProgramId: 'prog-sarah' },
        { name: 'Marcus Reid', email: 'm.reid@email.com', goal: 'Muscle Gain', lastCheckIn: '2 days ago', compliance: 78, weightTrend: [180, 182, 181, 183, 182, 185], avatar: 'MR', therapist: 'Dr. Hasan', activeProgramId: 'prog-marcus' },
        { name: 'Elena Lopez', email: 'elena.l@email.com', goal: 'Maintenance', lastCheckIn: 'Yesterday', compliance: 95, weightTrend: [142, 142, 141, 142, 142, 142], avatar: 'EL', therapist: 'Dr. Amanda', activeProgramId: 'prog-elena' }
    ],
    foodLibrary: [
        { id: 'f-1', title: 'Avocado Egg Toast', type: 'Recipes', calories: 320, p: 14, c: 22, f: 18, image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=200', favorite: true, recipeIngredients: "2 slices whole wheat bread\n1 ripe avocado\n2 large eggs\n1 tsp lemon juice\nPinch of salt and black pepper", recipeSteps: "1. Toast 2 slices of whole wheat bread.\n2. Mash 1 avocado with lemon juice, salt, and pepper.\n3. Fry 2 eggs to your liking.\n4. Spread avocado on toast and top with eggs. Serve warm." },
        { id: 'f-2', title: 'Grilled Chicken Salad', type: 'Recipes', calories: 450, p: 45, c: 12, f: 20, image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200', favorite: true, recipeIngredients: "150g chicken breast\n2 cups chopped romaine lettuce\n1/2 cup cherry tomatoes halved\n1/2 cucumber sliced\n1 tbsp olive oil dressing", recipeSteps: "1. Season chicken breast with olive oil, salt, garlic powder, and pepper.\n2. Grill or pan-fry chicken breast for 6 mins per side.\n3. Chop romaine lettuce, cherry tomatoes, and cucumbers.\n4. Slice chicken and place on salad greens. Drizzle with light olive oil dressing." },
        { id: 'f-3', title: 'Greek Yogurt Bowl', type: 'Recipes', calories: 250, p: 20, c: 30, f: 5, image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=200', favorite: true, recipeIngredients: "1 cup plain Greek yogurt\n1/2 cup fresh mixed berries\n1 tbsp chia seeds\n1 tsp honey", recipeSteps: "1. Scoop Greek yogurt into a bowl.\n2. Top with mixed fresh berries (strawberries, blueberries).\n3. Sprinkle chia seeds and drizzle 1 tsp honey on top." },
        { id: 'f-4', title: 'Baked Salmon & Quinoa', type: 'Recipes', calories: 520, p: 38, c: 45, f: 22, image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=200', favorite: true, recipeIngredients: "150g salmon fillet\n1/2 cup cooked quinoa\n8-10 stalks of fresh asparagus\n1 tbsp lemon juice\n1 tsp olive oil", recipeSteps: "1. Pre-heat oven to 400°F (200°C).\n2. Place salmon fillet on a baking sheet, drizzle with olive oil and squeeze fresh lemon.\n3. Bake for 12-15 minutes.\n4. Serve alongside cooked quinoa and steamed asparagus." },
        { id: 'f-5', title: 'Fresh Apple & Almonds', type: 'Raw Foods', calories: 150, p: 4, c: 18, f: 9, image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=200', favorite: false, recipeIngredients: "1 medium apple\n12 raw almonds", recipeSteps: "Serve fresh apple sliced with raw almonds." },
        { id: 'f-6', title: 'Mixed Raw Berries', type: 'Raw Foods', calories: 85, p: 1, c: 21, f: 0.5, image: 'https://images.unsplash.com/photo-1518635017498-87f514b751ba?w=200', favorite: false, recipeIngredients: "1/2 cup fresh strawberries\n1/4 cup blueberries\n1/4 cup raspberries", recipeSteps: "Rinse berries and serve in a small bowl." }
    ],
    programs: [],
    editingProgramId: null,
    adminSelectedFoodFilter: 'all',
    adminCalendarOffset: 0,
    clientsPage: 0
};

let draftedRecipients = [];


// ==================== SESSION CHECK ====================
function checkAdminSession() {
    if (localStorage.getItem('nutriflow_admin_logged') !== 'true') {
        window.location.href = './login.html';
    }
}

// ==================== STATE SYNC ====================
function loadAdminState() {
    // Helper to get formatted relative date (YYYY-MM-DD)
    const getRelativeDate = (offsetDays) => {
        const d = new Date();
        d.setDate(d.getDate() + offsetDays);
        return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
    };

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
                date: getRelativeDate(0),
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
                date: getRelativeDate(5),
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
                date: getRelativeDate(-2),
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
                date: getRelativeDate(2),
                time: '03:30 PM',
                status: 'approved',
                type: 'In-Person'
            }
        ];
        saveAdminState();
    }
    
    // Load Programs Draft
    if (localStorage.getItem('nutriflow_programs_draft')) {
        state.programs = JSON.parse(localStorage.getItem('nutriflow_programs_draft'));
    } else {
        // Init default programs
        state.programs = [
            {
                id: 'prog-sarah',
                name: 'Sarah\'s Weight Loss Plan',
                description: 'Weekly meal program designed to help Sarah lose weight safely through balanced nutrients.',
                creator: 'Dr. Hasan',
                targetKcal: 2000,
                meals: {
                    'Mon': [
                        { type: 'Breakfast', title: 'Avocado Egg Toast', calories: 320, p: 14, c: 22, f: 18, image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=200', favorite: true, recipeIngredients: "2 slices whole wheat bread\n1 ripe avocado\n2 large eggs\n1 tsp lemon juice\nPinch of salt and black pepper", recipeSteps: "1. Toast 2 slices of whole wheat bread.\n2. Mash 1 avocado with lemon juice, salt, and pepper.\n3. Fry 2 eggs to your liking.\n4. Spread avocado on toast and top with eggs. Serve warm." },
                        { type: 'Lunch', title: 'Grilled Chicken Salad', calories: 450, p: 45, c: 12, f: 20, image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200', favorite: true, recipeIngredients: "150g chicken breast\n2 cups chopped romaine lettuce\n1/2 cup cherry tomatoes halved\n1/2 cucumber sliced\n1 tbsp olive oil dressing", recipeSteps: "1. Season chicken breast with olive oil, salt, garlic powder, and pepper.\n2. Grill or pan-fry chicken breast for 6 mins per side.\n3. Chop romaine lettuce, cherry tomatoes, and cucumbers.\n4. Slice chicken and place on salad greens. Drizzle with light olive oil dressing." }
                    ],
                    'Tue': [
                        { type: 'Breakfast', title: 'Greek Yogurt Bowl', calories: 250, p: 20, c: 30, f: 5, image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=200', favorite: true, recipeIngredients: "1 cup plain Greek yogurt\n1/2 cup fresh mixed berries\n1 tbsp chia seeds\n1 tsp honey", recipeSteps: "1. Scoop Greek yogurt into a bowl.\n2. Top with mixed fresh berries (strawberries, blueberries).\n3. Sprinkle chia seeds and drizzle 1 tsp honey on top." }
                    ],
                    'Wed': [
                        { type: 'Breakfast', title: 'Berry Protein Smoothie Bowl', calories: 350, p: 30, c: 45, f: 8, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAhdLncVr5YHSg696oNNaWNcDNX27FpwShpuVV2sROhcLkU1xYKMhi-UtErJlr9jpaS1aHCEsYwaHknma9nw7SgPy1Fhbq3qbe0s13GK6BowfyxFbOHwCJIJQLBIWAEJ8-y7WFQl-rQadTyMya_y1kGIlKkclrRz4YAo636MVND2hDJ_kt5PVntLx-dw-UhQPiKXFvsUtAHf3MUYe_dhx77FGOyLPOJ4_BRXE7wQfQQrYmmQ4zb0E2J3A', favorite: true, recipeIngredients: "1 cup frozen mixed berries\n1 scoop vanilla whey protein powder\n1/2 cup almond milk\n1 tbsp chia seeds", recipeSteps: "Blend berries, protein powder, and almond milk. Pour into a bowl and top with chia seeds." },
                        { type: 'Lunch', title: 'Quinoa Buddha Bowl', calories: 450, p: 15, c: 65, f: 18, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBEJYji3THZ26fZU1y7s_UlX3R5JiXYh8bDKQCgoB_eeBrxiKFJKp983-OzaHO2s7bOGibm_Ffq78DZMIj37z6OO73EXDwTwUKe7WEXsg1ejJE92FBq-nT19yX8htJOacJuuKupzenZJZZPm_6PtBatL55KP4abBQyqSrEMeSFnzbk1OzrX8qcm8ByqZ6WrAMGgLkkRh7lCkTEF5E8WTVQEvDVIoyGeZykvJ7PO6fmFFWMRZ_FlYGtFOw', favorite: true, recipeIngredients: "1/2 cup cooked quinoa\n1/2 sweet potato\n1/2 avocado\n1 cup spinach\n2 tbsp lemon tahini dressing", recipeSteps: "Arrange spinach, quinoa, sweet potato, and avocado. Drizzle dressing." },
                        { type: 'Snack', title: 'Mixed Nuts & Apple', calories: 200, p: 5, c: 25, f: 10, image: 'https://images.unsplash.com/photo-1596560548464-f01068e3dbf0?w=200', favorite: false, recipeIngredients: "1 small apple\n1 oz mixed nuts", recipeSteps: "Slice apple and serve with nuts." },
                        { type: 'Dinner', title: 'Grilled Salmon & Asparagus', calories: 520, p: 42, c: 12, f: 32, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCmYwtQEKZuQeHbBcF8Z60P_F01JjQ-P01ItJBoz7lWy-FK2NVaEJb3Hqy6oemYRu6b2zWfF5bmfKj9u6PC4JZtGsHvyyUYGgU5hMj-BLnCgmbTc5VDZy-QI6zc259LqW5YPX2r_aCLcW5xsQzLAzlALozsVfWYENWIhLDvaf3jCLuApaunpIs9t0u-hPB3Rhks8C5OQ8Y2RQPiuPrtWg7JqSsunfQMLXnpQ4zAhuIl_qhOzqjCGJJPpw', favorite: true, recipeIngredients: "150g salmon\n1 bunch asparagus\n1 tbsp lemon juice\n1 tsp olive oil", recipeSteps: "Brush with oil, grill salmon and asparagus, drizzle with lemon juice." }
                    ],
                    'Thu': [], 'Fri': [], 'Sat': [], 'Sun': []
                }
            },
            {
                id: 'prog-marcus',
                name: 'Marcus\'s Muscle Gain Protocol',
                description: 'High-protein diet customized to fuel muscle hypertrophy and support intense workout recovery.',
                creator: 'Dr. Hasan',
                targetKcal: 2500,
                meals: {
                    'Mon': [
                        { type: 'Breakfast', title: 'Greek Yogurt Bowl', calories: 250, p: 20, c: 30, f: 5, image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=200', favorite: true, recipeIngredients: "1 cup plain Greek yogurt\n1/2 cup fresh mixed berries\n1 tbsp chia seeds\n1 tsp honey", recipeSteps: "1. Scoop Greek yogurt into a bowl.\n2. Top with mixed fresh berries (strawberries, blueberries).\n3. Sprinkle chia seeds and drizzle 1 tsp honey on top." }
                    ],
                    'Tue': [], 'Wed': [], 'Thu': [], 'Fri': [], 'Sat': [], 'Sun': []
                }
            },
            {
                id: 'prog-elena',
                name: 'Elena\'s Maintenance Program',
                description: 'General balanced diet with healthy snacks to keep energy levels stable and maintain body weight.',
                creator: 'Dr. Amanda',
                targetKcal: 1800,
                meals: {
                    'Mon': [
                        { type: 'Lunch', title: 'Grilled Chicken Salad', calories: 450, p: 45, c: 12, f: 20, image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200', favorite: true, recipeIngredients: "150g chicken breast\n2 cups chopped romaine lettuce\n1/2 cup cherry tomatoes halved\n1/2 cucumber sliced\n1 tbsp olive oil dressing", recipeSteps: "1. Season chicken breast with olive oil, salt, garlic powder, and pepper.\n2. Grill or pan-fry chicken breast for 6 mins per side.\n3. Chop romaine lettuce, cherry tomatoes, and cucumbers.\n4. Slice chicken and place on salad greens. Drizzle with light olive oil dressing." }
                    ],
                    'Tue': [], 'Wed': [], 'Thu': [], 'Fri': [], 'Sat': [], 'Sun': []
                }
            }
        ];
        localStorage.setItem('nutriflow_programs_draft', JSON.stringify(state.programs));
    }

    // Load Food Library
    if (localStorage.getItem('nutriflow_food_library')) {
        state.foodLibrary = JSON.parse(localStorage.getItem('nutriflow_food_library'));
    } else {
        localStorage.setItem('nutriflow_food_library', JSON.stringify(state.foodLibrary));
    }

    // Load Clients List
    if (localStorage.getItem('nutriflow_clients')) {
        state.clients = JSON.parse(localStorage.getItem('nutriflow_clients'));
        let updated = false;
        state.clients.forEach(c => {
            if (!c.therapist) {
                if (c.name === 'Elena Lopez') {
                    c.therapist = 'Dr. Amanda';
                } else {
                    c.therapist = 'Dr. Hasan';
                }
                updated = true;
            }
            if (!c.activeProgramId) {
                if (c.name === 'Sarah Jenkins') c.activeProgramId = 'prog-sarah';
                else if (c.name === 'Marcus Reid') c.activeProgramId = 'prog-marcus';
                else if (c.name === 'Elena Lopez') c.activeProgramId = 'prog-elena';
                updated = true;
            }
            if (c.compliance === undefined || c.compliance === null) {
                c.compliance = 85;
                updated = true;
            }
            if (!c.weightTrend || !Array.isArray(c.weightTrend) || c.weightTrend.length === 0) {
                c.weightTrend = [160, 159, 158, 158, 157, 156];
                updated = true;
            }
            if (!c.avatar) {
                c.avatar = c.name ? c.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : 'CL';
                updated = true;
            }
            if (!c.goal) {
                c.goal = 'Weight Loss';
                updated = true;
            }
            if (!c.lastCheckIn) {
                c.lastCheckIn = 'Never';
                updated = true;
            }
        });
        if (updated) {
            localStorage.setItem('nutriflow_clients', JSON.stringify(state.clients));
        }
    } else {
        localStorage.setItem('nutriflow_clients', JSON.stringify(state.clients));
    }
}

function saveAdminState() {
    localStorage.setItem('nutriflow_appointments', JSON.stringify(state.appointments));
    localStorage.setItem('nutriflow_programs_draft', JSON.stringify(state.programs));
    localStorage.setItem('nutriflow_clients', JSON.stringify(state.clients));
    localStorage.setItem('nutriflow_food_library', JSON.stringify(state.foodLibrary));
}

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', () => {
    checkAdminSession();
    loadAdminState();
    
    // Set subtitle welcome message with specialist name
    const activeSpecialist = localStorage.getItem('nutriflow_specialist_name') || 'Dr. Hasan';
    const subtitle = document.getElementById('specialist-welcome-subtitle');
    if (subtitle) {
        subtitle.innerText = `Logged in as: ${activeSpecialist} · Manage your active nutrition clients and monitor their progress.`;
    }

    // Set practitioner avatar label
    const avatarLabel = document.getElementById('practitioner-avatar-label');
    if (avatarLabel) {
        const initials = activeSpecialist.split(' ').map(s => s[0]).join('').substring(0, 2).toUpperCase();
        avatarLabel.innerText = initials;
    }
    
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

// ==================== ACCORDION ====================
window.toggleMobileAccordion = function(trElement) {
    if (!trElement) return;
    
    // Toggle class on tr
    trElement.classList.toggle('accordion-expanded');
    
    // Toggle hidden class on child accordion-contents
    trElement.querySelectorAll('.accordion-content').forEach(el => {
        el.classList.toggle('hidden');
    });
    
    // Toggle chevron icon
    const icon = trElement.querySelector('.accordion-chevron');
    if (icon) {
        const isExpanded = trElement.classList.contains('accordion-expanded');
        icon.innerText = isExpanded ? 'expand_less' : 'expand_more';
    }
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

    // Toggle active state for mobile bottom nav
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.classList.remove('text-primary');
        link.classList.add('text-on-surface-variant');
    });
    const activeMobileLink = document.getElementById(`mobile-link-${viewId}`);
    if (activeMobileLink) {
        activeMobileLink.classList.remove('text-on-surface-variant');
        activeMobileLink.classList.add('text-primary');
    }

    if (viewId === 'admin-clients') {
        renderAdminClientsList();
    } else if (viewId === 'admin-meal-builder') {
        renderAdminMealBuilder();
    } else if (viewId === 'admin-calendar') {
        renderAdminAppointmentsTable();
    } else if (viewId === 'admin-services') {
        loadSpecialistServices();
    } else if (viewId === 'admin-profile') {
        loadSpecialistProfileDetails();
    }
};

window.handleAdminSignOut = function() {
    localStorage.removeItem('nutriflow_admin_logged');
    showToast('Signed out of Admin account.');
    setTimeout(() => {
        window.location.href = './login.html';
    }, 1000);
};

function loadSpecialistProfileDetails() {
    const activeSpecialistName = localStorage.getItem('nutriflow_specialist_name') || 'Dr. Hasan';
    
    // Find specialist details from the state/local storage of nutritionists
    const nutritionists = JSON.parse(localStorage.getItem('nutriflow_nutritionists')) || [
        { id: 'exp-1', name: 'Dr. Hasan', email: 'hasan@nutriflow.com', specialty: 'Weight Management', status: 'active', avatar: 'DH' },
        { id: 'exp-2', name: 'Dr. Amanda', email: 'amanda@nutriflow.com', specialty: 'Sport Nutrition', status: 'active', avatar: 'DA' },
        { id: 'exp-3', name: 'Dr. Marcus Reid', email: 'm.reid@email.com', specialty: 'Therapeutic Diets', status: 'active', avatar: 'MR' }
    ];
    
    const spec = nutritionists.find(n => n.name === activeSpecialistName) || {
        name: activeSpecialistName,
        email: 'specialist@nutriflow.com',
        specialty: 'Weight Management',
        avatar: activeSpecialistName.split(' ').map(s => s[0]).join('').toUpperCase()
    };

    // Populate Left Card
    document.getElementById('profile-practitioner-avatar').innerText = spec.avatar || 'N';
    document.getElementById('profile-practitioner-name').innerText = spec.name;
    document.getElementById('profile-practitioner-specialty').innerText = spec.specialty;
    document.getElementById('profile-practitioner-email').innerText = spec.email;

    // Populate Right Form
    document.getElementById('edit-practitioner-name').value = spec.name;
    document.getElementById('edit-practitioner-specialty').value = spec.specialty;
    document.getElementById('edit-practitioner-email').value = spec.email;
}

function loadSpecialistServices() {
    const activeSpecialistName = localStorage.getItem('nutriflow_specialist_name') || 'Dr. Hasan';
    const key = `nutriflow_services_${activeSpecialistName}`;
    
    let services = JSON.parse(localStorage.getItem(key));
    if (!services) {
        if (activeSpecialistName.includes('Hasan')) {
            services = [
                {
                    id: 'srv-hasan-1',
                    title: 'Weight Loss Consultation',
                    description: 'A dedicated session focusing on weight loss strategies, body composition targets, and custom macro ratios.',
                    duration: '60 min',
                    type: 'Virtual or In-Person',
                    price: 150,
                    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDI0OL4dSef_9_KtBWKJ_8d0de_3jKJ307lRmzwECWHykwC2Sh_-p2uUnTh-2y0Yyj2x5txHJ1-_Z9u3YVyIFYjVwQFMkm0ufr1Envl8PlT8JyiHkOB-hHpJszVsfgn9wthQZBcxDIFw3emAo4TPjLWJ43YEqFZsYmGT0kh9do_2JTuvnjgBOOrtceFxVxH_JZX7krm4i7Rjsz16LRwnXm93LXDXh78J5Agw0JsZToFhkL6qU3xrqPBtQ'
                },
                {
                    id: 'srv-hasan-2',
                    title: 'Weekly Meal Review',
                    description: 'A 30-minute check-in to adjust your weekly calorie limits, recipes, and raw ingredients in your active program.',
                    duration: '30 min',
                    type: 'Virtual Only',
                    price: 75,
                    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBGsbf12JBu1YUhQl78vA1aGmjNYjjGnyb8cmgHlmCOxHKWee0ybL9-1rqta2RUKAJJewh6CU3PkcStb675EhEkzaWohu52Oj7rEOvZZt5-KwE8CSpbidQcEI59WkIrdFAd1LKLAv1EB0t69XGbzUv3jpNPAxWeFPSO8fipEBXZWlqqzxB9GQ2cJzZSc6G7cGZVRlaCrNQ79-yv4AL_kM2EKJba8qTKqFux18RVXNHQHkGLV2pI17tZjw'
                }
            ];
        } else if (activeSpecialistName.includes('Amanda')) {
            services = [
                {
                    id: 'srv-amanda-1',
                    title: 'Sports Performance Nutrition',
                    description: 'Optimize your energy levels, muscle protein synthesis, and sports supplements to match your training cycles.',
                    duration: '60 min',
                    type: 'Virtual or In-Person',
                    price: 160,
                    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDI0OL4dSef_9_KtBWKJ_8d0de_3jKJ307lRmzwECWHykwC2Sh_-p2uUnTh-2y0Yyj2x5txHJ1-_Z9u3YVyIFYjVwQFMkm0ufr1Envl8PlT8JyiHkOB-hHpJszVsfgn9wthQZBcxDIFw3emAo4TPjLWJ43YEqFZsYmGT0kh9do_2JTuvnjgBOOrtceFxVxH_JZX7krm4i7Rjsz16LRwnXm93LXDXh78J5Agw0JsZToFhkL6qU3xrqPBtQ'
                }
            ];
        } else {
            services = [
                {
                    id: `srv-${Date.now()}-1`,
                    title: 'General Wellness Consultation',
                    description: 'Identify lifestyle habits, micronutrient deficiencies, and sleep profiles to improve general health.',
                    duration: '60 min',
                    type: 'Virtual or In-Person',
                    price: 120,
                    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDI0OL4dSef_9_KtBWKJ_8d0de_3jKJ307lRmzwECWHykwC2Sh_-p2uUnTh-2y0Yyj2x5txHJ1-_Z9u3YVyIFYjVwQFMkm0ufr1Envl8PlT8JyiHkOB-hHpJszVsfgn9wthQZBcxDIFw3emAo4TPjLWJ43YEqFZsYmGT0kh9do_2JTuvnjgBOOrtceFxVxH_JZX7krm4i7Rjsz16LRwnXm93LXDXh78J5Agw0JsZToFhkL6qU3xrqPBtQ'
                }
            ];
        }
        localStorage.setItem(key, JSON.stringify(services));
    }
    
    renderSpecialistServicesList(services);
}

function renderSpecialistServicesList(services) {
    const listContainer = document.getElementById('specialist-services-list');
    if (!listContainer) return;
    
    if (services.length === 0) {
        listContainer.innerHTML = `
            <div class="col-span-full border border-dashed border-outline-variant/35 rounded-2xl p-8 text-center text-xs font-semibold text-on-surface-variant bg-surface-container-low/20">
                You have no consultation services registered. Click "Add Service" to create one.
            </div>
        `;
        return;
    }
    
    listContainer.innerHTML = services.map(srv => `
        <div class="bg-surface-container-lowest border border-outline-variant/30 hover:border-primary/30 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col h-full">
            <div class="h-32 w-full bg-cover bg-center relative" style="background-image: url('${srv.image || 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400'}')">
                <div class="absolute top-3 right-3 bg-white/95 backdrop-blur shadow-sm px-2.5 py-1 rounded-xl text-xs font-black text-primary border border-outline-variant/10">
                    $${srv.price}
                </div>
            </div>
            <div class="p-5 flex flex-col flex-grow gap-2.5 text-xs text-on-background">
                <h4 class="font-extrabold text-on-background text-sm leading-snug">${srv.title}</h4>
                <p class="text-on-surface-variant text-[11px] leading-relaxed line-clamp-3">${srv.description}</p>
                
                <div class="flex flex-wrap gap-1.5 items-center mt-1">
                    <span class="flex items-center gap-1 bg-surface-container px-2.5 py-1 rounded-lg text-[10px] font-bold text-on-surface-variant">
                        <span class="material-symbols-outlined text-[12px] text-primary">schedule</span> ${srv.duration}
                    </span>
                    <span class="flex items-center gap-1 bg-surface-container px-2.5 py-1 rounded-lg text-[10px] font-bold text-on-surface-variant">
                        <span class="material-symbols-outlined text-[12px] text-primary">videocam</span> ${srv.type}
                    </span>
                </div>
                
                <div class="flex justify-end gap-2 border-t border-outline-variant/15 pt-3.5 mt-auto">
                    <button onclick="openEditServiceModal('${srv.id}')" class="bg-primary/5 hover:bg-primary/15 text-primary font-bold text-[10px] px-3 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1">
                        <span class="material-symbols-outlined text-[13px]">edit</span> Edit
                    </button>
                    <button onclick="deleteSpecialistService('${srv.id}')" class="bg-red-50 hover:bg-red-100/80 text-red-600 font-bold text-[10px] px-3 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1">
                        <span class="material-symbols-outlined text-[13px]">delete</span> Delete
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

window.openAddServiceModal = function() {
    document.getElementById('service-modal-title').innerText = 'Add Consultation Service';
    document.getElementById('service-modal-id').value = '';
    document.getElementById('service-modal-title-input').value = '';
    const descInput = document.getElementById('service-modal-description');
    if (descInput) {
        descInput.value = '';
        descInput.style.height = 'auto';
    }
    document.getElementById('service-modal-duration').value = '60 min';
    document.getElementById('service-modal-price').value = '150';
    document.getElementById('service-modal-type').value = 'Virtual or In-Person';
    
    const modal = document.getElementById('service-modal');
    if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
    }
};

window.openEditServiceModal = function(srvId) {
    const activeSpecialistName = localStorage.getItem('nutriflow_specialist_name') || 'Dr. Hasan';
    const key = `nutriflow_services_${activeSpecialistName}`;
    const services = JSON.parse(localStorage.getItem(key)) || [];
    const srv = services.find(s => s.id === srvId);
    if (!srv) return;
    
    document.getElementById('service-modal-title').innerText = 'Edit Consultation Service';
    document.getElementById('service-modal-id').value = srv.id;
    document.getElementById('service-modal-title-input').value = srv.title;
    
    const descInput = document.getElementById('service-modal-description');
    if (descInput) {
        descInput.value = srv.description;
        // Trigger auto-resize after a short timeout or immediately when layout updates
        setTimeout(() => {
            descInput.style.height = 'auto';
            descInput.style.height = descInput.scrollHeight + 'px';
        }, 50);
    }
    
    document.getElementById('service-modal-duration').value = srv.duration;
    document.getElementById('service-modal-price').value = srv.price;
    document.getElementById('service-modal-type').value = srv.type;
    
    const modal = document.getElementById('service-modal');
    if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
    }
};

window.closeServiceModal = function() {
    const modal = document.getElementById('service-modal');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }
};

window.handleSaveService = function(e) {
    e.preventDefault();
    const activeSpecialistName = localStorage.getItem('nutriflow_specialist_name') || 'Dr. Hasan';
    const key = `nutriflow_services_${activeSpecialistName}`;
    const services = JSON.parse(localStorage.getItem(key)) || [];
    
    const id = document.getElementById('service-modal-id').value;
    const title = document.getElementById('service-modal-title-input').value.trim();
    const description = document.getElementById('service-modal-description').value.trim();
    const duration = document.getElementById('service-modal-duration').value.trim();
    const price = parseInt(document.getElementById('service-modal-price').value);
    const type = document.getElementById('service-modal-type').value;
    
    const image = 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=200';
    
    if (id) {
        const idx = services.findIndex(s => s.id === id);
        if (idx !== -1) {
            services[idx].title = title;
            services[idx].description = description;
            services[idx].duration = duration;
            services[idx].price = price;
            services[idx].type = type;
        }
    } else {
        services.push({
            id: `srv-${Date.now()}`,
            title, description, duration, price, type, image
        });
    }
    
    localStorage.setItem(key, JSON.stringify(services));
    closeServiceModal();
    renderSpecialistServicesList(services);
    showToast('Consultation Service saved successfully!', 'success');
};

window.deleteSpecialistService = function(srvId) {
    if (confirm('Are you sure you want to remove this service offering?')) {
        const activeSpecialistName = localStorage.getItem('nutriflow_specialist_name') || 'Dr. Hasan';
        const key = `nutriflow_services_${activeSpecialistName}`;
        const services = JSON.parse(localStorage.getItem(key)) || [];
        const filtered = services.filter(s => s.id !== srvId);
        localStorage.setItem(key, JSON.stringify(filtered));
        renderSpecialistServicesList(filtered);
        showToast('Service offering removed successfully.', 'info');
    }
};

window.handleSavePractitionerProfile = function(e) {
    e.preventDefault();
    const name = document.getElementById('edit-practitioner-name').value;
    const specialty = document.getElementById('edit-practitioner-specialty').value;
    const email = document.getElementById('edit-practitioner-email').value;
    const avatar = name.split(' ').map(s => s[0]).join('').substring(0,2).toUpperCase();

    const activeSpecialistName = localStorage.getItem('nutriflow_specialist_name') || 'Dr. Hasan';
    
    // Update nutriflow_nutritionists list
    const nutritionists = JSON.parse(localStorage.getItem('nutriflow_nutritionists')) || [];
    const index = nutritionists.findIndex(n => n.name === activeSpecialistName);
    if (index !== -1) {
        nutritionists[index].name = name;
        nutritionists[index].specialty = specialty;
        nutritionists[index].email = email;
        nutritionists[index].avatar = avatar;
    } else {
        nutritionists.push({
            id: `exp-${Date.now()}`,
            name, specialty, email, status: 'active', avatar
        });
    }
    localStorage.setItem('nutriflow_nutritionists', JSON.stringify(nutritionists));

    // Update clients pendamping name in client list to maintain allocation consistency!
    const clients = JSON.parse(localStorage.getItem('nutriflow_clients')) || [];
    clients.forEach(c => {
        if (c.therapist === activeSpecialistName) {
            c.therapist = name;
        }
    });
    localStorage.setItem('nutriflow_clients', JSON.stringify(clients));

    // Update session name
    localStorage.setItem('nutriflow_specialist_name', name);
    
    // Update UI headers
    const label = document.getElementById('practitioner-avatar-label');
    if (label) label.innerText = avatar;

    const welcomeLabel = document.getElementById('specialist-welcome-subtitle');
    if (welcomeLabel) {
        welcomeLabel.innerText = `Logged in as: ${name} · Manage your active nutrition clients and monitor their progress.`;
    }

    loadSpecialistProfileDetails();
    showToast('Practitioner Profile updated successfully!', 'success');
};

// Admin Notifications Dropdown
const adminNotificationsData = [
    { type: 'booking', message: 'New Appointment Request: Sarah Jenkins for Video Consultation', time: '5 mins ago', icon: 'event', bg: 'bg-[#fff8e1]', text: 'text-[#d48806]' },
    { type: 'progress', message: 'Mike Ross just logged his weekly weigh-in', time: '1 hour ago', icon: 'monitor_weight', bg: 'bg-[#e5f6fd]', text: 'text-[#0288d1]' },
    { type: 'cancelled', message: 'Booking Cancelled: Emma Stone (Tomorrow 10:00 AM)', time: '3 hours ago', icon: 'cancel', bg: 'bg-[#fce8e6]', text: 'text-[#d93025]' },
    { type: 'reminder', message: 'Upcoming Session in 30 mins: John Doe', time: 'Just now', icon: 'notifications_active', bg: 'bg-[#e6f4ea]', text: 'text-[#1e8e3e]' }
];

window.toggleSpecialistNotifications = function(e) {
    e.stopPropagation();
    const dropdown = document.getElementById('admin-notifications-dropdown');
    const isHidden = dropdown.classList.contains('hidden');
    
    if (isHidden) {
        renderAdminNotifications();
        dropdown.classList.remove('hidden');
    } else {
        dropdown.classList.add('hidden');
    }
};

window.renderAdminNotifications = function() {
    const list = document.getElementById('admin-notifications-list');
    if (!list) return;
    
    if (adminNotificationsData.length === 0) {
        list.innerHTML = '<div class="p-6 text-center text-sm text-on-surface-variant">No new notifications</div>';
        return;
    }
    
    list.innerHTML = adminNotificationsData.map(n => `
        <div class="px-5 py-4 flex gap-4 hover:bg-surface-container transition-colors cursor-pointer items-start">
            <div class="w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${n.bg} ${n.text}">
                <span class="material-symbols-outlined text-[20px]">${n.icon}</span>
            </div>
            <div class="flex flex-col">
                <span class="text-[13px] font-medium text-on-background leading-snug">${n.message}</span>
                <span class="text-[11px] text-on-surface-variant mt-1">${n.time}</span>
            </div>
        </div>
    `).join('');
};

window.markAdminNotificationsRead = function() {
    adminNotificationsData.length = 0; // clear array
    renderAdminNotifications();
    showToast('All notifications marked as read', 'success');
    setTimeout(() => {
        document.getElementById('admin-notifications-dropdown').classList.add('hidden');
    }, 1000);
};

// Close dropdown on click outside
document.addEventListener('click', (e) => {
    const dropdown = document.getElementById('admin-notifications-dropdown');
    const btn = document.getElementById('admin-notifications-btn');
    if (dropdown && !dropdown.classList.contains('hidden')) {
        if (!dropdown.contains(e.target) && !btn.contains(e.target)) {
            dropdown.classList.add('hidden');
        }
    }
});

function generateSparklinePath(trend) {
    if (!trend || trend.length < 2) return "M 0 15 L 100 15";
    const minVal = Math.min(...trend);
    const maxVal = Math.max(...trend);
    const valRange = maxVal - minVal || 1;
    
    const points = trend.map((val, idx) => {
        const x = (idx / (trend.length - 1)) * 100;
        const y = 26 - ((val - minVal) / valRange) * 22;
        return `${x.toFixed(1)},${y.toFixed(1)}`;
    });
    
    return `M ${points.join(' L ')}`;
}

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
    const ownerFilter = document.getElementById('admin-client-filter-owner')?.value || 'mine';
    const activeSpecialist = localStorage.getItem('nutriflow_specialist_name') || 'Dr. Hasan';

    const filtered = state.clients.filter(cli => {
        const matchesQuery = cli.name.toLowerCase().includes(query) || cli.email.toLowerCase().includes(query);
        const matchesGoal = goalFilter === 'all' || cli.goal === goalFilter;
        const matchesOwner = ownerFilter === 'all' || cli.therapist === activeSpecialist;
        return matchesQuery && matchesGoal && matchesOwner;
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
            <tr class="flex flex-col lg:table-row bg-surface-container-lowest border border-outline-variant/30 lg:border-0 rounded-2xl p-4 lg:p-0 gap-3 mb-4 lg:mb-0 hover:bg-surface-container-low/30 transition-colors shadow-[0_2px_8px_rgba(0,0,0,0.02)] lg:shadow-none">
                <!-- Client Card Header (Click to Expand on Mobile) -->
                <td onclick="toggleMobileAccordion(this.closest('tr'))" class="cursor-pointer lg:cursor-default flex justify-between items-center lg:table-cell p-0 lg:p-4 pl-0 lg:pl-6 text-left border-b border-outline-variant/15 lg:border-0 pb-3 lg:pb-4">
                    <div class="flex items-center justify-between w-full">
                        <div class="flex items-center gap-3">
                            <div class="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm shrink-0">${cli.avatar}</div>
                            <div class="text-left">
                                <div class="font-bold text-on-background text-sm lg:text-xs">${cli.name}</div>
                                <div class="text-[10px] text-on-surface-variant/80">${cli.email}</div>
                            </div>
                        </div>
                        <div class="flex items-center gap-1">
                            <!-- Action chat button on mobile (hidden on desktop) -->
                            <button onclick="event.stopPropagation(); openClientProgramDiscussion('${cli.activeProgramId}', '${cli.name}')" class="lg:hidden p-2 bg-primary/5 hover:bg-primary/15 text-primary rounded-full transition-colors cursor-pointer" title="Send message">
                                <span class="material-symbols-outlined text-[18px]">chat</span>
                            </button>
                            <!-- Accordion Chevron Toggle -->
                            <button class="lg:hidden p-1 text-on-surface-variant hover:text-primary transition-colors">
                                <span class="accordion-chevron material-symbols-outlined text-[20px]">expand_more</span>
                            </button>
                        </div>
                    </div>
                </td>
                
                <!-- Goal Field (Collapsible) -->
                <td class="accordion-content hidden lg:table-cell flex justify-between items-center p-0 lg:p-4 text-left mt-2 lg:mt-0">
                    <span class="lg:hidden text-[10px] font-bold uppercase tracking-wider text-on-surface-variant/75">Goal</span>
                    <span class="bg-[#e5eeff] text-[#006a61] px-2.5 py-0.5 rounded text-[10px] font-bold">${cli.goal}</span>
                </td>
                
                <!-- Last Check-In Field (Collapsible) -->
                <td class="accordion-content hidden lg:table-cell flex justify-between items-center p-0 lg:p-4 text-on-surface-variant text-right lg:text-left">
                    <span class="lg:hidden text-[10px] font-bold uppercase tracking-wider text-on-surface-variant/75">Last Check-In</span>
                    <span class="font-semibold text-on-background lg:text-on-surface-variant lg:font-normal">${cli.lastCheckIn}</span>
                </td>
                
                <!-- Compliance Field (Collapsible) -->
                <td class="accordion-content hidden lg:table-cell flex justify-between items-center p-0 lg:p-4 text-left">
                    <span class="lg:hidden text-[10px] font-bold uppercase tracking-wider text-on-surface-variant/75">Compliance</span>
                    <div class="flex items-center gap-2 font-bold">
                        <div class="w-16 bg-surface-variant h-1.5 rounded-full overflow-hidden">
                            <div class="bg-primary h-full" style="width: ${cli.compliance}%"></div>
                        </div>
                        <span class="text-xs lg:text-[11px]">${cli.compliance}%</span>
                    </div>
                </td>
                
                <!-- Weight Progress Field (Collapsible) -->
                <td class="accordion-content hidden lg:table-cell flex justify-between items-center p-0 lg:p-4 w-auto lg:w-28 text-left">
                    <span class="lg:hidden text-[10px] font-bold uppercase tracking-wider text-on-surface-variant/75">Weight Progress</span>
                    <svg class="w-20 lg:w-full h-8" viewBox="0 0 100 30">
                        <path d="${generateSparklinePath(cli.weightTrend)}" fill="none" stroke="${cli.compliance > 80 ? '#006e2f' : '#9d4300'}" stroke-width="2"></path>
                    </svg>
                </td>
                
                <!-- Actions Column (Desktop-only) -->
                <td class="hidden lg:table-cell p-0 lg:p-4 pr-0 lg:pr-6 text-right">
                    <button onclick="openClientProgramDiscussion('${cli.activeProgramId}', '${cli.name}')" class="p-2 hover:bg-surface-container hover:text-primary rounded-full transition-colors inline-block cursor-pointer" title="Send message">
                        <span class="material-symbols-outlined text-[18px]">chat</span>
                    </button>
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

window.openClientProgramDiscussion = function(programId, clientName) {
    if (!programId || programId === 'prog_placeholder') {
        showToast('This client is not currently assigned to any active program.', 'info');
        return;
    }
    // Navigate to Programs tab
    navigateTo('admin-meal-builder');
    // Open Discussion for this program
    window.openProgramDiscussion(programId, clientName);
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
    if (state.editingProgramId) {
        toggleProgramViewMode(true);
        loadMealBuilderProgramPlan();
    } else {
        toggleProgramViewMode(false);
    }
    renderLibraryList();
}

window.toggleProgramViewMode = function(editing) {
    const sidebar = document.getElementById('library-sidebar');
    const mainContent = document.getElementById('meal-builder-main-content');
    const listView = document.getElementById('programs-list-view');
    const editorView = document.getElementById('program-editor-view');
    const discView = document.getElementById('program-discussion-view');
    
    if (discView) discView.classList.add('hidden');

    if (editing) {
        if (sidebar) {
            sidebar.classList.remove('hidden');
            sidebar.classList.add('flex');
        }
        if (mainContent) {
            mainContent.classList.remove('lg:col-span-12');
            mainContent.classList.add('lg:col-span-9', 'order-1');
        }
        if (listView) listView.classList.add('hidden');
        if (editorView) editorView.classList.remove('hidden');
    } else {
        if (sidebar) {
            sidebar.classList.add('hidden');
            sidebar.classList.remove('flex');
        }
        if (mainContent) {
            mainContent.classList.remove('lg:col-span-9', 'order-1');
            mainContent.classList.add('lg:col-span-12');
        }
        if (listView) listView.classList.remove('hidden');
        if (editorView) editorView.classList.add('hidden');
        
        state.editingProgramId = null;
        renderProgramsList();
    }
};

window.loadMealBuilderProgramPlan = function() {
    const progId = state.editingProgramId;
    const program = state.programs.find(p => p.id === progId);
    if (!program) return;
    
    const titleEl = document.getElementById('editor-program-title');
    if (titleEl) titleEl.innerText = program.name;
    
    const descEl = document.getElementById('editor-program-description');
    if (descEl) descEl.innerText = program.description;
    
    const kcalInput = document.getElementById('target-kcal');
    if (kcalInput) kcalInput.value = program.targetKcal || 2000;
    
    renderWeeklyMealTable();
};

window.saveProgramTargetKcal = function() {
    const progId = state.editingProgramId;
    const program = state.programs.find(p => p.id === progId);
    if (!program) return;
    
    const kcalVal = parseInt(document.getElementById('target-kcal').value) || 2000;
    program.targetKcal = kcalVal;
    
    saveAdminState();
    renderWeeklyTotalsSummary();
    showToast(`Target calorie for "${program.name}" updated to ${kcalVal} kcal/day`, 'success');
};

window.renderProgramsList = function() {
    const grid = document.getElementById('programs-cards-grid');
    if (!grid) return;
    
    const searchVal = (document.getElementById('programs-search')?.value || '').toLowerCase();
    const activeSpecialist = localStorage.getItem('nutriflow_specialist_name') || 'Dr. Hasan';
    
    const filtered = state.programs.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(searchVal) || p.description.toLowerCase().includes(searchVal);
        const matchesCreator = p.creator === activeSpecialist;
        return matchesSearch && matchesCreator;
    });
    
    if (filtered.length === 0) {
        grid.innerHTML = `
            <div class="col-span-full py-12 text-center text-on-surface-variant font-medium bg-white rounded-2xl border border-outline-variant/35 p-6">
                <span class="material-symbols-outlined text-4xl text-on-surface-variant/40 mb-2">assignment_late</span>
                <p class="text-xs">No programs found. Click "+ Create Program" to build one!</p>
            </div>
        `;
        return;
    }
    
    grid.innerHTML = filtered.map(p => {
        let totalMeals = 0;
        if (p.meals) {
            Object.values(p.meals).forEach(dayMeals => {
                if (Array.isArray(dayMeals)) {
                    totalMeals += dayMeals.length;
                }
            });
        }
        
        return `
            <div class="bg-surface-container-lowest border border-outline-variant/30 hover:border-primary/40 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all hover:scale-[1.01] flex flex-col justify-between min-h-[200px]">
                <div class="space-y-3">
                    <div class="flex justify-between items-start gap-4">
                        <h3 class="font-bold text-on-background text-sm leading-snug line-clamp-1">${p.name}</h3>
                        <button onclick="deleteProgram('${p.id}')" class="text-outline-variant hover:text-red-500 cursor-pointer shrink-0 mt-0.5" title="Delete Program">
                            <span class="material-symbols-outlined text-[18px]">delete</span>
                        </button>
                    </div>
                    <p class="text-xs text-on-surface-variant leading-relaxed line-clamp-3">${p.description}</p>
                </div>
                
                <div class="border-t border-outline-variant/20 pt-4 mt-5 flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
                    <div class="flex justify-between items-center w-full sm:w-auto">
                        <div class="flex flex-col">
                            <span class="text-[9px] text-on-surface-variant font-bold uppercase tracking-wider">Scheduled Meals</span>
                            <span class="text-xs font-extrabold text-primary">${totalMeals} meals</span>
                        </div>
                        <!-- share & chat icons next to it on mobile -->
                        <div class="flex sm:hidden items-center gap-1.5">
                            <button onclick="shareProgramLink('${p.id}')" class="bg-surface hover:bg-slate-50 border border-outline-variant/40 text-on-surface-variant font-bold p-2 rounded-xl transition-all cursor-pointer flex items-center justify-center" title="Share Program">
                                <span class="material-symbols-outlined text-[16px]">share</span>
                            </button>
                            <button onclick="openProgramDiscussion('${p.id}')" class="bg-surface hover:bg-slate-50 border border-outline-variant/40 text-on-surface-variant font-bold p-2 rounded-xl transition-all cursor-pointer flex items-center justify-center" title="Program Discussion">
                                <span class="material-symbols-outlined text-[16px]">forum</span>
                            </button>
                        </div>
                    </div>
                    
                    <div class="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
                        <button onclick="editProgramPlan('${p.id}')" class="flex-grow sm:flex-grow-0 bg-primary/10 hover:bg-primary/20 text-primary font-bold text-[10px] px-3.5 py-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5">
                            <span class="material-symbols-outlined text-sm">edit</span> Edit Plan
                        </button>
                        
                        <!-- Desktop-only share & forum buttons -->
                        <div class="hidden sm:flex items-center gap-1.5">
                            <button onclick="shareProgramLink('${p.id}')" class="bg-surface hover:bg-slate-50 border border-outline-variant/40 text-on-surface-variant font-bold p-1.5 rounded-xl transition-all cursor-pointer flex items-center justify-center" title="Share Program">
                                <span class="material-symbols-outlined text-[15px]">share</span>
                            </button>
                            <button onclick="openProgramDiscussion('${p.id}')" class="bg-surface hover:bg-slate-50 border border-outline-variant/40 text-on-surface-variant font-bold p-1.5 rounded-xl transition-all cursor-pointer flex items-center justify-center" title="Program Discussion">
                                <span class="material-symbols-outlined text-[15px]">forum</span>
                            </button>
                        </div>
                        
                        <button onclick="openPublishProgramDialog('${p.id}')" class="flex-grow sm:flex-grow-0 bg-primary hover:bg-[#005321] text-white font-bold text-[10px] px-3.5 py-2.5 rounded-xl transition-all shadow-sm cursor-pointer flex items-center justify-center gap-1.5">
                            <span class="material-symbols-outlined text-sm">send</span> Publish
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
};

window.editProgramPlan = function(programId) {
    state.editingProgramId = programId;
    renderAdminMealBuilder();
};

window.exitProgramEditor = function() {
    toggleProgramViewMode(false);
};

window.deleteProgram = function(programId) {
    if (confirm("Are you sure you want to delete this program? This action cannot be undone.")) {
        state.programs = state.programs.filter(p => p.id !== programId);
        saveAdminState();
        renderProgramsList();
        showToast("Program deleted successfully.", "success");
    }
};

window.openCreateProgramModal = function() {
    const modal = document.getElementById('create-program-modal');
    if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
    }
    const nameInput = document.getElementById('new-prog-name');
    const descInput = document.getElementById('new-prog-description');
    if (nameInput) nameInput.value = '';
    if (descInput) {
        descInput.value = '';
        descInput.style.height = 'auto';
    }
};

window.closeCreateProgramModal = function() {
    const modal = document.getElementById('create-program-modal');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }
};

window.handleCreateProgramSubmit = function(e) {
    e.preventDefault();
    const name = document.getElementById('new-prog-name').value.trim();
    const description = document.getElementById('new-prog-description').value.trim();
    const activeSpecialist = localStorage.getItem('nutriflow_specialist_name') || 'Dr. Hasan';
    
    if (!name || !description) return;

    const newProgram = {
        id: 'prog-' + Date.now(),
        name: name,
        description: description,
        creator: activeSpecialist,
        targetKcal: 2000,
        meals: {
            'Mon': [], 'Tue': [], 'Wed': [], 'Thu': [], 'Fri': [], 'Sat': [], 'Sun': []
        }
    };
    
    state.programs.push(newProgram);
    saveAdminState();
    closeCreateProgramModal();
    
    // Automatically open the editor for this new program
    state.editingProgramId = newProgram.id;
    renderAdminMealBuilder();
    
    showToast(`Program "${name}" created successfully! Pick your meals below.`, "success");
};

window.setLibraryFilter = function(filter) {
    state.adminSelectedFoodFilter = filter;
    
    // Toggle active class on chips
    const chips = document.querySelectorAll('.library-chip');
    chips.forEach(chip => {
        const onclickAttr = chip.getAttribute('onclick') || '';
        const isActive = onclickAttr.includes(`'${filter}'`);
        if (isActive) {
            chip.className = 'library-chip active bg-primary text-white text-[9px] font-bold py-1.5 rounded-lg hover:opacity-90 transition-all text-center';
        } else {
            chip.className = 'library-chip bg-surface-container border border-outline-variant/30 text-[9px] font-bold text-on-surface-variant py-1.5 rounded-lg hover:bg-slate-100 transition-all text-center';
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
    
    container.innerHTML = filtered.map(f => {
        let tagHtml = '';
        if (f.id === 'f-1' || f.id === 'f-3') {
            tagHtml = `<span class="inline-block bg-[#eff6ff] text-[#1e40af] text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider mt-1.5">Vegetarian</span>`;
        } else if (f.id === 'f-2' || f.id === 'f-4') {
            tagHtml = `<span class="inline-block bg-[#f0fdf4] text-[#166534] text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider mt-1.5">High Protein</span>`;
        } else {
            tagHtml = `<span class="inline-block bg-[#fef3c7] text-[#92400e] text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider mt-1.5">Raw Food</span>`;
        }

        return `
            <div draggable="true" ondragstart="handleLibraryDragStart(event, '${f.id}')" class="bg-white border border-outline-variant/30 rounded-2xl p-4 flex gap-3.5 items-center shadow-sm cursor-grab active:cursor-grabbing hover:border-primary/45 transition-colors">
                <div class="w-14 h-14 rounded-xl overflow-hidden bg-slate-100 shrink-0 select-none pointer-events-none">
                    <img class="w-full h-full object-cover" src="${f.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100'}" alt="${f.title}">
                </div>
                <div class="min-w-0 flex-grow text-left select-none pointer-events-none">
                    <h4 class="font-bold text-xs text-slate-800 leading-snug">${f.title}</h4>
                    <p class="text-[10px] text-slate-500 font-medium mt-0.5">${f.calories} kcal · ${f.p}g P · ${f.c}g C · ${f.f}g F</p>
                    ${tagHtml}
                </div>
            </div>
        `;
    }).join('');
}

function renderWeeklyMealTable() {
    const tbody = document.getElementById('weekly-meal-table-body');
    if (!tbody) return;
    
    const progId = state.editingProgramId;
    const program = state.programs.find(p => p.id === progId) || {};
    const clientPlan = program.meals || {};
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const rowTypes = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];
    
    let html = '';
    
    rowTypes.forEach(rowType => {
        let rowHeaderHtml = '';
        if (rowType === 'Breakfast') {
            rowHeaderHtml = `
                <div class="flex flex-col items-center justify-center gap-1 py-2">
                    <span class="material-symbols-outlined text-[#006e2f] text-2xl" style="font-variation-settings: 'FILL' 1;">wb_twilight</span>
                    <span class="font-bold text-xs text-slate-700">${rowType}</span>
                </div>
            `;
        } else if (rowType === 'Lunch') {
            rowHeaderHtml = `
                <div class="flex flex-col items-center justify-center gap-1 py-2">
                    <span class="material-symbols-outlined text-[#9d4300] text-2xl" style="font-variation-settings: 'FILL' 1;">sunny</span>
                    <span class="font-bold text-xs text-slate-700">${rowType}</span>
                </div>
            `;
        } else if (rowType === 'Dinner') {
            rowHeaderHtml = `
                <div class="flex flex-col items-center justify-center gap-1 py-2">
                    <span class="material-symbols-outlined text-indigo-700 text-2xl" style="font-variation-settings: 'FILL' 1;">nights_stay</span>
                    <span class="font-bold text-xs text-slate-700">${rowType}</span>
                </div>
            `;
        } else {
            rowHeaderHtml = `
                <div class="flex flex-col items-center justify-center gap-1 py-2">
                    <span class="material-symbols-outlined text-[#006a61] text-2xl" style="font-variation-settings: 'FILL' 1;">cookie</span>
                    <span class="font-bold text-xs text-slate-700">${rowType}</span>
                </div>
            `;
        }

        html += `<tr class="hover:bg-slate-50/50 transition-colors">`;
        html += `<td class="p-3 border-r border-outline-variant/20 bg-surface-container-low/20 align-middle text-center w-[12%]">${rowHeaderHtml}</td>`;
        
        days.forEach(day => {
            const meals = (clientPlan[day] || []).filter(m => m.type.toLowerCase() === rowType.toLowerCase());
            
            html += `<td class="p-3 border-r border-outline-variant/20 align-middle relative min-h-[100px]" ondragover="handleCellDragOver(event)" ondrop="handleCellDrop(event, '${day}', '${rowType}')">`;
            
            if (meals.length === 0) {
                // Centered circular plus icon
                html += `
                    <div class="flex items-center justify-center h-16">
                        <button onclick="openAssignFoodModal('${day}', '${rowType}')" class="text-slate-300 hover:text-primary transition-colors flex items-center justify-center cursor-pointer">
                            <span class="material-symbols-outlined" style="font-size:26px;">add_circle</span>
                        </button>
                    </div>
                `;
            } else {
                html += `<div class="flex flex-col gap-2">`;
                meals.forEach(m => {
                    html += `
                        <div class="bg-white border border-outline-variant/30 rounded-xl p-3 flex flex-col gap-1 relative shadow-sm text-[11px] text-left">
                            <button onclick="removeFoodFromSlot('${day}', '${rowType}', '${m.title}')" class="absolute top-2 right-2 text-slate-400 hover:text-red-600 transition-colors flex items-center justify-center cursor-pointer shrink-0">
                                <span class="material-symbols-outlined text-[14px]">close</span>
                            </button>
                            <div class="font-bold text-slate-800 pr-4 leading-tight">${m.title}</div>
                            <div class="text-[10px] text-slate-500 mt-0.5">${m.calories} kcal</div>

                        </div>
                    `;
                });
                // Dotted border card with plus symbol under the meals
                html += `
                    <button onclick="openAssignFoodModal('${day}', '${rowType}')" class="w-full border border-dashed border-outline-variant/40 hover:border-primary/60 hover:bg-primary/5 rounded-xl py-1.5 flex items-center justify-center text-slate-400 hover:text-primary transition-all cursor-pointer">
                        <span class="material-symbols-outlined text-sm">add</span>
                    </button>
                `;
                html += `</div>`;
            }
            
            html += `</td>`;
        });
        
        html += `</tr>`;
    });
    
    tbody.innerHTML = html;
    
    renderWeeklyTotalsSummary();
}

window.setSelectedTotalsDay = function(day) {
    state.selectedTotalsDay = day;
    renderWeeklyTotalsSummary();
};

function renderWeeklyTotalsSummary() {
    const container = document.getElementById('weekly-totals-summary-container');
    if (!container) return;
    
    const progId = state.editingProgramId;
    const program = state.programs.find(p => p.id === progId) || {};
    const clientPlan = program.meals || {};
    
    if (!state.selectedTotalsDay) {
        state.selectedTotalsDay = 'Mon';
    }
    const day = state.selectedTotalsDay;
    const targetKcal = parseInt(document.getElementById('target-kcal').value) || 2000;
    
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
    
    let html = `
        <div class="bg-white border border-outline-variant/30 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 w-full">
            <!-- Left Side: Calorie Progress -->
            <div class="w-full md:w-[35%] flex flex-col gap-2">
                <div>
                    <span class="text-xs text-slate-500 font-semibold uppercase tracking-wider block mb-1">${day} Totals</span>
                    <span class="text-2xl font-extrabold text-slate-800">${kcal.toLocaleString()} <span class="text-sm font-normal text-slate-500">/ ${targetKcal.toLocaleString()} kcal</span></span>
                </div>
                <div class="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div class="bg-[#006e2f] h-full rounded-full transition-all" style="width: ${pct}%"></div>
                </div>
            </div>
            
            <!-- Middle: Divider -->
            <div class="hidden md:block w-px h-12 bg-slate-200"></div>
            
            <!-- Right Side: Macros Row -->
            <div class="w-full md:w-[60%] flex flex-row items-center justify-around gap-4">
                <!-- Protein Column -->
                <div class="flex gap-3 items-center">
                    <div class="w-1.5 h-8 bg-[#006e2f] rounded-full"></div>
                    <div>
                        <div class="text-[9px] uppercase tracking-wider font-extrabold text-slate-500">Protein</div>
                        <div class="text-base font-bold text-slate-800">${p}g</div>
                    </div>
                </div>
                
                <!-- Carbs Column -->
                <div class="flex gap-3 items-center">
                    <div class="w-1.5 h-8 bg-[#006e2f] rounded-full"></div>
                    <div>
                        <div class="text-[9px] uppercase tracking-wider font-extrabold text-slate-500">Carbs</div>
                        <div class="text-base font-bold text-slate-800">${c}g</div>
                    </div>
                </div>
                
                <!-- Fats Column -->
                <div class="flex gap-3 items-center">
                    <div class="w-1.5 h-8 bg-[#9d4300] rounded-full"></div>
                    <div>
                        <div class="text-[9px] uppercase tracking-wider font-extrabold text-slate-500">Fats</div>
                        <div class="text-base font-bold text-slate-800">${f}g</div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Day selector hint -->
        <div class="text-[10px] text-center text-slate-400 mt-3">
            Click on a day column header (e.g. Mon, Tue) to view its daily macronutrient breakdown totals.
        </div>
    `;
    
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
    
    const progId = state.editingProgramId;
    const program = state.programs.find(p => p.id === progId);
    if (!program) return;
    
    if (!program.meals) program.meals = {};
    const day = state.activeAssignDay;
    if (!program.meals[day]) program.meals[day] = [];
    
    program.meals[day].push({
        type: state.activeAssignMealType,
        title: food.title,
        calories: food.calories,
        p: food.p,
        c: food.c,
        f: food.f,
        image: food.image,
        recipeIngredients: food.recipeIngredients || '',
        recipeSteps: food.recipeSteps || ''
    });
    
    saveAdminState();
    closeAssignFoodModal();
    renderWeeklyMealTable();
};

window.handleLibraryDragStart = function(event, foodId) {
    event.dataTransfer.setData('text/plain', foodId);
    event.dataTransfer.effectAllowed = 'copy';
};

window.handleCellDragOver = function(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'copy';
};

window.handleCellDrop = function(event, day, mealType) {
    event.preventDefault();
    const foodId = event.dataTransfer.getData('text/plain');
    if (!foodId) return;

    const food = state.foodLibrary.find(f => f.id === foodId);
    if (!food) return;

    const progId = state.editingProgramId;
    const program = state.programs.find(p => p.id === progId);
    if (!program) return;

    if (!program.meals) program.meals = {};
    if (!program.meals[day]) program.meals[day] = [];

    // Overwrite slot if it exists
    program.meals[day] = program.meals[day].filter(m => m.type.toLowerCase() !== mealType.toLowerCase());

    program.meals[day].push({
        type: mealType,
        title: food.title,
        calories: food.calories,
        p: food.p,
        c: food.c,
        f: food.f,
        image: food.image,
        recipeIngredients: food.recipeIngredients || '',
        recipeSteps: food.recipeSteps || ''
    });

    saveAdminState();
    renderWeeklyMealTable();
    renderWeeklyTotalsSummary();
    showToast(`Added ${food.title} to ${day} ${mealType}!`, 'success');
};

window.openAddFoodModal = function() {
    document.getElementById('add-food-modal').classList.remove('hidden');
    document.getElementById('add-food-modal').classList.add('flex');
};

window.closeAddFoodModal = function() {
    document.getElementById('add-food-modal').classList.add('hidden');
    document.getElementById('add-food-modal').classList.remove('flex');
};

window.handleAddFoodSubmit = function(e) {
    e.preventDefault();
    const name = document.getElementById('food-name').value;
    const type = document.getElementById('food-category').value;
    const calories = parseInt(document.getElementById('food-kcal').value) || 0;
    const p = parseInt(document.getElementById('food-pro').value) || 0;
    const c = parseInt(document.getElementById('food-carb').value) || 0;
    const f = parseInt(document.getElementById('food-fat').value) || 0;
    const imgUrl = document.getElementById('food-image-url').value.trim() || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200';
    const recipeIngredients = document.getElementById('food-recipe-ingredients').value.trim();
    const recipeSteps = document.getElementById('food-recipe-steps').value.trim();

    const newFood = {
        id: `f-${Date.now()}`,
        title: name,
        type: type,
        calories: calories,
        p: p,
        c: c,
        f: f,
        image: imgUrl,
        favorite: false,
        recipeIngredients: recipeIngredients,
        recipeSteps: recipeSteps
    };

    state.foodLibrary.push(newFood);
    saveAdminState();
    closeAddFoodModal();
    renderLibraryList();
    showToast(`Added ${name} to library!`, 'success');

    // Reset inputs
    document.getElementById('food-name').value = '';
    document.getElementById('food-kcal').value = '';
    document.getElementById('food-pro').value = '';
    document.getElementById('food-carb').value = '';
    document.getElementById('food-fat').value = '';
    document.getElementById('food-image-url').value = '';
    document.getElementById('food-recipe-ingredients').value = '';
    document.getElementById('food-recipe-steps').value = '';
};

window.removeFoodFromSlot = function(day, mealType, foodTitle) {
    const progId = state.editingProgramId;
    const program = state.programs.find(p => p.id === progId);
    if (!program || !program.meals || !program.meals[day]) return;
    
    program.meals[day] = program.meals[day].filter(
        m => !(m.type.toLowerCase() === mealType.toLowerCase() && m.title === foodTitle)
    );
    
    saveAdminState();
    renderWeeklyMealTable();
};

window.publishWeeklyPlanToClient = function() {
    const client = state.selectedMealBuilderClient;
    
    // Get live meal plans or init empty object
    const livePlans = JSON.parse(localStorage.getItem('nutriflow_client_meal_plans')) || {};
    
    // Copy active client's draft meal plan to live state
    livePlans[client] = JSON.parse(JSON.stringify(state.clientMealPlans[client] || {}));
    
    // Write back live plans to nutriflow_client_meal_plans
    localStorage.setItem('nutriflow_client_meal_plans', JSON.stringify(livePlans));
    
    saveAdminState();
    showToast(`Weekly meal plan for ${client} published successfully!`, 'success');
};

window.saveWeeklyTemplate = function() {
    showToast(`Weekly meal template saved successfully!`, 'success');
};

window.previewWeeklyPlan = function() {
    const client = state.selectedMealBuilderClient;
    const origin = window.location.origin;
    let clientUrl = origin;
    if (clientUrl.endsWith('/admin') || clientUrl.endsWith('/admin/')) {
        clientUrl = clientUrl.replace(/\/admin\/?$/, '');
    }
    const previewUrl = `${clientUrl}/index.html?client=${encodeURIComponent(client)}&preview=true`;
    
    saveAdminState();
    window.open(previewUrl, '_blank');
};

// ==================== APPOINTMENTS TABLE ====================
state.appointmentFilter = 'all';

window.setAppointmentsFilter = function(filter) {
    state.appointmentFilter = filter;
    
    // Sync select dropdown if changed programmatically
    const select = document.getElementById('appointments-filter-status');
    if (select && select.value !== filter) {
        select.value = filter;
    }

    renderAdminAppointmentsTable();
};

window.renderAdminAppointmentsTable = function() {
    loadAdminState(); // sync fresh appointments from LocalStorage
    
    const tbody = document.getElementById('appointments-table-body');
    const footer = document.getElementById('appointments-table-footer');
    if (!tbody) return;

    const searchTerm = (document.getElementById('appointments-search')?.value || '').toLowerCase();
    
    let filtered = state.appointments.filter(apt => {
        const matchSearch = apt.clientName.toLowerCase().includes(searchTerm) || apt.serviceTitle.toLowerCase().includes(searchTerm);
        
        let matchFilter = true;
        if (state.appointmentFilter !== 'all') {
            matchFilter = apt.status === state.appointmentFilter;
        }
        
        return matchSearch && matchFilter;
    });

    if (filtered.length === 0) {
        tbody.innerHTML = `<tr><td colspan="8" class="text-center py-8 text-on-surface-variant text-sm">No reservations found.</td></tr>`;
        if (footer) footer.innerText = 'Showing 0 reservations';
        return;
    }

    const getStatusStyle = (status) => {
        if (status === 'approved' || status === 'confirmed' || status === 'completed') return 'bg-emerald-100 text-emerald-800 border-emerald-200';
        if (status === 'pending') return 'bg-yellow-100 text-yellow-800 border-yellow-200';
        if (status === 'cancelled') return 'bg-gray-100 text-gray-800 border-gray-200';
        return 'bg-surface-container-high text-on-surface border-outline-variant/30';
    };

    const getStatusText = (status) => {
        if (status === 'approved') return 'Confirmed';
        return status.charAt(0).toUpperCase() + status.slice(1);
    };

    tbody.innerHTML = filtered.map(apt => `
        <tr class="flex flex-col lg:table-row bg-surface-container-lowest border border-outline-variant/30 lg:border-0 rounded-2xl p-4 lg:p-0 gap-3 mb-4 lg:mb-0 hover:bg-surface-container-low/30 transition-colors shadow-[0_2px_8px_rgba(0,0,0,0.02)] lg:shadow-none">
            <!-- Patient Header (Mobile Card Header - Click to Expand) -->
            <td onclick="toggleMobileAccordion(this.closest('tr'))" class="cursor-pointer lg:cursor-default flex justify-between items-center lg:table-cell p-0 lg:p-4 pl-0 lg:pl-6 text-left border-b border-outline-variant/15 lg:border-0 pb-3 lg:pb-4">
                <div class="flex justify-between items-start w-full">
                    <div class="text-left">
                        <div class="font-bold text-on-background text-sm lg:text-xs">${apt.clientName}</div>
                        <div class="text-[10px] font-mono text-on-surface-variant/80 mt-0.5">#${apt.id.toUpperCase()}</div>
                    </div>
                    <div class="flex items-center gap-2">
                        <!-- Status Badge on Mobile -->
                        <span class="lg:hidden px-2.5 py-0.5 rounded-full text-[9px] font-bold border ${getStatusStyle(apt.status)}">
                            ${getStatusText(apt.status)}
                        </span>
                        <!-- Accordion Chevron Toggle -->
                        <button class="lg:hidden p-1 text-on-surface-variant hover:text-primary transition-colors">
                            <span class="accordion-chevron material-symbols-outlined text-[20px]">expand_more</span>
                        </button>
                    </div>
                </div>
            </td>
            
            <!-- Hidden ID Column for mobile (shown in Header) -->
            <td class="hidden lg:table-cell px-6 py-4 font-mono text-[10px] text-on-surface-variant">#${apt.id.toUpperCase()}</td>
            
            <!-- Service Field (Collapsible) -->
            <td class="accordion-content hidden lg:table-cell flex justify-between items-center p-0 lg:p-4 text-left mt-2 lg:mt-0">
                <span class="lg:hidden text-[10px] font-bold uppercase tracking-wider text-on-surface-variant/75">Service</span>
                <span class="font-semibold text-on-background lg:text-on-surface-variant lg:font-normal text-xs lg:text-[11px]">${apt.serviceTitle}</span>
            </td>
            
            <!-- Therapist Field (Collapsible) -->
            <td class="accordion-content hidden lg:table-cell flex justify-between items-center p-0 lg:p-4 text-left">
                <span class="lg:hidden text-[10px] font-bold uppercase tracking-wider text-on-surface-variant/75">Therapist</span>
                <span class="font-semibold text-on-background lg:text-on-surface-variant lg:font-normal text-xs lg:text-[11px]">${apt.therapist || 'Unknown'}</span>
            </td>
            
            <!-- Date & Time Field (Collapsible) -->
            <td class="accordion-content hidden lg:table-cell flex justify-between items-center p-0 lg:p-4 text-on-surface-variant text-right lg:text-left">
                <span class="lg:hidden text-[10px] font-bold uppercase tracking-wider text-on-surface-variant/75">Date & Time</span>
                <span class="font-semibold text-on-background lg:text-on-surface-variant lg:font-normal text-xs lg:text-[11px]">${apt.date} • ${apt.time}</span>
            </td>
            
            <!-- Duration Field (Collapsible) -->
            <td class="accordion-content hidden lg:table-cell flex justify-between items-center p-0 lg:p-4 text-left">
                <span class="lg:hidden text-[10px] font-bold uppercase tracking-wider text-on-surface-variant/75">Duration</span>
                <span class="font-semibold text-on-background lg:text-on-surface-variant lg:font-normal text-xs lg:text-[11px]">${apt.duration}</span>
            </td>
            
            <!-- Status Column (Desktop-only, shown in Header on mobile) -->
            <td class="hidden lg:table-cell p-0 lg:p-4 text-center">
                <span class="px-2.5 py-1 rounded-full text-[9px] font-bold border ${getStatusStyle(apt.status)}">
                    ${getStatusText(apt.status)}
                </span>
            </td>
            
            <!-- Actions Column (Collapsible) -->
            <td class="accordion-content hidden lg:table-cell flex justify-between items-center p-0 lg:p-4 pr-0 lg:pr-6 text-right">
                <span class="lg:hidden text-[10px] font-bold uppercase tracking-wider text-on-surface-variant/75">Actions</span>
                <div class="flex items-center justify-end gap-1">
                    ${apt.status === 'pending' ? `
                        <button onclick="event.stopPropagation(); approveAppointment('${apt.id}')" class="text-emerald-600 hover:bg-emerald-50 p-1.5 rounded-lg transition-colors cursor-pointer" title="Approve">
                            <span class="material-symbols-outlined text-[16px]">check_circle</span>
                        </button>
                        <button onclick="event.stopPropagation(); declineAppointment('${apt.id}')" class="text-red-500 hover:bg-red-50 p-1.5 rounded-lg transition-colors cursor-pointer" title="Decline">
                            <span class="material-symbols-outlined text-[16px]">cancel</span>
                        </button>
                    ` : `
                        ${(apt.type === 'Video Call' || apt.type.toLowerCase().includes('virtual') || apt.type.toLowerCase().includes('video')) && apt.status === 'approved' ? `
                            <button onclick="event.stopPropagation(); joinAdminVideoCall('${apt.id}')" class="text-primary hover:bg-primary/10 p-1.5 rounded-lg transition-colors cursor-pointer" title="Join Video Call">
                                <span class="material-symbols-outlined text-[16px]">videocam</span>
                            </button>
                        ` : ''}
                        <button onclick="event.stopPropagation(); editAppointment('${apt.id}')" class="text-on-surface-variant hover:text-primary hover:bg-surface-container p-1.5 rounded-lg transition-colors cursor-pointer" title="Edit">
                            <span class="material-symbols-outlined text-[16px]">edit</span>
                        </button>
                        <button onclick="event.stopPropagation(); deleteAppointment('${apt.id}')" class="text-on-surface-variant hover:text-red-500 hover:bg-red-50 p-1.5 rounded-lg transition-colors cursor-pointer" title="Delete">
                            <span class="material-symbols-outlined text-[16px]">delete</span>
                        </button>
                    `}
                </div>
            </td>
        </tr>
    `).join('');

    if (footer) footer.innerText = `Showing ${filtered.length} reservation${filtered.length !== 1 ? 's' : ''}`;
};

window.approveAppointment = function(id) {
    const apt = state.appointments.find(a => a.id === id);
    if (apt) {
        apt.status = 'approved';
        saveAdminState();
        showToast(`Approved session for ${apt.clientName}!`, 'success');
        renderAdminAppointmentsTable();
    }
};

window.declineAppointment = function(id) {
    state.appointments = state.appointments.filter(a => a.id !== id);
    saveAdminState();
    showToast('Declined request.');
    renderAdminAppointmentsTable();
};

window.editAppointment = function(id) {
    showToast('Edit appointment functionality not available in this prototype.', 'info');
};

window.deleteAppointment = function(id) {
    if (confirm('Are you sure you want to delete this appointment?')) {
        state.appointments = state.appointments.filter(a => a.id !== id);
        saveAdminState();
        showToast('Appointment deleted.', 'success');
        renderAdminAppointmentsTable();
    }
};

window.joinAdminVideoCall = function(aptId) {
    const apt = state.appointments.find(a => a.id === aptId);
    if (!apt) return;
    
    showToast(`Connecting to video call with client ${apt.clientName}...`, 'success');
    setTimeout(() => {
        window.location.href = `../telehealth.html?practitioner=${encodeURIComponent(apt.therapist)}&role=admin&client=${encodeURIComponent(apt.clientName)}`;
    }, 850);
};

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

window.openEditCommentModal = function(day, mealType, mealTitle, currentCommentEncoded) {
    state.activeCommentDay = day;
    state.activeCommentMealType = mealType;
    state.activeCommentMealTitle = mealTitle;

    let currentComment = '';
    if (currentCommentEncoded) {
        try {
            currentComment = decodeURIComponent(currentCommentEncoded);
        } catch (e) {
            currentComment = currentCommentEncoded;
        }
    }

    const titleEl = document.getElementById('comment-modal-meal-title');
    if (titleEl) {
        titleEl.innerText = `${day} · ${mealType} · ${mealTitle}`;
    }
    const txtArea = document.getElementById('comment-textarea');
    if (txtArea) {
        txtArea.value = currentComment;
    }

    const modal = document.getElementById('edit-comment-modal');
    if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
    }
};

window.closeEditCommentModal = function() {
    const modal = document.getElementById('edit-comment-modal');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }
};

window.saveMealComment = function() {
    const day = state.activeCommentDay;
    const mealType = state.activeCommentMealType;
    const mealTitle = state.activeCommentMealTitle;
    const commentVal = document.getElementById('comment-textarea').value.trim();

    const progId = state.editingProgramId;
    const program = state.programs.find(p => p.id === progId);
    if (program && program.meals && program.meals[day]) {
        const meal = program.meals[day].find(
            m => m.type.toLowerCase() === mealType.toLowerCase() && m.title === mealTitle
        );
        if (meal) {
            meal.comment = commentVal;
            saveAdminState();
            renderWeeklyMealTable();
            showToast('Comment updated successfully!', 'success');
        }
    }
    closeEditCommentModal();
};

window.shareProgramLink = function(programId) {
    shareProgramLinkLogic(programId);
};

window.shareProgramDirect = function() {
    const progId = state.editingProgramId;
    if (progId) {
        shareProgramLinkLogic(progId);
    }
};

function shareProgramLinkLogic(programId) {
    const program = state.programs.find(p => p.id === programId);
    if (!program) return;
    
    state.sharingProgramId = programId;
    const specialist = localStorage.getItem('nutriflow_specialist_name') || 'Dr. Hasan';
    
    const origin = window.location.origin;
    let clientUrl = origin;
    if (clientUrl.endsWith('/admin') || clientUrl.endsWith('/admin/')) {
        clientUrl = clientUrl.replace(/\/admin\/?$/, '');
    }
    const previewUrl = `${clientUrl}/index.html?programId=${programId}&preview=true`;
    
    const urlInput = document.getElementById('share-preview-url-input');
    if (urlInput) urlInput.value = previewUrl;
    
    const subjectEl = document.getElementById('share-email-subject');
    if (subjectEl) subjectEl.innerText = `Your Personalized Program "${program.name}" from ${specialist}`;
    
    const salutationEl = document.getElementById('share-email-body-salutation');
    if (salutationEl) salutationEl.innerText = `Hi,`;
    
    const doctorNameEl = document.getElementById('share-email-doctor-name');
    if (doctorNameEl) doctorNameEl.innerText = specialist;
    
    const recipientsInput = document.getElementById('share-email-recipients');
    if (recipientsInput) recipientsInput.value = '';
    
    draftedRecipients = [];
    renderDraftedRecipients();
    
    const modal = document.getElementById('share-preview-modal');
    if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
    }
}

window.closeSharePreviewModal = function() {
    const modal = document.getElementById('share-preview-modal');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }
};

window.copySharePreviewLink = function() {
    const urlInput = document.getElementById('share-preview-url-input');
    if (urlInput) {
        urlInput.select();
        navigator.clipboard.writeText(urlInput.value).then(() => {
            showToast('Preview link copied to clipboard!', 'success');
        }).catch(() => {
            showToast('Failed to copy link. Please select and copy manually.', 'error');
        });
    }
};

window.copyInvitationEmailText = function() {
    const progId = state.sharingProgramId;
    const program = state.programs.find(p => p.id === progId);
    if (!program) return;
    
    const specialist = localStorage.getItem('nutriflow_specialist_name') || 'Dr. Hasan';
    const previewUrl = document.getElementById('share-preview-url-input')?.value || '';
    
    const emailBody = `Subject: Your Personalized Program "${program.name}" from ${specialist}

Hi,

I have prepared your custom nutrition program "${program.name}" to help you hit your daily health goals:
${program.description}

You can view your custom weekly plan directly on our client portal without needing to register first:
${previewUrl}

After reviewing the menu, simply click the "Register" button to start logging your meals and message me directly.

Best regards,
${specialist}`;

    navigator.clipboard.writeText(emailBody).then(() => {
        showToast('Email body copied to clipboard!', 'success');
    }).catch(() => {
        showToast('Failed to copy email body.', 'error');
    });
};

window.sendPreviewEmails = function() {
    if (draftedRecipients.length === 0) {
        showToast('Please add at least one recipient email address first.', 'error');
        return;
    }
    
    const progId = state.sharingProgramId;
    const program = state.programs.find(p => p.id === progId);
    if (!program) return;
    
    showToast(`Program "${program.name}" successfully sent to: ${draftedRecipients.join(', ')}!`, 'success');
    closeSharePreviewModal();
};

window.addRecipientEmail = function() {
    const input = document.getElementById('share-email-recipients');
    if (!input) return;
    const email = input.value.trim();
    if (!email) return;
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showToast('Please enter a valid email address.', 'error');
        return;
    }
    
    if (draftedRecipients.includes(email)) {
        showToast('This email is already in the list.', 'info');
        return;
    }
    
    draftedRecipients.push(email);
    input.value = '';
    renderDraftedRecipients();
};

function renderDraftedRecipients() {
    const container = document.getElementById('drafted-emails-container');
    if (!container) return;
    
    container.innerHTML = draftedRecipients.map((email, idx) => `
        <span class="inline-flex items-center gap-1 bg-primary/10 text-primary text-[10px] font-bold px-2.5 py-1 rounded-full border border-primary/20">
            ${email}
            <button onclick="removeRecipientEmail(${idx})" type="button" class="text-primary hover:text-[#ba1a1a] font-bold shrink-0 flex items-center justify-center cursor-pointer ml-1">
                <span class="material-symbols-outlined text-[11px]">close</span>
            </button>
        </span>
    `).join('');
}

window.removeRecipientEmail = function(idx) {
    draftedRecipients.splice(idx, 1);
    renderDraftedRecipients();
};

window.openPublishProgramDialog = function(programId) {
    openPublishProgramDialogLogic(programId);
};

window.publishProgramDirect = function() {
    const progId = state.editingProgramId;
    if (progId) {
        openPublishProgramDialogLogic(progId);
    }
};

function openPublishProgramDialogLogic(programId) {
    const program = state.programs.find(p => p.id === programId);
    if (!program) return;
    
    state.publishingProgramId = programId;
    
    const container = document.getElementById('publish-target-clients-container');
    if (container) {
        const activeSpecialist = localStorage.getItem('nutriflow_specialist_name') || 'Dr. Hasan';
        const myClients = state.clients.filter(c => c.therapist === activeSpecialist);
        const listToUse = myClients.length > 0 ? myClients : state.clients;
        
        container.innerHTML = listToUse.map(c => {
            const isChecked = c.activeProgramId === programId ? 'checked' : '';
            return `
                <label class="flex items-center gap-3 text-xs text-slate-700 hover:bg-slate-100 p-1.5 rounded-lg cursor-pointer transition-all">
                    <input type="checkbox" name="publish-client-checkbox" value="${c.name}" ${isChecked} class="w-4 h-4 rounded text-primary focus:ring-primary border-slate-300">
                    <span class="font-medium">${c.name}</span>
                </label>
            `;
        }).join('');
    }
    
    const modal = document.getElementById('publish-program-modal');
    if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
    }
}

window.closePublishProgramModal = function() {
    const modal = document.getElementById('publish-program-modal');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }
};

window.handlePublishProgramSubmit = function(e) {
    e.preventDefault();
    const checkedBoxes = document.querySelectorAll('input[name="publish-client-checkbox"]:checked');
    const selectedClientNames = Array.from(checkedBoxes).map(box => box.value);
    
    if (selectedClientNames.length === 0) {
        showToast('Please select at least one client to publish the program to.', 'error');
        return;
    }
    
    const progId = state.publishingProgramId;
    const program = state.programs.find(p => p.id === progId);
    if (!program) return;
    
    const livePlans = JSON.parse(localStorage.getItem('nutriflow_client_meal_plans')) || {};
    const draftPlans = JSON.parse(localStorage.getItem('nutriflow_client_meal_plans_draft')) || {};
    
    selectedClientNames.forEach(clientName => {
        const client = state.clients.find(c => c.name === clientName);
        if (client) {
            client.activeProgramId = progId;
            livePlans[clientName] = JSON.parse(JSON.stringify(program.meals || {}));
            draftPlans[clientName] = JSON.parse(JSON.stringify(program.meals || {}));
        }
    });
    
    localStorage.setItem('nutriflow_client_meal_plans', JSON.stringify(livePlans));
    localStorage.setItem('nutriflow_client_meal_plans_draft', JSON.stringify(draftPlans));
    
    saveAdminState();
    closePublishProgramModal();
    showToast(`Program "${program.name}" successfully published to: ${selectedClientNames.join(', ')}!`, 'success');
    
    renderProgramsList();
};

window.previewWeeklyPlan = function() {
    const progId = state.editingProgramId;
    const origin = window.location.origin;
    let clientUrl = origin;
    if (clientUrl.endsWith('/admin') || clientUrl.endsWith('/admin/')) {
        clientUrl = clientUrl.replace(/\/admin\/?$/, '');
    }
    const previewUrl = `${clientUrl}/index.html?programId=${progId}&preview=true`;
    
    saveAdminState();
    window.open(previewUrl, '_blank');
};

window.openProgramDiscussionDirect = function() {
    state.chatParentView = 'program-editor-view';
    const progId = state.editingProgramId;
    if (progId) {
        window.openProgramDiscussion(progId);
    }
};

window.openProgramDiscussion = function(programId, targetClientName = null) {
    state.activeDiscussionProgramId = programId;
    const program = state.programs.find(p => p.id === programId);
    if (!program) return;
    
    // When opened from client list, ensure parent view is set correctly
    // so the "Back" button goes back to list if not in editor mode
    if (!state.chatParentView) {
        state.chatParentView = 'programs-list-view';
    }
    
    // Find active clients on this program
    const myClients = state.clients.filter(c => c.activeProgramId === programId);
    let clientNames = myClients.map(c => c.name);
    
    // Scan existing chats to add guest or historical users
    const allProgramChats = JSON.parse(localStorage.getItem('nutriflow_program_chats')) || [];
    allProgramChats.forEach(chat => {
        if (chat.programId === programId && !clientNames.includes(chat.clientName)) {
            clientNames.push(chat.clientName);
        }
    });
    
    if (clientNames.length === 0) {
        clientNames = ['Guest User'];
    }
    
    // If targetClientName is provided, add them to the list if not present, and select them
    if (targetClientName) {
        if (!clientNames.includes(targetClientName)) {
            clientNames.unshift(targetClientName);
        }
        state.activeDiscussionClientName = targetClientName;
        state.mobileViewingThread = true;
    } else {
        state.activeDiscussionClientName = clientNames[0];
        state.mobileViewingThread = false;
    }
    
    // Hide editor and list views, show discussion view
    const sidebar = document.getElementById('library-sidebar');
    const mainContent = document.getElementById('meal-builder-main-content');
    const listView = document.getElementById('programs-list-view');
    const editorView = document.getElementById('program-editor-view');
    const discView = document.getElementById('program-discussion-view');
    
    if (sidebar) sidebar.classList.add('hidden');
    if (mainContent) mainContent.className = 'lg:col-span-12 flex flex-col gap-4 transition-all';
    
    if (listView) listView.classList.add('hidden');
    if (editorView) editorView.classList.add('hidden');
    if (discView) discView.classList.remove('hidden');
    
    const titleEl = document.getElementById('discussion-page-title');
    if (titleEl) {
        titleEl.innerHTML = `<span class="material-symbols-outlined text-primary text-xl">forum</span> Discussion: ${program.name}`;
    }
    
    window.renderDiscussionClientsList(clientNames);
    window.renderAdminProgramChat();
    window.updateMobileDiscussionUI();
};

window.renderDiscussionClientsList = function(clientNames) {
    const clientsListContainer = document.getElementById('discussion-page-clients-list');
    if (!clientsListContainer) return;
    
    // Re-fetch client list if not passed
    if (!clientNames) {
        const progId = state.activeDiscussionProgramId;
        const myClients = state.clients.filter(c => c.activeProgramId === progId);
        clientNames = myClients.map(c => c.name);
        
        const allProgramChats = JSON.parse(localStorage.getItem('nutriflow_program_chats')) || [];
        allProgramChats.forEach(chat => {
            if (chat.programId === progId && !clientNames.includes(chat.clientName)) {
                clientNames.push(chat.clientName);
            }
        });
        if (clientNames.length === 0) clientNames = ['Guest User'];
    }
    
    clientsListContainer.innerHTML = clientNames.map(name => {
        const isActive = name === state.activeDiscussionClientName;
        const activeBg = isActive ? 'bg-primary/10 border-primary text-primary' : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700';
        const initials = name.split(' ').map(s => s[0]).join('').substring(0, 2).toUpperCase();
        return `
            <div onclick="selectDiscussionClient('${name}')" class="flex items-center gap-3 p-3 border rounded-xl cursor-pointer transition-all shadow-sm ${activeBg}">
                <div class="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-extrabold text-[11px]">${initials}</div>
                <div class="flex-grow min-w-0">
                    <p class="text-xs font-bold truncate leading-tight">${name}</p>
                    <p class="text-[8px] text-slate-400 mt-0.5 uppercase tracking-wider">Client Thread</p>
                </div>
            </div>
        `;
    }).join('');
};

window.selectDiscussionClient = function(clientName) {
    state.activeDiscussionClientName = clientName;
    state.mobileViewingThread = true;
    window.renderDiscussionClientsList();
    window.renderAdminProgramChat();
    window.updateMobileDiscussionUI();
};

window.backToRecipients = function() {
    state.mobileViewingThread = false;
    window.updateMobileDiscussionUI();
};

window.updateMobileDiscussionUI = function() {
    const sidebar = document.getElementById('discussion-sidebar-panel');
    const chat = document.getElementById('discussion-chat-panel');
    const containerBox = document.getElementById('discussion-container-box');
    const mainHeader = document.getElementById('discussion-main-header');
    if (!sidebar || !chat) return;
    
    const isMobile = window.innerWidth < 1024;
    if (isMobile) {
        if (state.mobileViewingThread) {
            sidebar.classList.add('hidden');
            chat.classList.remove('hidden');
            chat.classList.add('flex');
            
            // Hide main header to maximize chat space
            if (mainHeader) mainHeader.classList.add('hidden');
            
            // Remove padding, borders, shadows for native-like full viewport look on mobile
            if (containerBox) {
                containerBox.className = "flex flex-col h-[calc(100vh-100px)] w-full gap-0 p-0 border-0 shadow-none bg-transparent";
            }
            
            // Auto scroll to bottom of chat when loaded
            const chatContainer = document.getElementById('admin-page-chat-container');
            if (chatContainer) chatContainer.scrollTop = chatContainer.scrollHeight;
        } else {
            sidebar.classList.remove('hidden');
            chat.classList.add('hidden');
            chat.classList.remove('flex');
            
            // Show main header
            if (mainHeader) mainHeader.classList.remove('hidden');
            
            // Restore regular container box classes
            if (containerBox) {
                containerBox.className = "bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant/30 shadow-sm flex flex-col gap-6";
            }
        }
    } else {
        sidebar.classList.remove('hidden');
        chat.classList.remove('hidden');
        chat.classList.add('flex');
        if (mainHeader) mainHeader.classList.remove('hidden');
        if (containerBox) {
            containerBox.className = "bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant/30 shadow-sm flex flex-col gap-6";
        }
    }
};

window.addEventListener('resize', () => {
    // Only process if active view is program-discussion-view
    const discView = document.getElementById('program-discussion-view');
    if (discView && !discView.classList.contains('hidden')) {
        window.updateMobileDiscussionUI();
    }
});

window.exitProgramDiscussion = function() {
    const discView = document.getElementById('program-discussion-view');
    if (discView) discView.classList.add('hidden');
    
    const parentView = state.chatParentView || 'programs-list-view';
    state.chatParentView = null;
    
    if (parentView === 'program-editor-view') {
        const editorView = document.getElementById('program-editor-view');
        if (editorView) editorView.classList.remove('hidden');
        
        const sidebar = document.getElementById('library-sidebar');
        if (sidebar) {
            sidebar.classList.remove('hidden');
            sidebar.classList.add('flex');
        }
        const mainContent = document.getElementById('meal-builder-main-content');
        if (mainContent) {
            mainContent.className = 'lg:col-span-9 flex flex-col gap-4 transition-all';
        }
    } else {
        const listView = document.getElementById('programs-list-view');
        if (listView) listView.classList.remove('hidden');
        
        const sidebar = document.getElementById('library-sidebar');
        if (sidebar) sidebar.classList.add('hidden');
        
        const mainContent = document.getElementById('meal-builder-main-content');
        if (mainContent) {
            mainContent.className = 'lg:col-span-12 flex flex-col gap-4 transition-all';
        }
    }
};

window.renderAdminProgramChat = function() {
    const container = document.getElementById('admin-page-chat-container');
    if (!container) return;
    
    const progId = state.activeDiscussionProgramId;
    const program = state.programs.find(p => p.id === progId);
    if (!program) return;
    
    const activeClient = state.activeDiscussionClientName || 'Guest User';
    
    const label = document.getElementById('discussion-chat-with-label');
    if (label) {
        label.innerText = activeClient;
    }
    
    const avatar = document.getElementById('chat-page-client-avatar');
    if (avatar) {
        const initials = activeClient.split(' ').map(s => s[0]).join('').substring(0, 2).toUpperCase();
        avatar.innerText = initials;
    }
    
    const allProgramChats = JSON.parse(localStorage.getItem('nutriflow_program_chats')) || [];
    const chatKey = `${progId}_${activeClient}`;
    let chatEntry = allProgramChats.find(c => c.id === chatKey);
    
    if (!chatEntry) {
        chatEntry = {
            id: chatKey,
            programId: progId,
            clientName: activeClient,
            chatHistory: [
                {
                    sender: 'doctor',
                    senderName: program.creator || 'Dr. Hasan',
                    text: `Welcome to your customized nutrition program "${program.name}". Feel free to ask me any questions or request adjustments directly in this private chat thread!`,
                    time: '10:00 AM'
                }
            ]
        };
    }
    
    container.innerHTML = chatEntry.chatHistory.map(msg => {
        const isDoc = msg.sender === 'doctor';
        const bubbleBg = isDoc ? 'bg-primary text-white rounded-tr-none' : 'bg-[#f1f5f9] text-slate-800 rounded-tl-none';
        const align = isDoc ? 'justify-end' : 'justify-start';
        
        let attachmentHtml = '';
        if (msg.file) {
            if (msg.file.type.startsWith('image/')) {
                attachmentHtml = `
                    <div class="mt-2 rounded-lg overflow-hidden max-w-full border border-outline-variant/20 shadow-sm bg-white p-1">
                        <img class="max-h-48 object-contain rounded-md" src="${msg.file.dataUrl}" alt="${msg.file.name}">
                    </div>
                `;
            } else {
                attachmentHtml = `
                    <a href="${msg.file.dataUrl}" download="${msg.file.name}" class="mt-2 flex items-center gap-2 p-2.5 rounded-xl bg-white border border-outline-variant/30 text-slate-800 hover:bg-slate-50 transition-colors w-fit max-w-full">
                        <span class="material-symbols-outlined text-primary text-xl">description</span>
                        <div class="text-left min-w-0">
                            <p class="text-xs font-bold truncate text-slate-700">${msg.file.name}</p>
                            <p class="text-[9px] text-slate-400 font-semibold">${(msg.file.size / 1024).toFixed(1)} KB</p>
                        </div>
                        <span class="material-symbols-outlined text-slate-400 hover:text-primary text-base ml-2">download</span>
                    </a>
                `;
            }
        }
        
        const messageText = msg.text ? `<div>${msg.text}</div>` : '';

        return `
            <div class="flex ${align} w-full">
                <div class="${bubbleBg} text-xs px-3.5 py-2.5 rounded-2xl max-w-[85%] shadow-sm leading-relaxed">
                    <div class="flex justify-between items-baseline gap-4 mb-0.5 opacity-80 text-[8px] font-bold uppercase tracking-wider">
                        <span>${msg.senderName}</span>
                        <span>${msg.time}</span>
                    </div>
                    ${messageText}
                    ${attachmentHtml}
                </div>
            </div>
        `;
    }).join('');
    
    container.scrollTop = container.scrollHeight;
};

window.handleAdminPageChatSubmit = function(e) {
    e.preventDefault();
    const input = document.getElementById('admin-page-chat-input');
    if (!input) return;
    
    const val = input.value.trim();
    if (!val) return;
    
    const progId = state.activeDiscussionProgramId;
    const program = state.programs.find(p => p.id === progId);
    if (!program) return;
    
    const activeClient = state.activeDiscussionClientName || 'Guest User';
    
    const allProgramChats = JSON.parse(localStorage.getItem('nutriflow_program_chats')) || [];
    const chatKey = `${progId}_${activeClient}`;
    let chatEntry = allProgramChats.find(c => c.id === chatKey);
    
    if (!chatEntry) {
        chatEntry = {
            id: chatKey,
            programId: progId,
            clientName: activeClient,
            chatHistory: [
                {
                    sender: 'doctor',
                    senderName: program.creator || 'Dr. Hasan',
                    text: `Welcome to your customized nutrition program "${program.name}". Feel free to ask me any questions or request adjustments directly in this private chat thread!`,
                    time: '10:00 AM'
                }
            ]
        };
        allProgramChats.push(chatEntry);
    }
    
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const specialist = localStorage.getItem('nutriflow_specialist_name') || 'Dr. Hasan';
    
    chatEntry.chatHistory.push({
        sender: 'doctor',
        senderName: specialist,
        text: val,
        time: timeNow
    });
    
    localStorage.setItem('nutriflow_program_chats', JSON.stringify(allProgramChats));
    input.value = '';
    window.renderAdminProgramChat();
    showToast('Reply sent successfully!', 'success');
};

window.openProgramChatSelectionModal = function() {
    const modal = document.getElementById('program-chat-selection-modal');
    if (!modal) return;
    
    const listContainer = document.getElementById('chat-selection-programs-list');
    if (listContainer) {
        if (state.programs.length === 0) {
            listContainer.innerHTML = `
                <div class="text-center py-6 text-xs text-on-surface-variant font-semibold">
                    No active programs found. Create a program first!
                </div>
            `;
        } else {
            listContainer.innerHTML = state.programs.map(p => {
                const activeClientsCount = state.clients.filter(c => c.activeProgramId === p.id).length;
                return `
                    <div onclick="selectProgramForChat('${p.id}')" class="flex items-center justify-between p-3 border border-outline-variant/30 rounded-xl hover:border-primary/40 hover:bg-primary/5 transition-all cursor-pointer shadow-sm group">
                        <div class="flex items-center gap-3">
                            <div class="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                                <span class="material-symbols-outlined text-[20px] text-primary">assignment</span>
                            </div>
                            <div class="text-left">
                                <p class="text-xs font-bold text-on-background group-hover:text-primary transition-colors leading-snug">${p.name}</p>
                                <p class="text-[9px] text-on-surface-variant/80 mt-0.5 font-medium">${activeClientsCount} active client${activeClientsCount !== 1 ? 's' : ''}</p>
                            </div>
                        </div>
                        <span class="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors text-[18px]">chevron_right</span>
                    </div>
                `;
            }).join('');
        }
    }
    
    modal.classList.remove('hidden');
    modal.classList.add('flex');
};

window.closeProgramChatSelectionModal = function() {
    const modal = document.getElementById('program-chat-selection-modal');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }
};

window.selectProgramForChat = function(programId) {
    window.closeProgramChatSelectionModal();
    window.openProgramDiscussion(programId);
};

