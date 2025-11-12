gsap.registerPlugin(ScrollTrigger);

function initContactAnimations() {
    gsap.to('.title-line', {
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.15,
        ease: 'power4.out',
        delay: 0.5
    });

    gsap.from('.contact-form-section', {
        x: -30,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.8
    });

    gsap.from('.contact-info-section', {
        x: 30,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.8
    });

    gsap.from('.form-group', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        delay: 1
    });
}

function initContactForm() {
    const form = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            project: document.getElementById('project').value,
            message: document.getElementById('message').value
        };

        formStatus.className = 'form-status success';
        formStatus.textContent = 'Thank you for your message! I will get back to you within 24-48 hours.';
        
        form.reset();

        setTimeout(() => {
            formStatus.className = 'form-status';
            formStatus.textContent = '';
        }, 5000);
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
    initContactAnimations();
    initContactForm();
    handleNavScroll();
}

init();

let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        ScrollTrigger.refresh();
    }, 250);
});
