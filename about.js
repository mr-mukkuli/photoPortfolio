gsap.registerPlugin(ScrollTrigger);

function initAboutAnimations() {
    gsap.to('.title-line', {
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.15,
        ease: 'power4.out',
        delay: 0.5
    });

    gsap.to('.about-image', {
        opacity: 1,
        duration: 1.2,
        delay: 0.8,
        ease: 'power2.out'
    });

    gsap.from('.bio-text', {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.bio-section',
            start: 'top 80%',
        }
    });

    gsap.from('.stat-item', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.bio-stats',
            start: 'top 80%',
        }
    });

    gsap.to('.service-card', {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.services-section',
            start: 'top 80%',
        }
    });

    gsap.from('.approach-section', {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.approach-section',
            start: 'top 80%',
        }
    });
}

function handleNavScroll() {
    const nav = document.querySelector('.nav');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
}

function init() {
    initAboutAnimations();
    handleNavScroll();
    ScrollTrigger.refresh();
}

init();

let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        ScrollTrigger.refresh();
    }, 250);
});
