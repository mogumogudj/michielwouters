document.addEventListener('DOMContentLoaded', () => {
    const hamburgerMenu = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');

    if (!hamburgerMenu || !mobileMenu) return;

    hamburgerMenu.addEventListener('click', () => {
        const isOpen = hamburgerMenu.getAttribute('aria-expanded') !== 'true';
        hamburgerMenu.setAttribute('aria-expanded', String(isOpen));
        hamburgerMenu.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
        hamburgerMenu.classList.toggle('active', isOpen);
        mobileMenu.classList.toggle('open', isOpen);
        document.body.classList.toggle('menu-open', isOpen);
    });

    document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && mobileMenu.classList.contains('open')) {
            hamburgerMenu.setAttribute('aria-expanded', 'false');
            hamburgerMenu.setAttribute('aria-label', 'Open menu');
            hamburgerMenu.classList.remove('active');
            mobileMenu.classList.remove('open');
            document.body.classList.remove('menu-open');
            hamburgerMenu.focus();
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const section = document.getElementById('what-i-do');

    if (!section || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(entries => {
        if (entries.some(entry => entry.isIntersecting)) {
            section.classList.add('is-visible');
            observer.disconnect();
        }
    }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });

    section.classList.add('scroll-animated');
    observer.observe(section);
});

document.addEventListener('DOMContentLoaded', () => {
    const videos = document.querySelectorAll('video.lazy-video');
    if (!videos.length) return;

    const loadVideo = video => {
        const directSource = video.dataset.src;
        if (directSource) {
            video.src = directSource;
            delete video.dataset.src;
        }

        video.querySelectorAll('source[data-src]').forEach(source => {
            source.src = source.dataset.src;
            delete source.dataset.src;
        });

        video.load();
    };

    if (!('IntersectionObserver' in window)) {
        videos.forEach(loadVideo);
        return;
    }

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                loadVideo(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { rootMargin: '400px 0px' });

    videos.forEach(video => observer.observe(video));
});



    document.addEventListener('DOMContentLoaded', () => {
    const home = document.querySelector('.home-section');

    if (!home) return;

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                home.classList.add('animate');
                observer.unobserve(home);
            }
        });
    }, { threshold: 0.3 });

    observer.observe(home);
});



// SPINNING IMAGE ON SCROLL
const spinningImage = document.querySelector('.spinning-images img');
let spinningFrame = null;

if (spinningImage) {
    document.addEventListener('scroll', () => {
        if (spinningFrame || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        spinningFrame = requestAnimationFrame(() => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            spinningImage.style.transform = `rotate(${scrollTop * 0.5}deg)`;
            spinningFrame = null;
        });
    }, { passive: true });
}

// Select the image
const heroImage = document.querySelector('.hero-image img');
const heroSection = document.querySelector('.hero-image');
let heroFrame = null;

if (heroImage && heroSection) {
    const updateHeroScale = () => {
        if (heroFrame || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        heroFrame = requestAnimationFrame(() => {
            const rect = heroSection.getBoundingClientRect();
            const distanceFromCenter = Math.abs(rect.top + rect.height / 2 - window.innerHeight / 2);
            const scale = Math.max(1, 1.2 - (distanceFromCenter / window.innerHeight) * 0.4);
            heroImage.style.transform = `scale(${scale})`;
            heroFrame = null;
        });
    };

    window.addEventListener('scroll', updateHeroScale, { passive: true });
    window.addEventListener('resize', updateHeroScale, { passive: true });
}
