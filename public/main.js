document.addEventListener('DOMContentLoaded', () => {
    const hamburgerMenu = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');

    hamburgerMenu.addEventListener('click', () => {
        hamburgerMenu.classList.toggle('active');
        mobileMenu.classList.toggle('open');
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const section = document.getElementById('what-i-do');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                section.classList.add('animate');
            } else {
                section.classList.remove('animate'); // Reset the animation on scroll out
            }
        });
    }, { threshold: 1 });

    observer.observe(section);
});



    document.addEventListener('DOMContentLoaded', () => {
    const home = document.querySelector('.home-section');

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



// SCROLLING CONTACT
document.addEventListener('DOMContentLoaded', () => {
    const about = document.querySelector('.about-section');

    window.addEventListener('scroll', () => {
        const aboutTop = about.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (aboutTop < windowHeight / 1.2) {
            about.classList.add('scrolled');
        } else {
            about.classList.remove('scrolled');
        }
    });
});



// SPINNING IMAGE ON SCROLL
document.addEventListener('scroll', () => {
    const spinningImage = document.querySelector('.spinning-images img');
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const rotation = scrollTop * 0.5; // Adjust the multiplier for speed

    spinningImage.style.transform = `rotate(${rotation}deg)`;
});




document.addEventListener('DOMContentLoaded', () => {
    const aboutText = document.querySelector('.about-text');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                aboutText.classList.add('animate');
            } else {
                aboutText.classList.remove('animate'); // Reset animation when out of view
            }
        });
    }, { threshold: 0.6 });

    observer.observe(aboutText);
});




// Select the image
const heroImage = document.querySelector('.hero-image img');

window.addEventListener('scroll', () => {
    const section = document.querySelector('.hero-image');
    const rect = section.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Calculate how far the section is from the center of the viewport
    const distanceFromCenter = Math.abs(rect.top + rect.height / 2 - windowHeight / 2);

    // Calculate zoom scale: max scale when centered, min when scrolled away
    let scale = 1.2 - (distanceFromCenter / windowHeight) * 0.4; // adjust 1.2 and 0.4 for intensity

    // Clamp scale so it doesn't go below 1
    if (scale < 1) scale = 1;

    // Apply zoom effect
    heroImage.style.transform = `scale(${scale})`;
});





// Project page
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('.project-img');
    images.forEach((image, index) => {
        image.style.animation = `fadeInUp 1s ease-out ${index * 0.2}s forwards`;
    });
});

// Animation on scroll
document.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY + window.innerHeight;
    const projectText = document.querySelector('.project-text');
    const projectImages = document.querySelectorAll('.project-img');

    if (projectText.getBoundingClientRect().top < scrollPosition) {
        projectText.classList.add('animate');
    }

    projectImages.forEach((image) => {
        if (image.getBoundingClientRect().top < scrollPosition) {
            image.classList.add('animate');
        }
    });
});

