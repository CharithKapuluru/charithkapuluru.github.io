// Custom cursor
const cursor = document.querySelector('.cursor');
let cursorVisible = true;

document.addEventListener('mousemove', (e) => {
    if (cursor) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        if (!cursorVisible) {
            cursor.style.opacity = '1';
            cursorVisible = true;
        }
    }
});

document.addEventListener('mouseleave', () => {
    if (cursor) {
        cursor.style.opacity = '0';
        cursorVisible = false;
    }
});

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

// Add hover effect to navigation links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('mouseenter', () => {
        if (cursor) {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
        }
    });
    
    link.addEventListener('mouseleave', () => {
        if (cursor) {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        }
    });
});

// Initialize glitch animation on hero title
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) {
        heroTitle.classList.add('animate-glitch');
    }
});