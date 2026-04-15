/* ========================================
   QRMenu Pro - Restaurant Ordering System
   JavaScript Functionality
   ======================================== */

// ========================================
// UTILITY FUNCTIONS
// ========================================

// Format currency
function formatCurrency(amount) {
    return '$' + parseFloat(amount).toFixed(2);
}

// const API_BASE_URL = window.location.origin + '/api';
// const API_BASE_URL = 'http://127.0.0.1:8000/api' 
const API_BASE_URL = '' 


// Get current date/time formatted
function getCurrentDateTime() {
    const now = new Date();
    return now.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// ========================================
// LANDING PAGE FUNCTIONALITY
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileNav = document.querySelector('.mobile-nav');
    
    if (mobileMenuBtn && mobileNav) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileNav.classList.toggle('active');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });

        // Close mobile nav when clicking a link
        mobileNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileNav.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-times');
            });
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Header scroll effect
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
            } else {
                header.style.boxShadow = 'var(--shadow-sm)';
            }
        });
    }
});

// ========================================
// AUTH PAGE FUNCTIONALITY
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const successMessage = document.getElementById('successMessage');
    const toggleFormBtns = document.querySelectorAll('.toggle-form');
    const togglePasswordBtns = document.querySelectorAll('.toggle-password');
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.carousel-dots .dot');
    const themeToggle = document.getElementById('themeToggle');
    
    // Form Toggle
    toggleFormBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const target = this.dataset.target;
            
            if (target === 'signup') {
                loginForm?.classList.remove('active');
                signupForm?.classList.add('active');
            } else {
                signupForm?.classList.remove('active');
                loginForm?.classList.add('active');
            }
        });
    });

    // Toggle Password Visibility
    togglePasswordBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const input = this.parentElement.querySelector('input');
            const icon = this.querySelector('i');
            
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    });

    // Password Strength Indicator
    const signupPassword = document.getElementById('signupPassword');
    const strengthFill = document.querySelector('.strength-fill');
    const strengthText = document.querySelector('.strength-text');

    if (signupPassword && strengthFill && strengthText) {
        signupPassword.addEventListener('input', function() {
            const password = this.value;
            let strength = 0;
            
            if (password.length >= 8) strength++;
            if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
            if (password.match(/[0-9]/)) strength++;
            if (password.match(/[^a-zA-Z0-9]/)) strength++;

            strengthFill.className = 'strength-fill';
            
            if (password.length === 0) {
                strengthText.textContent = 'Password strength';
            } else if (strength <= 1) {
                strengthFill.classList.add('weak');
                strengthText.textContent = 'Weak password';
            } else if (strength <= 2) {
                strengthFill.classList.add('medium');
                strengthText.textContent = 'Medium password';
            } else {
                strengthFill.classList.add('strong');
                strengthText.textContent = 'Strong password';
            }
        });
    }

    // Form Validation
    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function showError(input, message) {
        const wrapper = input.closest('.input-wrapper');
        const error = input.closest('.form-group').querySelector('.error-message');
        wrapper.querySelector('input, select').classList.add('invalid');
        wrapper.querySelector('input, select').classList.remove('valid');
        if (error) error.textContent = message;
    }

    function showSuccess(input) {
        const wrapper = input.closest('.input-wrapper');
        const error = input.closest('.form-group').querySelector('.error-message');
        wrapper.querySelector('input, select').classList.remove('invalid');
        wrapper.querySelector('input, select').classList.add('valid');
        if (error) error.textContent = '';
    }

    // Login Form Submission
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('loginEmail');
            const password = document.getElementById('loginPassword');
            const submitBtn = this.querySelector('button[type="submit"]');
            let isValid = true;

            // Validate email
            if (!validateEmail(email.value)) {
                showError(email, 'Please enter a valid email');
                isValid = false;
            } else {
                showSuccess(email);
            }

            // Validate password
            if (password.value.length < 6) {
                showError(password, 'Password must be at least 6 characters');
                isValid = false;
            } else {
                showSuccess(password);
            }

            if (isValid) {
                // Show loading state
                submitBtn.classList.add('loading');
                
                // Simulate login
                setTimeout(() => {
                    submitBtn.classList.remove('loading');
                    // Store login state
                    sessionStorage.setItem('isLoggedIn', 'true');
                    sessionStorage.setItem('userEmail', email.value);
                    // Redirect to menu demo
                    window.location.href = '/scan/';
                }, 1500);
            }
        });
    }

    // Signup Form Submission
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const restaurantName = document.getElementById('restaurantName');
            const email = document.getElementById('signupEmail');
            const phone = document.getElementById('phone');
            const restaurantType = document.getElementById('restaurantType');
            const password = document.getElementById('signupPassword');
            const confirmPassword = document.getElementById('confirmPassword');
            const agreeTerms = document.getElementById('agreeTerms');
            const submitBtn = this.querySelector('button[type="submit"]');
            let isValid = true;

            // Validate restaurant name
            if (restaurantName.value.length < 2) {
                showError(restaurantName, 'Please enter your restaurant name');
                isValid = false;
            } else {
                showSuccess(restaurantName);
            }

            // Validate email
            if (!validateEmail(email.value)) {
                showError(email, 'Please enter a valid email');
                isValid = false;
            } else {
                showSuccess(email);
            }

            // Validate phone
            if (phone.value.length < 10) {
                showError(phone, 'Please enter a valid phone number');
                isValid = false;
            } else {
                showSuccess(phone);
            }

            // Validate restaurant type
            if (!restaurantType.value) {
                showError(restaurantType, 'Please select restaurant type');
                isValid = false;
            } else {
                showSuccess(restaurantType);
            }

            // Validate password
            if (password.value.length < 8) {
                showError(password, 'Password must be at least 8 characters');
                isValid = false;
            } else {
                showSuccess(password);
            }

            // Validate confirm password
            if (confirmPassword.value !== password.value) {
                showError(confirmPassword, 'Passwords do not match');
                isValid = false;
            } else if (confirmPassword.value.length > 0) {
                showSuccess(confirmPassword);
            }

            // Validate terms
            if (!agreeTerms.checked) {
                alert('Please agree to the Terms of Service and Privacy Policy');
                isValid = false;
            }

            if (isValid) {
                // Show loading state
                submitBtn.classList.add('loading');
                
                // Simulate signup
                setTimeout(() => {
                    submitBtn.classList.remove('loading');
                    signupForm.classList.remove('active');
                    successMessage.classList.add('active');
                    
                    // Store signup state
                    sessionStorage.setItem('isLoggedIn', 'true');
                    sessionStorage.setItem('restaurantName', restaurantName.value);
                }, 1500);
            }
        });
    }

    // Testimonial Carousel
    let currentTestimonial = 0;
    
    function showTestimonial(index) {
        testimonials.forEach((t, i) => {
            t.classList.toggle('active', i === index);
        });
        dots.forEach((d, i) => {
            d.classList.toggle('active', i === index);
        });
    }

    if (testimonials.length > 0) {
        // Auto-rotate testimonials
        setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            showTestimonial(currentTestimonial);
        }, 5000);

        // Click on dots to change testimonial
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentTestimonial = index;
                showTestimonial(currentTestimonial);
            });
        });
    }

    // Theme Toggle
    if (themeToggle) {
        // Check for saved theme preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
        }

        themeToggle.addEventListener('click', function() {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }
});

