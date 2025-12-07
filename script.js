// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
    }
});

// Fade in animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections and cards
document.querySelectorAll('section, .skill-card, .interest-card, .achievement-card').forEach(el => {
    observer.observe(el);
});

// Animate skill bars on scroll
const skillBars = document.querySelectorAll('.skill-progress');
const skillBarObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBar = entry.target;
            const width = progressBar.style.width;
            progressBar.style.width = '0%';
            setTimeout(() => {
                progressBar.style.width = width;
            }, 100);
            skillBarObserver.unobserve(progressBar);
        }
    });
}, observerOptions);

skillBars.forEach(bar => {
    skillBarObserver.observe(bar);
});

// Contact form handling
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Simple validation
    if (name && email && message) {
        // In a real application, you would send this data to a server
        // For now, we'll just show an alert
        alert(`Thank you, ${name}! Your message has been received. I'll get back to you soon!`);
        
        // Reset form
        contactForm.reset();
    } else {
        alert('Please fill in all fields.');
    }
});

// Add active state to navigation links based on scroll position
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background');
    if (heroBackground) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add subtle animation to hero elements
window.addEventListener('load', () => {
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.animation = 'fadeInUp 1s ease forwards';
    }
    
    // Optional: Animate hero name letter by letter (uncomment to enable)
    /*
    const heroName = document.querySelector('.hero-name');
    if (heroName) {
        const text = heroName.textContent;
        heroName.textContent = '';
        heroName.style.opacity = '1';
        text.split('').forEach((char, index) => {
            setTimeout(() => {
                heroName.textContent += char;
            }, index * 100);
        });
    }
    */
});

// Enhanced scroll animations with different effects
const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            const element = entry.target;
            
            // Add different animation classes based on element type
            if (element.classList.contains('skill-card')) {
                element.style.animation = `fadeInUp 0.6s ease ${index * 0.1}s backwards`;
            } else if (element.classList.contains('interest-card')) {
                element.style.animation = `zoomIn 0.6s ease ${index * 0.1}s backwards`;
            } else if (element.classList.contains('achievement-card')) {
                element.style.animation = `scaleIn 0.8s ease, fadeInUp 0.6s ease`;
            }
            
            element.classList.add('fade-in');
            animationObserver.unobserve(element);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Observe all animated elements
document.querySelectorAll('.skill-card, .interest-card, .achievement-card, .about-text p').forEach(el => {
    animationObserver.observe(el);
});

// Add mouse move parallax effect to cards
document.querySelectorAll('.skill-card, .interest-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.05)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

// Add typing effect to tagline (optional - can be disabled if too distracting)
// Uncomment below to enable typing effect
/*
const tagline = document.querySelector('.hero-tagline');
if (tagline) {
    const originalText = tagline.textContent;
    const words = originalText.split(' • ');
    tagline.textContent = '';
    
    words.forEach((word, wordIndex) => {
        setTimeout(() => {
            if (wordIndex > 0) {
                tagline.textContent += ' • ';
            }
            word.split('').forEach((char, charIndex) => {
                setTimeout(() => {
                    tagline.textContent += char;
                }, charIndex * 50);
            });
        }, wordIndex * 800);
    });
}
*/

// Add ripple effect to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add counter animation for skill percentages
const animateCounter = (element, target) => {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '%';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '%';
        }
    }, 30);
};

// Animate numbers when they come into view
const numberObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const element = entry.target;
            const target = parseInt(element.getAttribute('data-target'));
            animateCounter(element, target);
            numberObserver.unobserve(element);
        }
    });
});

// Add floating animation to section titles
document.querySelectorAll('.section-title').forEach(title => {
    title.addEventListener('mouseenter', () => {
        title.style.animation = 'pulse 0.5s ease';
    });
});

// Add smooth reveal animation to about text
const aboutTextObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 200);
            aboutTextObserver.unobserve(entry.target);
        }
    });
});

document.querySelectorAll('.about-text p').forEach(p => {
    p.style.opacity = '0';
    p.style.transform = 'translateY(20px)';
    p.style.transition = 'all 0.6s ease';
    aboutTextObserver.observe(p);
});

// Add cursor trail effect (optional, can be disabled for performance)
let cursorTrail = [];
const maxTrailLength = 10;

document.addEventListener('mousemove', (e) => {
    if (window.innerWidth > 768) { // Only on desktop
        cursorTrail.push({ x: e.clientX, y: e.clientY, time: Date.now() });
        
        if (cursorTrail.length > maxTrailLength) {
            cursorTrail.shift();
        }
        
        // Remove old trail elements
        document.querySelectorAll('.cursor-trail').forEach(el => {
            if (Date.now() - parseInt(el.dataset.time) > 500) {
                el.remove();
            }
        });
        
        // Create new trail dot
        const dot = document.createElement('div');
        dot.className = 'cursor-trail';
        dot.style.left = e.clientX + 'px';
        dot.style.top = e.clientY + 'px';
        dot.dataset.time = Date.now();
        document.body.appendChild(dot);
        
        setTimeout(() => {
            if (dot.parentNode) {
                dot.remove();
            }
        }, 500);
    }
});

