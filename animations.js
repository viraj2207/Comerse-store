// Advanced Animation Controller
class AnimationController {
    constructor() {
        this.init();
    }
    
    init() {
        this.setupScrollAnimations();
        this.setupHoverAnimations();
        this.setupLoadingAnimations();
        this.setupParallaxEffects();
        this.setupMorphingShapes();
    }
    
    // Scroll-triggered animations
    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -100px 0px'
        };
        
        const animationObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const animationType = element.dataset.animation || 'fadeInUp';
                    const delay = element.dataset.delay || 0;
                    
                    setTimeout(() => {
                        this.triggerAnimation(element, animationType);
                    }, delay);
                    
                    animationObserver.unobserve(element);
                }
            });
        }, observerOptions);
        
        // Observe elements with animation attributes
        document.querySelectorAll('[data-animation]').forEach(el => {
            animationObserver.observe(el);
        });
        
        // Auto-detect elements for animation
        document.querySelectorAll('.section-title, .section-description, .category-card, .product-card').forEach((el, index) => {
            if (!el.dataset.animation) {
                el.dataset.animation = 'fadeInUp';
                el.dataset.delay = index * 100;
                animationObserver.observe(el);
            }
        });
    }
    
    // Trigger specific animation
    triggerAnimation(element, type) {
        element.classList.add('animate-' + type);
        
        // Add custom CSS if not exists
        if (!document.getElementById('dynamic-animations')) {
            this.addAnimationStyles();
        }
    }
    
    // Add dynamic animation styles
    addAnimationStyles() {
        const style = document.createElement('style');
        style.id = 'dynamic-animations';
        style.textContent = `
            /* Fade Animations */
            .animate-fadeInUp {
                animation: fadeInUp 0.8s ease forwards;
            }
            
            .animate-fadeInDown {
                animation: fadeInDown 0.8s ease forwards;
            }
            
            .animate-fadeInLeft {
                animation: fadeInLeft 0.8s ease forwards;
            }
            
            .animate-fadeInRight {
                animation: fadeInRight 0.8s ease forwards;
            }
            
            .animate-scaleIn {
                animation: scaleIn 0.6s ease forwards;
            }
            
            .animate-slideInUp {
                animation: slideInUp 0.8s ease forwards;
            }
            
            .animate-rotateIn {
                animation: rotateIn 0.8s ease forwards;
            }
            
            .animate-bounceIn {
                animation: bounceIn 0.8s ease forwards;
            }
            
            /* Keyframes */
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            @keyframes fadeInDown {
                from {
                    opacity: 0;
                    transform: translateY(-30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            @keyframes fadeInLeft {
                from {
                    opacity: 0;
                    transform: translateX(-30px);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }
            
            @keyframes fadeInRight {
                from {
                    opacity: 0;
                    transform: translateX(30px);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }
            
            @keyframes scaleIn {
                from {
                    opacity: 0;
                    transform: scale(0.8);
                }
                to {
                    opacity: 1;
                    transform: scale(1);
                }
            }
            
            @keyframes slideInUp {
                from {
                    transform: translateY(100%);
                }
                to {
                    transform: translateY(0);
                }
            }
            
            @keyframes rotateIn {
                from {
                    opacity: 0;
                    transform: rotate(-180deg) scale(0.5);
                }
                to {
                    opacity: 1;
                    transform: rotate(0deg) scale(1);
                }
            }
            
            @keyframes bounceIn {
                0% {
                    opacity: 0;
                    transform: scale(0.3);
                }
                50% {
                    opacity: 1;
                    transform: scale(1.05);
                }
                70% {
                    transform: scale(0.9);
                }
                100% {
                    opacity: 1;
                    transform: scale(1);
                }
            }
            
            /* Hover Animations */
            .hover-lift {
                transition: transform 0.3s ease, box-shadow 0.3s ease;
            }
            
            .hover-lift:hover {
                transform: translateY(-10px);
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
            }
            
            .hover-glow {
                transition: box-shadow 0.3s ease;
            }
            
            .hover-glow:hover {
                box-shadow: 0 0 30px rgba(99, 102, 241, 0.3);
            }
            
            .hover-rotate {
                transition: transform 0.3s ease;
            }
            
            .hover-rotate:hover {
                transform: rotate(5deg);
            }
            
            .hover-scale {
                transition: transform 0.3s ease;
            }
            
            .hover-scale:hover {
                transform: scale(1.05);
            }
            
            /* Loading Animations */
            .skeleton {
                background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
                background-size: 200% 100%;
                animation: loading 1.5s infinite;
            }
            
            @keyframes loading {
                0% {
                    background-position: 200% 0;
                }
                100% {
                    background-position: -200% 0;
                }
            }
            
            /* Pulse Animation */
            .pulse {
                animation: pulse 2s infinite;
            }
            
            @keyframes pulse {
                0% {
                    transform: scale(1);
                }
                50% {
                    transform: scale(1.05);
                }
                100% {
                    transform: scale(1);
                }
            }
            
            /* Floating Animation */
            .float {
                animation: float 3s ease-in-out infinite;
            }
            
            @keyframes float {
                0%, 100% {
                    transform: translateY(0px);
                }
                50% {
                    transform: translateY(-10px);
                }
            }
            
            /* Gradient Animation */
            .gradient-animation {
                background-size: 200% 200%;
                animation: gradientShift 3s ease infinite;
            }
            
            @keyframes gradientShift {
                0% {
                    background-position: 0% 50%;
                }
                50% {
                    background-position: 100% 50%;
                }
                100% {
                    background-position: 0% 50%;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Setup hover animations
    setupHoverAnimations() {
        // Add hover classes to elements
        document.querySelectorAll('.product-card').forEach(card => {
            card.classList.add('hover-lift');
        });
        
        document.querySelectorAll('.category-card').forEach(card => {
            card.classList.add('hover-lift', 'hover-glow');
        });
        
        document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
            btn.classList.add('hover-scale');
        });
        
        // Custom hover effects
        this.setupCustomHoverEffects();
    }
    
    // Custom hover effects
    setupCustomHoverEffects() {
        // Product card image zoom
        document.querySelectorAll('.product-card').forEach(card => {
            const image = card.querySelector('.product-image img');
            if (image) {
                card.addEventListener('mouseenter', () => {
                    image.style.transform = 'scale(1.1)';
                });
                
                card.addEventListener('mouseleave', () => {
                    image.style.transform = 'scale(1)';
                });
            }
        });
        
        // Button ripple effect
        document.querySelectorAll('.btn-primary, .btn-secondary, .add-to-cart').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.createRipple(e, btn);
            });
        });
    }
    
    // Create ripple effect
    createRipple(event, element) {
        const ripple = document.createElement('span');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;
        
        if (!document.getElementById('ripple-styles')) {
            const style = document.createElement('style');
            style.id = 'ripple-styles';
            style.textContent = `
                @keyframes ripple {
                    to {
                        transform: scale(2);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
    
    // Setup loading animations
    setupLoadingAnimations() {
        // Skeleton loading for products
        this.createSkeletonLoader();
        
        // Loading states for buttons
        this.setupButtonLoadingStates();
    }
    
    // Create skeleton loader
    createSkeletonLoader() {
        const skeletonHTML = `
            <div class="skeleton-card">
                <div class="skeleton skeleton-image"></div>
                <div class="skeleton-content">
                    <div class="skeleton skeleton-title"></div>
                    <div class="skeleton skeleton-text"></div>
                    <div class="skeleton skeleton-price"></div>
                    <div class="skeleton skeleton-button"></div>
                </div>
            </div>
        `;
        
        // Add skeleton styles
        if (!document.getElementById('skeleton-styles')) {
            const style = document.createElement('style');
            style.id = 'skeleton-styles';
            style.textContent = `
                .skeleton-card {
                    background: white;
                    border-radius: 20px;
                    overflow: hidden;
                    box-shadow: var(--shadow-sm);
                    margin-bottom: 30px;
                }
                
                .skeleton-image {
                    width: 100%;
                    height: 250px;
                }
                
                .skeleton-content {
                    padding: 25px;
                }
                
                .skeleton-title {
                    height: 20px;
                    margin-bottom: 15px;
                    border-radius: 4px;
                }
                
                .skeleton-text {
                    height: 16px;
                    margin-bottom: 10px;
                    border-radius: 4px;
                    width: 80%;
                }
                
                .skeleton-price {
                    height: 18px;
                    margin-bottom: 20px;
                    border-radius: 4px;
                    width: 60%;
                }
                
                .skeleton-button {
                    height: 45px;
                    border-radius: 10px;
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    // Setup button loading states
    setupButtonLoadingStates() {
        document.querySelectorAll('[data-loading]').forEach(btn => {
            btn.addEventListener('click', () => {
                this.showButtonLoading(btn);
            });
        });
    }
    
    // Show button loading state
    showButtonLoading(button) {
        const originalText = button.innerHTML;
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
        button.disabled = true;
        
        // Reset after 2 seconds (simulate loading)
        setTimeout(() => {
            button.innerHTML = originalText;
            button.disabled = false;
        }, 2000);
    }
    
    // Setup parallax effects
    setupParallaxEffects() {
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        
        if (parallaxElements.length === 0) return;
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            
            parallaxElements.forEach(element => {
                const rate = scrolled * (element.dataset.parallax || 0.5);
                element.style.transform = `translateY(${rate}px)`;
            });
        });
    }
    
    // Setup morphing shapes
    setupMorphingShapes() {
        const shapes = document.querySelectorAll('.floating-shapes .shape');
        
        shapes.forEach((shape, index) => {
            // Random morphing animation
            setInterval(() => {
                const randomScale = 0.8 + Math.random() * 0.4;
                const randomRotate = Math.random() * 360;
                
                shape.style.transform = `scale(${randomScale}) rotate(${randomRotate}deg)`;
            }, 2000 + index * 500);
        });
    }
    
    // Animate elements on page load
    animateOnLoad() {
        // Hero title animation
        const titleLines = document.querySelectorAll('.title-line');
        titleLines.forEach((line, index) => {
            setTimeout(() => {
                line.style.opacity = '1';
                line.style.transform = 'translateY(0)';
            }, index * 200);
        });
        
        // Hero description animation
        setTimeout(() => {
            const description = document.querySelector('.hero-description');
            if (description) {
                description.style.opacity = '0.9';
                description.style.transform = 'translateY(0)';
            }
        }, 600);
        
        // Hero buttons animation
        setTimeout(() => {
            const buttons = document.querySelector('.hero-buttons');
            if (buttons) {
                buttons.style.opacity = '1';
                buttons.style.transform = 'translateY(0)';
            }
        }, 800);
    }
    
    // Page transition effects
    setupPageTransitions() {
        // Smooth page transitions
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(link.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
    
    // Text typing animation
    typeWriter(element, text, speed = 50) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }
    
    // Number counter animation
    animateCounter(element, start, end, duration = 2000) {
        const range = end - start;
        const increment = range / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            element.textContent = Math.floor(current);
            
            if (current >= end) {
                element.textContent = end;
                clearInterval(timer);
            }
        }, 16);
    }
    
    // Stagger animation for multiple elements
    staggerAnimation(elements, animationClass, delay = 100) {
        elements.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add(animationClass);
            }, index * delay);
        });
    }
}

// Initialize animation controller when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const animationController = new AnimationController();
    
    // Animate on load after loading screen
    setTimeout(() => {
        animationController.animateOnLoad();
    }, 2500);
});

// Additional utility animations
const AnimationUtils = {
    // Shake animation
    shake(element) {
        element.style.animation = 'shake 0.5s ease-in-out';
        setTimeout(() => {
            element.style.animation = '';
        }, 500);
        
        // Add shake keyframes if not exists
        if (!document.getElementById('shake-animation')) {
            const style = document.createElement('style');
            style.id = 'shake-animation';
            style.textContent = `
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
                    20%, 40%, 60%, 80% { transform: translateX(5px); }
                }
            `;
            document.head.appendChild(style);
        }
    },
    
    // Flash animation
    flash(element, color = '#ff6b6b') {
        const originalBg = element.style.backgroundColor;
        element.style.backgroundColor = color;
        element.style.transition = 'background-color 0.3s ease';
        
        setTimeout(() => {
            element.style.backgroundColor = originalBg;
        }, 300);
    },
    
    // Bounce animation
    bounce(element) {
        element.style.animation = 'bounce 0.6s ease';
        setTimeout(() => {
            element.style.animation = '';
        }, 600);
    },
    
    // Fade toggle
    fadeToggle(element, duration = 300) {
        if (element.style.opacity === '0' || !element.style.opacity) {
            element.style.transition = `opacity ${duration}ms ease`;
            element.style.opacity = '1';
        } else {
            element.style.transition = `opacity ${duration}ms ease`;
            element.style.opacity = '0';
        }
    }
};

// Export for global use
window.AnimationUtils = AnimationUtils;