// Global Variables
let cart = [];
let wishlist = [];
let products = [];
let filteredProducts = [];
let currentFilter = 'all';

// Sample Products Data
const sampleProducts = [
    {
        id: 1,
        name: "Premium Wireless Headphones",
        category: "electronics",
        price: 299.99,
        originalPrice: 399.99,
        image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=400&fit=crop",
        rating: 4.8,
        reviews: 1247,
        description: "Experience crystal-clear audio with our premium wireless headphones featuring active noise cancellation and 30-hour battery life.",
        inStock: true,
        discount: 25
    },
    {
        id: 2,
        name: "Smart Fitness Watch",
        category: "electronics",
        price: 249.99,
        originalPrice: 299.99,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
        rating: 4.6,
        reviews: 892,
        description: "Track your fitness goals with this advanced smartwatch featuring heart rate monitoring, GPS, and 7-day battery life.",
        inStock: true,
        discount: 17
    },
    {
        id: 3,
        name: "Designer Leather Jacket",
        category: "fashion",
        price: 189.99,
        originalPrice: 249.99,
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop",
        rating: 4.7,
        reviews: 543,
        description: "Premium genuine leather jacket with modern design and perfect fit. A timeless piece for your wardrobe.",
        inStock: true,
        discount: 24
    },
    {
        id: 4,
        name: "Running Sneakers",
        category: "fashion",
        price: 129.99,
        originalPrice: 159.99,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
        rating: 4.5,
        reviews: 1156,
        description: "Comfortable and stylish running shoes with advanced cushioning technology for optimal performance.",
        inStock: true,
        discount: 19
    },
    {
        id: 5,
        name: "Modern Coffee Table",
        category: "home",
        price: 349.99,
        originalPrice: 449.99,
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop",
        rating: 4.4,
        reviews: 324,
        description: "Elegant modern coffee table made from sustainable materials. Perfect centerpiece for your living room.",
        inStock: true,
        discount: 22
    },
    {
        id: 6,
        name: "Yoga Mat Pro",
        category: "sports",
        price: 79.99,
        originalPrice: 99.99,
        image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop",
        rating: 4.9,
        reviews: 756,
        description: "Professional-grade yoga mat with superior grip and cushioning. Perfect for all types of yoga practice.",
        inStock: true,
        discount: 20
    },
    {
        id: 7,
        name: "Wireless Bluetooth Speaker",
        category: "electronics",
        price: 89.99,
        originalPrice: 119.99,
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop",
        rating: 4.3,
        reviews: 432,
        description: "Portable Bluetooth speaker with 360-degree sound and waterproof design. Perfect for outdoor adventures.",
        inStock: true,
        discount: 25
    },
    {
        id: 8,
        name: "Minimalist Desk Lamp",
        category: "home",
        price: 59.99,
        originalPrice: 79.99,
        image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=400&fit=crop",
        rating: 4.6,
        reviews: 289,
        description: "Sleek and modern desk lamp with adjustable brightness and USB charging port. Perfect for any workspace.",
        inStock: true,
        discount: 25
    }
];

// DOM Elements
const loadingScreen = document.getElementById('loading-screen');
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const cartBtn = document.getElementById('cart-btn');
const cartSidebar = document.getElementById('cart-sidebar');
const closeCart = document.getElementById('close-cart');
const cartCount = document.getElementById('cart-count');
const cartItems = document.getElementById('cart-items');
const cartSubtotal = document.getElementById('cart-subtotal');
const cartTotal = document.getElementById('cart-total');
const productsGrid = document.getElementById('products-grid');
const productModal = document.getElementById('product-modal');
const modalClose = document.getElementById('modal-close');
const backToTop = document.getElementById('back-to-top');
const searchInput = document.getElementById('search-input');
const filterBtns = document.querySelectorAll('.filter-btn');
const loadMoreBtn = document.getElementById('load-more-btn');

