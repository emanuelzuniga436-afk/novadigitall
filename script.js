// ===================================
// INTERACTIVIDAD AVANZADA - NOVA DIGITAL
// ===================================

// 1. NAVBAR SCROLL EFFECT
const navbar = document.querySelector('.navbar');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// 2. MOBILE MENU TOGGLE
const nav = document.querySelector('.nav-links');
const hamburger = document.querySelector('.hamburger');

if (hamburger && nav) {
    hamburger.addEventListener('click', () => {
        nav.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    document.addEventListener('click', (event) => {
        if (!nav.contains(event.target) && !hamburger.contains(event.target)) {
            nav.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
}

// 3. PARALLAX EFFECT FOR HERO BACKGROUND
const heroBackground = document.querySelector('.hero-background');
if (heroBackground) {
    window.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth) * 20 - 10;
        const y = (e.clientY / window.innerHeight) * 20 - 10;
        heroBackground.style.transform = `translate(${x}px, ${y}px)`;
    });
}

// 4. SCROLL-TRIGGERED ANIMATIONS
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all cards for animation
document.querySelectorAll('.card, .valor-card, .servicio-card, .testimonio-card, .portfolio-item, .fortaleza-item, .step').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// 5. SMOOTH SCROLL FOR ANCHOR LINKS
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// 6. BUTTON HOVER EFFECTS
const buttons = document.querySelectorAll('.btn');

buttons.forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });

    // Ripple effect
    button.addEventListener('click', function(event) {
        createRipple(event, this);
    });
});

function createRipple(event, button) {
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    button.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
}

// 7. FORM INPUT FOCUS ANIMATIONS
const formInputs = document.querySelectorAll('.contacto-form input, .contacto-form textarea');

formInputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.style.transform = 'scale(1.02)';
    });

    input.addEventListener('blur', function() {
        this.parentElement.style.transform = 'scale(1)';
    });
});

// 8. CARD HOVER GLOW EFFECT
const cards = document.querySelectorAll('.card, .valor-card, .servicio-card, .testimonio-card, .portfolio-item, .fortaleza-item');

cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });

    card.addEventListener('mouseleave', () => {
        card.style.setProperty('--mouse-x', '50%');
        card.style.setProperty('--mouse-y', '50%');
    });
});

// 9. DYNAMIC COUNTER ANIMATIONS
function animateCounters() {
    const counterElements = document.querySelectorAll('[data-count]');
    
    counterElements.forEach(element => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                const target = parseInt(element.getAttribute('data-count'));
                let current = 0;
                const increment = target / 30;
                
                const countUp = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        element.textContent = target;
                        clearInterval(countUp);
                    } else {
                        element.textContent = Math.floor(current);
                    }
                }, 50);
                
                observer.unobserve(element);
            }
        }, { threshold: 0.5 });
        
        observer.observe(element);
    });
}

animateCounters();

// 10. SOCIAL ICONS INTERACTION
const socialIcons = document.querySelectorAll('.social-icon');

socialIcons.forEach(icon => {
    icon.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-4px) rotate(10deg) scale(1.1)';
    });

    icon.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) rotate(0) scale(1)';
    });
});

// 11. KEYBOARD NAVIGATION
document.addEventListener('keydown', (e) => {
    // Close mobile menu with Escape
    if (e.key === 'Escape' && nav && hamburger) {
        nav.classList.remove('active');
        hamburger.classList.remove('active');
    }

    // Tab through cards with arrow keys
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        const cards = document.querySelectorAll('.card, .valor-card, .servicio-card');
        const focused = document.activeElement;
        
        if (cards.length > 0) {
            const currentIndex = Array.from(cards).indexOf(focused);
            if (currentIndex !== -1) {
                const nextIndex = e.key === 'ArrowRight' 
                    ? (currentIndex + 1) % cards.length 
                    : (currentIndex - 1 + cards.length) % cards.length;
                cards[nextIndex].focus();
            }
        }
    }
});

// 12. BACKGROUND ANIMATION EFFECT
function createBackgroundAnimation() {
    const body = document.body;
    
    // Add subtle animation to background
    setInterval(() => {
        const randomX = Math.random() * 100;
        const randomY = Math.random() * 100;
        body.style.setProperty('--bg-x', `${randomX}%`);
        body.style.setProperty('--bg-y', `${randomY}%`);
    }, 5000);
}

createBackgroundAnimation();

