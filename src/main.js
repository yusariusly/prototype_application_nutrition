// NutriFlow Client Application Logic

// ==================== APP STATE ====================
const state = {
    activeView: 'dashboard',
    streakDays: 12,
    waterGlasses: 5,
    maxWaterGlasses: 8,
    loggedMeals: {
        breakfast: false,
        lunch: false,
        snack: false,
        dinner: false
    },
    activeScanSlot: null,
    bookingFlow: {
        step: 1,
        selectedServiceId: null,
        selectedDate: null,
        selectedSlot: null
    },
    profileStats: {
        weightHistory: [
            { month: 'Jan', weight: 168.0 },
            { month: 'Feb', weight: 169.5 },
            { month: 'Mar', weight: 170.2 },
            { month: 'Apr', weight: 173.0 },
            { month: 'May', weight: 174.8 },
            { month: 'Jun', weight: 176.2 }
        ],
        bodyMeasurements: [
            { label: 'Mar 1', waist: 31.0, hip: 37.0 },
            { label: 'Apr 1', waist: 30.5, hip: 36.5 },
            { label: 'Today', waist: 30.0, hip: 36.0 }
        ]
    },
    appointments: [],
    selectedDay: 'Wed',
    clientMealPlans: {
        'Sarah Jenkins': {
            'Mon': [
                { type: 'Breakfast', title: 'Avocado Egg Toast', calories: 320, p: 14, c: 22, f: 18, image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=200' },
                { type: 'Lunch', title: 'Grilled Chicken Salad', calories: 450, p: 45, c: 12, f: 20, image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200' }
            ],
            'Tue': [
                { type: 'Breakfast', title: 'Greek Yogurt Bowl', calories: 250, p: 20, c: 30, f: 5, image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=200' }
            ],
            'Wed': [],
            'Thu': [
                { type: 'Breakfast', title: 'Avocado Egg Toast', calories: 320, p: 14, c: 22, f: 18, image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=200' },
                { type: 'Lunch', title: 'Quinoa Buddha Bowl', calories: 450, p: 15, c: 65, f: 18, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBEJYji3THZ26fZU1y7s_UlX3R5JiXYh8bDKQCgoB_eeBrxiKFJKp983-OzaHO2s7bOGibm_Ffq78DZMIj37z6OO73EXDwTwUKe7WEXsg1ejJE92FBq-nT19yX8htJOacJuuKupzenZJZZPm_6PtBatL55KP4abBQyqSrEMeSFnzbk1OzrX8qcm8ByqZ6WrAMGgLkkRh7lCkTEF5E8WTVQEvDVIoyGeZykvJ7PO6fmFFWMRZ_FlYGtFOw' },
                { type: 'Dinner', title: 'Grilled Salmon & Asparagus', calories: 520, p: 42, c: 12, f: 32, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCmYwtQEKZuQeHbBcF8Z60P_F01JjQ-P01ItJBoz7lWy-FK2NVaEJb3Hqy6oemYRu6b2zWfF5bmfKj9u6PC4JZtGsHvyyUYGgU5hMj-BLnCgmbTc5VDZy-QI6zc259LqW5YPX2r_aCLcW5xsQzLAzlALozsVfWYENWIhLDvaf3jCLuApaunpIs9t0u-hPB3Rhks8C5OQ8Y2RQPiuPrtWg7JqSsunfQMLXnpQ4zAhuIl_qhOzqjCGJJPpw' }
            ],
            'Fri': [
                { type: 'Breakfast', title: 'Greek Yogurt Bowl', calories: 250, p: 20, c: 30, f: 5, image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=200' },
                { type: 'Lunch', title: 'Grilled Chicken Salad', calories: 450, p: 45, c: 12, f: 20, image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200' }
            ],
            'Sat': [
                { type: 'Breakfast', title: 'Berry Protein Smoothie Bowl', calories: 350, p: 30, c: 45, f: 8, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAhdLncVr5YHSg696oNNaWNcDNX27FpwShpuVV2sROhcLkU1xYKMhi-UtErJlr9jpaS1aHCEsYwaHknma9nw7SgPy1Fhbq3qbe0s13GK6BowfyxFbOHwCJIJQLBIWAEJ8-y7WFQl-rQadTyMya_y1kGIlKkclrRz4YAo636MVND2hDJ_kt5PVntLx-dw-UhQPiKXFvsUtAHf3MUYe_dhx77FGOyLPOJ4_BRXE7wQfQQrYmmQ4zb0E2J3A' },
                { type: 'Dinner', title: 'Grilled Salmon & Asparagus', calories: 520, p: 42, c: 12, f: 32, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCmYwtQEKZuQeHbBcF8Z60P_F01JjQ-P01ItJBoz7lWy-FK2NVaEJb3Hqy6oemYRu6b2zWfF5bmfKj9u6PC4JZtGsHvyyUYGgU5hMj-BLnCgmbTc5VDZy-QI6zc259LqW5YPX2r_aCLcW5xsQzLAzlALozsVfWYENWIhLDvaf3jCLuApaunpIs9t0u-hPB3Rhks8C5OQ8Y2RQPiuPrtWg7JqSsunfQMLXnpQ4zAhuIl_qhOzqjCGJJPpw' }
            ],
            'Sun': [
                { type: 'Breakfast', title: 'Avocado Egg Toast', calories: 320, p: 14, c: 22, f: 18, image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=200' },
                { type: 'Lunch', title: 'Grilled Chicken Salad', calories: 450, p: 45, c: 12, f: 20, image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200' },
                { type: 'Dinner', title: 'Grilled Salmon & Asparagus', calories: 520, p: 42, c: 12, f: 32, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCmYwtQEKZuQeHbBcF8Z60P_F01JjQ-P01ItJBoz7lWy-FK2NVaEJb3Hqy6oemYRu6b2zWfF5bmfKj9u6PC4JZtGsHvyyUYGgU5hMj-BLnCgmbTc5VDZy-QI6zc259LqW5YPX2r_aCLcW5xsQzLAzlALozsVfWYENWIhLDvaf3jCLuApaunpIs9t0u-hPB3Rhks8C5OQ8Y2RQPiuPrtWg7JqSsunfQMLXnpQ4zAhuIl_qhOzqjCGJJPpw' }
            ]
        }
    }
};

const SERVICES = {
    'initial-consultation': {
        id: 'initial-consultation',
        title: 'Initial Consultation',
        description: 'A comprehensive 60-minute deep dive into your medical history, habits, and goals to build your plan.',
        duration: '60 min',
        type: 'Virtual or In-Person',
        price: 150,
        therapist: 'Dr. Eleanor Vance, RD',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDI0OL4dSef_9_KtBWKJ_8d0de_3jKJ307lRmzwECWHykwC2Sh_-p2uUnTh-2y0Yyj2x5txHJ1-_Z9u3YVyIFYjVwQFMkm0ufr1Envl8PlT8JyiHkOB-hHpJszVsfgn9wthQZBcxDIFw3emAo4TPjLWJ43YEqFZsYmGT0kh9do_2JTuvnjgBOOrtceFxVxH_JZX7krm4i7Rjsz16LRwnXm93LXDXh78J5Agw0JsZToFhkL6qU3xrqPBtQ',
        popular: true
    },
    'follow-up': {
        id: 'follow-up',
        title: 'Follow-up Session',
        description: 'A 30-minute check-in to review progress, adjust macros, and troubleshoot plan challenges.',
        duration: '30 min',
        type: 'Virtual Only',
        price: 75,
        therapist: 'Mark Davies',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBGsbf12JBu1YUhQl78vA1aGmjNYjjGnyb8cmgHlmCOxHKWee0ybL9-1rqta2RUKAJJewh6CU3PkcStb675EhEkzaWohu52Oj7rEOvZZt5-KwE8CSpbidQcEI59WkIrdFAd1LKLAv1EB0t69XGbzUv3jpNPAxWeFPSO8fipEBXZWlqqzxB9GQ2cJzZSc6G7cGZVRlaCrNQ79-yv4AL_kM2EKJba8qTKqFux18RVXNHQHkGLV2pI17tZjw',
        popular: false
    },
    'body-composition': {
        id: 'body-composition',
        title: 'Body Composition Analysis',
        description: 'Detailed DEXA/InBody scan to measure fat, muscle mass, and metabolic rate for calculations.',
        duration: '45 min',
        type: 'In-Person',
        price: 120,
        therapist: 'Dr. Sarah Jenkins',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCmYwtQEKZuQeHbBcF8Z60P_F01JjQ-P01ItJBoz7lWy-FK2NVaEJb3Hqy6oemYRu6b2zWfF5bmfKj9u6PC4JZtGsHvyyUYGgU5hMj-BLnCgmbTc5VDZy-QI6zc259LqW5YPX2r_aCLcW5xsQzLAzlALozsVfWYENWIhLDvaf3jCLuApaunpIs9t0u-hPB3Rhks8C5OQ8Y2RQPiuPrtWg7JqSsunfQMLXnpQ4zAhuIl_qhOzqjCGJJPpw',
        popular: false,
        tag: 'In-Clinic Only'
    }
};

const RECIPES_DB = {
    'Berry Protein Smoothie Bowl': {
        ingredients: ['1 cup frozen mixed berries', '1 scoop vanilla whey protein powder', '1/2 cup unsweetened almond milk', '1 tbsp chia seeds', 'Handful of fresh raspberries for topping'],
        instructions: 'Blend the frozen berries, protein powder, and almond milk until thick and smooth. Pour into a bowl, then top with chia seeds and fresh raspberries. Serve cold.'
    },
    'Quinoa Buddha Bowl': {
        ingredients: ['1/2 cup cooked quinoa', '1/2 roasted sweet potato cubed', '1/2 ripe avocado sliced', '1 cup raw spinach', '2 tbsp lemon tahini dressing'],
        instructions: 'Arrange raw spinach in a wide bowl. Place cooked quinoa, cubed sweet potato, and sliced avocado in neat sections. Drizzle lemon tahini dressing over everything.'
    },
    'Grilled Salmon & Asparagus': {
        ingredients: ['150g wild-caught salmon fillet', '8-10 stalks of fresh asparagus', '1 tbsp lemon juice', '1 tsp olive oil', 'Pinch of sea salt and black pepper'],
        instructions: 'Brush salmon and asparagus with olive oil, salt, and pepper. Grill the salmon for 4-5 minutes per side. Roast asparagus until tender. Serve with a splash of fresh lemon juice.'
    }
};

let weightChartInstance = null;
let measurementsChartInstance = null;

// ==================== STATE SYNC WITH LOCALSTORAGE ====================
function loadState() {
    if (localStorage.getItem('nutriflow_water_glasses')) {
        state.waterGlasses = parseInt(localStorage.getItem('nutriflow_water_glasses'));
    }
    if (localStorage.getItem('nutriflow_streak_days')) {
        state.streakDays = parseInt(localStorage.getItem('nutriflow_streak_days'));
    }
    if (localStorage.getItem('nutriflow_logged_meals')) {
        state.loggedMeals = JSON.parse(localStorage.getItem('nutriflow_logged_meals'));
    }
    if (localStorage.getItem('nutriflow_weight_history')) {
        state.profileStats.weightHistory = JSON.parse(localStorage.getItem('nutriflow_weight_history'));
    }
    if (localStorage.getItem('nutriflow_measurements_history')) {
        state.profileStats.bodyMeasurements = JSON.parse(localStorage.getItem('nutriflow_measurements_history'));
    }

    if (localStorage.getItem('nutriflow_logged_status')) {
        state.loggedStatus = JSON.parse(localStorage.getItem('nutriflow_logged_status'));
    } else {
        state.loggedStatus = {
            'Sarah Jenkins': {
                'Wed': {
                    'Breakfast': true,
                    'Lunch': true,
                    'Snack': true
                }
            },
            'Marcus Reid': {
                'Wed': {
                    'Breakfast': true,
                    'Lunch': true
                }
            },
            'Elena Lopez': {
                'Wed': {
                    'Breakfast': true
                }
            }
        };
        localStorage.setItem('nutriflow_logged_status', JSON.stringify(state.loggedStatus));
    }
    
    // Automatically purge previous spam entries from history
    if (state.profileStats.weightHistory.length > 6 || state.profileStats.bodyMeasurements.length > 3) {
        state.profileStats.weightHistory = [
            { month: 'Jan', weight: 168.0 },
            { month: 'Feb', weight: 169.5 },
            { month: 'Mar', weight: 170.2 },
            { month: 'Apr', weight: 173.0 },
            { month: 'May', weight: 174.8 },
            { month: 'Jun', weight: 176.2 }
        ];
        state.profileStats.bodyMeasurements = [
            { label: 'Mar 1', waist: 31.0, hip: 37.0 },
            { label: 'Apr 1', waist: 30.5, hip: 36.5 },
            { label: 'Today', waist: 30.0, hip: 36.0 }
        ];
        localStorage.setItem('nutriflow_weight_history', JSON.stringify(state.profileStats.weightHistory));
        localStorage.setItem('nutriflow_measurements_history', JSON.stringify(state.profileStats.bodyMeasurements));
        localStorage.removeItem('nutriflow_last_logged_date');
    }
    
    // Appointments sync
    if (localStorage.getItem('nutriflow_appointments')) {
        state.appointments = JSON.parse(localStorage.getItem('nutriflow_appointments'));
    } else {
        // Init default mock appointments
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
        saveState();
    }

    // Sync customized weekly plans from admin builder
    if (localStorage.getItem('nutriflow_client_meal_plans')) {
        state.clientMealPlans = JSON.parse(localStorage.getItem('nutriflow_client_meal_plans'));
    }
    
    // Ensure all days are populated for all active clients
    const targetClient = localStorage.getItem('nutriflow_client_logged_name') || 'Sarah Jenkins';
    const allClientsList = ['Sarah Jenkins', 'Marcus Reid', 'Elena Lopez'];
    let changed = false;
    
    const daysList = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    
    const defaults = {
        'Mon': [
            { type: 'Breakfast', title: 'Avocado Egg Toast', calories: 320, p: 14, c: 22, f: 18, image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=200' },
            { type: 'Lunch', title: 'Grilled Chicken Salad', calories: 450, p: 45, c: 12, f: 20, image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200' }
        ],
        'Tue': [
            { type: 'Breakfast', title: 'Greek Yogurt Bowl', calories: 250, p: 20, c: 30, f: 5, image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=200' }
        ],
        'Wed': [],
        'Thu': [
            { type: 'Breakfast', title: 'Avocado Egg Toast', calories: 320, p: 14, c: 22, f: 18, image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=200' },
            { type: 'Lunch', title: 'Quinoa Buddha Bowl', calories: 450, p: 15, c: 65, f: 18, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBEJYji3THZ26fZU1y7s_UlX3R5JiXYh8bDKQCgoB_eeBrxiKFJKp983-OzaHO2s7bOGibm_Ffq78DZMIj37z6OO73EXDwTwUKe7WEXsg1ejJE92FBq-nT19yX8htJOacJuuKupzenZJZZPm_6PtBatL55KP4abBQyqSrEMeSFnzbk1OzrX8qcm8ByqZ6WrAMGgLkkRh7lCkTEF5E8WTVQEvDVIoyGeZykvJ7PO6fmFFWMRZ_FlYGtFOw' },
            { type: 'Dinner', title: 'Grilled Salmon & Asparagus', calories: 520, p: 42, c: 12, f: 32, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCmYwtQEKZuQeHbBcF8Z60P_F01JjQ-P01ItJBoz7lWy-FK2NVaEJb3Hqy6oemYRu6b2zWfF5bmfKj9u6PC4JZtGsHvyyUYGgU5hMj-BLnCgmbTc5VDZy-QI6zc259LqW5YPX2r_aCLcW5xsQzLAzlALozsVfWYENWIhLDvaf3jCLuApaunpIs9t0u-hPB3Rhks8C5OQ8Y2RQPiuPrtWg7JqSsunfQMLXnpQ4zAhuIl_qhOzqjCGJJPpw' }
        ],
        'Fri': [
            { type: 'Breakfast', title: 'Greek Yogurt Bowl', calories: 250, p: 20, c: 30, f: 5, image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=200' },
            { type: 'Lunch', title: 'Grilled Chicken Salad', calories: 450, p: 45, c: 12, f: 20, image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200' }
        ],
        'Sat': [
            { type: 'Breakfast', title: 'Berry Protein Smoothie Bowl', calories: 350, p: 30, c: 45, f: 8, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAhdLncVr5YHSg696oNNaWNcDNX27FpwShpuVV2sROhcLkU1xYKMhi-UtErJlr9jpaS1aHCEsYwaHknma9nw7SgPy1Fhbq3qbe0s13GK6BowfyxFbOHwCJIJQLBIWAEJ8-y7WFQl-rQadTyMya_y1kGIlKkclrRz4YAo636MVND2hDJ_kt5PVntLx-dw-UhQPiKXFvsUtAHf3MUYe_dhx77FGOyLPOJ4_BRXE7wQfQQrYmmQ4zb0E2J3A' },
            { type: 'Dinner', title: 'Grilled Salmon & Asparagus', calories: 520, p: 42, c: 12, f: 32, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCmYwtQEKZuQeHbBcF8Z60P_F01JjQ-P01ItJBoz7lWy-FK2NVaEJb3Hqy6oemYRu6b2zWfF5bmfKj9u6PC4JZtGsHvyyUYGgU5hMj-BLnCgmbTc5VDZy-QI6zc259LqW5YPX2r_aCLcW5xsQzLAzlALozsVfWYENWIhLDvaf3jCLuApaunpIs9t0u-hPB3Rhks8C5OQ8Y2RQPiuPrtWg7JqSsunfQMLXnpQ4zAhuIl_qhOzqjCGJJPpw' }
        ],
        'Sun': [
            { type: 'Breakfast', title: 'Avocado Egg Toast', calories: 320, p: 14, c: 22, f: 18, image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=200' },
            { type: 'Lunch', title: 'Grilled Chicken Salad', calories: 450, p: 45, c: 12, f: 20, image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200' },
            { type: 'Dinner', title: 'Grilled Salmon & Asparagus', calories: 520, p: 42, c: 12, f: 32, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCmYwtQEKZuQeHbBcF8Z60P_F01JjQ-P01ItJBoz7lWy-FK2NVaEJb3Hqy6oemYRu6b2zWfF5bmfKj9u6PC4JZtGsHvyyUYGgU5hMj-BLnCgmbTc5VDZy-QI6zc259LqW5YPX2r_aCLcW5xsQzLAzlALozsVfWYENWIhLDvaf3jCLuApaunpIs9t0u-hPB3Rhks8C5OQ8Y2RQPiuPrtWg7JqSsunfQMLXnpQ4zAhuIl_qhOzqjCGJJPpw' }
        ]
    };
    
    allClientsList.forEach(clientName => {
        if (!state.clientMealPlans[clientName]) {
            state.clientMealPlans[clientName] = {};
        }

        daysList.forEach(day => {
            if (!state.clientMealPlans[clientName][day] || state.clientMealPlans[clientName][day].length === 0) {
                state.clientMealPlans[clientName][day] = JSON.parse(JSON.stringify(defaults[day]));
                changed = true;
            }
        });
    });
    
    if (changed) {
        localStorage.setItem('nutriflow_client_meal_plans', JSON.stringify(state.clientMealPlans));
    }
}

function saveState() {
    localStorage.setItem('nutriflow_water_glasses', state.waterGlasses);
    localStorage.setItem('nutriflow_streak_days', state.streakDays);
    localStorage.setItem('nutriflow_logged_meals', JSON.stringify(state.loggedMeals));
    localStorage.setItem('nutriflow_weight_history', JSON.stringify(state.profileStats.weightHistory));
    localStorage.setItem('nutriflow_measurements_history', JSON.stringify(state.profileStats.bodyMeasurements));
    localStorage.setItem('nutriflow_appointments', JSON.stringify(state.appointments));
    localStorage.setItem('nutriflow_logged_status', JSON.stringify(state.loggedStatus));
}

function checkClientSession() {
    if (localStorage.getItem('nutriflow_client_logged') !== 'true') {
        window.location.href = './login.html';
    }
}

window.handleClientSignOut = function() {
    localStorage.removeItem('nutriflow_client_logged');
    showToast('Signed out of Client Portal.');
    setTimeout(() => {
        window.location.href = './login.html';
    }, 1000);
};

// ==================== APP INITS ====================
document.addEventListener('DOMContentLoaded', () => {
    checkClientSession();
    loadState();
    
    // Update greeting with dynamic logged-in client name
    const activeClient = localStorage.getItem('nutriflow_client_logged_name') || 'Sarah Jenkins';
    const welcomeLabel = document.getElementById('client-welcome-name-label');
    if (welcomeLabel) {
        welcomeLabel.innerText = `Good morning, ${activeClient.split(' ')[0]}!`;
    }

    navigateTo('dashboard');
    renderWaterTracker();
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
    const activeSec = document.getElementById(`view-${viewId}`);
    if (activeSec) activeSec.classList.remove('hidden');

    document.querySelectorAll('.nav-link').forEach(link => {
        link.className = 'nav-link h-full flex items-center text-on-surface-variant hover:text-primary font-label-md text-label-md transition-colors px-3 cursor-pointer';
    });
    const activeLink = document.getElementById(`link-${viewId}`);
    if (activeLink) {
        activeLink.className = 'nav-link h-full flex items-center text-primary font-bold border-b-2 border-primary font-label-md text-label-md px-3 cursor-pointer';
    }

    if (viewId === 'dashboard') {
        renderDashboardMeals();
        updateKcalDisplay();
    } else if (viewId === 'meal-plans') {
        loadState(); // load any updates from Admin builder
        renderMealPlans();
    } else if (viewId === 'appointments') {
        loadState();
        renderAppointmentsView();
    } else if (viewId === 'book-wizard') {
        renderBookingWizard();
    } else if (viewId === 'profile') {
        setTimeout(initProfileCharts, 50);
    }
};

window.showClientNotifications = function() {
    showToast('All daily nutrient targets are perfectly updated.', 'info');
};

// ==================== DASHBOARD MEALS & KCAL ====================
// ==================== DASHBOARD MEALS & KCAL ====================
function updateKcalDisplay() {
    const targetClient = localStorage.getItem('nutriflow_client_logged_name') || 'Sarah Jenkins';
    let goal = parseInt(localStorage.getItem('nutriflow_target_kcal_' + targetClient)) || 2100;
    let consumed = 0;
    let pro = 0;
    let carb = 0;
    let fat = 0;

    let goalP = parseInt(localStorage.getItem('nutriflow_client_protein_target')) || 150;
    let goalC = parseInt(localStorage.getItem('nutriflow_client_carbs_target')) || 250;
    let goalF = parseInt(localStorage.getItem('nutriflow_client_fats_target')) || 65;

    const today = 'Wed'; // wednesday is today in prototype
    const clientPlan = state.clientMealPlans[localStorage.getItem('nutriflow_client_logged_name') || 'Sarah Jenkins'][today] || [];

    clientPlan.forEach(meal => {
        consumed += meal.calories;
        pro += meal.p || 0;
        carb += meal.c || 0;
        fat += meal.f || 0;
    });
    
    let left = goal - consumed;
    if (left < 0) left = 0;
    
    document.getElementById('kcal-left-value').innerText = left.toLocaleString();
    document.getElementById('summary-consumed-kcal').innerText = `${consumed} kcal`;
    
    // Update dashboard daily summary targets
    const goalLabel = document.getElementById('kcal-goal-label');
    if (goalLabel) goalLabel.innerText = `${goal.toLocaleString()} kcal`;
    
    const pct = Math.min(consumed / goal, 1);
    const offset = 251.2 * (1 - pct);
    document.getElementById('kcal-progress-circle').style.strokeDashoffset = offset;
    
    document.getElementById('summary-protein').innerText = `${pro}g / ${goalP}g`;
    document.getElementById('summary-carbs').innerText = `${carb}g / ${goalC}g`;
    document.getElementById('summary-fat').innerText = `${fat}g / ${goalF}g`;
    
    document.getElementById('summary-protein-bar').style.width = `${Math.min((pro/goalP)*100, 100)}%`;
    document.getElementById('summary-carbs-bar').style.width = `${Math.min((carb/goalC)*100, 100)}%`;
    document.getElementById('summary-fat-bar').style.width = `${Math.min((fat/goalF)*100, 100)}%`;
}

function renderDashboardMeals() {
    const grid = document.getElementById('dashboard-meals-grid');
    if (!grid) return;
    
    const today = 'Wed';
    const clientName = localStorage.getItem('nutriflow_client_logged_name') || 'Sarah Jenkins';
    const clientPlan = state.clientMealPlans[clientName][today] || [];
    const slots = ['Breakfast', 'Lunch', 'Snack', 'Dinner'];
    
    grid.innerHTML = slots.map(slotName => {
        const meal = clientPlan.find(m => m.type.toLowerCase() === slotName.toLowerCase());
        const isLogged = state.loggedStatus[clientName]?.[today]?.[slotName] === true;
        
        if (!meal) {
            return `
                <div class="bg-white border border-outline-variant/35 rounded-2xl p-4 flex justify-between items-center shadow-sm min-h-[90px]">
                    <div class="flex items-center gap-3">
                        <div class="w-9 h-9 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center shrink-0">
                            <span class="material-symbols-outlined text-lg">restaurant_menu</span>
                        </div>
                        <div>
                            <span class="block text-[9px] uppercase tracking-wider text-slate-400 font-bold">${slotName}</span>
                            <span class="font-bold text-xs text-slate-500">No meal planned for today</span>
                        </div>
                    </div>
                </div>
            `;
        }

        const totalMacros = (meal.p || 0) + (meal.c || 0) + (meal.f || 0) || 1;
        const pPct = ((meal.p || 0) / totalMacros) * 100;
        const cPct = ((meal.c || 0) / totalMacros) * 100;
        const fPct = ((meal.f || 0) / totalMacros) * 100;

        // Visual styles based on log status (grayscale if not eaten yet)
        const imageStyle = isLogged ? 'filter: none;' : 'filter: grayscale(100%) contrast(85%) opacity(70%);';
        const cardBgClass = isLogged ? 'bg-white border-primary/25' : 'bg-slate-50/70 border-slate-200';
        
        // Log button styling
        const btnHtml = isLogged 
            ? `<button onclick="event.stopPropagation(); toggleLogMeal('${today}', '${slotName}')" class="bg-red-600 hover:bg-red-700 text-white rounded-full p-1 border border-outline-variant/35 shadow-md flex items-center justify-center cursor-pointer transition-transform active:scale-90" title="Unlog meal">
                   <span class="material-symbols-outlined text-[10px] font-bold">close</span>
               </button>`
            : `<button onclick="event.stopPropagation(); toggleLogMeal('${today}', '${slotName}')" class="bg-primary hover:bg-[#005321] text-white font-bold text-[9px] px-2.5 py-1.5 rounded-xl flex items-center gap-0.5 shadow-sm transition-all active:scale-95 cursor-pointer" title="Log consumed">
                   <span class="material-symbols-outlined text-[12px] font-bold">check_circle</span> Log Eat
               </button>`;

        if (meal.image) {
            return `
                <div onclick="navigateTo('meal-plans')" class="${cardBgClass} border rounded-2xl overflow-hidden flex flex-col shadow-sm relative group cursor-pointer hover:scale-[1.01] hover:shadow-md transition-all">
                    <!-- Action Button -->
                    <div class="absolute top-2.5 right-2.5 z-30">
                        ${btnHtml}
                    </div>
                    <div class="h-28 w-full relative overflow-hidden">
                        <img class="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300 pointer-events-none select-none" style="${imageStyle}" src="${meal.image}" alt="${meal.title}">
                        <span class="absolute top-2.5 left-2.5 bg-white/95 text-slate-700 font-bold text-[9px] px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm z-10">${slotName}</span>
                    </div>
                    <div class="p-3 flex flex-col gap-2">
                        <div class="flex justify-between items-center gap-2">
                            <span class="font-bold text-xs text-slate-800 line-clamp-1 group-hover:text-primary transition-colors">${meal.title}</span>
                            <span class="text-xs font-bold text-slate-500 shrink-0">${meal.calories} kcal</span>
                        </div>
                        <div class="w-full h-1.5 rounded-full overflow-hidden flex bg-slate-100">
                            <div class="bg-[#006e2f]" style="width: ${cPct}%"></div>
                            <div class="bg-[#006a61]" style="width: ${pPct}%"></div>
                            <div class="bg-[#9d4300]" style="width: ${fPct}%"></div>
                        </div>
                        <div class="flex justify-between text-[9px] text-slate-400 font-bold">
                            <span>${meal.c || 0}G C</span>
                            <span>${meal.p || 0}G P</span>
                            <span>${meal.f || 0}G F</span>
                        </div>
                    </div>
                </div>
            `;
        } else {
            // Compact style card
            return `
                <div onclick="navigateTo('meal-plans')" class="${cardBgClass} border rounded-2xl p-4 flex justify-between items-center shadow-sm relative group cursor-pointer hover:scale-[1.01] hover:shadow-md transition-all min-h-[90px]">
                    <div class="absolute top-2.5 right-2.5 z-30">
                        ${btnHtml}
                    </div>
                    <div class="flex items-center gap-3">
                        <div class="w-9 h-9 rounded-full bg-[#f0fdf4] text-[#006e2f] flex items-center justify-center shrink-0" style="${imageStyle}">
                            <span class="material-symbols-outlined text-lg">eco</span>
                        </div>
                        <div>
                            <span class="block text-[9px] uppercase tracking-wider text-slate-400 font-bold">${slotName}</span>
                            <span class="font-bold text-xs text-slate-800 line-clamp-1 group-hover:text-primary transition-colors">${meal.title}</span>
                            <span class="text-[9px] font-bold text-slate-400 block mt-0.5">${meal.calories} kcal</span>
                        </div>
                    </div>
                    <!-- spacer for absolute absolute button -->
                    <div class="w-16"></div>
                </div>
            `;
        }
    }).join('');
}

function renderWaterTracker() {
    const grid = document.getElementById('water-glasses-grid');
    if (!grid) return;
    
    let html = '';
    for (let i = 1; i <= state.maxWaterGlasses; i++) {
        const isFilled = i <= state.waterGlasses;
        html += `
            <button onclick="toggleWaterGlass(${i})" class="water-glass ${isFilled ? 'filled' : 'text-outline-variant hover:text-secondary'} w-12 h-14 rounded-b-lg rounded-t-sm border-2 border-outline-variant/30 bg-surface flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-sm">
                <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' ${isFilled ? 1 : 0};">water_drop</span>
            </button>
        `;
    }
    grid.innerHTML = html;
    document.getElementById('water-count-label').innerText = `${state.waterGlasses} / ${state.maxWaterGlasses}`;
}

window.toggleWaterGlass = function(index) {
    if (index <= state.waterGlasses) {
        state.waterGlasses = index - 1;
    } else {
        state.waterGlasses = index;
    }
    saveState();
    renderWaterTracker();
    showToast(`Hydration state updated.`);
};

// ==================== CLIENT MEAL PLANS ====================
function renderMealPlans() {
    const switcher = document.getElementById('meal-weekday-switcher');
    if (!switcher) return;
    
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    switcher.innerHTML = days.map(d => {
        const isToday = d === 'Wed';
        const isSelected = d === state.selectedDay;
        
        let btnClass = 'px-4 py-2 rounded-lg font-bold text-xs transition-all whitespace-nowrap ';
        if (isSelected) {
            btnClass += 'bg-primary text-white shadow-sm';
        } else {
            btnClass += 'text-on-surface-variant hover:text-primary hover:bg-surface-container';
        }
        
        return `<button onclick="selectMealDay('${d}')" class="${btnClass}">${d}${isToday ? ' (Today)' : ''}</button>`;
    }).join('');

    const clientName = localStorage.getItem('nutriflow_client_logged_name') || 'Sarah Jenkins';
    const clientPlan = state.clientMealPlans[clientName][state.selectedDay] || [];
    let currentKcal = 0;
    let currentP = 0;
    let currentC = 0;
    let currentF = 0;
    
    clientPlan.forEach(m => {
        const isLogged = state.loggedStatus[clientName]?.[state.selectedDay]?.[m.type] === true;
        if (isLogged) {
            currentKcal += m.calories;
            currentP += m.p;
            currentC += m.c;
            currentF += m.f;
        }
    });

    let targetCal = parseInt(localStorage.getItem('nutriflow_target_kcal_' + clientName)) || 2100;
    let targetPro = parseInt(localStorage.getItem('nutriflow_client_protein_target')) || 150;
    let targetCarb = parseInt(localStorage.getItem('nutriflow_client_carbs_target')) || 250;
    let targetFat = parseInt(localStorage.getItem('nutriflow_client_fats_target')) || 65;

    document.getElementById('meals-kcal-ratio').innerText = currentKcal.toLocaleString();
    document.getElementById('meals-kcal-target-label').innerText = `/ ${targetCal} kcal`;
    
    document.getElementById('meals-macro-protein-label').innerText = `${currentP}g / ${targetPro}g`;
    document.getElementById('meals-macro-carbs-label').innerText = `${currentC}g / ${targetCarb}g`;
    document.getElementById('meals-macro-fats-label').innerText = `${currentF}g / ${targetFat}g`;

    const dashoffset = 251.2 * (1 - Math.min(currentKcal / targetCal, 1));
    document.getElementById('meals-progress-circle').style.strokeDashoffset = dashoffset;
    document.getElementById('meals-macro-protein-bar').style.width = `${Math.min((currentP/targetPro)*100, 100)}%`;
    document.getElementById('meals-macro-carbs-bar').style.width = `${Math.min((currentC/targetCarb)*100, 100)}%`;
    document.getElementById('meals-macro-fats-bar').style.width = `${Math.min((currentF/targetFat)*100, 100)}%`;

    const container = document.getElementById('meals-plan-cards-container');
    if (!container) return;
    
    const slots = ['Breakfast', 'Lunch', 'Snack', 'Dinner'];
    
    container.className = 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-gutter w-full';
    container.innerHTML = slots.map(slotName => {
        const meal = clientPlan.find(m => m.type.toLowerCase() === slotName.toLowerCase());
        const isLogged = state.loggedStatus[clientName]?.[state.selectedDay]?.[slotName] === true;
        
        if (!meal) {
            return `
                <div class="bg-surface border-2 border-dashed border-outline-variant/30 rounded-2xl p-6 flex flex-col justify-center items-center min-h-[220px] shadow-sm">
                    <span class="material-symbols-outlined text-4xl text-outline-variant/60">restaurant_menu</span>
                    <span class="font-bold text-sm text-slate-500 mt-2">${slotName}</span>
                    <span class="text-xs text-slate-400">No meal planned</span>
                </div>
            `;
        }
        
        const btnLabel = isLogged ? 'Logged' : 'Log Meal';
        const btnIcon = isLogged ? 'check_circle' : 'radio_button_unchecked';
        const btnClass = isLogged 
            ? 'bg-primary hover:bg-[#005321] text-white font-bold text-[10px] px-3.5 py-2.5 rounded-xl flex items-center gap-1 cursor-pointer transition-all active:scale-95 w-full justify-center'
            : 'bg-primary/10 hover:bg-primary/20 text-primary font-bold text-[10px] px-3.5 py-2.5 rounded-xl flex items-center gap-1 cursor-pointer transition-all active:scale-95 w-full justify-center';

        return `
            <div class="service-card glass-card rounded-2xl overflow-hidden flex flex-col h-full bg-white relative group w-full shadow-sm">
                <div class="h-36 w-full relative">
                    ${meal.image ? `<img class="w-full h-full object-cover" src="${meal.image}" alt="${meal.title}">` : `
                        <div class="w-full h-full bg-primary/10 flex items-center justify-center text-primary">
                            <span class="material-symbols-outlined text-4xl">restaurant</span>
                        </div>
                    `}
                    <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <span class="absolute top-3 left-3 bg-[#e5eeff] text-[#006a61] border border-[#86f2e4]/35 font-bold text-[9px] px-2 py-0.5 rounded-full uppercase tracking-wider">${slotName}</span>
                </div>
                <div class="p-4 flex flex-col flex-grow">
                    <h3 class="font-bold text-on-surface text-base mb-1 leading-tight">${meal.title}</h3>
                    <p class="text-[11px] text-on-surface-variant flex-grow line-clamp-2 mb-3 mt-1 leading-normal">Plan designed by your nutritionist pendamping.</p>
                    
                    <div class="grid grid-cols-4 gap-1 text-center bg-slate-50 p-1.5 rounded-lg border border-slate-200 text-[9px] font-bold text-on-surface-variant/90 mb-3">
                        <div><span class="block text-on-background">${meal.calories}</span>KCAL</div>
                        <div><span class="block text-on-background">${meal.p}g</span>PRO</div>
                        <div><span class="block text-on-background">${meal.c}g</span>CARB</div>
                        <div><span class="block text-on-background">${meal.f}g</span>FAT</div>
                    </div>

                    <div class="flex items-center justify-between border-t border-outline-variant/20 pt-2 mt-auto gap-2">
                        <button onclick="viewRecipeDetails('${meal.title}', '${slotName}', '${meal.image}', ${meal.calories}, ${meal.p}, ${meal.c}, ${meal.f})" class="border border-slate-300 text-slate-700 hover:bg-slate-50 font-semibold text-[10px] px-3.5 py-2.5 rounded-xl transition-all cursor-pointer w-full justify-center">View Recipe</button>
                        <button onclick="toggleLogMeal('${state.selectedDay}', '${slotName}')" class="${btnClass}">
                            <span class="material-symbols-outlined text-[14px]">${btnIcon}</span> ${btnLabel}
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

window.toggleLogMeal = function(day, slotName) {
    const activeClient = localStorage.getItem('nutriflow_client_logged_name') || 'Sarah Jenkins';
    state.loggedStatus[activeClient] = state.loggedStatus[activeClient] || {};
    state.loggedStatus[activeClient][day] = state.loggedStatus[activeClient][day] || {};

    const isCurrentlyLogged = state.loggedStatus[activeClient][day][slotName] === true;
    state.loggedStatus[activeClient][day][slotName] = !isCurrentlyLogged;

    localStorage.setItem('nutriflow_logged_status', JSON.stringify(state.loggedStatus));

    renderMealPlans();
    renderDashboardMeals();
    updateKcalDisplay();
    
    showToast(isCurrentlyLogged ? `Removed ${slotName} log.` : `Logged ${slotName} successfully!`, 'success');
};

window.selectMealDay = function(day) {
    state.selectedDay = day;
    renderMealPlans();
};

window.openAIScannerForSlot = function(slotName) {
    state.activeScanSlot = slotName;
    openAIScanner();
};

window.removeMealFromSlot = function(day, slotName) {
    const clientName = localStorage.getItem('nutriflow_client_logged_name') || 'Sarah Jenkins';
    if (!state.clientMealPlans[clientName][day]) return;
    state.clientMealPlans[clientName][day] = state.clientMealPlans[clientName][day].filter(m => m.type.toLowerCase() !== slotName.toLowerCase());
    saveState();
    showToast(`Cleared ${slotName} entry.`, 'info');
    renderMealPlans();
    renderDashboardMeals();
    updateKcalDisplay();
};

// ==================== AI FOOD SCANNER ====================
const SCAN_DB = {
    'avocado-toast': { title: 'Avocado Egg Toast', type: 'Breakfast', calories: 320, p: 14, c: 22, f: 18, image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=500', advice: 'Rich in healthy monounsaturated fats from avocado and high-quality protein from eggs. Excellent source of morning energy!' },
    'chicken-salad': { title: 'Grilled Chicken Salad', type: 'Lunch', calories: 450, p: 45, c: 12, f: 20, image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500', advice: 'Fantastic lean-protein choice! High fiber from garden vegetables keeps digestion active. Very low glycemic response.' },
    'salmon': { title: 'Grilled Salmon & Asparagus', type: 'Dinner', calories: 520, p: 42, c: 12, f: 32, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCmYwtQEKZuQeHbBcF8Z60P_F01JjQ-P01ItJBoz7lWy-FK2NVaEJb3Hqy6oemYRu6b2zWfF5bmfKj9u6PC4JZtGsHvyyUYGgU5hMj-BLnCgmbTc5VDZy-QI6zc259LqW5YPX2r_aCLcW5xsQzLAzlALozsVfWYENWIhLDvaf3jCLuApaunpIs9t0u-hPB3Rhks8C5OQ8Y2RQPiuPrtWg7JqSsunfQMLXnpQ4zAhuIl_qhOzqjCGJJPpw', advice: 'Superb source of Omega-3 essential fatty acids. Promotes cardiovascular health and muscle recovery. Perfect dinner meal.' },
    'yogurt': { title: 'Greek Yogurt Bowl', type: 'Breakfast', calories: 250, p: 20, c: 30, f: 5, image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=500', advice: 'Probiotic-rich breakfast. Greek yogurt provides slow-digesting casein protein. Great for gut microbiome health.' },
    'buddha-bowl': { title: 'Quinoa Buddha Bowl', type: 'Lunch', calories: 450, p: 15, c: 65, f: 18, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBEJYji3THZ26fZU1y7s_UlX3R5JiXYh8bDKQCgoB_eeBrxiKFJKp983-OzaHO2s7bOGibm_Ffq78DZMIj37z6OO73EXDwTwUKe7WEXsg1ejJE92FBq-nT19yX8htJOacJuuKupzenZJZZPm_6PtBatL55KP4abBQyqSrEMeSFnzbk1OzrX8qcm8ByqZ6WrAMGgLkkRh7lCkTEF5E8WTVQEvDVIoyGeZykvJ7PO6fmFFWMRZ_FlYGtFOw', advice: 'Excellent plant-based carbohydrate source. Loaded with complex fiber, quinoa delivers all nine essential amino acids.' },
    'burger': { title: 'Cheeseburger', type: 'Dinner', calories: 650, p: 32, c: 45, f: 38, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500', advice: 'Moderate protein but high in saturated fats and refined carbs. Enjoy occasionally as a cheat meal, but balance with active cardio!' }
};

let activeScannedMeal = null;

window.openAIScanner = function() {
    activeScannedMeal = null;
    
    // Reset scanner UI
    document.getElementById('scanner-select-prompt').classList.remove('hidden');
    document.getElementById('scanner-food-image').classList.add('hidden');
    document.getElementById('scanner-laser').style.display = 'none';
    document.getElementById('scanner-progress-log').classList.add('hidden');
    document.getElementById('scanner-results').classList.add('hidden');
    
    const logBtn = document.getElementById('btn-log-scanned');
    if (logBtn) {
        logBtn.disabled = true;
        logBtn.className = 'bg-slate-300 text-slate-500 font-bold text-xs px-5 py-2 rounded-xl cursor-not-allowed';
    }
    
    // Show Modal
    const modal = document.getElementById('ai-scanner-modal');
    modal.classList.remove('hidden');
    modal.classList.add('flex');
};

window.closeAIScanner = function() {
    const modal = document.getElementById('ai-scanner-modal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
};

window.selectScanSample = function(sampleId) {
    const mealData = SCAN_DB[sampleId];
    if (!mealData) return;
    activeScannedMeal = mealData;
    triggerScanAnimation(mealData);
};

window.handleCustomImageUpload = function(event) {
    const file = event.target.files[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    
    // Dynamically read & format file name as food name
    let foodName = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;
    foodName = foodName.replace(/[-_]/g, ' ');
    foodName = foodName.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

    // Create random/dummy food summary based on active slot
    const slot = state.activeScanSlot || 'Lunch';
    const dummyMeal = {
        title: foodName,
        type: slot,
        calories: 320 + Math.floor(Math.random() * 200),
        p: 12 + Math.floor(Math.random() * 25),
        c: 25 + Math.floor(Math.random() * 40),
        f: 6 + Math.floor(Math.random() * 15),
        image: imageUrl,
        advice: `AI Scan complete! Detected a portion of delicious ${foodName}. Nutrition profile calculated based on volume and food type categorization.`
    };

    activeScannedMeal = dummyMeal;
    triggerScanAnimation(dummyMeal);
};

function triggerScanAnimation(mealData) {
    // Setup UI for scan
    document.getElementById('scanner-select-prompt').classList.add('hidden');
    document.getElementById('scanner-results').classList.add('hidden');
    
    const foodImg = document.getElementById('scanner-food-image');
    foodImg.src = mealData.image;
    foodImg.classList.remove('hidden');
    
    const progressLog = document.getElementById('scanner-progress-log');
    progressLog.classList.remove('hidden');
    
    const laser = document.getElementById('scanner-laser');
    laser.style.display = 'block';

    const logBtn = document.getElementById('btn-log-scanned');
    if (logBtn) {
        logBtn.disabled = true;
        logBtn.className = 'bg-slate-300 text-slate-500 font-bold text-xs px-5 py-2 rounded-xl cursor-not-allowed';
    }

    // Reset progress steps opacity
    const steps = ['log-step-1', 'log-step-2', 'log-step-3'];
    steps.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.className = 'flex items-center gap-2 opacity-40';
    });

    // Step 1 check
    setTimeout(() => {
        const step1 = document.getElementById('log-step-1');
        if (step1) step1.className = 'flex items-center gap-2 text-primary font-bold animate-pulse';
    }, 400);

    // Step 2 check
    setTimeout(() => {
        const step1 = document.getElementById('log-step-1');
        if (step1) step1.className = 'flex items-center gap-2 text-primary/80';
        const step2 = document.getElementById('log-step-2');
        if (step2) step2.className = 'flex items-center gap-2 text-primary font-bold animate-pulse';
    }, 1000);

    // Step 3 check
    setTimeout(() => {
        const step2 = document.getElementById('log-step-2');
        if (step2) step2.className = 'flex items-center gap-2 text-primary/80';
        const step3 = document.getElementById('log-step-3');
        if (step3) step3.className = 'flex items-center gap-2 text-primary font-bold animate-pulse';
    }, 1600);

    // Done scan
    setTimeout(() => {
        laser.style.display = 'none';
        progressLog.classList.add('hidden');
        
        // Show result details
        document.getElementById('res-food-title').innerText = mealData.title;
        document.getElementById('res-food-type').innerText = `${mealData.type} Meal`;
        document.getElementById('res-food-calories').innerText = `${mealData.calories} kcal`;
        document.getElementById('res-food-protein').innerText = `${mealData.p}g`;
        document.getElementById('res-food-carbs').innerText = `${mealData.c}g`;
        document.getElementById('res-food-fat').innerText = `${mealData.f}g`;
        document.getElementById('res-food-advice').innerText = mealData.advice;
        
        document.getElementById('scanner-results').classList.remove('hidden');

        if (logBtn) {
            logBtn.disabled = false;
            logBtn.className = 'bg-primary hover:bg-[#005321] text-white font-bold text-xs px-5 py-2 rounded-xl shadow-sm cursor-pointer transition-all active:scale-95';
        }
    }, 2200);
}

window.logScannedMeal = function() {
    if (!activeScannedMeal) return;

    const day = state.selectedDay;
    const clientName = localStorage.getItem('nutriflow_client_logged_name') || 'Sarah Jenkins';
    if (!state.clientMealPlans[clientName][day]) {
        state.clientMealPlans[clientName][day] = [];
    }

    const slot = state.activeScanSlot || 'Breakfast';

    // Clear existing entry in this slot
    state.clientMealPlans[clientName][day] = state.clientMealPlans[clientName][day].filter(m => m.type.toLowerCase() !== slot.toLowerCase());

    // Push new logged food to slot
    state.clientMealPlans[clientName][day].push({
        type: slot,
        title: activeScannedMeal.title,
        calories: activeScannedMeal.calories,
        p: activeScannedMeal.p,
        c: activeScannedMeal.c,
        f: activeScannedMeal.f,
        image: activeScannedMeal.image
    });

    saveState();
    closeAIScanner();
    showToast(`Logged "${activeScannedMeal.title}" as ${slot}!`, 'success');
    
    // Update active views
    renderMealPlans();
    renderDashboardMeals();
    updateKcalDisplay();
};

window.viewRecipeDetails = function(title, type, image, kcal, p, c, fat) {
    const modal = document.getElementById('recipe-modal');
    if (!modal) return;
    
    document.getElementById('modal-recipe-title').innerText = title;
    document.getElementById('modal-recipe-type').innerText = type;
    document.getElementById('modal-recipe-image').src = image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400';
    document.getElementById('modal-recipe-kcal').innerText = kcal;
    document.getElementById('modal-recipe-protein').innerText = `${p}g`;
    document.getElementById('modal-recipe-carbs').innerText = `${c}g`;
    document.getElementById('modal-recipe-fat').innerText = `${fat}g`;

    const instructions = RECIPES_DB[title] ? RECIPES_DB[title].instructions : 'Combine ingredients. Grill or prepare as directed by program guide.';
    const ingredients = RECIPES_DB[title] ? RECIPES_DB[title].ingredients : ['Standard meal assets', 'Water'];

    document.getElementById('modal-recipe-instructions').innerText = instructions;
    document.getElementById('modal-recipe-ingredients').innerHTML = ingredients.map(ing => `<li>${ing}</li>`).join('');

    modal.classList.remove('hidden');
    modal.classList.add('flex');
};

window.closeRecipeModal = function() {
    const modal = document.getElementById('recipe-modal');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }
};

window.logMealFromPlan = function(mealType) {
    state.loggedMeals[mealType] = true;
    saveState();
    showToast(`Logged ${mealType} as consumed!`, 'success');
    renderMealPlans();
};

window.unlogMealFromPlan = function(mealType) {
    state.loggedMeals[mealType] = false;
    saveState();
    showToast(`Removed consumed log for ${mealType}`, 'info');
    renderMealPlans();
};

// ==================== CLIENT APPOINTMENTS ====================
function renderAppointmentsView() {
    const list = document.getElementById('appointments-upcoming-list');
    if (!list) return;
    
    const upcoming = state.appointments.filter(apt => apt.status === 'approved' || apt.status === 'pending');
    
    if (upcoming.length === 0) {
        list.innerHTML = `
            <div class="w-full py-8 text-center text-xs font-semibold text-on-surface-variant border border-dashed border-outline-variant/35 rounded-2xl bg-surface-container-lowest">
                No upcoming appointments. Book a new session to get started.
            </div>
        `;
    } else {
        list.innerHTML = upcoming.map(apt => {
            const dateObj = new Date(apt.date);
            const monthStr = dateObj.toLocaleString('en-US', { month: 'short' }).toUpperCase();
            const dayStr = dateObj.getDate();
            const isPending = apt.status === 'pending';
            
            return `
                <div class="bg-surface-container-lowest rounded-2xl p-5 border border-outline-variant/30 shadow-sm flex items-center justify-between gap-4">
                    <div class="flex items-center gap-4">
                        <div class="w-16 h-16 rounded-xl bg-surface-container-low border border-surface-variant/35 flex flex-col items-center justify-center shrink-0">
                            <span class="text-[10px] font-bold text-on-surface-variant">${monthStr}</span>
                            <span class="text-2xl font-extrabold text-on-surface mt-0.5 leading-none">${dayStr}</span>
                        </div>
                        <div>
                            <div class="flex items-center gap-2">
                                <h3 class="font-bold text-on-background text-base leading-tight">${apt.serviceTitle}</h3>
                                ${isPending ? `<span class="bg-amber-100 text-amber-800 text-[9px] font-bold px-2 py-0.5 rounded-full border border-amber-300">Pending Approval</span>` : ''}
                            </div>
                            <div class="flex items-center gap-3 text-xs text-on-surface-variant font-medium mt-1">
                                <span class="flex items-center gap-1"><span class="material-symbols-outlined text-[15px]">schedule</span> ${apt.time}</span>
                                <span>•</span>
                                <span class="flex items-center gap-1"><span class="material-symbols-outlined text-[15px]">videocam</span> ${apt.type}</span>
                            </div>
                            <div class="flex items-center gap-2 mt-2">
                                <div class="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[10px] font-bold border shrink-0">
                                    ${apt.therapist.split(' ').pop().substring(0,2).toUpperCase()}
                                </div>
                                <span class="text-xs text-on-surface font-semibold">${apt.therapist}</span>
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-col sm:flex-row gap-2 shrink-0">
                        ${!isPending && apt.type === 'Video Call' ? `
                            <button onclick="joinVideoCall('${apt.id}')" class="bg-primary hover:bg-[#005321] text-white font-bold text-xs px-4 py-2 rounded-lg shadow-sm transition-all active:scale-95">Join Call</button>
                        ` : ''}
                        <button onclick="rescheduleAppointment('${apt.id}')" class="border border-outline-variant/30 hover:bg-surface-container text-on-surface-variant font-bold text-xs px-4 py-2 rounded-lg transition-colors">Reschedule</button>
                    </div>
                </div>
            `;
        }).join('');
    }

    const completedCount = state.appointments.filter(a => a.status === 'completed').length + 12;
    const upcomingCount = upcoming.filter(a => a.status === 'approved').length;
    document.getElementById('overview-completed-count').innerText = completedCount;
    document.getElementById('overview-upcoming-count').innerText = upcomingCount;

    const historyList = document.getElementById('appointments-history-list');
    if (historyList) {
        const histories = [
            { title: 'Initial Consultation', date: 'Sep 15, 2023', doc: 'Dr. Sarah Jenkins' },
            { title: 'Check-in', date: 'Aug 02, 2023', doc: 'Mark Davies' }
        ];
        historyList.innerHTML = histories.map(h => `
            <div class="flex justify-between items-center pb-2 border-b border-surface-variant/30 text-xs">
                <div>
                    <h4 class="font-bold text-on-background">${h.title}</h4>
                    <p class="text-[10px] text-on-surface-variant/80 mt-0.5">${h.date} • ${h.doc}</p>
                </div>
                <span class="material-symbols-outlined text-on-surface-variant/50 text-[18px]">chevron_right</span>
            </div>
        `).join('');
    }
}

window.joinVideoCall = function(aptId) {
    const apt = state.appointments.find(a => a.id === aptId);
    if (!apt) return;
    
    showToast(`Connecting to video session with ${apt.therapist}...`, 'success');
    setTimeout(() => {
        window.location.href = `./telehealth.html?practitioner=${encodeURIComponent(apt.therapist)}`;
    }, 850);
};

// Reschedule Modal controls
window.rescheduleAppointment = function(aptId) {
    const modal = document.getElementById('reschedule-modal');
    if (!modal) return;
    
    document.getElementById('reschedule-apt-id').value = aptId;
    
    // Pre-populate date picker with current date + 1 day
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    document.getElementById('reschedule-date').value = tomorrow.toISOString().split('T')[0];
    
    modal.classList.remove('hidden');
    modal.classList.add('flex');
};

window.closeRescheduleModal = function() {
    const modal = document.getElementById('reschedule-modal');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }
};

window.handleRescheduleSubmit = function(e) {
    e.preventDefault();
    const aptId = document.getElementById('reschedule-apt-id').value;
    const date = document.getElementById('reschedule-date').value;
    const time = document.getElementById('reschedule-time').value;
    
    const aptIndex = state.appointments.findIndex(a => a.id === aptId);
    if (aptIndex !== -1) {
        state.appointments[aptIndex].date = date;
        state.appointments[aptIndex].time = time;
        state.appointments[aptIndex].status = 'pending'; // Change status back to pending dietitian approval
        saveState();
        
        localStorage.setItem('nutriflow_appointments', JSON.stringify(state.appointments));
    }
    
    closeRescheduleModal();
    renderAppointmentsView();
    showToast('Reschedule request submitted to dietitian!', 'success');
};

// Past history
const MOCK_HISTORY_DETAILS = {
    'Initial Consultation': {
        summary: 'Conducted a detailed analysis of daily baseline habits and nutritional preferences. Set target goals: weight reduction of 12 lbs, fat loss, muscle mass maintenance.',
        weight: '168.0 lbs',
        fat: '22.4%',
        prescription: [
            'Maintain clean high protein breakfast (Smoothies or Toast).',
            'Caloric target set at 2,100 kcal / day.',
            'Incorporate daily 30-min cardio/brisk walk.'
        ]
    },
    'Check-in': {
        summary: 'Evaluated first two weeks of tracking logs. Protein intake compliance is strong. Energy levels reported high. Increased fiber recommendations.',
        weight: '165.2 lbs',
        fat: '21.8%',
        prescription: [
            'Add leafy greens to lunch salad.',
            'Stay hydrated: minimum 8 glasses of water daily.',
            'Maintain current macro ratios.'
        ]
    },
    'Body Composition Scan': {
        summary: 'Performed complete bioelectrical impedance analysis and measurements. Excellent muscle mass rentention. Caloric deficit is yielding targeted adipose loss.',
        weight: '163.0 lbs',
        fat: '20.9%',
        prescription: [
            'Continue current layout plans.',
            'Dietitian approved a weekend cheat/rest meal.',
            'Next review session scheduled in 3 weeks.'
        ]
    }
};

window.showPastHistoryModal = function() {
    const modal = document.getElementById('past-history-modal');
    if (!modal) return;
    
    const histories = [
        { title: 'Initial Consultation', date: 'Sep 15, 2023', doc: 'Dr. Sarah Jenkins' },
        { title: 'Check-in', date: 'Aug 02, 2023', doc: 'Mark Davies' },
        { title: 'Body Composition Scan', date: 'Jul 10, 2023', doc: 'Dr. Sarah Jenkins' }
    ];
    
    const list = document.getElementById('past-history-modal-list');
    list.innerHTML = histories.map((h, i) => `
        <div onclick="viewConsultationNotes('${h.title}', '${h.date}', '${h.doc}')" class="flex justify-between items-center p-3 border border-outline-variant/30 rounded-xl hover:bg-surface-container-low cursor-pointer transition-all active:scale-98">
            <div>
                <h4 class="font-bold text-on-background text-xs">${h.title}</h4>
                <p class="text-[10px] text-on-surface-variant/80 mt-0.5">${h.date} • ${h.doc}</p>
            </div>
            <span class="material-symbols-outlined text-primary text-[18px]">chevron_right</span>
        </div>
    `).join('');
    
    modal.classList.remove('hidden');
    modal.classList.add('flex');
};

window.closePastHistoryModal = function() {
    const modal = document.getElementById('past-history-modal');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }
};

window.viewConsultationNotes = function(title, date, doc) {
    const modal = document.getElementById('consultation-notes-modal');
    if (!modal) return;
    
    document.getElementById('notes-title').innerText = title;
    document.getElementById('notes-date').innerText = `${date} • ${doc}`;
    
    const detail = MOCK_HISTORY_DETAILS[title] || MOCK_HISTORY_DETAILS['Initial Consultation'];
    
    document.getElementById('notes-summary').innerText = detail.summary;
    document.getElementById('notes-metric-weight').innerText = detail.weight;
    document.getElementById('notes-metric-fat').innerText = detail.fat;
    
    document.getElementById('notes-prescription').innerHTML = detail.prescription.map(p => `<li>${p}</li>`).join('');
    
    modal.classList.remove('hidden');
    modal.classList.add('flex');
};

window.closeConsultationNotesModal = function() {
    const modal = document.getElementById('consultation-notes-modal');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }
};

// ==================== CLIENT BOOKING WIZARD ====================
function renderBookingWizard() {
    const step = state.bookingFlow.step;
    for (let i = 1; i <= 4; i++) {
        const node = document.getElementById(`step-node-${i}`);
        if (!node) continue;
        const line = document.getElementById('booking-stepper-progress-line');
        
        if (i < step) {
            node.className = 'relative z-10 flex flex-col items-center bg-surface px-2 step-completed';
            node.querySelector('.w-10').className = 'w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-label-md shadow-md';
            node.querySelector('.w-10').innerHTML = '<span class="material-symbols-outlined text-[16px]">check</span>';
        } else if (i === step) {
            node.className = 'relative z-10 flex flex-col items-center bg-surface px-2 step-active';
            node.querySelector('.w-10').className = 'w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-label-md shadow-md';
            node.querySelector('.w-10').innerText = i;
        } else {
            node.className = 'relative z-10 flex flex-col items-center bg-surface px-2 step-inactive';
            node.querySelector('.w-10').className = 'w-10 h-10 rounded-full bg-surface text-on-surface-variant border-2 border-surface-variant flex items-center justify-center font-bold text-label-md';
            node.querySelector('.w-10').innerText = i;
        }
        
        if (line) {
            if (step === 1) line.style.width = '0%';
            if (step === 2) line.style.width = '33%';
            if (step === 3) line.style.width = '66%';
            if (step === 4) line.style.width = '100%';
        }
    }

    document.querySelectorAll('.booking-step-container').forEach(c => c.classList.add('hidden'));
    document.getElementById(`booking-step-${step}`).classList.remove('hidden');

    if (step === 1) {
        renderBookingStep1();
    } else if (step === 2) {
        renderBookingStep2();
    }
}

function renderBookingStep1() {
    const grid = document.getElementById('booking-services-grid');
    if (!grid) return;
    
    grid.innerHTML = Object.values(SERVICES).map(srv => {
        const isSelected = state.bookingFlow.selectedServiceId === srv.id;
        
        return `
            <div onclick="selectBookingService('${srv.id}')" class="service-card glass-card rounded-2xl overflow-hidden cursor-pointer flex flex-col h-full bg-white relative group border ${isSelected ? 'border-primary ring-2 ring-primary bg-surface' : 'border-outline-variant/30 hover:border-primary/50'}">
                <div class="absolute top-3 right-3 z-10 ${isSelected ? 'opacity-100' : 'opacity-0'} group-hover:opacity-100 transition-opacity">
                    <span class="material-symbols-outlined text-primary bg-white rounded-full p-1 shadow-sm">check_circle</span>
                </div>
                <div class="h-40 w-full relative overflow-hidden">
                    <img class="w-full h-full object-cover" src="${srv.image}" alt="${srv.title}">
                    <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    ${srv.popular ? `<span class="absolute bottom-3 left-3 bg-primary text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">Most Popular</span>` : ''}
                    ${srv.tag ? `<span class="absolute bottom-3 left-3 bg-secondary text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">${srv.tag}</span>` : ''}
                </div>
                <div class="p-5 flex flex-col flex-grow">
                    <h3 class="font-bold text-on-surface text-lg leading-tight mb-2">${srv.title}</h3>
                    <p class="text-xs text-on-surface-variant flex-grow line-clamp-3 leading-relaxed mb-4">${srv.description}</p>
                    
                    <div class="flex items-center gap-3 text-xs text-on-surface-variant font-medium mb-4">
                        <div class="flex items-center gap-1"><span class="material-symbols-outlined text-secondary text-[16px]">schedule</span><span>${srv.duration}</span></div>
                        <span>•</span>
                        <div class="flex items-center gap-1"><span class="material-symbols-outlined text-secondary text-[16px]">videocam</span><span>${srv.type}</span></div>
                    </div>
                    
                    <div class="flex items-center justify-between border-t border-outline-variant/20 pt-3 mt-auto">
                        <span class="text-lg font-extrabold text-on-surface">$${srv.price}</span>
                        <button class="text-primary font-bold text-xs flex items-center gap-1 group-hover:underline">
                            ${isSelected ? 'Selected' : 'Select'} <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    const nextBtn = document.getElementById('booking-next-btn-1');
    if (state.bookingFlow.selectedServiceId) {
        nextBtn.classList.remove('opacity-50', 'cursor-not-allowed');
        nextBtn.disabled = false;
        nextBtn.onclick = () => advanceBookingStep(2);
    } else {
        nextBtn.classList.add('opacity-50', 'cursor-not-allowed');
        nextBtn.disabled = true;
    }
}

window.selectBookingService = function(srvId) {
    state.bookingFlow.selectedServiceId = srvId;
    renderBookingStep1();
};

window.advanceBookingStep = function(stepNum) {
    state.bookingFlow.step = stepNum;
    renderBookingWizard();
};

window.goBackToBookingStep = function(stepNum) {
    state.bookingFlow.step = stepNum;
    renderBookingWizard();
};

function renderBookingStep2() {
    const srv = SERVICES[state.bookingFlow.selectedServiceId];
    if (!srv) return;
    
    document.getElementById('booking-summary-service-img').src = srv.image;
    document.getElementById('booking-summary-service-title').innerText = srv.title;
    document.getElementById('booking-summary-service-duration').innerText = `${srv.duration} Duration`;
    document.getElementById('booking-summary-service-therapist').innerText = srv.therapist;
    document.getElementById('booking-summary-service-cost').innerText = `$${srv.price}.00`;

    const grid = document.getElementById('booking-calendar-grid');
    if (!grid) return;

    document.getElementById('calendar-month-year').innerText = "October 2024";
    let daysHtml = '';
    daysHtml += `<div class="p-3 text-center text-xs font-semibold text-outline-variant/30">29</div>`;
    daysHtml += `<div class="p-3 text-center text-xs font-semibold text-outline-variant/30">30</div>`;
    
    for (let day = 1; day <= 31; day++) {
        const dateStr = `2024-10-${day.toString().padStart(2, '0')}`;
        const isSelected = state.bookingFlow.selectedDate === dateStr;
        const isPast = day < 8;
        
        let cellClass = 'p-3 text-center text-xs font-semibold rounded-lg cursor-pointer transition-all ';
        if (isSelected) {
            cellClass += 'bg-primary text-white shadow-md font-bold';
        } else if (isPast) {
            cellClass += 'text-outline-variant/30 cursor-not-allowed';
        } else {
            cellClass += 'hover:bg-surface-container-low text-on-background';
        }
        daysHtml += `<div ${isPast ? '' : `onclick="selectBookingDate('${dateStr}')"`} class="${cellClass}">${day}</div>`;
    }
    daysHtml += `<div class="p-3 text-center text-xs font-semibold text-outline-variant/30">1</div>`;
    daysHtml += `<div class="p-3 text-center text-xs font-semibold text-outline-variant/30">2</div>`;
    grid.innerHTML = daysHtml;

    const morningContainer = document.getElementById('booking-morning-slots');
    const afternoonContainer = document.getElementById('booking-afternoon-slots');
    const dateIndicator = document.getElementById('selected-date-indicator');
    
    if (!state.bookingFlow.selectedDate) {
        dateIndicator.innerText = "Please select a date from the calendar";
        morningContainer.innerHTML = '';
        afternoonContainer.innerHTML = '';
        return;
    }

    const formattedDate = new Date(state.bookingFlow.selectedDate).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
    dateIndicator.innerText = formattedDate;

    const morningSlots = ["08:00 AM", "09:00 AM", "09:30 AM", "10:30 AM"];
    const afternoonSlots = ["01:00 PM", "02:30 PM", "04:00 PM", "04:30 PM"];

    const buildSlotHtml = (slots) => slots.map(slot => {
        const isSelected = state.bookingFlow.selectedSlot === slot;
        const isBooked = slot === '04:30 PM';
        let btnClass = 'w-full py-2.5 rounded-xl border text-xs font-bold transition-all text-center ';
        if (isSelected) {
            btnClass += 'bg-primary border-primary text-white shadow-sm';
        } else if (isBooked) {
            btnClass += 'bg-surface-container border-outline-variant/10 text-outline-variant/30 cursor-not-allowed';
        } else {
            btnClass += 'bg-surface border-outline-variant/40 text-on-surface-variant hover:border-primary hover:text-primary';
        }
        return `<button ${isBooked ? '' : `onclick="selectBookingSlot('${slot}')"`} class="${btnClass}">${slot}</button>`;
    }).join('');

    morningContainer.innerHTML = buildSlotHtml(morningSlots);
    afternoonContainer.innerHTML = buildSlotHtml(afternoonSlots);

    const nextBtn = document.getElementById('booking-next-btn-2');
    if (state.bookingFlow.selectedDate && state.bookingFlow.selectedSlot) {
        nextBtn.classList.remove('opacity-50', 'cursor-not-allowed');
        nextBtn.disabled = false;
    } else {
        nextBtn.classList.add('opacity-50', 'cursor-not-allowed');
        nextBtn.disabled = true;
    }
}

window.selectBookingDate = function(dateStr) {
    state.bookingFlow.selectedDate = dateStr;
    state.bookingFlow.selectedSlot = null;
    renderBookingStep2();
};

window.selectBookingSlot = function(slot) {
    state.bookingFlow.selectedSlot = slot;
    renderBookingStep2();
};

window.handleDetailsSubmit = function(e) {
    e.preventDefault();
    
    const name = document.getElementById('details-name').value;
    const email = document.getElementById('details-email').value;
    const goal = document.getElementById('details-goal').value;
    
    const srv = SERVICES[state.bookingFlow.selectedServiceId];
    
    const newApt = {
        id: `apt-${Math.random().toString(36).substr(2, 9)}`,
        clientName: name,
        clientEmail: email,
        serviceId: srv.id,
        serviceTitle: srv.title,
        price: srv.price,
        duration: srv.duration,
        therapist: srv.therapist,
        date: state.bookingFlow.selectedDate,
        time: state.bookingFlow.selectedSlot,
        status: 'pending',
        type: srv.type
    };
    
    state.appointments.push(newApt);
    saveState(); // push to localStorage so Admin calendar can read it!

    document.getElementById('success-service-title').innerText = srv.title;
    document.getElementById('success-date').innerText = new Date(state.bookingFlow.selectedDate).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
    document.getElementById('success-time').innerText = state.bookingFlow.selectedSlot;
    document.getElementById('success-practitioner').innerText = srv.therapist;
    document.getElementById('success-price').innerText = `$${srv.price}.00`;

    advanceBookingStep(4);
    showToast('Your booking request has been submitted!', 'success');
};

window.resetBookingWizardStateAndExit = function() {
    state.bookingFlow = {
        step: 1,
        selectedServiceId: null,
        selectedDate: null,
        selectedSlot: null
    };
    navigateTo('appointments');
};

function checkStatsLoggedToday() {
    const todayStr = new Date().toDateString();
    const lastLogged = localStorage.getItem('nutriflow_last_logged_date');
    
    const btn = document.getElementById('stats-submit-btn');
    const wInput = document.getElementById('stats-weight');
    const waistInput = document.getElementById('stats-waist');
    const hipInput = document.getElementById('stats-hip');
    const fastedInput = document.getElementById('stats-fasted');
    
    if (lastLogged === todayStr) {
        if (btn) {
            btn.disabled = true;
            btn.className = 'w-full bg-[#6d7b6c]/40 text-[#6d7b6c] font-bold text-sm py-2.5 rounded-lg cursor-not-allowed flex items-center justify-center gap-1.5 border border-outline-variant/30';
            btn.innerHTML = '<span class="material-symbols-outlined text-[18px]">check_circle</span> Stats Logged Today';
        }
        if (wInput) wInput.disabled = true;
        if (waistInput) waistInput.disabled = true;
        if (hipInput) hipInput.disabled = true;
        if (fastedInput) fastedInput.disabled = true;
        return true;
    } else {
        if (btn) {
            btn.disabled = false;
            btn.className = 'w-full bg-[#006e2f] hover:bg-[#005321] text-white font-bold text-sm py-2.5 rounded-lg transition-all shadow-sm cursor-pointer';
            btn.innerText = 'Save Entry';
        }
        if (wInput) wInput.disabled = false;
        if (waistInput) waistInput.disabled = false;
        if (hipInput) hipInput.disabled = false;
        if (fastedInput) fastedInput.disabled = false;
        return false;
    }
}

// ==================== PROFILE / PROGRESS ====================
function initProfileCharts() {
    checkStatsLoggedToday();
    
    const ctxWeight = document.getElementById('weightTrendChartCanvas').getContext('2d');
    const labels = state.profileStats.weightHistory.map(d => d.month);
    const weights = state.profileStats.weightHistory.map(d => d.weight);

    if (weightChartInstance) weightChartInstance.destroy();
    weightChartInstance = new Chart(ctxWeight, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Weight (lbs)',
                data: weights,
                borderColor: '#006e2f',
                backgroundColor: 'rgba(0, 110, 47, 0.05)',
                borderWidth: 2,
                pointBackgroundColor: '#006e2f',
                pointBorderColor: '#ffffff',
                pointRadius: 4,
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

    const ctxMeas = document.getElementById('bodyMeasurementsChartCanvas').getContext('2d');
    const measLabels = state.profileStats.bodyMeasurements.map(d => d.label);
    const waists = state.profileStats.bodyMeasurements.map(d => d.waist);
    const hips = state.profileStats.bodyMeasurements.map(d => d.hip);

    if (measurementsChartInstance) measurementsChartInstance.destroy();
    measurementsChartInstance = new Chart(ctxMeas, {
        type: 'bar',
        data: {
            labels: measLabels,
            datasets: [
                { label: 'Waist (in)', data: waists, backgroundColor: '#006e2f', borderRadius: 6 },
                { label: 'Hip (in)', data: hips, backgroundColor: '#006a61', borderRadius: 6 }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'bottom', labels: { color: '#0b1c30', font: { size: 11 } } }
            },
            scales: {
                y: { grid: { color: 'rgba(211, 228, 254, 0.4)' }, ticks: { color: '#6d7b6c', font: { size: 10 } } },
                x: { grid: { display: false }, ticks: { color: '#6d7b6c', font: { size: 10 } } }
            }
        }
    });
}

window.handleStatsLogSubmit = function(e) {
    e.preventDefault();
    
    if (checkStatsLoggedToday()) {
        showToast('You have already logged your stats today.', 'error');
        return;
    }
    
    const weightVal = parseFloat(document.getElementById('stats-weight').value);
    const waistVal = parseFloat(document.getElementById('stats-waist').value);
    const hipVal = parseFloat(document.getElementById('stats-hip').value);
    
    const date = new Date();
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const currentMonth = monthNames[date.getMonth()];
    const labelStr = `${currentMonth} ${date.getDate()}`;
    
    state.profileStats.weightHistory.push({ month: currentMonth, weight: weightVal });
    state.profileStats.bodyMeasurements.push({ label: labelStr, waist: waistVal, hip: hipVal });
    
    localStorage.setItem('nutriflow_last_logged_date', date.toDateString());
    saveState();
    
    initProfileCharts();
    showToast('Saved health stats entry successfully!', 'success');
};