// Initialize App
document.addEventListener('DOMContentLoaded', function() {
    // Hide loading screen after 2 seconds
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
    }, 2000);
    
    // Initialize products
    products = [...sampleProducts];
    filteredProducts = [...products];
    
    // Load initial products
    loadProducts();
    
    // Initialize event listeners
    initEventListeners();
    
    // Initialize animations
    initScrollAnimations();
});

// Event Listeners
function initEventListeners() {
    // Navigation
    hamburger.addEventListener('click', toggleMobileMenu);
    
    // Cart
    cartBtn.addEventListener('click', toggleCart);
    closeCart.addEventListener('click', toggleCart);
    
    // Modal
    modalClose.addEventListener('click', closeModal);
    productModal.addEventListener('click', (e) => {
        if (e.target === productModal) closeModal();
    });
    
    // Search
    searchInput.addEventListener('input', handleSearch);
    
    // Filters
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => handleFilter(e.target.dataset.filter));
    });
    
    // Load more
    loadMoreBtn.addEventListener('click', loadMoreProducts);
    
    // Scroll events
    window.addEventListener('scroll', handleScroll);
    
    // Back to top
    backToTop.addEventListener('click', scrollToTop);
    
    // Hero buttons
    document.getElementById('shop-now-btn').addEventListener('click', () => {
        document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
    });
    
    document.getElementById('explore-btn').addEventListener('click', () => {
        document.getElementById('categories').scrollIntoView({ behavior: 'smooth' });
    });
    
    // Category cards
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', (e) => {
            const category = e.currentTarget.dataset.category;
            handleFilter(category);
            document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
        });
    });
    
    // Navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = e.target.getAttribute('href');
            document.querySelector(target).scrollIntoView({ behavior: 'smooth' });
            
            // Update active link
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            e.target.classList.add('active');
            
            // Close mobile menu
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// Mobile Menu Toggle
function toggleMobileMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
}

// Cart Functions
function toggleCart() {
    cartSidebar.classList.toggle('open');
    updateCartDisplay();
}

function addToCart(productId, quantity = 1) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ ...product, quantity });
    }
    
    updateCartCount();
    updateCartDisplay();
    showNotification(`${product.name} added to cart!`);
    
    // Animate cart button
    cartBtn.classList.add('animate');
    setTimeout(() => cartBtn.classList.remove('animate'), 300);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartCount();
    updateCartDisplay();
}

function updateCartQuantity(productId, quantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        if (quantity <= 0) {
            removeFromCart(productId);
        } else {
            item.quantity = quantity;
            updateCartCount();
            updateCartDisplay();
        }
    }
}

function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = count;
    cartCount.classList.toggle('show', count > 0);
}

function updateCartDisplay() {
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <p>Your cart is empty</p>
                <button class="btn-primary" onclick="toggleCart()">Start Shopping</button>
            </div>
        `;
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-details">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                    <div class="quantity-controls">
                        <button class="qty-btn" onclick="updateCartQuantity(${item.id}, ${item.quantity - 1})">-</button>
                        <input type="number" class="qty-input" value="${item.quantity}" min="1" 
                               onchange="updateCartQuantity(${item.id}, parseInt(this.value))">
                        <button class="qty-btn" onclick="updateCartQuantity(${item.id}, ${item.quantity + 1})">+</button>
                    </div>
                </div>
                <button class="remove-item" onclick="removeFromCart(${item.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `).join('');
    }
    
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    cartSubtotal.textContent = `$${subtotal.toFixed(2)}`;
    cartTotal.textContent = `$${subtotal.toFixed(2)}`;
}

