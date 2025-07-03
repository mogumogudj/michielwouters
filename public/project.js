// Mobile menu toggle
document.addEventListener('DOMContentLoaded', () => {
    const hamburgerMenu = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');

    hamburgerMenu.addEventListener('click', () => {
        hamburgerMenu.classList.toggle('active');
        mobileMenu.classList.toggle('open');
    });
});

// Parallax effect
window.addEventListener('scroll', () => {
    const images = document.querySelectorAll('.parallax-image img');

    images.forEach(img => {
        const rect = img.getBoundingClientRect();
        const offset = rect.top * 0.3;
        img.style.transform = `translateY(${offset}px)`;
    });
});

// Text fade-in on scroll
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.text-section');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.2 });

    sections.forEach(section => {
        observer.observe(section);
    });
});