// ========================================
// MENU PAGE FUNCTIONALITY
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    // Only run on menu page
    if (!document.querySelector('.menu-page')) return;

    // State
    let cart = JSON.parse(sessionStorage.getItem('cart')) || [];
    let currentTable = sessionStorage.getItem('currentTable') || '12';
    let orderSent = sessionStorage.getItem('orderSent') === 'true';
    let specialInstructions = JSON.parse(sessionStorage.getItem('specialInstructions')) || {};

    // DOM Elements
    const menuGrid = document.getElementById('menuGrid');
    const menuSearch = document.getElementById('menuSearch');
    const clearSearch = document.getElementById('clearSearch');
    const filterTags = document.querySelectorAll('.filter-tag');
    const categoryTabs = document.querySelectorAll('.category-tab');
    const orderPanel = document.getElementById('orderPanel');
    const orderItems = document.getElementById('orderItems');
    const cartCount = document.getElementById('cartCount');
    const itemCount = document.getElementById('itemCount');
    const subtotalEl = document.getElementById('subtotal');
    const taxEl = document.getElementById('tax');
    const totalEl = document.getElementById('total');
    const sendToKitchenBtn = document.getElementById('sendToKitchen');
    const requestBillBtn = document.getElementById('requestBill');
    const kitchenNotification = document.getElementById('kitchenNotification');
    const mobileCartBtn = document.getElementById('mobileCartBtn');
    const cartToggle = document.getElementById('cartToggle');
    const tableIndicator = document.getElementById('tableIndicator');
    const tableModal = document.getElementById('tableModal');
    const tableNumber = document.getElementById('tableNumber');
    const tableBtns = document.querySelectorAll('.table-btn');
    const billModal = document.getElementById('billModal');
    const instructionsModal = document.getElementById('instructionsModal');
    const emptyState = document.getElementById('emptyState');
    const backToTop = document.getElementById('backToTop');
    const orderStatus = document.getElementById('orderStatus');

    // Django API Configuration
    const RESTAURANT_ID = 'urban-bistro'; 
    // const API_BASE_URL = 'http://localhost:8000/api';

    // --- Dynamic Data Fetching ---
    async function fetchMenuData() {
        try {
            // 1. Fetch Restaurant Info
            const resResponse = await fetch(`${API_BASE_URL}/restaurants/${RESTAURANT_ID}/`);
            if (resResponse.ok) {
                const restaurantData = await resResponse.json();
                document.querySelector('.restaurant-info h1').textContent = restaurantData.name;
                
                // 3. "Request Bill" details fetched from database
                // Update Restaurant Details in the Receipt Modal
                const receiptName = document.getElementById('receiptRestaurantName');
                const receiptAddress = document.getElementById('receiptRestaurantAddress');
                const receiptPhone = document.getElementById('receiptRestaurantPhone');
                
                if (receiptName) receiptName.textContent = restaurantData.name;
                if (receiptAddress) receiptAddress.textContent = restaurantData.address || 'Address not available';
                if (receiptPhone) receiptPhone.textContent = `Tel: ${restaurantData.phone || 'N/A'}`;
            }

                
            // 2. Fetch Menu Items
            const menuResponse = await fetch(`${API_BASE_URL}/restaurants/${RESTAURANT_ID}/menu-items/`);
            if (menuResponse.ok) {
                const menuData = await menuResponse.json();
                renderMenuGrid(menuData.items);
            } else {
                throw new Error("Failed to load items");
            }
        } catch (error) {
            console.error("Error fetching data from Django:", error);
            if (menuGrid) {
                menuGrid.innerHTML = '<p style="color:red;">Error loading menu. Is the Django server running?</p>';
            }
        }
    }

    // --- Dynamic Rendering ---
    function renderMenuGrid(items) {
        menuGrid.innerHTML = ''; // Clear loading state

        items.forEach(item => {
            const card = document.createElement('div');
            card.className = 'menu-card';
            card.dataset.category = item.category || 'main';
            card.dataset.filter = item.filters ? item.filters.join(' ') : '';
            card.dataset.id = item.id;

            // Determine badge based on filters
            let badgeHtml = '';
            if (item.filters && item.filters.includes('veg')) badgeHtml += '<span class="food-badge veg"></span>';
            if (item.filters && item.filters.includes('non-veg')) badgeHtml += '<span class="food-badge non-veg"></span>';
            if (item.filters && item.filters.includes('vegan')) badgeHtml += '<span class="food-badge vegan"></span>';
            
            let spicyHtml = (item.filters && item.filters.includes('spicy')) ? '<span class="spicy-badge"><i class="fas fa-pepper-hot"></i></span>' : '';

            card.innerHTML = `
                <div class="card-image">
                    <div class="image-placeholder">
                        <i class="fas ${item.icon || 'fa-utensils'}"></i>
                    </div>
                    ${badgeHtml}
                    ${spicyHtml}
                </div>
                <div class="card-content">
                    <h3>${item.name}</h3>
                    <p>${item.description || ''}</p>
                    <div class="card-footer">
                        <span class="price">$${parseFloat(item.price).toFixed(2)}</span>
                        <button class="add-btn" data-id="${item.id}" data-name="${item.name}" data-price="${item.price}">
                            <span class="add-text"><i class="fas fa-plus"></i> Add</span>
                            <span class="added-text"><i class="fas fa-check"></i> Added</span>
                        </button>
                    </div>
                </div>
            `;
            menuGrid.appendChild(card);
        });

        attachAddButtonListeners();
        filterMenu(); 
    }

    // Attach Add Button Listeners (For Dynamic Content)
    function attachAddButtonListeners() {
        document.querySelectorAll('.add-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const id = this.dataset.id;
                const name = this.dataset.name;
                const price = parseFloat(this.dataset.price);

                const existingItem = cart.find(item => item.id === id);
                
                if (existingItem) {
                    existingItem.qty++;
                } else {
                    cart.push({ id, name, price, qty: 1 });
                }

                this.classList.add('added');
                setTimeout(() => this.classList.remove('added'), 1000);
                updateCart();
            });
        });
    }

    // Initialize
    function init() {
        updateTableDisplay();
        updateCart();
        updateOrderStatus();
        
        if (orderSent) {
            requestBillBtn.style.display = 'block';
        }
        
        // Trigger fetch on load
        fetchMenuData(); 
    }

    // Update Table Display
    function updateTableDisplay() {
        if (tableNumber) {
            tableNumber.textContent = currentTable;
        }
        document.getElementById('receiptTable')?.textContent && 
            (document.getElementById('receiptTable').textContent = currentTable);
    }

    // Table Selection
    if (tableIndicator) {
        tableIndicator.addEventListener('click', () => {
            tableModal.classList.add('active');
        });
    }

    tableBtns.forEach(btn => {
        if (!btn.disabled) {
            btn.addEventListener('click', function() {
                tableBtns.forEach(b => b.classList.remove('selected'));
                this.classList.add('selected');
                currentTable = this.dataset.table;
                sessionStorage.setItem('currentTable', currentTable);
                updateTableDisplay();
                tableModal.classList.remove('active');
            });
        }
    });

    // Close modals
    document.querySelectorAll('.modal-close, #closeBill, #cancelInstructions').forEach(btn => {
        btn.addEventListener('click', function() {
            this.closest('.modal').classList.remove('active');
        });
    });

    // Click outside modal to close
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('active');
            }
        });
    });

    // Search Functionality
    if (menuSearch) {
        menuSearch.addEventListener('input', filterMenu);
        clearSearch?.addEventListener('click', () => {
            menuSearch.value = '';
            filterMenu();
        });
    }

    // Filter Tags
    filterTags.forEach(tag => {
        tag.addEventListener('click', function() {
            if (this.dataset.filter === 'all') {
                filterTags.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
            } else {
                document.querySelector('.filter-tag[data-filter="all"]').classList.remove('active');
                this.classList.toggle('active');
                
                const activeFilters = document.querySelectorAll('.filter-tag.active:not([data-filter="all"])');
                if (activeFilters.length === 0) {
                    document.querySelector('.filter-tag[data-filter="all"]').classList.add('active');
                }
            }
            filterMenu();
        });
    });

    // Category Tabs
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            categoryTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            filterMenu();
        });
    });

    // Filter Menu Function
    function filterMenu() {
        const searchTerm = menuSearch?.value.toLowerCase() || '';
        const activeCategory = document.querySelector('.category-tab.active')?.dataset.category || 'all';
        const activeFilters = Array.from(document.querySelectorAll('.filter-tag.active'))
            .map(f => f.dataset.filter)
            .filter(f => f !== 'all');

        const cards = document.querySelectorAll('.menu-card');
        let visibleCount = 0;

        cards.forEach(card => {
            const name = card.querySelector('h3')?.textContent.toLowerCase() || '';
            const description = card.querySelector('p')?.textContent.toLowerCase() || '';
            const category = card.dataset.category;
            const filters = card.dataset.filter?.split(' ') || [];

            const matchesSearch = name.includes(searchTerm) || description.includes(searchTerm);
            const matchesCategory = activeCategory === 'all' || category === activeCategory;
            
            let matchesFilters = true;
            if (activeFilters.length > 0) {
                matchesFilters = activeFilters.some(f => filters.includes(f));
            }

            const shouldShow = matchesSearch && matchesCategory && matchesFilters;
            card.classList.toggle('hidden', !shouldShow);
            
            if (shouldShow) visibleCount++;
        });

        emptyState?.classList.toggle('visible', visibleCount === 0);
    }

    // Update Cart
    function updateCart() {
        sessionStorage.setItem('cart', JSON.stringify(cart));
        
        const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
        const tax = subtotal * 0.1;
        const total = subtotal + tax;

        if (cartCount) cartCount.textContent = totalItems;
        if (itemCount) itemCount.textContent = `${totalItems} item${totalItems !== 1 ? 's' : ''}`;
        
        if (mobileCartBtn) {
            mobileCartBtn.querySelector('.cart-count').textContent = totalItems;
            mobileCartBtn.querySelector('.cart-total').textContent = formatCurrency(total);
        }

        if (subtotalEl) subtotalEl.textContent = formatCurrency(subtotal);
        if (taxEl) taxEl.textContent = formatCurrency(tax);
        if (totalEl) totalEl.textContent = formatCurrency(total);

        if (orderItems) {
            if (cart.length === 0) {
                orderItems.innerHTML = `
                    <div class="empty-cart">
                        <i class="fas fa-shopping-basket"></i>
                        <p>Your cart is empty</p>
                        <span>Add items from the menu</span>
                    </div>
                `;
            } else {
                orderItems.innerHTML = cart.map(item => `
                    <div class="order-item-card" data-id="${item.id}">
                        <div class="item-details">
                            <h4>${item.name}</h4>
                            <span class="item-price">${formatCurrency(item.price * item.qty)}</span>
                            ${specialInstructions[item.id] ? `<small style="color: var(--gray-500); display: block; margin-top: 4px;"><i class="fas fa-sticky-note"></i> ${specialInstructions[item.id]}</small>` : ''}
                        </div>
                        <div class="item-controls">
                            <button class="qty-btn minus" data-id="${item.id}">
                                <i class="fas fa-minus"></i>
                            </button>
                            <span class="item-qty">${item.qty}</span>
                            <button class="qty-btn plus" data-id="${item.id}">
                                <i class="fas fa-plus"></i>
                            </button>
                        </div>
                        <div class="item-actions">
                            <button class="instruction-btn ${specialInstructions[item.id] ? 'has-note' : ''}" data-id="${item.id}" data-name="${item.name}" title="Special instructions">
                                <i class="fas fa-sticky-note"></i>
                            </button>
                            <button class="remove-btn" data-id="${item.id}" title="Remove item">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                    </div>
                `).join('');

                orderItems.querySelectorAll('.qty-btn.minus').forEach(btn => {
                    btn.addEventListener('click', () => updateItemQty(btn.dataset.id, -1));
                });
                
                orderItems.querySelectorAll('.qty-btn.plus').forEach(btn => {
                    btn.addEventListener('click', () => updateItemQty(btn.dataset.id, 1));
                });
                
                orderItems.querySelectorAll('.remove-btn').forEach(btn => {
                    btn.addEventListener('click', () => removeItem(btn.dataset.id));
                });

                orderItems.querySelectorAll('.instruction-btn').forEach(btn => {
                    btn.addEventListener('click', () => openInstructionsModal(btn.dataset.id, btn.dataset.name));
                });
            }
        }

        if (sendToKitchenBtn) {
            sendToKitchenBtn.disabled = cart.length === 0;
        }
    }

    // Update Item Quantity
    function updateItemQty(id, change) {
        const item = cart.find(i => i.id === id);
        if (item) {
            item.qty += change;
            if (item.qty <= 0) {
                removeItem(id);
            } else {
                updateCart();
            }
        }
    }

    // Remove Item
    function removeItem(id) {
        cart = cart.filter(item => item.id !== id);
        delete specialInstructions[id];
        sessionStorage.setItem('specialInstructions', JSON.stringify(specialInstructions));
        updateCart();
    }

    // Special Instructions Modal
    let currentInstructionItemId = null;

    function openInstructionsModal(id, name) {
        currentInstructionItemId = id;
        document.getElementById('instructionItemName').textContent = name;
        document.getElementById('specialInstructions').value = specialInstructions[id] || '';
        instructionsModal.classList.add('active');
    }

    document.getElementById('saveInstructions')?.addEventListener('click', () => {
        const instruction = document.getElementById('specialInstructions').value.trim();
        if (instruction) {
            specialInstructions[currentInstructionItemId] = instruction;
        } else {
            delete specialInstructions[currentInstructionItemId];
        }
        sessionStorage.setItem('specialInstructions', JSON.stringify(specialInstructions));
        instructionsModal.classList.remove('active');
        updateCart();
    });

    // Send to Kitchen
    sendToKitchenBtn?.addEventListener('click', async function() {
        if (cart.length === 0) return;

        this.disabled = true;
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

        // 1. Prepare the exact data the Admin page needs
        const orderPayload = {
            restaurant_id: RESTAURANT_ID,
            table: currentTable,
            status: 'pending', // pending, preparing, ready
            timePlaced: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
            items: cart,
            instructions: specialInstructions
        };

        try {
            // 2. Send the order to your Django Backend
            const response = await fetch(`${API_BASE_URL}/orders/place/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderPayload)
            });

            const data = await response.json();

            if (response.ok) {
                // Success! 
                kitchenNotification.classList.add('show');
                orderSent = true;
                sessionStorage.setItem('orderSent', 'true');
                updateOrderStatus();
                
                requestBillBtn.style.display = 'block';
                this.innerHTML = '<i class="fas fa-check"></i> Sent to Kitchen';
                
                setTimeout(() => {
                    kitchenNotification.classList.remove('show');
                }, 4000);
            } else {
                throw new Error(data.error || "Failed to send order");
            }
        } catch (error) {
            console.error("Order Error:", error);
            alert("Could not send order to the kitchen. Please ask a waiter.");
            this.innerHTML = '<i class="fas fa-paper-plane"></i> Try Again';
            this.disabled = false;
        }
    });

    // Update Order Status
    function updateOrderStatus() {
        if (orderStatus) {
            if (orderSent) {
                orderStatus.classList.add('sent');
                orderStatus.querySelector('.status-text').textContent = 'Order Sent';
            }
        }
    }

    // Request Bill
    requestBillBtn?.addEventListener('click', function() {
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
        const tax = subtotal * 0.1;
        const total = subtotal + tax;

        document.getElementById('receiptDate').textContent = getCurrentDateTime();
        document.getElementById('receiptTable').textContent = currentTable;
        
        const receiptItems = document.getElementById('receiptItems');
        receiptItems.innerHTML = cart.map(item => `
            <div class="receipt-item">
                <span class="receipt-item-name">${item.name}</span>
                <span class="receipt-item-qty">x${item.qty}</span>
                <span>${formatCurrency(item.price * item.qty)}</span>
            </div>
        `).join('');

        document.getElementById('receiptSubtotal').textContent = formatCurrency(subtotal);
        document.getElementById('receiptTax').textContent = formatCurrency(tax);
        document.getElementById('receiptTotal').textContent = formatCurrency(total);

        billModal.classList.add('active');
    });

    // Print Bill
    // document.getElementById('printBill')?.addEventListener('click', () => {
    //     window.print();
    // });

    // payment processing
    const printBill = document.getElementById('printBill');
        
    if (printBill) {
        printBill.addEventListener('click', async function() {
            // Change button text to show loading state
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
            this.disabled = true;

            // 1. Calculate your final total (replace with your actual cart total variable)
            const finalAmount = 100; // Ensure this is the final numerical value

            try {
                // 2. Ask Django to create a secure Razorpay Order
                const response = await fetch(`${API_BASE_URL}/payments/create/`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ amount: finalAmount })
                });

                // Catch Django 500 Server Errors before they break response.json()
                if (!response.ok) {
                    const errorText = await response.text();
                    console.error("Backend failed:", errorText);
                    throw new Error(`Server returned ${response.status}`);
                }

                const data = await response.json();

                if (response.ok) {
                    // 3. Configure the Razorpay Checkout Modal
                    const options = {
                        "key": "rzp_test_SRN9gxagO0uE67", // Enter your Key ID here too!
                        "amount": data.amount, 
                        "currency": data.currency,
                        "name": "DigiDine Restaurant",
                        "description": `Table ${currentTable} Bill`,
                        "order_id": data.razorpay_order_id, // The secure ID from Django
                        "handler": function (response) {
                            // This function runs when the payment is SUCCESSFUL
                            alert(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
                            
                            // Here you can call another Django endpoint to mark the Firebase order as "Paid"
                            // window.location.href = 'success.html'; 
                        },
                        "prefill": {
                            "name": "Customer",
                            "contact": "9999999999" // Optional: Fill if you collected it
                        },
                        "theme": {
                            "color": "#eab308" // Match your DigiDine theme color
                        }
                    };

                    // 4. Open the modal
                    const rzp = new Razorpay(options);
                    
                    // Handle if user closes the popup without paying
                    rzp.on('payment.failed', function (response){
                        alert("Payment failed or cancelled. Please try again.");
                    });
                    
                    rzp.open();
                } else {
                    alert("Failed to initiate payment: " + data.error);
                }
            } catch (error) {
                console.error("Payment Error:", error);
                alert("Could not connect to payment gateway.");
            } finally {
                // Restore the button
                this.innerHTML = originalText;
                this.disabled = false;
            }
        });
    }

    // Mobile Cart Toggle
    mobileCartBtn?.addEventListener('click', () => {
        orderPanel?.classList.toggle('mobile-active');
        document.body.style.overflow = orderPanel?.classList.contains('mobile-active') ? 'hidden' : '';
    });

    cartToggle?.addEventListener('click', () => {
        orderPanel?.classList.toggle('mobile-active');
        document.body.style.overflow = orderPanel?.classList.contains('mobile-active') ? 'hidden' : '';
    });

    // Back to Top
    window.addEventListener('scroll', () => {
        if (backToTop) {
            backToTop.classList.toggle('visible', window.scrollY > 500);
        }
    });

    backToTop?.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Start Menu Page
    init();
});

// Mobile panel styles (add dynamically)
const style = document.createElement('style');
style.textContent = `
    @media (max-width: 1024px) {
        .order-panel.mobile-active {
            display: flex !important;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            width: 100%;
            max-height: 100%;
            z-index: 1000;
            border-radius: 0;
            animation: slideUp 0.3s ease;
        }
        
        @keyframes slideUp {
            from {
                transform: translateY(100%);
            }
            to {
                transform: translateY(0);
            }
        }
    }
`;
document.head.appendChild(style);

// ========================================
// ADMIN PAGE FUNCTIONALITY
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    // Only run on admin page
    if (!document.querySelector('.admin-page')) return;

    // --- Tab Navigation ---
    const navItems = document.querySelectorAll('.sidebar-nav .nav-item[data-tab]');
    const tabContents = document.querySelectorAll('.admin-tab-content');

    navItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all
            navItems.forEach(nav => nav.classList.remove('active'));
            tabContents.forEach(tab => tab.classList.remove('active'));

            // Add active class to clicked
            this.classList.add('active');
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');

            // If clicked on "history", fetch the history
            if (tabId.toLowerCase().includes('history')) {
                fetchOrderHistory();
            }
        });
    });

    // --- Mock Data Initialization ---
    let liveOrders = [];
    const hasPendingOrder = sessionStorage.getItem('orderSent') === 'true';
    const currentTable = sessionStorage.getItem('currentTable') || '12';
    const cartData = JSON.parse(sessionStorage.getItem('cart')) || [];

    if (hasPendingOrder && cartData.length > 0) {
        liveOrders.push({
            id: 'ORD-' + Math.floor(Math.random() * 10000),
            table: currentTable,
            status: 'pending', // pending, preparing, ready
            timePlaced: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
            items: cartData
        });
    } else {
        liveOrders.push({
            id: 'ORD-9021',
            table: '5',
            status: 'pending',
            timePlaced: '12:25 PM',
            items: [
                { name: 'Spicy Buffalo Wings', qty: 2 },
                { name: 'House Red Wine', qty: 1 }
            ]
        });
    }

    // --- Mock Order History (Updated with item-level times) ---
    const orderHistory = [
        {
            id: '#10452',
            table: '8',
            date: 'Today, 11:30 AM',
            timeOrdered: '11:30 AM',
            timeDelivered: '11:55 AM',
            phone: '+1 (555) 987-6543',
            total: '$42.50',
            status: 'Completed',
            items: [
                { name: 'Mushroom Risotto', qty: 1, price: 22.99, timeOrdered: '11:30 AM', timeDelivered: '11:50 AM' },
                { name: 'Tiramisu', qty: 1, price: 9.99, timeOrdered: '11:45 AM', timeDelivered: '11:55 AM' },
                { name: 'Fresh Lemonade', qty: 2, price: 5.99, timeOrdered: '11:30 AM', timeDelivered: '11:35 AM' }
            ]
        },
        {
            id: '#10451',
            table: '3',
            date: 'Today, 10:15 AM',
            timeOrdered: '10:15 AM',
            timeDelivered: '10:35 AM',
            phone: '+1 (555) 123-4567',
            total: '$18.98',
            status: 'Completed',
            items: [
                { name: 'Garden Fresh Bruschetta', qty: 1, price: 8.99, timeOrdered: '10:15 AM', timeDelivered: '10:25 AM' },
                { name: 'Artisan Coffee', qty: 2, price: 4.99, timeOrdered: '10:20 AM', timeDelivered: '10:35 AM' }
            ]
        }
    ];

    // ---------------------------------------------------------------------------
    // --- Dynamic Live Orders Fetching ---
    const activeOrdersGrid = document.getElementById('activeOrdersGrid');
    // const API_BASE_URL = 'http://localhost:8000/api'; // Make sure this is here

    // 1. Fetch from Django
    async function fetchLiveOrders() {
        if (!activeOrdersGrid) return;
        
        try {
            const response = await fetch(`${API_BASE_URL}/orders/live/`, { cache: 'no-store' });
            if (response.ok) {
                const data = await response.json();
                renderLiveOrders(data.orders || []);
            }
        } catch (error) {
            console.error("Error fetching live orders:", error);
        }
    }

    // 2. Render to Screen
    function renderLiveOrders(liveOrders) {
        if (!activeOrdersGrid) return;
        activeOrdersGrid.innerHTML = '';

        if (liveOrders.length === 0) {
            activeOrdersGrid.innerHTML = `<p style="color: var(--gray-500);">No active orders at the moment.</p>`;
            return;
        }

        liveOrders.forEach(order => {
            const card = document.createElement('div');
            card.className = `admin-order-card status-${order.status}`;
            
            const items = order.items || [];
            const itemsHtml = items.map(item => `
                <div class="admin-order-item">
                    <span>${item.qty}x ${item.name}</span>
                </div>
            `).join('');

            // CHANGED: Removed inline onclicks, replaced with data attributes and a standard class
            let buttonsHtml = '';
            if (order.status === 'pending') {
                buttonsHtml = `<button class="btn btn-primary btn-block status-btn" data-id="${order.id}" data-status="preparing">Accept & Prepare</button>`;
            } else if (order.status === 'preparing') {
                buttonsHtml = `<button class="btn btn-success btn-block status-btn" style="background:var(--success); color:white;" data-id="${order.id}" data-status="ready">Mark as Ready</button>`;
            } else if (order.status === 'ready') {
                buttonsHtml = `<button class="btn btn-outline btn-block status-btn" data-id="${order.id}" data-status="completed">Served to Table</button>`;
            }

            card.innerHTML = `
                <div class="admin-order-header">
                    <span class="admin-order-table">Table ${order.table}</span>
                    <span class="admin-order-time">${order.timePlaced || 'Just now'}</span>
                </div>
                <div class="admin-order-items">
                    ${itemsHtml}
                </div>
                <div class="admin-order-actions">
                    ${buttonsHtml}
                </div>
            `;
            activeOrdersGrid.appendChild(card);
        });

        // CHANGED: Safely attach event listeners to all generated buttons
        document.querySelectorAll('.status-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const orderId = this.dataset.id;
                const newStatus = this.dataset.status;
                
                // Show loading state on the button immediately
                this.disabled = true;
                this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Updating...';
                
                updateOrderStatusApi(orderId, newStatus);
            });
        });
    }

    // 3. Update Status back to Django (RENAMED to avoid conflicts)
    async function updateOrderStatusApi(orderId, newStatus) {
        try {
            const response = await fetch(`${API_BASE_URL}/orders/${orderId}/status/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: newStatus })
            });

            if (response.ok) {
                // Fetch immediately to remove the old card and show the updated one
                fetchLiveOrders();
            } else {
                const errorData = await response.json();
                console.error("Backend Error:", errorData);
                alert("Failed to update status: " + (errorData.error || "Unknown Error"));
                fetchLiveOrders(); // Refresh to reset the button state
            }
        } catch (error) {
            console.error("Network Error:", error);
            alert("Could not reach the server. Is Django running?");
            fetchLiveOrders(); // Refresh to reset the button state
        }
    }

    // --- Initialization ---
    if (activeOrdersGrid) {
        // Fetch orders immediately on load
        fetchLiveOrders();
        
        // Auto-refresh the orders every 3 seconds (Polling mechanism)
        setInterval(fetchLiveOrders, 3000); 
    }

    // Expose functions to window so inline onclick works
    window.updateOrderStatus = function(orderId, newStatus) {
        const order = liveOrders.find(o => o.id === orderId);
        if (order) {
            order.status = newStatus;
            renderLiveOrders();
        }
    };

    window.completeOrder = function(orderId) {
        const orderIndex = liveOrders.findIndex(o => o.id === orderId);
        if (orderIndex > -1) {
            liveOrders.splice(orderIndex, 1);
            sessionStorage.removeItem('orderSent');
            sessionStorage.removeItem('cart');
            renderLiveOrders();
        }
    };

    // --- Order Details Modal ---
    window.openOrderModal = function(historyIndex) {
        // Because we reversed the array for the table, we must reverse the index back
        const reversedHistory = [...dynamicOrderHistory].reverse();
        const order = reversedHistory[historyIndex];
        
        if (!order) return;

        // Re-calculate total
        const items = order.items || [];
        const subtotal = items.reduce((sum, item) => sum + (parseFloat(item.price || 0) * parseInt(item.qty || 1)), 0);
        const totalWithTax = subtotal + (subtotal * 0.1);
        const shortId = order.id.substring(1, 8).toUpperCase();

        // Populate Modal Data
        document.getElementById('modalOrderId').textContent = `(#${shortId})`;
        document.getElementById('modalPhone').textContent = order.phone || 'Walk-in Customer'; 
        document.getElementById('modalTable').textContent = order.table;
        document.getElementById('modalTimeOrdered').textContent = order.timePlaced || 'N/A';
        document.getElementById('modalTimeDelivered').textContent = order.timeDelivered || 'Completed';
        document.getElementById('modalTotalAmount').textContent = formatCurrency(totalWithTax);

        // Populate Items list
        const itemsList = document.getElementById('modalItemsList');
        itemsList.innerHTML = items.map(item => `
            <li class="modal-item-row">
                <div class="item-main-info">
                    <span class="item-name">${item.qty}x ${item.name}</span>
                    <span class="item-price">${formatCurrency((item.price || 0) * item.qty)}</span>
                </div>
                <div class="item-timing-info">
                    <span><i class="fas fa-clock"></i> Ordered: ${order.timePlaced || 'N/A'}</span>
                    <span><i class="fas fa-check-circle"></i> Served: Completed</span>
                </div>
            </li>
        `).join('');

        const orderDetailsModal = document.getElementById('orderDetailsModal');
        if (orderDetailsModal) orderDetailsModal.classList.add('active');
    };
    
    // --- Dynamic Order History Fetching ---
    const historyTableBody = document.getElementById('historyTableBody');
    let dynamicOrderHistory = []; // Store globally for the modal

    async function fetchOrderHistory() {
        if (!historyTableBody) return;
        
        try {
            const response = await fetch(`${API_BASE_URL}/orders/history/`, { cache: 'no-store' });
            if (response.ok) {
                const data = await response.json();
                dynamicOrderHistory = data.orders || [];
                renderHistory();
            }
        } catch (error) {
            console.error("Error fetching order history:", error);
        }
    }

    function renderHistory() {
        if (!historyTableBody) return;
        historyTableBody.innerHTML = '';

        if (dynamicOrderHistory.length === 0) {
            historyTableBody.innerHTML = `<tr><td colspan="6" style="text-align:center; color: var(--gray-500); padding: 20px;">No completed orders yet.</td></tr>`;
            return;
        }

        // Reverse the array so the newest completed orders show up at the top
        const reversedHistory = [...dynamicOrderHistory].reverse();

        reversedHistory.forEach((order, index) => {
            // Calculate total dynamically based on items and a 10% tax
            const items = order.items || [];
            const subtotal = items.reduce((sum, item) => sum + (parseFloat(item.price || 0) * parseInt(item.qty || 1)), 0);
            const totalWithTax = subtotal + (subtotal * 0.1);
            const formattedTotal = formatCurrency(totalWithTax);

            // Shorten the Firebase ID for a cleaner display
            const shortId = order.id.substring(1, 8).toUpperCase();

            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><strong>#${shortId}</strong></td>
                <td>Table ${order.table}</td>
                <td>Today, ${order.timePlaced || 'N/A'}</td>
                <td><strong>${formattedTotal}</strong></td>
                <td><span class="status-badge completed">Completed</span></td>
                <td>
                    <button class="btn btn-outline" style="padding: 0.25rem 0.75rem; font-size: 0.8125rem;" onclick="openOrderModal(${index})">
                        View Details
                    </button>
                </td>
            `;
            historyTableBody.appendChild(tr);
        });
    }

    // --- Order Details Modal ---
    function renderLiveOrders(liveOrders) {
        if (!activeOrdersGrid) return;
        activeOrdersGrid.innerHTML = '';

        if (liveOrders.length === 0) {
            activeOrdersGrid.innerHTML = `<p style="color: var(--gray-500);">No active orders at the moment.</p>`;
            return;
        }

        liveOrders.forEach(order => {
            const card = document.createElement('div');
            card.className = `admin-order-card status-${order.status}`;
            
            const items = order.items || [];
            const itemsHtml = items.map(item => `
                <div class="admin-order-item">
                    <span>${item.qty}x ${item.name}</span>
                </div>
            `).join('');

            let buttonsHtml = '';
            if (order.status === 'pending') {
                // Wrap buttons in a flex container to control their widths side-by-side
                buttonsHtml = `
                    <div style="display: flex; gap: 8px; width: 100%;">
                        <button class="btn btn-primary status-btn" style="flex: 2;" data-id="${order.id}" data-status="preparing">Accept & Prepare</button>
                        <button class="btn cancel-btn status-btn" style="flex: 1;" data-id="${order.id}" data-status="cancelled">Cancel</button>
                    </div>
                `;
            } else if (order.status === 'preparing') {
                buttonsHtml = `<button class="btn btn-success btn-block status-btn" style="background:var(--success); color:white;" data-id="${order.id}" data-status="ready">Mark as Ready</button>`;
            } else if (order.status === 'ready') {
                buttonsHtml = `<button class="btn btn-outline btn-block status-btn" data-id="${order.id}" data-status="completed">Served to Table</button>`;
            }

            card.innerHTML = `
                <div class="admin-order-header">
                    <span class="admin-order-table">Table ${order.table}</span>
                    <span class="admin-order-time">${order.timePlaced || 'Just now'}</span>
                </div>
                <div class="admin-order-items">
                    ${itemsHtml}
                </div>
                <div class="admin-order-actions">
                    ${buttonsHtml}
                </div>
            `;
            activeOrdersGrid.appendChild(card);
        });

        // Safely attach event listeners to all generated buttons
        document.querySelectorAll('.status-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const orderId = this.dataset.id;
                const newStatus = this.dataset.status;
                
                // Show loading state on the button immediately
                this.disabled = true;
                
                // Keep the loading spinner compact for the smaller cancel button
                if (newStatus === 'cancelled') {
                    this.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
                } else {
                    this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Updating...';
                }
                
                updateOrderStatusApi(orderId, newStatus);
            });
        });
    }


    // Close modals
    document.querySelectorAll('.modal-close, #closeBill, #cancelInstructions').forEach(btn => {
        btn.addEventListener('click', function() {
            this.closest('.modal').classList.remove('active');
        });
    });

    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('active');
            }
        });
    });

    // Initial renders
    renderLiveOrders();
    renderHistory();
});

// ========================================
// QR SCANNER FUNCTIONALITY
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    // Only run on the scan page
    if (!document.querySelector('.scan-page')) return;

    let lastResult = ""; 
    const readerDiv = document.getElementById('reader');

    function processScan(decodedText) {
        if (decodedText === lastResult) return; 
        
        lastResult = decodedText;
        console.log(`Scan result: ${decodedText}`);

        let tableNum = "12"; // Default fallback
        let restaurantId = "urban-bistro"; // Default fallback
        
        // Parse the QR code text. Expected format: "digidine urban-bistro table-4"
        const parts = decodedText.toLowerCase().split(' ');
        if (parts[0] !== 'digidine') {
            // Find or create an error message element
            let errorMsg = document.getElementById('scanError');
            if (!errorMsg) {
                errorMsg = document.createElement('p');
                errorMsg.id = 'scanError';
            }
            
            // Show the error message
            errorMsg.textContent = "Invalid QR Code! Please try again.";
            
            // Clear the error message after 3 seconds
            setTimeout(() => {
                if (errorMsg) errorMsg.textContent = "";
            }, 2000);
            
            // Reset lastResult so it doesn't completely ignore this QR code if they scan it again later
            lastResult = ""; 
            
            // The magic word: "return" stops the function here and PREVENTS the redirect.
            // The camera will naturally continue scanning!
            return;
        }
        else if (parts.length >= 3 && parts[0] === 'digidine') {
            restaurantId = parts[1];
            tableNum = parts[2].replace(/[^0-9]/g, '');
        } else {
            let fallbackNum = decodedText.replace(/[^0-9]/g, ''); 
            if (fallbackNum) tableNum = fallbackNum;
        }
        
        // Save both the restaurant and table to session storage
        sessionStorage.setItem('currentRestaurant', restaurantId);
        sessionStorage.setItem('currentTable', tableNum);
        
        window.location.href = '/menu/';
    }

    // 1. Security Check
    // if (window.location.protocol === 'file:') {
    //     if (readerDiv) readerDiv.innerHTML = '<h3 style="color:red; text-align:center; padding: 20px;">Camera Blocked!<br>Please open this page via http://localhost:3000</h3>';
    // } 
    // else 
        if (typeof Html5Qrcode !== 'undefined') {
        
        // 2. FORCE THE BROWSER PERMISSION POPUP FIRST
        navigator.mediaDevices.getUserMedia({ video: true })
            .then((stream) => {
                // The user clicked "Allow"! 
                // Stop this temporary permission stream so the scanner can use the camera
                stream.getTracks().forEach(track => track.stop());

                // Now it is safe to start the scanner because we have permission
                const html5QrCode = new Html5Qrcode("reader");
                
                html5QrCode.start(
                    { facingMode: "environment" }, // Prioritize the back camera on mobile
                    { fps: 10, qrbox: { width: 250, height: 250 } },
                    (decodedText) => processScan(decodedText),
                    (errorMessage) => { /* Silently ignore background scanning errors */ }
                ).catch(err => {
                    console.error("Scanner Start Error:", err);
                    if (readerDiv) readerDiv.innerHTML = `<p style="color:red; text-align:center;">Failed to start scanner.</p>`;
                });
            })
            .catch((err) => {
                // The user clicked "Block" or the browser blocked it automatically
                console.error("Camera permissions denied:", err);
                if (readerDiv) readerDiv.innerHTML = '<p style="color:red; text-align:center;">Camera access denied. Please click the lock icon next to your URL bar, allow Camera access, and refresh the page.</p>';
            });
    }

    // Fallback Simulate Button for desktop testing
    const simulateBtn = document.getElementById('simulateScanBtn');
    if (simulateBtn) {
        simulateBtn.addEventListener('click', () => {
            sessionStorage.setItem('currentRestaurant', 'urban-bistro');
            sessionStorage.setItem('currentTable', '5');
            window.location.href = '/menu/';
        });
    }
});