// Product Functions
function loadProducts() {
    const productsToShow = filteredProducts.slice(0, 8);
    
    productsGrid.innerHTML = productsToShow.map(product => `
        <div class="product-card fade-in" data-category="${product.category}">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
                ${product.discount ? `<div class="product-badge">${product.discount}% OFF</div>` : ''}
                <div class="product-actions">
                    <button class="action-btn" onclick="toggleWishlist(${product.id})" title="Add to Wishlist">
                        <i class="fas fa-heart"></i>
                    </button>
                    <button class="action-btn" onclick="openProductModal(${product.id})" title="Quick View">
                        <i class="fas fa-eye"></i>
                    </button>
                </div>
            </div>
            <div class="product-info">
                <div class="product-category">${product.category}</div>
                <h3 class="product-name">${product.name}</h3>
                <div class="product-rating">
                    <div class="stars">
                        ${generateStars(product.rating)}
                    </div>
                    <span class="rating-count">(${product.reviews})</span>
                </div>
                <div class="product-price">
                    <span class="current-price">$${product.price.toFixed(2)}</span>
                    ${product.originalPrice ? `<span class="original-price">$${product.originalPrice.toFixed(2)}</span>` : ''}
                    ${product.discount ? `<span class="discount">${product.discount}% OFF</span>` : ''}
                </div>
                <button class="add-to-cart" onclick="addToCart(${product.id})">
                    <i class="fas fa-shopping-cart"></i>
                    Add to Cart
                </button>
            </div>
        </div>
    `).join('');
    
    // Trigger animation
    setTimeout(() => {
        document.querySelectorAll('.product-card').forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('visible');
            }, index * 100);
        });
    }, 100);
}

function loadMoreProducts() {
    const currentCount = document.querySelectorAll('.product-card').length;
    const nextProducts = filteredProducts.slice(currentCount, currentCount + 4);
    
    if (nextProducts.length === 0) {
        loadMoreBtn.style.display = 'none';
        return;
    }
    
    // Show loading spinner
    loadMoreBtn.querySelector('.loading-spinner').style.display = 'block';
    loadMoreBtn.querySelector('span').style.opacity = '0.5';
    
    setTimeout(() => {
        nextProducts.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card fade-in';
            productCard.dataset.category = product.category;
            productCard.innerHTML = `
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}">
                    ${product.discount ? `<div class="product-badge">${product.discount}% OFF</div>` : ''}
                    <div class="product-actions">
                        <button class="action-btn" onclick="toggleWishlist(${product.id})" title="Add to Wishlist">
                            <i class="fas fa-heart"></i>
                        </button>
                        <button class="action-btn" onclick="openProductModal(${product.id})" title="Quick View">
                            <i class="fas fa-eye"></i>
                        </button>
                    </div>
                </div>
                <div class="product-info">
                    <div class="product-category">${product.category}</div>
                    <h3 class="product-name">${product.name}</h3>
                    <div class="product-rating">
                        <div class="stars">
                            ${generateStars(product.rating)}
                        </div>
                        <span class="rating-count">(${product.reviews})</span>
                    </div>
                    <div class="product-price">
                        <span class="current-price">$${product.price.toFixed(2)}</span>
                        ${product.originalPrice ? `<span class="original-price">$${product.originalPrice.toFixed(2)}</span>` : ''}
                        ${product.discount ? `<span class="discount">${product.discount}% OFF</span>` : ''}
                    </div>
                    <button class="add-to-cart" onclick="addToCart(${product.id})">
                        <i class="fas fa-shopping-cart"></i>
                        Add to Cart
                    </button>
                </div>
            `;
            
            productsGrid.appendChild(productCard);
            
            // Trigger animation
            setTimeout(() => {
                productCard.classList.add('visible');
            }, 100);
        });
        
        // Hide loading spinner
        loadMoreBtn.querySelector('.loading-spinner').style.display = 'none';
        loadMoreBtn.querySelector('span').style.opacity = '1';
        
        // Hide load more button if no more products
        if (document.querySelectorAll('.product-card').length >= filteredProducts.length) {
            loadMoreBtn.style.display = 'none';
        }
    }, 1000);
}

function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let stars = '';
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star star"></i>';
    }
    
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt star"></i>';
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star star"></i>';
    }
    
    return stars;
}

