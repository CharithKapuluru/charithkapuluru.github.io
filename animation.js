// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Intersection Observer for scroll animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
        }
    });
}, {
    threshold: 0.1
});

// Observe all section headings
document.querySelectorAll('section h2').forEach(heading => {
    observer.observe(heading);
});

// Add hover effects to cards
document.querySelectorAll('.transform').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'scale(1.05)';
        card.style.transition = 'transform 0.3s ease';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'scale(1)';
    });
});

// Dynamic typing effect for hero section
function typeWriter(element, text, speed = 50) {
    let i = 0;
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Initialize typing effect
document.addEventListener('DOMContentLoaded', () => {
    const heroText = document.querySelector('.hero p');
    const originalText = heroText.textContent;
    heroText.textContent = '';
    typeWriter(heroText, originalText);
});

// Animate code editor on focus
const codeEditor = document.getElementById('code-editor');
if (codeEditor) {
    codeEditor.addEventListener('focus', () => {
        codeEditor.parentElement.style.boxShadow = '0 0 0 2px #3B82F6';
    });

    codeEditor.addEventListener('blur', () => {
        codeEditor.parentElement.style.boxShadow = 'none';
    });
}

// Add loading animation for API calls
function showLoading(element) {
    element.innerHTML = '<div class="loading-spinner"></div>';
}

function hideLoading(element, content) {
    element.innerHTML = content;
}

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const scroll = window.pageYOffset;
    hero.style.transform = `translateY(${scroll * 0.5}px)`;
});
