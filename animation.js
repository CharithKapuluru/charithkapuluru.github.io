// Intersection Observer for scroll animations
const animationObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    },
    {
        threshold: 0.1,
        rootMargin: '0px'
    }
);

// Observe all animated elements
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-aos]').forEach(element => {
        animationObserver.observe(element);
    });
});

// Hero parallax effect
let hero = document.querySelector('.hero');
let lastScrollY = window.scrollY;

function updateParallax() {
    if (hero) {
        const scrolled = window.scrollY;
        const delta = scrolled - lastScrollY;
        const speed = 0.5;
        
        if (Math.abs(delta) > 0) {
            window.requestAnimationFrame(() => {
                hero.style.transform = `translateY(${scrolled * speed}px)`;
                lastScrollY = scrolled;
            });
        }
    }
}

window.addEventListener('scroll', updateParallax);