// 13. SCROLL PROGRESS BAR
function createProgressBar() {
    const progressBar = document.createElement('div');
    progressBar.id = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 4px;
        background: linear-gradient(135deg, #102b53, #7d9fc0);
        width: 0%;
        z-index: 999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

createProgressBar();

// 14. CURSOR EFFECT (Optional - Uncomment if desired)
function createCursorEffect() {
    const cursorDot = document.createElement('div');
    cursorDot.id = 'cursor-dot';
    cursorDot.style.cssText = `
        position: fixed;
        width: 8px;
        height: 8px;
        background: linear-gradient(135deg, #102b53, #7d9fc0);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        opacity: 0;
        transition: opacity 0.2s ease;
    `;
    document.body.appendChild(cursorDot);

    const cursorRing = document.createElement('div');
    cursorRing.id = 'cursor-ring';
    cursorRing.style.cssText = `
        position: fixed;
        width: 30px;
        height: 30px;
        border: 2px solid rgba(125, 159, 192, 0.5);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9998;
        opacity: 0;
        transition: opacity 0.2s ease;
    `;
    document.body.appendChild(cursorRing);

    let mouseX = 0, mouseY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        cursorDot.style.left = mouseX - 4 + 'px';
        cursorDot.style.top = mouseY - 4 + 'px';

        cursorRing.style.left = mouseX - 15 + 'px';
        cursorRing.style.top = mouseY - 15 + 'px';
    });

    // Show cursor effect over interactive elements
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, .servicio-card, .portfolio-item');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorDot.style.opacity = '1';
            cursorRing.style.opacity = '1';
            cursorRing.style.borderColor = 'rgba(16, 43, 83, 0.8)';
        });

        el.addEventListener('mouseleave', () => {
            cursorDot.style.opacity = '0';
            cursorRing.style.opacity = '0';
        });
    });
}

// Uncomment next line to enable cursor effect
// createCursorEffect();

// 15. PARALLAX SCROLLING FOR SECTIONS
function initParallaxSections() {
    const parallaxElements = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        parallaxElements.forEach(section => {
            const rect = section.getBoundingClientRect();
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.5;

            section.style.backgroundPosition = `0 ${rate}px`;
        });
    });
}

initParallaxSections();

// 16. FORM VALIDATION WITH VISUAL FEEDBACK
const contactForm = document.querySelector('.contacto-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const nombre = contactForm.querySelector('input[name="nombre"]');
        const email = contactForm.querySelector('input[name="email"]');
        const mensaje = contactForm.querySelector('textarea[name="mensaje"]');
        
        let isValid = true;

        // Basic validation
        if (!nombre.value.trim()) {
            nombre.style.borderColor = '#ff6b6b';
            isValid = false;
        } else {
            nombre.style.borderColor = '';
        }

        if (!email.value.includes('@')) {
            email.style.borderColor = '#ff6b6b';
            isValid = false;
        } else {
            email.style.borderColor = '';
        }

        if (!mensaje.value.trim()) {
            mensaje.style.borderColor = '#ff6b6b';
            isValid = false;
        } else {
            mensaje.style.borderColor = '';
        }

        if (isValid) {
            // Show success message
            alert('¡Mensaje enviado! Nos pondremos en contacto pronto.');
            contactForm.reset();
        }
    });
}

// 17. LOAD ANIMATION
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    console.log('✨ Nova Digital - Interactividad cargada exitosamente');
});

// 18. DYNAMIC TITLE ON PAGE VISIBILITY
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        document.title = '¡Vuelve pronto! - NOVA DIGITAL';
    } else {
        document.title = 'NOVA DIGITAL - Agencia de Diseño y Automatización Digital';
    }
});

// 19. PERFORMANCE MONITORING
if (window.performance && window.performance.timing) {
    window.addEventListener('load', () => {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log('📊 Tiempo de carga: ' + pageLoadTime + 'ms');
    });
}

// 20. ADD TOUCH SUPPORT FOR MOBILE
if ('ontouchstart' in window) {
    const touchCards = document.querySelectorAll('.card, .valor-card, .servicio-card');
    
    touchCards.forEach(card => {
        card.addEventListener('touchstart', () => {
            card.style.transform = 'scale(0.98)';
        });

        card.addEventListener('touchend', () => {
            card.style.transform = 'scale(1)';
        });
    });
}

console.log('🚀 Nova Digital - Plataforma interactiva activada');
