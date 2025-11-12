gsap.registerPlugin(ScrollTrigger);

const projectSlideshows = new Map();

function initSlideshows() {
    const projects = document.querySelectorAll('.project');
    
    projects.forEach((project, projectIndex) => {
        const images = project.querySelectorAll('.slideshow-image');
        if (images.length <= 1) return;
        
        const slideshowData = {
            images: images,
            currentSlide: 0,
            intervalId: null,
            isHovering: false
        };
        
        projectSlideshows.set(project, slideshowData);
        
        project.addEventListener('mouseenter', () => {
            slideshowData.isHovering = true;
            startSlideshow(slideshowData);
        });
        
        project.addEventListener('mouseleave', () => {
            slideshowData.isHovering = false;
            stopSlideshow(slideshowData);
            resetToFirstSlide(slideshowData);
        });
    });
}

function startSlideshow(slideshowData) {
    if (slideshowData.intervalId) return;
    
    slideshowData.intervalId = setInterval(() => {
        if (!slideshowData.isHovering) {
            stopSlideshow(slideshowData);
            return;
        }
        
        slideshowData.images[slideshowData.currentSlide].classList.remove('active');
        
        slideshowData.currentSlide = (slideshowData.currentSlide + 1) % slideshowData.images.length;
        
        slideshowData.images[slideshowData.currentSlide].classList.add('active');
    }, 800);
}

function stopSlideshow(slideshowData) {
    if (slideshowData.intervalId) {
        clearInterval(slideshowData.intervalId);
        slideshowData.intervalId = null;
    }
}

function resetToFirstSlide(slideshowData) {
    slideshowData.images[slideshowData.currentSlide].classList.remove('active');
    slideshowData.currentSlide = 0;
    slideshowData.images[0].classList.add('active');
}

function initAnimations() {
    gsap.to('.title-line', {
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.15,
        ease: 'power4.out',
        delay: 0.5
    });

    gsap.to('.hero-subtitle', {
        opacity: 1,
        duration: 1,
        delay: 1.5,
        ease: 'power2.out'
    });

    gsap.to('.hero-image', {
        opacity: 1,
        duration: 1.2,
        delay: 0.8,
        ease: 'power2.out'
    });

    gsap.to('.hero-image img', {
        scale: 1,
        duration: 1.5,
        delay: 0.8,
        ease: 'power2.out'
    });

    gsap.to('.scroll-indicator', {
        opacity: 1,
        duration: 1,
        delay: 2,
        ease: 'power2.out'
    });

    gsap.to('.scroll-indicator', {
        y: 10,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
        delay: 2.5
    });
}

function initGalleryScroll() {
    const projectsWrapper = document.querySelector('.projects-wrapper');
    const projects = document.querySelectorAll('.project');
    
    gsap.to(projects, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.gallery',
            start: 'top 80%',
        }
    });

    gsap.to(projectsWrapper, {
        x: () => -(projectsWrapper.scrollWidth - window.innerWidth + 100),
        ease: 'none',
        scrollTrigger: {
            id: 'gallery-scroll',
            trigger: '.gallery',
            start: 'top top',
            end: () => `+=${projectsWrapper.scrollWidth}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true
        }
    });

    projects.forEach((project, index) => {
        const image = project.querySelector('.project-image img.active');
        
        gsap.to(image, {
            y: -50,
            ease: 'none',
            scrollTrigger: {
                trigger: project,
                start: 'left right',
                end: 'right left',
                scrub: 1,
                containerAnimation: gsap.getById('gallery-scroll')
            }
        });
    });

    updateProjectCounter();
}

function updateProjectCounter() {
    const projects = document.querySelectorAll('.project');
    const currentSpan = document.querySelector('.project-counter .current');
    const totalSpan = document.querySelector('.project-counter .total');
    
    totalSpan.textContent = projects.length.toString().padStart(2, '0');

    ScrollTrigger.create({
        trigger: '.gallery',
        start: 'top top',
        end: () => `+=${document.querySelector('.projects-wrapper').scrollWidth}`,
        scrub: 1,
        onUpdate: (self) => {
            const progress = self.progress;
            const currentIndex = Math.min(
                Math.floor(progress * projects.length) + 1,
                projects.length
            );
            currentSpan.textContent = currentIndex.toString().padStart(2, '0');
        }
    });
}

function initParallax() {
    gsap.to('.hero-image img', {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true
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
    initAnimations();
    handleNavScroll();
    initSlideshows();
    
    ScrollTrigger.refresh();
    
    window.addEventListener('load', () => {
        ScrollTrigger.refresh();
        initGalleryScroll();
        initParallax();
    });
}

init();

let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        ScrollTrigger.refresh();
    }, 250);
});