// Product Modal
function openProductModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    document.getElementById('modal-main-image').src = product.image;
    document.getElementById('modal-product-name').textContent = product.name;
    document.getElementById('modal-product-rating').innerHTML = generateStars(product.rating);
    document.getElementById('modal-rating-count').textContent = `(${product.reviews} reviews)`;
    document.getElementById('modal-current-price').textContent = `$${product.price.toFixed(2)}`;
    
    if (product.originalPrice) {
        document.getElementById('modal-original-price').textContent = `$${product.originalPrice.toFixed(2)}`;
        document.getElementById('modal-original-price').style.display = 'inline';
    } else {
        document.getElementById('modal-original-price').style.display = 'none';
    }
    
    if (product.discount) {
        document.getElementById('modal-discount').textContent = `${product.discount}% OFF`;
        document.getElementById('modal-discount').style.display = 'inline';
    } else {
        document.getElementById('modal-discount').style.display = 'none';
    }
    
    document.getElementById('modal-product-description').textContent = product.description;
    
    // Add to cart functionality
    document.getElementById('add-to-cart-modal').onclick = () => {
        const quantity = parseInt(document.getElementById('qty-input').value);
        addToCart(productId, quantity);
        closeModal();
    };
    
    // Quantity controls
    document.getElementById('qty-decrease').onclick = () => {
        const input = document.getElementById('qty-input');
        if (input.value > 1) input.value = parseInt(input.value) - 1;
    };
    
    document.getElementById('qty-increase').onclick = () => {
        const input = document.getElementById('qty-input');
        input.value = parseInt(input.value) + 1;
    };
    
    productModal.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    productModal.classList.remove('open');
    document.body.style.overflow = 'auto';
}

// Filter and Search
function handleFilter(filter) {
    currentFilter = filter;
    
    // Update filter buttons
    filterBtns.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.filter === filter);
    });
    
    // Filter products
    if (filter === 'all') {
        filteredProducts = [...products];
    } else {
        filteredProducts = products.filter(product => product.category === filter);
    }
    
    // Reset and reload products
    productsGrid.innerHTML = '';
    loadMoreBtn.style.display = 'block';
    loadProducts();
}

function handleSearch() {
    const query = searchInput.value.toLowerCase().trim();
    
    if (query === '') {
        filteredProducts = currentFilter === 'all' ? [...products] : products.filter(p => p.category === currentFilter);
    } else {
        const baseProducts = currentFilter === 'all' ? products : products.filter(p => p.category === currentFilter);
        filteredProducts = baseProducts.filter(product => 
            product.name.toLowerCase().includes(query) ||
            product.category.toLowerCase().includes(query) ||
            product.description.toLowerCase().includes(query)
        );
    }
    
    // Reset and reload products
    productsGrid.innerHTML = '';
    loadMoreBtn.style.display = 'block';
    loadProducts();
}

// Wishlist Functions
function toggleWishlist(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const index = wishlist.findIndex(item => item.id === productId);
    
    if (index > -1) {
        wishlist.splice(index, 1);
        showNotification(`${product.name} removed from wishlist!`);
    } else {
        wishlist.push(product);
        showNotification(`${product.name} added to wishlist!`);
    }
    
    updateWishlistCount();
}

function updateWishlistCount() {
    const wishlistCount = document.getElementById('wishlist-count');
    if (wishlistCount) {
        wishlistCount.textContent = wishlist.length;
        wishlistCount.classList.toggle('show', wishlist.length > 0);
    }
}

// Scroll Functions
function handleScroll() {
    const scrollTop = window.pageYOffset;
    
    // Navbar scroll effect
    if (scrollTop > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Back to top button
    if (scrollTop > 500) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
    
    // Update active navigation link
    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in').forEach(el => {
        observer.observe(el);
    });
}

// Notification System
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 90px;
        right: 20px;
        background: var(--primary-color);
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: var(--shadow-lg);
        z-index: 5000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        display: flex;
        align-items: center;
        gap: 10px;
        max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Animate out and remove
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add debounced search
searchInput.addEventListener('input', debounce(handleSearch, 300));