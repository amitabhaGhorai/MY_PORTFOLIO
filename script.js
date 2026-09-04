// Portfolio Main JavaScript
class Portfolio {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initAnimations();
        this.initCursor();
        this.initTheme();
        this.initSkills();
        this.initCounters();
        this.initScrollEffects();
    }

    setupEventListeners() {
        // Mobile menu toggle
        const mobileToggle = document.querySelector('.mobile-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        if (mobileToggle) {
            mobileToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                mobileToggle.classList.toggle('active');
            });
        }

        // Theme toggle
        const themeToggle = document.querySelector('.theme-toggle');
        themeToggle.addEventListener('click', this.toggleTheme.bind(this));

        // Skills categories
        const skillCategories = document.querySelectorAll('.category');
        skillCategories.forEach(category => {
            category.addEventListener('click', this.switchSkillCategory.bind(this));
        });

        // Contact form
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', this.handleFormSubmit.bind(this));
        }

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    initCursor() {
        const cursor = document.querySelector('.cursor');
        const follower = document.querySelector('.cursor-follower');
        
        if (window.matchMedia("(pointer: fine)").matches) {
            document.addEventListener('mousemove', (e) => {
                cursor.style.left = e.clientX + 'px';
                cursor.style.top = e.clientY + 'px';
                
                setTimeout(() => {
                    follower.style.left = e.clientX + 'px';
                    follower.style.top = e.clientY + 'px';
                }, 100);
            });

            // Cursor effects on interactive elements
            const interactiveElements = document.querySelectorAll('a, button, .category, .project-card, .contact-item');
            
            interactiveElements.forEach(el => {
                el.addEventListener('mouseenter', () => {
                    cursor.style.transform = 'scale(1.5)';
                    follower.style.transform = 'scale(1.5)';
                    follower.style.opacity = '0.5';
                });
                
                el.addEventListener('mouseleave', () => {
                    cursor.style.transform = 'scale(1)';
                    follower.style.transform = 'scale(1)';
                    follower.style.opacity = '0.3';
                });
            });
        } else {
            // Hide custom cursor on touch devices
            cursor.style.display = 'none';
            follower.style.display = 'none';
        }
    }

    initTheme() {
        // Check for saved theme or prefer-color-scheme
        const savedTheme = localStorage.getItem('theme') || 
                          (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        
        document.documentElement.setAttribute('data-theme', savedTheme);
        this.updateThemeIcon(savedTheme);
    }

    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        this.updateThemeIcon(newTheme);
    }

    updateThemeIcon(theme) {
        const themeIcon = document.querySelector('.theme-toggle i');
        themeIcon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    }

    initAnimations() {
        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('loaded');
                    
                    // Animate stats if it's the about section
                    if (entry.target.id === 'about') {
                        this.animateCounters();
                    }
                    
                    // Animate skills if it's the skills section
                    if (entry.target.id === 'skills') {
                        this.animateSkills();
                    }
                }
            });
        }, observerOptions);

        // Observe all sections
        document.querySelectorAll('section').forEach(section => {
            section.classList.add('loading');
            observer.observe(section);
        });

        // Animate hero elements
        this.animateHero();
    }

    animateHero() {
        const heroTitle = document.querySelector('.hero-title');
        const heroSubtitle = document.querySelector('.hero-subtitle');
        const heroActions = document.querySelector('.hero-actions');
        
        setTimeout(() => {
            heroTitle.style.opacity = '1';
            heroTitle.style.transform = 'translateY(0)';
        }, 300);
        
        setTimeout(() => {
            heroSubtitle.style.opacity = '1';
            heroSubtitle.style.transform = 'translateY(0)';
        }, 800);
        
        setTimeout(() => {
            heroActions.style.opacity = '1';
            heroActions.style.transform = 'translateY(0)';
        }, 1200);
    }

    initSkills() {
        // Skills are animated when section comes into view
    }

    animateSkills() {
        const skillProgresses = document.querySelectorAll('.skill-progress');
        skillProgresses.forEach(progress => {
            const width = progress.getAttribute('data-width');
            progress.style.width = width + '%';
        });
    }

    switchSkillCategory(e) {
        const category = e.currentTarget;
        const categoryId = category.getAttribute('data-category');
        
        // Update active category
        document.querySelectorAll('.category').forEach(cat => {
            cat.classList.remove('active');
        });
        category.classList.add('active');
        
        // Show corresponding skills
        document.querySelectorAll('.skills-grid').forEach(grid => {
            grid.classList.remove('active');
        });
        document.getElementById(categoryId).classList.add('active');
    }

    initCounters() {
        // Counters are animated when about section comes into view
    }

    animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;
            
            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    counter.textContent = target;
                    clearInterval(timer);
                } else {
                    counter.textContent = Math.floor(current);
                }
            }, 16);
        });
    }

    initScrollEffects() {
        let lastScrollY = window.scrollY;
        const navbar = document.querySelector('.navbar');
        
        window.addEventListener('scroll', () => {
            // Navbar background on scroll
            if (window.scrollY > 100) {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                if (document.documentElement.getAttribute('data-theme') === 'dark') {
                    navbar.style.background = 'rgba(15, 23, 42, 0.95)';
                }
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.8)';
                if (document.documentElement.getAttribute('data-theme') === 'dark') {
                    navbar.style.background = 'rgba(15, 23, 42, 0.8)';
                }
            }
            
            // Hide/show navbar on scroll
            if (window.scrollY > lastScrollY && window.scrollY > 100) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
            lastScrollY = window.scrollY;
            
            // Parallax effect for background shapes
            const shapes = document.querySelectorAll('.bg-shape');
            shapes.forEach((shape, index) => {
                const speed = 0.5 + (index * 0.1);
                const yPos = -(window.scrollY * speed);
                shape.style.transform = `translateY(${yPos}px) rotate(${window.scrollY * 0.1}deg)`;
            });
        });
    }

    handleFormSubmit(e) {
        e.preventDefault();
        
        const form = e.target;
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            this.showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            form.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 2000);
    }

    showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check' : 'info'}"></i>
                <span>${message}</span>
            </div>
        `;
        
        // Add styles
        Object.assign(notification.style, {
            position: 'fixed',
            top: '100px',
            right: '20px',
            background: type === 'success' ? 'var(--success)' : 'var(--primary)',
            color: 'white',
            padding: '1rem 1.5rem',
            borderRadius: 'var(--radius-md)',
            boxShadow: 'var(--shadow-lg)',
            zIndex: '10000',
            transform: 'translateX(400px)',
            transition: 'transform 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
        });
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 5 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 5000);
    }
}

// Initialize portfolio when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Portfolio();
});

// Add CSS for notifications
const notificationStyles = `
    .notification-content {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    
    .notification-content i {
        font-size: 1.2rem;
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet);