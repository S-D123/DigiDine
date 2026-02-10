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
                    window.location.href = 'menu.html';
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

    // Initialize
    function init() {
        updateTableDisplay();
        updateCart();
        updateOrderStatus();
        
        if (orderSent) {
            requestBillBtn.style.display = 'block';
        }
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
                
                // Check if no filters active, activate "All"
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
            const name = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();
            const category = card.dataset.category;
            const filters = card.dataset.filter?.split(' ') || [];

            // Check search
            const matchesSearch = name.includes(searchTerm) || description.includes(searchTerm);
            
            // Check category
            const matchesCategory = activeCategory === 'all' || category === activeCategory;
            
            // Check filters
            let matchesFilters = true;
            if (activeFilters.length > 0) {
                matchesFilters = activeFilters.some(f => filters.includes(f));
            }

            const shouldShow = matchesSearch && matchesCategory && matchesFilters;
            card.classList.toggle('hidden', !shouldShow);
            
            if (shouldShow) visibleCount++;
        });

        // Show/hide empty state
        emptyState?.classList.toggle('visible', visibleCount === 0);
    }

    // Add to Cart
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

            // Visual feedback
            this.classList.add('added');
            setTimeout(() => this.classList.remove('added'), 1000);

            updateCart();
        });
    });

    // Update Cart
    function updateCart() {
        sessionStorage.setItem('cart', JSON.stringify(cart));
        
        const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
        const tax = subtotal * 0.1;
        const total = subtotal + tax;

        // Update counts
        if (cartCount) cartCount.textContent = totalItems;
        if (itemCount) itemCount.textContent = `${totalItems} item${totalItems !== 1 ? 's' : ''}`;
        
        // Update mobile cart button
        if (mobileCartBtn) {
            mobileCartBtn.querySelector('.cart-count').textContent = totalItems;
            mobileCartBtn.querySelector('.cart-total').textContent = formatCurrency(total);
        }

        // Update totals
        if (subtotalEl) subtotalEl.textContent = formatCurrency(subtotal);
        if (taxEl) taxEl.textContent = formatCurrency(tax);
        if (totalEl) totalEl.textContent = formatCurrency(total);

        // Update order items
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

                // Add event listeners to quantity buttons
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

        // Enable/disable send button
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
    sendToKitchenBtn?.addEventListener('click', function() {
        if (cart.length === 0) return;

        this.disabled = true;
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

        setTimeout(() => {
            // Show notification
            kitchenNotification.classList.add('show');
            
            // Update status
            orderSent = true;
            sessionStorage.setItem('orderSent', 'true');
            updateOrderStatus();
            
            // Show request bill button
            requestBillBtn.style.display = 'block';
            
            // Reset button
            this.innerHTML = '<i class="fas fa-paper-plane"></i> Send to Kitchen';
            this.disabled = false;
            
            // Hide notification after delay
            setTimeout(() => {
                kitchenNotification.classList.remove('show');
            }, 4000);
        }, 1500);
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

        // Populate receipt
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
    document.getElementById('printBill')?.addEventListener('click', () => {
        window.print();
    });

    // Close Bill
    document.getElementById('closeBill')?.addEventListener('click', () => {
        billModal.classList.remove('active');
    });

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

    // Initialize menu page
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
